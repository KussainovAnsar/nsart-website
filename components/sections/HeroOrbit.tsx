"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const nodes = [
  { angle: -90, key: 0 },
  { angle: -10, key: 1 },
  { angle: 90, key: 2 },
  { angle: 170, key: 3 },
];

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export function HeroOrbit() {
  const { t } = useLanguage();
  const regions = t.markets.items;
  const cx = 200;
  const cy = 200;
  const r = 132;

  return (
    <div className="relative aspect-square w-full">
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3f86c9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#185fa5" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#aec2d8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0f6e56" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Static dotted rings */}
        {[180, 132, 84].map((rr) => (
          <circle
            key={rr}
            cx={cx}
            cy={cy}
            r={rr}
            fill="none"
            stroke="rgba(174,194,216,0.18)"
            strokeWidth="1"
            strokeDasharray="2 7"
          />
        ))}

        {/* Rotating accent ring */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="url(#ring)"
          strokeWidth="1.5"
          strokeDasharray="4 10"
          style={{ transformOrigin: "200px 200px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Connections + nodes */}
        {nodes.map((n) => {
          const p = polar(cx, cy, r, n.angle);
          return (
            <g key={n.key}>
              <line
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke="rgba(174,194,216,0.25)"
                strokeWidth="1"
              />
              <motion.circle
                cx={p.x}
                cy={p.y}
                r="6"
                fill="#3f86c9"
                animate={{ opacity: [0.4, 1, 0.4], r: [5, 7, 5] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: n.key * 0.6,
                  ease: "easeInOut",
                }}
              />
              <circle cx={p.x} cy={p.y} r="11" fill="#3f86c9" opacity="0.12" />
            </g>
          );
        })}

        {/* Core */}
        <circle cx={cx} cy={cy} r="46" fill="url(#coreGlow)" />
        <circle
          cx={cx}
          cy={cy}
          r="26"
          fill="#0d1c30"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
        />
        <g transform={`translate(${cx} ${cy})`}>
          <rect
            x="-9"
            y="-9"
            width="11"
            height="11"
            rx="2.5"
            transform="rotate(45)"
            fill="#aec2d8"
          />
          <rect
            x="-2"
            y="-9"
            width="11"
            height="11"
            rx="2.5"
            transform="rotate(45)"
            fill="#c0392b"
          />
        </g>
      </svg>

      {/* Region labels */}
      {nodes.map((n) => {
        const p = polar(50, 50, 41, n.angle);
        return (
          <span
            key={n.key}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-navy-900/70 px-2.5 py-1 text-[0.7rem] font-medium text-navy-100 backdrop-blur-sm"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {regions[n.key]?.name}
          </span>
        );
      })}
    </div>
  );
}
