"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "motion/react";
import { Mail, MapPin, ArrowRight, CheckCircle } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Order the questionnaire is rendered and emailed in. */
const ORDER = [
  "category",
  "company",
  "industry",
  "stage",
  "request",
  "budget",
  "equity",
  "contact",
] as const;

type QuestionKey = (typeof ORDER)[number];

/** Free-text questions (everything else is a single-choice list). */
const TEXT_FIELDS: QuestionKey[] = ["company", "contact"];
/** Fields the visitor must fill before submitting. */
const REQUIRED: QuestionKey[] = ["category", "contact"];

export default function ApplyPage() {
  const { t } = useLanguage();
  const page = t.applyPage;
  const questions = page.questions as Record<
    QuestionKey,
    { label: string; options?: readonly string[] }
  >;

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const set = (key: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const missing = REQUIRED.some((k) => !answers[k]?.trim());
    if (missing) {
      setError(true);
      return;
    }
    setError(false);

    const lines = ORDER.map((key) => `${questions[key].label}: ${answers[key] || "—"}`);
    const subject = encodeURIComponent("NSART — Анкета / Application");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${t.contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

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

      <section className="bg-white py-20 sm:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Questionnaire */}
          <div className="rounded-3xl border border-sand-300 bg-sand-50 p-6 sm:p-10 shadow-sm">
            <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
              {page.formHeading}
            </h2>

            {submitted ? (
              <div className="mt-8 flex flex-col items-center text-center py-10">
                <div className="h-16 w-16 rounded-full bg-esg-600/10 text-esg-600 flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <p className="text-lg font-bold text-navy-950">{page.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                {ORDER.map((key) => {
                  const q = questions[key];
                  const required = REQUIRED.includes(key);

                  if (TEXT_FIELDS.includes(key)) {
                    const multiline = key === "contact";
                    return (
                      <div key={key}>
                        <label className="block text-sm font-bold text-navy-900 mb-3">
                          {q.label}
                          {required && <span className="text-accent-600"> *</span>}
                        </label>
                        {multiline ? (
                          <textarea
                            rows={3}
                            required={required}
                            value={answers[key] || ""}
                            onChange={(e) => set(key, e.target.value)}
                            className="w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm text-navy-900 focus:border-navy-500 focus:outline-none resize-none"
                          />
                        ) : (
                          <input
                            type="text"
                            required={required}
                            value={answers[key] || ""}
                            onChange={(e) => set(key, e.target.value)}
                            className="w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm text-navy-900 focus:border-navy-500 focus:outline-none"
                          />
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={key}>
                      <span className="block text-sm font-bold text-navy-900 mb-3">
                        {q.label}
                        {required && <span className="text-accent-600"> *</span>}
                      </span>
                      <div className="flex flex-wrap gap-2.5">
                        {q.options?.map((opt) => {
                          const active = answers[key] === opt;
                          return (
                            <button
                              type="button"
                              key={opt}
                              onClick={() => set(key, opt)}
                              aria-pressed={active}
                              className={
                                "rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer " +
                                (active
                                  ? "border-navy-950 bg-navy-950 text-white"
                                  : "border-sand-300 bg-white text-navy-700 hover:border-navy-400")
                              }
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {error && (
                  <p className="text-sm font-semibold text-accent-600">
                    {page.requiredHint}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-navy-950 px-6 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  {page.submit}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
                <p className="text-xs text-navy-500 leading-relaxed">{page.privacy}</p>
              </form>
            )}
          </div>

          {/* Direct contact */}
          <div className="space-y-6">
            <div>
              <span className="eyebrow text-accent-600">{page.contactNote}</span>
              <div className="mt-5 space-y-4">
                <a
                  href={`mailto:${t.contact.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-sand-300 bg-white px-5 py-4 text-sm font-semibold text-navy-800 transition-colors hover:bg-sand-50"
                >
                  <Mail className="h-5 w-5 text-accent-600" />
                  {t.contact.email}
                </a>
                <div className="flex items-center gap-3 rounded-2xl border border-sand-300 bg-white px-5 py-4 text-sm text-navy-700">
                  <MapPin className="h-5 w-5 text-accent-600" />
                  {t.contactPage.location}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-sand-300 bg-sand-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-navy-500">
                {t.common.allLanguages}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                {t.footer.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
