"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  CheckCircle2,
  Gauge,
  Layers,
  LineChart,
  Search,
  Server,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;
const kindIcons: LucideIcon[] = [Layers, Search, LineChart, Gauge];
const domainIcons: LucideIcon[] = [Server, Activity, Gauge, LineChart];

export default function DigitalTwinPage() {
  const { t } = useLanguage();
  const page = t.digitalTwinPage;

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
            className="mt-6 text-[1.6rem] font-extrabold leading-[1.15] [overflow-wrap:break-word] [hyphens:auto] sm:text-5xl sm:leading-[1.1] lg:text-[3.2rem]"
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

      {/* Levels of maturity */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-600">{page.levels.heading}</span>
            <p className="mt-4 leading-relaxed text-navy-600">{page.levels.sub}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {page.levels.items.map((level, i) => (
              <Reveal key={level.title} index={i}>
                <div className="relative h-full rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-7">
                  <div className="font-display text-3xl font-extrabold text-navy-100">{level.n}</div>
                  <h3 className="mt-4 text-xl font-extrabold text-navy-950">{level.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">{level.text}</p>
                  {i === 2 && (
                    <div className="mt-5 h-1 w-14 rounded-full bg-accent-600" aria-hidden />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What a twin is asked to do */}
      <section className="border-t border-sand-200 bg-sand-50 py-20 sm:py-28">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-600">{page.kinds.heading}</span>
            <p className="mt-4 leading-relaxed text-navy-600">{page.kinds.sub}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.kinds.items.map((kind, i) => {
              const Icon = kindIcons[i] ?? Layers;
              return (
                <Reveal key={kind.title} index={i}>
                  <article className="h-full rounded-[var(--radius-card)] border border-sand-300 bg-white p-7">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-600/10 text-accent-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold text-navy-950">{kind.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600">{kind.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project scope */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-600">{page.scope.heading}</span>
            <p className="mt-4 leading-relaxed text-navy-600">{page.scope.sub}</p>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {page.scope.steps.map((step, i) => (
              <Reveal key={step.title} index={i}>
                <li className="h-full list-none border-t-2 border-navy-950 pt-6">
                  <span className="font-display text-2xl font-extrabold text-accent-600">
                    {step.n}
                  </span>
                  <h3 className="mt-3 text-lg font-extrabold text-navy-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Domains */}
      <section className="border-t border-sand-200 bg-sand-50 py-20 sm:py-28">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-600">{page.domains.heading}</span>
            <p className="mt-4 leading-relaxed text-navy-600">{page.domains.sub}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {page.domains.items.map((item, i) => {
              const Icon = domainIcons[i] ?? Server;
              return (
                <Reveal key={item.title} index={i}>
                  <article className="h-full rounded-[var(--radius-card)] border border-sand-300 bg-white p-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-600/10 text-accent-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-2xl font-extrabold text-navy-950">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-navy-600">{item.text}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-accent-600/10 px-2.5 py-1 text-[11px] font-medium text-accent-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Standard */}
      <section className="bg-navy-950 py-20 text-white sm:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="eyebrow text-accent-300">{page.standard.heading}</span>
            <p className="mt-5 text-lg leading-relaxed text-navy-100/85">{page.standard.text}</p>
          </div>
          <ul className="grid gap-3">
            {page.standard.points.map((point, i) => (
              <Reveal key={point} index={i}>
                <li className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-navy-100">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-esg-400" />
                  {point}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">
            {page.cta.heading}
          </h2>
          <p className="mt-4 leading-relaxed text-navy-600">{page.cta.text}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-700"
          >
            {page.cta.button}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
