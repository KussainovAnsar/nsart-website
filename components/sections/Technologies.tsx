"use client";

import { Cpu, Network, Database, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons: LucideIcon[] = [Cpu, Network, Database, Building2];

export function Technologies() {
  const { t } = useLanguage();
  return (
    <section id="technologies" className="scroll-mt-24 bg-sand-50 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.technologies.eyebrow}
          title={t.technologies.heading}
          sub={t.technologies.sub}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.technologies.items.map((item, i) => {
            const Icon = icons[i] ?? Cpu;
            return (
              <Reveal key={item.title} index={i}>
                <div className="group h-full min-w-0 break-words rounded-[var(--radius-card)] border border-sand-300 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-600/10 text-accent-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 min-w-0 break-words text-lg font-bold text-navy-950">{item.title}</h3>
                  <p className="mt-2 min-w-0 break-words whitespace-pre-line text-sm leading-relaxed text-navy-600">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
