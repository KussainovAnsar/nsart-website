"use client";

import { MapPin } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Cases() {
  const { t } = useLanguage();
  return (
    <section id="cases" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.cases.eyebrow}
          title={t.cases.heading}
          sub={t.cases.sub}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.cases.items.map((c, i) => (
            <Reveal key={c.title} index={i}>
              <article className="flex h-full min-w-0 flex-col rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-6 transition-colors hover:bg-white hover:shadow-[var(--shadow-soft)] sm:p-8 break-words">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-accent-600/10 px-3 py-1 text-xs font-semibold text-accent-600">
                    {c.tag}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                    {c.status}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-extrabold text-navy-950 min-w-0 break-words">{c.title}</h3>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-navy-500 min-w-0 break-words">
                  <MapPin className="h-3.5 w-3.5" />
                  {c.location}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-navy-700 min-w-0 break-words whitespace-pre-line">{c.text}</p>
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-sand-200 pt-5 sm:grid-cols-4 flex-wrap">
                  {c.metrics.map((m, j) => (
                    <div key={j}>
                      <p className="font-display text-base font-bold text-navy-950">{m.v}</p>
                      <p className="mt-0.5 text-[11px] leading-snug text-navy-500">{m.l}</p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
