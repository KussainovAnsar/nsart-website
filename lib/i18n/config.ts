export const locales = ["en", "ar", "ru", "kk"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<
  Locale,
  { label: string; native: string; dir: "ltr" | "rtl" }
> = {
  en: { label: "English", native: "EN", dir: "ltr" },
  ar: { label: "العربية", native: "AR", dir: "rtl" },
  ru: { label: "Русский", native: "RU", dir: "ltr" },
  kk: { label: "Қазақша", native: "KK", dir: "ltr" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
