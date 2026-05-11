"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { MapPin } from "lucide-react";
import { useMemo, useState, useRef } from "react";
import { site } from "@/lib/site";

export default function Portfolio() {
  const { portfolio } = site;
  const [active, setActive] = useState<(typeof portfolio.filters)[number]>("All");

  const list = useMemo(() => {
    if (active === "All") return portfolio.projects;
    // @ts-ignore - dynamic filter
    return portfolio.projects.filter((p) => p.category === active);
  }, [active, portfolio.projects]);

  return (
    <section id="portfolio" className="relative pt-10 md:pt-12 pb-14 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(15px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="eyebrow lux-rule">{portfolio.eyebrow}</span>
            <h2 className="h-display mt-6 max-w-3xl text-4xl text-fg md:text-6xl">
              {portfolio.title}
            </h2>
            <p className="mt-6 max-w-xl text-fg-muted">
              {portfolio.sub}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {portfolio.filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-all ${
                  active === f
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-line text-fg-muted hover:border-gold/40 hover:text-fg"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          layout
          className="grid auto-rows-[260px] grid-cols-1 gap-5 md:auto-rows-[280px] md:grid-cols-6 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProjectTile key={p.title} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <p className="font-serif text-lg italic text-fg-muted">
            {portfolio.note}
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}

type Project = (typeof site.portfolio.projects)[number];

function ProjectTile({ project, index }: { project: Project; index: number }) {
  const [zoomed, setZoomed] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const span =
    project.span === "wide"
      ? "md:col-span-4 md:row-span-1"
      : project.span === "tall"
      ? "md:col-span-2 md:row-span-2"
      : "md:col-span-2 md:row-span-1";

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.65, delay: 0.04 * Math.min(index, 6), ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-sm bg-bg-soft cursor-pointer ${span}`}
      onClick={() => setZoomed(!zoomed)}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
    >
      <motion.div style={{ y: yParallax, scale: 1.35 }} className="absolute inset-0">
        <motion.div
          animate={{ scale: zoomed ? 1.12 : 1 }}
          transition={{
            type: "spring",
            stiffness: 30,
            damping: 15,
            mass: 0.8,
          }}
          className="relative h-full w-full"
        >
          <Image
            src={project.img}
            alt={project.title}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
      <div className="absolute inset-0 ring-1 ring-inset ring-line/40 transition-colors group-hover:ring-gold/40" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 md:p-6">
        <span className="text-[10px] uppercase tracking-[0.32em] text-gold-soft">
          {project.category} · {project.year}
        </span>
        <h3 className="font-serif text-xl text-fg md:text-2xl">{project.title}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-fg-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3 text-gold" /> {project.city}
          </span>
          <span>{project.scope}</span>
          <span>{project.area}</span>
        </div>
      </div>
    </motion.article>
  );
}
