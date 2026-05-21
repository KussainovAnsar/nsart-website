"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { locales, localeMeta, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
          tone === "light"
            ? "border-white/30 text-white hover:bg-white/20"
            : "border-navy-200 text-navy-700 hover:border-navy-400 hover:bg-navy-50",
        )}
      >
        <Globe className="h-4 w-4 opacity-80" />
        {localeMeta[locale].native}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-sand-300 bg-white p-1.5 shadow-[var(--shadow-lift)]"
        >
          {locales.map((l: Locale) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors",
                  l === locale
                    ? "bg-navy-50 text-navy-900"
                    : "text-navy-600 hover:bg-sand-100",
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-6 text-xs font-bold text-accent-600">
                    {localeMeta[l].native}
                  </span>
                  <span dir={localeMeta[l].dir}>{localeMeta[l].label}</span>
                </span>
                {l === locale && <Check className="h-4 w-4 text-esg-600" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
