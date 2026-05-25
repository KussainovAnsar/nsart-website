import type { Locale } from "./config";

/* ------------------------------------------------------------------ */
/*  English — canonical / complete reference                          */
/* ------------------------------------------------------------------ */

const en = {
  meta: {
    title: "NSART · Technology Interaction",
    description:
      "We build deep-tech companies from Central Asia for the world — with research, intellectual property, and investment across Kazakhstan, Saudi Arabia, and Africa.",
  },
  nav: {
    home: "Home",
    about: "About",
    technologies: "Technologies",
    ip: "IP & Assets",
    miras: "Miras Accelerator",
    investors: "For Investors",
    enterprise: "For Enterprises & Government",
    founders: "For Founders & R&D",
    markets: "Markets",
    partners: "Partners",
    contact: "Contact",
  },
  navGroups: {
    company: "Company",
    audiences: "Audiences",
  },
  common: {
    getInTouch: "Get in touch",
    learnMore: "Learn more",
    explore: "Explore",
    backHome: "Back to home",
    status: "Status",
    location: "Location",
    inDevelopment: "In development",
    allLanguages: "EN · AR · RU · KK",
  },
  trustBar:
    "ISO 9001 · ISO 14001 · ISO 10015 · TIA-942 · Uptime Tier III/IV · UN e-Gov Top-25 · SDG-aligned",
  hero: {
    eyebrow: "NSART · Technology Interaction",
    title: "Deep-tech companies from Central Asia, built for the world.",
    subtitle:
      "Research, intellectual property, and investment across Kazakhstan, Saudi Arabia, and Africa.",
    ctaPrimary: "Choose your path",
    ctaSecondary: "Explore Miras Accelerator",
    stats: [
      { value: "10–100 MW", label: "AI & Green cloud" },
      { value: "PUE ~1.2", label: "Energy efficiency — among the best on Earth" },
      { value: "Top-25", label: "Kazakhstan in the UN e-Government ranking" },
      { value: "4 regions", label: "Central Asia · MENA · South Asia · Africa" },
    ],
  },
  audience: {
    eyebrow: "Three ways in",
    heading: "Built for the way you evaluate technology.",
    sub: "Investors, clients, and founders each look for different proof. Pick the path that fits you.",
    cards: [
      {
        key: "investors",
        tag: "For investors",
        title: "Independent, SDG-aligned deep tech",
        text: "A deep-tech portfolio built around the UN SDGs, the Miras Accelerator, and clear ESG and ethical-AI standards.",
        href: "/investors",
        cta: "Investment thesis",
      },
      {
        key: "enterprise",
        tag: "For enterprises & government",
        title: "Technology that meets your standards",
        text: "AI, GovTech, smart infrastructure, and independent data centers — all certified to international standards.",
        href: "/enterprise",
        cta: "Explore services",
      },
      {
        key: "founders",
        tag: "For founders & R&D",
        title: "From research to revenue",
        text: "We cover the full IP journey — protection, valuation, and access to investment — for founders, universities, and R&D centers.",
        href: "/founders",
        cta: "IP assessment",
      },
    ],
  },
  technologies: {
    eyebrow: "Technologies",
    heading: "We design, build, and certify deep technology.",
    sub: "From independent data centers and AI computing to GovTech platforms — built to international standards and easy to audit.",
    items: [
      {
        title: "Artificial Intelligence",
        text: "An AI Agent Factory, government AI agents, machine learning on real-time data, and large-model training on our own GPU infrastructure.",
      },
      {
        title: "Smart Infrastructure",
        text: "Green, high-density computing — NVIDIA H200 clusters, open-source exascale systems, and energy-efficient design.",
      },
      {
        title: "GovTech",
        text: "20+ years of e-government experience, packaged as ready-to-use modules: digital identity, data exchange, and paperless services.",
      },
      {
        title: "Data Centers",
        text: "AI & Green cloud — Tier III/IV design, PUE ~1.2, LNG-based cooling, and the leading TIA-942 / Uptime expertise in Central Asia.",
      },
    ],
  },
  mirasTeaser: {
    eyebrow: "Miras Accelerator",
    heading: "The infrastructure to turn deep technology into business.",
    text: "Miras is a joint venture of NSART and PNOD. It helps proven technologies become real businesses — combining engineering, governance and compliance, full IP support, and a clear path to investment.",
    aligned: "Aligned with Vision 2030, the OIC, the Digital Cooperation Organization, and the UN SDGs.",
    cta: "Inside Miras Accelerator",
  },
  cases: {
    eyebrow: "Proof, not promises",
    heading: "Selected work, 2024–2025.",
    sub: "Real projects in Kazakhstan, Saudi Arabia, and beyond — the strongest evidence we can offer.",
    items: [
      {
        tag: "Green compute",
        title: "AI & Green cloud",
        location: "Kuryk SEZ, Mangystau · Tier III/IV design",
        status: "In development",
        text: "A green energy-and-data cluster. It uses cold from a nearby LNG terminal for cooling, so cooling costs almost nothing. Powered by a gas-turbine plant with solar, and set up for green-bond financing.",
        metrics: [
          { v: "10–100 MW", l: "Planned IT capacity" },
          { v: "PUE ~1.2", l: "Target efficiency" },
          { v: "500 racks", l: "Initial capacity, incl. AI/HPC" },
          { v: "Tier III/IV", l: "Uptime + TIA-942 path" },
        ],
      },
      {
        tag: "HPC & AI",
        title: "Sovereign exascale compute",
        location: "Kazakhstan · open-source stack",
        status: "Operating",
        text: "NVIDIA H200 SXM GPUs (HBM3e, 141 GB, 4.8 TB/s) with NVLink 4.0 for training and inference. An open exascale stack — Slurm + OpenMPI, ROCm/CUDA, OpenStack, Lustre/GPFS — fully independent, auditable, and free of vendor lock-in.",
        metrics: [
          { v: "H200 SXM", l: "141 GB HBM3e per GPU" },
          { v: "4.8 TB/s", l: "Memory bandwidth" },
          { v: "Exascale", l: "Open-source HPC stack" },
          { v: "KK-LLM", l: "Kazakh-language model training" },
        ],
      },
      {
        tag: "GovTech",
        title: "Saudi AI & GovTech Lab",
        location: "JV: NSART · NITEC · PNOD · King Saud University",
        status: "In development",
        text: "Built around Saudi Vision 2030: an AI Agent Factory of reusable government agents, Smart Data Ukimet across 400+ national databases, a proactive Digital Family Card, and AI and data training for civil servants.",
        metrics: [
          { v: "400+", l: "National databases unified" },
          { v: "Top-25", l: "UN e-Gov ranking (KZ)" },
          { v: "Vision 2030", l: "Strategic alignment" },
          { v: "4 modules", l: "Reusable across ministries" },
        ],
      },
      {
        tag: "Partnerships",
        title: "Global GovTech export",
        location: "NITEC + InfoTech (Pakistan) · 3 regions",
        status: "Active",
        text: "We export data exchange, digital identity, and paperless government to three regions using ready-made modules — including joint bids for World Bank and ADB tenders. Fintech and certification run through Pixel DMC; cloud migration with Dataset, Eagale Soft, and KT Cloud Lab.",
        metrics: [
          { v: "3 regions", l: "Export footprint" },
          { v: "WB · ADB", l: "Joint tenders" },
          { v: "SSM", l: "Scalable Solution Modules" },
          { v: "Astana", l: "Secondary cloud node" },
        ],
      },
    ],
  },
  markets: {
    eyebrow: "Markets",
    heading: "Operating across four regions.",
    sub: "A bridge between Central Asia and the world — where demand in new markets meets large-scale investment.",
    items: [
      { name: "Central Asia", desc: "Our home base in Kazakhstan — independent supercomputing, GovTech, and green data centers." },
      { name: "MENA", desc: "Saudi Arabia — GovTech labs, Vision 2030 projects, and governance partnerships." },
      { name: "South Asia", desc: "Pakistan — exporting GovTech, fintech gateways, and certification." },
      { name: "Africa", desc: "Infrastructure for new markets, responsible investment, and training." },
    ],
  },
  partners: {
    eyebrow: "Partners",
    heading: "A network of governments, science, and investors.",
    sub: "Grouped by role — from state infrastructure to governance, sustainability, and market access.",
    groups: [
      { name: "State & infrastructure", members: ["NITEC", "KT Cloud Lab", "Ghalam", "SpaceLab"] },
      { name: "Technology & cloud", members: ["KazDream", "MyCloud", "AiMap", "Eagale Soft", "InfoTech", "Pixel DMC"] },
      { name: "Science & education (deep-tech origin)", members: ["King Saud University", "KZ universities & institutes", "Artisan Education"] },
      { name: "Governance, audit & sustainability", members: ["PNOD Auditing Co.", "MSTDAM"] },
      { name: "Trade & market access", members: ["QazTrade", "MENA partners", "South Asia partners", "Africa partners"] },
    ],
    spotlight: [
      {
        name: "PNOD Auditing Co.",
        role: "Governance, audit, and AI oversight (14 years' experience; ISO/IEC 42001), with deep knowledge of Saudi regulations. Co-founder of the Miras Accelerator joint venture.",
      },
      {
        name: "MSTDAM",
        role: "An environmental platform (Saudi Arabia) — measuring carbon footprints, planting trees, and ESG reporting. Our green and ESG partner.",
      },
      {
        name: "NITEC",
        role: "National Information Technologies — Kazakhstan's state operator for e-government services and digital identity.",
      },
      {
        name: "King Saud University",
        role: "Our main academic partner in Saudi Arabia for deep-tech research, joint R&D, and the Saudi AI & GovTech Lab.",
      },
    ],
    logos: [
      { name: "NITEC", url: "https://nitec.kz" },
      { name: "KazDream", url: "https://kazdream.kz" },
      { name: "Juldizai", url: "https://juldizai.kz/kk/" },
      { name: "MyCloud", url: "https://mycloud.kz" },
      { name: "SpaceLab", url: "https://spacelab.kz/ru" },
      { name: "Gharysh", url: "https://www.gharysh.kz/" },
      { name: "Suburban Cloud", url: "https://suburbancloud.ng/" },
      { name: "Eagale Soft", url: "https://eagale.com/" },
      { name: "InfoTech", url: "https://infotechgroup.com/" },
      { name: "AiMap", url: "https://aimap.kz/" },
      { name: "QazTrade", url: "https://qaztrade.org.kz/rus/" },
      { name: "EdTech KN", url: "https://edtechkn.com/" },
      { name: "Artisan Education", url: "https://artisan.education/ru" },
      { name: "Paxaro Labs", url: "https://www.linkedin.com/company/paxarolabs/" },
      { name: "4Sight", url: "https://www.4sight.com.pk" },
      { name: "Uneet", url: "https://www.linkedin.com/company/uneet-kz/about/" },
      { name: "Alarcom", url: "https://alarcom.kz/" },
    ],
  },
  verticals: {
    eyebrow: "Verticals",
    heading: "Where we work.",
    sub: "Four areas where NSART builds, certifies, and scales deep technology.",
    items: [
      {
        n: "01",
        title: "Telecom & Space Tech",
        text: "Telecoms, network analytics, space tech, and data centers — innovation for the communications and aerospace sectors.",
        tags: ["Network & Analytics", "Space Tech", "Data Centers"],
      },
      {
        n: "02",
        title: "GovTech",
        text: "Digital tools for government — e-government services and cybersecurity for a clear, secure public sector.",
        tags: ["e-Gov", "Cyber Security"],
      },
      {
        n: "03",
        title: "Digital Platforms",
        text: "Ready-to-use digital platforms for education, finance, cars, food, and farming — built for new markets.",
        tags: ["EdTech", "FinTech", "CarTech", "FoodTech", "AgroTech"],
      },
      {
        n: "04",
        title: "Smart Infrastructure",
        text: "Smart-city solutions — digital twins, smart fields, AIoT, and machine-to-machine systems for modern cities.",
        tags: ["Digital Twins", "Smart Field", "AIoT & M2M"],
      },
    ],
  },
  methodology: {
    eyebrow: "Methodology",
    heading: "Proven frameworks that turn ideas into real companies.",
    sub: "Four frameworks NSART uses on every project — from strategy to delivery.",
    items: [
      {
        n: "01",
        title: "Vision 3P",
        sub: "Strategic vision",
        text: "Built on one rule: put People first, keep the Process simple, and deliver a quality Product.",
        tags: ["People", "Process", "Product"],
      },
      {
        n: "02",
        title: "Venture Development",
        sub: "Integrated development cycle",
        text: "The full business cycle — from first idea to scaling operations and results.",
        tags: ["Value Creation", "Value Protection", "Structuring", "Operations"],
      },
      {
        n: "03",
        title: "GIST Planning",
        sub: "Agile strategic planning",
        text: "From long-term goals and new ideas to clear steps and real results.",
        tags: ["Goals", "Ideas", "Steps", "Tasks"],
      },
      {
        n: "04",
        title: "CIVTI Assessment",
        sub: "Project evaluation system",
        text: "A full review of each idea by its value, technical difficulty, and the investment it needs.",
        tags: ["Current Ideas", "Value", "Complexity", "Investment"],
      },
    ],
  },
  experience: {
    eyebrow: "Experience",
    heading: "Two decades of building technology businesses.",
    items: [
      { period: "2007–2010", title: "Strategic consulting and market research" },
      { period: "2010–2015", title: "Software development and GovTech projects" },
      { period: "2015–2023", title: "Turnkey business solutions and product development" },
      { period: "2023–present", title: "Full-cycle venture studio" },
    ],
  },
  products: {
    eyebrow: "Products",
    heading: "What we deliver.",
    items: [
      {
        title: "NSART Gateway",
        text: "Entering the markets of Central Asia, South Asia, MENA, and Africa.",
      },
      {
        title: "NSART Corporate Innovations",
        text: "Research, pilot projects, and open-innovation programs for business clients.",
      },
    ],
  },
  certifications: {
    eyebrow: "Certifications & compliance",
    heading: "Proof you can verify.",
    sub: "Independent proof for every audience — quality, environment, infrastructure, and governance.",
    items: [
      { name: "ISO 9001", meaning: "Quality management." },
      { name: "ISO 14001", meaning: "Environmental management — national and international. Directly linked to ESG." },
      { name: "ISO 10015", meaning: "Training and development management (supports skills-building)." },
      { name: "TIA-942", meaning: "Data-center standard — leading expertise in Central Asia." },
      { name: "Uptime Tier III/IV", meaning: "Data-center design and constructed-facility certification." },
      { name: "UN e-Gov Top-25", meaning: "Kazakhstan's e-Government — among the best in the world." },
    ],
  },
  contact: {
    eyebrow: "Contact",
    heading: "Start the conversation that fits you.",
    sub: "Separate paths for investors, enterprises and government, and founders & R&D.",
    audiences: [
      { title: "Investors", text: "Investment thesis, ESG brief, and the Miras Accelerator.", cta: "Talk to investment", href: "/investors" },
      { title: "Enterprises & Government", text: "Technology audits, pilots, and AI services.", cta: "Request an audit", href: "/enterprise" },
      { title: "Founders & R&D", text: "IP assessment and access to investment.", cta: "Get an IP assessment", href: "/founders" },
    ],
    email: "info@nsart.kz",
    emailLabel: "Email us",
  },
  footer: {
    tagline: "Deep-tech companies from Central Asia, built for the world.",
    company: "Company",
    audiences: "Audiences",
    contactTitle: "Contact",
    rights: "NSART · Technology Interaction. All rights reserved.",
    confidential:
      "We share the Miras Accelerator at a public level only — no budgets, fund sizes, or internal details.",
  },

  /* -------- For Investors page -------- */
  investorsPage: {
    badge: "For institutional & impact investors",
    title: "Invest in independent, SDG-aligned deep-tech infrastructure.",
    intro:
      "We make it safer to invest in green data centers, AI computing, and government tech in new markets — with strong environmental standards, responsible AI, and global certification. The Miras Accelerator is how we raise capital.",
    ctas: ["View our investment thesis", "Explore Miras Accelerator", "Request ESG brief by email"],
    audienceNote:
      "For IsDB, EBRD, ADB, the World Bank, UN-affiliated funds, and private impact investors.",
    sdg: {
      heading: "Aligned with the UN Sustainable Development Goals",
      sub: "NSART and the Miras Accelerator line up with widely recognised goals — mapped to the UN SDGs, without sharing financial details.",
      items: [
        { goal: "SDG 4 & 9", desc: "Education, technology, industry and innovation — training engineers and transferring technology." },
        { goal: "SDG 7 & 13", desc: "Clean energy and climate — a green data center, solar generation, and a lower carbon footprint." },
        { goal: "SDG 8", desc: "Decent work and economic growth — supporting SMEs and creating jobs." },
        { goal: "SDG 11", desc: "Sustainable cities — smart infrastructure and GovTech." },
        { goal: "SDG 17", desc: "Partnerships — agreements with development banks and governments." },
      ],
    },
    esg: {
      heading: "ESG & green finance",
      sub: "The direct language of development banks.",
      points: [
        { title: "AI & Green cloud, PUE ~1.2", text: "LNG-based cooling as the main system, with built-in solar power." },
        { title: "Green-bond ready", text: "Set up for green-bond financing and development-bank funding." },
        { title: "Ethical AI & privacy", text: "Transparent, no bias, human oversight; GDPR-style data handling." },
        { title: "Independent, open systems", text: "Auditable, with no vendor lock-in." },
      ],
    },
    metricsHeading: "The numbers",
    cta: { heading: "Request the investor materials", text: "We'll send a one-pager and deck by email. We don't publish confidential details online.", button: "Talk to our investment team" },
  },

  /* -------- For Enterprises & Government page -------- */
  enterprisePage: {
    badge: "For private & public sector",
    title: "Technology that meets your standards — national and international.",
    intro:
      "From independent data centers and AI computing to GovTech platforms, we design, build, and certify technology for the public and private sectors — and we find, test, and add new innovations to your operations.",
    ctas: ["Request a technology audit", "Start a pilot", "Explore our AI services"],
    services: {
      heading: "Service catalog",
      items: [
        { title: "AI systems", text: "AI agents, machine learning, and decision systems on our own computing." },
        { title: "Smart infrastructure", text: "High-density, energy-efficient compute and connectivity." },
        { title: "GovTech", text: "Digital identity, data exchange, and paperless services." },
        { title: "Data-center certification", text: "TIA-942 and Uptime Tier III/IV — full lifecycle." },
        { title: "Corporate innovation", text: "Finding new technology and adding it to your operations." },
        { title: "SpaceTech / NajmSat", text: "Rare space expertise — satellite and ground systems." },
      ],
    },
    standards: {
      heading: "Standards & compliance",
      items: ["ISO 9001", "ISO 14001", "ISO 10015", "TIA-942", "Uptime Tier III/IV", "RK technical regulation", "GDPR-style data handling"],
    },
    scouting: {
      heading: "Technology scouting in three steps",
      steps: [
        { n: "01", title: "Scout", text: "Find new technologies that matter to your business." },
        { n: "02", title: "Evaluate (CIVTI)", text: "Check fit, readiness, and impact using our review method." },
        { n: "03", title: "Integrate", text: "Add proven innovations into your processes and systems." },
      ],
    },
    pilot: {
      heading: "An easy way to start",
      text: "A proof of concept in 6–8 weeks, with a clear plan — so you can test the idea before committing.",
      button: "Start a pilot",
    },
  },

  /* -------- For Founders & R&D page -------- */
  foundersPage: {
    badge: "For founders, universities & R&D centers",
    title: "From research to revenue — protect, value, and grow your ideas and know-how.",
    intro:
      "For startups, established companies, universities, and R&D centers: we manage the full intellectual-property journey — review, protection, and valuation — and open the way to investment and growth through the Miras Accelerator.",
    ctas: ["Get an IP assessment", "Apply to Miras Accelerator", "Talk to our team"],
    lifecycle: {
      heading: "The IP lifecycle",
      sub: "Four steps, with what NSART does at each.",
      steps: [
        { n: "1", title: "Assess", text: "We audit your assets, score their readiness (TRL / CRL / MRL), and find what can be protected." },
        { n: "2", title: "Protect", text: "Patents, trademarks, know-how, software registration, and a protection plan across countries." },
        { n: "3", title: "Value", text: "We value your assets using standard financial methods, ready for deals and fundraising." },
        { n: "4", title: "Monetize", text: "Licensing, deal-making, and a path to investment through the Miras Accelerator." },
      ],
    },
    assets: {
      heading: "Asset types we work with",
      items: ["Software", "Digital services", "Agro-industrial complexes", "R&D results", "Space technologies"],
    },
    university: {
      heading: "A dedicated track for universities & R&D centers",
      text: "Deep-tech roots — moving research into the market, science spin-offs, and protecting and selling research results.",
      anchors: "Anchor partners: King Saud University (Saudi Arabia) and Kazakh research institutes and universities.",
    },
    form: {
      heading: "A simple application",
      sub: "Tell us your industry, stage, and need — we'll route you to the right track.",
      industry: "Industry",
      stage: "Stage",
      need: "What you need",
      name: "Name",
      email: "Email",
      submit: "Submit application",
      success: "Thank you — we'll be in touch shortly.",
      stages: ["Idea", "Prototype / TRL 4–6", "Pilot / TRL 7–8", "Revenue / scaling"],
    },
  },

  /* -------- About page -------- */
  aboutPage: {
    badge: "About NSART",
    title: "We turn deep-tech ideas into real businesses.",
    intro:
      "NSART is a venture studio focused on deep-tech projects — finding investment opportunities, building partnerships, setting up companies, and entering new markets across Central Asia, MENA, South Asia, and Africa.",
    missionHeading: "Our mission",
    missionText:
      "Connect science and business: take proven research, turn it into investable companies, and link it to international capital and institutions.",
    valuesHeading: "What we stand for",
    values: [
      { title: "Independent by design", text: "Open systems, no vendor lock-in, easy for regulators and investors to audit." },
      { title: "Evidence over rhetoric", text: "Every claim backed by a certificate, a number, or a live project." },
      { title: "Aligned with global mandates", text: "SDG-aligned, ESG-ready, and set up for development-bank funding." },
      { title: "Multilingual by default", text: "EN · AR · RU · KK — built for the markets we serve." },
    ],
  },

  /* -------- Technologies page -------- */
  technologiesPage: {
    badge: "Technology stack",
    title: "Deep technology, engineered and certified.",
    intro:
      "From independent data centers and AI computing to GovTech and smart infrastructure — built to international standards, fully auditable, and ready to connect with national and business systems.",
    pillars: [
      {
        title: "Artificial Intelligence",
        text: "An AI Agent Factory, government AI agents, machine learning on real-time data, and large-model training on our own GPUs (NVIDIA H200, open exascale stack).",
        items: ["Agent Factory", "Domain LLMs", "Real-time ML", "Our own GPUs"],
      },
      {
        title: "Smart Infrastructure",
        text: "High-density computing, AIoT and machine-to-machine networks, digital-twin platforms, and connectivity built for cities and industry.",
        items: ["AIoT & M2M", "Digital Twins", "Smart Field", "Energy-efficient design"],
      },
      {
        title: "GovTech",
        text: "20+ years of e-government experience, packaged as ready-to-use modules — digital identity, data exchange, paperless services, and cybersecurity.",
        items: ["e-Gov", "Digital ID", "Data exchange", "Cyber Security"],
      },
      {
        title: "Data Centers",
        text: "AI & Green cloud — Tier III/IV design, PUE ~1.2, LNG-based cooling, and the leading TIA-942 / Uptime expertise in Central Asia.",
        items: ["TIA-942", "Uptime Tier III/IV", "PUE ~1.2", "LNG-based cooling"],
      },
    ],
  },

  /* -------- IP & Assets page -------- */
  ipPage: {
    badge: "Intellectual property & intangible assets",
    title: "Protect, value, and earn from your ideas and know-how.",
    intro:
      "Full support for intellectual property — software, digital services, R&D results, agri-industrial projects, and space tech. From audit and protection to valuation, licensing, and a path to investment.",
    lifecycleHeading: "The IP lifecycle",
    steps: [
      { n: "1", title: "Assess", text: "We audit your assets, score their readiness (TRL / CRL / MRL), and find what can be protected." },
      { n: "2", title: "Protect", text: "Patents, trademarks, know-how, software registration, and a plan across countries." },
      { n: "3", title: "Value", text: "Valuation using standard financial methods — for deals, fundraising, and partnerships." },
      { n: "4", title: "Monetize", text: "Licensing, deal-making, and a path to investment through the Miras Accelerator." },
    ],
    assetsHeading: "Asset types we work with",
    assets: ["Software", "Digital services", "R&D results", "Agro-industrial complexes", "Space technologies"],
    ctaHeading: "Bring your assets to the next stage.",
    ctaText: "Start with an IP assessment — we'll map your portfolio and recommend the best way to protect and earn from it.",
    ctaButton: "Get an IP assessment",
  },

  /* -------- Markets page -------- */
  marketsPage: {
    badge: "Where we operate",
    title: "Four regions. One bridge.",
    intro:
      "NSART works where demand in new markets meets large-scale investment — Central Asia is home, Saudi Arabia and the wider MENA are our growth area, and South Asia and Africa are where we're expanding next.",
    regionsHeading: "Regions",
    regions: [
      {
        name: "Central Asia",
        kicker: "Home base",
        desc: "Kazakhstan: independent supercomputing, proven GovTech, and green data centers. 20+ years of e-government experience and a Top-25 UN e-Gov ranking.",
      },
      {
        name: "MENA",
        kicker: "Growth corridor",
        desc: "Saudi Arabia: GovTech labs built around Vision 2030, governance partnerships with PNOD, and the Miras Accelerator joint venture.",
      },
      {
        name: "South Asia",
        kicker: "Expansion",
        desc: "Pakistan: exporting GovTech with NITEC and InfoTech, fintech gateways through Pixel DMC, and certification.",
      },
      {
        name: "Africa",
        kicker: "Frontier",
        desc: "Infrastructure for new markets, responsible investment, training, and ready-made modules for governments.",
      },
    ],
    gatewayHeading: "NSART Gateway",
    gatewayText:
      "A product for entering the markets of Central Asia, South Asia, MENA, and Africa — combining local presence, help with regulations, and partner networks.",
  },

  /* -------- Partners page -------- */
  partnersPage: {
    badge: "Ecosystem",
    title: "A network of governments, science, and investors.",
    intro:
      "We work with five partner groups — state and infrastructure, technology and cloud, science and education, governance and sustainability, and trade and market access.",
    spotlightHeading: "Spotlight partners",
    logoHeading: "Selected partners",
  },

  /* -------- Contact page -------- */
  contactPage: {
    badge: "Get in touch",
    title: "Start the conversation that fits you.",
    intro: "Separate paths for investors, enterprises and government, and founders & R&D. We respond within two business days.",
    formHeading: "Send us a message",
    formName: "Name",
    formEmail: "Email",
    formOrg: "Organisation",
    formAudience: "I am a…",
    formMessage: "Message",
    formSubmit: "Send",
    formSuccess: "Thank you — we will get back to you shortly.",
    audienceOptions: ["Investor", "Enterprise / Government", "Founder / R&D", "Partner", "Other"],
    directHeading: "Or reach us directly",
    location: "Astana, Kazakhstan",
    privacy: "By submitting, you agree we may contact you. We don't share data with third parties.",
  },

  /* -------- Miras Accelerator page -------- */
  mirasPage: {
    badge: "Joint venture · NSART × PNOD",
    title: "Miras Accelerator — the infrastructure to turn deep technology into business.",
    intro:
      "Miras is a joint venture of NSART and PNOD. It helps proven technologies become real businesses — combining engineering, governance and compliance, full IP support, and a clear path to investment, in line with Vision 2030, the OIC, and the UN SDGs.",
    ctas: ["Learn about Miras", "Apply to a track", "Partner with us"],
    problem: {
      heading: "The gap Miras closes",
      text: "A technology can be scientifically ready, but a company may still lack the commercial, regulatory, and manufacturing setup to use it. Miras closes that gap with a three-part readiness model.",
      dims: [
        { code: "TRL", title: "Technology readiness", q: "Is the technology proven at the required scale?" },
        { code: "CRL", title: "Commercial readiness", q: "Is there a path to revenue, pricing, and a contract model?" },
        { code: "MRL", title: "Manufacturing readiness", q: "Can the product be produced, certified, and delivered?" },
      ],
    },
    tracks: {
      heading: "Three tracks",
      items: [
        { n: "Track 1", title: "Deep-Tech Cohort", text: "We take teams from first review to investment-ready and demo day." },
        { n: "Track 2", title: "Regulatory Sandbox", text: "Testing solutions in a controlled, regulated setting — CleanTech, GovTech, AI agents, data marketplace — on our own GPUs." },
        { n: "Track 3", title: "IP Portfolio & Founders", text: "The full IP journey and founder support — from first review to licensing and an IP showcase." },
      ],
    },
    positioning: {
      heading: "Strategic positioning",
      text: "Miras is built around widely recognised goals — Saudi Vision 2030, the OIC agenda, the Digital Cooperation Organization, and the UN SDGs. It speaks the language development institutions understand, without revealing commercial details.",
    },
    confidential:
      "Confidentiality: this section stays at a public level. Budgets, fund sizes, leadership and advisor names, specific investors, and details of government talks are kept internal.",
  },
} as const;

