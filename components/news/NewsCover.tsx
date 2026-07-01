import { Newspaper } from "lucide-react";
import type { NewsItem } from "@/lib/news";

/**
 * Cover visual for a news item.
 *
 * If the item has an `image`, it is shown. Otherwise a branded navy
 * placeholder is rendered — with the category tag and a subtle grid — so a
 * card without a photo still looks intentional and finished.
 */
export function NewsCover({
  item,
  className = "",
  priority = false,
}: {
  item: NewsItem;
  className?: string;
  priority?: boolean;
}) {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.title}
        loading={priority ? "eager" : "lazy"}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-navy-900 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.5]" />
      <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-accent-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-6 h-44 w-44 rounded-full bg-esg-500/20 blur-3xl" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-accent-300 ring-1 ring-white/15">
          <Newspaper className="h-5 w-5" />
        </span>
        <span className="eyebrow text-accent-300/90">{item.tag}</span>
      </div>
    </div>
  );
}
