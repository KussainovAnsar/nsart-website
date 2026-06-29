import type { Locale } from "./i18n/config";

/** A value that may be provided per-language. `en` is the guaranteed fallback. */
type L<T> = { en: T } & Partial<Record<Locale, T>>;

export type TeamMember = {
  slug: string;
  /** Full name (or first name until the full one is provided). */
  name: L<string>;
  /** Job title — kept in English across locales by design. */
  role: string;
  /** Path under /public. */
  photo: string;
  /** Short experience line, e.g. "20+ years in IP". Optional. */
  years?: L<string>;
  /** 2–4 sentence bio. Empty/undefined => "bio coming soon" placeholder. */
  bio?: L<string>;
  /** 5–6 key skills as tags. */
  skills?: L<string[]>;
  /** One short personal fact / hobby. Optional. */
  fact?: L<string>;
};

/** Pick the value for `locale`, falling back to English. */
export function pick<T>(value: L<T> | undefined, locale: Locale): T | undefined {
  if (!value) return undefined;
  return value[locale] ?? value.en;
}

/* Order is fixed by seniority — CEO first. */
export const team: TeamMember[] = [
  {
    slug: "nurgozha",
    name: { en: "Nurgozha", ru: "Нургожа" },
    role: "CEO",
    photo: "/team/nurgozha.jpg",
  },
  {
    slug: "madi",
    name: { en: "Madi Suyundukov", ru: "Мади Суюндуков" },
    role: "IP Manager",
    photo: "/team/madi.jpg",
    years: { en: "20+ years in IP", ru: "20+ лет в сфере ИС" },
    bio: {
      en: "Eurasian patent attorney (No. 491) and patent attorney of Kazakhstan (No. 112), working in intellectual property since 2004. He builds legally robust patent claims that hold up in disputes and licensing. A dual background — biotechnology (KazNU) and law (Kunaev University) — lets him translate complex technical solutions into precise legal language. Today he leads IP management at Nazarbayev University and National Laboratory Astana.",
      ru: "Евразийский патентный поверенный (№ 491) и патентный поверенный РК (№ 112), в сфере интеллектуальной собственности с 2004 года. Выстраивает юридически устойчивые патентные формулы, которые работают в спорах и при лицензировании. Двойное образование — биотехнология (КазНУ) и юриспруденция (Университет им. Кунаева) — позволяет точно переводить сложные технические решения на язык права. Сейчас отвечает за управление ИС в Назарбаев Университете и National Laboratory Astana.",
    },
    skills: {
      en: [
        "Patent protection",
        "IP registration in KZ & abroad",
        "Licensing & tech transfer",
        "Patent disputes",
        "Patent examination",
      ],
      ru: [
        "Патентная охрана",
        "Регистрация ИС в РК и за рубежом",
        "Лицензирование и передача технологий",
        "Патентные споры",
        "Патентная экспертиза",
      ],
    },
  },
  {
    slug: "ainara",
    name: { en: "Ainara", ru: "Айнара" },
    role: "Finance & Accounting Manager",
    photo: "/team/ainara.jpg",
  },
  {
    slug: "aidar",
    name: { en: "Aidar", ru: "Айдар" },
    role: "Operating Project Manager",
    photo: "/team/aidar.jpg",
  },
  {
    slug: "ansar",
    name: { en: "Ansar", ru: "Ансар" },
    role: "AI Solutions Engineer",
    photo: "/team/ansar.jpg",
  },
];
