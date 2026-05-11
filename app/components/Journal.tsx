"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { site } from "@/lib/site";

export default function Journal() {
  const { journal } = site as any; // Temporary cast as we add it to site config
  const entries = journal?.entries || [
    {
      tag: "Studio Notes",
      date: "April · 2026",
      minutes: "4 min read",
      title: "The Architecture of a Meal",
      excerpt: "Why the dining table remains the most complex piece of joinery in a modern home.",
      img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
    },
    {
      tag: "Heritage",
      date: "March · 2026",
      minutes: "6 min read",
      title: "Lime, Stone, and Slow Time",
      excerpt: "Exploring the thermal mass of traditional Indian materials in contemporary villas.",
      img: "https://images.unsplash.com/photo-1613575831056-0681159a7da2?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <section id="journal" className="relative border-t border-line pt-14 md:pt-20 pb-14 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow lux-rule">{journal?.eyebrow || "From the Journal"}</span>
            <h2 className="h-display mt-5 text-4xl text-fg md:text-6xl">
              {journal?.title || "Slow notes on craft and ritual."}
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-fg-muted transition-colors hover:border-gold hover:text-gold"
          >
            <BookOpen className="h-3.5 w-3.5" />
            View all entries
          </a>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:gap-16">
          {entries.map((e: any, i: number) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-bg-soft">
                <Image
                  src={e.img}
                  alt={e.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg/60 via-bg/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-line bg-bg/70 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-fg-muted backdrop-blur-md">
                  {e.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 pt-6">
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-fg-dim">
                  <span>{e.date}</span>
                  <span className="h-1 w-1 rounded-full bg-line" />
                  <span>{e.minutes}</span>
                </div>
                <h3 className="h-display text-2xl text-fg transition-colors group-hover:text-gold md:text-3xl">
                  {e.title}
                </h3>
                <p className="text-sm leading-relaxed text-fg-muted">{e.excerpt}</p>
                <a
                  href="#contact"
                  className="mt-auto inline-flex items-center gap-2 pt-4 text-[11px] uppercase tracking-[0.22em] text-fg-muted transition-colors group-hover:text-gold"
                >
                  Read essay
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
