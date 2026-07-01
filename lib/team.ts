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
    name: {
      en: "Nurgozha Kaliaskarov",
      ru: "Нургожа Калиаскаров",
      ar: "نورغوجا كالياسكاروف",
      kk: "Нұрғожа Қалиасқаров",
    },
    role: "CEO",
    photo: "/team/nurgozha.jpg",
    years: {
      en: "15+ years in tech & venture building",
      ru: "15+ лет в технологиях и венчурном бизнесе",
      ar: "أكثر من 15 عامًا في التكنولوجيا وبناء المشاريع",
      kk: "технология мен венчурлік бизнесте 15+ жыл",
    },
    bio: {
      en: "CEO and founder of NSART with over 15 years of experience leading B2B and B2C technology and growth initiatives — from software development and data solutions to integration services. His work spans AI, Telecom & SpaceTech, GovTech, cybersecurity, FinTech, EdTech, IoT, and data analytics. He co-founded and advises ventures including MyRent, SpaceLab, and NajmSat, and drives the NSART and Miras venture labs across Central and South Asia, Africa, and the GCC. His focus is innovation management, VC scouting, and research-driven product development.",
      ru: "CEO и основатель NSART с более чем 15-летним опытом развития B2B- и B2C-технологических и ростовых инициатив — от разработки ПО и решений по данным до интеграционных сервисов. Его работа охватывает ИИ, Telecom и SpaceTech, GovTech, кибербезопасность, финтех, EdTech, IoT и аналитику данных. Сооснователь и советник компаний MyRent, SpaceLab и NajmSat, развивает венчурные лаборатории NSART и Miras в Центральной и Южной Азии, Африке и странах Персидского залива. Его фокус — управление инновациями, венчурный скаутинг и наукоёмкая разработка продуктов.",
      ar: "الرئيس التنفيذي ومؤسس NSART، يتمتع بخبرة تتجاوز 15 عامًا في قيادة مبادرات التكنولوجيا والنمو في قطاعي B2B وB2C — من تطوير البرمجيات وحلول البيانات إلى خدمات التكامل. ويشمل عمله الذكاء الاصطناعي، وTelecom وSpaceTech، وGovTech، والأمن السيبراني، والتكنولوجيا المالية، وEdTech، وإنترنت الأشياء (IoT)، وتحليل البيانات. وهو شريك مؤسس ومستشار في شركات MyRent وSpaceLab وNajmSat، ويقود مختبرات NSART وMiras للمشاريع في وسط وجنوب آسيا وأفريقيا ودول الخليج. ويركّز على إدارة الابتكار، واستكشاف الاستثمار الجريء، وتطوير المنتجات القائم على البحث.",
      kk: "NSART компаниясының CEO-сы әрі негізін қалаушы, B2B және B2C технологиялық әрі өсу бастамаларын дамытуда 15 жылдан астам тәжірибесі бар — бағдарламалық жасақтама мен деректер шешімдерін әзірлеуден бастап интеграция қызметтеріне дейін. Оның жұмысы жасанды интеллект, Telecom және SpaceTech, GovTech, киберқауіпсіздік, финтех, EdTech, IoT және деректер аналитикасын қамтиды. MyRent, SpaceLab және NajmSat компанияларының тең негізін қалаушысы әрі кеңесшісі, Орталық және Оңтүстік Азия, Африка мен Парсы шығанағы елдерінде NSART және Miras венчурлық зертханаларын дамытады. Басты бағыты — инновацияларды басқару, венчурлік скаутинг және ғылымды қажетсінетін өнім әзірлеу.",
    },
    skills: {
      en: [
        "Innovation management",
        "VC scouting",
        "Digital strategy",
        "Product & operations",
        "R&D-driven development",
        "B2B / B2C tech growth",
      ],
      ru: [
        "Управление инновациями",
        "Венчурный скаутинг",
        "Цифровая стратегия",
        "Продукт и операции",
        "Наукоёмкая разработка",
        "Рост B2B / B2C-продуктов",
      ],
      ar: [
        "إدارة الابتكار",
        "استكشاف الاستثمار الجريء",
        "الاستراتيجية الرقمية",
        "المنتج والعمليات",
        "التطوير القائم على البحث",
        "نمو تقنيات B2B / B2C",
      ],
      kk: [
        "Инновацияларды басқару",
        "Венчурлік скаутинг",
        "Цифрлық стратегия",
        "Өнім және операциялар",
        "Ғылымды қажетсінетін әзірлеме",
        "B2B / B2C технологиялық өсу",
      ],
    },
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
    name: { en: "Ainara Nurpiisova", ru: "Айнара Нурпиисова" },
    role: "Finance & Accounting Manager",
    photo: "/team/ainara.jpg",
    years: { en: "20+ years in finance & accounting", ru: "20+ лет в бухгалтерии и финансах" },
    bio: {
      en: "A certified accountant of Kazakhstan with over 20 years in accounting and tax. An economist by training (Eurasian Humanities Institute, Astana). She has run the books for insurance, trade and service companies — from primary documentation to reporting and inventory audits. She also holds a diploma in international accounting standards.",
      ru: "Профессиональный бухгалтер РК с более чем 20-летним опытом в бухгалтерском и налоговом учёте. Экономист по образованию (Евразийский гуманитарный институт, Астана). Вела учёт в страховых, торговых и сервисных компаниях — от первичной документации до отчётности и инвентаризаций. Имеет диплом по международным стандартам учёта.",
    },
    skills: {
      en: [
        "Accounting",
        "Tax law",
        "Financial analysis",
        "Primary documentation",
        "Accounting software",
        "Reporting & inventory",
      ],
      ru: [
        "Бухгалтерский учёт",
        "Налоговое законодательство",
        "Финансовый анализ",
        "Первичная документация",
        "Бухгалтерские программы",
        "Отчётность и инвентаризация",
      ],
    },
  },
  {
    slug: "aidar",
    name: { en: "Aidar Kozhanbet", ru: "Айдар Кожанбет" },
    role: "Project Office Operations",
    photo: "/team/aidar.jpg",
  },
  {
    slug: "ansar",
    name: { en: "Ansar Kussainov", ru: "Ансар Кусаинов" },
    role: "AI Solutions Engineer",
    photo: "/team/ansar.jpg",
    bio: {
      en: "A software engineer building AI-native products for Kazakhstan and the CIS — marketplaces, operations automation and AI tooling, localized for RU/KK. A graduate of Astana IT University (BSc, Software Engineering) and Nazarbayev Intellectual School. He works end-to-end, from research and design to code, infrastructure and operations — spanning web and mobile interfaces (React, React Native, Angular) to AI agents, bots and data pipelines.",
      ru: "Инженер-программист, создающий AI-native продукты для Казахстана и СНГ — маркетплейсы, автоматизацию операций и инструменты на основе ИИ, локализованные под RU/KK. Выпускник Astana IT University (бакалавр, Software Engineering) и Nazarbayev Intellectual School. Работает end-to-end: от исследования и дизайна до кода, инфраструктуры и эксплуатации — от веб- и мобильных интерфейсов (React, React Native, Angular) до ИИ-агентов, ботов и пайплайнов данных.",
    },
    skills: {
      en: [
        "React & React Native",
        "Next.js / TypeScript",
        "AI agents (OpenAI / Anthropic)",
        "Python / FastAPI",
        "Supabase / PostgreSQL",
        "Telegram bots & automation",
      ],
      ru: [
        "React и React Native",
        "Next.js / TypeScript",
        "ИИ-агенты (OpenAI / Anthropic)",
        "Python / FastAPI",
        "Supabase / PostgreSQL",
        "Telegram-боты и автоматизация",
      ],
    },
  },
];
