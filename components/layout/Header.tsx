"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [audOpen, setAudOpen] = useState(false);
  const [compOpen, setCompOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    queueMicrotask(() => setMobileOpen(false));
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const audiences = [
    { href: "/investors", label: t.nav.investors },
    { href: "/enterprise", label: t.nav.enterprise },
    { href: "/founders", label: t.nav.founders },
  ];

  const company = [
    { href: "/about", label: t.nav.about },
    { href: "/technologies", label: t.nav.technologies },
    { href: "/ip", label: t.nav.ip },
    { href: "/markets", label: t.nav.markets },
    { href: "/partners", label: t.nav.partners },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-sand-300/70 py-2.5"
          : "border-b border-transparent py-4",
      )}
    >
      <div className="container-page flex items-center justify-between gap-4 break-words whitespace-pre-line min-w-0">
        <Link href="/" aria-label="NSART home" className="shrink-0">
          <Logo tone={scrolled ? "dark" : "light"} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* Company dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCompOpen(true)}
            onMouseLeave={() => setCompOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCompOpen((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors break-words whitespace-pre-line min-w-0",
                scrolled
                  ? "text-navy-700 hover:bg-navy-50"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              {t.navGroups.company}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  compOpen && "rotate-180",
                )}
              />
            </button>
            {compOpen && (
              <div className="absolute start-0 top-full z-50 w-64 pt-2">
                <div className="overflow-hidden rounded-2xl border border-sand-300 bg-white p-1.5 shadow-[var(--shadow-lift)]">
                  {company.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink href="/miras" scrolled={scrolled}>{t.nav.miras}</NavLink>

          {/* Audiences dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAudOpen(true)}
            onMouseLeave={() => setAudOpen(false)}
          >
            <button
              type="button"
              onClick={() => setAudOpen((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors break-words whitespace-pre-line min-w-0",
                scrolled
                  ? "text-navy-700 hover:bg-navy-50"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              {t.navGroups.audiences}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  audOpen && "rotate-180",
                )}
              />
            </button>
            {audOpen && (
              <div className="absolute start-0 top-full z-50 w-72 pt-2">
                <div className="overflow-hidden rounded-2xl border border-sand-300 bg-white p-1.5 shadow-[var(--shadow-lift)]">
                  {audiences.map((a) => (
                    <Link
                      key={a.href}
                      href={a.href}
                      className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
                    >
                      {a.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink href="/contact" scrolled={scrolled}>{t.nav.contact}</NavLink>
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block">
            <LanguageSwitcher tone={scrolled ? "dark" : "light"} />
          </div>
          <Button href="/contact" size="md" className="hidden md:inline-flex">
            {t.common.getInTouch}
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden",
              scrolled
                ? "border-navy-200 text-navy-800 hover:bg-navy-50"
                : "border-white/20 text-white hover:bg-white/10"
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 end-0 flex w-[88%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-sand-300 px-5 py-4">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 text-navy-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <p className="eyebrow mb-2 text-navy-400">{t.navGroups.audiences}</p>
              <div className="flex flex-col">
                {audiences.map((a) => (
                  <MobileLink key={a.href} href={a.href}>
                    {a.label}
                  </MobileLink>
                ))}
              </div>
              <div className="my-5 h-px bg-sand-300" />
              <p className="eyebrow mb-2 text-navy-400">{t.navGroups.company}</p>
              <div className="flex flex-col">
                <MobileLink href="/about">{t.nav.about}</MobileLink>
                <MobileLink href="/technologies">{t.nav.technologies}</MobileLink>
                <MobileLink href="/ip">{t.nav.ip}</MobileLink>
                <MobileLink href="/miras">{t.nav.miras}</MobileLink>
                <MobileLink href="/markets">{t.nav.markets}</MobileLink>
                <MobileLink href="/partners">{t.nav.partners}</MobileLink>
                <MobileLink href="/contact">{t.nav.contact}</MobileLink>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-sand-300 px-5 py-4">
              <LanguageSwitcher />
              <Button href="/contact" withArrow>
                {t.common.getInTouch}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
  scrolled,
}: {
  href: string;
  children: React.ReactNode;
  scrolled: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-3.5 py-2 text-sm font-medium transition-colors break-words whitespace-pre-line min-w-0",
        scrolled
          ? "text-navy-700 hover:bg-navy-50"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      )}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl px-3 py-3 text-base font-medium text-navy-800 transition-colors hover:bg-navy-50 break-words whitespace-pre-line min-w-0"
    >
      {children}
    </Link>
  );
}
