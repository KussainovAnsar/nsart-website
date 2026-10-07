#!/usr/bin/env node
// Новости из Instagram → lib/news.ts. Подробности и настройка — README.md рядом.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "../..");
const NEWS_TS = path.join(ROOT, "lib/news.ts");
const IMG_DIR = path.join(ROOT, "public/news");
const STATE = path.join(import.meta.dirname, "state.json");

const DRY = process.argv.includes("--dry");
const SINCE = (process.argv.find((a) => a.startsWith("--since=")) || "").slice(8);
const arg = (name) => {
  const v = process.argv.find((a) => a.startsWith(`--${name}=`));
  return v ? v.slice(name.length + 3) : "";
};
const MIN_CAPTION = 180;          // короткие подписи — это не новость
const MAX_PER_RUN = SINCE ? 25 : 4;   // обычный прогон берёт немного, «догон» — всё за период
const GRAPH = "https://graph.instagram.com/v23.0";

const SOURCES = [
  { key: "nsart", handle: "@nsart_kz", token: process.env.IG_TOKEN_NSART, auto: true },
  { key: "ceo", handle: "@nur_kali", token: process.env.IG_TOKEN_CEO, auto: false },
];

const log = (...a) => console.log(...a);

/* ---------- состояние: какие посты уже разобраны ---------- */
async function loadState() {
  if (!existsSync(STATE)) return { seen: [], tokens: {} };
  return JSON.parse(await readFile(STATE, "utf8"));
}
const saveState = (s) => writeFile(STATE, JSON.stringify(s, null, 2) + "\n");

/* ---------- Instagram ---------- */
async function igFetch(url) {
  const r = await fetch(url);
  const j = await r.json();
  if (!r.ok || j.error) throw new Error("Instagram: " + JSON.stringify(j.error || j));
  return j;
}

async function fetchMedia(token) {
  const fields =
    "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp," +
    "children{media_url,media_type,thumbnail_url}";
  let url = `${GRAPH}/me/media?fields=${fields}&limit=25&access_token=${token}`;
  const out = [];
  // при разовом «догоне» (--since) идём по страницам, пока не дошли до нужной даты
  for (let page = 0; page < (SINCE ? 10 : 1) && url; page++) {
    const j = await igFetch(url);
    out.push(...(j.data || []));
    const oldest = (j.data || []).at(-1)?.timestamp?.slice(0, 10);
    if (!SINCE || !oldest || oldest < SINCE) break;
    url = j.paging?.next || "";
  }
  return out;
}

/** Токен живёт 60 дней; при каждом прогоне продлеваем до следующих 60. */
async function refreshToken(token) {
  try {
    const j = await igFetch(
      `${GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`,
    );
    return { token: j.access_token || token, expiresIn: j.expires_in };
  } catch (e) {
    log("  продление токена не удалось:", e.message);
    return { token, expiresIn: null };
  }
}

/* ---------- Gemini: подпись поста → новость на четырёх языках ---------- */
const GEMINI_MODELS = ["gemini-flash-latest", "gemini-flash-lite-latest", "gemini-2.5-flash"];
const geminiUrl = (m) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const PROMPT = `Ты редактор новостей технологической компании NSART (Казахстан).
На вход — подпись поста из Instagram компании. Сделай из неё новость для корпоративного сайта.

ЖЁСТКИЕ ПРАВИЛА:
- Только факты из подписи. Ничего не домысливать: ни цифр, ни имён, ни дат, ни итогов,
  которых нет в исходном тексте. Если чего-то нет — просто не пиши об этом.
- Официальный тон, без рекламных восклицаний, без эмодзи и хештегов.
- Не писать про численность сотрудников, выручку, долю госзаказа и структуру подразделений.
- Если пост не новостной (поздравление, мем, личное, анонс без содержания, просто фото) —
  вернуть {"skip": true, "reason": "<коротко почему>"}.

ФОРМАТ ОТВЕТА — строгий JSON без пояснений:
{
  "skip": false,
  "slug": "latin-slug-iz-neskolkih-slov",
  "tag": {"ru":"Событие","en":"Event","ar":"...","kk":"..."},
  "location": {"ru":"Астана, Казахстан","en":"Astana, Kazakhstan","ar":"...","kk":"..."},
  "displayDate": {"ru":"22 апреля 2026","en":"22 April 2026","ar":"...","kk":"..."},
  "title": {"ru":"...","en":"...","ar":"...","kk":"..."},
  "excerpt": {"ru":"1-2 предложения","en":"...","ar":"...","kk":"..."},
  "body": {"ru":["абзац","абзац"],"en":["..."],"ar":["..."],"kk":["..."]}
}
tag — одно-два слова: Событие / Партнёрство / Проект / Встреча / Запуск.
location — опустить (null), если место в подписи не названо.
body — 2-4 абзаца на каждом языке, одинаковые по смыслу.
Языки: ru — русский, en — английский, ar — арабский, kk — казахский.`;

