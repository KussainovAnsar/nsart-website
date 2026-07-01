import type { Locale } from "./i18n/config";

/** A value that may be provided per-language. `en` is the guaranteed fallback. */
type L<T> = { en: T } & Partial<Record<Locale, T>>;

export type TeamMember = {
  slug: string;
  /** Full name (or first name until the full one is provided). */
  name: L<string>;
  /** Job title — kept in English across locales by design. */
  role: string;
  /** Path under /public. Optional — a monogram placeholder is shown when absent. */
  photo?: string;
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
    slug: "pierre-tayrac",
    name: {
      en: "Pierre Tayrac",
      ru: "Пьер Тейрак",
      ar: "بيير تيراك",
      kk: "Пьер Тейрак",
    },
    role: "GovTech Advisor (MEA & Europe region)",
    photo: "/team/pierre-tayrac.jpg",
    years: {
      en: "18+ years in enterprise transformation",
      ru: "18+ лет в корпоративной трансформации",
      ar: "أكثر من 18 عامًا في تحول المؤسسات",
      kk: "корпоративтік трансформацияда 18+ жыл",
    },
    bio: {
      en: "An aerospace engineer turned enterprise-transformation leader, with 18+ years working at the intersection of system architecture, operational execution, and enterprise transformation across Europe and the Middle East. Early roles at Thales and Inetum shaped a structured, disciplined approach to complexity; as President & Managing Director of Sazience, he scaled operations across the Middle East and Africa. Today he is CEO of Farkey Technologies (Dubai), designing structured systems for sustainable scale — with governance, alignment, and long-term stability at the core. He advises NSART on GovTech across the MEA and Europe regions.",
      ru: "Инженер-аэрокосмик, ставший лидером корпоративной трансформации: 18+ лет на стыке системной архитектуры, операционного исполнения и трансформации предприятий в Европе и на Ближнем Востоке. Ранний опыт в Thales и Inetum сформировал структурный, дисциплинированный подход к сложным задачам; как President & Managing Director компании Sazience он масштабировал операции на Ближнем Востоке и в Африке. Сегодня — CEO Farkey Technologies (Дубай), где проектирует структурированные системы для устойчивого роста, ставя во главу угла управляемость, согласованность и долгосрочную стабильность. Консультирует NSART по GovTech в регионах MEA и Европы.",
      ar: "مهندس فضائي تحوّل إلى قائد في مجال تحول المؤسسات، بخبرة تتجاوز 18 عامًا عند تقاطع هندسة الأنظمة والتنفيذ التشغيلي وتحول المؤسسات في أوروبا والشرق الأوسط. صقلت أدواره المبكرة في Thales وInetum نهجًا منظمًا ومنضبطًا في التعامل مع التعقيد؛ وبصفته رئيسًا ومديرًا إداريًا لشركة Sazience، وسّع العمليات في الشرق الأوسط وأفريقيا. واليوم، بصفته الرئيس التنفيذي لشركة Farkey Technologies (دبي)، يصمّم أنظمة منظمة تدعم النمو المستدام، مع إعطاء الأولوية للحوكمة والمواءمة والاستقرار طويل الأمد. ويقدّم الاستشارة لـ NSART في مجال GovTech عبر منطقتي الشرق الأوسط وأفريقيا وأوروبا.",
      kk: "Аэроғарыш инженері болып, кейін корпоративтік трансформация көшбасшысына айналған маман: жүйелік сәулет, операциялық орындау және кәсіпорындарды трансформациялау тоғысында Еуропа мен Таяу Шығыста 18 жылдан астам тәжірибесі бар. Thales пен Inetum компанияларындағы алғашқы жұмысы күрделі міндеттерге құрылымды әрі тәртіпті көзқарасын қалыптастырды; Sazience компаниясының President & Managing Director ретінде операцияларды Таяу Шығыс пен Африкада кеңейтті. Бүгінде — Farkey Technologies (Дубай) компаниясының CEO-сы, тұрақты өсуге арналған құрылымдалған жүйелерді жобалайды әрі басқарылу, үйлесімділік пен ұзақ мерзімді тұрақтылықты басты орынға қояды. NSART-қа MEA және Еуропа өңірлері бойынша GovTech саласында кеңес береді.",
    },
    skills: {
      en: [
        "System architecture",
        "Enterprise transformation",
        "Strategy",
        "Operations management",
        "Governance & delivery",
        "Entrepreneurship",
      ],
      ru: [
        "Системная архитектура",
        "Корпоративная трансформация",
        "Стратегия",
        "Операционное управление",
        "Управляемость и исполнение",
        "Предпринимательство",
      ],
      ar: [
        "هندسة الأنظمة",
        "تحول المؤسسات",
        "الاستراتيجية",
        "إدارة العمليات",
        "الحوكمة والتنفيذ",
        "ريادة الأعمال",
      ],
      kk: [
        "Жүйелік сәулет",
        "Корпоративтік трансформация",
        "Стратегия",
        "Операциялық басқару",
        "Басқарылу және орындау",
        "Кәсіпкерлік",
      ],
    },
  },
  {
    slug: "mohamed-elbadwi",
    name: {
      en: "Mohamed Elbadwi",
      ru: "Мохамед Эльбадви",
      ar: "محمد البدوي",
      kk: "Мохамед Эльбадви",
    },
    role: "Digital transformation & Social venture building Advisor",
    photo: "/team/mohamed-elbadwi.jpg",
    years: {
      en: "15+ years in digital transformation & venture building",
      ru: "15+ лет в цифровой трансформации и создании венчуров",
      ar: "أكثر من 15 عامًا في التحول الرقمي وبناء المشاريع",
      kk: "цифрлық трансформация мен венчур құруда 15+ жыл",
    },
    bio: {
      en: "A change agent, social venture builder, and startup mentor based in Riyadh. As Chief Digital Officer at Pnode Auditing and founder of Madoum Venture Studio, he helps organizations build ventures, digital products, and strategies, and leads safe transformation at every level. His experience spans digital transformation, business process management, organization development, strategy, and sustainability. He advises NSART on digital transformation and social venture building.",
      ru: "Агент перемен, создатель социальных венчуров и ментор стартапов из Эр-Рияда. Chief Digital Officer в Pnode Auditing и основатель Madoum Venture Studio: помогает организациям создавать венчуры, цифровые продукты и стратегии и ведёт безопасную трансформацию на всех уровнях. Его опыт охватывает цифровую трансформацию, управление бизнес-процессами, организационное развитие, стратегию и устойчивое развитие. Консультирует NSART по цифровой трансформации и созданию социальных венчуров.",
      ar: "صانع تغيير وباني مشاريع اجتماعية وموجّه للشركات الناشئة، مقرّه الرياض. وبصفته المدير الرقمي (CDO) في Pnode Auditing ومؤسس Madoum Venture Studio، يساعد المؤسسات على بناء المشاريع والمنتجات الرقمية والاستراتيجيات، ويقود التحول الآمن على جميع المستويات. وتمتد خبرته عبر التحول الرقمي، وإدارة العمليات، والتطوير المؤسسي، والاستراتيجية، والاستدامة. ويقدّم الاستشارة لـ NSART في مجالي التحول الرقمي وبناء المشاريع الاجتماعية.",
      kk: "Өзгеріс агенті, әлеуметтік венчурлер жасаушы әрі стартап-тәлімгері, Эр-Риядта тұрады. Pnode Auditing компаниясының Chief Digital Officer қызметінде әрі Madoum Venture Studio негізін қалаушысы ретінде ұйымдарға венчурлер, цифрлық өнімдер мен стратегиялар құруға көмектеседі және барлық деңгейде қауіпсіз трансформацияны басқарады. Тәжірибесі цифрлық трансформация, бизнес-процестерді басқару, ұйымдық даму, стратегия және тұрақты дамуды қамтиды. NSART-қа цифрлық трансформация мен әлеуметтік венчур құру бойынша кеңес береді.",
    },
    skills: {
      en: [
        "Digital transformation",
        "Social venture building",
        "Open innovation",
        "Strategy & partnerships",
        "Organization development",
        "Startup mentoring",
      ],
      ru: [
        "Цифровая трансформация",
        "Создание социальных венчуров",
        "Открытые инновации",
        "Стратегия и партнёрства",
        "Организационное развитие",
        "Менторство стартапов",
      ],
      ar: [
        "التحول الرقمي",
        "بناء المشاريع الاجتماعية",
        "الابتكار المفتوح",
        "الاستراتيجية والشراكات",
        "التطوير المؤسسي",
        "إرشاد الشركات الناشئة",
      ],
      kk: [
        "Цифрлық трансформация",
        "Әлеуметтік венчур құру",
        "Ашық инновациялар",
        "Стратегия және серіктестік",
        "Ұйымдық даму",
        "Стартап тәлімгерлігі",
      ],
    },
    fact: {
      en: "Co-founder of Incitement, a global change-makers movement. Stay Green 🌱",
      ru: "Сооснователь Incitement — глобального движения агентов перемен. Stay Green 🌱",
      ar: "شريك مؤسس في Incitement، حركة عالمية لصنّاع التغيير. Stay Green 🌱",
      kk: "Incitement — өзгеріс жасаушылардың жаһандық қозғалысының тең негізін қалаушысы. Stay Green 🌱",
    },
  },
  {
    slug: "shaikha-alshaks",
    name: {
      en: "Shaikha AlShaks",
      ru: "Шейха АльШакс",
      ar: "شيخة الشكس",
      kk: "Шейха АльШакс",
    },
    role: "Auditor & Financial Expert",
    photo: "/team/shaikha-alshaks.jpg",
    years: {
      en: "7+ years in audit & forensic accounting",
      ru: "7+ лет в аудите и форензик-бухгалтерии",
      ar: "أكثر من 7 سنوات في التدقيق والمحاسبة الجنائية",
      kk: "аудит пен форензик-бухгалтерияда 7+ жыл",
    },
    bio: {
      en: "An internal auditor and certified forensic accountant with 7+ years auditing e-health programs at the United Nations. Founder of Pnode Auditing and Impact Investment Manager at Madoum Venture Studio, she specializes in internal controls, risk management, compliance, and financial planning & analysis — from budgeting and forecasting to M&A, IPO, and capital advisory. She holds an MS in Accounting from Montclair State University and a forensic accounting certification. Her focus is driving compliance, risk management, and organizational integrity while safeguarding public and private assets.",
      ru: "Внутренний аудитор и сертифицированный форензик-бухгалтер с 7+ годами опыта аудита программ электронного здравоохранения в ООН. Основатель Pnode Auditing и Impact Investment Manager в Madoum Venture Studio; специализируется на внутреннем контроле, управлении рисками, комплаенсе и финансовом планировании и анализе — от бюджетирования и прогнозирования до сопровождения M&A, IPO и управления капиталом. Имеет степень магистра по бухгалтерскому учёту (Montclair State University) и сертификат по форензик-бухгалтерии. Её фокус — комплаенс, управление рисками, организационная целостность и защита государственных и частных активов.",
      ar: "مدققة داخلية ومحاسبة جنائية معتمدة، بخبرة تتجاوز 7 سنوات في تدقيق برامج الصحة الإلكترونية لدى الأمم المتحدة. مؤسِّسة Pnode Auditing ومديرة الاستثمار المؤثِّر في Madoum Venture Studio، متخصصة في الضوابط الداخلية وإدارة المخاطر والامتثال والتخطيط والتحليل المالي — من إعداد الموازنات والتنبؤات إلى الاستشارة في عمليات الدمج والاستحواذ والطرح العام الأولي وإدارة رأس المال. حاصلة على ماجستير في المحاسبة من Montclair State University وشهادة في المحاسبة الجنائية. وينصبّ تركيزها على الامتثال وإدارة المخاطر ونزاهة المؤسسات وحماية الأصول العامة والخاصة.",
      kk: "Ішкі аудитор әрі сертификатталған форензик-бухгалтер, БҰҰ-да электрондық денсаулық сақтау бағдарламаларын аудиттеуде 7 жылдан астам тәжірибесі бар. Pnode Auditing негізін қалаушысы әрі Madoum Venture Studio компаниясының Impact Investment Manager қызметінде; ішкі бақылау, тәуекелдерді басқару, комплаенс және қаржылық жоспарлау мен талдауға маманданған — бюджеттеу мен болжаудан бастап M&A, IPO және капиталды басқару бойынша кеңес беруге дейін. Montclair State University-де бухгалтерлік есеп бойынша магистр дәрежесі мен форензик-бухгалтерия сертификаты бар. Басты бағыты — комплаенс, тәуекелдерді басқару, ұйымдық тұтастық және мемлекеттік әрі жеке активтерді қорғау.",
    },
    skills: {
      en: [
        "Internal audit",
        "Forensic accounting",
        "Risk & compliance",
        "Financial planning & analysis",
        "Procurement & tendering",
        "Impact investment",
      ],
      ru: [
        "Внутренний аудит",
        "Форензик-бухгалтерия",
        "Риски и комплаенс",
        "Финансовое планирование и анализ",
        "Закупки и тендеры",
        "Импакт-инвестиции",
      ],
      ar: [
        "التدقيق الداخلي",
        "المحاسبة الجنائية",
        "المخاطر والامتثال",
        "التخطيط والتحليل المالي",
        "المشتريات والمناقصات",
        "الاستثمار المؤثِّر",
      ],
      kk: [
        "Ішкі аудит",
        "Форензик-бухгалтерия",
        "Тәуекел және комплаенс",
        "Қаржылық жоспарлау және талдау",
        "Сатып алу және тендерлер",
        "Импакт-инвестиция",
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
