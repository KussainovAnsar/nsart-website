"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { NewsCover } from "@/components/news/NewsCover";
import { sortedNews } from "@/lib/news";

const ease = [0.16, 1, 0.3, 1] as const;

export default function NewsPage() {
  const [lead, ...rest] = sortedNews;

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
            Новости
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-6 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-[3.2rem]"
          >
            Новости NSART
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-6 text-lg leading-relaxed text-navy-100/80"
          >
            Партнёрства, запуски и события — как NSART строит глубокотехнологичные
            проекты в Казахстане, MENA и Южной Азии.
          </motion.p>
        </div>
      </section>

      {/* Feed */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          {/* Lead story */}
          {lead && (
            <Reveal>
              <Link
                href={`/news/${lead.slug}`}
                className="group grid overflow-hidden rounded-3xl border border-sand-300 bg-sand-50 shadow-sm transition-shadow hover:shadow-[var(--shadow-lift)] md:grid-cols-2"
              >
                <div className="relative aspect-[16/10] md:aspect-auto">
                  <NewsCover item={lead} priority />
                </div>
                <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-navy-500">
                    <span className="eyebrow text-accent-600">{lead.tag}</span>
                    <span aria-hidden>·</span>
                    <time dateTime={lead.date}>{lead.displayDate}</time>
                    {lead.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {lead.location}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-extrabold leading-tight text-navy-950 sm:text-3xl">
                    {lead.title}
                  </h2>
                  <p className="leading-relaxed text-navy-700">{lead.excerpt}</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600">
                    Читать
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Rest — grid */}
          <div className="mt-10 grid gap-7 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item, i) => (
              <Reveal key={item.slug} index={i % 3}>
                <Link
                  href={`/news/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-300 bg-white shadow-sm transition-shadow hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="relative aspect-[16/10]">
                    <NewsCover item={item} />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-navy-500">
                      <span className="eyebrow text-accent-600">{item.tag}</span>
                      <span aria-hidden>·</span>
                      <time dateTime={item.date}>{item.displayDate}</time>
                    </div>
                    <h3 className="text-lg font-bold leading-snug text-navy-950">
                      {item.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-navy-600">
                      {item.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-accent-600">
                      Читать
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