type DeepStringify<T> = T extends string
  ? string
  : T extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepStringify<U>>
    : T extends object
      ? { [K in keyof T]: DeepStringify<T[K]> }
      : T;

export type Dictionary = DeepStringify<typeof en>;
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>> | T[P]
    : T[P] extends object
      ? DeepPartial<T[P]>
      : T[P];
};

/* ------------------------------------------------------------------ */
/*  Russian — complete                                                */
/* ------------------------------------------------------------------ */

const ru: Dictionary = {
  meta: {
    title: "NSART · Technology Interaction",
    description:
      "Мы создаём глубокотехнологичные компании из Центральной Азии для всего мира — исследования, интеллектуальная собственность и инвестиции в Казахстане, Саудовской Аравии и Африке.",
  },
  nav: {
    home: "Главная",
    about: "О компании",
    technologies: "Технологии",
    ip: "ИС и активы",
    miras: "Miras Accelerator",
    investors: "Для инвесторов",
    enterprise: "Бизнесу и государству",
    founders: "Основателям и R&D",
    markets: "Рынки",
    partners: "Партнёры",
    contact: "Контакты",
  },
  navGroups: { company: "Компания", audiences: "Аудитории" },
  common: {
    getInTouch: "Связаться",
    learnMore: "Подробнее",
    explore: "Смотреть",
    backHome: "На главную",
    status: "Статус",
    location: "Локация",
    inDevelopment: "В разработке",
    allLanguages: "EN · AR · RU · KK",
  },
  trustBar:
    "ISO 9001 · ISO 14001 · ISO 10015 · TIA-942 · Uptime Tier III/IV · UN e-Gov Top-25 · SDG-aligned",
  hero: {
    eyebrow: "NSART · Technology Interaction",
    title: "Глубокотехнологичные компании из Центральной Азии — для всего мира.",
    subtitle:
      "Исследования, интеллектуальная собственность и инвестиции в Казахстане, Саудовской Аравии и Африке.",
    ctaPrimary: "Выберите путь",
    ctaSecondary: "Акселератор Miras",
    stats: [
      { value: "10–100 МВт", label: "AI & Green cloud" },
      { value: "PUE ~1,2", label: "Энергоэффективность — одна из лучших в мире" },
      { value: "Top-25", label: "Казахстан в рейтинге ООН по e-Government" },
      { value: "4 региона", label: "Центральная Азия · MENA · Южная Азия · Африка" },
    ],
  },
  audience: {
    eyebrow: "Три точки входа",
    heading: "Построено под то, как вы оцениваете технологии.",
    sub: "Инвесторы, клиенты и основатели ищут разные подтверждения. Выберите путь, который подходит вам.",
    cards: [
      {
        key: "investors",
        tag: "Для инвесторов",
        title: "Независимый deep-tech по целям устойчивого развития",
        text: "Портфель глубоких технологий по целям устойчивого развития, акселератор Miras и понятные принципы ESG и этичного ИИ.",
        href: "/investors",
        cta: "Инвестиционная стратегия",
      },
      {
        key: "enterprise",
        tag: "Для бизнеса и государства",
        title: "Технологии, отвечающие вашим стандартам",
        text: "ИИ, GovTech, умная инфраструктура и независимые дата-центры — с международной сертификацией.",
        href: "/enterprise",
        cta: "Смотреть услуги",
      },
      {
        key: "founders",
        tag: "Для основателей и R&D",
        title: "От исследования к выручке",
        text: "Полный путь интеллектуальной собственности — защита, оценка и доступ к инвестициям — для основателей, университетов и R&D-центров.",
        href: "/founders",
        cta: "Оценка ИС",
      },
    ],
  },
  technologies: {
    eyebrow: "Технологии",
    heading: "Мы проектируем, строим и сертифицируем глубокие технологии.",
    sub: "От независимых дата-центров и ИИ-вычислений до GovTech-платформ — по международным стандартам и легко проверяемые.",
    items: [
      {
        title: "Искусственный интеллект",
        text: "AI Agent Factory, государственные ИИ-агенты, машинное обучение на данных в реальном времени и обучение крупных моделей на собственной GPU-инфраструктуре.",
      },
      {
        title: "Умная инфраструктура",
        text: "Зелёные высокоплотные вычисления — кластеры NVIDIA H200, открытые экзафлопсные системы и энергоэффективный дизайн.",
      },
      {
        title: "GovTech",
        text: "20+ лет опыта электронного правительства в виде готовых модулей: цифровая идентичность, обмен данными и безбумажные услуги.",
      },
      {
        title: "Дата-центры",
        text: "AI & Green cloud — проект под Tier III/IV, PUE ~1,2, охлаждение на СПГ и лидирующая в ЦА экспертиза TIA-942 / Uptime.",
      },
    ],
  },
  mirasTeaser: {
    eyebrow: "Miras Accelerator",
    heading: "Инфраструктура, превращающая глубокие технологии в бизнес.",
    text: "Miras — совместное предприятие NSART и PNOD. Оно помогает зрелым технологиям стать реальным бизнесом — соединяя инженерию, управление и комплаенс, полное сопровождение ИС и понятный путь к инвестициям.",
    aligned: "В соответствии с Vision 2030, повесткой ОИС, Digital Cooperation Organization и ЦУР ООН.",
    cta: "О Miras Accelerator",
  },
  cases: {
    eyebrow: "Доказательства, а не обещания",
    heading: "Избранные проекты, 2024–2025.",
    sub: "Реальные проекты в Казахстане, Саудовской Аравии и за их пределами — наш самый сильный аргумент.",
    items: [
      {
        tag: "Зелёные вычисления",
        title: "AI & Green cloud",
        location: "СЭЗ «Курык», Мангистау · проект под Tier III/IV",
        status: "В разработке",
        text: "Зелёный энерго-цифровой кластер. Он использует холод соседнего СПГ-терминала для охлаждения, поэтому охлаждение почти ничего не стоит. Питание — газотурбинная станция с солнечной генерацией; проект подготовлен под зелёные облигации.",
        metrics: [
          { v: "10–100 МВт", l: "Планируемая ИТ-мощность" },
          { v: "PUE ~1,2", l: "Целевая энергоэффективность" },
          { v: "500 стоек", l: "Начальная ёмкость, вкл. AI/HPC" },
          { v: "Tier III/IV", l: "Путь сертификации Uptime + TIA-942" },
        ],
      },
      {
        tag: "HPC и ИИ",
        title: "Суверенные экзафлопс-вычисления",
        location: "Казахстан · открытый стек",
        status: "Работает",
        text: "GPU NVIDIA H200 SXM (HBM3e, 141 ГБ, 4,8 ТБ/с) с NVLink 4.0 для обучения и инференса. Открытый экзафлопсный стек — Slurm + OpenMPI, ROCm/CUDA, OpenStack, Lustre/GPFS — полностью независимо, аудируемо, без привязки к вендору.",
        metrics: [
          { v: "H200 SXM", l: "141 ГБ HBM3e на GPU" },
          { v: "4,8 ТБ/с", l: "Пропускная способность памяти" },
          { v: "Экзафлопс", l: "Открытый HPC-стек" },
          { v: "KK-LLM", l: "Обучение моделей казахского языка" },
        ],
      },
      {
        tag: "GovTech",
        title: "Saudi AI & GovTech Lab",
        location: "СП: NSART · NITEC · PNOD · King Saud University",
        status: "В разработке",
        text: "По рамкам Vision 2030: AI Agent Factory переиспользуемых государственных агентов, Smart Data Ukimet на базе 400+ национальных баз, проактивная Digital Family Card и обучение госслужащих по ИИ и данным.",
        metrics: [
          { v: "400+", l: "Объединённых национальных баз" },
          { v: "Top-25", l: "Рейтинг ООН e-Gov (KZ)" },
          { v: "Vision 2030", l: "Стратегическое соответствие" },
          { v: "4 модуля", l: "Переиспользуемы между министерствами" },
        ],
      },
      {
        tag: "Партнёрства",
        title: "Глобальный экспорт GovTech",
        location: "NITEC + InfoTech (Пакистан) · 3 региона",
        status: "Активно",
        text: "Мы экспортируем обмен данными, цифровую идентичность и безбумажные госуслуги в три региона с помощью готовых модулей — включая совместные заявки на тендеры Всемирного банка и ADB. Финтех и сертификация — через Pixel DMC; миграция в облако — с Dataset, Eagale Soft и KT Cloud Lab.",
        metrics: [
          { v: "3 региона", l: "География экспорта" },
          { v: "ВБ · ADB", l: "Совместные тендеры" },
          { v: "SSM", l: "Scalable Solution Modules" },
          { v: "Астана", l: "Вторичная облачная площадка" },
        ],
      },
    ],
  },
  markets: {
    eyebrow: "Рынки",
    heading: "Работаем в четырёх регионах.",
    sub: "Мост между Центральной Азией и миром — там, где спрос новых рынков встречается с крупными инвестициями.",
    items: [
      { name: "Центральная Азия", desc: "Наша база в Казахстане — независимые суперкомпьютеры, GovTech и зелёные дата-центры." },
      { name: "MENA", desc: "Саудовская Аравия — GovTech-лаборатории, проекты по Vision 2030 и партнёрства по управлению и комплаенсу." },
      { name: "Южная Азия", desc: "Пакистан — экспорт GovTech, платёжные шлюзы и сертификация." },
      { name: "Африка", desc: "Инфраструктура новых рынков, ответственные инвестиции и обучение." },
    ],
  },
  partners: {
    eyebrow: "Партнёры",
    heading: "Сеть государств, науки и инвесторов.",
    sub: "Сгруппированы по роли — от государственной инфраструктуры до управления, устойчивого развития и выхода на рынки.",
    groups: [
      { name: "Государство и инфраструктура", members: ["NITEC", "KT Cloud Lab", "Ghalam", "SpaceLab"] },
      { name: "Технологии и облако", members: ["KazDream", "MyCloud", "AiMap", "Eagale Soft", "InfoTech", "Pixel DMC"] },
      { name: "Наука и образование (deep-tech origin)", members: ["King Saud University", "Вузы и НИИ Казахстана", "Artisan Education"] },
      { name: "Управление, аудит и устойчивое развитие", members: ["PNOD Auditing Co.", "MSTDAM"] },
      { name: "Торговля и выход на рынки", members: ["QazTrade", "Партнёры MENA", "Партнёры Южной Азии", "Партнёры Африки"] },
    ],
    spotlight: [
      {
        name: "PNOD Auditing Co.",
        role: "Управление, аудит и контроль ИИ (14 лет опыта; ISO/IEC 42001), глубокое знание регуляторной среды Саудовской Аравии. Со-учредитель совместного предприятия Miras Accelerator.",
      },
      {
        name: "MSTDAM",
        role: "Платформа экологической устойчивости — измерение углеродного следа, посадка деревьев, ESG-отчётность (Саудовская Аравия). Партнёр по «зелёной» повестке и ESG.",
      },
      {
        name: "NITEC",
        role: "Национальные информационные технологии — государственный оператор сервисов электронного правительства и цифровой идентичности Казахстана.",
      },
      {
        name: "King Saud University",
        role: "Главный академический партнёр в Саудовской Аравии — deep-tech-исследования, совместные R&D и Saudi AI & GovTech Lab.",
      },
    ],
    logos: [
      { name: "NITEC", url: "https://nitec.kz" },
      { name: "KazDream", url: "https://kazdream.kz" },
      { name: "Juldizai", url: "https://juldizai.kz/kk/" },
      { name: "MyCloud", url: "https://mycloud.kz" },
      { name: "SpaceLab", url: "https://spacelab.kz/ru" },
      { name: "Gharysh", url: "https://www.gharysh.kz/" },
      { name: "Suburban Cloud", url: "https://suburbancloud.ng/" },
      { name: "Eagale Soft", url: "https://eagale.com/" },
      { name: "InfoTech", url: "https://infotechgroup.com/" },
      { name: "AiMap", url: "https://aimap.kz/" },
      { name: "QazTrade", url: "https://qaztrade.org.kz/rus/" },
      { name: "EdTech KN", url: "https://edtechkn.com/" },
      { name: "Artisan Education", url: "https://artisan.education/ru" },
      { name: "Paxaro Labs", url: "https://www.linkedin.com/company/paxarolabs/" },
      { name: "4Sight", url: "https://www.4sight.com.pk" },
      { name: "Uneet", url: "https://www.linkedin.com/company/uneet-kz/about/" },
      { name: "Alarcom", url: "https://alarcom.kz/" },
    ],
  },
  verticals: {
    eyebrow: "Направления",
    heading: "Где мы работаем.",
    sub: "Четыре направления, в которых NSART строит, сертифицирует и масштабирует глубокие технологии.",
    items: [
      {
        n: "01",
        title: "Телеком и космические технологии",
        text: "Телекоммуникации, сетевая аналитика, космические технологии, дата-центры — инновации для связи и аэрокосмического сектора.",
        tags: ["Сетевая аналитика", "Space Tech", "Дата-центры"],
      },
      {
        n: "02",
        title: "GovTech",
        text: "Государственные цифровые решения — сервисы e-Gov и кибербезопасность для прозрачного и защищённого общественного сектора.",
        tags: ["e-Gov", "Кибербезопасность"],
      },
      {
        n: "03",
        title: "Цифровые платформы",
        text: "Цифровые платформы для образования, финтеха, автомобильной, продовольственной и аграрной отраслей — готовые решения для новых рынков.",
        tags: ["EdTech", "FinTech", "CarTech", "FoodTech", "AgroTech"],
      },
      {
        n: "04",
        title: "Умная инфраструктура",
        text: "Интеллектуальные городские решения — цифровые двойники, smart-поля, AIoT и M2M-инфраструктура для современных городов.",
        tags: ["Цифровые двойники", "Smart Field", "AIoT и M2M"],
      },
    ],
  },
  methodology: {
    eyebrow: "Методология",
    heading: "Проверенные фреймворки, превращающие идеи в реальные компании.",
    sub: "Четыре фреймворка, которые NSART использует на каждом проекте — от стратегии до исполнения.",
    items: [
      {
        n: "01",
        title: "Vision 3P",
        sub: "Стратегическое видение",
        text: "Один принцип: сначала People (команда), затем простой Process (процесс) и качественный Product (продукт).",
        tags: ["People", "Process", "Product"],
      },
      {
        n: "02",
        title: "Venture Development",
        sub: "Интегрированный цикл развития",
        text: "Полный венчурный цикл — от идеи до масштабирования операций и достижения результата.",
        tags: ["Value Creation", "Value Protection", "Structuring", "Operations"],
      },
      {
        n: "03",
        title: "GIST Planning",
        sub: "Гибкое стратегическое планирование",
        text: "От долгосрочных целей и инновационных идей до конкретных шагов и эффективного исполнения.",
        tags: ["Goals", "Ideas", "Steps", "Tasks"],
      },
      {
        n: "04",
        title: "CIVTI Assessment",
        sub: "Система оценки проектов",
        text: "Комплексный анализ идей по ценности, технической сложности и требуемым инвестициям.",
        tags: ["Current Ideas", "Value", "Complexity", "Investment"],
      },
    ],
  },
  experience: {
    eyebrow: "Опыт",
    heading: "Два десятилетия строим технологические бизнесы.",
    items: [
      { period: "2007–2010", title: "Стратегический консалтинг и маркетинговые исследования" },
      { period: "2010–2015", title: "Разработка ПО и GovTech-проекты" },
      { period: "2015–2023", title: "Бизнес-решения «под ключ» и продуктовая разработка" },
      { period: "2023–настоящее время", title: "Полноцикловая венчурная студия" },
    ],
  },
  products: {
    eyebrow: "Продукты",
    heading: "Что мы поставляем.",
    items: [
      {
        title: "NSART Gateway",
        text: "Выход на рынки Центральной Азии, Южной Азии, MENA и Африки.",
      },
      {
        title: "NSART Corporate Innovations",
        text: "Исследования, пилотные проекты и программы открытых инноваций для бизнес-клиентов.",
      },
    ],
  },
  certifications: {
    eyebrow: "Сертификаты и соответствие",
    heading: "Доказательства, которые можно проверить.",
    sub: "Независимые доказательства для всех аудиторий — качество, экология, инфраструктура и управление.",
    items: [
      { name: "ISO 9001", meaning: "Менеджмент качества." },
      { name: "ISO 14001", meaning: "Экологический менеджмент — нац. + межд. Прямая связь с ESG." },
      { name: "ISO 10015", meaning: "Менеджмент обучения и развития (поддерживает Capacity Building)." },
      { name: "TIA-942", meaning: "Стандарт инфраструктуры дата-центров — лидирующая практика в ЦА." },
      { name: "Uptime Tier III/IV", meaning: "Сертификация проекта и построенного дата-центра." },
      { name: "UN e-Gov Top-25", meaning: "Электронное правительство Казахстана — в числе лучших в мире." },
    ],
  },
  contact: {
    eyebrow: "Контакты",
    heading: "Начните разговор, который подходит вам.",
    sub: "Отдельные пути для инвесторов, бизнеса и государства, основателей и R&D.",
    audiences: [
      { title: "Инвесторы", text: "Инвестиционная стратегия, ESG-бриф и акселератор Miras.", cta: "Связаться по инвестициям", href: "/investors" },
      { title: "Бизнес и государство", text: "Технологический аудит, пилоты и AI-услуги.", cta: "Запросить аудит", href: "/enterprise" },
      { title: "Основатели и R&D", text: "Оценка ИС и доступ к инвестициям.", cta: "Заказать оценку ИС", href: "/founders" },
    ],
    email: "info@nsart.kz",
    emailLabel: "Написать нам",
  },
  footer: {
    tagline: "Глубокотехнологичные компании из Центральной Азии — для всего мира.",
    company: "Компания",
    audiences: "Аудитории",
    contactTitle: "Контакты",
    rights: "NSART · Technology Interaction. Все права защищены.",
    confidential:
      "Мы показываем Miras Accelerator только на публичном уровне — без бюджетов, сумм фондов и внутренних деталей.",
  },
  investorsPage: {
    badge: "Институциональным и импакт-инвесторам",
    title: "Инвестируйте в независимую глубокотехнологичную инфраструктуру по целям устойчивого развития.",
    intro:
      "Мы делаем инвестиции в зелёные дата-центры, ИИ-вычисления и GovTech на новых рынках более безопасными — с надёжными экологическими стандартами, ответственным ИИ и международной сертификацией. Акселератор Miras — это то, как мы привлекаем капитал.",
    ctas: ["Инвестиционная стратегия", "Акселератор Miras", "Запросить ESG-бриф по почте"],
    audienceNote:
      "Для IsDB, EBRD, ADB, Всемирного банка, фондов под эгидой ООН и частных импакт-инвесторов.",
    sdg: {
      heading: "В соответствии с Целями устойчивого развития ООН",
      sub: "NSART и акселератор Miras соответствуют широко признанным целям — привязка к ЦУР без раскрытия финансовых деталей.",
      items: [
        { goal: "ЦУР 4 и 9", desc: "Образование, технологии, промышленность и инновации — подготовка инженеров, трансфер технологий." },
        { goal: "ЦУР 7 и 13", desc: "Чистая энергия и климат — зелёный дата-центр, солнечная генерация, снижение углеродного следа." },
        { goal: "ЦУР 8", desc: "Достойный труд и экономический рост — поддержка МСП и создание рабочих мест." },
        { goal: "ЦУР 11", desc: "Устойчивые города — умная инфраструктура и GovTech." },
        { goal: "ЦУР 17", desc: "Партнёрства — соглашения с банками развития и госорганами." },
      ],
    },
    esg: {
      heading: "ESG и зелёное финансирование",
      sub: "Прямой язык банков развития.",
      points: [
        { title: "AI & Green cloud, PUE ~1,2", text: "Охлаждение на СПГ как основная система, со встроенной солнечной генерацией." },
        { title: "Готовность к зелёным облигациям", text: "Подготовлено под зелёные облигации и финансирование банков развития." },
        { title: "Этичный ИИ и приватность", text: "Прозрачность, отсутствие предвзятости, человеческий контроль; обработка данных в логике GDPR." },
        { title: "Независимые открытые системы", text: "Аудируемо, без привязки к вендору." },
      ],
    },
    metricsHeading: "Цифры",
    cta: { heading: "Запросите инвест-материалы", text: "Пришлём one-pager и презентацию по email. Конфиденциальные детали онлайн не публикуем.", button: "Связаться с инвест-командой" },
  },
  enterprisePage: {
    badge: "Частному и государственному сектору",
    title: "Технологии, отвечающие вашим стандартам — национальным и международным.",
    intro:
      "От независимых дата-центров и ИИ-вычислений до GovTech-платформ — мы проектируем, строим и сертифицируем технологии для государственного и частного секторов, а также находим, тестируем и внедряем новые разработки в ваши процессы.",
    ctas: ["Запросить технологический аудит", "Запустить пилот", "AI-услуги"],
    services: {
      heading: "Каталог услуг",
      items: [
        { title: "AI-системы", text: "ИИ-агенты, машинное обучение и системы принятия решений на собственных вычислениях." },
        { title: "Умная инфраструктура", text: "Высокоплотные энергоэффективные вычисления и связность." },
        { title: "GovTech", text: "Цифровая идентичность, обмен данными и безбумажные услуги." },
        { title: "Сертификация дата-центров", text: "TIA-942 и Uptime Tier III/IV — полный цикл." },
        { title: "Корпоративные инновации", text: "Технологический скаутинг и интеграция в ваши процессы." },
        { title: "SpaceTech / NajmSat", text: "Редкая космическая экспертиза — спутниковые и наземные системы." },
      ],
    },
    standards: {
      heading: "Стандарты и соответствие",
      items: ["ISO 9001", "ISO 14001", "ISO 10015", "TIA-942", "Uptime Tier III/IV", "Техрегулирование РК", "Данные в логике GDPR"],
    },
    scouting: {
      heading: "Технологический скаутинг в три шага",
      steps: [
        { n: "01", title: "Скаутинг", text: "Поиск новых технологий, релевантных вашим процессам." },
        { n: "02", title: "Оценка (CIVTI)", text: "Оценка соответствия, готовности и эффекта по нашей методологии." },
        { n: "03", title: "Интеграция", text: "Внедрение проверенных инноваций в ваши процессы и системы." },
      ],
    },
    pilot: {
      heading: "Простой способ начать",
      text: "Proof of concept за 6–8 недель с понятным планом — проверьте идею до того, как брать обязательства.",
      button: "Запустить пилот",
    },
  },
  foundersPage: {
    badge: "Основателям, университетам и R&D-центрам",
    title: "От исследования к выручке — защитите, оцените и развивайте идеи и ноу-хау.",
    intro:
      "Для стартапов, зрелых компаний, университетов и R&D-центров: мы ведём весь путь интеллектуальной собственности — оценку, защиту и определение стоимости — и открываем путь к инвестициям и росту через акселератор Miras.",
    ctas: ["Оценка ИС", "Подать заявку в Miras", "Связаться с командой"],
    lifecycle: {
      heading: "Жизненный цикл ИС",
      sub: "Четыре шага и что делает NSART на каждом.",
      steps: [
        { n: "1", title: "Оценка", text: "Аудит активов и скоринг готовности — TRL / CRL / MRL — выявление охраноспособных объектов." },
        { n: "2", title: "Защита", text: "Патенты, товарные знаки, ноу-хау, регистрация ПО и стратегия охраны в нескольких юрисдикциях." },
        { n: "3", title: "Стоимость", text: "Оценка нематериальных активов методами DCF и рыночных аналогов для сделок и привлечения средств." },
        { n: "4", title: "Монетизация", text: "Лицензирование, структурирование сделок и выход на инвестиции через акселератор Miras." },
      ],
    },
    assets: {
      heading: "Типы активов",
      items: ["ПО", "Цифровые сервисы", "Агропромышленные комплексы", "Результаты R&D", "Космические технологии"],
    },
    university: {
      heading: "Отдельный трек для университетов и R&D-центров",
      text: "Корни в deep-tech — вывод исследований на рынок, спин-оффы из науки, защита и продажа результатов исследований.",
      anchors: "Партнёры-якоря: King Saud University (Саудовская Аравия) и научные институты и вузы Казахстана.",
    },
    form: {
      heading: "Простая форма заявки",
      sub: "Укажите отрасль, стадию и потребность — мы направим вас в нужный трек.",
      industry: "Отрасль",
      stage: "Стадия",
      need: "Что нужно",
      name: "Имя",
      email: "Email",
      submit: "Отправить заявку",
      success: "Спасибо — мы скоро свяжемся с вами.",
      stages: ["Идея", "Прототип / TRL 4–6", "Пилот / TRL 7–8", "Выручка / масштабирование"],
    },
  },
  aboutPage: {
    badge: "О компании",
    title: "Мы превращаем глубокотехнологичные идеи в реальные бизнесы.",
    intro:
      "NSART — венчурная студия, сфокусированная на deep-tech-проектах: поиск инвестиционных возможностей, построение партнёрств, создание компаний и выход на рынки Центральной Азии, MENA, Южной Азии и Африки.",
    missionHeading: "Наша миссия",
    missionText:
      "Соединить науку и бизнес: брать проверенные исследования, превращать их в инвестиционно-готовые компании и подключать к международному капиталу и институтам.",
    valuesHeading: "Что мы отстаиваем",
    values: [
      { title: "Независимость по дизайну", text: "Открытые системы, без привязки к вендору, лёгкий аудит для регуляторов и инвесторов." },
      { title: "Доказательства, а не риторика", text: "Каждое утверждение подкреплено сертификатом, цифрой или работающим проектом." },
      { title: "В соответствии с глобальными мандатами", text: "ЦУР, ESG, готовность к капиталу банков развития." },
      { title: "Многоязычность по умолчанию", text: "EN · AR · RU · KK — для рынков, где мы работаем." },
    ],
  },
  technologiesPage: {
    badge: "Технологический стек",
    title: "Глубокие технологии — спроектированы и сертифицированы.",
    intro:
      "От независимых дата-центров и ИИ-вычислений до GovTech и умной инфраструктуры — по международным стандартам, с полным аудитом и интеграцией с государственными и корпоративными системами.",
    pillars: [
      {
        title: "Искусственный интеллект",
        text: "AI Agent Factory, государственные ИИ-агенты, машинное обучение на данных в реальном времени и обучение крупных моделей на собственной GPU-инфраструктуре (NVIDIA H200, открытый экзафлопсный стек).",
        items: ["Agent Factory", "Доменные LLM", "Real-time ML", "Собственные GPU"],
      },
      {
        title: "Умная инфраструктура",
        text: "Высокоплотные вычисления, AIoT и M2M-сети, платформы цифровых двойников и связность для городской и индустриальной среды.",
        items: ["AIoT и M2M", "Цифровые двойники", "Smart Field", "Энергоэффективный дизайн"],
      },
      {
        title: "GovTech",
        text: "20+ лет опыта электронного правительства как масштабируемые модули: цифровая идентичность, обмен данными, безбумажные услуги, кибербезопасность.",
        items: ["e-Gov", "Цифровой ID", "Обмен данными", "Кибербезопасность"],
      },
      {
        title: "Дата-центры",
        text: "AI & Green cloud — проект под Tier III/IV, PUE ~1,2, охлаждение на СПГ и лидирующая в Центральной Азии экспертиза TIA-942 / Uptime.",
        items: ["TIA-942", "Uptime Tier III/IV", "PUE ~1,2", "Охлаждение на СПГ"],
      },
    ],
  },
  ipPage: {
    badge: "Интеллектуальная собственность и нематериальные активы",
    title: "Защитите, оцените и зарабатывайте на идеях и ноу-хау.",
    intro:
      "Полная поддержка интеллектуальной собственности — ПО, цифровые сервисы, результаты R&D, агропромышленные проекты и космические технологии. От аудита и защиты до оценки, лицензирования и пути к инвестициям.",
    lifecycleHeading: "Жизненный цикл ИС",
    steps: [
      { n: "1", title: "Оценка", text: "Аудит активов и скоринг готовности (TRL / CRL / MRL); выявление охраноспособных объектов." },
      { n: "2", title: "Защита", text: "Патенты, товарные знаки, ноу-хау, регистрация ПО, стратегия в нескольких юрисдикциях." },
      { n: "3", title: "Стоимость", text: "Оценка методами DCF и рыночных аналогов — для сделок, привлечения средств и партнёрств." },
      { n: "4", title: "Монетизация", text: "Лицензирование, структурирование сделок и выход на инвестиции через Miras Accelerator." },
    ],
    assetsHeading: "Типы активов",
    assets: ["ПО", "Цифровые сервисы", "Результаты R&D", "Агропромышленные комплексы", "Космические технологии"],
    ctaHeading: "Выведите активы на следующий этап.",
    ctaText: "Начните с оценки ИС — мы составим карту портфеля и подскажем лучший способ защиты и заработка.",
    ctaButton: "Заказать оценку ИС",
  },
  marketsPage: {
    badge: "География работы",
    title: "Четыре региона. Один мост.",
    intro:
      "NSART работает там, где спрос новых рынков встречается с крупными инвестициями — Центральная Азия как база, Саудовская Аравия и MENA как направление роста, а Южная Азия и Африка — куда мы расширяемся дальше.",
    regionsHeading: "Регионы",
    regions: [
      {
        name: "Центральная Азия",
        kicker: "База",
        desc: "Казахстан: независимые суперкомпьютеры, проверенный GovTech и зелёные дата-центры. 20+ лет опыта электронного правительства и Top-25 в рейтинге ООН по e-Gov.",
      },
      {
        name: "MENA",
        kicker: "Коридор роста",
        desc: "Саудовская Аравия: GovTech-лаборатории по Vision 2030, партнёрства по управлению и комплаенсу с PNOD и совместное предприятие Miras Accelerator.",
      },
      {
        name: "Южная Азия",
        kicker: "Экспансия",
        desc: "Пакистан: экспорт GovTech совместно с NITEC + InfoTech, платёжные шлюзы через Pixel DMC, дистрибуция сертификаций.",
      },
      {
        name: "Африка",
        kicker: "Фронтир",
        desc: "Инфраструктура новых рынков, ответственные инвестиции, обучение и готовые модули для правительств.",
      },
    ],
    gatewayHeading: "NSART Gateway",
    gatewayText:
      "Продукт для выхода на рынки Центральной Азии, Южной Азии, MENA и Африки — локальное присутствие, помощь с регулированием и партнёрские сети.",
  },
  partnersPage: {
    badge: "Экосистема",
    title: "Сеть государств, науки и инвесторов.",
    intro:
      "Мы работаем с пятью группами партнёров — государство и инфраструктура, технологии и облако, наука и образование, управление и устойчивое развитие, торговля и выход на рынки.",
    spotlightHeading: "Ключевые партнёры",
    logoHeading: "Избранные партнёры",
  },
  contactPage: {
    badge: "Связаться",
    title: "Начните разговор, который подходит вам.",
    intro: "Отдельные пути для инвесторов, бизнеса и государства, основателей и R&D. Отвечаем в течение двух рабочих дней.",
    formHeading: "Напишите нам",
    formName: "Имя",
    formEmail: "Email",
    formOrg: "Организация",
    formAudience: "Я —",
    formMessage: "Сообщение",
    formSubmit: "Отправить",
    formSuccess: "Спасибо — мы скоро свяжемся с вами.",
    audienceOptions: ["Инвестор", "Бизнес / Государство", "Основатель / R&D", "Партнёр", "Другое"],
    directHeading: "Или свяжитесь напрямую",
    location: "Астана, Казахстан",
    privacy: "Отправляя форму, вы соглашаетесь, что мы можем с вами связаться. Мы не передаём данные третьим лицам.",
  },
  mirasPage: {
    badge: "Совместное предприятие · NSART × PNOD",
    title: "Miras Accelerator — инфраструктура, превращающая глубокие технологии в бизнес.",
    intro:
      "Miras — совместное предприятие NSART и PNOD. Оно помогает зрелым технологиям стать реальным бизнесом — соединяя инженерию, управление и комплаенс, полное сопровождение ИС и понятный путь к инвестициям, в соответствии с Vision 2030, повесткой ОИС и ЦУР ООН.",
    ctas: ["О Miras", "Подать заявку в трек", "Стать партнёром"],
    problem: {
      heading: "Какой разрыв закрывает Miras",
      text: "Технология может быть научно готова, но у компании не хватает коммерческой, регуляторной и производственной базы, чтобы её применить. Miras закрывает этот разрыв с помощью модели готовности из трёх частей.",
      dims: [
        { code: "TRL", title: "Технологическая готовность", q: "Доказана ли технология в нужном масштабе?" },
        { code: "CRL", title: "Коммерческая готовность", q: "Есть ли путь к выручке, ценообразование и контрактная модель?" },
        { code: "MRL", title: "Производственная готовность", q: "Можно ли произвести, сертифицировать и поставить продукт?" },
      ],
    },
    tracks: {
      heading: "Три трека",
      items: [
        { n: "Трек 1", title: "Deep-Tech Cohort", text: "Мы ведём команды от первой диагностики до готовности к инвестициям и демо-дня." },
        { n: "Трек 2", title: "Regulatory Sandbox", text: "Тестирование решений в контролируемой регулируемой среде — CleanTech, GovTech, ИИ-агенты, дата-маркетплейс — на собственной GPU-инфраструктуре." },
        { n: "Трек 3", title: "IP Portfolio & Founders", text: "Весь путь ИС и поддержка основателей — от диагностики до лицензирования и витрины ИС." },
      ],
    },
    positioning: {
      heading: "Стратегическое позиционирование",
      text: "Miras построен вокруг широко признанных целей — Saudi Vision 2030, повестки ОИС, Digital Cooperation Organization и Целей устойчивого развития ООН. Это язык, понятный институтам развития, и его можно использовать без раскрытия коммерческих деталей.",
    },
    confidential:
      "Конфиденциальность: раздел остаётся на публичном уровне. Бюджеты, суммы фондов, имена руководителей и советников, конкретные инвесторы и детали переговоров с госорганами — внутренние данные.",
  },
};

