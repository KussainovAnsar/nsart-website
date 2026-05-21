"use client";

import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.heading}
          sub={t.contact.sub}
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.contact.audiences.map((a, i) => (
            <Reveal key={a.title} index={i}>
              <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-6">
                <h3 className="text-lg font-extrabold text-navy-950">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{a.text}</p>
                <div className="mt-auto pt-6">
                  <Link
                    href={a.href}
                    className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                  >
                    {a.cta}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <a
            href={`mailto:${t.contact.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:bg-sand-50"
          >
            <Mail className="h-4 w-4" />
            {t.contact.email}
          </a>
          <p className="text-xs text-navy-500">{t.contact.emailLabel}</p>
        </div>
      </div>
    </section>
  );
}
