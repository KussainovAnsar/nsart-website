import type { Locale } from "./i18n/config";

/**
 * News / press items for NSART.
 *
 * Content is localized across all four site locales (ru/en/ar/kk) — source
 * text is from the @nsart_kz Instagram, translated for each language.
 * Images are optional — when `image` is omitted the UI renders a branded
 * placeholder, so the section looks complete without any uploads. To add a
 * photo later, drop a file under `public/news/` and set `image: "/news/<file>"`.
 */

/** A value provided in every site language. */
type L<T> = Record<Locale, T>;

export type NewsItem = {
  /** Sequential id from the source feed (29…). */
  id: number;
  /** URL slug for /news/<slug>. */
  slug: string;
  /** ISO date — used for sorting and <time>. */
  date: string;
  /** Optional cover image path under /public. Omit to use the placeholder. */
  image?: string;
  /** Optional photo gallery for the article page; shown as a carousel instead of the single cover. */
  images?: string[];
  /** Short category label shown as an eyebrow / badge. */
  tag: L<string>;
  /** Optional place. */
  location?: L<string>;
  /** Human-readable date shown in the UI. */
  displayDate: L<string>;
  title: L<string>;
  /** One–two sentence summary for cards and previews. */
  excerpt: L<string>;
  /** Full article as an array of paragraphs. */
  body: L<string[]>;
};

/** Pick the value for `locale`, falling back to Russian (the source language). */
export function pickNews<T>(value: L<T> | undefined, locale: Locale): T | undefined {
  if (!value) return undefined;
  return value[locale] ?? value.ru;
}

/** Chrome / UI strings for the news section. */
export const newsUi = {
  badge: { ru: "Новости", en: "News", ar: "الأخبار", kk: "Жаңалықтар" },
  title: {
    ru: "Новости NSART",
    en: "NSART News",
    ar: "أخبار NSART",
    kk: "NSART жаңалықтары",
  },
  intro: {
    ru: "Партнёрства, запуски и события — как NSART строит глубокотехнологичные проекты в Казахстане, MENA и Южной Азии.",
    en: "Partnerships, launches and events — how NSART builds deep-tech projects across Kazakhstan, MENA and South Asia.",
    ar: "شراكات وإطلاقات وفعاليات — كيف تبني NSART مشاريع التقنية العميقة في كازاخستان ومنطقة الشرق الأوسط وشمال إفريقيا وجنوب آسيا.",
    kk: "Серіктестіктер, іске қосулар және іс-шаралар — NSART Қазақстанда, MENA және Оңтүстік Азияда терең технологиялық жобаларды қалай құрып жатыр.",
  },
  read: { ru: "Читать", en: "Read", ar: "اقرأ", kk: "Оқу" },
  allNews: {
    ru: "Все новости",
    en: "All news",
    ar: "كل الأخبار",
    kk: "Барлық жаңалықтар",
  },
  more: {
    ru: "Ещё новости",
    en: "More news",
    ar: "أخبار أخرى",
    kk: "Тағы жаңалықтар",
  },
} satisfies Record<string, L<string>>;

