import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIXC - NSART",
  description:
    "AIXC is a new project within the NSART ecosystem. Launching soon.",
};

export default function AixcPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[linear-gradient(160deg,var(--color-navy-900),var(--color-navy-800)_60%,var(--color-navy-700))] px-6 py-12 text-center text-navy-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(63,134,201,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:22px_22px]" />

      <section className="relative max-w-xl">
        <p className="eyebrow mb-5 text-accent-400">NSART Ecosystem</p>
        <h1 className="bg-[linear-gradient(120deg,#ffffff,var(--color-accent-400)_60%,var(--color-esg-400))] bg-clip-text font-display text-6xl font-bold leading-none text-transparent sm:text-8xl">
          AIXC
        </h1>
        <p className="mt-5 text-base leading-7 text-navy-200 sm:text-xl sm:leading-8">
          A new project within the NSART ecosystem. We are preparing something
          special - this page will be live soon.
        </p>
        <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-navy-200/30 bg-white/5 px-5 py-2.5 text-sm font-medium text-navy-100">
          <span className="size-2 rounded-full bg-esg-400 shadow-[0_0_0_6px_rgba(27,154,120,0.12)]" />
          Launching soon
        </span>
        <p className="mt-10 text-sm">
          <a
            className="border-b border-navy-200/40 pb-px text-navy-200 transition hover:text-white"
            href="https://nsartgateway.com"
          >
            Back to nsartgateway.com
          </a>
        </p>
      </section>
    </main>
  );
}
