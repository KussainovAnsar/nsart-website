"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "motion/react";
import { ArrowRight, Leaf, Shield, Globe, Award, Download } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export default function InvestorsPage() {
  const { t } = useLanguage();
  const page = t.investorsPage;

  return (
    <div className="bg-sand-50 min-h-screen">
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-20 text-white sm:pt-36 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.4]" />
        <div className="container-page relative">
          <div className="max-w-3xl">
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

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {page.ctas.map((cta, i) => (
                <a
                  key={cta}
                  href={i === 1 ? "/miras" : "#request-info"}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                    i === 0
                      ? "bg-white text-navy-950 shadow-[var(--shadow-lift)] hover:-translate-y-0.5"
                      : "border border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  {cta}
                  {i === 0 && <ArrowRight className="h-4 w-4" />}
                </a>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 text-xs text-navy-200/60"
            >
              {page.audienceNote}
            </motion.p>
          </div>
        </div>
      </section>

      {/* SDG Goals Alignment */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-600">UN SDG Alignment</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {page.sdg.heading}
            </h2>
            <p className="mt-4 text-navy-600 leading-relaxed">
              {page.sdg.sub}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {page.sdg.items.map((item, i) => (
              <Reveal key={item.goal} index={i}>
                <div className="rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-6 hover:shadow-[var(--shadow-soft)] transition-shadow">
                  <div className="inline-flex items-center gap-2 rounded-full bg-accent-600/10 px-3 py-1 text-xs font-bold text-accent-600">
                    <Globe className="h-3.5 w-3.5" />
                    {item.goal}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-navy-950">
                    {item.goal}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ESG and Green Finance */}
      <section className="py-20 sm:py-28 bg-sand-50 border-t border-sand-200">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-esg-600">Sustainability</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {page.esg.heading}
            </h2>
            <p className="mt-4 text-navy-600 leading-relaxed">
              {page.esg.sub}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {page.esg.points.map((pt, i) => (
              <Reveal key={pt.title} index={i}>
                <div className="flex gap-4 rounded-[var(--radius-card)] border border-sand-300 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-esg-600/10 text-esg-600">
                    {i === 0 ? <Leaf className="h-5 w-5" /> : i === 1 ? <Award className="h-5 w-5" /> : i === 2 ? <Shield className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-950">{pt.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{pt.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 sm:py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-10" />
        <div className="container-page relative">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-navy-400">
            {page.metricsHeading}
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-4">
            {t.hero.stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-4xl font-extrabold text-white lg:text-5xl">{s.value}</p>
                <p className="mt-2 text-xs text-navy-300 max-w-[200px] mx-auto leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Materials CTA */}
      <section id="request-info" className="py-20 sm:py-28 bg-white border-t border-sand-200">
        <div className="container-page">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-600/10 text-accent-600">
              <Download className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {page.cta.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-navy-600">
              {page.cta.text}
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href={`mailto:${t.contact.email}?subject=Request Investor Materials - NSART`}
                className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-6 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
              >
                {page.cta.button}
                <ArrowRight className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