/* Newest first — see `sortedNews` below. */
export const news: NewsItem[] = [
  {
    id: 42,
    slug: "aixc-launch",
    date: "2026-07-15",
    image: "/news/aixc-launch.webp",
    images: [
      "/news/aixc-launch.webp",
      "/news/aixc-launch-2.webp",
      "/news/aixc-launch-3.webp",
    ],
    tag: { ru: "Запуск", en: "Launch", ar: "إطلاق", kk: "Іске қосу" },
    location: {
      ru: "Гуджранвала, Пакистан",
      en: "Gujranwala, Pakistan",
      ar: "جوجرانوالا، باكستان",
      kk: "Гуджранвала, Пәкістан",
    },
    displayDate: {
      ru: "15 июля 2026",
      en: "15 July 2026",
      ar: "15 يوليو 2026",
      kk: "2026 жылғы 15 шілде",
    },
    title: {
      ru: "Историческая веха: запуск Центра превосходства ИИ (AIXC) в Гуджранвале",
      en: "Historic Milestone: Launch of the AI Excellence Centre (AIXC) in Gujranwala",
      ar: "إنجاز تاريخي: إطلاق مركز التميز للذكاء الاصطناعي (AIXC) في جوجرانوالا",
      kk: "Тарихи белес: Гуджранвалада AI Excellence Centre (AIXC) іске қосылды",
    },
    excerpt: {
      ru: "GIFT University, Gujranwala Business Alliance и NSART (Казахстан) при технологической поддержке ONIT Global запустили Центр превосходства ИИ (AIXC) — новая глава технологического сотрудничества Пакистана и Казахстана.",
      en: "GIFT University, the Gujranwala Business Alliance and NSART Kazakhstan, with technology support from ONIT Global, launch the AI Excellence Centre (AIXC) — a new chapter in Pakistan–Kazakhstan tech cooperation.",
      ar: "جامعة GIFT وتحالف جوجرانوالا للأعمال وNSART الكازاخستانية، بدعم تقني من ONIT Global، يطلقون مركز التميز للذكاء الاصطناعي (AIXC) — فصل جديد في التعاون التقني بين باكستان وكازاخستان.",
      kk: "GIFT University, Gujranwala Business Alliance және NSART (Қазақстан) ONIT Global технологиялық қолдауымен AI Excellence Centre (AIXC) орталығын іске қосты — Пәкістан мен Қазақстан технологиялық ынтымақтастығының жаңа тарауы.",
    },
    body: {
      ru: [
        "Гуджранвала делает уверенный шаг к тому, чтобы стать хабом искусственного интеллекта и цифровой трансформации: запущен Центр превосходства ИИ (AIXC) — совместная инициатива GIFT University, Gujranwala Business Alliance (GBA) и NSART (Казахстан) при технологической поддержке ONIT Global.",
        "Знаковая инициатива стартовала в присутствии Посла Казахстана в Пакистане Е.П. Ержана Кистафина, председателя Gujranwala Business Alliance Ахмада Икрама Лоне и основателя и председателя GIFT University Анвара Дара — открыта новая глава сотрудничества Пакистана и Казахстана в технологиях, инновациях и ИИ.",
        "AIXC призван стать катализатором ИИ-революции в регионе: центр объединяет академическую среду, индустрию, международную экспертизу и технологических партнёров, чтобы трансформировать отрасли, готовить кадры будущего, поддерживать стартапы и ускорять внедрение ИИ.",
        "В фокусе — здравоохранение, образование, кибербезопасность, агротех и модернизация МСБ: AIXC станет фундаментом мощной инновационной экосистемы и выведет Гуджранвалу на передовую цифровой экономики.",
        "От индустриальной мощи — к интеллектуальным инновациям: путь к Gujranwala Valley начинается. 🇵🇰🇰🇿",
      ],
      en: [
        "Gujranwala takes a bold step towards becoming a hub of Artificial Intelligence and digital transformation with the launch of the AI Excellence Centre (AIXC) — a joint initiative of GIFT University, the Gujranwala Business Alliance (GBA) and NSART Kazakhstan, with technology support from ONIT Global.",
        "The landmark initiative was launched in the presence of H.E. Yerzhan Kistafin, Ambassador of Kazakhstan to Pakistan, alongside Mr. Ahmad Ikram Lone, Chairman of the Gujranwala Business Alliance, and Mr. Anwar Dar, Founder & Chairman of GIFT University — marking a new chapter in Pakistan–Kazakhstan cooperation in technology, innovation and AI.",
        "AIXC aims to become the catalyst for the AI revolution in the region by connecting academia, industry, international expertise and technology partners to transform industries, develop future-ready talent, support startups and accelerate AI adoption.",
        "With a focus on Healthcare, Education, Cybersecurity, AgriTech and SME Modernization, AIXC will serve as the foundation for building a powerful innovation ecosystem and positioning Gujranwala at the forefront of the digital economy.",
        "From industrial strength to intelligent innovation — the journey towards Gujranwala Valley begins. 🇵🇰🇰🇿",
      ],
      ar: [
        "تخطو جوجرانوالا خطوة جريئة نحو التحول إلى مركز للذكاء الاصطناعي والتحول الرقمي مع إطلاق مركز التميز للذكاء الاصطناعي (AIXC) — مبادرة مشتركة بين جامعة GIFT وتحالف جوجرانوالا للأعمال (GBA) وشركة NSART الكازاخستانية، بدعم تقني من ONIT Global.",
        "أُطلقت هذه المبادرة البارزة بحضور سعادة يرجان كيستافين، سفير كازاخستان لدى باكستان، إلى جانب السيد أحمد إكرام لون، رئيس تحالف جوجرانوالا للأعمال، والسيد أنور دار، مؤسس ورئيس جامعة GIFT — لتفتح فصلاً جديداً في التعاون الباكستاني–الكازاخستاني في التكنولوجيا والابتكار والذكاء الاصطناعي.",
        "يهدف AIXC إلى أن يكون محفّزاً لثورة الذكاء الاصطناعي في المنطقة عبر الربط بين الأوساط الأكاديمية والصناعة والخبرات الدولية والشركاء التقنيين، لتحويل القطاعات وإعداد مواهب المستقبل ودعم الشركات الناشئة وتسريع تبنّي الذكاء الاصطناعي.",
        "وبتركيزه على الرعاية الصحية والتعليم والأمن السيبراني والتقنيات الزراعية وتحديث المنشآت الصغيرة والمتوسطة، سيكون AIXC أساساً لبناء منظومة ابتكار قوية تضع جوجرانوالا في طليعة الاقتصاد الرقمي.",
        "من القوة الصناعية إلى الابتكار الذكي — تبدأ الرحلة نحو وادي جوجرانوالا. 🇵🇰🇰🇿",
      ],
      kk: [
        "Гуджранвала жасанды интеллект пен цифрлық трансформация хабына айналу жолында батыл қадам жасады: GIFT University, Gujranwala Business Alliance (GBA) және NSART (Қазақстан) бірлескен бастамасы — AI Excellence Centre (AIXC) іске қосылды, технологиялық қолдауды ONIT Global көрсетеді.",
        "Айтулы бастама Қазақстанның Пәкістандағы Елшісі Ержан Қыстафиннің, Gujranwala Business Alliance төрағасы Ахмад Икрам Лоненің және GIFT University негізін қалаушысы әрі төрағасы Анвар Дардың қатысуымен басталды — бұл Пәкістан мен Қазақстанның технология, инновация және ЖИ саласындағы ынтымақтастығының жаңа тарауы.",
        "AIXC академиялық орта, индустрия, халықаралық сарапшылық пен технологиялық серіктестерді байланыстыра отырып, салаларды трансформациялау, болашақ мамандарды даярлау, стартаптарды қолдау және ЖИ енгізуді жеделдету арқылы өңірдегі ЖИ революциясының катализаторы болуды көздейді.",
        "Басты бағыттар — денсаулық сақтау, білім беру, киберқауіпсіздік, агротех және ШОБ жаңғырту: AIXC қуатты инновациялық экожүйенің іргетасы болып, Гуджранваланы цифрлық экономиканың алдыңғы қатарына шығарады.",
        "Индустриялық қуаттан — зияткерлік инновацияға: Gujranwala Valley жолындағы сапар басталды. 🇵🇰🇰🇿",
      ],
    },
  },
  {
    id: 29,
    slug: "nurgozha-astana-venture-club",
    date: "2025-07-09",
    image: "/news/nurgozha-astana-venture-club.webp",
    tag: { ru: "Интервью", en: "Interview", ar: "مقابلة", kk: "Сұхбат" },
    location: {
      ru: "Astana Venture Club",
      en: "Astana Venture Club",
      ar: "Astana Venture Club",
      kk: "Astana Venture Club",
    },
    displayDate: {
      ru: "9 июля 2025",
      en: "9 July 2025",
      ar: "9 يوليو 2025",
      kk: "2025 жылғы 9 шілде",
    },
    title: {
      ru: "Знакомьтесь: Нургожа Калиаскаров — венчурный инвестор и резидент Astana Venture Club",
      en: "Meet Nurgozha Kaliaskarov — venture investor and Astana Venture Club resident",
      ar: "تعرّفوا على نورغوجا كالياسكاروف — مستثمر جريء وعضو مقيم في Astana Venture Club",
      kk: "Танысыңыздар: Нұрғожа Қалиасқаров — венчурлық инвестор әрі Astana Venture Club резиденті",
    },
    excerpt: {
      ru: "Венчурный инвестор и резидент Astana Venture Club Нургожа Калиаскаров отвечает на короткие, честные и точные вопросы, которые интересуют всех.",
      en: "Venture investor and Astana Venture Club resident Nurgozha Kaliaskarov answers short, honest and precise questions that everyone wants to ask.",
      ar: "المستثمر الجريء والعضو المقيم في Astana Venture Club نورغوجا كالياسكاروف يجيب عن أسئلة قصيرة وصادقة ودقيقة تهمّ الجميع.",
      kk: "Венчурлық инвестор әрі Astana Venture Club резиденті Нұрғожа Қалиасқаров барлығын қызықтыратын қысқа, шынайы әрі нақты сұрақтарға жауап береді.",
    },
    body: {
      ru: [
        "Знакомьтесь: венчурный инвестор и резидент Astana Venture Club — Нургожа Калиаскаров. Он отвечает на короткие, честные и точные вопросы, которые интересуют всех.",
        "Присоединяйтесь — будет весело! 💡",
      ],
      en: [
        "Meet Nurgozha Kaliaskarov — venture investor and Astana Venture Club resident. He answers short, honest and precise questions that everyone wants to ask.",
        "Join in — it's going to be fun! 💡",
      ],
      ar: [
        "تعرّفوا على المستثمر الجريء والعضو المقيم في Astana Venture Club — نورغوجا كالياسكاروف. يجيب عن أسئلة قصيرة وصادقة ودقيقة تهمّ الجميع.",
        "انضمّوا إلينا — ستكون ممتعة! 💡",
      ],
      kk: [
        "Танысыңыздар: венчурлық инвестор әрі Astana Venture Club резиденті — Нұрғожа Қалиасқаров. Ол барлығын қызықтыратын қысқа, шынайы әрі нақты сұрақтарға жауап береді.",
        "Қосылыңыздар — қызықты болады! 💡",
      ],
    },
  },
  {
    id: 30,
    slug: "nsart-qaztrade-alliance",
    date: "2025-09-25",
    image: "/news/nsart-qaztrade-alliance.webp",
    tag: { ru: "Партнёрство", en: "Partnership", ar: "شراكة", kk: "Серіктестік" },
    displayDate: {
      ru: "25 сентября 2025",
      en: "25 September 2025",
      ar: "25 سبتمبر 2025",
      kk: "2025 жылғы 25 қыркүйек",
    },
    title: {
      ru: "NSART и QazTrade объединяют усилия для поддержки казахстанского экспорта и стартапов",
      en: "NSART and QazTrade join forces to support Kazakhstan's exports and startups",
      ar: "NSART وQazTrade توحّدان الجهود لدعم الصادرات والشركات الناشئة الكازاخستانية",
      kk: "NSART пен QazTrade қазақстандық экспорт пен стартаптарды қолдау үшін күш біріктірді",
    },
    excerpt: {
      ru: "NSART и QazTrade теперь вместе поддерживают казахстанский экспорт и стартапы на мировом уровне: выход на рынки MENA, Южной Азии и Африки, поиск инвесторов и партнёров, акселерация и пилотные проекты.",
      en: "NSART and QazTrade now jointly support Kazakhstan's exports and startups on the global stage: entering the markets of MENA, South Asia and Africa, finding investors and partners, acceleration and pilot projects.",
      ar: "NSART وQazTrade تدعمان الآن معًا الصادرات والشركات الناشئة الكازاخستانية على المستوى العالمي: دخول أسواق الشرق الأوسط وشمال إفريقيا وجنوب آسيا وإفريقيا، وإيجاد المستثمرين والشركاء، والتسريع والمشاريع التجريبية.",
      kk: "NSART пен QazTrade енді қазақстандық экспорт пен стартаптарды жаһандық деңгейде бірлесіп қолдайды: MENA, Оңтүстік Азия және Африка нарықтарына шығу, инвесторлар мен серіктестер табу, акселерация және пилоттық жобалар.",
    },
    body: {
      ru: [
        "Спешим сообщить: NSART и QazTrade теперь вместе будут поддерживать казахстанский экспорт и стартапы на мировом уровне. Теперь мы ещё эффективнее и поможем вам с выходом на рынки MENA, Южной Азии и стран Африки, поиском инвесторов и партнёров, а также с акселерацией и пилотными проектами.",
        "Этот альянс знаменует новый этап развития программы «NSART Gateway», созданной для комплексного вывода компаний и стартапов на глобальные рынки. Призываем вас расширять границы вместе — следите за новостями о совместных инициативах NSART и QazTrade!",
      ],
      en: [
        "We are excited to announce that NSART and QazTrade will now join forces to support Kazakhstan's exports and startups on the global stage. From now on, we'll be even more effective in helping you with entering the markets of MENA, South Asia, and African countries, finding investors and partners, as well as acceleration and pilot projects.",
        "This alliance marks a new stage of our program — NSART Gateway, designed to provide comprehensive support for companies and startups entering international markets. Let's expand boundaries together — stay tuned for updates on NSART and QazTrade joint initiatives!",
      ],
      ar: [
        "يسرّنا الإعلان عن أن NSART وQazTrade ستوحّدان جهودهما من الآن فصاعدًا لدعم الصادرات والشركات الناشئة الكازاخستانية على المستوى العالمي. سنصبح الآن أكثر فاعلية في مساعدتكم على دخول أسواق منطقة الشرق الأوسط وشمال إفريقيا وجنوب آسيا والدول الإفريقية، وإيجاد المستثمرين والشركاء، إضافة إلى التسريع والمشاريع التجريبية.",
        "يمثّل هذا التحالف مرحلة جديدة في تطوّر برنامج NSART Gateway المصمَّم لتقديم دعم شامل للشركات والشركات الناشئة الداخلة إلى الأسواق العالمية. لنوسّع الحدود معًا — تابعوا أخبار المبادرات المشتركة بين NSART وQazTrade!",
      ],
      kk: [
        "Қуанышты жаңалық: NSART пен QazTrade енді бірлесіп қазақстандық экспорт пен стартаптарды жаһандық деңгейде қолдайды. Енді біз бұрынғыдан да тиімдіміз: MENA, Оңтүстік Азия және Африка елдерінің нарығына шығуға, инвесторлар мен серіктестер табуға, акселерация мен пилоттық жобаларды іске асыруға көмектесеміз.",
        "Бұл альянс компаниялар мен стартаптарды әлем нарығына кешенді түрде шығаруға арналған «NSART Gateway» бағдарламасы дамуының жаңа кезеңін көрсетеді. Шекараны бірге кеңейтейік — NSART пен QazTrade-тың бірлескен бастамаларын жібермеңіздер!",
      ],
    },
  },
  {
    id: 31,
    slug: "digital-bridge-2025-infotech-memorandum",
    date: "2025-10-25",
    image: "/news/digital-bridge-2025-infotech-memorandum.webp",
    tag: { ru: "Партнёрство", en: "Partnership", ar: "شراكة", kk: "Серіктестік" },
    location: {
      ru: "Digital Bridge 2025",
      en: "Digital Bridge 2025",
      ar: "Digital Bridge 2025",
      kk: "Digital Bridge 2025",
    },
    displayDate: {
      ru: "25 октября 2025",
      en: "25 October 2025",
      ar: "25 أكتوبر 2025",
      kk: "2025 жылғы 25 қазан",
    },
    title: {
      ru: "NSART подписал меморандум с пакистанским INFOTECH на Digital Bridge 2025",
      en: "NSART signs memorandum with Pakistan's INFOTECH at Digital Bridge 2025",
      ar: "NSART توقّع مذكرة تفاهم مع شركة INFOTECH الباكستانية في Digital Bridge 2025",
      kk: "NSART Digital Bridge 2025 форумында пәкістандық INFOTECH компаниясымен меморандумға қол қойды",
    },
    excerpt: {
      ru: "На форуме Digital Bridge 2025 NSART вместе с NITEC и пакистанским IT-гигантом INFOTECH подписали меморандум о сотрудничестве в сфере e-Government.",
      en: "At the Digital Bridge 2025 forum, NSART, together with NITEC and Pakistani IT giant INFOTECH, signed a memorandum of cooperation in the field of e-Government.",
      ar: "في منتدى Digital Bridge 2025، وقّعت NSART بالاشتراك مع NITEC وعملاق تكنولوجيا المعلومات الباكستاني INFOTECH مذكرة تعاون في مجال الحكومة الإلكترونية (e-Government).",
      kk: "Digital Bridge 2025 форумында NSART компаниясы NITEC және пәкістандық IT-алыбы INFOTECH-пен бірге e-Government саласындағы ынтымақтастық туралы меморандумға қол қойды.",
    },
    body: {
      ru: [
        "На форуме Digital Bridge 2025 NSART совместно с NITEC 🇰🇿 и пакистанским IT-гигантом INFOTECH 🇵🇰 подписали меморандум о сотрудничестве в сфере e-Government. Партнёрство направлено на развитие и внедрение цифровых решений в госсекторе, обмен технологической экспертизой и совместные проекты по цифровой трансформации в Казахстане и за его пределами.",
        "Ключевые сферы сотрудничества: цифровизация госуслуг, архитектура e-Gov, интеграционные платформы, кибербезопасность, аналитика данных и AI-решения. Соглашение стало новым шагом в укреплении технологического партнёрства между странами и вкладом в развитие доверенной цифровой экосистемы.",
      ],
      en: [
        "At the Digital Bridge 2025 forum, NSART, together with NITEC 🇰🇿 and Pakistani IT giant INFOTECH 🇵🇰, signed a memorandum of cooperation in the field of e-Government. The partnership aims to develop and deploy digital solutions in the public sector, exchange technological expertise, and pursue joint digital-transformation projects in Kazakhstan and beyond.",
        "Key areas of cooperation include the digitalization of public services, e-Gov architecture, integration platforms, cybersecurity, data analytics, and AI solutions. The agreement marks a new step in strengthening technological partnership between the two countries and a contribution to building a trusted digital ecosystem.",
      ],
      ar: [
        "في منتدى Digital Bridge 2025، وقّعت NSART بالتعاون مع NITEC 🇰🇿 وعملاق تكنولوجيا المعلومات الباكستاني INFOTECH 🇵🇰 مذكرة تعاون في مجال الحكومة الإلكترونية (e-Government). وتهدف هذه الشراكة إلى تطوير الحلول الرقمية وتطبيقها في القطاع الحكومي، وتبادل الخبرات التكنولوجية، وتنفيذ مشاريع مشتركة للتحول الرقمي في كازاخستان وخارجها.",
        "وتشمل مجالات التعاون الرئيسية: رقمنة الخدمات الحكومية، وبنية e-Gov، ومنصات التكامل، والأمن السيبراني، وتحليل البيانات، وحلول الذكاء الاصطناعي. وقد شكّل الاتفاق خطوة جديدة في تعزيز الشراكة التكنولوجية بين البلدين، وإسهامًا في تطوير منظومة رقمية موثوقة.",
      ],
      kk: [
        "Digital Bridge 2025 форумында NSART компаниясы NITEC 🇰🇿 және пәкістандық IT-алыбы INFOTECH 🇵🇰 компаниясымен бірлесіп e-Government саласындағы ынтымақтастық туралы меморандумға қол қойды. Бұл серіктестік мемлекеттік секторда цифрлық шешімдерді дамыту мен енгізуге, технологиялық сараптамамен алмасуға, сондай-ақ Қазақстанда және одан тыс жерлерде цифрлық трансформация бойынша бірлескен жобаларды жүзеге асыруға бағытталған.",
        "Ынтымақтастықтың негізгі бағыттары: мемлекеттік қызметтерді цифрландыру, e-Gov архитектурасы, интеграциялық платформалар, киберқауіпсіздік, деректер аналитикасы және AI-шешімдер. Бұл келісім елдер арасындағы технологиялық серіктестікті нығайтудағы жаңа қадам әрі сенімді цифрлық экожүйені дамытуға қосылған үлес болды.",
      ],
    },
  },
  {
    id: 32,
    slug: "spacelab-visit",
    date: "2025-11-09",
    image: "/news/spacelab-visit.webp",
    tag: { ru: "Визит", en: "Visit", ar: "زيارة", kk: "Сапар" },
    location: { ru: "Астана", en: "Astana", ar: "أستانا", kk: "Астана" },
    displayDate: {
      ru: "9 ноября 2025",
      en: "9 November 2025",
      ar: "9 نوفمبر 2025",
      kk: "2025 жылғы 9 қараша",
    },
    title: {
      ru: "NSART в гостях у SpaceLab: спутники, CubeSat и IoT",
      en: "NSART visits SpaceLab: satellites, CubeSat and IoT",
      ar: "NSART في ضيافة SpaceLab: الأقمار الصناعية وCubeSat وIoT",
      kk: "NSART SpaceLab компаниясында қонақта болды: спутниктер, CubeSat және IoT",
    },
    excerpt: {
      ru: "Команда NSART побывала у SpaceLab — казахстанской компании, разрабатывающей спутниковые и IoT-технологии, и обсудила совместное развитие космических решений.",
      en: "The NSART team visited SpaceLab — a Kazakhstani company developing satellite and IoT technologies — and discussed the joint development of space solutions.",
      ar: "زار فريق NSART شركة SpaceLab، وهي شركة كازاخستانية تطوّر تقنيات الأقمار الصناعية وإنترنت الأشياء (IoT)، وبحث معها التطوير المشترك للحلول الفضائية.",
      kk: "NSART командасы спутниктік және IoT-технологияларын әзірлейтін қазақстандық SpaceLab компаниясында болып, ғарыштық шешімдерді бірлесіп дамытуды талқылады.",
    },
    body: {
      ru: [
        "Команда NSART побывала в гостях у SpaceLab — казахстанской компании, разрабатывающей спутниковые и IoT-технологии. SpaceLab создаёт решения для передачи данных через спутники, разрабатывает CubeSat-платформы и внедряет IoT-системы для связи и мониторинга даже в самых удалённых точках планеты. Их разработки уже применяются в агросекторе, промышленности и экологии.",
        "В ходе встречи стороны обсудили возможные направления сотрудничества и развитие космических технологий в Казахстане. Особенно впечатлило то, как инновации, созданные внутри страны, выходят на международный уровень.",
      ],
      en: [
        "The NSART team visited SpaceLab, a Kazakhstani company developing satellite and IoT technologies. SpaceLab creates solutions for transmitting data via satellites, develops CubeSat platforms, and deploys IoT systems for connectivity and monitoring even in the most remote parts of the planet. Their developments are already being applied in the agricultural sector, industry, and ecology.",
        "During the meeting, the parties discussed potential areas of cooperation and the development of space technologies in Kazakhstan. Particularly impressive was how innovations created within the country are reaching the international level.",
      ],
      ar: [
        "زار فريق NSART شركة SpaceLab، وهي شركة كازاخستانية تطوّر تقنيات الأقمار الصناعية وإنترنت الأشياء (IoT). وتبتكر SpaceLab حلولًا لنقل البيانات عبر الأقمار الصناعية، وتطوّر منصات CubeSat، وتطبّق أنظمة IoT للاتصال والمراقبة حتى في أكثر بقاع الكوكب بُعدًا. وتُستخدم ابتكاراتها بالفعل في القطاع الزراعي والصناعة والبيئة.",
        "وخلال اللقاء، بحث الطرفان مجالات التعاون الممكنة وتطوير التقنيات الفضائية في كازاخستان. وكان لافتًا بشكل خاص كيف تصل الابتكارات المصنوعة داخل البلاد إلى المستوى الدولي.",
      ],
      kk: [
        "NSART командасы спутниктік және IoT-технологияларын әзірлейтін қазақстандық SpaceLab компаниясында қонақта болды. SpaceLab деректерді спутниктер арқылы беру шешімдерін жасайды, CubeSat платформаларын әзірлейді және планетаның ең шалғай нүктелерінде де байланыс пен мониторинг үшін IoT-жүйелерін енгізеді. Олардың әзірлемелері агросекторда, өнеркәсіпте және экологияда қазірден бастап қолданылып жүр.",
        "Кездесу барысында тараптар ынтымақтастықтың ықтимал бағыттарын және Қазақстанда ғарыш технологияларын дамытуды талқылады. Ел ішінде жасалған инновациялардың халықаралық деңгейге шығып жатқаны ерекше әсер қалдырды.",
      ],
    },
  },
  {
    id: 33,
    slug: "gujranwala-business-centre-memorandum",
    date: "2025-11-10",
    image: "/news/gujranwala-business-centre-memorandum.webp",
    tag: { ru: "Партнёрство", en: "Partnership", ar: "شراكة", kk: "Серіктестік" },
    location: {
      ru: "Казахстан — Пакистан",
      en: "Kazakhstan — Pakistan",
      ar: "كازاخستان — باكستان",
      kk: "Қазақстан — Пәкістан",
    },
    displayDate: {
      ru: "10 ноября 2025",
      en: "10 November 2025",
      ar: "10 نوفمبر 2025",
      kk: "2025 жылғы 10 қараша",
    },
    title: {
      ru: "NSART и Ed Tech KN подписали меморандум с пакистанским Gujranwala Business Centre",
      en: "NSART and Ed Tech KN sign memorandum with Pakistan's Gujranwala Business Centre",
      ar: "NSART وEd Tech KN توقّعان مذكرة تفاهم مع Gujranwala Business Centre الباكستاني",
      kk: "NSART және Ed Tech KN пәкістандық Gujranwala Business Centre-мен меморандумға қол қойды",
    },
    excerpt: {
      ru: "Новый этап сотрудничества между Казахстаном и Пакистаном в сфере инноваций, технологий и развития стартап-сообществ двух стран.",
      en: "A new stage of cooperation between Kazakhstan and Pakistan in the field of innovation, technology, and the development of the two countries' startup communities.",
      ar: "مرحلة جديدة من التعاون بين كازاخستان وباكستان في مجالات الابتكار والتكنولوجيا وتطوير مجتمعات الشركات الناشئة في البلدين.",
      kk: "Қазақстан мен Пәкістан арасындағы инновация, технология және екі елдің стартап-қауымдастықтарын дамыту саласындағы ынтымақтастықтың жаңа кезеңі.",
    },
    body: {
      ru: [
        "NSART официально подписал меморандум о взаимопонимании с Gujranwala Business Centre (Пакистан) при участии Ed Tech KN — это новый этап сотрудничества между Казахстаном и Пакистаном 🇰🇿🇵🇰 в сфере инноваций и технологий.",
        "Партнёрство открывает возможности для совместных проектов, обмена знаниями и развития стартап-сообществ двух стран.",
      ],
      en: [
        "NSART has officially signed a memorandum of understanding with the Gujranwala Business Centre (Pakistan), with the participation of Ed Tech KN — a new stage of cooperation between Kazakhstan and Pakistan 🇰🇿🇵🇰 in the field of innovation and technology.",
        "The partnership opens up opportunities for joint projects, knowledge exchange, and the development of the two countries' startup communities.",
      ],
      ar: [
        "وقّعت NSART رسميًا مذكرة تفاهم مع Gujranwala Business Centre (باكستان) بمشاركة Ed Tech KN، في مرحلة جديدة من التعاون بين كازاخستان وباكستان 🇰🇿🇵🇰 في مجالي الابتكار والتكنولوجيا.",
        "وتفتح هذه الشراكة آفاقًا لمشاريع مشتركة وتبادل المعرفة وتطوير مجتمعات الشركات الناشئة في البلدين.",
      ],
      kk: [
        "NSART Ed Tech KN қатысуымен Gujranwala Business Centre (Пәкістан) компаниясымен өзара түсіністік туралы меморандумға ресми түрде қол қойды — бұл Қазақстан мен Пәкістан 🇰🇿🇵🇰 арасындағы инновация мен технология саласындағы ынтымақтастықтың жаңа кезеңі.",
        "Бұл серіктестік бірлескен жобалар жүргізуге, біліммен алмасуға және екі елдің стартап-қауымдастықтарын дамытуға мүмкіндік ашады.",
      ],
    },
  },
  {
    id: 34,
    slug: "green-build-central-asia",
    date: "2025-11-20",
    image: "/news/green-build-central-asia.webp",
    tag: { ru: "Форум", en: "Forum", ar: "منتدى", kk: "Форум" },
    location: { ru: "Астана", en: "Astana", ar: "أستانا", kk: "Астана" },
    displayDate: {
      ru: "20 ноября 2025",
      en: "20 November 2025",
      ar: "20 نوفمبر 2025",
      kk: "2025 жылғы 20 қараша",
    },
    title: {
      ru: "NSART на форуме Green Build Central Asia в Астане",
      en: "NSART at the Green Build Central Asia forum in Astana",
      ar: "NSART في منتدى Green Build Central Asia في أستانا",
      kk: "NSART Астанадағы Green Build Central Asia форумында",
    },
    excerpt: {
      ru: "Вместе с партнёрами Ed Tech KN и KT Cloud Lab NSART обсудил устойчивое строительство, зелёные стандарты и технологии будущего.",
      en: "Together with partners Ed Tech KN and KT Cloud Lab, NSART discussed sustainable construction, green standards, and the technologies of the future.",
      ar: "إلى جانب الشريكين Ed Tech KN وKT Cloud Lab، ناقشت NSART البناء المستدام والمعايير الخضراء وتقنيات المستقبل.",
      kk: "Ed Tech KN және KT Cloud Lab серіктестерімен бірге NSART тұрақты құрылысты, жасыл стандарттарды және болашақ технологияларын талқылады.",
    },
    body: {
      ru: [
        "NSART вместе с партнёрами Ed Tech KN и KT Cloud Lab по приглашению KazGBC принял участие в форуме Green Build Central Asia в Астане. Участники обсудили устойчивое строительство, зелёные стандарты и инновационные технологии будущего.",
        "Форум стал отличной возможностью расширить сотрудничество и найти новые точки роста в сфере зелёных технологий. 🌱",
      ],
      en: [
        "NSART, together with partners Ed Tech KN and KT Cloud Lab and at the invitation of KazGBC, took part in the Green Build Central Asia forum in Astana. Participants discussed sustainable construction, green standards, and innovative technologies of the future.",
        "The forum was an excellent opportunity to expand cooperation and find new growth points in the field of green technologies. 🌱",
      ],
      ar: [
        "شاركت NSART إلى جانب الشريكين Ed Tech KN وKT Cloud Lab، بدعوة من KazGBC، في منتدى Green Build Central Asia في أستانا. وناقش المشاركون البناء المستدام والمعايير الخضراء والتقنيات المبتكرة للمستقبل.",
        "وقد شكّل المنتدى فرصة ممتازة لتوسيع التعاون وإيجاد نقاط نمو جديدة في مجال التقنيات الخضراء. 🌱",
      ],
      kk: [
        "NSART Ed Tech KN және KT Cloud Lab серіктестерімен бірге KazGBC шақыруымен Астанада өткен Green Build Central Asia форумына қатысты. Қатысушылар тұрақты құрылысты, жасыл стандарттарды және болашақтың инновациялық технологияларын талқылады.",
        "Форум ынтымақтастықты кеңейтуге және жасыл технологиялар саласында жаңа өсу нүктелерін табуға тамаша мүмкіндік болды. 🌱",
      ],
    },
  },
  {
    id: 35,
    slug: "artisan-education-memorandum",
    date: "2025-11-24",
    image: "/news/artisan-education-memorandum.webp",
    tag: { ru: "Партнёрство", en: "Partnership", ar: "شراكة", kk: "Серіктестік" },
    displayDate: {
      ru: "24 ноября 2025",
      en: "24 November 2025",
      ar: "24 نوفمبر 2025",
      kk: "2025 жылғы 24 қараша",
    },
    title: {
      ru: "NSART и Artisan Education подписали меморандум о сотрудничестве",
      en: "NSART and Artisan Education sign a memorandum of cooperation",
      ar: "NSART وArtisan Education توقّعان مذكرة تعاون",
      kk: "NSART және Artisan Education ынтымақтастық туралы меморандумға қол қойды",
    },
    excerpt: {
      ru: "В фокусе совместной работы — реализация образовательных инициатив и совместных проектов в сфере образования.",
      en: "The focus of the joint work is the implementation of educational initiatives and joint projects in the field of education.",
      ar: "يتركّز العمل المشترك على تنفيذ المبادرات التعليمية والمشاريع المشتركة في مجال التعليم.",
      kk: "Бірлескен жұмыстың басты бағыты — білім беру бастамаларын және білім саласындағы бірлескен жобаларды жүзеге асыру.",
    },
    body: {
      ru: [
        "NSART и Artisan Education объявляют о заключении меморандума о сотрудничестве. В фокусе совместной работы — реализация образовательных инициатив и совместных проектов в сфере образования.",
      ],
      en: [
        "NSART and Artisan Education announce the signing of a memorandum of cooperation. The focus of the joint work is the implementation of educational initiatives and joint projects in the field of education.",
      ],
      ar: [
        "تعلن NSART وArtisan Education عن إبرام مذكرة تعاون. ويتركّز العمل المشترك على تنفيذ المبادرات التعليمية والمشاريع المشتركة في مجال التعليم.",
      ],
      kk: [
        "NSART және Artisan Education ынтымақтастық туралы меморандум жасасқанын жариялайды. Бірлескен жұмыстың басты бағыты — білім беру бастамаларын және білім саласындағы бірлескен жобаларды жүзеге асыру.",
      ],
    },
  },
  {
    id: 36,
    slug: "kazaid-visit",
    date: "2025-11-25",
    image: "/news/kazaid-visit.webp",
    tag: { ru: "Визит", en: "Visit", ar: "زيارة", kk: "Сапар" },
    displayDate: {
      ru: "25 ноября 2025",
      en: "25 November 2025",
      ar: "25 نوفمبر 2025",
      kk: "2025 жылғы 25 қараша",
    },
    title: {
      ru: "NSART и Ed Tech KN посетили офис KazAID",
      en: "NSART and Ed Tech KN visit the KazAID office",
      ar: "NSART وEd Tech KN تزوران مكتب KazAID",
      kk: "NSART және Ed Tech KN KazAID кеңсесіне барды",
    },
    excerpt: {
      ru: "Стороны обсудили перспективы сотрудничества и совместные инициативы в сфере образования и технологического развития региона.",
      en: "The parties discussed prospects for cooperation and joint initiatives in the field of education and the region's technological development.",
      ar: "بحث الطرفان آفاق التعاون والمبادرات المشتركة في مجالي التعليم والتطوير التكنولوجي في المنطقة.",
      kk: "Тараптар ынтымақтастық перспективаларын және аймақтың білім беру мен технологиялық дамуы саласындағы бірлескен бастамаларды талқылады.",
    },
    body: {
      ru: [
        "Команда NSART совместно с партнёрами Ed Tech KN посетила офис KazAID. На встрече стороны обсудили перспективы дальнейшего сотрудничества, совместные инициативы в сфере образования и технологического развития, а также возможные проекты, которые смогут принести пользу региону.",
        "NSART благодарит KazAID за тёплый приём и конструктивный диалог и уверен, что впереди — новые возможности для плодотворной работы.",
      ],
      en: [
        "The NSART team, together with partners Ed Tech KN, visited the KazAID office. At the meeting, the parties discussed prospects for further cooperation, joint initiatives in education and technological development, as well as potential projects that could benefit the region.",
        "NSART thanks KazAID for the warm welcome and constructive dialogue and is confident that new opportunities for fruitful work lie ahead.",
      ],
      ar: [
        "زار فريق NSART بالاشتراك مع الشريك Ed Tech KN مكتب KazAID. وخلال اللقاء، بحث الطرفان آفاق التعاون المستقبلي، والمبادرات المشتركة في مجالي التعليم والتطوير التكنولوجي، إضافة إلى المشاريع الممكنة التي يمكن أن تعود بالنفع على المنطقة.",
        "وتتقدّم NSART بالشكر إلى KazAID على حسن الاستقبال والحوار البنّاء، وهي على ثقة بأن آفاقًا جديدة من العمل المثمر تنتظر الطرفين.",
      ],
      kk: [
        "NSART командасы Ed Tech KN серіктестерімен бірге KazAID кеңсесіне барды. Кездесуде тараптар одан әрі ынтымақтастық перспективаларын, білім беру мен технологиялық даму саласындағы бірлескен бастамаларды, сондай-ақ аймаққа пайда әкелетін ықтимал жобаларды талқылады.",
        "NSART жылы қабылдағаны және сындарлы диалог үшін KazAID-ке алғыс білдіреді әрі алда жемісті жұмыс үшін жаңа мүмкіндіктер бар деп сенеді.",
      ],
    },
  },
  {
    id: 37,
    slug: "nsart-gateway-pakistan-agreements",
    date: "2026-02-06",
    image: "/news/nsart-gateway-pakistan-agreements.webp",
    tag: { ru: "Экспорт", en: "Export", ar: "تصدير", kk: "Экспорт" },
    location: { ru: "Пакистан", en: "Pakistan", ar: "باكستان", kk: "Пәкістан" },
    displayDate: {
      ru: "6 февраля 2026",
      en: "6 February 2026",
      ar: "6 فبراير 2026",
      kk: "2026 жылғы 6 ақпан",
    },
    title: {
      ru: "NSART Gateway: 6 соглашений на $30 млн в рамках госвизита Президента РК в Пакистан",
      en: "NSART Gateway: 6 agreements worth $30 million during the President of Kazakhstan's state visit to Pakistan",
      ar: "NSART Gateway: 6 اتفاقيات بقيمة 30 مليون دولار خلال الزيارة الرسمية لرئيس كازاخستان إلى باكستان",
      kk: "NSART Gateway: ҚР Президентінің Пәкістанға мемлекеттік сапары аясында 30 млн долларға 6 келісім",
    },
    excerpt: {
      ru: "В рамках визита Президента Касым-Жомарта Токаева в Пакистан команда NSART заключила 6 соглашений общей стоимостью около 30 млн долларов.",
      en: "During President Kassym-Jomart Tokayev's visit to Pakistan, the NSART team concluded 6 agreements with a total value of around $30 million.",
      ar: "خلال زيارة الرئيس قاسم جومارت توكاييف إلى باكستان، أبرم فريق NSART 6 اتفاقيات بقيمة إجمالية تناهز 30 مليون دولار.",
      kk: "Президент Қасым-Жомарт Тоқаевтың Пәкістанға сапары аясында NSART командасы жалпы құны шамамен 30 млн доллар болатын 6 келісім жасады.",
    },
    body: {
      ru: [
        "В рамках государственного визита Президента Казахстана Касым-Жомарта Токаева в Пакистан команда NSART приняла участие в деловой программе и B2B-переговорах. Итог — 6 соглашений и договорённостей общей стоимостью около 30 млн долларов США.",
        "За этими цифрами стоят реальные проекты: цифровые госуслуги, образовательные инициативы, финтех-решения, а также работа с AI-дата-центрами — полный цикл от проектирования и сертификации до подготовки специалистов. Эти инициативы уже закладывают основу отрасли, которая будет востребована завтра.",
        "Все соглашения достигнуты в рамках программы NSART Gateway при поддержке QazTrade, МИД РК, Посольства Казахстана в Пакистане и KazakhInvest. Для NSART это — знак доверия, выход казахстанских технологий на новые рынки и основа долгосрочного партнёрства между странами. Впереди много работы — это только начало.",
      ],
      en: [
        "As part of the state visit of the President of Kazakhstan, Kassym-Jomart Tokayev, to Pakistan, the NSART team took part in the business program and B2B negotiations. The result: 6 agreements and arrangements with a total value of around $30 million.",
        "Behind these figures are real projects: digital public services, educational initiatives, fintech solutions, and work with AI data centers — a full cycle from design and certification to specialist training. These initiatives are already laying the foundation for an industry that will be in demand tomorrow.",
        "All agreements were reached under the NSART Gateway program with the support of QazTrade, the Ministry of Foreign Affairs of Kazakhstan, the Embassy of Kazakhstan in Pakistan, and KazakhInvest. For NSART, this is a sign of trust, the entry of Kazakhstani technologies into new markets, and a foundation for long-term partnership between the countries. There is much work ahead — this is only the beginning.",
      ],
      ar: [
        "في إطار الزيارة الرسمية لرئيس كازاخستان قاسم جومارت توكاييف إلى باكستان، شارك فريق NSART في البرنامج الاقتصادي ومفاوضات B2B. وكانت الحصيلة 6 اتفاقيات وتفاهمات بقيمة إجمالية تناهز 30 مليون دولار أمريكي.",
        "وتقف خلف هذه الأرقام مشاريع حقيقية: الخدمات الحكومية الرقمية، والمبادرات التعليمية، وحلول التكنولوجيا المالية، إضافة إلى العمل مع مراكز بيانات الذكاء الاصطناعي، وذلك ضمن دورة متكاملة تمتد من التصميم والاعتماد إلى تأهيل الكوادر. وترسي هذه المبادرات بالفعل أسس صناعة سيكون عليها طلب كبير في الغد.",
        "وقد أُبرمت جميع الاتفاقيات ضمن برنامج NSART Gateway بدعم من QazTrade، ووزارة خارجية كازاخستان، وسفارة كازاخستان في باكستان، وKazakhInvest. وهذا بالنسبة إلى NSART دليل ثقة، ووصول للتقنيات الكازاخستانية إلى أسواق جديدة، وأساس لشراكة طويلة الأمد بين البلدين. وأمامنا الكثير من العمل، فهذه ليست سوى البداية.",
      ],
      kk: [
        "Қазақстан Президенті Қасым-Жомарт Тоқаевтың Пәкістанға мемлекеттік сапары аясында NSART командасы іскерлік бағдарламаға және B2B-келіссөздерге қатысты. Нәтижесі — жалпы құны шамамен 30 млн АҚШ доллары болатын 6 келісім мен уағдаластық.",
        "Бұл сандардың артында нақты жобалар тұр: цифрлық мемлекеттік қызметтер, білім беру бастамалары, финтех-шешімдер, сондай-ақ AI-дата-орталықтарымен жұмыс — жобалау мен сертификаттаудан бастап мамандар даярлауға дейінгі толық цикл. Бұл бастамалар ертең сұранысқа ие болатын саланың негізін қазірден қалап жатыр.",
        "Барлық келісімдер QazTrade, ҚР СІМ, Қазақстанның Пәкістандағы Елшілігі және KazakhInvest қолдауымен NSART Gateway бағдарламасы аясында жасалды. NSART үшін бұл — сенім белгісі, қазақстандық технологиялардың жаңа нарықтарға шығуы және елдер арасындағы ұзақ мерзімді серіктестіктің негізі. Алда — көп жұмыс, бұл тек бастамасы ғана.",
      ],
    },
  },
  {
    id: 38,
    slug: "riyadh-space-lab-launch",
    date: "2026-02-12",
    image: "/news/riyadh-space-lab-launch.webp",
    tag: { ru: "SpaceTech", en: "SpaceTech", ar: "SpaceTech", kk: "SpaceTech" },
    location: {
      ru: "Эр-Рияд, Саудовская Аравия",
      en: "Riyadh, Saudi Arabia",
      ar: "الرياض، المملكة العربية السعودية",
      kk: "Эр-Рияд, Сауд Арабиясы",
    },
    displayDate: {
      ru: "12 февраля 2026",
      en: "12 February 2026",
      ar: "12 فبراير 2026",
      kk: "2026 жылғы 12 ақпан",
    },
    title: {
      ru: "NSART открыл первую казахстанскую космическую R&D-лабораторию в Эр-Рияде",
      en: "NSART opens the first Kazakhstani space R&D laboratory in Riyadh",
      ar: "NSART تفتتح أول مختبر كازاخستاني للبحث والتطوير الفضائي في الرياض",
      kk: "NSART Эр-Риядта алғашқы қазақстандық ғарыштық R&D-зертханасын ашты",
    },
    excerpt: {
      ru: "Первая казахстанская космическая R&D-лаборатория запущена в Эр-Рияде в рамках программы NSART Gateway. Ожидаемый эффект проекта — порядка $50 млн.",
      en: "The first Kazakhstani space R&D laboratory has been launched in Riyadh under the NSART Gateway program. The project's expected impact is around $50 million.",
      ar: "أُطلق أول مختبر كازاخستاني للبحث والتطوير الفضائي في الرياض ضمن برنامج NSART Gateway. ويُتوقّع أن يبلغ أثر المشروع نحو 50 مليون دولار.",
      kk: "Эр-Риядта NSART Gateway бағдарламасы аясында алғашқы қазақстандық ғарыштық R&D-зертханасы іске қосылды. Жобаның күтілетін әсері — шамамен 50 млн доллар.",
    },
    body: {
      ru: [
        "NSART запустила первую казахстанскую космическую R&D-лабораторию в Эр-Рияде (Саудовская Аравия) в рамках программы NSART Gateway при поддержке QazTrade. Партнёрами проекта выступили Space Lab, Pnode и King Saud University — один из крупнейших университетов региона.",
        "В лаборатории команда разрабатывает и тестирует технологии спутниковой связи. Ключевые направления на 2026 год: спутниковые IoVIT-терминалы связи, IoT-сенсоры и телекоммуникационные спутниковые решения. Пилотные проекты планируется запустить в первой половине 2026 года, а во второй — перейти к коммерческому масштабированию. Ожидаемый экспортный и инвестиционный эффект — порядка $50 млн.",
        "Открытие особенно символично: 2026 год в Казахстане объявлен Годом ИИ и высокотехнологичного экспорта, а Саудовская Аравия активно развивает космическую отрасль в рамках Saudi Vision 2030.",
      ],
      en: [
        "NSART has launched the first Kazakhstani space R&D laboratory in Riyadh (Saudi Arabia) under the NSART Gateway program with the support of QazTrade. The project's partners are Space Lab, Pnode, and King Saud University — one of the largest universities in the region.",
        "In the laboratory, the team develops and tests satellite communication technologies. Key areas for 2026: satellite IoVIT communication terminals, IoT sensors, and telecommunications satellite solutions. Pilot projects are planned to launch in the first half of 2026, with a move to commercial scaling in the second half. The expected export and investment impact is around $50 million.",
        "The opening is especially symbolic: 2026 has been declared the Year of AI and High-Tech Exports in Kazakhstan, while Saudi Arabia is actively developing its space industry as part of Saudi Vision 2030.",
      ],
      ar: [
        "أطلقت NSART أول مختبر كازاخستاني للبحث والتطوير الفضائي في الرياض (المملكة العربية السعودية) ضمن برنامج NSART Gateway بدعم من QazTrade. وكان شركاء المشروع كلًّا من Space Lab وPnode وKing Saud University، إحدى أكبر جامعات المنطقة.",
        "ويطوّر الفريق في المختبر تقنيات الاتصالات عبر الأقمار الصناعية ويختبرها. وتشمل المحاور الرئيسية لعام 2026: أطراف الاتصال الفضائية IoVIT، وحساسات IoT، وحلول الاتصالات الفضائية. ومن المقرر إطلاق المشاريع التجريبية في النصف الأول من عام 2026، والانتقال في النصف الثاني إلى التوسّع التجاري. ويُتوقّع أن يبلغ الأثر التصديري والاستثماري نحو 50 مليون دولار.",
        "ويكتسب الافتتاح رمزية خاصة، إذ أُعلن عام 2026 في كازاخستان عامًا للذكاء الاصطناعي والتصدير عالي التقنية، بينما تطوّر المملكة العربية السعودية قطاعها الفضائي بنشاط ضمن Saudi Vision 2030.",
      ],
      kk: [
        "NSART QazTrade қолдауымен NSART Gateway бағдарламасы аясында Эр-Риядта (Сауд Арабиясы) алғашқы қазақстандық ғарыштық R&D-зертханасын іске қосты. Жобаның серіктестері — Space Lab, Pnode және аймақтағы ірі университеттердің бірі King Saud University болды.",
        "Зертханада команда спутниктік байланыс технологияларын әзірлеп, сынақтан өткізеді. 2026 жылға арналған негізгі бағыттар: спутниктік IoVIT байланыс терминалдары, IoT-сенсорлар және телекоммуникациялық спутниктік шешімдер. Пилоттық жобаларды 2026 жылдың бірінші жартысында іске қосу, ал екінші жартысында коммерциялық ауқымдауға көшу жоспарланған. Күтілетін экспорттық және инвестициялық әсер — шамамен 50 млн доллар.",
        "Ашылу ерекше символдық мәнге ие: 2026 жыл Қазақстанда Жасанды интеллект пен жоғары технологиялық экспорт жылы деп жарияланса, Сауд Арабиясы Saudi Vision 2030 аясында ғарыш саласын белсенді дамытып жатыр.",
      ],
    },
  },
  {
    id: 39,
    slug: "riyadh-space-lab-official-opening",
    date: "2026-02-15",
    image: "/news/riyadh-space-lab-official-opening.webp",
    tag: { ru: "SpaceTech", en: "SpaceTech", ar: "SpaceTech", kk: "SpaceTech" },
    location: {
      ru: "Эр-Рияд, Саудовская Аравия",
      en: "Riyadh, Saudi Arabia",
      ar: "الرياض، المملكة العربية السعودية",
      kk: "Эр-Рияд, Сауд Арабиясы",
    },
    displayDate: {
      ru: "15 февраля 2026",
      en: "15 February 2026",
      ar: "15 فبراير 2026",
      kk: "2026 жылғы 15 ақпан",
    },
    title: {
      ru: "Официальное открытие космической R&D-лаборатории NSART в Эр-Рияде",
      en: "Official opening of NSART's space R&D laboratory in Riyadh",
      ar: "الافتتاح الرسمي لمختبر NSART للبحث والتطوير الفضائي في الرياض",
      kk: "NSART-тың Эр-Риядтағы ғарыштық R&D-зертханасының ресми ашылуы",
    },
    excerpt: {
      ru: "В Эр-Рияде официально открыта первая казахстанская космическая R&D-лаборатория — совместный проект NSART, SpaceLab и PNode при поддержке QazTrade.",
      en: "The first Kazakhstani space R&D laboratory — a joint project of NSART, SpaceLab, and PNode with the support of QazTrade — has officially opened in Riyadh.",
      ar: "افتُتح رسميًا في الرياض أول مختبر كازاخستاني للبحث والتطوير الفضائي، وهو مشروع مشترك بين NSART وSpaceLab وPNode بدعم من QazTrade.",
      kk: "Эр-Риядта алғашқы қазақстандық ғарыштық R&D-зертханасы ресми түрде ашылды — бұл NSART, SpaceLab және PNode-тың QazTrade қолдауымен жүзеге асырған бірлескен жобасы.",
    },
    body: {
      ru: [
        "В рамках программы NSART Gateway в Эр-Рияде официально открыта первая казахстанская космическая R&D-лаборатория. Проект реализован NSART, SpaceLab и PNode при поддержке QazTrade.",
        "Лаборатория сосредоточена на разработке и тестировании технологий спутниковой связи нового поколения. Приоритеты на 2026 год: спутниковые IoVIT-терминалы, IoT-сенсоры и телекоммуникационные спутниковые решения. Первые пилотные проекты стартуют в первой половине 2026 года, коммерческое масштабирование — во второй. Оценочный экспортный и инвестиционный эффект — около $50 млн.",
        "Этот шаг укрепляет сотрудничество Казахстана и Саудовской Аравии в сфере SpaceTech и соответствует как объявленному в Казахстане Году ИИ и высокотехнологичного экспорта, так и целям Saudi Vision 2030.",
      ],
      en: [
        "Under the NSART Gateway program, the first Kazakhstani space R&D laboratory has officially opened in Riyadh. The project was carried out by NSART, SpaceLab, and PNode with the support of QazTrade.",
        "The laboratory focuses on the development and testing of next-generation satellite communication technologies. Priorities for 2026: satellite IoVIT terminals, IoT sensors, and telecommunications satellite solutions. The first pilot projects will start in the first half of 2026, with commercial scaling in the second half. The estimated export and investment impact is around $50 million.",
        "This step strengthens cooperation between Kazakhstan and Saudi Arabia in the field of SpaceTech and aligns with both the Year of AI and High-Tech Exports declared in Kazakhstan and the goals of Saudi Vision 2030.",
      ],
      ar: [
        "ضمن برنامج NSART Gateway، افتُتح رسميًا في الرياض أول مختبر كازاخستاني للبحث والتطوير الفضائي. وقد نفّذت المشروع NSART وSpaceLab وPNode بدعم من QazTrade.",
        "ويركّز المختبر على تطوير واختبار تقنيات الجيل الجديد من الاتصالات عبر الأقمار الصناعية. وتشمل أولويات عام 2026: أطراف الاتصال الفضائية IoVIT، وحساسات IoT، وحلول الاتصالات الفضائية. وتنطلق المشاريع التجريبية الأولى في النصف الأول من عام 2026، فيما يأتي التوسّع التجاري في النصف الثاني. ويُقدَّر الأثر التصديري والاستثماري بنحو 50 مليون دولار.",
        "وتعزّز هذه الخطوة التعاون بين كازاخستان والمملكة العربية السعودية في مجال SpaceTech، وتتوافق مع عام الذكاء الاصطناعي والتصدير عالي التقنية المعلَن في كازاخستان، ومع أهداف Saudi Vision 2030 على حد سواء.",
      ],
      kk: [
        "NSART Gateway бағдарламасы аясында Эр-Риядта алғашқы қазақстандық ғарыштық R&D-зертханасы ресми түрде ашылды. Жоба QazTrade қолдауымен NSART, SpaceLab және PNode тарапынан жүзеге асырылды.",
        "Зертхана жаңа буын спутниктік байланыс технологияларын әзірлеу мен сынауға шоғырланған. 2026 жылға арналған басымдықтар: спутниктік IoVIT-терминалдары, IoT-сенсорлар және телекоммуникациялық спутниктік шешімдер. Алғашқы пилоттық жобалар 2026 жылдың бірінші жартысында басталады, коммерциялық ауқымдау — екінші жартысында. Болжамды экспорттық және инвестициялық әсер — шамамен 50 млн доллар.",
        "Бұл қадам Қазақстан мен Сауд Арабиясының SpaceTech саласындағы ынтымақтастығын нығайтады әрі Қазақстанда жарияланған Жасанды интеллект пен жоғары технологиялық экспорт жылының да, Saudi Vision 2030 мақсаттарының да үдесінен шығады.",
      ],
    },
  },
  {
    id: 40,
    slug: "space-ai-competition-aeroo-jury",
    date: "2026-04-12",
    image: "/news/space-ai-competition-aeroo-jury.webp",
    images: [
      "/news/space-ai-competition-aeroo-jury.webp",
      "/news/space-ai-competition-aeroo-jury-2.webp",
      "/news/space-ai-competition-aeroo-jury-3.webp",
      "/news/space-ai-competition-aeroo-jury-4.webp",
      "/news/space-ai-competition-aeroo-jury-5.webp",
    ],
    tag: { ru: "Событие", en: "Event", ar: "فعالية", kk: "Іс-шара" },
    location: { ru: "Астана", en: "Astana", ar: "أستانا", kk: "Астана" },
    displayDate: {
      ru: "12 апреля 2026",
      en: "12 April 2026",
      ar: "12 أبريل 2026",
      kk: "2026 жылғы 12 сәуір",
    },
    title: {
      ru: "NSART в жюри финала Space AI Competition (AEROO) в Астане",
      en: "NSART on the jury of the Space AI Competition (AEROO) final in Astana",
      ar: "NSART ضمن لجنة تحكيم نهائي Space AI Competition (AEROO) في أستانا",
      kk: "NSART Астанадағы Space AI Competition (AEROO) финалының қазылар алқасында",
    },
    excerpt: {
      ru: "4 дня, 20 команд, участники 14–18 лет защищали AI-проекты для космоса с реальными MVP и бизнес-моделями. NSART выступил экспертом жюри.",
      en: "4 days, 20 teams, participants aged 14–18 pitched AI projects for space with real MVPs and business models. NSART served as a jury expert.",
      ar: "4 أيام و20 فريقًا، دافع مشاركون تتراوح أعمارهم بين 14 و18 عامًا عن مشاريع ذكاء اصطناعي للفضاء بنماذج MVP حقيقية ونماذج أعمال. وشاركت NSART بصفة خبير في لجنة التحكيم.",
      kk: "4 күн, 20 команда, 14–18 жастағы қатысушылар нақты MVP пен бизнес-модельдері бар ғарышқа арналған AI-жобаларын қорғады. NSART қазылар алқасының сарапшысы ретінде өнер көрсетті.",
    },
    body: {
      ru: [
        "NSART выступил экспертом жюри на финале Space AI Competition (AEROO) в Астане. 4 дня, 20 команд, уровень — высший пилотаж. Участники 14–18 лет защищали AI-проекты для космоса с реальными MVP и бизнес-моделями.",
        "Организация, талант участников и глубина решений — всё на 10/10. NSART поздравляет победителей и гордится тем, что стал частью этого события. 🚀",
      ],
      en: [
        "NSART served as a jury expert at the final of the Space AI Competition (AEROO) in Astana. 4 days, 20 teams, top-tier level. Participants aged 14–18 pitched AI projects for space with real MVPs and business models.",
        "The organization, the participants' talent, and the depth of the solutions — everything was 10/10. NSART congratulates the winners and is proud to have been part of this event. 🚀",
      ],
      ar: [
        "شاركت NSART بصفة خبير في لجنة التحكيم في نهائي Space AI Competition (AEROO) في أستانا. 4 أيام و20 فريقًا وأداء في القمة. ودافع مشاركون تتراوح أعمارهم بين 14 و18 عامًا عن مشاريع ذكاء اصطناعي للفضاء بنماذج MVP حقيقية ونماذج أعمال.",
        "التنظيم وموهبة المشاركين وعمق الحلول، كلها بمستوى 10/10. وتهنّئ NSART الفائزين وتفخر بكونها جزءًا من هذه الفعالية. 🚀",
      ],
      kk: [
        "NSART Астанадағы Space AI Competition (AEROO) финалында қазылар алқасының сарапшысы ретінде өнер көрсетті. 4 күн, 20 команда, деңгейі — ең жоғары шеберлік. 14–18 жастағы қатысушылар нақты MVP пен бизнес-модельдері бар ғарышқа арналған AI-жобаларын қорғады.",
        "Ұйымдастыру, қатысушылардың дарыны және шешімдердің тереңдігі — бәрі 10/10. NSART жеңімпаздарды құттықтайды және осы іс-шараның бір бөлігі болғанын мақтан тұтады. 🚀",
      ],
    },
  },
  {
    id: 41,
    slug: "akkol-investors-meeting",
    date: "2026-05-19",
    image: "/news/akkol-investors-meeting.webp",
    images: [
      "/news/akkol-investors-meeting.webp",
      "/news/akkol-investors-meeting-2.webp",
      "/news/akkol-investors-meeting-3.webp",
    ],
    tag: { ru: "Инвестиции", en: "Investment", ar: "استثمار", kk: "Инвестиция" },
    location: { ru: "Акколь", en: "Akkol", ar: "أقكول", kk: "Ақкөл" },
    displayDate: {
      ru: "19 мая 2026",
      en: "19 May 2026",
      ar: "19 مايو 2026",
      kk: "2026 жылғы 19 мамыр",
    },
    title: {
      ru: "Рабочая встреча с инвесторами по развитию Акколя",
      en: "Working meeting with investors on the development of Akkol",
      ar: "اجتماع عمل مع المستثمرين حول تطوير أقكول",
      kk: "Ақкөлді дамыту жөнінде инвесторлармен жұмыс кездесуі",
    },
    excerpt: {
      ru: "Под председательством акима района Б. Абдрахманова состоялась рабочая встреча с потенциальными инвесторами по вопросу развития города Акколь.",
      en: "Chaired by district akim B. Abdrakhmanov, a working meeting was held with potential investors on the development of the city of Akkol.",
      ar: "برئاسة حاكم المنطقة ب. عبدالرحمانوف، عُقد اجتماع عمل مع مستثمرين محتملين حول تطوير مدينة أقكول.",
      kk: "Аудан әкімі Б. Әбдірахмановтың төрағалығымен Ақкөл қаласын дамыту мәселесі бойынша әлеуетті инвесторлармен жұмыс кездесуі өтті.",
    },
    body: {
      ru: [
        "Под председательством акима района Б. Абдрахманова состоялась рабочая встреча с потенциальными инвесторами по вопросу развития города Акколь. Стороны обсудили перспективы привлечения инвестиций и совместные проекты по развитию города.",
      ],
      en: [
        "Chaired by district akim B. Abdrakhmanov, a working meeting was held with potential investors on the development of the city of Akkol. The parties discussed prospects for attracting investment and joint projects for the city's development.",
      ],
      ar: [
        "برئاسة حاكم المنطقة ب. عبدالرحمانوف، عُقد اجتماع عمل مع مستثمرين محتملين حول تطوير مدينة أقكول. وبحث الطرفان آفاق جذب الاستثمارات والمشاريع المشتركة لتطوير المدينة.",
      ],
      kk: [
        "Аудан әкімі Б. Әбдірахмановтың төрағалығымен Ақкөл қаласын дамыту мәселесі бойынша әлеуетті инвесторлармен жұмыс кездесуі өтті. Тараптар инвестиция тарту перспективаларын және қаланы дамыту жөніндегі бірлескен жобаларды талқылады.",
      ],
    },
  },
];

/** Newest first, for listing. */
export const sortedNews: NewsItem[] = [...news].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
);

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug);
}
