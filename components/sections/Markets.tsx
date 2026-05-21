"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Markets() {
  const { t } = useLanguage();
  return (
    <section id="markets" className="scroll-mt-24 bg-sand-50 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.markets.eyebrow}
          title={t.markets.heading}
          sub={t.markets.sub}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.markets.items.map((m, i) => (
            <Reveal key={m.name} index={i}>
              <div className="h-full rounded-[var(--radius-card)] border border-sand-300 bg-white p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900/10 text-navy-900">
                  <Globe className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-bold text-navy-950">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
