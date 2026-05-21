"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "motion/react";
import { Compass, Layers, Target, Workflow, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;
const methodIcons: LucideIcon[] = [Compass, Workflow, Target, Layers];

export default function AboutPage() {
  const { t } = useLanguage();
  const page = t.aboutPage;

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

      {/* Mission */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="eyebrow text-accent-600">{page.missionHeading}</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {page.missionText}
            </h2>
          </div>
          <div className="rounded-3xl border border-sand-300 bg-sand-50 p-8 sm:p-10">
            <span className="eyebrow text-accent-600">{page.valuesHeading}</span>
            <ul className="mt-6 space-y-5">
              {page.values.map((v) => (
                <li key={v.title} className="flex gap-4">
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-600/10 text-accent-600">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-bold text-navy-950">{v.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-navy-600">{v.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-sand-50 border-t border-sand-200 py-20 sm:py-28">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-600">{t.methodology.eyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {t.methodology.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-navy-600">{t.methodology.sub}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {t.methodology.items.map((m, i) => {
              const Icon = methodIcons[i] ?? Compass;
              return (
                <Reveal key={m.title} index={i}>
                  <div className="relative h-full rounded-[var(--radius-card)] border border-sand-300 bg-white p-7 transition-all hover:shadow-[var(--shadow-lift)]">
                    <div className="absolute top-5 end-5 font-display text-3xl font-extrabold text-navy-100">
                      {m.n}
                    </div>
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-600/10 text-accent-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-extrabold text-navy-950">{m.title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-navy-500">
                      {m.sub}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">{m.text}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {m.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-sand-300 bg-sand-50 px-2.5 py-1 text-[11px] font-medium text-navy-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="bg-navy-950 py-20 text-white sm:py-28">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-400">{t.experience.eyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              {t.experience.heading}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.experience.items.map((e, i) => (
              <Reveal key={e.period} index={i}>
                <div className="h-full rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                  <p className="font-display text-2xl font-extrabold text-accent-400">
                    {e.period}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-100/80">{e.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
