"use client";

import { Award, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Certifications() {
  const { t } = useLanguage();
  return (
    <section id="certifications" className="scroll-mt-24 bg-sand-50 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.certifications.eyebrow}
          title={t.certifications.heading}
          sub={t.certifications.sub}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {t.certifications.items.map((c, i) => (
            <Reveal key={c.name} index={i}>
              <div className="flex h-full min-w-0 gap-4 rounded-[var(--radius-card)] border border-sand-300 bg-white p-5 break-words">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-esg-600/10 text-esg-600">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-navy-950 min-w-0 break-words">{c.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-navy-600 min-w-0 break-words whitespace-pre-line">{c.meaning}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-navy-500">
          <CheckCircle2 className="h-4 w-4 text-esg-600" />
          <span>SDG-aligned · ESG-ready</span>
        </div>
      </div>
    </section>
  );
}
