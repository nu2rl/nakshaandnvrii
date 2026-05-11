"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/site";

export default function Process() {
  const { process } = site;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative border-t border-line pt-14 md:pt-20 pb-14 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow lux-rule">{process.eyebrow}</span>
            <h2 className="h-display mt-5 text-4xl text-fg md:text-6xl">
              {process.title}
            </h2>
          </div>
          <p className="max-w-md text-sm text-fg-muted md:mb-2">
            {process.sub}
          </p>
        </div>

        <div className="relative mt-20 md:mt-28" ref={ref}>
          {/* Vertical progress line */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-gold via-gold to-transparent"
          />

          <ol className="relative flex flex-col gap-24 md:gap-32">
            {process.steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`flex w-full flex-col md:flex-row md:items-center ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex flex-1 ${i % 2 === 0 ? "md:justify-end md:pr-20" : "md:justify-start md:pl-20"}`}>
                  <div className={`max-w-md ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <span className="font-mono text-[10px] tracking-[0.4em] text-gold-soft">
                      {s.weeks}
                    </span>
                    <h3 className="mt-3 font-serif text-3xl text-fg md:text-4xl">{s.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                      {s.body}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 my-8 flex shrink-0 items-center justify-center md:my-0 md:w-20">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-bg-soft text-gold">
                    <s.icon className="h-5 w-5" />
                    <span className="absolute -inset-1 rounded-full border border-gold/10" />
                  </div>
                </div>

                <div className="flex flex-1" />
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
