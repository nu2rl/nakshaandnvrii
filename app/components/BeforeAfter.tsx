"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Move } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const cases = [
  {
    title: "House of Jasmine — Living",
    location: "Bandra, Mumbai",
    days: 84,
    before:
      "https://images.unsplash.com/photo-1583845112203-29329902332e?auto=format&fit=crop&w=1800&q=80",
    after:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=80",
    note: "From the developer-handover shell to a poured, layered, lived-in living room.",
  },
  {
    title: "Lake Villa No. 4 — Kitchen",
    location: "Sarjapur, Bengaluru",
    days: 112,
    before:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1800&q=80",
    after:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1800&q=80",
    note: "Re-planned for an Indian-cooking household, with a hidden working pantry.",
  },
  {
    title: "Iris & Marigold — Bedroom",
    location: "Vasant Vihar, Delhi",
    days: 64,
    before:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1800&q=80",
    after:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80",
    note: "A bedroom that holds quiet, books, and morning light without competing with them.",
  },
];

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [pct, setPct] = useState(50);
  const draggingRef = useRef(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setPct(percent);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      updateFromClientX(x);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateFromClientX]);

  const c = cases[active];

  return (
    <section id="before-after" className="relative bg-bg-soft/40 pt-8 md:pt-10 pb-14 md:pb-20">
      <div className="absolute inset-0 -z-10">
        <div className="grain" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow lux-rule">Before & After</span>
            <h2 className="h-display mt-6 max-w-3xl text-4xl text-fg md:text-6xl">
              The same four walls. <span className="italic text-gold">Twelve weeks apart.</span>
            </h2>
          </div>
          <p className="max-w-md text-fg-muted">
            Drag the brass handle to reveal the transformation. Every project below was completed
            inside its committed timeline, with the family living in the house from week six.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            ref={wrapRef}
            onMouseDown={(e) => {
              draggingRef.current = true;
              updateFromClientX(e.clientX);
            }}
            onTouchStart={(e) => {
              draggingRef.current = true;
              updateFromClientX(e.touches[0].clientX);
            }}
            className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-sm border border-line bg-bg"
          >
            {/* AFTER (full) */}
            <Image
              src={c.after}
              alt={`${c.title} after`}
              fill
              priority
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="object-cover"
            />

            {/* BEFORE (clipped from left) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pct}%` }}
            >
              <div className="relative h-full w-full" style={{ width: `${(100 / Math.max(pct, 1)) * 100}%` }}>
                <Image
                  src={c.before}
                  alt={`${c.title} before`}
                  fill
                  sizes="(min-width: 1024px) 90vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="pointer-events-none absolute inset-0">
              <span className="absolute left-5 top-5 rounded-full border border-line bg-bg/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-fg-muted backdrop-blur">
                Before · Day 0
              </span>
              <span className="absolute right-5 top-5 rounded-full border border-gold/50 bg-gold/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur">
                After · Day {c.days}
              </span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/85 to-transparent p-5 pt-16 md:p-7 md:pt-20">
                <h3 className="font-serif text-2xl text-fg md:text-3xl">{c.title}</h3>
                <p className="mt-1 text-sm text-fg-muted">{c.location} · {c.note}</p>
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute inset-y-0 z-10 flex items-center"
              style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gold/80" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-bg-soft text-gold shadow-[0_8px_24px_-4px_rgba(201,169,97,0.5)]">
                <Move className="h-4 w-4" />
              </div>
            </div>
          </div>

          <input
            aria-label="Before and after slider"
            type="range"
            min={0}
            max={100}
            value={pct}
            onChange={(e) => setPct(Number(e.target.value))}
            className="sr-only"
          />
        </motion.div>

        {/* Case selector */}
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {cases.map((cs, i) => (
            <button
              key={cs.title}
              onClick={() => {
                setActive(i);
                setPct(50);
              }}
              className={`group flex flex-col items-start gap-1 rounded-sm border p-4 text-left transition-colors ${
                active === i ? "border-gold/60 bg-gold/5" : "border-line hover:border-gold/30"
              }`}
            >
              <span className={`font-mono text-[10px] tracking-[0.3em] ${active === i ? "text-gold" : "text-fg-dim"}`}>
                Case {String(i + 1).padStart(2, "0")} · {cs.days} days
              </span>
              <span className="font-serif text-lg text-fg">{cs.title}</span>
              <span className="text-xs text-fg-muted">{cs.location}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
