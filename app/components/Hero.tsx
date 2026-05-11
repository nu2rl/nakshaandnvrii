"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { site } from "@/lib/site";

const Word = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <span className="relative inline-block overflow-hidden align-bottom pb-2">
    <motion.span
      initial={{ y: "110%", filter: "blur(10px)", opacity: 0 }}
      animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero({ onConsult }: { onConsult: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacityVeil = useTransform(scrollYProgress, [0, 1], [0.45, 0.88]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yWatermark = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const { hero, stats } = site;
  const lines = hero.titleLines;

  return (
    <section ref={ref} id="top" className="relative isolate min-h-[100svh] overflow-hidden will-change-transform">
      {/* Background image with Ken Burns Effect */}
      <motion.div style={{ y: yImg, scale: 1.15 }} className="absolute inset-0 -z-10 origin-top will-change-transform">
        <motion.div
          animate={{ scale: [1, 1.05] }}
          transition={{ duration: 40, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="relative h-full w-full will-change-transform"
        >
          <Image
            src={hero.image}
            alt="Hero interior"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        
        <motion.div
          style={{ opacity: opacityVeil }}
          className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/30 to-bg will-change-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 via-50% to-transparent" />
        <div className="grain hidden md:block" />
      </motion.div>

      {/* Large Watermark Text */}
      <motion.div
        style={{ y: yWatermark }}
        className="pointer-events-none absolute left-[-5%] top-1/2 -z-10 -translate-y-1/2 select-none opacity-[0.03]"
      >
        <span className="font-display text-[35vw] uppercase leading-none tracking-[-0.05em] text-fg">
          {site.studio.short}
        </span>
      </motion.div>

      {/* Decorative right column */}
      <div className="absolute right-0 top-0 -z-10 hidden h-full w-[42%] lg:block">
        <div className="absolute inset-y-12 right-10 w-px bg-gradient-to-b from-transparent via-line to-transparent" />
        <div className="absolute right-12 top-32 flex flex-col items-end gap-10 text-right">
          <span className="rotate-90 text-[10px] uppercase tracking-[0.6em] text-fg-dim">
            Vol. {String(site.studio.yearsExperience).padStart(2, "0")} · MMXXVI
          </span>
        </div>
      </div>

      {/* Content */}
      <motion.div
        style={{ y: yText }}
        className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pb-24 pt-44 md:px-10 md:pb-28 md:pt-48"
      >
        <h1 className="h-display mt-8 max-w-[900px] text-[clamp(3.5rem,9vw,8rem)] text-fg">
          {lines.map((l, i) => (
            <span key={i} className="block">
              <Word delay={0.55 + i * 0.18}>{l}</Word>
            </span>
          ))}
          <span className="block">
            <Word delay={0.55 + lines.length * 0.18}>
              <span className="italic">{hero.titleAccent}</span>
            </Word>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex max-w-4xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex max-w-md flex-col gap-8">
            <p className="text-[15px] leading-relaxed text-fg-muted md:text-base">
              {hero.sub}
            </p>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + i * 0.1, duration: 0.8 }}
                >
                  <Stat label={s.label} value={`${s.value}${s.suffix}`} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <motion.button 
              type="button" 
              onClick={onConsult} 
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: "linear-gradient(to bottom, #7c4dc4 0%, #4a248a 100%)",
                boxShadow: "0 10px 30px -10px rgba(61, 31, 107, 0.5)"
              }}
              className="group relative flex h-[62px] items-center justify-center gap-4 rounded-full px-10 text-[13px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300"
            >
              <span>{hero.primaryCta.label}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>
            <motion.a 
              href={hero.secondaryCta.href} 
              whileHover={{ backgroundColor: "rgba(107, 63, 160, 0.08)", scale: 1.02 }}
              className="flex h-[62px] items-center justify-center rounded-full border-2 border-[#6b3fa0] px-10 text-[13px] font-bold uppercase tracking-[0.2em] text-[#6b3fa0] transition-all duration-300"
            >
              {hero.secondaryCta.label}
            </motion.a>
          </div>
        </motion.div>

        <motion.a
          href="#philosophy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg-muted md:flex hover:text-gold transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.45em]">Scroll</span>
          <span className="block h-10 w-px bg-gradient-to-b from-gold to-transparent" />
          <ArrowDown className="h-3 w-3 text-gold" />
        </motion.a>
      </motion.div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start">
      <span className="font-serif text-2xl text-[#000000]">{value}</span>
      <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#000000]/60">{label}</span>
    </div>
  );
}
