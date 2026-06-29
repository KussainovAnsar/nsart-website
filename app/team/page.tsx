"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { team, pick } from "@/lib/team";

const ease = [0.16, 1, 0.3, 1] as const;

export default function TeamPage() {
  const { t, locale } = useLanguage();
  const page = t.teamPage;

  return (
    <div className="bg-sand-50 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-20 text-white sm:pt-36 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.4]" />
        <div className="container-page relative max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent-600/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-300"
          >
            {page.badge}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-6 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-[3.2rem]"
          >
            {page.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-6 text-lg leading-relaxed text-navy-100/80"
          >
            {page.intro}
          </motion.p>
        </div>
      </section>

      {/* Profiles */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page flex flex-col gap-16 sm:gap-20">
          {team.map((m, i) => {
            const name = pick(m.name, locale)!;
            const bio = pick(m.bio, locale);
            const years = pick(m.years, locale);
            const skills = pick(m.skills, locale);
            const fact = pick(m.fact, locale);
            const reversed = i % 2 === 1;

            return (
              <Reveal key={m.slug} index={0}>
                <div
                  className={`flex flex-col gap-7 sm:gap-10 md:flex-row md:items-center ${
                    reversed ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Photo */}
                  <div className="shrink-0">
                    <div className="relative w-full overflow-hidden rounded-3xl border border-sand-300 bg-sand-100 shadow-sm md:w-[300px]">
                      <img
                        src={m.photo}
                        alt={name}
                        className="aspect-square w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <span className="eyebrow text-accent-600">{m.role}</span>
                    <h2 className="mt-2 text-2xl font-extrabold text-navy-950 sm:text-3xl">
                      {name}
                    </h2>
                    {years && (
                      <span className="mt-3 inline-block rounded-full border border-sand-300 bg-sand-50 px-3 py-1 text-xs font-semibold text-navy-600">
                        {years}
                      </span>
                    )}

                    {bio ? (
                      <p className="mt-5 leading-relaxed text-navy-700">{bio}</p>
                    ) : (
                      <p className="mt-5 text-sm italic text-navy-400">{page.soon}</p>
                    )}

                    {skills && skills.length > 0 && (
                      <div className="mt-6">
                        <p className="text-xs font-bold uppercase tracking-wider text-navy-500">
                          {page.skillsLabel}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {skills.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-sand-300 bg-sand-50 px-3 py-1.5 text-[13px] font-medium text-navy-700"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {fact && (
                      <p className="mt-5 text-sm leading-relaxed text-navy-500">
                        {fact}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
