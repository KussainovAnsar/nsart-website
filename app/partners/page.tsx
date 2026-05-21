"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export default function PartnersPage() {
  const { t } = useLanguage();
  const page = t.partnersPage;

  return (
    <div className="bg-sand-50 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-20 text-white sm:pt-36 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.4]" />
        <div className="container-page relative max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent-600/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-300"
          >
            {page.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-6 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-[3.2rem]"
          >
            {page.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-6 text-lg leading-relaxed text-navy-100/80"
          >
            {page.intro}
          </motion.p>
        </div>
      </section>

      {/* Spotlight */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <span className="eyebrow text-accent-600">{page.spotlightHeading}</span>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {t.partners.spotlight.map((p, i) => (
              <Reveal key={p.name} index={i}>
                <div className="h-full rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-7">
                  <h3 className="text-lg font-extrabold text-navy-950">{p.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">{p.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="bg-sand-50 border-t border-sand-200 py-20 sm:py-28">
        <div className="container-page">
          <span className="eyebrow text-accent-600">{t.partners.eyebrow}</span>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.partners.groups.map((g, i) => (
              <Reveal key={g.name} index={i}>
                <div className="h-full rounded-[var(--radius-card)] border border-sand-300 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">
                    {g.name}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {g.members.map((m) => (
                      <li
                        key={m}
                        className="rounded-full border border-sand-300 bg-sand-50 px-2.5 py-1 text-xs font-medium text-navy-700"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Logo wall */}
      <section className="bg-white border-t border-sand-200 py-16 sm:py-20">
        <div className="container-page">
          <span className="eyebrow text-accent-600">{page.logoHeading}</span>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
            {t.partners.logos.map((logo) => (
              <a
                key={logo.name}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-navy-500 transition-colors hover:text-navy-900"
              >
                {logo.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
