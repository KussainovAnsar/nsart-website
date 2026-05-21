import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "start",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "start" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "eyebrow mb-3 inline-flex items-center gap-2",
              tone === "light" ? "text-accent-400" : "text-accent-600",
            )}
          >
            <span
              className={cn(
                "h-px w-6",
                tone === "light" ? "bg-accent-400/60" : "bg-accent-600/50",
              )}
            />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal index={1}>
        <h2
          className={cn(
            "text-balance text-3xl font-bold leading-[1.1] sm:text-4xl md:text-[2.7rem]",
            tone === "light" ? "text-white" : "text-navy-950",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal index={2}>
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed",
              tone === "light" ? "text-navy-100/80" : "text-navy-600/90",
            )}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