async function rewrite(caption, dateISO) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("нет GEMINI_API_KEY");
  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: `${PROMPT}

Дата поста: ${dateISO}

Подпись поста:
"""${caption}"""` }],
      },
    ],
    generationConfig: { temperature: 0.3, responseMimeType: "application/json" },
  };
  let last = "";
  // бесплатный тариф периодически отвечает 429/503 — пробуем соседние модели и ждём
  for (const model of GEMINI_MODELS) {
    for (let attempt = 0; attempt < 3; attempt++) {
      const r = await fetch(`${geminiUrl(model)}?key=${key}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await r.json();
      if (r.ok) {
        const text = j.candidates?.[0]?.content?.parts?.[0]?.text || "";
        return JSON.parse(text);
      }
      last = `${model}: ${j.error?.status || r.status} ${j.error?.message || ""}`.slice(0, 160);
      if (![429, 500, 503].includes(r.status)) break;
      await sleep(4000 * (attempt + 1));
    }
  }
  throw new Error("Gemini: " + last);
}

/* ---------- картинки ---------- */
function pickImages(post) {
  const urls = [];
  const add = (u) => u && urls.length < 3 && !urls.includes(u) && urls.push(u);
  if (post.media_type === "CAROUSEL_ALBUM") {
    for (const c of post.children?.data || [])
      add(c.media_type === "VIDEO" ? c.thumbnail_url : c.media_url);
  } else if (post.media_type === "VIDEO") {
    add(post.thumbnail_url);
  } else {
    add(post.media_url);
  }
  return urls;
}

async function downloadImages(urls, slug) {
  await mkdir(IMG_DIR, { recursive: true });
  const saved = [];
  for (const [i, url] of urls.entries()) {
    const name = i === 0 ? `${slug}.jpg` : `${slug}-${i + 1}.jpg`;
    const r = await fetch(url);
    if (!r.ok) continue;
    const buf = Buffer.from(await r.arrayBuffer());
    if (!DRY) await writeFile(path.join(IMG_DIR, name), buf);
    saved.push(`/news/${name}`);
  }
  return saved;
}

/* ---------- запись в lib/news.ts ---------- */
const q = (s) => JSON.stringify(String(s));
const l4 = (o, ind) =>
  `{\n${["ru", "en", "ar", "kk"]
    .map((k) => `${ind}  ${k}: ${q(o[k] ?? o.ru ?? "")},`)
    .join("\n")}\n${ind}}`;

function renderItem(item) {
  const i = "    ";
  const lines = [
    `  {`,
    `${i}id: ${item.id},`,
    `${i}slug: ${q(item.slug)},`,
    `${i}date: ${q(item.date)},`,
    `${i}source: ${q(item.source)},`,
  ];
  if (item.images?.length) {
    lines.push(`${i}image: ${q(item.images[0])},`);
    if (item.images.length > 1)
      lines.push(`${i}images: [\n${item.images.map((p) => `${i}  ${q(p)},`).join("\n")}\n${i}],`);
  }
  lines.push(`${i}tag: ${l4(item.tag, i)},`);
  if (item.location) lines.push(`${i}location: ${l4(item.location, i)},`);
  lines.push(`${i}displayDate: ${l4(item.displayDate, i)},`);
  lines.push(`${i}title: ${l4(item.title, i)},`);
  lines.push(`${i}excerpt: ${l4(item.excerpt, i)},`);
  const body = ["ru", "en", "ar", "kk"]
    .map(
      (k) =>
        `${i}  ${k}: [\n${(item.body[k] || item.body.ru || [])
          .map((p) => `${i}    ${q(p)},`)
          .join("\n")}\n${i}  ],`,
    )
    .join("\n");
  lines.push(`${i}body: {\n${body}\n${i}},`);
  lines.push(`  },`);
  return lines.join("\n");
}

async function insertNews(items) {
  let src = await readFile(NEWS_TS, "utf8");
  const anchor = "export const news: NewsItem[] = [\n";
  const at = src.indexOf(anchor);
  if (at === -1) throw new Error("не найден массив news в lib/news.ts");
  const block = items.map(renderItem).join("\n") + "\n";
  src = src.slice(0, at + anchor.length) + block + src.slice(at + anchor.length);
  if (!DRY) await writeFile(NEWS_TS, src);
}

function nextId(src) {
  const ids = [...src.matchAll(/^\s{4}id: (\d+),/gm)].map((m) => +m[1]);
  return (ids.length ? Math.max(...ids) : 0) + 1;
}

/* ---------- Telegram ---------- */
async function notify(text) {
  const t = process.env.TG_BOT_TOKEN, c = process.env.TG_CHAT_ID;
  if (!t || !c) return;
  await fetch(`https://api.telegram.org/bot${t}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: c, text, parse_mode: "HTML", disable_web_page_preview: true }),
  }).catch(() => {});
}

