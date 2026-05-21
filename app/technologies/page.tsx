"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "motion/react";
import { Cpu, Network, Database, Building2, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;
const pillarIcons: LucideIcon[] = [Cpu, Network, Database, Building2];

export default function TechnologiesPage() {
  const { t } = useLanguage();
  const page = t.technologiesPage;

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

      {/* Pillars */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page grid gap-8 md:grid-cols-2">
          {page.pillars.map((p, i) => {
            const Icon = pillarIcons[i] ?? Cpu;
            return (
              <Reveal key={p.title} index={i}>
                <article className="h-full rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-8">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-600/10 text-accent-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-6 text-2xl font-extrabold text-navy-950">{p.title}</h2>
                  <p className="mt-3 leading-relaxed text-navy-600">{p.text}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {p.items.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-2 text-sm text-navy-800"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-esg-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Verticals */}
      <section className="bg-sand-50 border-t border-sand-200 py-20 sm:py-28">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-600">{t.verticals.eyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {t.verticals.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-navy-600">{t.verticals.sub}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {t.verticals.items.map((v, i) => (
              <Reveal key={v.title} index={i}>
                <div className="relative h-full rounded-[var(--radius-card)] border border-sand-300 bg-white p-7">
                  <div className="absolute top-5 end-5 font-display text-3xl font-extrabold text-navy-100">
                    {v.n}
                  </div>
                  <h3 className="text-xl font-extrabold text-navy-950">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">{v.text}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {v.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent-600/10 px-2.5 py-1 text-[11px] font-medium text-accent-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
