"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Quote } from "lucide-react";

const team = [
  {
    name: "Anaya Mehrotra",
    role: "Principal · Founder",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80",
    note: "Trained at JJ School of Art and the AA, London. Twenty years in residential practice.",
  },
  {
    name: "Vikram Iyer",
    role: "Partner · Architecture",
    img: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=900&q=80",
    note: "Former Studio Mumbai associate. Leads our heritage and renovation portfolio.",
  },
  {
    name: "Sara Thomas",
    role: "Director · Interiors",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80",
    note: "Curates the studio's material library and partner ateliers across India.",
  },
  {
    name: "Karan Singh",
    role: "Director · Projects",
    img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=900&q=80",
    note: "Twelve years in luxury site delivery. Owns the studio's quality checklist.",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative border-t border-line bg-bg-soft/40 pt-14 md:pt-20 pb-14 md:pb-20">
      <div className="absolute inset-0 -z-10">
        <div className="grain" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow lux-rule">The Studio</span>
            <h2 className="h-display mt-5 text-4xl text-fg md:text-6xl">
              Twenty-eight pairs of hands. <br />
              <span className="italic text-gold">Four senior partners.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-fg-muted">
            Every residence is led personally by a senior partner from brief to handover. We
            limit our intake so this is always possible.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <motion.figure
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-sm border border-line bg-bg"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={m.img}
                  alt={m.name}
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="object-cover grayscale transition-all duration-[1500ms] ease-out group-hover:grayscale-0 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/70 via-bg/20 to-transparent" />
                <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.28em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <figcaption className="flex flex-col gap-2 p-5">
                <h3 className="font-serif text-2xl text-fg">{m.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{m.role}</p>
                <p className="mt-2 text-sm text-fg-muted">{m.note}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid gap-8 rounded-sm border border-line bg-bg p-8 md:grid-cols-[auto_1fr] md:gap-12 md:p-12"
        >
          <Quote className="h-12 w-12 text-gold/70" strokeWidth={1} />
          <div>
            <blockquote className="font-serif text-2xl leading-snug text-fg md:text-4xl">
              We don't sell square feet. We make rooms a family will rearrange around themselves
              for the next thirty years.
            </blockquote>
            <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-fg-muted">
              Anaya Mehrotra · Founder
            </p>
          </div>
        </motion.figure>
      </div>
    </section>
  );
}
