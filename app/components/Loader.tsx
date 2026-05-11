"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.documentElement.classList.add("no-scroll");

    const startedAt = performance.now();
    const minDuration = 1700;

    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - startedAt;
      const t = Math.min(elapsed / minDuration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 200);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.classList.remove("no-scroll");
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
        >
          <div className="grain" />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative h-24 w-24">
              <svg viewBox="0 0 100 100" className="absolute inset-0 spin-slow">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="var(--color-line)"
                  strokeWidth="0.5"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth="0.5"
                  strokeDasharray="2 6"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-3xl text-gold tracking-wider">A</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              <span className="eyebrow">Setting the table</span>
              <p className="font-serif text-xl text-fg-muted italic">
                a moment, while the lights settle…
              </p>
            </div>

            <div className="mt-2 flex w-64 flex-col items-center gap-2">
              <div className="relative h-px w-full overflow-hidden bg-line">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              <span className="font-mono text-[10px] tracking-[0.4em] text-fg-dim">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
