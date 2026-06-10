"use client";

import { motion } from "motion/react";
import { ArrowRight, Cpu, Sparkles } from "lucide-react";
import { HeroInfrastructure } from "./HeroInfrastructure";

const ease = [0.16, 1, 0.3, 1] as const;

const inputs = [
  {
    title: "Capital seeking deep-tech exposure",
    text: "Structured, SDG-aligned access to an ecosystem spanning Central & South Asia and MEA.",
  },
  {
    title: "A problem that needs deep-tech",
    text: "Innovation scoped from R&D, built, certified, and deployed at scale.",
  },
  {
    title: "An asset that needs to work harder",
    text: "R&D output or innovation sitting unprotected, undervalued, or off the balance sheet.",
  },
];

const outputs = [
  {
    audience: "For those deploying capital",
    title: "A structured, SDG-aligned investment vehicle",
    text: "NSART Gateway connects capital to sovereign infrastructure, GovTech, and space with ESG and Ethical AI governance.",
    accent: "bg-accent-600",
  },
  {
    audience: "For those deploying technology",
    title: "Deep-tech from R&D to certified operation",
    text: "Sovereign AI platforms, exascale compute, GovTech, and smart infrastructure built to international standards.",
    accent: "bg-primary-600",
  },
  {
    audience: "For those protecting what they built",
    title: "Intangible assets on the balance sheet",
    text: "Miras turns R&D results into recognized assets that improve creditworthiness and open paths to investment.",
    accent: "bg-amber-600",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-28 text-white sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.55]" />
      <div
        className="pointer-events-none absolute -top-44 start-[-12%] h-[34rem] w-[34rem] rounded-full opacity-45 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(24,95,165,0.5), transparent)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[-18rem] end-[-10%] h-[36rem] w-[36rem] rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(15,110,86,0.45), transparent)" }}
      />

      <div className="container-page relative pb-12 sm:pb-16 lg:pb-20">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_0.72fr] lg:items-start">
          <div className="min-w-0">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="eyebrow inline-flex items-center gap-3 text-navy-100/75"
            >
              <span className="h-px w-7 bg-navy-100/45" />
              Technology Interaction · Kazakhstan · GCC · Africa
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06, ease }}
              className="mt-6 max-w-4xl text-balance font-display text-[2.35rem] font-extrabold leading-[1.04] tracking-normal text-white sm:text-5xl lg:text-[4rem]"
            >
              The lab where deep technology becomes something real.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14, ease }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-navy-100/78 sm:text-lg"
            >
              Raw science, unproven infrastructure, and untapped IP all pass through the same process:
              rigorous, certified, and built for the world. The output depends on what you bring in.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.18, ease }}
            className="pointer-events-none relative mx-auto w-full max-w-md lg:min-h-72 lg:max-w-none"
          >
            <div className="relative -mt-8 lg:absolute lg:inset-x-0 lg:-top-20 lg:mt-0">
              <HeroInfrastructure />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.22, ease }}
          className="mt-10 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.035] shadow-[0_28px_100px_-70px_rgba(63,134,201,0.9)] backdrop-blur-sm"
        >
          <div className="grid lg:grid-cols-[1fr_4.75rem_1fr]">
            <div className="bg-white/[0.035] p-5 sm:p-6 lg:p-7">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-navy-100/55">
                What comes in
              </p>
              <div className="mt-4 divide-y divide-white/10">
                {inputs.map((item) => (
                  <div key={item.title} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-navy-100/45" />
                    <div className="min-w-0">
                      <h2 className="text-sm font-semibold leading-snug text-white">{item.title}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-navy-100/68">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center border-y border-white/10 bg-navy-950/45 px-5 py-5 lg:border-x lg:border-y-0 lg:px-0">
              <div className="absolute inset-x-10 top-1/2 hidden h-px -translate-y-1/2 bg-white/12 lg:block" />
              <div className="absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-white/12 max-lg:hidden" />
              <div className="relative flex items-center gap-3 lg:flex-col">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]">
                  <Cpu className="h-4 w-4 text-primary-300" />
                </span>
                <div className="flex items-center gap-2 lg:flex-col">
                  <span className="h-px w-10 bg-white/20 lg:h-10 lg:w-px" />
                  <p className="whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/80 lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed]">
                    NSART Lab
                  </p>
                  <span className="h-px w-10 bg-white/20 lg:h-10 lg:w-px" />
                </div>
              </div>
            </div>

            <div className="bg-navy-950/20">
              <p className="border-b border-white/10 px-5 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-navy-100/55 sm:px-6 lg:px-7">
                What goes out
              </p>
              <div className="divide-y divide-white/10">
                {outputs.map((item) => (
                  <a
                    key={item.title}
                    href="#audiences"
                    className="group relative block overflow-hidden px-5 py-5 transition-colors hover:bg-white/[0.045] sm:px-6 lg:px-7"
                  >
                    <span className={`absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100 ${item.accent}`} />
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary-300">
                        {item.audience}
                      </p>
                      <ArrowRight className="h-4 w-4 flex-none text-navy-100/45 transition-transform group-hover:translate-x-1" />
                    </div>
                    <h2 className="mt-2 text-base font-semibold leading-snug text-white">{item.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-navy-100/68">{item.text}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.32, ease }}
          className="mt-5 flex flex-wrap gap-2"
        >
          {[
            "ISO 9001",
            "IVS 210",
            "IAS 38",
            "ISA 620",
            "ISO 56000 series",
            "CEN/TS 16555-4",
            "ISO/IEC 27002",
            "ISO 55001",
            "ISO 14001",
            "ISO 10015",
            "TIA-942",
            "Uptime Tier III/IV",
            "UN e-Gov Top-25",
            "SDG-aligned",
          ].map(
            (item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-navy-100/70"
              >
                <Sparkles className="h-3 w-3 text-accent-400" />
                {item}
              </span>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}
