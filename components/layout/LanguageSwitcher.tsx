"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { locales, localeMeta, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  tone = "dark",
  placement = "bottom",
  compact = false,
}: {
  tone?: "dark" | "light";
  placement?: "top" | "bottom";
  compact?: boolean;
}) {
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
          "inline-flex shrink-0 items-center rounded-full border font-medium transition-colors",
          compact ? "gap-1 px-2.5 py-1.5 text-xs" : "gap-1.5 px-3 py-1.5 text-sm",
          tone === "light"
            ? "border-white/30 text-white hover:bg-white/20"
            : "border-navy-200 text-navy-700 hover:border-navy-400 hover:bg-navy-50",
        )}
      >
        <Globe className={cn("opacity-80", compact ? "h-3.5 w-3.5" : "h-4 w-4")} />
        {localeMeta[locale].native}
        <ChevronDown
          className={cn(compact ? "h-3 w-3" : "h-3.5 w-3.5", "transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className={cn(
            "absolute end-0 z-50 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-sand-300 bg-white p-1.5 shadow-[var(--shadow-lift)]",
            compact ? "w-36" : "w-40 sm:w-44",
            placement === "top" ? "bottom-full mb-2" : "mt-2",
          )}
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
                  "flex w-full items-center justify-between gap-2 rounded-xl transition-colors",
                  compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm",
                  l === locale
                    ? "bg-navy-50 text-navy-900"
                    : "text-navy-600 hover:bg-sand-100",
                )}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="w-5 shrink-0 text-xs font-bold text-accent-600">
                    {localeMeta[l].native}
                  </span>
                  <span className="min-w-0 truncate" dir={localeMeta[l].dir}>
                    {localeMeta[l].label}
                  </span>
                </span>
                {l === locale && <Check className="h-3.5 w-3.5 shrink-0 text-esg-600" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
