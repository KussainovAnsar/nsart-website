"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export default function IpPage() {
  const { t } = useLanguage();
  const page = t.ipPage;

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

      {/* Lifecycle */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-600">IP Pipeline</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {page.lifecycleHeading}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.steps.map((s, i) => (
              <Reveal key={s.n} index={i}>
                <div className="h-full rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-6 hover:bg-white hover:shadow-[var(--shadow-lift)] transition-all">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 text-white font-display font-bold text-sm">
                    {s.n}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy-950">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Asset types */}
      <section className="bg-sand-50 border-t border-sand-200 py-20 sm:py-28">
        <div className="container-page max-w-4xl">
          <span className="eyebrow text-accent-600">Scope of assets</span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
            {page.assetsHeading}
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {page.assets.map((a, i) => (
              <Reveal key={a} index={i}>
                <div className="flex items-center gap-3 rounded-2xl border border-sand-300 bg-white px-5 py-4">
                  <div className="h-2 w-2 rounded-full bg-accent-600" />
                  <span className="text-sm font-semibold text-navy-800">{a}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-sand-200 py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-3xl border border-sand-300 bg-sand-50 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {page.ctaHeading}
            </h2>
            <p className="mt-4 text-navy-600 leading-relaxed">{page.ctaText}</p>
            <div className="mt-8 flex justify-center">
              <a
                href="/founders#apply-form"
                className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-6 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
              >
                {page.ctaButton}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
