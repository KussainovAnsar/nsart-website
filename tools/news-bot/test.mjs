// Проверка сборки записи новости: node tools/news-bot/test.mjs
import assert from "node:assert/strict";
import { readFile, writeFile, copyFile, rm } from "node:fs/promises";
import path from "node:path";
import { renderItem, pickImages, nextId } from "./bot.mjs";

const DRAFT = {
  id: 44,
  slug: "digital-almaty-2026",
  date: "2026-09-18",
  source: "https://www.instagram.com/p/XXXX/",
  images: ["/news/digital-almaty-2026.jpg", "/news/digital-almaty-2026-2.jpg"],
  tag: { ru: "Событие", en: "Event", ar: "فعالية", kk: "Іс-шара" },
  location: { ru: "Алматы, Казахстан", en: "Almaty, Kazakhstan", ar: "ألماتي", kk: "Алматы" },
  displayDate: { ru: "18 сентября 2026", en: "18 September 2026", ar: "...", kk: "..." },
  title: { ru: 'NSART на форуме «Digital Almaty 2026"', en: "NSART at Digital Almaty 2026", ar: "...", kk: "..." },
  excerpt: { ru: "Команда показала цифровой двойник.", en: "The team showed a digital twin.", ar: "...", kk: "..." },
  body: {
    ru: ["Первый абзац с кавычками «ёлочками» и \"прямыми\".", "Второй абзац."],
    en: ["First paragraph.", "Second paragraph."],
    ar: ["فقرة"],
    kk: ["Бірінші азат жол."],
  },
};

const rendered = renderItem(DRAFT);

// 1. все четыре языка на месте в каждом словаре
for (const field of ["tag:", "displayDate:", "title:", "excerpt:"])
  for (const lang of ["ru:", "en:", "ar:", "kk:"])
    assert.ok(rendered.includes(lang), `${field} без ${lang}`);

// 2. кавычки внутри текста экранированы, иначе файл перестанет компилироваться
assert.ok(rendered.includes('\\"'), "кавычки в тексте не экранированы");

// 3. галерея и обложка
assert.ok(rendered.includes('image: "/news/digital-almaty-2026.jpg"'), "нет обложки");
assert.ok(rendered.includes("images: ["), "нет галереи");

// 4. выбор картинок для разных типов постов
assert.deepEqual(pickImages({ media_type: "IMAGE", media_url: "a" }), ["a"]);
assert.deepEqual(pickImages({ media_type: "VIDEO", media_url: "v", thumbnail_url: "t" }), ["t"]);
assert.deepEqual(
  pickImages({
    media_type: "CAROUSEL_ALBUM",
    children: { data: [{ media_type: "IMAGE", media_url: "1" }, { media_type: "VIDEO", thumbnail_url: "2" }, { media_type: "IMAGE", media_url: "3" }, { media_type: "IMAGE", media_url: "4" }] },
  }),
  ["1", "2", "3"],
  "из карусели берём не больше трёх кадров",
);

// 5. следующий id — максимум из файла плюс один
const newsSrc = await readFile(path.resolve(import.meta.dirname, "../../lib/news.ts"), "utf8");
const id = nextId(newsSrc);
assert.ok(id > 43, `следующий id должен быть больше 43, получен ${id}`);

// 6. вставка в копию файла не ломает структуру массива
const tmp = path.resolve(import.meta.dirname, "news.test.ts");
await copyFile(path.resolve(import.meta.dirname, "../../lib/news.ts"), tmp);
let src = await readFile(tmp, "utf8");
const anchor = "export const news: NewsItem[] = [\n";
src = src.replace(anchor, anchor + rendered + "\n");
await writeFile(tmp, src);
const after = await readFile(tmp, "utf8");
assert.equal((after.match(/slug: "digital-almaty-2026"/g) || []).length, 1);
assert.ok(after.indexOf("id: 44") < after.indexOf("id: 43"), "новая запись должна быть первой");
await rm(tmp);

console.log("тест пройден: запись новости собирается и встаёт в начало списка");
