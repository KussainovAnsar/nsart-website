"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WORLD_MAP_PATH } from "./HeroInfrastructure";

const regionHighlights = [
  { cx: 83.4, cy: 38.6 },
  { cx: 75.7, cy: 47.5 },
  { cx: 87.1, cy: 50.3 },
  { cx: 66.8, cy: 59.2 },
];

const WORLD_TO_MINI = "translate(-14.05 -14.05) scale(0.28481)";

export function Markets() {
  const { t } = useLanguage();
  return (
    <section id="markets" className="scroll-mt-24 overflow-hidden bg-sand-50 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.markets.eyebrow}
          title={t.markets.heading}
          sub={t.markets.sub}
        />

        <div className="relative mt-14">
          <div className="absolute left-10 top-0 hidden h-full w-px bg-gradient-to-b from-accent-600 via-sand-300 to-primary-600 sm:block lg:left-0 lg:right-0 lg:top-14 lg:h-px lg:w-auto" />

          <div className="grid gap-9 sm:gap-10 lg:grid-cols-4 lg:gap-8">
            {t.markets.items.map((m, i) => (
              <Reveal key={m.name} index={i}>
                <article className="relative grid min-w-0 grid-cols-[5rem_1fr] gap-5 lg:block">
                  <div className="relative z-10 h-20 w-20 lg:h-28 lg:w-28">
                    <MiniRegionGlobe index={i} />
                  </div>
                  <div className="min-w-0 border-b border-sand-300 pb-8 lg:border-b-0 lg:pb-0 lg:pt-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600 lg:text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-xl font-extrabold text-navy-950 lg:text-2xl">{m.name}</h3>
                    <p className="mt-3 max-w-sm whitespace-pre-line text-sm leading-relaxed text-navy-600 lg:text-base lg:leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniRegionGlobe({ index }: { index: number }) {
  const highlight = regionHighlights[index] ?? regionHighlights[0];
  const clipId = `market-globe-${index}`;

  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id={`market-globe-fill-${index}`} cx="38%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#d6e0ec" stopOpacity="0.95" />
          <stop offset="44%" stopColor="#dbeafe" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#0b1b2f" stopOpacity="0.12" />
        </radialGradient>
        <clipPath id={clipId}>
          <circle cx="60" cy="60" r="45" />
        </clipPath>
      </defs>

      <circle cx="60" cy="60" r="48" fill="#fff" stroke="#d8d1c7" strokeWidth="1" />
      <circle cx="60" cy="60" r="45" fill={`url(#market-globe-fill-${index})`} stroke="#123052" strokeOpacity="0.24" />

      <g clipPath={`url(#${clipId})`}>
        <motion.g
          animate={{ x: [-12, 8, -12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
        >
          <g transform={WORLD_TO_MINI}>
            <path
              d={WORLD_MAP_PATH}
              fill="#123052"
              opacity="0.26"
              stroke="#123052"
              strokeWidth="1.15"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <motion.circle
            cx={highlight.cx}
            cy={highlight.cy}
            r="4.4"
            fill="#0f6e56"
            opacity="0.88"
            animate={{ r: [3.6, 5.4, 3.6], opacity: [0.72, 1, 0.72] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.18 }}
          />
          <motion.circle
            cx={highlight.cx}
            cy={highlight.cy}
            r="8"
            fill="none"
            stroke="#0f6e56"
            strokeWidth="1.4"
            opacity="0.52"
            animate={{ r: [6, 10, 6], opacity: [0.22, 0.62, 0.22] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.18 }}
          />
        </motion.g>

        {[-26, -13, 0, 13, 26].map((x, i) => (
          <motion.ellipse
            key={x}
            cx={60 + x * 0.15}
            cy="60"
            rx={12 + Math.abs(x) * 0.95}
            ry="45"
            fill="none"
            stroke="#123052"
            strokeWidth="0.55"
            opacity={i === 2 ? 0.22 : 0.12}
            animate={{ cx: [60 + x * 0.15, 60 - x * 0.1, 60 + x * 0.15] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
          />
        ))}

        {[-21, 0, 21].map((y) => (
          <ellipse
            key={y}
            cx="60"
            cy={60 + y}
            rx={42 - Math.abs(y) * 0.5}
            ry={9 - Math.abs(y) * 0.08}
            fill="none"
            stroke="#123052"
            strokeWidth="0.55"
            opacity="0.12"
          />
        ))}
      </g>

      <motion.circle
        cx={highlight.cx}
        cy={highlight.cy}
        r="6"
        fill="none"
        stroke="#0f6e56"
        strokeWidth="1.5"
        opacity="0.55"
        animate={{ r: [5, 10, 5], opacity: [0.25, 0.68, 0.25] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
      />
      <circle cx="60" cy="60" r="45" fill="none" stroke="#123052" strokeOpacity="0.18" strokeWidth="1.2" />
    </svg>
  );
}
