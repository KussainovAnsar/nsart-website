"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "motion/react";
import { ArrowRight, Layers, Settings, Zap, Compass, Lock, Globe, ShieldAlert } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export default function MirasPage() {
  const { t } = useLanguage();
  const page = t.mirasPage;

  // Icons mapped to the three dimensions of readiness
  const readinessIcons = [Compass, Layers, Settings];

  // Icons mapped to the three tracks
  const trackIcons = [Zap, ShieldAlert, Layers];

  return (
    <div className="bg-sand-50 min-h-screen">
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-20 text-white sm:pt-36 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.4]" />
        
        {/* Decorative ambient glow */}
        <div
          className="pointer-events-none absolute -top-40 start-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-35 blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(24,95,165,0.7) 0%, transparent 70%)",
          }}
        />

        <div className="container-page relative">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent-600/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-300 border border-accent-500/10"
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
              {page.ctas.map((cta, i) => {
                let href = "#problem";
                if (i === 1) href = "/founders#apply-form";
                if (i === 2) href = `mailto:${t.contact.email}?subject=Partner with Miras Accelerator`;

                return (
                  <a
                    key={cta}
                    href={href}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                      i === 0
                        ? "bg-white text-navy-950 shadow-[var(--shadow-lift)] hover:-translate-y-0.5"
                        : "border border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    {cta}
                    {i === 0 && <ArrowRight className="h-4 w-4" />}
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Gap We Close (Three-Dimensional Readiness Model) */}
      <section id="problem" className="py-20 sm:py-28 bg-white relative">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-600">The Problem</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {page.problem.heading}
            </h2>
            <p className="mt-4 text-navy-600 leading-relaxed text-base">
              {page.problem.text}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {page.problem.dims.map((dim, i) => {
              const IconComponent = readinessIcons[i] ?? Compass;
              return (
                <Reveal key={dim.code} index={i}>
                  <div className="relative h-full rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-8 shadow-sm hover:shadow-[var(--shadow-lift)] transition-all duration-300 group hover:bg-white">
                    <div className="absolute top-6 end-6 font-display text-xs font-bold text-navy-400 border border-sand-300 rounded-full px-3 py-1 bg-white">
                      {dim.code}
                    </div>
                    
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900/10 text-navy-900 group-hover:bg-accent-600/15 group-hover:text-accent-600 transition-colors">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    
                    <h3 className="mt-6 text-xl font-bold text-navy-950 group-hover:text-accent-600 transition-colors">
                      {dim.title}
                    </h3>
                    
                    <div className="mt-4 pt-4 border-t border-sand-200">
                      <p className="text-sm font-semibold text-navy-500 uppercase tracking-wider mb-1">
                        Core Question
                      </p>
                      <p className="text-[0.95rem] leading-relaxed text-navy-800 italic">
                        &ldquo;{dim.q}&rdquo;
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cohorts & Tracks */}
      <section className="py-20 sm:py-28 bg-sand-50 border-t border-sand-200">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-600">Accelerator Tracks</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {page.tracks.heading}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {page.tracks.items.map((track, i) => {
              const IconComponent = trackIcons[i] ?? Zap;
              return (
                <Reveal key={i} index={i}>
                  <div className="flex flex-col justify-between rounded-[var(--radius-card)] border border-sand-300 bg-white p-8 shadow-sm hover:shadow-md transition-shadow h-full">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-600/10 text-accent-600">
                          <IconComponent className="h-5.5 w-5.5" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-navy-400 bg-sand-100 px-2.5 py-1 rounded-md">
                          {track.n}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-navy-950 mt-6">
                        {track.title}
                      </h3>
                      
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-navy-600">
                        {track.text}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-sand-100">
                      <a
                        href="/founders#apply-form"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors"
                      >
                        Apply for {track.n}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Positioning */}
      <section className="py-20 sm:py-28 bg-white border-t border-sand-200 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-15" />
        <div className="container-page relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
            
            {/* Left Column: Visual alignment details */}
            <div className="relative rounded-3xl border border-sand-300 bg-sand-50 p-8 sm:p-12 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-esg-600/10 text-esg-600 mb-6">
                <Globe className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
                {page.positioning.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-navy-600">
                {page.positioning.text}
              </p>
            </div>

            {/* Right Column: Grid list of strategic alliances */}
            <div className="space-y-6">
              <span className="eyebrow text-accent-600">Global Frameworks</span>
              <h3 className="text-2xl font-extrabold text-navy-950">
                Unified institutional mandates
              </h3>
              <p className="text-navy-600 leading-relaxed text-[0.95rem]">
                By structuring DeepTech maturation around international standards, Miras operates in full alignment with leading global and regional initiatives:
              </p>
              
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Saudi Vision 2030",
                  "OIC Science & Tech Agenda",
                  "Digital Cooperation Org.",
                  "UN Sustainable Dev. Goals",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl border border-sand-200 bg-sand-50/50 px-4 py-3 shadow-sm hover:border-sand-300 transition-colors"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-esg-600 shrink-0" />
                    <span className="font-semibold text-navy-800 text-sm leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Confidentiality Notice & Disclaimer */}
      <section className="py-16 sm:py-20 bg-navy-950 text-white relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.2]" />
        <div className="container-page relative max-w-4xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 backdrop-blur-md flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
              <Lock className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-navy-300">
                Security & Compliance
              </span>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-navy-100/90 font-medium">
                {page.confidential}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
