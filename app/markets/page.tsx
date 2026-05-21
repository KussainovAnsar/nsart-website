"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "motion/react";
import { Globe } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export default function MarketsPage() {
  const { t } = useLanguage();
  const page = t.marketsPage;

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

      {/* Regions */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <span className="eyebrow text-accent-600">{page.regionsHeading}</span>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {page.regions.map((r, i) => (
              <Reveal key={r.name} index={i}>
                <article className="h-full rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-7 hover:bg-white hover:shadow-[var(--shadow-soft)] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-600/10 text-accent-600">
                      <Globe className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                      {r.kicker}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-navy-950">{r.name}</h3>
                  <p className="mt-3 leading-relaxed text-navy-600">{r.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gateway */}
      <section className="bg-sand-50 border-t border-sand-200 py-20 sm:py-28">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-3xl border border-sand-300 bg-white p-8 text-center sm:p-12">
            <span className="eyebrow text-accent-600">Product</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {page.gatewayHeading}
            </h2>
            <p className="mt-4 text-navy-600 leading-relaxed">{page.gatewayText}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
