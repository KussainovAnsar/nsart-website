import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * NSART mark — the brand's dotted "N" globe (always brand-red so it reads
 * on both the dark hero/footer and light surfaces).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/nsart-mark.png"
      alt=""
      width={283}
      height={251}
      priority
      aria-hidden="true"
      className={cn("h-7 w-auto", className)}
    />
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
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-extrabold tracking-tight",
            tone === "light" ? "text-white" : "text-accent-600",
          )}
        >
          NSART
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.22em]",
            tone === "light" ? "text-white/60" : "text-accent-600/70",
          )}
        >
          Technology Interaction
        </span>
      </span>
    </span>
  );
}
