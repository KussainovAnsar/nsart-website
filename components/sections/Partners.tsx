"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { partnerLogos } from "@/lib/partners";

export function Partners() {
  const { t } = useLanguage();
  return (
    <section id="partners" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t.partners.eyebrow}
          title={t.partners.heading}
          sub={t.partners.sub}
        />

        {/* Spotlight partners */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {t.partners.spotlight.map((p, i) => (
            <Reveal key={p.name} index={i}>
              <div className="h-full min-w-0 break-words rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-6">
                <h3 className="min-w-0 break-words text-base font-extrabold text-navy-950">{p.name}</h3>
                <p className="mt-2 min-w-0 break-words whitespace-pre-line text-sm leading-relaxed text-navy-600">{p.role}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Groups */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.partners.groups.map((g, i) => (
            <Reveal key={g.name} index={i}>
              <div className="h-full min-w-0 break-words rounded-[var(--radius-card)] border border-sand-200 bg-white p-5">
                <p className="min-w-0 break-words text-xs font-semibold uppercase tracking-wider text-accent-600">
                  {g.name}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.members.map((m) => (
                    <li
                      key={m}
                      className="min-w-0 break-words rounded-full border border-sand-300 bg-sand-50 px-2.5 py-1 text-xs font-medium text-navy-700"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Logo wall */}
        <div className="mt-14 border-t border-sand-200 pt-10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {partnerLogos.map((logo) => {
              const inner = (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className="max-h-10 w-auto max-w-[80%] object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              );
              const cls =
                "group flex h-20 items-center justify-center rounded-xl border border-sand-200 bg-white p-4 transition-colors hover:border-sand-300";
              return logo.url ? (
                <a
                  key={logo.name}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={logo.name}
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <div key={logo.name} title={logo.name} className={cls}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
