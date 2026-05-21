import type { Locale } from "./config";

/* ------------------------------------------------------------------ */
/*  English — canonical / complete reference                          */
/* ------------------------------------------------------------------ */

const en = {
  meta: {
    title: "NSART · Technology Interaction",
    description:
      "Deep-tech ventures from Central Asia to the world. R&D, intellectual property, and investment infrastructure across Kazakhstan, Saudi Arabia, and Africa.",
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
    title: "Deep-tech ventures from Central Asia to the world.",
    subtitle:
      "R&D, intellectual property, and investment infrastructure across Kazakhstan, Saudi Arabia, and Africa.",
    ctaPrimary: "Choose your path",
    ctaSecondary: "Explore Miras Accelerator",
    stats: [
      { value: "10–100 MW", label: "Planned IT capacity, Tamdy Cloud" },
      { value: "PUE ~1.2", label: "Energy efficiency — among the best on Earth" },
      { value: "Top-25", label: "Kazakhstan in the UN e-Government ranking" },
      { value: "4 regions", label: "Central Asia · MENA · South Asia · Africa" },
    ],
  },
  audience: {
    eyebrow: "Three ways in",
    heading: "Built for the way you evaluate technology.",
    sub: "Investors, clients, and founders look for different signals of trust. Choose the path that fits you.",
    cards: [
      {
        key: "investors",
        tag: "For investors",
        title: "Sovereign, SDG-aligned deep-tech",
        text: "An SDG-aligned deep-tech portfolio, the Miras Accelerator, and ESG & Ethical-AI frameworks.",
        href: "/investors",
        cta: "Investment thesis",
      },
      {
        key: "enterprise",
        tag: "For enterprises & government",
        title: "Technology that meets your standards",
        text: "AI, GovTech, smart infrastructure, and sovereign data centers, certified to international standards.",
        href: "/enterprise",
        cta: "Explore services",
      },
      {
        key: "founders",
        tag: "For founders & R&D",
        title: "From research to revenue",
        text: "The full IP lifecycle, valuation, and access to investment for founders, universities & R&D centers.",
        href: "/founders",
        cta: "IP assessment",
      },
    ],
  },
  technologies: {
    eyebrow: "Technologies",
    heading: "We design, build, and certify deep technology.",
    sub: "From sovereign data centers and AI compute to GovTech platforms — engineered to international standards and built to be audited.",
    items: [
      {
        title: "Artificial Intelligence",
        text: "AI Agent Factory, domain government agents, ML on real-time data lakes, and large-model training on sovereign GPU infrastructure.",
      },
      {
        title: "Smart Infrastructure",
        text: "Green, high-density compute — NVIDIA H200 clusters, exascale open-source stacks, and energy-efficient design.",
      },
      {
        title: "GovTech",
        text: "20+ years of e-Government experience exported as scalable modules: digital identity, data exchange, paperless services.",
      },
      {
        title: "Data Centers",
        text: "Tamdy Cloud — Tier III/IV design, PUE ~1.2, cryogenic LNG cooling, and the leading TIA-942 / Uptime practice in Central Asia.",
      },
    ],
  },
  mirasTeaser: {
    eyebrow: "Miras Accelerator",
    heading: "Infrastructure for commercialising deep technologies.",
    text: "A joint venture of NSART and PNOD, Miras helps mature technologies cross the readiness gap — combining deep-tech engineering with governance and compliance, full IP lifecycle support, and a path to investment.",
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
        title: "Tamdy Cloud",
        location: "Kuryk SEZ, Mangystau · Tier III/IV design",
        status: "In development",
        text: "A green energy-and-digital cluster using cryogenic cold from an adjacent LNG re-gasification terminal as primary cooling — near-zero marginal cooling cost. Powered by a gas-turbine station with integrated solar, structured for green-bond financing.",
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
        text: "NVIDIA H200 SXM (HBM3e, 141 GB, 4.8 TB/s) with NVLink 4.0 for training and inference. An open exascale stack — Slurm + OpenMPI, ROCm/CUDA OSS, OpenStack, Lustre/GPFS — sovereign, auditable, with no vendor lock-in.",
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
        text: "Aligned with Vision 2030: an AI Agent Factory of reusable domain government agents, Smart Data Ukimet over 400+ national databases, a proactive Digital Family Card, and an AI & data capacity-building program for civil servants.",
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
        text: "Data exchange, digital identity, and paperless government exported across three regions through Scalable Solution Modules — including joint participation in World Bank and ADB tenders. Fintech and certification via Pixel DMC; cloud migration with Dataset, Eagale Soft, and KT Cloud Lab.",
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
    sub: "A bridge between Central Asia and the world — built where emerging-market demand meets institutional capital.",
    items: [
      { name: "Central Asia", desc: "Kazakhstan home base — sovereign HPC, GovTech, and green data centers." },
      { name: "MENA", desc: "Saudi Arabia — GovTech labs, Vision 2030 alignment, and GRC partnerships." },
      { name: "South Asia", desc: "Pakistan — GovTech export, fintech gateways, and certification distribution." },
      { name: "Africa", desc: "Emerging-market infrastructure, ESG-aligned investment, and capacity building." },
    ],
  },
  partners: {
    eyebrow: "Partners",
    heading: "An ecosystem of governments, science, and capital.",
    sub: "Grouped by role — from state infrastructure to GRC, sustainability, and market access.",
    groups: [
      { name: "State & infrastructure", members: ["NITEC", "KT Cloud Lab", "Ghalam", "SpaceLab"] },
      { name: "Technology & cloud", members: ["KazDream", "MyCloud", "AiMap", "Eagale Soft", "InfoTech", "Pixel DMC"] },
      { name: "Science & education (DeepTech origin)", members: ["King Saud University", "KZ universities & institutes", "Artisan Education"] },
      { name: "GRC, audit & sustainability", members: ["PNOD Auditing Co.", "MSTDAM"] },
      { name: "Trade & market access", members: ["QazTrade", "MENA partners", "South Asia partners", "Africa partners"] },
    ],
    spotlight: [
      {
        name: "PNOD Auditing Co.",
        role: "GRC, audit, and AI governance (14 years' expertise; ISO/IEC 42001), with deep knowledge of the Saudi regulatory environment. Co-founder of the Miras Accelerator joint venture.",
      },
      {
        name: "MSTDAM",
        role: "Environmental sustainability platform — carbon-footprint measurement, tree planting, and ESG reporting (Saudi Arabia). Green-agenda and ESG partner.",
      },
      {
        name: "NITEC",
        role: "National Information Technologies — Kazakhstan's state operator of e-Government services and digital identity infrastructure.",
      },
      {
        name: "King Saud University",
        role: "Anchor academic partner in Saudi Arabia for DeepTech research, joint R&D, and the Saudi AI & GovTech Lab.",
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
    sub: "Four verticals where NSART builds, certifies, and scales deep technology.",
    items: [
      {
        n: "01",
        title: "Telecom & Space Tech",
        text: "Telecommunications, network analytics, space technologies, data centers — innovation for communications and aerospace sectors.",
        tags: ["Network & Analytics", "Space Tech", "Data Centers"],
      },
      {
        n: "02",
        title: "GovTech",
        text: "Government digital solutions — e-Gov services and cybersecurity for a transparent, secure public sector.",
        tags: ["e-Gov", "Cyber Security"],
      },
      {
        n: "03",
        title: "Digital Platforms",
        text: "Digital platforms for education, fintech, automotive, food, and agriculture — turnkey solutions for new markets.",
        tags: ["EdTech", "FinTech", "CarTech", "FoodTech", "AgroTech"],
      },
      {
        n: "04",
        title: "Smart Infrastructure",
        text: "Intelligent city solutions — digital twins, smart fields, AIoT, and machine-to-machine infrastructure for modern urban environments.",
        tags: ["Digital Twins", "Smart Field", "AIoT & M2M"],
      },
    ],
  },
  methodology: {
    eyebrow: "Methodology",
    heading: "Proven frameworks that turn ideas into real companies.",
    sub: "Four frameworks NSART uses across every engagement — from strategy to execution.",
    items: [
      {
        n: "01",
        title: "Vision 3P",
        sub: "Strategic vision",
        text: "Based on the convoy law — prioritising People, streamlined Process, and quality Product.",
        tags: ["People", "Process", "Product"],
      },
      {
        n: "02",
        title: "Venture Development",
        sub: "Integrated development cycle",
        text: "Full venture business cycle — from idea inception to operations scaling and results.",
        tags: ["Value Creation", "Value Protection", "Structuring", "Operations"],
      },
      {
        n: "03",
        title: "GIST Planning",
        sub: "Agile strategic planning",
        text: "From long-term goals and innovative ideas to clear steps and effective implementation.",
        tags: ["Goals", "Ideas", "Steps", "Tasks"],
      },
      {
        n: "04",
        title: "CIVTI Assessment",
        sub: "Project evaluation system",
        text: "Comprehensive analysis of ideas through value, technical complexity, and required investment.",
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
        text: "R&D, pilot implementations, and open innovation programs for enterprise clients.",
      },
    ],
  },
  certifications: {
    eyebrow: "Certifications & compliance",
    heading: "Trust signals, verified.",
    sub: "A permanent trust line for every audience — quality, environment, infrastructure, and governance.",
    items: [
      { name: "ISO 9001", meaning: "Quality management." },
      { name: "ISO 14001", meaning: "Environmental management — national + international. Directly tied to ESG." },
      { name: "ISO 10015", meaning: "Training & development management (supports Capacity Building)." },
      { name: "TIA-942", meaning: "Data-center infrastructure standard — leading practice in Central Asia." },
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
    tagline: "Deep-tech ventures from Central Asia to the world.",
    company: "Company",
    audiences: "Audiences",
    contactTitle: "Contact",
    rights: "NSART · Technology Interaction. All rights reserved.",
    confidential:
      "The Miras Accelerator is presented at a public level only — without budgets, target fund sizes, or internal details.",
  },

  /* -------- For Investors page -------- */
  investorsPage: {
    badge: "For institutional & impact investors",
    title: "Invest in sovereign, SDG-aligned deep-tech infrastructure.",
    intro:
      "We structure and de-risk investments in green data centers, AI compute, and GovTech across emerging markets — built on ESG principles, Ethical AI, and international certification. The Miras Accelerator is our dedicated vehicle for capital raising.",
    ctas: ["View our investment thesis", "Explore Miras Accelerator", "Request ESG brief by email"],
    audienceNote:
      "For IsDB, EBRD, ADB, the World Bank, UN-affiliated funds, and private impact investors.",
    sdg: {
      heading: "Aligned with the UN Sustainable Development Goals",
      sub: "NSART and the Miras Accelerator sit at the intersection of recognised mandates — mapped to the SDGs without disclosing financial parameters.",
      items: [
        { goal: "SDG 4 & 9", desc: "Education, technology, industry and innovation — training engineers and transferring technology." },
        { goal: "SDG 7 & 13", desc: "Clean energy and climate — a green data center, solar generation, and a lower carbon footprint." },
        { goal: "SDG 8", desc: "Decent work and economic growth — supporting SMEs and creating jobs." },
        { goal: "SDG 11", desc: "Sustainable cities — smart infrastructure and GovTech." },
        { goal: "SDG 17", desc: "Partnerships — multilateral agreements with development institutions and governments." },
      ],
    },
    esg: {
      heading: "ESG & green finance",
      sub: "The direct language of development banks.",
      points: [
        { title: "Tamdy Cloud, PUE ~1.2", text: "Cryogenic LNG cold as primary cooling, with integrated solar generation." },
        { title: "Green-bond ready", text: "Structured for green-bond financing and development-bank mandates." },
        { title: "Ethical AI & privacy", text: "Transparency, no bias, human oversight; GDPR-style data handling." },
        { title: "Sovereign open stacks", text: "Auditable, with no vendor lock-in." },
      ],
    },
    metricsHeading: "The numbers",
    cta: { heading: "Request the investor materials", text: "One-pager and deck by e-mail. No confidential parameters are published online.", button: "Talk to our investment team" },
  },

  /* -------- For Enterprises & Government page -------- */
  enterprisePage: {
    badge: "For private & public sector",
    title: "Technology that meets your standards — national and international.",
    intro:
      "From sovereign data centers and AI compute to GovTech platforms, we design, build, and certify technology for the public and private sectors — and scout, evaluate, and integrate emerging innovations into your operations.",
    ctas: ["Request a technology audit", "Start a pilot", "Explore our AI services"],
    services: {
      heading: "Service catalog",
      items: [
        { title: "AI systems", text: "Domain agents, ML, and decision systems on sovereign compute." },
        { title: "Smart infrastructure", text: "High-density, energy-efficient compute and connectivity." },
        { title: "GovTech", text: "Digital identity, data exchange, and paperless services." },
        { title: "Data-center certification", text: "TIA-942 and Uptime Tier III/IV — full lifecycle." },
        { title: "Corporate innovation", text: "Technology scouting and integration into your operations." },
        { title: "SpaceTech / NajmSat", text: "A distinctive space competence — satellite and ground systems." },
      ],
    },
    standards: {
      heading: "Standards & compliance",
      items: ["ISO 9001", "ISO 14001", "ISO 10015", "TIA-942", "Uptime Tier III/IV", "RK technical regulation", "GDPR-style data handling"],
    },
    scouting: {
      heading: "Technology scouting in three steps",
      steps: [
        { n: "01", title: "Scout", text: "Identify emerging technologies relevant to your operations." },
        { n: "02", title: "Evaluate (CIVTI)", text: "Assess fit, readiness, and impact with our evaluation methodology." },
        { n: "03", title: "Integrate", text: "Embed validated innovations into your processes and systems." },
      ],
    },
    pilot: {
      heading: "A low-threshold pilot",
      text: "A proof of concept in 6–8 weeks, with a clear scope-of-work template — so you can validate before you commit.",
      button: "Start a pilot",
    },
  },

  /* -------- For Founders & R&D page -------- */
  foundersPage: {
    badge: "For founders, universities & R&D centers",
    title: "From research to revenue — protect, value, and grow your intangible assets.",
    intro:
      "For startups, established companies, universities, and R&D centers: we manage the full intellectual property lifecycle — assessment, protection, and valuation — and open the path to investment and business development through the Miras Accelerator.",
    ctas: ["Get an IP assessment", "Apply to Miras Accelerator", "Talk to our team"],
    lifecycle: {
      heading: "The IP lifecycle",
      sub: "Four steps, with what NSART does at each.",
      steps: [
        { n: "1", title: "Assess", text: "Asset audit and readiness scoring — TRL / CRL / MRL — identifying protectable objects." },
        { n: "2", title: "Protect", text: "Patents, trademarks, know-how, software registration, and a multi-jurisdiction protection strategy." },
        { n: "3", title: "Value", text: "Intangible-asset valuation by DCF and market comparables, for deals and fundraising." },
        { n: "4", title: "Monetize", text: "Licensing, deal structuring, and a path to investment through the Miras Accelerator." },
      ],
    },
    assets: {
      heading: "Asset types we work with",
      items: ["Software", "Digital services", "Agro-industrial complexes", "R&D results", "Space technologies"],
    },
    university: {
      heading: "A dedicated track for universities & R&D centers",
      text: "DeepTech origin — technology transfer, spin-offs from science, and the protection and commercialisation of research results.",
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
      "NSART is a venture studio specialising in deep-tech projects — identifying investment opportunities, building strategic partnerships, structuring ventures, and entering new markets across Central Asia, MENA, South Asia, and Africa.",
    missionHeading: "Our mission",
    missionText:
      "Bridge science and commerce: take mature research, structure it as venture-grade companies, and connect it to international capital and institutional mandates.",
    valuesHeading: "What we stand for",
    values: [
      { title: "Sovereign by design", text: "Open stacks, no vendor lock-in, auditable by regulators and investors." },
      { title: "Evidence over rhetoric", text: "Every claim backed by certification, metrics, or a deployed reference." },
      { title: "Aligned with global mandates", text: "SDG-aligned, ESG-ready, structured for development-bank capital." },
      { title: "Multilingual by default", text: "EN · AR · RU · KK — built for the markets we serve." },
    ],
  },

  /* -------- Technologies page -------- */
  technologiesPage: {
    badge: "Technology stack",
    title: "Deep technology, engineered and certified.",
    intro:
      "From sovereign data centers and AI compute to GovTech and smart infrastructure — built to international standards, auditable end-to-end, and ready to integrate with national and enterprise environments.",
    pillars: [
      {
        title: "Artificial Intelligence",
        text: "AI Agent Factory, domain government agents, ML on real-time data lakes, and large-model training on sovereign GPU infrastructure (NVIDIA H200, open exascale stack).",
        items: ["Agent Factory", "Domain LLMs", "Real-time ML", "Sovereign GPU"],
      },
      {
        title: "Smart Infrastructure",
        text: "High-density compute, AIoT and M2M networks, digital-twin platforms, and connectivity engineered for urban and industrial environments.",
        items: ["AIoT & M2M", "Digital Twins", "Smart Field", "Energy-efficient design"],
      },
      {
        title: "GovTech",
        text: "20+ years of e-Government experience exported as scalable modules — digital identity, data exchange, paperless services, cybersecurity.",
        items: ["e-Gov", "Digital ID", "Data exchange", "Cyber Security"],
      },
      {
        title: "Data Centers",
        text: "Tamdy Cloud — Tier III/IV design, PUE ~1.2, cryogenic LNG cooling, and the leading TIA-942 / Uptime practice in Central Asia.",
        items: ["TIA-942", "Uptime Tier III/IV", "PUE ~1.2", "Cryogenic LNG cooling"],
      },
    ],
  },

  /* -------- IP & Assets page -------- */
  ipPage: {
    badge: "Intellectual property & intangible assets",
    title: "Safeguard, value, and monetise your intangible assets.",
    intro:
      "Full lifecycle support for intellectual property — software, digital services, R&D results, agro-industrial complexes, and space technologies. From audit and protection to valuation, licensing, and a path to investment.",
    lifecycleHeading: "The IP lifecycle",
    steps: [
      { n: "1", title: "Assess", text: "Asset audit and readiness scoring (TRL / CRL / MRL); identify protectable objects." },
      { n: "2", title: "Protect", text: "Patents, trademarks, know-how, software registration, multi-jurisdiction strategy." },
      { n: "3", title: "Value", text: "Valuation by DCF and market comparables — for deals, fundraising, and partnerships." },
      { n: "4", title: "Monetize", text: "Licensing, deal structuring, and a path to investment through Miras Accelerator." },
    ],
    assetsHeading: "Asset types we work with",
    assets: ["Software", "Digital services", "R&D results", "Agro-industrial complexes", "Space technologies"],
    ctaHeading: "Bring your assets to the next stage.",
    ctaText: "Start with an IP assessment — we'll map your portfolio and recommend the protection and monetisation path that fits.",
    ctaButton: "Get an IP assessment",
  },

  /* -------- Markets page -------- */
  marketsPage: {
    badge: "Where we operate",
    title: "Four regions. One bridge.",
    intro:
      "NSART operates at the intersection of emerging-market demand and institutional capital — Central Asia as home, Saudi Arabia and the wider MENA as a growth corridor, South Asia and Africa as expansion frontiers.",
    regionsHeading: "Regions",
    regions: [
      {
        name: "Central Asia",
        kicker: "Home base",
        desc: "Kazakhstan: sovereign HPC, GovTech reference, and green data centers. 20+ years of e-Government experience and Top-25 UN e-Gov ranking.",
      },
      {
        name: "MENA",
        kicker: "Growth corridor",
        desc: "Saudi Arabia: GovTech labs aligned with Vision 2030, GRC partnerships with PNOD, and the Miras Accelerator joint venture.",
      },
      {
        name: "South Asia",
        kicker: "Expansion",
        desc: "Pakistan: GovTech export with NITEC + InfoTech, fintech gateways via Pixel DMC, certification distribution.",
      },
      {
        name: "Africa",
        kicker: "Frontier",
        desc: "Emerging-market infrastructure, ESG-aligned investment, capacity building, and Scalable Solution Modules for governments.",
      },
    ],
    gatewayHeading: "NSART Gateway",
    gatewayText:
      "A dedicated product for entering the markets of Central Asia, South Asia, MENA, and Africa — combining local presence, regulatory navigation, and partner ecosystems.",
  },

  /* -------- Partners page -------- */
  partnersPage: {
    badge: "Ecosystem",
    title: "An ecosystem of governments, science, and capital.",
    intro:
      "We work across five partner groups — state and infrastructure, technology and cloud, science and education, GRC and sustainability, trade and market access.",
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
    location: "Almaty, Kazakhstan",
    privacy: "By submitting, you agree we may contact you. We don't share data with third parties.",
  },

  /* -------- Miras Accelerator page -------- */
  mirasPage: {
    badge: "Joint venture · NSART × PNOD",
    title: "Miras Accelerator — infrastructure for commercialising deep technologies.",
    intro:
      "A joint venture of NSART and PNOD, Miras helps mature technologies cross the readiness gap — combining deep-tech engineering with governance and compliance, full IP lifecycle support, and a path to investment, aligned with Vision 2030, the OIC, and the UN SDGs.",
    ctas: ["Learn about Miras", "Apply to a track", "Partner with us"],
    problem: {
      heading: "The gap Miras closes",
      text: "A technology can be scientifically mature, yet an organisation may lack the commercial, regulatory, and manufacturing infrastructure to deploy it. Miras closes this gap through a three-dimensional readiness model.",
      dims: [
        { code: "TRL", title: "Technology readiness", q: "Is the technology proven at the required scale?" },
        { code: "CRL", title: "Commercial readiness", q: "Is there a path to revenue, pricing, and a contract model?" },
        { code: "MRL", title: "Manufacturing readiness", q: "Can the product be produced, certified, and delivered?" },
      ],
    },
    tracks: {
      heading: "Three tracks",
      items: [
        { n: "Track 1", title: "Deep-Tech Cohort", text: "Accelerating teams from diagnostics to investment readiness and demo day." },
        { n: "Track 2", title: "Regulatory Sandbox", text: "Testing solutions in a regulated environment — CleanTech, GovTech, agentic AI, data marketplace — on sovereign GPU infrastructure." },
        { n: "Track 3", title: "IP Portfolio & Founders", text: "The full IP lifecycle and founder development — from diagnostics to licensing and an IP showcase." },
      ],
    },
    positioning: {
      heading: "Strategic positioning",
      text: "Miras is built at the intersection of recognised mandates — Saudi Vision 2030, the OIC agenda, the Digital Cooperation Organization, and the UN SDGs. It is a language understood by development institutions, usable without disclosing commercial parameters.",
    },
    confidential:
      "Confidentiality: this section is kept at a public level. Budgets, target fund sizes, leadership and advisor names, specific investors, and details of government approaches are internal.",
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
      "Глубокотехнологичные венчуры из Центральной Азии — для всего мира. НИОКР, интеллектуальная собственность и инвестиционная инфраструктура в Казахстане, Саудовской Аравии и Африке.",
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
    title: "Глубокотехнологичные венчуры из Центральной Азии — для всего мира.",
    subtitle:
      "НИОКР, интеллектуальная собственность и инвестиционная инфраструктура в Казахстане, Саудовской Аравии и Африке.",
    ctaPrimary: "Выберите путь",
    ctaSecondary: "Акселератор Miras",
    stats: [
      { value: "10–100 МВт", label: "Планируемая ИТ-мощность Tamdy Cloud" },
      { value: "PUE ~1,2", label: "Энергоэффективность — одна из лучших в мире" },
      { value: "Top-25", label: "Казахстан в рейтинге ООН по e-Government" },
      { value: "4 региона", label: "Центральная Азия · MENA · Южная Азия · Африка" },
    ],
  },
  audience: {
    eyebrow: "Три точки входа",
    heading: "Построено под то, как вы оцениваете технологии.",
    sub: "Инвесторы, клиенты и основатели ищут разные сигналы доверия. Выберите путь, который подходит вам.",
    cards: [
      {
        key: "investors",
        tag: "Для инвесторов",
        title: "Суверенный deep-tech по повестке ЦУР",
        text: "Портфель глубоких технологий по повестке ЦУР, акселератор Miras, принципы ESG и этичного ИИ.",
        href: "/investors",
        cta: "Инвестиционная стратегия",
      },
      {
        key: "enterprise",
        tag: "Для бизнеса и государства",
        title: "Технологии, отвечающие вашим стандартам",
        text: "ИИ, GovTech, умная инфраструктура и суверенные дата-центры с международной сертификацией.",
        href: "/enterprise",
        cta: "Смотреть услуги",
      },
      {
        key: "founders",
        tag: "Для основателей и R&D",
        title: "От исследования к выручке",
        text: "Полный жизненный цикл ИС, оценка и доступ к инвестициям — для основателей, университетов и R&D-центров.",
        href: "/founders",
        cta: "Оценка ИС",
      },
    ],
  },
  technologies: {
    eyebrow: "Технологии",
    heading: "Мы проектируем, строим и сертифицируем глубокие технологии.",
    sub: "От суверенных дата-центров и ИИ-вычислений до GovTech-платформ — по международным стандартам и с возможностью аудита.",
    items: [
      {
        title: "Искусственный интеллект",
        text: "AI Agent Factory, доменные госагенты, ML на озёрах данных в реальном времени и обучение крупных моделей на суверенной GPU-инфраструктуре.",
      },
      {
        title: "Умная инфраструктура",
        text: "Зелёные высокоплотные вычисления — кластеры NVIDIA H200, открытые экзафлопсные стеки и энергоэффективный дизайн.",
      },
      {
        title: "GovTech",
        text: "20+ лет опыта электронного правительства как масштабируемые модули: цифровая идентичность, обмен данными, безбумажные услуги.",
      },
      {
        title: "Дата-центры",
        text: "Tamdy Cloud — проект под Tier III/IV, PUE ~1,2, криогенный холод СПГ и лидирующая в ЦА практика TIA-942 / Uptime.",
      },
    ],
  },
  mirasTeaser: {
    eyebrow: "Miras Accelerator",
    heading: "Инфраструктура коммерциализации глубоких технологий.",
    text: "Совместное предприятие NSART и PNOD, Miras помогает зрелым технологиям преодолеть разрыв готовности — соединяя инженерию глубоких технологий с управлением и комплаенсом, полным сопровождением жизненного цикла ИС и путём к инвестициям.",
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
        title: "Tamdy Cloud",
        location: "СЭЗ «Курык», Мангистау · проект под Tier III/IV",
        status: "В разработке",
        text: "Зелёный энерго-цифровой кластер, использующий криогенный холод соседнего СПГ-регазификационного терминала как основное охлаждение — почти нулевая предельная стоимость. Энергоснабжение — газотурбинная станция с интеграцией солнечной генерации, структурировано под зелёные облигации.",
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
        text: "NVIDIA H200 SXM (HBM3e, 141 ГБ, 4,8 ТБ/с) с NVLink 4.0 для обучения и инференса. Открытый экзафлопсный стек — Slurm + OpenMPI, ROCm/CUDA OSS, OpenStack, Lustre/GPFS — суверенно, аудируемо, без vendor lock-in.",
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
        text: "В соответствии с Vision 2030: AI Agent Factory переиспользуемых доменных госагентов, Smart Data Ukimet на базе 400+ национальных баз, проактивная Digital Family Card и программа повышения квалификации госслужащих по ИИ и данным.",
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
        text: "Обмен данными, цифровая идентичность и безбумажные госуслуги, экспортируемые в три региона через Scalable Solution Modules — включая совместное участие в тендерах Всемирного банка и ADB. Финтех и сертификация через Pixel DMC; миграция в облако с Dataset, Eagale Soft и KT Cloud Lab.",
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
    sub: "Мост между Центральной Азией и миром — там, где спрос развивающихся рынков встречается с институциональным капиталом.",
    items: [
      { name: "Центральная Азия", desc: "База в Казахстане — суверенный HPC, GovTech и зелёные дата-центры." },
      { name: "MENA", desc: "Саудовская Аравия — GovTech-лаборатории, соответствие Vision 2030, GRC-партнёрства." },
      { name: "Южная Азия", desc: "Пакистан — экспорт GovTech, платёжные шлюзы и дистрибуция сертификаций." },
      { name: "Африка", desc: "Инфраструктура развивающихся рынков, ESG-инвестиции и развитие компетенций." },
    ],
  },
  partners: {
    eyebrow: "Партнёры",
    heading: "Экосистема государств, науки и капитала.",
    sub: "Сгруппированы по роли — от государственной инфраструктуры до GRC, устойчивого развития и выхода на рынки.",
    groups: [
      { name: "Государство и инфраструктура", members: ["NITEC", "KT Cloud Lab", "Ghalam", "SpaceLab"] },
      { name: "Технологии и облако", members: ["KazDream", "MyCloud", "AiMap", "Eagale Soft", "InfoTech", "Pixel DMC"] },
      { name: "Наука и образование (DeepTech origin)", members: ["King Saud University", "Вузы и НИИ Казахстана", "Artisan Education"] },
      { name: "GRC, аудит и устойчивое развитие", members: ["PNOD Auditing Co.", "MSTDAM"] },
      { name: "Торговля и выход на рынки", members: ["QazTrade", "Партнёры MENA", "Партнёры Южной Азии", "Партнёры Африки"] },
    ],
    spotlight: [
      {
        name: "PNOD Auditing Co.",
        role: "GRC, аудит и управление ИИ (14 лет экспертизы; ISO/IEC 42001), глубокое знание регуляторной среды Саудовской Аравии. Со-учредитель совместного предприятия Miras Accelerator.",
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
        role: "Якорный академический партнёр в Саудовской Аравии — DeepTech-исследования, совместные НИОКР и Saudi AI & GovTech Lab.",
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
        text: "По принципу конвоя — приоритет на People (команду), Process (процесс) и Product (продукт).",
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
        text: "НИОКР, пилотные внедрения и программы открытых инноваций для корпоративных клиентов.",
      },
    ],
  },
  certifications: {
    eyebrow: "Сертификаты и соответствие",
    heading: "Сигналы доверия — подтверждённые.",
    sub: "Постоянная строка доверия для всех аудиторий — качество, экология, инфраструктура и управление.",
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
    tagline: "Глубокотехнологичные венчуры из Центральной Азии — для всего мира.",
    company: "Компания",
    audiences: "Аудитории",
    contactTitle: "Контакты",
    rights: "NSART · Technology Interaction. Все права защищены.",
    confidential:
      "Раздел Miras Accelerator представлен только на публичном уровне — без бюджетов, целевых сумм фондов и внутренних деталей.",
  },
  investorsPage: {
    badge: "Институциональным и импакт-инвесторам",
    title: "Инвестируйте в суверенную глубокотехнологичную инфраструктуру по повестке ЦУР.",
    intro:
      "Мы структурируем и снижаем риски инвестиций в зелёные дата-центры, ИИ-вычисления и GovTech на развивающихся рынках — на принципах ESG, этичного ИИ и международной сертификации. Акселератор Miras — наш специализированный механизм привлечения капитала.",
    ctas: ["Инвестиционная стратегия", "Акселератор Miras", "Запросить ESG-бриф по почте"],
    audienceNote:
      "Для IsDB, EBRD, ADB, Всемирного банка, фондов под эгидой ООН и частных импакт-инвесторов.",
    sdg: {
      heading: "В соответствии с Целями устойчивого развития ООН",
      sub: "NSART и акселератор Miras находятся на пересечении признанных мандатов — привязка к ЦУР делается без раскрытия финансовых параметров.",
      items: [
        { goal: "ЦУР 4 и 9", desc: "Образование, технологии, промышленность и инновации — подготовка инженеров, трансфер технологий." },
        { goal: "ЦУР 7 и 13", desc: "Чистая энергия и климат — зелёный дата-центр, солнечная генерация, снижение углеродного следа." },
        { goal: "ЦУР 8", desc: "Достойный труд и экономический рост — поддержка МСП и создание рабочих мест." },
        { goal: "ЦУР 11", desc: "Устойчивые города — умная инфраструктура и GovTech." },
        { goal: "ЦУР 17", desc: "Партнёрства — многосторонние соглашения с институтами развития и госорганами." },
      ],
    },
    esg: {
      heading: "ESG и зелёное финансирование",
      sub: "Прямой язык банков развития.",
      points: [
        { title: "Tamdy Cloud, PUE ~1,2", text: "Криогенный холод СПГ как основное охлаждение, интеграция солнечной генерации." },
        { title: "Готовность к зелёным облигациям", text: "Структурировано под green bonds и мандаты банков развития." },
        { title: "Этичный ИИ и приватность", text: "Прозрачность, отсутствие предвзятости, человеческий контроль; обработка данных в логике GDPR." },
        { title: "Суверенные открытые стеки", text: "Аудируемо, без vendor lock-in." },
      ],
    },
    metricsHeading: "Цифры",
    cta: { heading: "Запросите инвест-материалы", text: "One-pager и дек по e-mail. Конфиденциальные параметры онлайн не публикуются.", button: "Связаться с инвест-командой" },
  },
  enterprisePage: {
    badge: "Частному и государственному сектору",
    title: "Технологии, отвечающие вашим стандартам — национальным и международным.",
    intro:
      "От суверенных дата-центров и ИИ-вычислений до GovTech-платформ — мы проектируем, строим и сертифицируем технологии для государственного и частного секторов, а также находим, оцениваем и внедряем новые разработки в ваши процессы.",
    ctas: ["Запросить технологический аудит", "Запустить пилот", "AI-услуги"],
    services: {
      heading: "Каталог услуг",
      items: [
        { title: "AI-системы", text: "Доменные агенты, ML и системы принятия решений на суверенных вычислениях." },
        { title: "Умная инфраструктура", text: "Высокоплотные энергоэффективные вычисления и связность." },
        { title: "GovTech", text: "Цифровая идентичность, обмен данными и безбумажные услуги." },
        { title: "Сертификация дата-центров", text: "TIA-942 и Uptime Tier III/IV — полный цикл." },
        { title: "Корпоративные инновации", text: "Технологический скаутинг и интеграция в ваши процессы." },
        { title: "SpaceTech / NajmSat", text: "Отличительная космическая компетенция — спутниковые и наземные системы." },
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
      heading: "Низкопороговый пилот",
      text: "PoC за 6–8 недель с понятным шаблоном объёма работ — проверьте до того, как принять обязательства.",
      button: "Запустить пилот",
    },
  },
  foundersPage: {
    badge: "Основателям, университетам и R&D-центрам",
    title: "От исследования к выручке — защитите, оцените и развивайте нематериальные активы.",
    intro:
      "Для стартапов, зрелых компаний, университетов и R&D-центров: мы ведём полный жизненный цикл интеллектуальной собственности — оценку, защиту и определение стоимости — и открываем путь к инвестициям и развитию бизнеса через акселератор Miras.",
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
      items: ["ПО", "Цифровые сервисы", "Агропромышленные комплексы", "Результаты НИОКР", "Космические технологии"],
    },
    university: {
      heading: "Отдельный трек для университетов и R&D-центров",
      text: "DeepTech origin — трансфер технологий, спин-офф из науки, защита и коммерциализация результатов исследований.",
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
      "NSART — венчурная студия, специализирующаяся на DeepTech-проектах: поиск инвестиционных возможностей, построение стратегических партнёрств, структурирование венчуров и выход на рынки Центральной Азии, MENA, Южной Азии и Африки.",
    missionHeading: "Наша миссия",
    missionText:
      "Соединить науку и коммерцию: брать зрелые исследования, превращать их в венчурно-готовые компании и подключать их к международному капиталу и институциональным мандатам.",
    valuesHeading: "Что мы отстаиваем",
    values: [
      { title: "Суверенно по дизайну", text: "Открытые стеки, без vendor lock-in, аудит для регуляторов и инвесторов." },
      { title: "Доказательства, а не риторика", text: "Каждое утверждение подкреплено сертификатом, метрикой или развёрнутым кейсом." },
      { title: "В соответствии с глобальными мандатами", text: "ЦУР, ESG, готовность к капиталу банков развития." },
      { title: "Многоязычность по умолчанию", text: "EN · AR · RU · KK — для рынков, где мы работаем." },
    ],
  },
  technologiesPage: {
    badge: "Технологический стек",
    title: "Глубокие технологии — спроектированы и сертифицированы.",
    intro:
      "От суверенных дата-центров и ИИ-вычислений до GovTech и умной инфраструктуры — по международным стандартам, с возможностью аудита и интеграции с государственными и корпоративными средами.",
    pillars: [
      {
        title: "Искусственный интеллект",
        text: "AI Agent Factory, доменные госагенты, ML на озёрах данных в реальном времени и обучение крупных моделей на суверенной GPU-инфраструктуре (NVIDIA H200, открытый экзафлопсный стек).",
        items: ["Agent Factory", "Доменные LLM", "Real-time ML", "Суверенный GPU"],
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
        text: "Tamdy Cloud — проект под Tier III/IV, PUE ~1,2, криогенный холод СПГ и лидирующая в Центральной Азии практика TIA-942 / Uptime.",
        items: ["TIA-942", "Uptime Tier III/IV", "PUE ~1,2", "Криогенный холод СПГ"],
      },
    ],
  },
  ipPage: {
    badge: "Интеллектуальная собственность и нематериальные активы",
    title: "Защитите, оцените и монетизируйте свои нематериальные активы.",
    intro:
      "Полное сопровождение жизненного цикла интеллектуальной собственности — ПО, цифровые сервисы, результаты НИОКР, агропромышленные комплексы, космические технологии. От аудита и защиты до оценки, лицензирования и пути к инвестициям.",
    lifecycleHeading: "Жизненный цикл ИС",
    steps: [
      { n: "1", title: "Оценка", text: "Аудит активов и скоринг готовности (TRL / CRL / MRL); выявление охраноспособных объектов." },
      { n: "2", title: "Защита", text: "Патенты, товарные знаки, ноу-хау, регистрация ПО, стратегия в нескольких юрисдикциях." },
      { n: "3", title: "Стоимость", text: "Оценка методами DCF и рыночных аналогов — для сделок, привлечения средств и партнёрств." },
      { n: "4", title: "Монетизация", text: "Лицензирование, структурирование сделок и выход на инвестиции через Miras Accelerator." },
    ],
    assetsHeading: "Типы активов",
    assets: ["ПО", "Цифровые сервисы", "Результаты НИОКР", "Агропромышленные комплексы", "Космические технологии"],
    ctaHeading: "Выведите активы на следующий этап.",
    ctaText: "Начните с оценки ИС — мы составим карту портфеля и подскажем оптимальный путь защиты и монетизации.",
    ctaButton: "Заказать оценку ИС",
  },
  marketsPage: {
    badge: "География работы",
    title: "Четыре региона. Один мост.",
    intro:
      "NSART работает на пересечении спроса развивающихся рынков и институционального капитала — Центральная Азия как база, Саудовская Аравия и MENA как коридор роста, Южная Азия и Африка как горизонт экспансии.",
    regionsHeading: "Регионы",
    regions: [
      {
        name: "Центральная Азия",
        kicker: "База",
        desc: "Казахстан: суверенный HPC, GovTech-референс и зелёные дата-центры. 20+ лет опыта электронного правительства, Top-25 рейтинг ООН по e-Gov.",
      },
      {
        name: "MENA",
        kicker: "Коридор роста",
        desc: "Саудовская Аравия: GovTech-лаборатории по повестке Vision 2030, GRC-партнёрства с PNOD и совместное предприятие Miras Accelerator.",
      },
      {
        name: "Южная Азия",
        kicker: "Экспансия",
        desc: "Пакистан: экспорт GovTech совместно с NITEC + InfoTech, платёжные шлюзы через Pixel DMC, дистрибуция сертификаций.",
      },
      {
        name: "Африка",
        kicker: "Фронтир",
        desc: "Инфраструктура развивающихся рынков, ESG-инвестиции, развитие компетенций и Scalable Solution Modules для правительств.",
      },
    ],
    gatewayHeading: "NSART Gateway",
    gatewayText:
      "Специализированный продукт для выхода на рынки Центральной Азии, Южной Азии, MENA и Африки — локальное присутствие, регуляторная навигация и партнёрские экосистемы.",
  },
  partnersPage: {
    badge: "Экосистема",
    title: "Экосистема государств, науки и капитала.",
    intro:
      "Мы работаем с пятью группами партнёров — государство и инфраструктура, технологии и облако, наука и образование, GRC и устойчивое развитие, торговля и выход на рынки.",
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
    location: "Алматы, Казахстан",
    privacy: "Отправляя форму, вы соглашаетесь, что мы можем с вами связаться. Мы не передаём данные третьим лицам.",
  },
  mirasPage: {
    badge: "Совместное предприятие · NSART × PNOD",
    title: "Miras Accelerator — инфраструктура коммерциализации глубоких технологий.",
    intro:
      "Совместное предприятие NSART и PNOD, Miras помогает зрелым технологиям преодолеть разрыв готовности — соединяя инженерию глубоких технологий с управлением и комплаенсом, полным сопровождением жизненного цикла ИС и путём к инвестициям, в соответствии с Vision 2030, повесткой ОИС и ЦУР ООН.",
    ctas: ["О Miras", "Подать заявку в трек", "Стать партнёром"],
    problem: {
      heading: "Какой разрыв закрывает Miras",
      text: "Технология может быть научно зрелой, но у организации не хватает коммерческой, регуляторной и производственной инфраструктуры для внедрения. Miras закрывает этот разрыв через модель готовности по трём измерениям.",
      dims: [
        { code: "TRL", title: "Технологическая готовность", q: "Доказана ли технология в нужном масштабе?" },
        { code: "CRL", title: "Коммерческая готовность", q: "Есть ли путь к выручке, ценообразование и контрактная модель?" },
        { code: "MRL", title: "Производственная готовность", q: "Можно ли произвести, сертифицировать и поставить продукт?" },
      ],
    },
    tracks: {
      heading: "Три трека",
      items: [
        { n: "Трек 1", title: "Deep-Tech Cohort", text: "Акселерация команд от диагностики до подготовки к инвестициям и демо-дню." },
        { n: "Трек 2", title: "Regulatory Sandbox", text: "Тестирование решений в регулируемой среде — CleanTech, GovTech, агентный ИИ, дата-маркетплейс — на суверенной GPU-инфраструктуре." },
        { n: "Трек 3", title: "IP Portfolio & Founders", text: "Полный жизненный цикл ИС и развитие основателей — от диагностики до лицензирования и витрины ИС." },
      ],
    },
    positioning: {
      heading: "Стратегическое позиционирование",
      text: "Miras выстроен на пересечении признанных мандатов — Saudi Vision 2030, повестки ОИС, Digital Cooperation Organization и Целей устойчивого развития ООН. Это язык, понятный институтам развития, и его можно использовать без раскрытия коммерческих параметров.",
    },
    confidential:
      "Конфиденциальность: раздел держится на публичном уровне. Бюджеты, целевые суммы фондов, имена руководителей и советников, конкретные инвесторы и детали обращений к госорганам — внутренние данные.",
  },
};

/* ------------------------------------------------------------------ */
/*  Arabic — marketing-critical copy (brief); EN fallback elsewhere   */
/* ------------------------------------------------------------------ */

const ar: DeepPartial<Dictionary> = {
  meta: {
    title: "NSART · التفاعل التقني",
    description:
      "مشاريع تقنية عميقة من آسيا الوسطى إلى العالم. البحث والتطوير، والملكية الفكرية، والبنية التحتية الاستثمارية في كازاخستان والمملكة العربية السعودية وأفريقيا.",
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
      "البحث والتطوير، والملكية الفكرية، والبنية التحتية الاستثمارية في كازاخستان والمملكة العربية السعودية وأفريقيا.",
    ctaPrimary: "اختر مسارك",
    ctaSecondary: "استكشف مسرّعة مِراس",
    stats: [
      { value: "10–100 ميجاوات", label: "السعة الحاسوبية المخطّطة لـ Tamdy Cloud" },
      { value: "PUE ~1,2", label: "كفاءة الطاقة — من بين الأفضل عالميًا" },
      { value: "Top-25", label: "كازاخستان في تصنيف الأمم المتحدة للحكومة الإلكترونية" },
      { value: "4 مناطق", label: "آسيا الوسطى · MENA · جنوب آسيا · أفريقيا" },
    ],
  },
  technologies: {
    eyebrow: "التقنيات",
    heading: "نُصمّم ونبني ونعتمد التقنيات العميقة.",
    sub: "من مراكز البيانات السيادية والحوسبة بالذكاء الاصطناعي إلى منصّات الحكومة الرقمية — وفق المعايير الدولية وقابلة للتدقيق.",
    items: [
      { title: "الذكاء الاصطناعي", text: "مصنع وكلاء الذكاء الاصطناعي، وكلاء حكوميون متخصّصون، تعلّم آلي على بحيرات بيانات لحظية، وتدريب نماذج كبيرة على بنية GPU سيادية." },
      { title: "البنية التحتية الذكية", text: "حوسبة خضراء عالية الكثافة — عناقيد NVIDIA H200، حزم برمجية مفتوحة بأداء إكزافلوبس، وتصميم موفّر للطاقة." },
      { title: "الحكومة الرقمية", text: "أكثر من 20 عامًا من الخبرة في الحكومة الإلكترونية كموديولات قابلة للتوسيع: الهوية الرقمية وتبادل البيانات والخدمات الإلكترونية." },
      { title: "مراكز البيانات", text: "Tamdy Cloud — تصميم Tier III/IV، PUE ~1,2، تبريد بالغاز المسال، والممارسة الرائدة في TIA-942 / Uptime في آسيا الوسطى." },
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
        title: "تقنيات عميقة سيادية متوافقة مع أهداف التنمية المستدامة",
        text: "محفظة تقنيات عميقة متوافقة مع أهداف التنمية المستدامة، ومسرّعة مِراس، وأطر ESG والذكاء الاصطناعي الأخلاقي.",
        href: "/investors",
        cta: "أطروحتنا الاستثمارية",
      },
      {
        key: "enterprise",
        tag: "للشركات والحكومات",
        title: "تقنية تلبّي معاييرك",
        text: "الذكاء الاصطناعي والحكومة الرقمية والبنية التحتية الذكية ومراكز البيانات السيادية، معتمدة وفق المعايير الدولية.",
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
    heading: "بنية تحتية لتسويق التقنيات العميقة.",
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
        title: "Tamdy Cloud",
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
        title: "حوسبة سيادية بأداء إكزافلوبس",
        location: "كازاخستان · حزمة برمجية مفتوحة",
        status: "عاملة",
        text: "NVIDIA H200 SXM (HBM3e، 141 جيجابايت، 4,8 تيرابايت/ث) مع NVLink 4.0 للتدريب والاستدلال. حزمة إكزافلوبس مفتوحة — Slurm + OpenMPI، ROCm/CUDA OSS، OpenStack، Lustre/GPFS — سيادية، قابلة للتدقيق، دون قفل المورد.",
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
      { name: "آسيا الوسطى", desc: "كازاخستان: HPC سيادي، مرجع GovTech، ومراكز بيانات خضراء." },
      { name: "MENA", desc: "السعودية: مختبرات GovTech بما يتوافق مع رؤية 2030 وشراكات GRC." },
      { name: "جنوب آسيا", desc: "باكستان: تصدير الحكومة الرقمية، بوّابات مالية، وتوزيع شهادات." },
      { name: "أفريقيا", desc: "بنية تحتية للأسواق الناشئة، استثمار متوافق مع ESG، وبناء القدرات." },
    ],
  },
  partners: {
    eyebrow: "الشركاء",
    heading: "منظومة من الحكومات والعلم ورأس المال.",
    sub: "مُجمَّعة حسب الدور — من البنية التحتية الحكومية إلى GRC والاستدامة ودخول الأسواق.",
    groups: [
      { name: "الحكومة والبنية التحتية", members: ["NITEC", "KT Cloud Lab", "Ghalam", "SpaceLab"] },
      { name: "التقنية والسحابة", members: ["KazDream", "MyCloud", "AiMap", "Eagale Soft", "InfoTech", "Pixel DMC"] },
      { name: "العلم والتعليم (DeepTech)", members: ["جامعة الملك سعود", "جامعات ومعاهد كازاخستان", "Artisan Education"] },
      { name: "GRC والتدقيق والاستدامة", members: ["PNOD Auditing Co.", "MSTDAM"] },
      { name: "التجارة ودخول الأسواق", members: ["QazTrade", "شركاء MENA", "شركاء جنوب آسيا", "شركاء أفريقيا"] },
    ],
    spotlight: [
      { name: "PNOD Auditing Co.", role: "GRC والتدقيق وحوكمة الذكاء الاصطناعي (14 عامًا من الخبرة؛ ISO/IEC 42001)، مع معرفة عميقة بالبيئة التنظيمية السعودية. شريك مؤسّس لمشروع مسرّعة مِراس." },
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
    title: "استثمر في بنية تحتية سيادية للتقنيات العميقة متوافقة مع أهداف التنمية المستدامة.",
    intro:
      "نُهيكل الاستثمارات ونُقلّل مخاطرها في مراكز البيانات الخضراء والحوسبة بالذكاء الاصطناعي والحكومة الرقمية عبر الأسواق الناشئة — مبنية على مبادئ ESG والذكاء الاصطناعي الأخلاقي والاعتماد الدولي. مسرّعة مِراس هي أداتنا المخصّصة لجمع رأس المال.",
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
        { title: "Tamdy Cloud، PUE ~1,2", text: "تبريد رئيسي بالغاز المسال مع توليد شمسي مدمج." },
        { title: "جاهزية السندات الخضراء", text: "مهيّكل للسندات الخضراء ومهمّات بنوك التنمية." },
        { title: "ذكاء اصطناعي أخلاقي وخصوصية", text: "الشفافية وعدم الانحياز والإشراف البشري؛ معالجة بيانات على نمط GDPR." },
        { title: "حزم مفتوحة سيادية", text: "قابلة للتدقيق، دون قفل المورد." },
      ],
    },
    metricsHeading: "الأرقام",
    cta: { heading: "اطلب مواد المستثمرين", text: "صفحة واحدة ومستند تقديمي بالبريد. لا تُنشر معايير سرية على الإنترنت.", button: "تواصل مع فريق الاستثمار" },
  },
  enterprisePage: {
    badge: "للقطاعين العام والخاص",
    title: "تقنية تلبّي معاييرك — الوطنية والدولية.",
    intro:
      "من مراكز البيانات السيادية والحوسبة بالذكاء الاصطناعي إلى منصّات الحكومة الرقمية، نُصمّم ونبني ونعتمد التقنية للقطاعين العام والخاص — ونستكشف الابتكارات الناشئة ونقيّمها وندمجها في عملياتكم.",
    ctas: ["اطلب تدقيقًا تقنيًا", "ابدأ مشروعًا تجريبيًا", "استكشف خدمات الذكاء الاصطناعي"],
    services: {
      heading: "كتالوج الخدمات",
      items: [
        { title: "أنظمة الذكاء الاصطناعي", text: "وكلاء متخصّصون، تعلّم آلي، وأنظمة قرار على حوسبة سيادية." },
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
    title: "مسرّعة مِراس — بنية تحتية لتسويق التقنيات العميقة.",
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
        { n: "المسار 2", title: "Regulatory Sandbox", text: "اختبار الحلول في بيئة منظّمة — CleanTech، GovTech، الذكاء الاصطناعي الوكيلي، سوق البيانات — على بنية GPU سيادية." },
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
      { title: "السيادة بالتصميم", text: "حزم مفتوحة دون قفل المورد، قابلة للتدقيق من المنظّمين والمستثمرين." },
      { title: "الأدلّة قبل البلاغة", text: "كل ادّعاء مدعوم بشهادة أو مقياس أو مرجع منشور." },
      { title: "بما يتوافق مع المهمّات العالمية", text: "متوافق مع أهداف التنمية المستدامة وجاهز لـESG ومُهيّكل لرأس مال بنوك التنمية." },
      { title: "متعدّد اللغات افتراضيًا", text: "EN · AR · RU · KK — مبني للأسواق التي نخدمها." },
    ],
  },
  technologiesPage: {
    badge: "حزمة التقنية",
    title: "تقنية عميقة — مُهندَسة ومُعتمَدة.",
    intro: "من مراكز البيانات السيادية وحوسبة الذكاء الاصطناعي إلى الحكومة الرقمية والبنية التحتية الذكية — وفق المعايير الدولية وقابلة للتدقيق من النهاية إلى النهاية.",
    pillars: [
      { title: "الذكاء الاصطناعي", text: "مصنع وكلاء الذكاء الاصطناعي، وكلاء حكوميون متخصّصون، تعلّم آلي على بحيرات بيانات لحظية، وتدريب نماذج كبيرة على بنية GPU سيادية (NVIDIA H200).", items: ["Agent Factory", "Domain LLMs", "Real-time ML", "Sovereign GPU"] },
      { title: "البنية التحتية الذكية", text: "حوسبة عالية الكثافة، شبكات AIoT وM2M، منصّات التوائم الرقمية والاتصال للبيئات الحضرية والصناعية.", items: ["AIoT & M2M", "Digital Twins", "Smart Field", "تصميم موفّر للطاقة"] },
      { title: "الحكومة الرقمية", text: "أكثر من 20 عامًا من خبرة الحكومة الإلكترونية كموديولات: الهوية الرقمية وتبادل البيانات والخدمات الإلكترونية والأمن السيبراني.", items: ["e-Gov", "Digital ID", "Data exchange", "Cyber Security"] },
      { title: "مراكز البيانات", text: "Tamdy Cloud — تصميم Tier III/IV، PUE ~1,2، تبريد بالغاز المسال، والممارسة الرائدة في TIA-942 / Uptime في آسيا الوسطى.", items: ["TIA-942", "Uptime Tier III/IV", "PUE ~1,2", "تبريد بالغاز المسال"] },
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
      { name: "آسيا الوسطى", kicker: "المقر الرئيسي", desc: "كازاخستان: HPC سيادي ومرجع GovTech ومراكز بيانات خضراء. أكثر من 20 عامًا من خبرة الحكومة الإلكترونية وتصنيف Top-25 لدى الأمم المتحدة." },
      { name: "MENA", kicker: "ممر النمو", desc: "السعودية: مختبرات GovTech بما يتوافق مع رؤية 2030 وشراكات GRC مع PNOD ومسرّعة مِراس." },
      { name: "جنوب آسيا", kicker: "التوسّع", desc: "باكستان: تصدير GovTech مع NITEC + InfoTech، بوّابات مالية عبر Pixel DMC، توزيع شهادات." },
      { name: "أفريقيا", kicker: "الجبهة", desc: "بنية تحتية للأسواق الناشئة، استثمار متوافق مع ESG، بناء قدرات، وموديولات حلول قابلة للتوسيع." },
    ],
    gatewayHeading: "NSART Gateway",
    gatewayText: "منتج مخصّص لدخول أسواق آسيا الوسطى وجنوب آسيا وMENA وأفريقيا — مع حضور محلي وملاحة تنظيمية ومنظومات شريكة.",
  },
  partnersPage: {
    badge: "المنظومة",
    title: "منظومة من الحكومات والعلم ورأس المال.",
    intro: "نعمل عبر خمس مجموعات شركاء — الدولة والبنية التحتية، التقنية والسحابة، العلم والتعليم، GRC والاستدامة، التجارة ودخول الأسواق.",
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
    location: "ألماتي، كازاخستان",
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
      "Орталық Азиядан әлемге — терең технологиялық венчурлар. Қазақстан, Сауд Арабиясы және Африкадағы ҒЗТКЖ, зияткерлік меншік және инвестициялық инфрақұрылым.",
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
    title: "Орталық Азиядан әлемге — терең технологиялық венчурлар.",
    subtitle:
      "Қазақстан, Сауд Арабиясы және Африкадағы ҒЗТКЖ, зияткерлік меншік және инвестициялық инфрақұрылым.",
    ctaPrimary: "Жолыңызды таңдаңыз",
    ctaSecondary: "Miras акселераторы",
    stats: [
      { value: "10–100 МВт", label: "Tamdy Cloud жоспарлы IT-қуаты" },
      { value: "PUE ~1,2", label: "Энергия тиімділігі — әлемдегі үздіктердің бірі" },
      { value: "Top-25", label: "Қазақстан БҰҰ-ның e-Gov рейтингінде" },
      { value: "4 өңір", label: "Орталық Азия · MENA · Оңтүстік Азия · Африка" },
    ],
  },
  technologies: {
    eyebrow: "Технологиялар",
    heading: "Терең технологияларды жобалаймыз, құрамыз және сертификаттаймыз.",
    sub: "Егемен деректер орталықтарынан және ЖИ-есептеулерден GovTech платформаларына дейін — халықаралық стандарттар бойынша, аудитке жарамды.",
    items: [
      { title: "Жасанды интеллект", text: "AI Agent Factory, мемлекеттік доменді агенттер, real-time деректер көлдеріндегі ML және егемен GPU-инфрақұрылымда ірі модельдерді оқыту." },
      { title: "Ақылды инфрақұрылым", text: "Жоғары тығыздықты жасыл есептеулер — NVIDIA H200 кластерлері, ашық экзафлопстық стектер, энергия тиімді дизайн." },
      { title: "GovTech", text: "Электрондық үкіметтегі 20+ жыл тәжірибе масштабталатын модульдер ретінде — цифрлық сәйкестік, деректер алмасу, қағазсыз қызметтер." },
      { title: "Деректер орталықтары", text: "Tamdy Cloud — Tier III/IV жобасы, PUE ~1,2, СПГ криогендік суыту және Орталық Азиядағы TIA-942 / Uptime көшбасшы тәжірибесі." },
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
      { n: "02", title: "Venture Development", sub: "Интеграцияланған даму циклі", text: "Толық венчурлық цикл — идеядан масштабтауға дейін.", tags: ["Value Creation", "Value Protection", "Structuring", "Operations"] },
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
      { period: "2023–қазіргі уақыт", title: "Толық циклді венчурлік студия" },
    ],
  },
  products: {
    eyebrow: "Өнімдер",
    heading: "Біз нені жеткіземіз.",
    items: [
      { title: "NSART Gateway", text: "Орталық Азия, Оңтүстік Азия, MENA және Африка нарықтарына шығу." },
      { title: "NSART Corporate Innovations", text: "ҒЗТКЖ, пилоттық енгізулер және корпоративтік клиенттер үшін ашық инновация бағдарламалары." },
    ],
  },
  audience: {
    eyebrow: "Үш кіру нүктесі",
    heading: "Технологияны бағалау тәсіліңізге сай жасалған.",
    sub: "Инвесторлар, клиенттер мен құрылтайшылар әртүрлі сенім сигналдарын іздейді. Өзіңізге сай жолды таңдаңыз.",
    cards: [
      {
        key: "investors",
        tag: "Инвесторларға",
        title: "ТДМ-ге сай егемен терең технологиялар",
        text: "ТДМ-ге сай терең технологиялар портфелі, Miras акселераторы, ESG және этикалық ЖИ қағидаттары.",
        href: "/investors",
        cta: "Инвестициялық стратегия",
      },
      {
        key: "enterprise",
        tag: "Бизнес пен мемлекетке",
        title: "Стандарттарыңызға сай технологиялар",
        text: "ЖИ, GovTech, ақылды инфрақұрылым және халықаралық стандарттармен сертификатталған егемен деректер орталықтары.",
        href: "/enterprise",
        cta: "Қызметтерді қарау",
      },
      {
        key: "founders",
        tag: "Құрылтайшылар мен R&D",
        title: "Зерттеуден кіріске дейін",
        text: "Зияткерлік меншіктің толық өмірлік циклі, бағалау және инвестицияға қолжетімділік — құрылтайшылар, университеттер мен ҒЗТКЖ орталықтарына.",
        href: "/founders",
        cta: "ЗМ бағалауы",
      },
    ],
  },
  mirasTeaser: {
    eyebrow: "Miras Accelerator",
    heading: "Терең технологияларды коммерцияландыру инфрақұрылымы.",
    text: "NSART пен PNOD-тың бірлескен кәсіпорны Miras жетілген технологияларға дайындық алшақтығын еңсеруге көмектеседі — терең технологиялар инженериясын басқару мен комплаенспен, ЗМ-нің толық өмірлік циклін сүйемелдеумен және инвестицияға жол ашумен ұштастырады.",
    aligned: "Vision 2030, ОИС, Digital Cooperation Organization және БҰҰ ТДМ-ге сай.",
    cta: "Miras туралы",
  },
  cases: {
    eyebrow: "Уәде емес — дәлел",
    heading: "Таңдаулы жобалар, 2024–2025.",
    sub: "Қазақстан, Сауд Арабиясы және одан тыс жерлердегі нақты жобалар — біздің ең күшті дәлеліміз.",
    items: [
      {
        tag: "Жасыл есептеулер",
        title: "Tamdy Cloud",
        location: "Құрық АЭА, Маңғыстау · Tier III/IV жобасы",
        status: "Әзірленуде",
        text: "Көршілес СПГ регазификация терминалының криогендік суығын негізгі суыту ретінде пайдаланатын жасыл энерго-цифрлық кластер — суытудың шекті құны нөлге жуық. Күн генерациясы біріктірілген газ-турбиналық станциядан қуат алады, жасыл облигациялар бойынша құрылымдалған.",
        metrics: [
          { v: "10–100 МВт", l: "Жоспарлы IT-қуат" },
          { v: "PUE ~1,2", l: "Мақсатты тиімділік" },
          { v: "500 стойка", l: "Бастапқы сыйымдылық, оның ішінде AI/HPC" },
          { v: "Tier III/IV", l: "Uptime + TIA-942 сертификаттау жолы" },
        ],
      },
      {
        tag: "HPC және ЖИ",
        title: "Егемен экзафлопстық есептеулер",
        location: "Қазақстан · ашық стек",
        status: "Жұмыс істеп тұр",
        text: "NVIDIA H200 SXM (HBM3e, 141 ГБ, 4,8 ТБ/с) NVLink 4.0 — оқыту мен инференске. Ашық экзафлопстық стек — Slurm + OpenMPI, ROCm/CUDA OSS, OpenStack, Lustre/GPFS — егемен, аудитке жарамды, vendor lock-in жоқ.",
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
        text: "Vision 2030-ға сай: қайта пайдаланылатын доменді мемлекеттік агенттердің AI Agent Factory, 400+ ұлттық деректер базасы негізіндегі Smart Data Ukimet, белсенді Digital Family Card және мемлекеттік қызметкерлерге ЖИ мен деректер бойынша біліктілікті арттыру бағдарламасы.",
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
        text: "Деректер алмасу, цифрлық сәйкестік және қағазсыз мемлекеттік қызметтер Scalable Solution Modules арқылы үш өңірге экспортталады — оның ішінде Дүниежүзілік банк пен ADB тендерлеріне бірлесіп қатысу.",
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
    sub: "Орталық Азия мен әлем арасындағы көпір — дамушы нарық сұранысы институционалдық капиталмен кездесетін жер.",
    items: [
      { name: "Орталық Азия", desc: "Қазақстандағы база — егемен HPC, GovTech және жасыл деректер орталықтары." },
      { name: "MENA", desc: "Сауд Арабиясы — GovTech лабораториялары, Vision 2030 сәйкестігі, GRC серіктестіктері." },
      { name: "Оңтүстік Азия", desc: "Пәкістан — GovTech экспорты, төлем шлюздары және сертификаттарды тарату." },
      { name: "Африка", desc: "Дамушы нарықтардың инфрақұрылымы, ESG-инвестициялар және құзыреттіліктерді дамыту." },
    ],
  },
  partners: {
    eyebrow: "Серіктестер",
    heading: "Мемлекеттер, ғылым және капитал экожүйесі.",
    sub: "Рөлдер бойынша топтастырылған — мемлекеттік инфрақұрылымнан GRC, тұрақты даму мен нарықтарға шығуға дейін.",
    groups: [
      { name: "Мемлекет және инфрақұрылым", members: ["NITEC", "KT Cloud Lab", "Ghalam", "SpaceLab"] },
      { name: "Технологиялар және бұлт", members: ["KazDream", "MyCloud", "AiMap", "Eagale Soft", "InfoTech", "Pixel DMC"] },
      { name: "Ғылым және білім (DeepTech)", members: ["King Saud University", "Қазақстан жоғары оқу орындары", "Artisan Education"] },
      { name: "GRC, аудит және тұрақты даму", members: ["PNOD Auditing Co.", "MSTDAM"] },
      { name: "Сауда және нарықтарға шығу", members: ["QazTrade", "MENA серіктестері", "Оңтүстік Азия серіктестері", "Африка серіктестері"] },
    ],
    spotlight: [
      { name: "PNOD Auditing Co.", role: "GRC, аудит және ЖИ басқару (14 жыл тәжірибе; ISO/IEC 42001), Сауд Арабиясының реттеуші ортасын терең білу. Miras Accelerator бірлескен кәсіпорнының тең құрылтайшысы." },
      { name: "MSTDAM", role: "Экологиялық тұрақтылық платформасы — көміртегі ізін өлшеу, ағаш отырғызу, ESG есептілігі (Сауд Арабиясы). «Жасыл» күн тәртібі мен ESG бойынша серіктес." },
      { name: "NITEC", role: "Ұлттық ақпараттық технологиялар — Қазақстанның электрондық үкімет сервистері мен цифрлық сәйкестік инфрақұрылымының мемлекеттік операторы." },
      { name: "King Saud University", role: "Сауд Арабиясындағы DeepTech зерттеулер, бірлескен ҒЗТКЖ және Saudi AI & GovTech Lab бойынша негізгі академиялық серіктес." },
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
    tagline: "Орталық Азиядан әлемге — терең технологиялық венчурлар.",
    company: "Компания",
    audiences: "Аудиториялар",
    contactTitle: "Байланыс",
    rights: "NSART · Technology Interaction. Барлық құқықтар қорғалған.",
  },
  investorsPage: {
    badge: "Институционалдық және импакт-инвесторларға",
    title: "ТДМ-ге сай егемен терең технологиялық инфрақұрылымға инвестиция салыңыз.",
    intro:
      "Біз дамушы нарықтардағы жасыл деректер орталықтарына, ЖИ есептеулеріне және GovTech-ке инвестицияларды құрылымдап, тәуекелін азайтамыз — ESG, этикалық ЖИ және халықаралық сертификаттау қағидаттарына негізделген. Miras акселераторы — капитал тарту үшін арнайы құралымыз.",
    ctas: ["Инвестициялық стратегия", "Miras акселераторы", "ESG-брифті поштамен сұрау"],
    audienceNote: "IsDB, EBRD, ADB, Дүниежүзілік банк, БҰҰ қорлары және жеке импакт-инвесторларға арналған.",
    sdg: {
      heading: "БҰҰ-ның Тұрақты даму мақсаттарына сай",
      sub: "NSART және Miras акселераторы танылған мандаттардың қиылысында — қаржылық параметрлерді ашпай ТДМ-ге байланыс.",
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
        { title: "Tamdy Cloud, PUE ~1,2", text: "СПГ криогендік суығы негізгі суыту ретінде, біріктірілген күн генерациясы." },
        { title: "Жасыл облигацияларға дайын", text: "Green bonds және даму банктерінің мандаттарына құрылымдалған." },
        { title: "Этикалық ЖИ және құпиялылық", text: "Ашықтық, бейтараптық, адам бақылауы; GDPR логикасында деректерді өңдеу." },
        { title: "Егемен ашық стектер", text: "Аудитке жарамды, vendor lock-in жоқ." },
      ],
    },
    metricsHeading: "Сандар",
    cta: { heading: "Инвестициялық материалдарды сұраңыз", text: "One-pager және дек поштамен. Құпия параметрлер онлайн жарияланбайды.", button: "Инвест-командамен байланысу" },
  },
  enterprisePage: {
    badge: "Жеке және мемлекеттік секторға",
    title: "Сіздің стандарттарыңызға сай технологиялар — ұлттық және халықаралық.",
    intro:
      "Егемен деректер орталықтары мен ЖИ есептеулерінен GovTech платформаларына дейін — біз мемлекеттік және жеке сектор үшін технологияларды жобалаймыз, құрамыз және сертификаттаймыз, сондай-ақ жаңа әзірлемелерді тауып, бағалап, процестеріңізге енгіземіз.",
    ctas: ["Технологиялық аудит сұрау", "Пилот бастау", "ЖИ қызметтері"],
    services: {
      heading: "Қызметтер каталогы",
      items: [
        { title: "ЖИ-жүйелер", text: "Доменді агенттер, ML және егемен есептеулердегі шешім қабылдау жүйелері." },
        { title: "Ақылды инфрақұрылым", text: "Жоғары тығыздықты энергия тиімді есептеулер мен байланыс." },
        { title: "GovTech", text: "Цифрлық сәйкестік, деректер алмасу және қағазсыз қызметтер." },
        { title: "Деректер орталығын сертификаттау", text: "TIA-942 және Uptime Tier III/IV — толық цикл." },
        { title: "Корпоративтік инновация", text: "Технологиялық скаутинг және процестерге интеграция." },
        { title: "SpaceTech / NajmSat", text: "Ерекше ғарыштық құзыреттілік — спутниктік және жердегі жүйелер." },
      ],
    },
    standards: {
      heading: "Стандарттар мен сәйкестік",
      items: ["ISO 9001", "ISO 14001", "ISO 10015", "TIA-942", "Uptime Tier III/IV", "ҚР техрегламенттеуі", "GDPR логикасындағы деректер"],
    },
    scouting: {
      heading: "Технологиялық скаутингтің үш қадамы",
      steps: [
        { n: "01", title: "Скаутинг", text: "Процестеріңізге қатысты жаңа технологияларды табу." },
        { n: "02", title: "Бағалау (CIVTI)", text: "Біздің әдіснамамызбен сәйкестікті, дайындықты және әсерді бағалау." },
        { n: "03", title: "Интеграция", text: "Тексерілген инновацияларды процестер мен жүйелерге енгізу." },
      ],
    },
    pilot: {
      heading: "Қол жетімді пилот",
      text: "6–8 аптада PoC және анық scope-of-work үлгісі — міндеттемелер алғанға дейін тексеру.",
      button: "Пилот бастау",
    },
  },
  foundersPage: {
    badge: "Құрылтайшылар, университеттер мен ҒЗТКЖ орталықтарына",
    title: "Зерттеуден кіріске дейін — материалдық емес активтеріңізді қорғаңыз, бағалаңыз және дамытыңыз.",
    intro:
      "Стартаптар, тұрақты компаниялар, университеттер мен ҒЗТКЖ орталықтары үшін: біз зияткерлік меншіктің толық өмірлік циклін жүргіземіз — бағалау, қорғау және құнын анықтау — әрі Miras акселераторы арқылы инвестиция мен бизнесті дамытуға жол ашамыз.",
    ctas: ["ЗМ бағалауы", "Miras акселераторына өтінім", "Командамен байланысу"],
    lifecycle: {
      heading: "ЗМ-нің өмірлік циклі",
      sub: "Төрт қадам және NSART әрқайсысында не істейді.",
      steps: [
        { n: "1", title: "Бағалау", text: "Активтер аудиті және дайындық скоринг — TRL / CRL / MRL — қорғалатын объектілерді анықтау." },
        { n: "2", title: "Қорғау", text: "Патенттер, тауар таңбалары, ноу-хау, ПҚ тіркеу, бірнеше юрисдикциядағы стратегия." },
        { n: "3", title: "Құны", text: "DCF және нарықтық аналогтар әдістерімен материалдық емес активтерді бағалау." },
        { n: "4", title: "Монетизация", text: "Лицензиялау, мәмілелерді құрылымдау және Miras акселераторы арқылы инвестицияға жол." },
      ],
    },
    assets: {
      heading: "Актив түрлері",
      items: ["ПҚ", "Цифрлық сервистер", "Агроөнеркәсіптік кешендер", "ҒЗТКЖ нәтижелері", "Ғарыштық технологиялар"],
    },
    university: {
      heading: "Университеттер мен ҒЗТКЖ орталықтарына арналған жеке трек",
      text: "DeepTech origin — технология трансфері, ғылымнан спин-офф, зерттеу нәтижелерін қорғау және коммерцияландыру.",
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
    title: "Miras Accelerator — терең технологияларды коммерцияландыру инфрақұрылымы.",
    intro:
      "NSART пен PNOD-тың бірлескен кәсіпорны Miras жетілген технологияларға дайындық алшақтығын еңсеруге көмектеседі — терең технологиялар инженериясын басқару мен комплаенспен, ЗМ-нің толық өмірлік циклін сүйемелдеумен және инвестицияға жол ашумен ұштастырады; Vision 2030, ОИС және БҰҰ ТДМ-ге сай.",
    ctas: ["Miras туралы", "Трекке өтінім", "Серіктес болу"],
    problem: {
      heading: "Miras қандай алшақтықты жабады",
      text: "Технология ғылыми тұрғыда жетілген болуы мүмкін, бірақ ұйымда енгізу үшін коммерциялық, реттеуші және өндірістік инфрақұрылым жетіспейді. Miras осы алшақтықты үш өлшемді дайындық моделі арқылы жабады.",
      dims: [
        { code: "TRL", title: "Технологиялық дайындық", q: "Технология қажетті ауқымда дәлелденген бе?" },
        { code: "CRL", title: "Коммерциялық дайындық", q: "Кіріске, баға белгілеуге және келісімшарт моделіне жол бар ма?" },
        { code: "MRL", title: "Өндірістік дайындық", q: "Өнімді шығаруға, сертификаттауға және жеткізуге бола ма?" },
      ],
    },
    tracks: {
      heading: "Үш трек",
      items: [
        { n: "Трек 1", title: "Deep-Tech Cohort", text: "Командаларды диагностикадан инвестицияға дайындыққа және демо-күнге жеделдету." },
        { n: "Трек 2", title: "Regulatory Sandbox", text: "Реттелетін ортада шешімдерді тестілеу — CleanTech, GovTech, агенттік ЖИ, дата-маркетплейс — егемен GPU-инфрақұрылымда." },
        { n: "Трек 3", title: "IP Portfolio & Founders", text: "ЗМ-нің толық өмірлік циклі және құрылтайшыларды дамыту — диагностикадан лицензиялауға және ЗМ дүкеніне дейін." },
      ],
    },
    positioning: {
      heading: "Стратегиялық позициялау",
      text: "Miras танылған мандаттардың қиылысында құрылған — Vision 2030, ОИС, Digital Cooperation Organization және БҰҰ ТДМ. Бұл — даму институттарына түсінікті тіл, оны коммерциялық параметрлерді ашпай қолдануға болады.",
    },
    confidential: "Құпиялылық: бөлім жалпыға қолжетімді деңгейде ұсталады. Бюджеттер, қорлардың мақсатты сомалары, басшылар мен кеңесшілердің есімдері, нақты инвесторлар және мемлекеттік органдарға өтініш беру егжей-тегжейлері — ішкі деректер.",
  },
  aboutPage: {
    badge: "Компания туралы",
    title: "Біз DeepTech идеяларын нақты бизнеске айналдырамыз.",
    intro:
      "NSART — DeepTech жобаларына маманданған венчурлік студия: инвестициялық мүмкіндіктерді табу, стратегиялық серіктестіктер құру, венчурларды құрылымдау және Орталық Азия, MENA, Оңтүстік Азия мен Африка нарықтарына шығу.",
    missionHeading: "Біздің миссия",
    missionText: "Ғылым мен коммерцияны байланыстыру — жетілген зерттеулерді алып, оларды венчурға дайын компаниялар ретінде құрылымдау және халықаралық капитал мен институционалдық мандаттарға қосу.",
    valuesHeading: "Біз қандай қағидаларды ұстанамыз",
    values: [
      { title: "Дизайн бойынша егемен", text: "Ашық стектер, vendor lock-in жоқ, реттеушілер мен инвесторлар үшін аудитке жарамды." },
      { title: "Сөзден гөрі дәлел", text: "Әр бекіту сертификатпен, метрикамен немесе енгізілген кейспен расталған." },
      { title: "Жаһандық мандаттарға сай", text: "ТДМ, ESG, даму банктерінің капиталына дайын." },
      { title: "Әдепкі бойынша көптілді", text: "EN · AR · RU · KK — біз жұмыс істейтін нарықтар үшін." },
    ],
  },
  technologiesPage: {
    badge: "Технологиялық стек",
    title: "Терең технологиялар — жобаланған және сертификатталған.",
    intro: "Егемен дата-орталықтары мен ЖИ-есептеулерден GovTech және ақылды инфрақұрылымға дейін — халықаралық стандарттар бойынша, ұштан-ұшқа аудитке жарамды.",
    pillars: [
      { title: "Жасанды интеллект", text: "AI Agent Factory, доменді мемлекеттік агенттер, real-time деректер көлдеріндегі ML, егемен GPU-инфрақұрылымда ірі модельдерді оқыту.", items: ["Agent Factory", "Доменді LLM", "Real-time ML", "Егемен GPU"] },
      { title: "Ақылды инфрақұрылым", text: "Жоғары тығыздықты есептеулер, AIoT және M2M желілері, цифрлық егіздер платформалары мен қалалық байланыс.", items: ["AIoT және M2M", "Цифрлық егіздер", "Smart Field", "Энергия тиімді дизайн"] },
      { title: "GovTech", text: "Электрондық үкіметтегі 20+ жыл тәжірибе модульдер ретінде: цифрлық сәйкестік, деректер алмасу, қағазсыз қызметтер, киберқауіпсіздік.", items: ["e-Gov", "Цифрлық ID", "Деректер алмасу", "Киберқауіпсіздік"] },
      { title: "Дата-орталықтар", text: "Tamdy Cloud — Tier III/IV жобасы, PUE ~1,2, СПГ криогендік суыту, Орталық Азиядағы көшбасшы TIA-942 / Uptime тәжірибе.", items: ["TIA-942", "Uptime Tier III/IV", "PUE ~1,2", "СПГ криогендік суыту"] },
    ],
  },
  ipPage: {
    badge: "Зияткерлік меншік және материалдық емес активтер",
    title: "Активтеріңізді қорғаңыз, бағалаңыз және монетизациялаңыз.",
    intro: "ЗМ-нің толық өмірлік циклін сүйемелдеу — ПҚ, цифрлық сервистер, ҒЗТКЖ нәтижелері, агроөнеркәсіптік кешендер, ғарыштық технологиялар.",
    lifecycleHeading: "ЗМ-нің өмірлік циклі",
    steps: [
      { n: "1", title: "Бағалау", text: "Активтер аудиті және дайындық скоринг (TRL / CRL / MRL); қорғалатын объектілерді анықтау." },
      { n: "2", title: "Қорғау", text: "Патенттер, тауар таңбалары, ноу-хау, ПҚ тіркеу, бірнеше юрисдикциядағы стратегия." },
      { n: "3", title: "Құны", text: "DCF және нарықтық аналогтар әдістерімен бағалау — мәмілелер, қаражат тарту, серіктестіктер үшін." },
      { n: "4", title: "Монетизация", text: "Лицензиялау, мәмілелерді құрылымдау және Miras акселераторы арқылы инвестицияға жол." },
    ],
    assetsHeading: "Біз жұмыс істейтін актив түрлері",
    assets: ["ПҚ", "Цифрлық сервистер", "ҒЗТКЖ нәтижелері", "Агроөнеркәсіптік кешендер", "Ғарыштық технологиялар"],
    ctaHeading: "Активтеріңізді келесі кезеңге шығарыңыз.",
    ctaText: "ЗМ бағалауынан бастаңыз — біз портфельді картаға саламыз және қорғау мен монетизация жолын ұсынамыз.",
    ctaButton: "ЗМ бағалауын алу",
  },
  marketsPage: {
    badge: "Жұмыс географиясы",
    title: "Төрт өңір. Бір көпір.",
    intro: "NSART дамушы нарықтардың сұранысы мен институционалдық капиталдың қиылысында жұмыс істейді — Орталық Азия базасы ретінде, Сауд Арабиясы мен MENA өсу дәлізі, Оңтүстік Азия мен Африка кеңею шегі.",
    regionsHeading: "Өңірлер",
    regions: [
      { name: "Орталық Азия", kicker: "База", desc: "Қазақстан: егемен HPC, GovTech референс, жасыл деректер орталықтары. Электрондық үкіметтегі 20+ жыл тәжірибе, БҰҰ Top-25." },
      { name: "MENA", kicker: "Өсу дәлізі", desc: "Сауд Арабиясы: Vision 2030-ға сай GovTech лабораториялары, PNOD-пен GRC-серіктестіктер, Miras Accelerator БК." },
      { name: "Оңтүстік Азия", kicker: "Кеңею", desc: "Пәкістан: NITEC + InfoTech-пен GovTech экспорты, Pixel DMC арқылы төлем шлюздері, сертификаттарды тарату." },
      { name: "Африка", kicker: "Шек", desc: "Дамушы нарықтардың инфрақұрылымы, ESG-инвестициялар, құзыреттілікті дамыту, үкіметтер үшін Scalable Solution Modules." },
    ],
    gatewayHeading: "NSART Gateway",
    gatewayText: "Орталық Азия, Оңтүстік Азия, MENA және Африка нарықтарына шығу үшін арнайы өнім — жергілікті болу, реттеуші навигация және серіктестер экожүйелері.",
  },
  partnersPage: {
    badge: "Экожүйе",
    title: "Мемлекеттер, ғылым және капитал экожүйесі.",
    intro: "Біз бес серіктес тобымен жұмыс істейміз — мемлекет пен инфрақұрылым, технология мен бұлт, ғылым мен білім, GRC және тұрақты даму, сауда мен нарықтарға шығу.",
    spotlightHeading: "Негізгі серіктестер",
    logoHeading: "Таңдаулы серіктестер",
  },
  contactPage: {
    badge: "Байланыс",
    title: "Өзіңізге сай әңгімені бастаңыз.",
    intro: "Инвесторлар, бизнес пен мемлекет, құрылтайшылар мен R&D үшін бөлек жолдар. Екі жұмыс күні ішінде жауап береміз.",
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
    location: "Алматы, Қазақстан",
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