/* ---------- ручной режим: новость из текста, без Instagram ---------- */
/* node bot.mjs --caption-file=post.txt --date=2026-09-20 --images=url1,url2 --link=https://... */
async function runManual() {
  const caption = (await readFile(arg("caption-file"), "utf8")).trim();
  const date = arg("date") || new Date().toISOString().slice(0, 10);
  const draft = await rewrite(caption, date);
  if (draft.skip) { log("Gemini считает это не новостью:", draft.reason); return; }
  const slug = (draft.slug || `news-${date}`).toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  const urls = arg("images") ? arg("images").split(",").filter(Boolean) : [];
  const images = urls.length ? await downloadImages(urls, slug) : [];
  const newsSrc = await readFile(NEWS_TS, "utf8");
  const item = {
    id: nextId(newsSrc), slug, date, source: arg("link") || "",
    images, tag: draft.tag, location: draft.location || null,
    displayDate: draft.displayDate, title: draft.title,
    excerpt: draft.excerpt, body: draft.body,
  };
  log(DRY ? "— черновик (--dry, ничего не записано) —" : "— добавлено в lib/news.ts —");
  log(renderItem(item));
  if (!DRY) await insertNews([item]);
}

/* ---------- основной проход ---------- */
const run = async () => {
  const state = await loadState();
  const newsSrc = await readFile(NEWS_TS, "utf8");
  let id = nextId(newsSrc);
  const added = [];        // опубликуется сразу
  const review = [];       // уйдёт в Pull Request

  for (const src of SOURCES) {
    if (!src.token) { log(`${src.handle}: токена нет, пропускаю`); continue; }

    const fresh = await refreshToken(src.token);
    state.tokens = state.tokens || {};
    state.tokens[src.key] = {
      refreshedAt: new Date().toISOString().slice(0, 10),
      expiresInDays: fresh.expiresIn ? Math.round(fresh.expiresIn / 86400) : null,
    };
    if (fresh.token !== src.token) log(`${src.handle}: токен продлён`);

    const posts = await fetchMedia(fresh.token);
    log(`${src.handle}: получено постов ${posts.length}`);

    let taken = 0;
    for (const post of posts.sort((a, b) => a.timestamp.localeCompare(b.timestamp))) {
      if (taken >= MAX_PER_RUN) break;
      if (state.seen.includes(post.id)) continue;
      const caption = (post.caption || "").trim();
      const date = post.timestamp.slice(0, 10);
      if (SINCE && date < SINCE) { state.seen.push(post.id); continue; }
      if (caption.length < MIN_CAPTION) {
        log(`  ${date} пропуск: подпись короткая (${caption.length})`);
        state.seen.push(post.id);
        continue;
      }

      let draft;
      try {
        draft = await rewrite(caption, date);
      } catch (e) {
        log(`  ${date} ошибка пересказа: ${e.message}`);
        continue;                              // попробуем в следующий раз
      }
      if (draft.skip) {
        log(`  ${date} пропуск: ${draft.reason || "не новость"}`);
        state.seen.push(post.id);
        continue;
      }

      const slug = (draft.slug || `post-${post.id}`).toLowerCase().replace(/[^a-z0-9-]+/g, "-");
      if (newsSrc.includes(`slug: "${slug}"`)) {
        log(`  ${date} пропуск: slug ${slug} уже есть`);
        state.seen.push(post.id);
        continue;
      }
      const images = await downloadImages(pickImages(post), slug);

      const item = {
        id: id++,
        slug,
        date,
        source: post.permalink,
        images,
        tag: draft.tag,
        location: draft.location || null,
        displayDate: draft.displayDate,
        title: draft.title,
        excerpt: draft.excerpt,
        body: draft.body,
      };
      (src.auto ? added : review).push({ ...item, handle: src.handle });
      state.seen.push(post.id);
      taken++;
      log(`  ${date} готово: ${item.title.ru}`);
    }
  }

  const all = [...added, ...review].sort((a, b) => b.date.localeCompare(a.date));
  if (all.length) await insertNews(all);
  if (!DRY) await saveState(state);

  if (all.length) {
    const list = all.map((n) => `• ${n.date} — ${n.title.ru}\n  ${n.source}`).join("\n");
    await notify(
      `<b>Новости с Instagram</b>\nПодготовлено: ${all.length}\n\n${list}` +
        (review.length ? `\n\nИз личной страницы — ${review.length}, уйдёт в Pull Request.` : ""),
    );
  }

  // для workflow: какой режим публикации выбрать
  console.log(`\nИТОГО auto=${added.length} review=${review.length}`);
  if (process.env.GITHUB_OUTPUT) {
    await writeFile(
      process.env.GITHUB_OUTPUT,
      `auto=${added.length}\nreview=${review.length}\ntotal=${all.length}\n`,
      { flag: "a" },
    );
  }
};

export { renderItem, pickImages, nextId, insertNews, l4 };

/* запускаемся только как программа, а не при импорте из теста */
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const main = arg("caption-file") ? runManual : run;
  main().catch(async (e) => {
    console.error("Ошибка:", e.message);
    await notify(`<b>Новости с Instagram</b>\nОшибка: ${e.message}`);
    process.exitCode = 1;
  });
}