/* ------------------------------------------------------------------ */
/*  Arabic — marketing-critical copy (brief); EN fallback elsewhere   */
/* ------------------------------------------------------------------ */

const ar: DeepPartial<Dictionary> = {
  meta: {
    title: "NSART · التفاعل التقني",
    description:
      "نبني شركات تقنية عميقة من آسيا الوسطى إلى العالم — البحث والتطوير والملكية الفكرية والاستثمار في كازاخستان والسعودية وأفريقيا.",
  },
  nav: {
    home: "الرئيسية",
    about: "عن الشركة",
    technologies: "التقنيات",
    ip: "الملكية الفكرية والأصول",
    miras: "مسرّعة مِراس",
    investors: "للمستثمرين",
    enterprise: "للشركات والحكومات",
    founders: "للمؤسسين والبحث والتطوير",
    markets: "الأسواق",
    partners: "الشركاء",
    contact: "تواصل معنا",
  },
  trustBar:
    "ISO 9001 · ISO 14001 · ISO 10015 · TIA-942 · Uptime Tier III/IV · UN e-Gov Top-25 · متوافق مع أهداف التنمية المستدامة",
  navGroups: { company: "الشركة", audiences: "الجمهور" },
  common: {
    getInTouch: "تواصل معنا",
    learnMore: "اعرف المزيد",
    explore: "استكشف",
    backHome: "العودة للرئيسية",
    status: "الحالة",
    location: "الموقع",
    inDevelopment: "قيد التطوير",
    allLanguages: "EN · AR · RU · KK",
  },
  hero: {
    eyebrow: "NSART · التفاعل التقني",
    title: "مشاريع التقنيات العميقة من آسيا الوسطى إلى العالم.",
    subtitle:
      "البحث والتطوير والملكية الفكرية والاستثمار في كازاخستان والسعودية وأفريقيا.",
    ctaPrimary: "اختر مسارك",
    ctaSecondary: "استكشف مسرّعة مِراس",
    stats: [
      { value: "10–100 ميجاوات", label: "AI & Green cloud" },
      { value: "PUE ~1,2", label: "كفاءة الطاقة — من بين الأفضل عالميًا" },
      { value: "Top-25", label: "كازاخستان في تصنيف الأمم المتحدة للحكومة الإلكترونية" },
      { value: "4 مناطق", label: "آسيا الوسطى · MENA · جنوب آسيا · أفريقيا" },
    ],
  },
  technologies: {
    eyebrow: "التقنيات",
    heading: "نُصمّم ونبني ونعتمد التقنيات العميقة.",
    sub: "من مراكز البيانات المستقلة والحوسبة بالذكاء الاصطناعي إلى منصّات الحكومة الرقمية — وفق المعايير الدولية وقابلة للتدقيق.",
    items: [
      { title: "الذكاء الاصطناعي", text: "مصنع وكلاء الذكاء الاصطناعي، وكلاء حكوميون متخصّصون، تعلّم آلي على بحيرات بيانات لحظية، وتدريب نماذج كبيرة على بنية GPU مستقلة." },
      { title: "البنية التحتية الذكية", text: "حوسبة خضراء عالية الكثافة — عناقيد NVIDIA H200، حزم برمجية مفتوحة بأداء إكزافلوبس، وتصميم موفّر للطاقة." },
      { title: "الحكومة الرقمية", text: "أكثر من 20 عامًا من الخبرة في الحكومة الإلكترونية كموديولات قابلة للتوسيع: الهوية الرقمية وتبادل البيانات والخدمات الإلكترونية." },
      { title: "مراكز البيانات", text: "AI & Green cloud — تصميم Tier III/IV، PUE ~1,2، تبريد بالغاز المسال، والممارسة الرائدة في TIA-942 / Uptime في آسيا الوسطى." },
    ],
  },
  verticals: {
    eyebrow: "القطاعات",
    heading: "أين نعمل.",
    sub: "أربعة قطاعات يبني فيها NSART التقنيات العميقة ويعتمدها ويوسّع نطاقها.",
    items: [
      { n: "01", title: "الاتصالات والتقنيات الفضائية", text: "اتصالات، تحليلات الشبكات، تقنيات فضائية، مراكز بيانات.", tags: ["تحليلات الشبكات", "Space Tech", "مراكز البيانات"] },
      { n: "02", title: "الحكومة الرقمية", text: "حلول حكومية رقمية — خدمات إلكترونية وأمن سيبراني لقطاع عام شفاف وآمن.", tags: ["e-Gov", "الأمن السيبراني"] },
      { n: "03", title: "المنصّات الرقمية", text: "منصّات رقمية للتعليم والمالية والسيارات والغذاء والزراعة.", tags: ["EdTech", "FinTech", "CarTech", "FoodTech", "AgroTech"] },
      { n: "04", title: "البنية التحتية الذكية", text: "حلول المدن الذكية — التوائم الرقمية، الحقول الذكية، AIoT وM2M.", tags: ["التوائم الرقمية", "Smart Field", "AIoT وM2M"] },
    ],
  },
  methodology: {
    eyebrow: "المنهجية",
    heading: "أُطر مثبتة تحوّل الأفكار إلى شركات حقيقية.",
    sub: "أربعة أُطر تستخدمها NSART في كل مشروع — من الاستراتيجية إلى التنفيذ.",
    items: [
      { n: "01", title: "Vision 3P", sub: "الرؤية الاستراتيجية", text: "وفق قانون القافلة — الأولوية للأشخاص والعمليات والمنتج.", tags: ["People", "Process", "Product"] },
      { n: "02", title: "Venture Development", sub: "دورة تطوير متكاملة", text: "دورة كاملة للأعمال — من ميلاد الفكرة إلى توسيع العمليات.", tags: ["Value Creation", "Value Protection", "Structuring", "Operations"] },
      { n: "03", title: "GIST Planning", sub: "تخطيط استراتيجي مرن", text: "من الأهداف بعيدة المدى والأفكار المبتكرة إلى خطوات واضحة وتنفيذ فعّال.", tags: ["Goals", "Ideas", "Steps", "Tasks"] },
      { n: "04", title: "CIVTI Assessment", sub: "نظام تقييم المشاريع", text: "تحليل شامل للأفكار من خلال القيمة والتعقيد التقني والاستثمار المطلوب.", tags: ["Current Ideas", "Value", "Complexity", "Investment"] },
    ],
  },
  experience: {
    eyebrow: "الخبرة",
    heading: "عقدان من بناء أعمال تقنية.",
    items: [
      { period: "2007–2010", title: "الاستشارات الاستراتيجية وأبحاث السوق" },
      { period: "2010–2015", title: "تطوير البرمجيات ومشاريع الحكومة الرقمية" },
      { period: "2015–2023", title: "حلول أعمال متكاملة وتطوير منتجات" },
      { period: "2023–حتى الآن", title: "استوديو مشاريع متكامل الدورة" },
    ],
  },
  products: {
    eyebrow: "المنتجات",
    heading: "ما نقدّمه.",
    items: [
      { title: "NSART Gateway", text: "الدخول إلى أسواق آسيا الوسطى وجنوب آسيا وMENA وأفريقيا." },
      { title: "NSART Corporate Innovations", text: "البحث والتطوير، والتطبيقات التجريبية، وبرامج الابتكار المفتوح للعملاء المؤسسيين." },
    ],
  },
  audience: {
    eyebrow: "ثلاثة مسارات",
    heading: "مصمَّمة وفق طريقتك في تقييم التقنية.",
    sub: "المستثمرون والعملاء والمؤسّسون يبحثون عن إشارات ثقة مختلفة. اختر المسار الذي يناسبك.",
    cards: [
      {
        key: "investors",
        tag: "للمستثمرين",
        title: "تقنيات عميقة مستقلة متوافقة مع أهداف التنمية المستدامة",
        text: "محفظة تقنيات عميقة متوافقة مع أهداف التنمية المستدامة، ومسرّعة مِراس، وأطر ESG والذكاء الاصطناعي الأخلاقي.",
        href: "/investors",
        cta: "أطروحتنا الاستثمارية",
      },
      {
        key: "enterprise",
        tag: "للشركات والحكومات",
        title: "تقنية تلبّي معاييرك",
        text: "الذكاء الاصطناعي والحكومة الرقمية والبنية التحتية الذكية ومراكز البيانات المستقلة، معتمدة وفق المعايير الدولية.",
        href: "/enterprise",
        cta: "استكشف الخدمات",
      },
      {
        key: "founders",
        tag: "للمؤسسين والبحث والتطوير",
        title: "من البحث إلى الإيراد",
        text: "دورة حياة كاملة للملكية الفكرية، والتقييم، والوصول إلى الاستثمار للمؤسسين والجامعات ومراكز البحث والتطوير.",
        href: "/founders",
        cta: "تقييم الملكية الفكرية",
      },
    ],
  },
  mirasTeaser: {
    eyebrow: "مسرّعة مِراس",
    heading: "بنية تحتية لتحويل التقنيات العميقة إلى أعمال.",
    text: "مسرّعة مِراس، وهي مشروع مشترك بين NSART وPNOD، تساعد التقنيات الناضجة على تجاوز فجوة الجاهزية — بالجمع بين هندسة التقنيات العميقة والحوكمة والامتثال، ودعم دورة حياة الملكية الفكرية كاملةً، ومسار نحو الاستثمار.",
    aligned: "بما يتوافق مع رؤية 2030 ومنظمة التعاون الإسلامي ومنظمة التعاون الرقمي وأهداف التنمية المستدامة.",
    cta: "داخل مسرّعة مِراس",
  },
  cases: {
    eyebrow: "براهين لا وعود",
    heading: "أعمال مختارة، 2024–2025.",
    sub: "مشاريع حقيقية في كازاخستان والمملكة العربية السعودية وأبعد — أقوى دليل نقدّمه.",
    items: [
      {
        tag: "حوسبة خضراء",
        title: "AI & Green cloud",
        location: "المنطقة الاقتصادية الحرة كوريق، منطقة منغيستاو · تصميم Tier III/IV",
        status: "قيد التطوير",
        text: "مجمّع طاقة-رقمي أخضر يستخدم البرودة المُتولّدة من إعادة تغويز الغاز المسال كتبريد رئيسي — تكلفة هامشية للتبريد قريبة من الصفر. مدعوم بمحطّة توربينات غازية مع توليد شمسي مدمج، مهيّكل للتمويل بالسندات الخضراء.",
        metrics: [
          { v: "10–100 ميجاوات", l: "السعة الحاسوبية المخطّطة" },
          { v: "PUE ~1,2", l: "كفاءة هدفية" },
          { v: "500 خزانة", l: "السعة الابتدائية، تشمل AI/HPC" },
          { v: "Tier III/IV", l: "مسار Uptime + TIA-942" },
        ],
      },
      {
        tag: "HPC والذكاء الاصطناعي",
        title: "حوسبة مستقلة بأداء إكزافلوبس",
        location: "كازاخستان · حزمة برمجية مفتوحة",
        status: "عاملة",
        text: "NVIDIA H200 SXM (HBM3e، 141 جيجابايت، 4,8 تيرابايت/ث) مع NVLink 4.0 للتدريب والاستدلال. حزمة إكزافلوبس مفتوحة — Slurm + OpenMPI، ROCm/CUDA OSS، OpenStack، Lustre/GPFS — مستقلة، قابلة للتدقيق، دون قفل المورد.",
        metrics: [
          { v: "H200 SXM", l: "141 جيجابايت HBM3e لكل GPU" },
          { v: "4,8 تيرابايت/ث", l: "عرض النطاق للذاكرة" },
          { v: "إكزافلوبس", l: "حزمة HPC مفتوحة" },
          { v: "KK-LLM", l: "تدريب نماذج اللغة الكازاخية" },
        ],
      },
      {
        tag: "الحكومة الرقمية",
        title: "مختبر الذكاء الاصطناعي والحكومة الرقمية السعودي",
        location: "مشروع مشترك: NSART · NITEC · PNOD · جامعة الملك سعود",
        status: "قيد التطوير",
        text: "بما يتوافق مع رؤية 2030: مصنع وكلاء حكوميين قابلين لإعادة الاستخدام، Smart Data Ukimet فوق 400+ قاعدة بيانات وطنية، البطاقة العائلية الرقمية الاستباقية، وبرنامج بناء قدرات في الذكاء الاصطناعي والبيانات لموظفي الحكومة.",
        metrics: [
          { v: "400+", l: "قواعد بيانات وطنية موحّدة" },
          { v: "Top-25", l: "تصنيف الأمم المتحدة (KZ)" },
          { v: "Vision 2030", l: "توافق استراتيجي" },
          { v: "4 موديولات", l: "قابلة لإعادة الاستخدام بين الوزارات" },
        ],
      },
      {
        tag: "الشراكات",
        title: "تصدير الحكومة الرقمية عالميًا",
        location: "NITEC + InfoTech (باكستان) · 3 مناطق",
        status: "نشط",
        text: "تبادل البيانات والهوية الرقمية والخدمات الحكومية الرقمية مُصدَّرة في ثلاث مناطق عبر Scalable Solution Modules — بما في ذلك المشاركة المشتركة في مناقصات البنك الدولي وADB.",
        metrics: [
          { v: "3 مناطق", l: "نطاق التصدير" },
          { v: "WB · ADB", l: "مناقصات مشتركة" },
          { v: "SSM", l: "Scalable Solution Modules" },
          { v: "أستانا", l: "موقع سحابي ثانوي" },
        ],
      },
    ],
  },
  markets: {
    eyebrow: "الأسواق",
    heading: "نعمل في أربع مناطق.",
    sub: "جسر بين آسيا الوسطى والعالم — حيث يلتقي طلب الأسواق الناشئة برأس المال المؤسسي.",
    items: [
      { name: "آسيا الوسطى", desc: "كازاخستان: HPC مستقل، مرجع GovTech، ومراكز بيانات خضراء." },
      { name: "MENA", desc: "السعودية: مختبرات GovTech بما يتوافق مع رؤية 2030 وشراكات الحوكمة." },
      { name: "جنوب آسيا", desc: "باكستان: تصدير الحكومة الرقمية، بوّابات مالية، وتوزيع شهادات." },
      { name: "أفريقيا", desc: "بنية تحتية للأسواق الناشئة، استثمار متوافق مع ESG، وبناء القدرات." },
    ],
  },
  partners: {
    eyebrow: "الشركاء",
    heading: "منظومة من الحكومات والعلم ورأس المال.",
    sub: "مُجمَّعة حسب الدور — من البنية التحتية الحكومية إلى الحوكمة والاستدامة ودخول الأسواق.",
    groups: [
      { name: "الحكومة والبنية التحتية", members: ["NITEC", "KT Cloud Lab", "Ghalam", "SpaceLab"] },
      { name: "التقنية والسحابة", members: ["KazDream", "MyCloud", "AiMap", "Eagale Soft", "InfoTech", "Pixel DMC"] },
      { name: "العلم والتعليم (DeepTech)", members: ["جامعة الملك سعود", "جامعات ومعاهد كازاخستان", "Artisan Education"] },
      { name: "الحوكمة والتدقيق والاستدامة", members: ["PNOD Auditing Co.", "MSTDAM"] },
      { name: "التجارة ودخول الأسواق", members: ["QazTrade", "شركاء MENA", "شركاء جنوب آسيا", "شركاء أفريقيا"] },
    ],
    spotlight: [
      { name: "PNOD Auditing Co.", role: "الحوكمة والتدقيق ومراقبة الذكاء الاصطناعي (14 عامًا من الخبرة؛ ISO/IEC 42001)، مع معرفة عميقة بالبيئة التنظيمية السعودية. شريك مؤسّس لمشروع مسرّعة مِراس." },
      { name: "MSTDAM", role: "منصّة استدامة بيئية — قياس البصمة الكربونية وزراعة الأشجار وتقارير ESG (السعودية). شريك الأجندة الخضراء وESG." },
      { name: "NITEC", role: "تقنيات المعلومات الوطنية — المشغّل الحكومي لخدمات الحكومة الإلكترونية والهوية الرقمية في كازاخستان." },
      { name: "جامعة الملك سعود", role: "شريك أكاديمي رئيسي في السعودية لأبحاث DeepTech والبحث والتطوير المشترك ومختبر الذكاء الاصطناعي والحكومة الرقمية." },
    ],
  },
  certifications: {
    eyebrow: "الشهادات والامتثال",
    heading: "إشارات ثقة مُتحقَّقة.",
    sub: "سطر ثقة دائم لكل جمهور — الجودة والبيئة والبنية التحتية والحوكمة.",
    items: [
      { name: "ISO 9001", meaning: "إدارة الجودة." },
      { name: "ISO 14001", meaning: "الإدارة البيئية — وطنيًا ودوليًا. مرتبطة مباشرة بـ ESG." },
      { name: "ISO 10015", meaning: "إدارة التدريب والتطوير (يدعم بناء القدرات)." },
      { name: "TIA-942", meaning: "معيار البنية التحتية لمراكز البيانات — الممارسة الرائدة في آسيا الوسطى." },
      { name: "Uptime Tier III/IV", meaning: "اعتماد تصميم وإنشاء مراكز البيانات." },
      { name: "UN e-Gov Top-25", meaning: "الحكومة الإلكترونية الكازاخية — من بين الأفضل عالميًا." },
    ],
  },
  contact: {
    eyebrow: "تواصل معنا",
    heading: "ابدأ المحادثة التي تناسبك.",
    sub: "مسارات منفصلة للمستثمرين، والشركات والحكومات، والمؤسسين والبحث والتطوير.",
    audiences: [
      { title: "المستثمرون", text: "الأطروحة الاستثمارية وملخص ESG ومسرّعة مِراس.", cta: "تواصل بشأن الاستثمار", href: "/investors" },
      { title: "الشركات والحكومات", text: "تدقيق تقني، ومشاريع تجريبية، وخدمات الذكاء الاصطناعي.", cta: "اطلب تدقيقًا", href: "/enterprise" },
      { title: "المؤسسون والبحث والتطوير", text: "تقييم الملكية الفكرية والوصول إلى الاستثمار.", cta: "احصل على تقييم", href: "/founders" },
    ],
    email: "info@nsart.kz",
    emailLabel: "راسلنا",
  },
  footer: {
    tagline: "مشاريع التقنيات العميقة من آسيا الوسطى إلى العالم.",
    company: "الشركة",
    audiences: "الجمهور",
    contactTitle: "تواصل",
    rights: "NSART · Technology Interaction. جميع الحقوق محفوظة.",
  },
  investorsPage: {
    badge: "للمستثمرين المؤسسيين وذوي الأثر",
    title: "استثمر في بنية تحتية مستقلة للتقنيات العميقة متوافقة مع أهداف التنمية المستدامة.",
    intro:
      "نجعل الاستثمار في مراكز البيانات الخضراء والحوسبة بالذكاء الاصطناعي والحكومة الرقمية في الأسواق الجديدة أكثر أمانًا — بمعايير بيئية قوية وذكاء اصطناعي مسؤول واعتماد دولي. ومسرّعة مِراس هي وسيلتنا لجمع رأس المال.",
    ctas: ["اطّلع على أطروحتنا الاستثمارية", "تعرّف على مسرّعة مِراس", "اطلب ملخّص ESG عبر البريد"],
    audienceNote: "للبنك الإسلامي للتنمية، EBRD، ADB، البنك الدولي، صناديق الأمم المتحدة، والمستثمرين ذوي الأثر.",
    sdg: {
      heading: "بما يتوافق مع أهداف التنمية المستدامة للأمم المتحدة",
      sub: "NSART ومسرّعة مِراس على تقاطع مهمّات معترف بها — مُربط بأهداف التنمية المستدامة دون الإفصاح عن المعايير المالية.",
      items: [
        { goal: "SDG 4 و9", desc: "التعليم والتقنية والصناعة والابتكار — تدريب المهندسين ونقل التقنية." },
        { goal: "SDG 7 و13", desc: "الطاقة النظيفة والمناخ — مركز بيانات أخضر، توليد شمسي، بصمة كربونية أقل." },
        { goal: "SDG 8", desc: "العمل اللائق والنمو الاقتصادي — دعم الشركات الصغيرة وخلق فرص العمل." },
        { goal: "SDG 11", desc: "مدن مستدامة — بنية تحتية ذكية وحكومة رقمية." },
        { goal: "SDG 17", desc: "الشراكات — اتفاقيات متعدّدة الأطراف مع مؤسسات التنمية والحكومات." },
      ],
    },
    esg: {
      heading: "ESG والتمويل الأخضر",
      sub: "اللغة المباشرة لبنوك التنمية.",
      points: [
        { title: "AI & Green cloud، PUE ~1,2", text: "تبريد رئيسي بالغاز المسال مع توليد شمسي مدمج." },
        { title: "جاهزية السندات الخضراء", text: "مهيّكل للسندات الخضراء ومهمّات بنوك التنمية." },
        { title: "ذكاء اصطناعي أخلاقي وخصوصية", text: "الشفافية وعدم الانحياز والإشراف البشري؛ معالجة بيانات على نمط GDPR." },
        { title: "حزم مفتوحة مستقلة", text: "قابلة للتدقيق، دون قفل المورد." },
      ],
    },
    metricsHeading: "الأرقام",
    cta: { heading: "اطلب مواد المستثمرين", text: "صفحة واحدة ومستند تقديمي بالبريد. لا تُنشر معايير سرية على الإنترنت.", button: "تواصل مع فريق الاستثمار" },
  },
  enterprisePage: {
    badge: "للقطاعين العام والخاص",
    title: "تقنية تلبّي معاييرك — الوطنية والدولية.",
    intro:
      "من مراكز البيانات المستقلة والحوسبة بالذكاء الاصطناعي إلى منصّات الحكومة الرقمية، نُصمّم ونبني ونعتمد التقنية للقطاعين العام والخاص — ونستكشف الابتكارات الناشئة ونقيّمها وندمجها في عملياتكم.",
    ctas: ["اطلب تدقيقًا تقنيًا", "ابدأ مشروعًا تجريبيًا", "استكشف خدمات الذكاء الاصطناعي"],
    services: {
      heading: "كتالوج الخدمات",
      items: [
        { title: "أنظمة الذكاء الاصطناعي", text: "وكلاء متخصّصون، تعلّم آلي، وأنظمة قرار على حوسبة مستقلة." },
        { title: "البنية التحتية الذكية", text: "حوسبة عالية الكثافة وموفّرة للطاقة وشبكية." },
        { title: "الحكومة الرقمية", text: "الهوية الرقمية وتبادل البيانات والخدمات الإلكترونية." },
        { title: "اعتماد مراكز البيانات", text: "TIA-942 وUptime Tier III/IV — دورة كاملة." },
        { title: "الابتكار المؤسسي", text: "استكشاف التقنيات ودمجها في عملياتكم." },
        { title: "SpaceTech / NajmSat", text: "كفاءة فضائية متميّزة — أنظمة قمرية وأرضية." },
      ],
    },
    standards: {
      heading: "المعايير والامتثال",
      items: ["ISO 9001", "ISO 14001", "ISO 10015", "TIA-942", "Uptime Tier III/IV", "التنظيم التقني لكازاخستان", "معالجة البيانات بنمط GDPR"],
    },
    scouting: {
      heading: "استكشاف التقنية في ثلاث خطوات",
      steps: [
        { n: "01", title: "الاستكشاف", text: "تحديد التقنيات الناشئة ذات الصلة بعملياتكم." },
        { n: "02", title: "التقييم (CIVTI)", text: "تقييم الملاءمة والجاهزية والأثر بمنهجيتنا." },
        { n: "03", title: "الدمج", text: "تضمين الابتكارات المعتمدة في عملياتكم وأنظمتكم." },
      ],
    },
    pilot: {
      heading: "مشروع تجريبي منخفض العتبة",
      text: "إثبات مفهوم في 6–8 أسابيع مع نطاق عمل واضح — تحقّق قبل الالتزام.",
      button: "ابدأ مشروعًا تجريبيًا",
    },
  },
  foundersPage: {
    badge: "للمؤسسين والجامعات ومراكز البحث والتطوير",
    title: "من البحث إلى الإيراد — احمِ أصولك غير الملموسة وقيّمها ونمِّها.",
    intro:
      "للشركات الناشئة والشركات القائمة والجامعات ومراكز البحث والتطوير: نُدير دورة حياة الملكية الفكرية كاملةً — التقييم والحماية وتقدير القيمة — ونفتح الطريق إلى الاستثمار وتطوير الأعمال عبر مسرّعة مِراس.",
    ctas: ["احصل على تقييم للملكية الفكرية", "قدّم إلى مسرّعة مِراس", "تحدّث إلى فريقنا"],
    lifecycle: {
      heading: "دورة حياة الملكية الفكرية",
      sub: "أربع خطوات وما تفعله NSART في كل منها.",
      steps: [
        { n: "1", title: "التقييم", text: "تدقيق الأصول وتسجيل الجاهزية — TRL / CRL / MRL — وتحديد الأهداف القابلة للحماية." },
        { n: "2", title: "الحماية", text: "البراءات والعلامات التجارية والمعرفة، تسجيل البرمجيات، استراتيجية متعدّدة الولايات." },
        { n: "3", title: "القيمة", text: "تقييم الأصول غير الملموسة بطرق DCF والمقارنات السوقية." },
        { n: "4", title: "التسويق", text: "الترخيص وهيكلة الصفقات والطريق إلى الاستثمار عبر مسرّعة مِراس." },
      ],
    },
    assets: {
      heading: "أنواع الأصول",
      items: ["البرمجيات", "الخدمات الرقمية", "المجمّعات الزراعية الصناعية", "نتائج البحث والتطوير", "تقنيات الفضاء"],
    },
    university: {
      heading: "مسار مخصّص للجامعات ومراكز البحث والتطوير",
      text: "DeepTech origin — نقل التقنية والشركات المنبثقة من العلم وحماية نتائج الأبحاث وتسويقها.",
      anchors: "شركاء رئيسيون: جامعة الملك سعود (السعودية) ومعاهد وجامعات بحثية كازاخستانية.",
    },
    form: {
      heading: "نموذج طلب بسيط",
      sub: "أخبرنا بصناعتك ومرحلتك واحتياجك — سنوجّهك إلى المسار المناسب.",
      industry: "الصناعة",
      stage: "المرحلة",
      need: "ما تحتاجه",
      name: "الاسم",
      email: "البريد",
      submit: "إرسال الطلب",
      success: "شكرًا — سنتواصل معك قريبًا.",
      stages: ["فكرة", "نموذج أوّلي / TRL 4–6", "تجريب / TRL 7–8", "إيرادات / توسّع"],
    },
  },
  mirasPage: {
    badge: "مشروع مشترك · NSART × PNOD",
    title: "مسرّعة مِراس — بنية تحتية لتحويل التقنيات العميقة إلى أعمال.",
    intro:
      "مسرّعة مِراس، وهي مشروع مشترك بين NSART وPNOD، تساعد التقنيات الناضجة على تجاوز فجوة الجاهزية — بالجمع بين هندسة التقنيات العميقة والحوكمة والامتثال، ودعم دورة حياة الملكية الفكرية كاملةً، ومسار نحو الاستثمار، بما يتوافق مع رؤية 2030 ومنظمة التعاون الإسلامي وأهداف التنمية المستدامة.",
    ctas: ["تعرّف على مِراس", "قدّم إلى أحد المسارات", "كن شريكًا لنا"],
    problem: {
      heading: "الفجوة التي تُغلقها مِراس",
      text: "قد تكون التقنية ناضجة علميًا، لكن المؤسسة قد تفتقر إلى البنية التجارية والتنظيمية والتصنيعية للنشر. تُغلق مِراس هذه الفجوة عبر نموذج جاهزية ثلاثي الأبعاد.",
      dims: [
        { code: "TRL", title: "الجاهزية التقنية", q: "هل التقنية مُثبتة على النطاق المطلوب؟" },
        { code: "CRL", title: "الجاهزية التجارية", q: "هل هناك مسار للإيرادات والتسعير ونموذج العقد؟" },
        { code: "MRL", title: "جاهزية التصنيع", q: "هل يمكن إنتاج المنتج واعتماده وتسليمه؟" },
      ],
    },
    tracks: {
      heading: "ثلاثة مسارات",
      items: [
        { n: "المسار 1", title: "Deep-Tech Cohort", text: "تسريع الفِرَق من التشخيص إلى الاستعداد للاستثمار ويوم العرض." },
        { n: "المسار 2", title: "Regulatory Sandbox", text: "اختبار الحلول في بيئة منظّمة — CleanTech، GovTech، الذكاء الاصطناعي الوكيلي، سوق البيانات — على بنية GPU مستقلة." },
        { n: "المسار 3", title: "IP Portfolio & Founders", text: "دورة حياة كاملة للملكية الفكرية وتطوير المؤسسين — من التشخيص إلى الترخيص ومعرض الملكية الفكرية." },
      ],
    },
    positioning: {
      heading: "الموقع الاستراتيجي",
      text: "مِراس مبنيّة على تقاطع مهمّات معترف بها — رؤية 2030، أجندة منظمة التعاون الإسلامي، منظمة التعاون الرقمي، وأهداف التنمية المستدامة للأمم المتحدة. لغة تفهمها مؤسسات التنمية ويمكن استخدامها دون الإفصاح عن المعايير التجارية.",
    },
    confidential: "السرية: يُحتفظ بهذا القسم على المستوى العام. الميزانيات والأحجام المستهدفة للصناديق وأسماء القادة والمستشارين والمستثمرين المحدّدين وتفاصيل الاتصالات الحكومية بيانات داخلية.",
  },
  aboutPage: {
    badge: "عن الشركة",
    title: "نحوّل أفكار التقنيات العميقة إلى أعمال حقيقية.",
    intro:
      "NSART هي استوديو مشاريع متخصّص في مشاريع التقنية العميقة — تحديد فرص الاستثمار وبناء الشراكات الاستراتيجية وهيكلة المشاريع ودخول أسواق جديدة في آسيا الوسطى وMENA وجنوب آسيا وأفريقيا.",
    missionHeading: "مهمّتنا",
    missionText: "الجسر بين العلم والتجارة — نأخذ أبحاثًا ناضجة، نهيكلها كشركات بدرجة مشروع ونصلها برأس المال الدولي والمهمّات المؤسسية.",
    valuesHeading: "ما نؤمن به",
    values: [
      { title: "الاستقلالية بالتصميم", text: "أنظمة مفتوحة دون قفل المورد، قابلة للتدقيق من المنظّمين والمستثمرين." },
      { title: "الأدلّة قبل البلاغة", text: "كل ادّعاء مدعوم بشهادة أو رقم أو مشروع فعلي." },
      { title: "بما يتوافق مع المهمّات العالمية", text: "متوافق مع أهداف التنمية المستدامة وجاهز لـESG ومُهيّكل لرأس مال بنوك التنمية." },
      { title: "متعدّد اللغات افتراضيًا", text: "EN · AR · RU · KK — مبني للأسواق التي نخدمها." },
    ],
  },
  technologiesPage: {
    badge: "حزمة التقنية",
    title: "تقنية عميقة — مُهندَسة ومُعتمَدة.",
    intro: "من مراكز البيانات المستقلة وحوسبة الذكاء الاصطناعي إلى الحكومة الرقمية والبنية التحتية الذكية — وفق المعايير الدولية وقابلة للتدقيق من النهاية إلى النهاية.",
    pillars: [
      { title: "الذكاء الاصطناعي", text: "مصنع وكلاء الذكاء الاصطناعي، وكلاء حكوميون متخصّصون، تعلّم آلي على بحيرات بيانات لحظية، وتدريب نماذج كبيرة على بنية GPU مستقلة (NVIDIA H200).", items: ["Agent Factory", "Domain LLMs", "Real-time ML", "Sovereign GPU"] },
      { title: "البنية التحتية الذكية", text: "حوسبة عالية الكثافة، شبكات AIoT وM2M، منصّات التوائم الرقمية والاتصال للبيئات الحضرية والصناعية.", items: ["AIoT & M2M", "Digital Twins", "Smart Field", "تصميم موفّر للطاقة"] },
      { title: "الحكومة الرقمية", text: "أكثر من 20 عامًا من خبرة الحكومة الإلكترونية كموديولات: الهوية الرقمية وتبادل البيانات والخدمات الإلكترونية والأمن السيبراني.", items: ["e-Gov", "Digital ID", "Data exchange", "Cyber Security"] },
      { title: "مراكز البيانات", text: "AI & Green cloud — تصميم Tier III/IV، PUE ~1,2، تبريد بالغاز المسال، والممارسة الرائدة في TIA-942 / Uptime في آسيا الوسطى.", items: ["TIA-942", "Uptime Tier III/IV", "PUE ~1,2", "تبريد بالغاز المسال"] },
    ],
  },
  ipPage: {
    badge: "الملكية الفكرية والأصول غير الملموسة",
    title: "احمِ أصولك غير الملموسة وقيّمها وحقّق منها إيرادًا.",
    intro: "دعم دورة حياة كاملة للملكية الفكرية — البرمجيات والخدمات الرقمية ونتائج البحث والتطوير والمجمّعات الزراعية الصناعية وتقنيات الفضاء.",
    lifecycleHeading: "دورة حياة الملكية الفكرية",
    steps: [
      { n: "1", title: "التقييم", text: "تدقيق الأصول وتسجيل الجاهزية (TRL / CRL / MRL)؛ تحديد الأهداف القابلة للحماية." },
      { n: "2", title: "الحماية", text: "البراءات والعلامات التجارية والمعرفة، تسجيل البرمجيات، استراتيجية متعدّدة الولايات." },
      { n: "3", title: "القيمة", text: "التقييم بطرق DCF والمقارنات السوقية — للصفقات وجمع التمويل والشراكات." },
      { n: "4", title: "التسويق", text: "الترخيص وهيكلة الصفقات والطريق إلى الاستثمار عبر مسرّعة مِراس." },
    ],
    assetsHeading: "أنواع الأصول التي نعمل معها",
    assets: ["البرمجيات", "الخدمات الرقمية", "نتائج البحث والتطوير", "المجمّعات الزراعية الصناعية", "تقنيات الفضاء"],
    ctaHeading: "خذ أصولك إلى المرحلة التالية.",
    ctaText: "ابدأ بتقييم للملكية الفكرية — سنرسم محفظتك ونوصي بمسار الحماية والتسويق الملائم.",
    ctaButton: "احصل على تقييم للملكية الفكرية",
  },
  marketsPage: {
    badge: "أين نعمل",
    title: "أربع مناطق. جسر واحد.",
    intro: "NSART تعمل على تقاطع طلب الأسواق الناشئة ورأس المال المؤسسي — آسيا الوسطى مقرًا، السعودية وMENA ممر نمو، جنوب آسيا وأفريقيا جبهات توسّع.",
    regionsHeading: "المناطق",
    regions: [
      { name: "آسيا الوسطى", kicker: "المقر الرئيسي", desc: "كازاخستان: HPC مستقل ومرجع GovTech ومراكز بيانات خضراء. أكثر من 20 عامًا من خبرة الحكومة الإلكترونية وتصنيف Top-25 لدى الأمم المتحدة." },
      { name: "MENA", kicker: "ممر النمو", desc: "السعودية: مختبرات GovTech بما يتوافق مع رؤية 2030 وشراكات الحوكمة مع PNOD ومسرّعة مِراس." },
      { name: "جنوب آسيا", kicker: "التوسّع", desc: "باكستان: تصدير GovTech مع NITEC + InfoTech، بوّابات مالية عبر Pixel DMC، توزيع شهادات." },
      { name: "أفريقيا", kicker: "الجبهة", desc: "بنية تحتية للأسواق الناشئة، استثمار متوافق مع ESG، بناء قدرات، وموديولات حلول قابلة للتوسيع." },
    ],
    gatewayHeading: "NSART Gateway",
    gatewayText: "منتج مخصّص لدخول أسواق آسيا الوسطى وجنوب آسيا وMENA وأفريقيا — مع حضور محلي وملاحة تنظيمية ومنظومات شريكة.",
  },
  partnersPage: {
    badge: "المنظومة",
    title: "منظومة من الحكومات والعلم ورأس المال.",
    intro: "نعمل عبر خمس مجموعات شركاء — الدولة والبنية التحتية، التقنية والسحابة، العلم والتعليم، الحوكمة والاستدامة، التجارة ودخول الأسواق.",
    spotlightHeading: "شركاء بارزون",
    logoHeading: "شركاء مختارون",
  },
  contactPage: {
    badge: "تواصل معنا",
    title: "ابدأ المحادثة التي تناسبك.",
    intro: "مسارات منفصلة للمستثمرين والشركات والحكومات والمؤسسين والبحث والتطوير. نردّ خلال يومَي عمل.",
    formHeading: "أرسل لنا رسالة",
    formName: "الاسم",
    formEmail: "البريد",
    formOrg: "المنظّمة",
    formAudience: "أنا…",
    formMessage: "الرسالة",
    formSubmit: "إرسال",
    formSuccess: "شكرًا — سنعود إليك قريبًا.",
    audienceOptions: ["مستثمر", "شركة / حكومة", "مؤسّس / بحث وتطوير", "شريك", "أخرى"],
    directHeading: "أو تواصل مباشرة",
    location: "أستانا، كازاخستان",
    privacy: "بالإرسال أنت توافق على أن نتواصل معك. لا نُشارك البيانات مع جهات خارجية.",
  },
};

