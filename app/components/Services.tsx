"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";

export default function Services({ onConsult }: { onConsult: () => void }) {
  const { services } = site;

  return (
    <section id="services" className="relative pt-14 md:pt-20 pb-10 md:pb-12">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-16 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="eyebrow lux-rule">{services.eyebrow}</span>
            <h2 className="h-display mt-6 max-w-3xl text-4xl text-fg md:text-6xl">
              {services.title}
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-md text-fg-muted"
          >
            {services.sub}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.list.map((s, i) => (
            <ServiceCard key={s.no} s={s} index={i} onConsult={onConsult} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Service = (typeof site.services.list)[number];

function ServiceCard({
  s,
  index,
  onConsult,
}: {
  s: Service;
  index: number;
  onConsult: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.05 * (index % 3), ease: [0.22, 1, 0.36, 1] }}
      className="card-luxe group relative flex flex-col cursor-pointer"
      onClick={() => setZoomed(!zoomed)}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
    >
      <span className="deco-corner tl" />
      <span className="deco-corner tr" />
      <span className="deco-corner bl" />
      <span className="deco-corner br" />

      <div className="relative aspect-[5/4] overflow-hidden">
        <motion.div
          animate={{ scale: zoomed ? 1.15 : 1 }}
          transition={{
            type: "spring",
            stiffness: 30,
            damping: 15,
            mass: 0.8,
          }}
          className="relative h-full w-full"
        >
          <Image
            src={s.img}
            alt={s.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-[0.3em] text-gold-soft">
            {s.no}
          </span>
        </div>
        <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-bg/80 text-gold">
          <s.icon className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <h3 className="font-serif text-2xl leading-tight text-fg">{s.title}</h3>
        <p className="text-[12px] uppercase tracking-[0.22em] text-gold/80">{s.span}</p>
        <p className="text-sm leading-relaxed text-fg-muted">{s.desc}</p>

        <ul className="mt-2 space-y-1.5 border-t border-line pt-4">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-[13px] text-fg-muted">
              <span className="mt-2 h-px w-3 bg-gold/60" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onConsult();
          }}
          className="mt-auto inline-flex items-center gap-2 self-start pt-2 text-[12px] uppercase tracking-[0.22em] text-fg transition-colors hover:text-gold"
        >
          Discuss this service
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </div>
    </motion.article>
  );
}
