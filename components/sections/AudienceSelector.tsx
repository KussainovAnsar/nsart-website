"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp, Building2, FlaskConical } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const meta: Record<
  string,
  { icon: LucideIcon; accent: string; chip: string; bar: string }
> = {
  investors: {
    icon: TrendingUp,
    accent: "text-accent-600",
    chip: "bg-accent-600/10 text-accent-600",
    bar: "from-accent-600 to-accent-400",
  },
  enterprise: {
    icon: Building2,
    accent: "text-navy-700",
    chip: "bg-navy-700/10 text-navy-700",
    bar: "from-navy-800 to-navy-500",
  },
  founders: {
    icon: FlaskConical,
    accent: "text-esg-600",
    chip: "bg-esg-600/10 text-esg-600",
    bar: "from-esg-600 to-esg-400",
  },
};

export function AudienceSelector() {
  const { t } = useLanguage();

  return (
    <section id="audiences" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.audience.eyebrow}
          title={t.audience.heading}
          sub={t.audience.sub}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.audience.cards.map((card, i) => {
            const m = meta[card.key] ?? meta.investors;
            const Icon = m.icon;
            return (
              <Reveal key={card.key} index={i}>
                <Link
                    href={card.href}
                    className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-navy-200 hover:bg-white hover:shadow-[var(--shadow-lift)] break-words"
                  >
                  <span
                    className={cn(
                      "absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                      m.bar,
                    )}
                  />
                  <div
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
                      m.chip,
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className={cn("mt-5 text-xs font-semibold uppercase tracking-wider", m.accent)}>
                    {card.tag}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-navy-950 min-w-0 break-words">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-navy-600 min-w-0 break-words whitespace-pre-line">
                    {card.text}
                  </p>
                  <span
                    className={cn(
                      "mt-6 inline-flex items-center gap-1.5 text-sm font-semibold",
                      m.accent,
                    )}
                  >
                    {card.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
