"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { HeroInfrastructure } from "./HeroInfrastructure";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-navy-950 pt-32 text-white sm:pt-36 lg:pt-40">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.55]" />
      <div
        className="pointer-events-none absolute -top-40 start-[-10%] h-[36rem] w-[36rem] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(24,95,165,0.55), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 end-[-8%] h-[34rem] w-[34rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(15,110,86,0.5), transparent)",
        }}
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
          {/* Text column */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-navy-100"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent-400" />
              {t.hero.eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease }}
              className="hero-title mt-6 max-w-3xl text-balance text-[2.15rem] font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.6rem] min-w-0 [overflow-wrap:anywhere]"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease }}
              className="hero-subtitle mt-5 max-w-xl text-base leading-relaxed text-navy-100/80 sm:mt-6 sm:text-lg min-w-0 [overflow-wrap:anywhere] whitespace-pre-line"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9"
            >
              <a
                href="#audiences"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-center text-[0.95rem] font-semibold text-navy-900 shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </a>
              <a
                href="/miras"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-center text-[0.95rem] font-medium text-white transition-colors hover:bg-white/10"
              >
                {t.hero.ctaSecondary}
              </a>
            </motion.div>
          </div>

          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <HeroInfrastructure />
          </motion.div>
        </div>

        {/* Stat tiles */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-t-3xl border border-white/10 bg-white/10 lg:grid-cols-4 min-w-0 break-words"
        >
          {t.hero.stats.map((s) => (
            <div
              key={s.label}
              className="bg-navy-950/60 p-5 backdrop-blur-sm sm:p-6 min-w-0 break-words"
            >
              <p className="font-display text-2xl font-bold text-white sm:text-3xl min-w-0 break-words">
                {s.value}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-navy-100/70 min-w-0 break-words">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
