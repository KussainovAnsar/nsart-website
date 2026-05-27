"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

        {/* Logo wall */}
        <div className="mt-12">
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
