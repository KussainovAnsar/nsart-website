"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export default function FoundersPage() {
  const { t } = useLanguage();
  const page = t.foundersPage;

  // Form states
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    industry: "",
    stage: "",
    need: "",
    name: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-sand-50 min-h-screen">
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-20 text-white sm:pt-36 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.4]" />
        <div className="container-page relative">
          <div className="max-w-3xl">
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

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {page.ctas.map((cta, i) => (
                <a
                  key={cta}
                  href={i === 1 ? "/miras" : "#apply-form"}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                    i === 0
                      ? "bg-white text-navy-950 shadow-[var(--shadow-lift)] hover:-translate-y-0.5"
                      : "border border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  {cta}
                  {i === 0 && <ArrowRight className="h-4 w-4" />}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* IP Lifecycle Timeline */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent-600">IP Pipeline</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {page.lifecycle.heading}
            </h2>
            <p className="mt-4 text-navy-600 leading-relaxed">
              {page.lifecycle.sub}
            </p>
          </div>

          <div className="mt-16 relative">
            {/* Desktop timeline line */}
            <div className="absolute top-1/2 start-0 end-0 h-0.5 bg-sand-200 -translate-y-1/2 hidden lg:block" />
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {page.lifecycle.steps.map((step, i) => (
                <Reveal key={step.n} index={i}>
                  <div className="relative rounded-[var(--radius-card)] border border-sand-300 bg-sand-50 p-6 hover:bg-white hover:shadow-[var(--shadow-lift)] transition-all duration-300 group z-10">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 text-white font-display font-bold text-sm">
                      {step.n}
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-navy-950 group-hover:text-accent-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* University Focus & Asset Types */}
      <section className="py-20 sm:py-28 bg-sand-50 border-t border-sand-200">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Left: Dedicated Track */}
          <div className="flex flex-col justify-center rounded-3xl border border-sand-300 bg-white p-8 sm:p-10 shadow-sm">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-esg-600/10 text-esg-600">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-2xl font-extrabold text-navy-950 sm:text-3xl">
              {page.university.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-navy-600">
              {page.university.text}
            </p>
            <div className="mt-6 border-t border-sand-200 pt-6">
              <p className="text-sm font-semibold text-navy-900 leading-snug">
                {page.university.anchors}
              </p>
            </div>
          </div>

          {/* Right: Asset Types */}
          <div className="flex flex-col justify-center">
            <span className="eyebrow text-accent-600">Scope of Assets</span>
            <h2 className="mt-3 text-2xl font-extrabold text-navy-950 sm:text-3xl">
              {page.assets.heading}
            </h2>
            <div className="mt-8 flex flex-col gap-3">
              {page.assets.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-sand-300 bg-white px-5 py-4 shadow-sm"
                >
                  <div className="h-2 w-2 rounded-full bg-accent-600" />
                  <span className="font-semibold text-navy-800 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="py-20 sm:py-28 bg-white border-t border-sand-200">
        <div className="container-page max-w-3xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow text-accent-600">Miras Fast-Track</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-950 sm:text-4xl">
              {page.form.heading}
            </h2>
            <p className="mt-4 text-navy-600">
              {page.form.sub}
            </p>
          </div>

          <div className="rounded-3xl border border-sand-300 bg-sand-50 p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center"
              >
                <div className="h-16 w-16 rounded-full bg-esg-600/10 text-esg-600 flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-navy-950">
                  {page.form.success}
                </h3>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-500 mb-2">
                      {page.form.name}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm text-navy-900 focus:border-navy-500 focus:outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-500 mb-2">
                      {page.form.email}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      className="w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm text-navy-900 focus:border-navy-500 focus:outline-none"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-500 mb-2">
                      {page.form.industry}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AI, SpaceTech"
                      className="w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm text-navy-900 focus:border-navy-500 focus:outline-none"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-500 mb-2">
                      {page.form.stage}
                    </label>
                    <select
                      className="w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm text-navy-900 focus:border-navy-500 focus:outline-none"
                      value={formData.stage}
                      onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    >
                      <option value="">Select stage...</option>
                      {page.form.stages.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-500 mb-2">
                    {page.form.need}
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your technology and requirements..."
                    className="w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm text-navy-900 focus:border-navy-500 focus:outline-none resize-none"
                    value={formData.need}
                    onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-navy-950 px-6 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    {page.form.submit}
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
