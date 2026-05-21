"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";

export function MirasTeaser() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.4]" />
      <div
        className="pointer-events-none absolute -top-32 start-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(24,95,165,0.55), transparent)",
        }}
      />
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-medium text-navy-100">
              <Sparkles className="h-3.5 w-3.5 text-accent-400" />
              {t.mirasTeaser.eyebrow}
            </span>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-6 text-balance text-3xl font-extrabold leading-tight sm:text-4xl md:text-[2.8rem]">
              {t.mirasTeaser.heading}
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="mt-5 text-lg leading-relaxed text-navy-100/80">{t.mirasTeaser.text}</p>
          </Reveal>
          <Reveal index={3}>
            <p className="mt-4 text-sm text-navy-200/70">{t.mirasTeaser.aligned}</p>
          </Reveal>
          <Reveal index={4}>
            <div className="mt-8 flex justify-center">
              <Link
                href="/miras"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-navy-900 shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
              >
                {t.mirasTeaser.cta}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
