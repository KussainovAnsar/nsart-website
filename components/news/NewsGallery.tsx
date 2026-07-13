"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Swipeable photo carousel for a news article.
 *
 * Native horizontal scroll with snap points (touch-friendly on mobile) plus
 * arrow buttons and dots for desktop. The scroller is forced LTR so slide
 * math stays consistent under the Arabic locale.
 */
export function NewsGallery({ images, alt }: { images: string[]; alt: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = (i: number) => {
    const el = scroller.current;
    if (!el) return;
    const next = (i + images.length) % images.length;
    el.scrollTo({ left: el.clientWidth * next, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-sand-300">
      <div
        ref={scroller}
        onScroll={onScroll}
        dir="ltr"
        className="flex aspect-[16/9] snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${alt} — ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            className="h-full w-full flex-none snap-center object-cover"
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => scrollTo(index - 1)}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/45 text-white backdrop-blur-sm transition-colors hover:bg-navy-950/70"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => scrollTo(index + 1)}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/45 text-white backdrop-blur-sm transition-colors hover:bg-navy-950/70"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Photo ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
