"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="font-serif text-[clamp(3rem,7vw,6rem)] leading-none text-fg">
      {val}
      <span className="text-gold">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative border-t border-line pt-14 md:pt-20 pb-14 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <span className="eyebrow lux-rule">By the Numbers</span>
            <h2 className="h-display mt-5 text-4xl text-fg md:text-5xl">
              Fourteen years of <span className="italic text-gold">quiet evidence</span>
            </h2>
            <p className="mt-5 text-base text-fg-muted">
              We track the unsexy metrics — site days lost, change orders raised, defect lists at
              handover. They're how we keep the studio honest, year after year.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
            {site.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative border-t border-line pt-6"
              >
                <Counter to={s.value} suffix={s.suffix} />
                <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-fg-muted">
                  {s.label}
                </p>
                <span className="absolute -top-px left-0 h-px w-12 bg-gold" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-5 border-y border-line py-8 md:grid-cols-3">
          {[
            { k: "0", v: "missed handover dates in 2024" },
            { k: "98.4%", v: "snag list closed at first walk-through" },
            { k: "₹0", v: "average cost overrun on signed scope" },
          ].map((m) => (
            <div key={m.v} className="flex items-baseline gap-4">
              <span className="font-serif text-3xl text-gold">{m.k}</span>
              <span className="text-sm text-fg-muted">{m.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
