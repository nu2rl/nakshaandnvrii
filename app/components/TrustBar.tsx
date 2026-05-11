"use client";

import { motion } from "motion/react";

const press = [
  "Architectural Digest",
  "Elle Decor",
  "Vogue Living",
  "Better Interiors",
  "Goodhomes",
  "Inside Outside",
  "Beautiful Homes",
  "Casa Vogue",
  "Design Pataki",
  "AD100 · 2024",
];

const awards = [
  "Aga Khan · Nominated",
  "WAF · Shortlist",
  "DNA Paris · Winner",
  "IIID · Gold",
  "FOAID · Selection",
  "Trends Excellence",
];

export default function TrustBar() {
  return (
    <section id="trust" className="relative border-y border-line bg-bg-soft/40 py-10">
      <div className="absolute inset-0 -z-10">
        <div className="grain" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex flex-col items-center gap-2 text-center"
        >
          <span className="eyebrow lux-rule">As Seen In · Awarded By</span>
          <p className="max-w-md text-xs text-fg-dim">
            Featured across the publications and juries our clients already read.
          </p>
        </motion.div>

        <Row items={press} duration="42s" direction="normal" />
        <div className="mt-3 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
        <Row items={awards} duration="38s" direction="reverse" />
      </div>
    </section>
  );
}

function Row({ items, duration, direction }: { items: string[]; duration: string; direction: "normal" | "reverse" }) {
  return (
    <div className="marquee-pause overflow-hidden py-3">
      <div
        className="marquee-track gap-12"
        style={{ animationDuration: duration, animationDirection: direction }}
      >
        {[...items, ...items].map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="flex items-center gap-3 whitespace-nowrap font-serif text-xl tracking-wide text-fg-muted/80 md:text-2xl"
          >
            <span className="h-1 w-1 rounded-full bg-gold/60" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
