"use client";

import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";

export default function FAQ() {
  const { faq } = site;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-line pt-14 md:pt-20 pb-14 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <span className="eyebrow lux-rule">Frequently Asked</span>
            <h2 className="h-display mt-5 text-4xl text-fg md:text-5xl">
              Details of the <span className="italic text-gold">engagement</span>.
            </h2>
          </div>

          <ul className="flex flex-col border-t border-line">
            {faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={i} className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between py-7 text-left transition-colors hover:text-gold"
                  >
                    <span className="font-serif text-xl text-fg md:text-2xl">{item.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${
                        isOpen ? "border-gold text-gold" : "border-line text-fg-dim"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.div>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl pb-7 text-base leading-relaxed text-fg-muted">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
