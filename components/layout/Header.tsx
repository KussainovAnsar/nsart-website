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
  const [openGroup, setOpenGroup] = useState<string | null>(null);

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

  const company = [
    { href: "/about", label: t.nav.about },
    { href: "/team", label: t.nav.team },
    { href: "/contact", label: t.nav.contact },
  ];

  const solutions = [
    { href: "/technologies", label: t.nav.technologies },
    { href: "/ip", label: t.nav.ip },
  ];

  const ecosystem = [
    { href: "/markets", label: t.nav.markets },
    { href: "/partners", label: t.nav.partners },
    { href: "/investors", label: t.nav.investors },
    { href: "/enterprise", label: t.nav.enterprise },
    { href: "/founders", label: t.nav.founders },
  ];

  const groups = [
    { key: "company", label: t.navGroups.company, items: company, width: "w-64" },
    { key: "solutions", label: t.navGroups.solutions, items: solutions, width: "w-64" },
    { key: "ecosystem", label: t.navGroups.ecosystem, items: ecosystem, width: "w-72" },
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
      <div className="container-page flex items-center justify-between gap-4">
        <Link href="/" aria-label="NSART home" className="shrink-0">
          <Logo tone={scrolled ? "dark" : "light"} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {groups.map((g) => (
            <div
              key={g.key}
              className="relative"
              onMouseEnter={() => setOpenGroup(g.key)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenGroup((v) => (v === g.key ? null : g.key))
                }
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  scrolled
                    ? "text-navy-700 hover:bg-navy-50"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                {g.label}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform",
                    openGroup === g.key && "rotate-180",
                  )}
                />
              </button>
              {openGroup === g.key && (
                <div className={cn("absolute start-0 top-full z-50 pt-2", g.width)}>
                  <div className="overflow-hidden rounded-2xl border border-sand-300 bg-white p-1.5 shadow-[var(--shadow-lift)]">
                    {g.items.map((c) => (
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
          ))}

          <NavLink href="/news" scrolled={scrolled}>{t.nav.news}</NavLink>

          <NavLink href="/miras" scrolled={scrolled}>{t.nav.miras}</NavLink>
          {/* Языковой переключатель прямо в навигации */}
          <div className="ml-2 flex items-center">
            <LanguageSwitcher tone={scrolled ? "dark" : "light"} />
          </div>
        </nav>

        <div className="flex items-center gap-2.5">
          <Button href="/apply" size="md" className="hidden md:inline-flex">
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
              <div className="mb-5 flex flex-col">
                <MobileLink href="/news">{t.nav.news}</MobileLink>
                <MobileLink href="/miras">{t.nav.miras}</MobileLink>
              </div>
              {groups.map((g, i) => (
                <div key={g.key}>
                  {i > 0 && <div className="my-5 h-px bg-sand-300" />}
                  <p className="eyebrow mb-2 text-navy-400">{g.label}</p>
                  <div className="flex flex-col">
                    {g.items.map((c) => (
                      <MobileLink key={c.href} href={c.href}>
                        {c.label}
                      </MobileLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-sand-300 px-4 py-3">
              <LanguageSwitcher placement="top" compact />
              <Button href="/apply" withArrow className="min-w-0 shrink px-4 py-2.5 text-center text-xs leading-tight">
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
        "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
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
      className="rounded-xl px-3 py-3 text-base font-medium text-navy-800 transition-colors hover:bg-navy-50"
    >
      {children}
    </Link>
  );
}
