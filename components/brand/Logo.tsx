import { cn } from "@/lib/utils";

/**
 * NSART mark — interlocking nodes evoking "technology interaction":
 * two linked diamonds, navy + brand red.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("h-7 w-7", className)}
      aria-hidden="true"
    >
      <rect
        x="3.2"
        y="9.5"
        width="13"
        height="13"
        rx="3"
        transform="rotate(45 9.7 16)"
        fill="currentColor"
      />
      <rect
        x="15.8"
        y="9.5"
        width="13"
        height="13"
        rx="3"
        transform="rotate(45 22.3 16)"
        fill="var(--color-brand-red)"
        opacity="0.92"
      />
      <circle cx="16" cy="16" r="2.7" fill="white" />
    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark
        className={tone === "light" ? "text-white" : "text-navy-700"}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-extrabold tracking-tight",
            tone === "light" ? "text-white" : "text-navy-900",
          )}
        >
          NSART
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.22em]",
            tone === "light" ? "text-white/60" : "text-navy-400",
          )}
        >
          Technology Interaction
        </span>
      </span>
    </span>
  );
}
