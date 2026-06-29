"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-100">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div
        className="pointer-events-none absolute -top-32 start-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(24,95,165,0.55), transparent)",
        }}
      />
      <div className="container-page relative py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-navy-200/80 break-words whitespace-pre-line min-w-0">
              {t.footer.tagline}
            </p>
            <p className="mt-4 text-xs font-medium tracking-wide text-navy-300/70 break-words whitespace-pre-line min-w-0">
              {t.common.allLanguages}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white break-words whitespace-pre-line min-w-0">
              {t.footer.audiences}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <FooterLink href="/investors">{t.nav.investors}</FooterLink>
              <FooterLink href="/enterprise">{t.nav.enterprise}</FooterLink>
              <FooterLink href="/founders">{t.nav.founders}</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white break-words whitespace-pre-line min-w-0">
              {t.footer.company}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <FooterLink href="/about">{t.nav.about}</FooterLink>
              <FooterLink href="/team">{t.nav.team}</FooterLink>
              <FooterLink href="/technologies">{t.nav.technologies}</FooterLink>
              <FooterLink href="/ip">{t.nav.ip}</FooterLink>
              <FooterLink href="/miras">{t.nav.miras}</FooterLink>
              <FooterLink href="/markets">{t.nav.markets}</FooterLink>
              <FooterLink href="/partners">{t.nav.partners}</FooterLink>
              <FooterLink href="/contact">{t.nav.contact}</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white break-words whitespace-pre-line min-w-0">
              {t.footer.contactTitle}
            </h3>
            <a
              href={`mailto:${t.contact.email}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10 break-words whitespace-pre-line min-w-0"
            >
              <Mail className="h-4 w-4" />
              {t.contact.email}
            </a>
            <p className="mt-4 text-sm text-navy-200/70 break-words whitespace-pre-line min-w-0">nsart.kz</p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
          <p className="text-xs leading-relaxed text-navy-200/60 break-words whitespace-pre-line min-w-0">
            {t.footer.confidential}
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-navy-300/70 sm:flex-row sm:items-center">
          <p className="break-words whitespace-pre-line min-w-0">
            © {year} {t.footer.rights}
          </p>
          <p className="font-medium tracking-wide">
            ISO 9001 · ISO 14001 · TIA-942 · UN e-Gov Top-25
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-navy-200/75 transition-colors hover:text-white break-words whitespace-pre-line min-w-0"
      >
        {children}
      </Link>
    </li>
  );
}
