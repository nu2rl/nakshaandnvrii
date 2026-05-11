"use client";

import { motion } from "motion/react";
import { Award, Banknote, Hammer, HeartHandshake, Lock, Ruler, ShieldCheck, Sparkles } from "lucide-react";

const reasons = [
  {
    icon: Banknote,
    title: "Fixed-fee, no hidden costs",
    body: "One contract, one number. We absorb supplier price hikes inside the studio, not on your invoice.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime craft warranty",
    body: "On all in-house joinery. We come back to fix a hinge in year ten, the same as we did in week one.",
  },
  {
    icon: Hammer,
    title: "146 quality checkpoints",
    body: "Documented, photographed, and shared with you each fortnight on a private project portal.",
  },
  {
    icon: Ruler,
    title: "Drawing-first practice",
    body: "Every detail drawn at 1:5 before procurement. The site is a quiet place for executing decisions, not making them.",
  },
  {
    icon: HeartHandshake,
    title: "One senior partner per home",
    body: "Your project lead doesn't change. The hand that signs the brief signs the handover.",
  },
  {
    icon: Award,
    title: "Vastu, when it matters",
    body: "We work with senior pandits in Bengaluru and Chennai when Vastu is part of the brief. Optional, never imposed.",
  },
  {
    icon: Lock,
    title: "NDA-protected work",
    body: "Your home is photographed for our archive only with written permission. Many of our finest projects you will never see.",
  },
  {
    icon: Sparkles,
    title: "Six-month post-handover",
    body: "We come back at week 4, week 12, and month 6 to settle the house — for free, with the same lead designer.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why"
      className="relative border-t border-line pt-14 md:pt-20 pb-14 md:pb-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <span className="eyebrow lux-rule">Why Families Choose Us</span>
            <h2 className="h-display mt-5 text-4xl text-fg md:text-5xl">
              Eight quiet promises, kept{" "}
              <span className="italic text-gold">on every project</span>
            </h2>
            <p className="mt-5 text-base text-fg-muted">
              Most of these are unglamorous. They're also why 61% of our work comes from a previous
              client.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-2">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative flex flex-col gap-3 bg-bg-soft p-6 transition-colors hover:bg-bg-elev md:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-bg text-gold">
                    <r.icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.28em] text-fg-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-fg">{r.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{r.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
