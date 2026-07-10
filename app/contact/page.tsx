"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "motion/react";
import { Mail, MapPin, ArrowRight, CheckCircle } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/* Same delivery pipeline as /apply: FormSubmit AJAX with mailto fallback,
   so audience answers are collected even when the visitor has no mail client. */
const FORM_PRIMARY = "ansar02012004@gmail.com";
const FORM_CC = "A.kozhanbet@nsart.kz,nur@nsart.kz";
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${FORM_PRIMARY}`;
const ALL_RECIPIENTS = `${FORM_PRIMARY},${FORM_CC}`;

export default function ContactPage() {
  const { t } = useLanguage();
  const page = t.contactPage;

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    audience: "",
    industry: "",
    interest: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSending(true);

    const fields: [string, string][] = [
      [page.formName, form.name],
      [page.formEmail, form.email],
      [page.formOrg, form.org],
      [page.formAudience, form.audience],
      [page.formIndustry, form.industry],
      [page.formInterest, form.interest],
      [page.formMessage, form.message],
    ];

    const payload: Record<string, string> = {
      _subject: "NSART — Контакт / Contact form",
      _cc: FORM_CC,
      _captcha: "false",
      _template: "table",
    };
    fields.forEach(([label, value]) => {
      payload[label] = value.trim() || "—";
    });

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setSubmitted(true);
    } catch {
      // Network/endpoint failure — fall back to the visitor's mail client.
      const subject = encodeURIComponent(`NSART contact — ${form.audience || "general"}`);
      const body = encodeURIComponent(
        fields.map(([label, value]) => `${label}: ${value || "—"}`).join("\n"),
      );
      window.location.href = `mailto:${ALL_RECIPIENTS}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } finally {
      setSending(false);
    }
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
        <div className="container-page grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <div className="rounded-3xl border border-sand-300 bg-sand-50 p-6 sm:p-10 shadow-sm">
            <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">
              {page.formHeading}
            </h2>
            {submitted ? (
              <div className="mt-8 flex flex-col items-center text-center py-10">
                <div className="h-16 w-16 rounded-full bg-esg-600/10 text-esg-600 flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <p className="text-lg font-bold text-navy-950">{page.formSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label={page.formName}
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    required
                  />
                  <Field
                    label={page.formEmail}
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    required
                  />
                </div>
                <Field
                  label={page.formOrg}
                  value={form.org}
                  onChange={(v) => setForm({ ...form, org: v })}
                />
                <ChipGroup
                  label={page.formAudience}
                  options={page.audienceOptions}
                  value={form.audience}
                  onChange={(v) => setForm({ ...form, audience: v })}
                />
                <ChipGroup
                  label={page.formIndustry}
                  options={t.applyPage.questions.industry.options}
                  value={form.industry}
                  onChange={(v) => setForm({ ...form, industry: v })}
                />
                <ChipGroup
                  label={page.formInterest}
                  options={t.applyPage.questions.request.options}
                  value={form.interest}
                  onChange={(v) => setForm({ ...form, interest: v })}
                />
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-500 mb-2">
                    {page.formMessage}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm text-navy-900 focus:border-navy-500 focus:outline-none resize-none"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-navy-950 px-6 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {page.formSubmit}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
                <p className="text-xs text-navy-500 leading-relaxed">{page.privacy}</p>
              </form>
            )}
          </div>

          {/* Direct contact */}
          <div className="space-y-6">
            <div>
              <span className="eyebrow text-accent-600">{page.directHeading}</span>
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
                  {page.location}
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

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <span className="block text-xs font-bold uppercase tracking-wider text-navy-500 mb-2">
        {label}
      </span>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              type="button"
              key={opt}
              onClick={() => onChange(active ? "" : opt)}
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
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-navy-500 mb-2">
        {label}
      </label>
      <input
        type={type}
        required={required}
        className="w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-sm text-navy-900 focus:border-navy-500 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
