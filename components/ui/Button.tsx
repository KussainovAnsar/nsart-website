import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-600 disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-white shadow-[var(--shadow-soft)] hover:bg-navy-800 hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5",
  secondary:
    "border border-navy-200 bg-white text-navy-800 hover:border-navy-400 hover:bg-navy-50",
  ghost: "text-navy-700 hover:bg-navy-50",
  light:
    "bg-white text-navy-900 hover:bg-sand-100 shadow-[var(--shadow-soft)] hover:-translate-y-0.5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  children,
  className,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href">) {
  const internal = href.startsWith("/") || href.startsWith("#");
  const classes = cn(base, sizes[size], variants[variant], "break-words whitespace-pre-line min-w-0", className);
  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
      )}
    </>
  );

  if (internal) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}
