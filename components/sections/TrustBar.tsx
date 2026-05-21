"use client";

import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function TrustBar() {
  const { t } = useLanguage();
  const items = t.trustBar.split("·").map((s) => s.trim());
  const loop = [...items, ...items];

  return (
    <div className="border-y border-sand-300 bg-sand-50">
      <div className="container-page flex items-center gap-4 py-3.5">
        <span className="hidden shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy-500 sm:inline-flex">
          <ShieldCheck className="h-4 w-4 text-esg-600" />
          Certified
        </span>
        <div className="marquee-mask relative w-full overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-3">
            {loop.map((item, i) => (
              <span
                key={i}
                className="inline-flex shrink-0 items-center rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-xs font-medium text-navy-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
