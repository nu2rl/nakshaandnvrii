"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export default function CtaBand({ onConsult }: { onConsult: () => void }) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=2400&q=80"
          alt="Interior atmosphere"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-bg/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/40 to-bg/80" />
        <div className="grain" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-center gap-10 md:grid-cols-[2fr_1fr] md:gap-16"
        >
          <div>
            <span className="eyebrow lux-rule">By Invitation Only</span>
            <h2 className="h-display mt-5 text-4xl text-fg md:text-6xl">
              We accept{" "}
              <span className="italic text-gold">fourteen residences a year</span>.
              <br /> Three are still open for {new Date().getFullYear() + 1}.
            </h2>
            <p className="mt-6 max-w-xl text-base text-fg-muted">
              Begin with a 45-minute conversation with one of our senior partners. No deck, no
              pitch — only a conversation about the home you're imagining.
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-4">
            <button onClick={onConsult} type="button" className="btn-primary justify-between">
              <span>Book a Consultation</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <a
              href={`https://wa.me/${site.studio.contact.whatsappE164}?text=${encodeURIComponent(
                site.studio.contact.whatsappPrefill
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost justify-between"
            >
              <span>WhatsApp the studio</span>
              <MessageCircle className="h-4 w-4" />
            </a>
            <p className="mt-2 text-center text-[10px] uppercase tracking-[0.28em] text-fg-dim">
              Average response · 47 minutes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
