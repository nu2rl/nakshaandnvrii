"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/lib/site";

export default function Philosophy() {
  const { philosophy, studio } = site;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="philosophy" ref={containerRef} className="relative pt-14 md:pt-24 pb-14 md:pb-24">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-24">
        
        {/* Left Column: Sticky Editorial Content */}
        <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-160px)] lg:col-span-5 flex flex-col">
          <motion.div
            initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="eyebrow lux-rule">{philosophy.eyebrow}</span>
            <h2 className="h-display mt-8 text-4xl text-fg md:text-5xl lg:text-6xl leading-[0.9] tracking-tight">
              {philosophy.title}
            </h2>
          </motion.div>

          <motion.div 
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="group relative mt-12 flex-1 overflow-hidden rounded-sm bg-bg-soft"
          >
            <Image
              src={philosophy.image}
              alt="Studio philosophy"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/70 via-bg/20 to-transparent" />
            <span className="deco-corner tl" />
            <span className="deco-corner tr" />
            <span className="deco-corner bl" />
            <span className="deco-corner br" />
          </motion.div>

          <div className="mt-8 flex items-baseline gap-4">
            <span className="font-serif text-6xl italic text-gold/90">{studio.yearsExperience}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-fg-muted">
              years of refined practice · {site.stats[0].value} homes delivered
            </span>
          </div>
        </div>

        {/* Right Column: Scrolling Pillars */}
        <div className="lg:col-span-7 flex flex-col gap-12 lg:pt-32">
          {philosophy.pillars.map((p, i) => {
            const isPurple = i === 1 || i === 2;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`group relative rounded-sm border p-8 md:p-12 transition-all duration-700 ${
                  isPurple 
                    ? "bg-gold text-white border-gold shadow-luxe" 
                    : "bg-white border-line hover:border-gold/40 text-fg"
                }`}
              >
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${
                  isPurple 
                    ? "border-white/30 bg-white/10 text-white" 
                    : "border-gold/30 bg-bg-soft text-gold"
                }`}>
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className={`font-serif text-3xl md:text-4xl ${isPurple ? "text-white" : "text-fg"}`}>
                  {p.title}
                </h3>
                <p className={`mt-6 text-base md:text-lg leading-relaxed ${isPurple ? "text-white/80" : "text-fg-muted"}`}>
                  {p.desc}
                </p>
                
                {/* Decorative index */}
                <span className={`absolute right-8 top-8 font-mono text-[10px] tracking-[0.4em] opacity-20 ${isPurple ? "text-white" : "text-fg"}`}>
                  0{i + 1}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
