"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "We spoke to seven studios. Artha was the only one that asked about how my mother takes her tea. They built our home around the answer.",
    name: "Anaya & Vikram Sahni",
    role: "House of Jasmine · Bandra, Mumbai",
    initials: "AS",
    project: "4 BHK Residence",
  },
  {
    quote:
      "Three years in and the joinery hasn't moved a millimetre. Even our staff notices — drawers close the way they did on day one.",
    name: "Aditi Reddy",
    role: "Lake Villa No. 4 · Bengaluru",
    initials: "AR",
    project: "9,400 sq ft Villa",
  },
  {
    quote:
      "Honest, painfully precise about budget, and obsessive about the small things. We extended their scope to two more properties.",
    name: "Kabir Mehta",
    role: "The Quiet Penthouse · Worli, Mumbai",
    initials: "KM",
    project: "5 BHK Penthouse",
  },
  {
    quote:
      "They protected our heritage tile, our family photographs, and our grandmother's swing — and still built us a fully modern kitchen.",
    name: "The Iyengar Family",
    role: "Athangudi House · Karaikudi",
    initials: "TI",
    project: "Heritage Restoration",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const t = testimonials[i];

  return (
    <section
      id="testimonials"
      className="relative border-t border-line bg-bg-soft/40 pt-14 md:pt-20 pb-14 md:pb-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 -z-10">
        <div className="grain" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <span className="eyebrow lux-rule">Words from our Families</span>
            <h2 className="h-display mt-5 text-4xl text-fg md:text-5xl">
              The only review that <span className="italic text-gold">truly matters</span>
            </h2>
            <p className="mt-5 text-base text-fg-muted">
              We don't run a referral programme. Every project below was sent to us by a previous
              client.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="font-serif text-2xl text-fg">4.97</span>
              <span className="text-xs uppercase tracking-[0.22em] text-fg-dim">/ Houzz · 312 reviews</span>
            </div>
          </div>

          <div className="relative min-h-[400px]">
            <Quote className="absolute -left-2 -top-6 h-24 w-24 text-gold/10" strokeWidth={1} />
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <blockquote className="font-serif text-2xl leading-snug text-fg md:text-4xl">
                  <span className="text-gold">“</span>
                  {t.quote}
                  <span className="text-gold">”</span>
                </blockquote>

                <figcaption className="mt-10 flex items-center gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-bg-soft font-serif text-lg text-gold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-serif text-lg text-fg">{t.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-fg-muted">
                      {t.project} · {t.role}
                    </p>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-between border-t border-line pt-6">
              <div className="flex items-center gap-3">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Show testimonial ${idx + 1}`}
                    className="group relative h-1 w-8 overflow-hidden bg-line"
                  >
                    <span
                      className={`absolute inset-y-0 left-0 transition-all duration-700 ${
                        idx === i ? "w-full bg-gold" : "w-0 bg-gold/40 group-hover:w-1/2"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-4 font-mono text-[10px] tracking-[0.3em] text-fg-dim">
                  {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setI((p) => (p - 1 + testimonials.length) % testimonials.length)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-gold hover:text-gold"
                  aria-label="Previous"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setI((p) => (p + 1) % testimonials.length)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-gold hover:text-gold"
                  aria-label="Next"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
