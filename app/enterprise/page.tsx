"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Cpu, Database, Network, Compass, Shield, Settings } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const icons = [Cpu, Network, Database, Shield, Settings, Compass];

export default function EnterprisePage() {
  const { t } = useLanguage();
  const page = t.enterprisePage;

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
                  href={i === 1 ? "#pilot" : "#contact"}
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
          </div>
        </div>
      </section>

      {/* Services Catalog */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-600">Solutions</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {page.services.heading}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {page.services.items.map((item, i) => {
              const IconComponent = icons[i] ?? Cpu;
              return (
                <Reveal key={item.title} index={i}>
                  <div className="rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-7 hover:bg-white hover:shadow-[var(--shadow-lift)] transition-all duration-300 group">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900/10 text-navy-900 group-hover:bg-accent-600/15 group-hover:text-accent-600 transition-colors">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-navy-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-navy-600">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scouting Process (Stepped Timeline) */}
      <section className="py-20 sm:py-28 bg-sand-50 border-t border-sand-200">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-600">Methodology</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {page.scouting.heading}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {page.scouting.steps.map((step, i) => (
              <Reveal key={step.n} index={i}>
                <div className="relative rounded-[var(--radius-card)] border border-sand-300 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="absolute top-6 end-6 font-display text-4xl font-extrabold text-navy-100">
                    {step.n}
                  </div>
                  <h3 className="text-xl font-bold text-navy-950 mt-4">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-navy-600">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Standards & Certifications */}
      <section className="py-16 sm:py-20 bg-white border-t border-sand-200">
        <div className="container-page">
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-navy-500 mb-10">
            {page.standards.heading}
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {page.standards.items.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-sand-50 px-4 py-2 text-sm font-medium text-navy-700 hover:border-navy-200 hover:bg-white transition-colors"
              >
                <CheckCircle2 className="h-4 w-4 text-esg-600" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot Program Card */}
      <section id="pilot" className="py-20 sm:py-28 bg-sand-50 border-t border-sand-200">
        <div className="container-page">
          <div className="max-w-4xl mx-auto rounded-3xl border border-sand-300 bg-white p-8 sm:p-12 shadow-[var(--shadow-lift)] relative overflow-hidden">
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent-600/5 blur-3xl" />
            <div className="relative">
              <span className="eyebrow text-accent-600">Proof of Concept</span>
              <h2 className="mt-4 text-3xl font-extrabold text-navy-950 sm:text-4xl">
                {page.pilot.heading}
              </h2>
              <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-navy-600">
                {page.pilot.text}
              </p>
              <div className="mt-8">
                <a
                  href={`mailto:${t.contact.email}?subject=Start a Pilot Program - NSART`}
                  className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-6 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  {page.pilot.button}
                  <ArrowRight className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
