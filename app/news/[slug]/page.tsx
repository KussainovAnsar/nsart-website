"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { NewsCover } from "@/components/news/NewsCover";
import { getNewsBySlug, sortedNews } from "@/lib/news";

const ease = [0.16, 1, 0.3, 1] as const;

export default function NewsArticlePage() {
  const params = useParams<{ slug: string }>();
  const item = getNewsBySlug(params.slug);

  if (!item) return notFound();

  const more = sortedNews.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <div className="bg-sand-50 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-16 text-white sm:pt-36 lg:pt-40 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.4]" />
        <div className="container-page relative max-w-3xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-100/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Все новости
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-navy-100/70"
          >
            <span className="eyebrow text-accent-300">{item.tag}</span>
            <span aria-hidden>·</span>
            <time dateTime={item.date}>{item.displayDate}</time>
            {item.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {item.location}
              </span>
            )}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-4 text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.8rem]"
          >
            {item.title}
          </motion.h1>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-14 sm:py-20">
        <article className="container-page max-w-3xl">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-sand-300">
              <NewsCover item={item} priority />
            </div>
          </Reveal>

          <div className="mt-9 flex flex-col gap-5 text-[1.05rem] leading-relaxed text-navy-800">
            {item.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 border-t border-sand-300 pt-6">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 hover:text-accent-500"
            >
              <ArrowLeft className="h-4 w-4" />
              Все новости
            </Link>
          </div>
        </article>
      </section>

      {/* More */}
      {more.length > 0 && (
        <section className="bg-sand-50 py-14 sm:py-20">
          <div className="container-page">
            <h2 className="text-xl font-extrabold text-navy-950 sm:text-2xl">
              Ещё новости
            </h2>
            <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((n, i) => (
                <Reveal key={n.slug} index={i % 3}>
                  <Link
                    href={`/news/${n.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-300 bg-white shadow-sm transition-shadow hover:shadow-[var(--shadow-lift)]"
                  >
                    <div className="relative aspect-[16/10]">
                      <NewsCover item={n} />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-6">
                      <div className="flex items-center gap-2 text-xs text-navy-500">
                        <span className="eyebrow text-accent-600">{n.tag}</span>
                        <span aria-hidden>·</span>
                        <time dateTime={n.date}>{n.displayDate}</time>
                      </div>
                      <h3 className="text-base font-bold leading-snug text-navy-950">
                        {n.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