/* ------------------------------------------------------------------ */
/*  Kazakh — marketing-critical copy (brief); EN fallback elsewhere   */
/* ------------------------------------------------------------------ */

const kk: DeepPartial<Dictionary> = {
  meta: {
    title: "NSART · Technology Interaction",
    description:
      "Орталық Азиядан әлемге — терең технологиялық компаниялар. Қазақстан, Сауд Арабиясы және Африкадағы R&D, зияткерлік меншік және инвестициялық инфрақұрылым.",
  },
  nav: {
    home: "Басты бет",
    about: "Компания туралы",
    technologies: "Технологиялар",
    ip: "ЗМ және активтер",
    miras: "Miras Accelerator",
    investors: "Инвесторларға",
    enterprise: "Бизнес пен мемлекетке",
    founders: "Құрылтайшылар мен R&D",
    markets: "Нарықтар",
    partners: "Серіктестер",
    contact: "Байланыс",
  },
  trustBar:
    "ISO 9001 · ISO 14001 · ISO 10015 · TIA-942 · Uptime Tier III/IV · UN e-Gov Top-25 · ТДМ-ге сай",
  navGroups: { company: "Компания", audiences: "Аудиториялар" },
  common: {
    getInTouch: "Байланысу",
    learnMore: "Толығырақ",
    explore: "Қарау",
    backHome: "Басты бетке",
    status: "Мәртебесі",
    location: "Орналасуы",
    inDevelopment: "Әзірленуде",
    allLanguages: "EN · AR · RU · KK",
  },
  hero: {
    eyebrow: "NSART · Technology Interaction",
    title: "Орталық Азиядан әлемге — терең технологиялық компаниялар.",
    subtitle:
      "Қазақстанда, Сауд Арабиясында және Африкада R&D жүргіземіз, зияткерлік меншікті дамытамыз және инвестициялық инфрақұрылым саламыз.",
    ctaPrimary: "Жолыңызды таңдаңыз",
    ctaSecondary: "Miras акселераторы",
    stats: [
      { value: "10–100 МВт", label: "AI & Green cloud" },
      { value: "PUE ~1,2", label: "Энергия тиімділігі — әлемдегі үздіктердің бірі" },
      { value: "Top-25", label: "Қазақстан БҰҰ-ның e-Gov рейтингінде" },
      { value: "4 өңір", label: "Орталық Азия · MENA · Оңтүстік Азия · Африка" },
    ],
  },
  technologies: {
    eyebrow: "Технологиялар",
    heading: "Терең технологияларды жобалаймыз, құрамыз және сертификаттаймыз.",
    sub: "Тәуелсіз деректер орталықтарынан және ЖИ-есептеулерден GovTech платформаларына дейін — халықаралық стандарттар бойынша, аудитке жарамды.",
    items: [
      { title: "Жасанды интеллект", text: "AI Agent Factory, мемлекеттік салаға арналған агенттер, real-time деректер көлдеріндегі ML және өзіміздің GPU-инфрақұрылымда ірі модельдерді оқыту." },
      { title: "Ақылды инфрақұрылым", text: "Жоғары тығыздықты жасыл есептеулер — NVIDIA H200 кластерлері, ашық стектер, энергия тиімді дизайн." },
      { title: "GovTech", text: "Электрондық үкіметтегі 20 жылдан астам тәжірибе дайын модульдер ретінде — цифрлық ID, деректер алмасу, қағазсыз қызметтер." },
      { title: "Деректер орталықтары", text: "AI & Green cloud — Tier III/IV жобасы, PUE ~1,2, СПГ негізіндегі суыту және Орталық Азиядағы TIA-942 / Uptime көшбасшы тәжірибесі." },
    ],
  },
  verticals: {
    eyebrow: "Бағыттар",
    heading: "Қайда жұмыс істейміз.",
    sub: "NSART терең технологияларды құратын, сертификаттайтын және масштабтайтын төрт бағыт.",
    items: [
      { n: "01", title: "Телеком және ғарыш технологиялары", text: "Телекоммуникациялар, желілік аналитика, ғарыштық технологиялар, деректер орталықтары.", tags: ["Желілік аналитика", "Space Tech", "Деректер орталықтары"] },
      { n: "02", title: "GovTech", text: "Мемлекеттік цифрлық шешімдер — e-Gov және ашық, қауіпсіз қоғамдық сектор үшін киберқауіпсіздік.", tags: ["e-Gov", "Киберқауіпсіздік"] },
      { n: "03", title: "Цифрлық платформалар", text: "Білім, финтех, автокөлік, азық-түлік және ауыл шаруашылығына арналған цифрлық платформалар.", tags: ["EdTech", "FinTech", "CarTech", "FoodTech", "AgroTech"] },
      { n: "04", title: "Ақылды инфрақұрылым", text: "Ақылды қала шешімдері — цифрлық егіздер, smart-алқаптар, AIoT және M2M-инфрақұрылым.", tags: ["Цифрлық егіздер", "Smart Field", "AIoT және M2M"] },
    ],
  },
  methodology: {
    eyebrow: "Әдіснама",
    heading: "Идеяларды нақты компанияларға айналдыратын дәлелденген фреймворктер.",
    sub: "NSART әр жобада қолданатын төрт фреймворк — стратегиядан орындауға дейін.",
    items: [
      { n: "01", title: "Vision 3P", sub: "Стратегиялық көзқарас", text: "Конвой заңы бойынша — People, Process, Product.", tags: ["People", "Process", "Product"] },
      { n: "02", title: "Venture Development", sub: "Толық даму циклі", text: "Идеядан масштабтауға дейін — толық цикл.", tags: ["Value Creation", "Value Protection", "Structuring", "Operations"] },
      { n: "03", title: "GIST Planning", sub: "Икемді стратегиялық жоспарлау", text: "Ұзақ мерзімді мақсаттардан анық қадамдар мен орындауға дейін.", tags: ["Goals", "Ideas", "Steps", "Tasks"] },
      { n: "04", title: "CIVTI Assessment", sub: "Жобаларды бағалау жүйесі", text: "Құны, техникалық күрделілігі және инвестициясы бойынша идеяларды кешенді талдау.", tags: ["Current Ideas", "Value", "Complexity", "Investment"] },
    ],
  },
  experience: {
    eyebrow: "Тәжірибе",
    heading: "Технологиялық бизнестер құрудың екі онжылдығы.",
    items: [
      { period: "2007–2010", title: "Стратегиялық консалтинг және нарық зерттеулері" },
      { period: "2010–2015", title: "ПҚ әзірлеу және GovTech жобалары" },
      { period: "2015–2023", title: "Бизнес-шешімдер «кілт астына» және өнімдер жасау" },
      { period: "2023–қазіргі уақыт", title: "Толық циклді венчурлік студия — идеядан кіріске дейін" },
    ],
  },
  products: {
    eyebrow: "Өнімдер",
    heading: "Біз нені жеткіземіз.",
    items: [
      { title: "NSART Gateway", text: "Орталық Азия, Оңтүстік Азия, MENA және Африка нарықтарына шығу." },
      { title: "NSART Corporate Innovations", text: "R&D, пилоттық енгізулер және корпоративтік клиенттер үшін ашық инновация бағдарламалары." },
    ],
  },
  audience: {
    eyebrow: "Үш кіру нүктесі",
    heading: "Технологияны бағалау тәсіліңізге сай жасалған.",
    sub: "Инвесторларға, клиенттерге және құрылтайшыларға керегі әртүрлі. Өзіңізге сай жолды таңдаңыз.",
    cards: [
      {
        key: "investors",
        tag: "Инвесторларға",
        title: "ТДМ-ге сай тәуелсіз терең технологиялар",
        text: "ТДМ-ге сай терең технологиялар портфелі, Miras акселераторы, ESG және этикалық ЖИ қағидалары.",
        href: "/investors",
        cta: "Инвестициялық стратегия",
      },
      {
        key: "enterprise",
        tag: "Бизнес пен мемлекетке",
        title: "Стандарттарыңызға сай технологиялар",
        text: "ЖИ, GovTech, ақылды инфрақұрылым және халықаралық стандарттармен сертификатталған тәуелсіз деректер орталықтары.",
        href: "/enterprise",
        cta: "Қызметтерді қарау",
      },
      {
        key: "founders",
        tag: "Құрылтайшылар мен R&D",
        title: "Зерттеуден кіріске дейін",
        text: "Зияткерлік меншікті қорғау, бағалау және инвестицияға жол ашу — құрылтайшылар, университеттер мен R&D орталықтарына.",
        href: "/founders",
        cta: "ЗМ бағалауы",
      },
    ],
  },
  mirasTeaser: {
    eyebrow: "Miras Accelerator",
    heading: "Терең технологияларды бизнеске айналдыратын инфрақұрылым.",
    text: "Miras — NSART пен PNOD-тың бірлескен кәсіпорны. Ол жетілген технологияларды нарыққа шығаруға көмектеседі: инженерияны басқару мен талаптарға сай етуді, ЗМ қолдауын және инвестицияға жол ашуды бір орынға жинайды.",
    aligned: "Vision 2030, ОИС, Digital Cooperation Organization және БҰҰ ТДМ-ге сай.",
    cta: "Miras туралы",
  },
  cases: {
    eyebrow: "Уәде емес — дәлел",
    heading: "Таңдаулы жобалар, 2024–2025.",
    sub: "Қазақстандағы, Сауд Арабиясындағы және одан тыс жерлердегі нақты жобалар — біздің ең күшті дәлеліміз.",
    items: [
      {
        tag: "Жасыл есептеулер",
        title: "AI & Green cloud",
        location: "Құрық АЭА, Маңғыстау · Tier III/IV жобасы",
        status: "Әзірленуде",
        text: "Жасыл энерго-цифрлық кластер. Көршілес СПГ терминалының суығын негізгі суыту ретінде пайдаланады — суытуға қосымша шығын жоқтың қасы. Қуатын газ-турбиналы станциядан алады, оған күн станциясы қосылған; жасыл облигациялар бойынша құрылымдалған.",
        metrics: [
          { v: "10–100 МВт", l: "Жоспарлы IT-қуат" },
          { v: "PUE ~1,2", l: "Мақсатты тиімділік" },
          { v: "500 стойка", l: "Бастапқы сыйымдылық, оның ішінде AI/HPC" },
          { v: "Tier III/IV", l: "Uptime + TIA-942 сертификаттау жолы" },
        ],
      },
      {
        tag: "HPC және ЖИ",
        title: "Тәуелсіз экзафлопстық есептеулер",
        location: "Қазақстан · ашық стек",
        status: "Жұмыс істеп тұр",
        text: "NVIDIA H200 SXM (HBM3e, 141 ГБ, 4,8 ТБ/с) NVLink 4.0 — оқыту мен инференске. Ашық стек — Slurm + OpenMPI, ROCm/CUDA OSS, OpenStack, Lustre/GPFS — тәуелсіз, аудитке жарамды, бір вендорға байлау жоқ.",
        metrics: [
          { v: "H200 SXM", l: "GPU басына 141 ГБ HBM3e" },
          { v: "4,8 ТБ/с", l: "Жад өткізу қабілеті" },
          { v: "Экзафлопс", l: "Ашық HPC стегі" },
          { v: "KK-LLM", l: "Қазақ тілінің модельдерін оқыту" },
        ],
      },
      {
        tag: "GovTech",
        title: "Saudi AI & GovTech Lab",
        location: "БК: NSART · NITEC · PNOD · King Saud University",
        status: "Әзірленуде",
        text: "Vision 2030-ға сай: мемлекеттік салаға арналған, қайта пайдаланылатын ЖИ агенттерінің AI Agent Factory; 400-ден астам ұлттық деректер базасы негізіндегі Smart Data Ukimet; белсенді Digital Family Card; мемлекеттік қызметкерлерге арналған ЖИ мен деректер бойынша оқыту бағдарламасы.",
        metrics: [
          { v: "400+", l: "Бірлестірілген ұлттық дерекқорлар" },
          { v: "Top-25", l: "БҰҰ e-Gov рейтингі (KZ)" },
          { v: "Vision 2030", l: "Стратегиялық сәйкестік" },
          { v: "4 модуль", l: "Министрліктер арасында қайта пайдаланылады" },
        ],
      },
      {
        tag: "Серіктестіктер",
        title: "Жаһандық GovTech экспорты",
        location: "NITEC + InfoTech (Пәкістан) · 3 өңір",
        status: "Белсенді",
        text: "Деректер алмасу, цифрлық ID және қағазсыз мемлекеттік қызметтер үш өңірге Scalable Solution Modules арқылы экспортталады — Дүниежүзілік банк пен ADB тендерлеріне бірге қатысуды қоса.",
        metrics: [
          { v: "3 өңір", l: "Экспорт географиясы" },
          { v: "ДБ · ADB", l: "Бірлескен тендерлер" },
          { v: "SSM", l: "Scalable Solution Modules" },
          { v: "Астана", l: "Қосымша бұлт алаңы" },
        ],
      },
    ],
  },
  markets: {
    eyebrow: "Нарықтар",
    heading: "Төрт өңірде жұмыс істейміз.",
    sub: "Орталық Азия мен әлем арасындағы көпір — дамушы нарық сұранысы ірі капиталмен кездесетін жер.",
    items: [
      { name: "Орталық Азия", desc: "Қазақстандағы база — тәуелсіз HPC, GovTech және жасыл деректер орталықтары." },
      { name: "MENA", desc: "Сауд Арабиясы — GovTech лабораториялары, Vision 2030-ға сай, басқару және сәйкестік бойынша серіктестіктер." },
      { name: "Оңтүстік Азия", desc: "Пәкістан — GovTech экспорты, төлем шлюздары және сертификаттарды тарату." },
      { name: "Африка", desc: "Дамушы нарықтардың инфрақұрылымы, ESG-инвестициялар және мамандар дайындау." },
    ],
  },
  partners: {
    eyebrow: "Серіктестер",
    heading: "Мемлекеттер, ғылым және капитал экожүйесі.",
    sub: "Рөлдер бойынша топтастырылған — мемлекеттік инфрақұрылымнан басқару мен сәйкестікке, тұрақты дамуға және нарықтарға шығуға дейін.",
    groups: [
      { name: "Мемлекет және инфрақұрылым", members: ["NITEC", "KT Cloud Lab", "Ghalam", "SpaceLab"] },
      { name: "Технологиялар және бұлт", members: ["KazDream", "MyCloud", "AiMap", "Eagale Soft", "InfoTech", "Pixel DMC"] },
      { name: "Ғылым және білім (DeepTech)", members: ["King Saud University", "Қазақстан жоғары оқу орындары", "Artisan Education"] },
      { name: "Басқару, аудит және тұрақты даму", members: ["PNOD Auditing Co.", "MSTDAM"] },
      { name: "Сауда және нарықтарға шығу", members: ["QazTrade", "MENA серіктестері", "Оңтүстік Азия серіктестері", "Африка серіктестері"] },
    ],
    spotlight: [
      { name: "PNOD Auditing Co.", role: "Басқару, аудит және ЖИ-ні басқару (14 жыл тәжірибе; ISO/IEC 42001), Сауд Арабиясының реттеу ортасын жақсы біледі. Miras Accelerator бірлескен кәсіпорнының тең құрылтайшысы." },
      { name: "MSTDAM", role: "Экологиялық тұрақтылық платформасы — көміртегі ізін өлшеу, ағаш отырғызу, ESG есептілігі (Сауд Арабиясы). «Жасыл» күн тәртібі мен ESG бойынша серіктес." },
      { name: "NITEC", role: "Ұлттық ақпараттық технологиялар — Қазақстанның электрондық үкімет сервистері мен цифрлық ID инфрақұрылымының мемлекеттік операторы." },
      { name: "King Saud University", role: "Сауд Арабиясындағы терең технологиялар бойынша зерттеулер, бірлескен R&D және Saudi AI & GovTech Lab бойынша негізгі академиялық серіктес." },
    ],
  },
  certifications: {
    eyebrow: "Сертификаттар мен сәйкестік",
    heading: "Сенім сигналдары — расталған.",
    sub: "Барлық аудиториялар үшін тұрақты сенім жолағы — сапа, экология, инфрақұрылым және басқару.",
    items: [
      { name: "ISO 9001", meaning: "Сапа менеджменті." },
      { name: "ISO 14001", meaning: "Экологиялық менеджмент — ұлттық + халықаралық. ESG-мен тікелей байланысты." },
      { name: "ISO 10015", meaning: "Оқыту мен дамыту менеджменті (Capacity Building қолдайды)." },
      { name: "TIA-942", meaning: "Деректер орталығы инфрақұрылымының стандарты — Орталық Азиядағы көшбасшы тәжірибе." },
      { name: "Uptime Tier III/IV", meaning: "Деректер орталығының жобасы мен салынған нысанының сертификациясы." },
      { name: "UN e-Gov Top-25", meaning: "Қазақстанның электрондық үкіметі — әлемдегі үздіктер қатарында." },
    ],
  },
  contact: {
    eyebrow: "Байланыс",
    heading: "Өзіңізге сай әңгімені бастаңыз.",
    sub: "Инвесторлар, бизнес пен мемлекет, құрылтайшылар мен R&D үшін бөлек жолдар.",
    audiences: [
      { title: "Инвесторлар", text: "Инвестициялық стратегия, ESG-бриф және Miras акселераторы.", cta: "Инвестиция бойынша байланыс", href: "/investors" },
      { title: "Бизнес пен мемлекет", text: "Технологиялық аудит, пилоттар және ЖИ қызметтері.", cta: "Аудит сұрау", href: "/enterprise" },
      { title: "Құрылтайшылар мен R&D", text: "ЗМ бағалауы және инвестицияға қолжетімділік.", cta: "ЗМ бағалауын алу", href: "/founders" },
    ],
    email: "info@nsart.kz",
    emailLabel: "Бізге жазыңыз",
  },
  footer: {
    tagline: "Орталық Азиядан әлемге — терең технологиялық компаниялар.",
    company: "Компания",
    audiences: "Аудиториялар",
    contactTitle: "Байланыс",
    rights: "NSART · Technology Interaction. Барлық құқықтар қорғалған.",
  },
  investorsPage: {
    badge: "Институционалдық және импакт-инвесторларға",
    title: "ТДМ-ге сай тәуелсіз терең технологиялық инфрақұрылымға инвестиция салыңыз.",
    intro:
      "Біз дамушы нарықтардағы жасыл деректер орталықтарына, ЖИ есептеулеріне және GovTech-ке инвестицияларды құрылымдаймыз және тәуекелін азайтамыз — ESG, этикалық ЖИ және халықаралық сертификаттарға сай. Miras акселераторы — капитал тарту үшін арнайы құралымыз.",
    ctas: ["Инвестициялық стратегия", "Miras акселераторы", "ESG-брифті поштамен сұрау"],
    audienceNote: "IsDB, EBRD, ADB, Дүниежүзілік банк, БҰҰ қорлары және жеке импакт-инвесторларға арналған.",
    sdg: {
      heading: "БҰҰ-ның Тұрақты даму мақсаттарына сай",
      sub: "NSART және Miras акселераторы танылған мандаттардың қиылысында тұр — қаржы көрсеткіштерін ашпай-ақ ТДМ-ге байланысын көрсетуге болады.",
      items: [
        { goal: "ТДМ 4 және 9", desc: "Білім, технология, өнеркәсіп пен инновация — инженерлерді даярлау, технология трансфері." },
        { goal: "ТДМ 7 және 13", desc: "Таза энергия мен климат — жасыл дата-орталық, күн генерациясы, көміртегі ізін азайту." },
        { goal: "ТДМ 8", desc: "Лайықты еңбек және экономикалық өсу — ШОБ-ты қолдау және жұмыс орындарын ашу." },
        { goal: "ТДМ 11", desc: "Тұрақты қалалар — ақылды инфрақұрылым және GovTech." },
        { goal: "ТДМ 17", desc: "Серіктестіктер — даму институттарымен және үкіметтермен көпжақты келісімдер." },
      ],
    },
    esg: {
      heading: "ESG және жасыл қаржыландыру",
      sub: "Даму банктерінің тікелей тілі.",
      points: [
        { title: "AI & Green cloud, PUE ~1,2", text: "Негізгі суыту — СПГ суығы; күн станциясы қосылған." },
        { title: "Жасыл облигацияларға дайын", text: "Green bonds және даму банктерінің талаптарына сай құрылымдалған." },
        { title: "Этикалық ЖИ және құпиялылық", text: "Ашықтық, бейтараптық, адам бақылауы; деректерді GDPR қағидалары бойынша өңдеу." },
        { title: "Тәуелсіз ашық стектер", text: "Аудитке жарамды, бір вендорға байлау жоқ." },
      ],
    },
    metricsHeading: "Сандар",
    cta: { heading: "Инвестициялық материалдарды сұраңыз", text: "One-pager және питч-дек поштамен. Құпия көрсеткіштер онлайн жарияланбайды.", button: "Инвест-командамен байланысу" },
  },
  enterprisePage: {
    badge: "Жеке және мемлекеттік секторға",
    title: "Сіздің стандарттарыңызға сай технологиялар — ұлттық және халықаралық.",
    intro:
      "Тәуелсіз деректер орталықтары мен ЖИ есептеулерінен GovTech платформаларына дейін — мемлекеттік және жеке секторға арналған технологияларды жобалаймыз, құрамыз және сертификаттаймыз. Жаңа әзірлемелерді тауып, бағалап, процестеріңізге енгіземіз.",
    ctas: ["Технологиялық аудит сұрау", "Пилот бастау", "ЖИ қызметтері"],
    services: {
      heading: "Қызметтер каталогы",
      items: [
        { title: "ЖИ-жүйелер", text: "Салалық агенттер, ML және тәуелсіз есептеулердегі шешім қабылдау жүйелері." },
        { title: "Ақылды инфрақұрылым", text: "Жоғары тығыздықты, энергия тиімді есептеулер мен байланыс." },
        { title: "GovTech", text: "Цифрлық ID, деректер алмасу және қағазсыз қызметтер." },
        { title: "Деректер орталығын сертификаттау", text: "TIA-942 және Uptime Tier III/IV — толық цикл." },
        { title: "Корпоративтік инновация", text: "Жаңа технологияларды табу және процестерге енгізу." },
        { title: "SpaceTech / NajmSat", text: "Ерекше ғарыштық құзыреттілік — спутниктік және жердегі жүйелер." },
      ],
    },
    standards: {
      heading: "Стандарттар мен сәйкестік",
      items: ["ISO 9001", "ISO 14001", "ISO 10015", "TIA-942", "Uptime Tier III/IV", "ҚР техрегламенттеуі", "GDPR логикасындағы деректер"],
    },
    scouting: {
      heading: "Жаңа технологияны табудың үш қадамы",
      steps: [
        { n: "01", title: "Скаутинг", text: "Процестеріңізге қатысты жаңа технологияларды табамыз." },
        { n: "02", title: "Бағалау (CIVTI)", text: "Әдіснамамызбен сәйкестікті, дайындықты және әсерді бағалаймыз." },
        { n: "03", title: "Интеграция", text: "Тексерілген технологияны процестер мен жүйелеріңізге енгіземіз." },
      ],
    },
    pilot: {
      heading: "Қол жетімді пилот",
      text: "6–8 аптада PoC және анық scope-of-work — ірі міндеттемеге дейін тексеру.",
      button: "Пилот бастау",
    },
  },
  foundersPage: {
    badge: "Құрылтайшылар, университеттер мен R&D орталықтарына",
    title: "Зерттеуден кіріске дейін — материалдық емес активтеріңізді қорғаңыз, бағалаңыз және дамытыңыз.",
    intro:
      "Стартаптар, тұрақты компаниялар, университеттер мен R&D орталықтары үшін: зияткерлік меншіктің толық циклін жүргіземіз — бағалау, қорғау және құнын анықтау. Miras акселераторы арқылы инвестиция мен бизнесті дамытуға жол ашамыз.",
    ctas: ["ЗМ бағалауы", "Miras акселераторына өтінім", "Командамен байланысу"],
    lifecycle: {
      heading: "ЗМ-нің өмірлік циклі",
      sub: "Төрт қадам және әр қадамда NSART не істейді.",
      steps: [
        { n: "1", title: "Бағалау", text: "Активтер аудиті және дайындықты бағалау — TRL / CRL / MRL. Нені қорғау керектігін анықтаймыз." },
        { n: "2", title: "Қорғау", text: "Патенттер, тауар таңбалары, ноу-хау, ПҚ тіркеу — бірнеше елде." },
        { n: "3", title: "Құны", text: "DCF және нарықтық аналогтар әдістерімен материалдық емес активтерді бағалау." },
        { n: "4", title: "Кіріске айналдыру", text: "Лицензиялау, мәмілелерді құрылымдау және Miras акселераторы арқылы инвестицияға жол ашу." },
      ],
    },
    assets: {
      heading: "Актив түрлері",
      items: ["ПҚ", "Цифрлық сервистер", "Агроөнеркәсіптік кешендер", "R&D нәтижелері", "Ғарыштық технологиялар"],
    },
    university: {
      heading: "Университеттер мен R&D орталықтарына арналған жеке трек",
      text: "Біздің бастауымыз — терең технологиялар: технология трансфері, ғылымнан спин-офф, зерттеу нәтижелерін қорғау және бизнеске айналдыру.",
      anchors: "Якорь серіктестер: King Saud University (Сауд Арабиясы) және Қазақстанның ғылыми институттары мен жоғары оқу орындары.",
    },
    form: {
      heading: "Қарапайым өтінім формасы",
      sub: "Саланы, кезеңді және қажеттілікті көрсетіңіз — біз сізді тиісті трекке бағыттаймыз.",
      industry: "Сала",
      stage: "Кезең",
      need: "Не қажет",
      name: "Аты-жөні",
      email: "Email",
      submit: "Өтінім жіберу",
      success: "Рақмет — біз сізге жақын арада хабарласамыз.",
      stages: ["Идея", "Прототип / TRL 4–6", "Пилот / TRL 7–8", "Кіріс / масштабтау"],
    },
  },
  mirasPage: {
    badge: "Бірлескен кәсіпорын · NSART × PNOD",
    title: "Miras Accelerator — терең технологияларды бизнеске айналдыратын инфрақұрылым.",
    intro:
      "Miras — NSART пен PNOD-тың бірлескен кәсіпорны. Ол жетілген технологияларды нарыққа шығаруға көмектеседі: инженерияны басқару мен талаптарға сай етуді, ЗМ қолдауын және инвестицияға жол ашуды бір орынға жинайды. Vision 2030, ОИС және БҰҰ ТДМ-ге сай.",
    ctas: ["Miras туралы", "Трекке өтінім", "Серіктес болу"],
    problem: {
      heading: "Miras қандай алшақтықты жабады",
      text: "Технология ғылыми жағынан дайын болуы мүмкін, бірақ оны ұйымға енгізу үшін коммерциялық, реттеу және өндіріс жағынан дайындық жетіспейді. Miras осы алшақтықты үш өлшемді дайындық моделі арқылы жабады.",
      dims: [
        { code: "TRL", title: "Технологиялық дайындық", q: "Технология қажетті ауқымда дәлелденген бе?" },
        { code: "CRL", title: "Коммерциялық дайындық", q: "Кіріс, баға және келісімшарт моделі бар ма?" },
        { code: "MRL", title: "Өндірістік дайындық", q: "Өнімді шығаруға, сертификаттауға және жеткізуге бола ма?" },
      ],
    },
    tracks: {
      heading: "Үш трек",
      items: [
        { n: "Трек 1", title: "Deep-Tech Cohort", text: "Командаларды диагностикадан инвестицияға дайындыққа және демо-күнге жеделдетеміз." },
        { n: "Трек 2", title: "Regulatory Sandbox", text: "Реттелетін ортада шешімдерді тестілейміз — CleanTech, GovTech, агенттік ЖИ, дата-маркетплейс — өзіміздің GPU-инфрақұрылымда." },
        { n: "Трек 3", title: "IP Portfolio & Founders", text: "ЗМ толық циклі және құрылтайшыларды дамыту — диагностикадан лицензиялауға және ЗМ дүкеніне дейін." },
      ],
    },
    positioning: {
      heading: "Стратегиялық позициялау",
      text: "Miras танылған мандаттардың қиылысында құрылған — Vision 2030, ОИС, Digital Cooperation Organization және БҰҰ ТДМ. Бұл — даму институттарына түсінікті тіл, оны коммерциялық көрсеткіштерді ашпай қолдануға болады.",
    },
    confidential: "Құпиялылық: бөлім жалпыға қолжетімді деңгейде ұсталады. Бюджеттер, қорлардың мақсатты сомалары, басшылар мен кеңесшілердің есімдері, нақты инвесторлар және мемлекеттік органдарға өтініштер — ішкі деректер.",
  },
  aboutPage: {
    badge: "Компания туралы",
    title: "Біз терең технологиялардың идеяларын нақты бизнеске айналдырамыз.",
    intro:
      "NSART — терең технологияларға маманданған венчурлік студия: инвестициялық мүмкіндіктерді табамыз, стратегиялық серіктестіктер құрамыз, компанияларды құрылымдаймыз және Орталық Азия, MENA, Оңтүстік Азия мен Африка нарықтарына шығарамыз.",
    missionHeading: "Біздің миссия",
    missionText: "Ғылым мен бизнесті байланыстыру — жетілген зерттеулерді алып, оларды нақты компанияларға айналдыру және халықаралық капитал мен ірі мандаттарға қосу.",
    valuesHeading: "Біз қандай қағидаларды ұстанамыз",
    values: [
      { title: "Бастапқыдан тәуелсіз", text: "Ашық стектер, бір вендорға байлау жоқ, реттеушілер мен инвесторлар үшін аудитке жарамды." },
      { title: "Сөзден гөрі дәлел", text: "Әр пікір сертификатпен, метрикамен немесе енгізілген кейспен расталған." },
      { title: "Жаһандық мандаттарға сай", text: "ТДМ, ESG, даму банктерінің капиталына дайын." },
      { title: "Әдепкі бойынша көптілді", text: "EN · AR · RU · KK — біз жұмыс істейтін нарықтар үшін." },
    ],
  },
  technologiesPage: {
    badge: "Технологиялық стек",
    title: "Терең технологиялар — жобаланған және сертификатталған.",
    intro: "Тәуелсіз дата-орталықтары мен ЖИ-есептеулерден GovTech және ақылды инфрақұрылымға дейін — халықаралық стандарттар бойынша, ұштан-ұшқа аудитке жарамды.",
    pillars: [
      { title: "Жасанды интеллект", text: "AI Agent Factory, мемлекеттік салаға арналған агенттер, real-time деректер көлдеріндегі ML, өзіміздің GPU-инфрақұрылымда ірі модельдерді оқыту.", items: ["Agent Factory", "Салалық LLM", "Real-time ML", "Тәуелсіз GPU"] },
      { title: "Ақылды инфрақұрылым", text: "Жоғары тығыздықты есептеулер, AIoT және M2M желілері, цифрлық егіздер платформалары мен қалалық байланыс.", items: ["AIoT және M2M", "Цифрлық егіздер", "Smart Field", "Энергия тиімді дизайн"] },
      { title: "GovTech", text: "Электрондық үкіметтегі 20 жылдан астам тәжірибе модульдер ретінде: цифрлық ID, деректер алмасу, қағазсыз қызметтер, киберқауіпсіздік.", items: ["e-Gov", "Цифрлық ID", "Деректер алмасу", "Киберқауіпсіздік"] },
      { title: "Дата-орталықтар", text: "AI & Green cloud — Tier III/IV жобасы, PUE ~1,2, СПГ негізіндегі суыту, Орталық Азиядағы көшбасшы TIA-942 / Uptime тәжірибе.", items: ["TIA-942", "Uptime Tier III/IV", "PUE ~1,2", "СПГ негізіндегі суыту"] },
    ],
  },
  ipPage: {
    badge: "Зияткерлік меншік және материалдық емес активтер",
    title: "Активтеріңізді қорғаңыз, бағалаңыз және кіріске айналдырыңыз.",
    intro: "ЗМ толық циклін сүйемелдейміз — ПҚ, цифрлық сервистер, R&D нәтижелері, агроөнеркәсіптік кешендер, ғарыштық технологиялар.",
    lifecycleHeading: "ЗМ толық циклі",
    steps: [
      { n: "1", title: "Бағалау", text: "Активтер аудиті және дайындықты бағалау (TRL / CRL / MRL); нені қорғау керектігін анықтаймыз." },
      { n: "2", title: "Қорғау", text: "Патенттер, тауар таңбалары, ноу-хау, ПҚ тіркеу — бірнеше елде." },
      { n: "3", title: "Құны", text: "DCF және нарықтық аналогтар әдістерімен бағалау — мәмілелер, қаражат тарту, серіктестіктер үшін." },
      { n: "4", title: "Кіріске айналдыру", text: "Лицензиялау, мәмілелерді құрылымдау және Miras акселераторы арқылы инвестицияға жол ашу." },
    ],
    assetsHeading: "Біз жұмыс істейтін актив түрлері",
    assets: ["ПҚ", "Цифрлық сервистер", "R&D нәтижелері", "Агроөнеркәсіптік кешендер", "Ғарыштық технологиялар"],
    ctaHeading: "Активтеріңізді келесі кезеңге шығарыңыз.",
    ctaText: "ЗМ бағалауынан бастаңыз — біз портфельді картаға саламыз және қорғау мен кіріске айналдыру жолын ұсынамыз.",
    ctaButton: "ЗМ бағалауын алу",
  },
  marketsPage: {
    badge: "Жұмыс географиясы",
    title: "Төрт өңір. Бір көпір.",
    intro: "NSART дамушы нарықтардың сұранысы мен ірі капиталдың қиылысында жұмыс істейді — Орталық Азия базасы ретінде, Сауд Арабиясы мен MENA өсу дәлізі, Оңтүстік Азия мен Африка кеңею шегі.",
    regionsHeading: "Өңірлер",
    regions: [
      { name: "Орталық Азия", kicker: "База", desc: "Қазақстан: тәуелсіз HPC, GovTech референс, жасыл деректер орталықтары. Электрондық үкіметтегі 20 жылдан астам тәжірибе, БҰҰ Top-25." },
      { name: "MENA", kicker: "Өсу дәлізі", desc: "Сауд Арабиясы: Vision 2030-ға сай GovTech лабораториялары, PNOD-пен басқару және сәйкестік бойынша серіктестіктер, Miras Accelerator БК." },
      { name: "Оңтүстік Азия", kicker: "Кеңею", desc: "Пәкістан: NITEC + InfoTech-пен GovTech экспорты, Pixel DMC арқылы төлем шлюздері, сертификаттарды тарату." },
      { name: "Африка", kicker: "Шек", desc: "Дамушы нарықтардың инфрақұрылымы, ESG-инвестициялар, мамандар дайындау, үкіметтер үшін Scalable Solution Modules." },
    ],
    gatewayHeading: "NSART Gateway",
    gatewayText: "Орталық Азия, Оңтүстік Азия, MENA және Африка нарықтарына шығу үшін арнайы өнім — жергілікті өкілдік, реттеу мәселелерін шешу және серіктестер экожүйесі.",
  },
  partnersPage: {
    badge: "Экожүйе",
    title: "Мемлекеттер, ғылым және капитал экожүйесі.",
    intro: "Біз бес серіктес тобымен жұмыс істейміз — мемлекет пен инфрақұрылым, технология мен бұлт, ғылым мен білім, басқару мен тұрақты даму, сауда мен нарықтарға шығу.",
    spotlightHeading: "Негізгі серіктестер",
    logoHeading: "Таңдаулы серіктестер",
  },
  contactPage: {
    badge: "Байланыс",
    title: "Өзіңізге сай әңгімені бастаңыз.",
    intro: "Инвесторларға, бизнеске және мемлекетке, құрылтайшылар мен R&D-ге бөлек жолдар бар. Екі жұмыс күні ішінде жауап береміз.",
    formHeading: "Хабарлама жіберіңіз",
    formName: "Аты-жөні",
    formEmail: "Email",
    formOrg: "Ұйым",
    formAudience: "Мен —",
    formMessage: "Хабарлама",
    formSubmit: "Жіберу",
    formSuccess: "Рақмет — біз сізге жақын арада хабарласамыз.",
    audienceOptions: ["Инвестор", "Бизнес / Мемлекет", "Құрылтайшы / R&D", "Серіктес", "Басқа"],
    directHeading: "Немесе тікелей байланыс",
    location: "Астана, Қазақстан",
    privacy: "Жіберу арқылы біздің сізбен байланысуымызға келісім бересіз. Деректерді үшінші тұлғаларға бермейміз.",
  },
};

/* ------------------------------------------------------------------ */
/*  Deep-merge with EN fallback                                       */
/* ------------------------------------------------------------------ */

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function deepMerge<T>(base: T, override: DeepPartial<T> | undefined): T {
  if (override === undefined) return base;
  if (Array.isArray(base)) {
    // Arrays are replaced wholesale when provided, else fall back to base.
    return (Array.isArray(override) ? override : base) as T;
  }
  if (isPlainObject(base) && isPlainObject(override)) {
    const out: Record<string, unknown> = { ...base };
    for (const key of Object.keys(base)) {
      out[key] = deepMerge(
        (base as Record<string, unknown>)[key],
        (override as Record<string, unknown>)[key] as never,
      );
    }
    return out as T;
  }
  return (override as T) ?? base;
}

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  ru,
  ar: deepMerge(en, ar),
  kk: deepMerge(en, kk),
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
