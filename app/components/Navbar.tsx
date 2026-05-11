"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Journal", href: "#journal" },
];

export default function Navbar({ onConsult }: { onConsult: () => void }) {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Create smooth incremental values tied to scroll (0 to 400px)
  const scrollRange = [0, 400];
  const springConfig = { stiffness: 40, damping: 20, mass: 1 }; // "Honey smooth" config

  const rawScale = useTransform(scrollY, scrollRange, [0.85, 1]);
  const rawPaddingHeader = useTransform(scrollY, scrollRange, [4, 16]);
  const rawPaddingInner = useTransform(scrollY, scrollRange, [6, 12]);

  const scale = useSpring(rawScale, springConfig);
  const headerPadding = useSpring(rawPaddingHeader, springConfig);
  const innerPadding = useSpring(rawPaddingInner, springConfig);

  const closeAndGo = (href: string) => {
    setOpen(false);
    document.documentElement.classList.remove("no-scroll");
    if (typeof window !== "undefined") {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <motion.div
            style={{ 
              scale, 
              paddingTop: innerPadding, 
              paddingBottom: innerPadding,
              background: "linear-gradient(to bottom, #7c4dc4 0%, #4a248a 100%)",
              boxShadow: "inset 0 2px 1px rgba(255, 255, 255, 0.4), inset 0 -2px 1px rgba(0, 0, 0, 0.4), 0 12px 40px -10px rgba(61, 31, 107, 0.5)"
            }}
            className="relative flex items-center justify-between rounded-full border border-white/10 px-6"
          >
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                closeAndGo("#top");
              }}
              className="group flex items-center gap-3 px-2 py-1"
              aria-label={`${site.studio.name} home`}
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/40 transition-transform duration-500 group-hover:rotate-12">
                <Image
                  src={site.studio.logo}
                  alt={`${site.studio.name} logo`}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="hidden flex-col leading-none sm:flex">
                <span className="font-serif text-xl tracking-wide text-white">
                  {site.studio.name}
                </span>
              </span>
            </a>

            <nav className="hidden items-center gap-2 lg:flex">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.08 }}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    closeAndGo(l.href);
                  }}
                  whileHover={{ y: -1, scale: 1.05 }}
                  className="group relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white/90 transition-all duration-300 hover:text-white"
                >
                  <span className="relative z-10">{l.label}</span>
                  <span className="absolute inset-x-4 -bottom-0.5 flex flex-col items-center">
                    <span className="h-px w-full scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100" />
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden h-6 w-px bg-white/20 lg:block" />
              <motion.a
                href={`tel:${site.studio.contact.phoneE164}`}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                className="hidden items-center gap-2.5 whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 transition-all duration-300 md:flex"
                aria-label="Call studio"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{site.studio.contact.phoneDisplay}</span>
              </motion.a>
              <motion.button
                type="button"
                onClick={onConsult}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="hidden rounded-full bg-white px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4a248a] transition-all duration-300 hover:shadow-lg md:inline-flex"
              >
                Consult
              </motion.button>
              <button
                type="button"
                onClick={() => {
                  const next = !open;
                  setOpen(next);
                  document.documentElement.classList.toggle("no-scroll", next);
                }}
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-md lg:hidden"
      >
        <motion.div
          initial={false}
          animate={{ y: open ? 0 : -20, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grain pointer-events-none"
        />
        <div className="flex h-full flex-col px-6 pb-10 pt-28">
          <div className="flex-1" />
          <nav className="flex flex-col gap-1">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: open ? 1 : 0,
                  y: open ? 0 : 12,
                  transition: { delay: open ? 0.1 + i * 0.04 : 0, duration: 0.4 },
                }}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  closeAndGo(l.href);
                }}
                className="group flex items-center justify-between border-b border-line py-4 font-serif text-3xl text-fg transition-colors hover:text-gold"
              >
                <span>{l.label}</span>
                <span className="font-mono text-[10px] tracking-[0.3em] text-fg-dim group-hover:text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: open ? 1 : 0,
                y: open ? 0 : 12,
                transition: { delay: open ? 0.4 : 0, duration: 0.5 },
              }}
              className="mt-8 flex flex-col gap-3"
            >
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  document.documentElement.classList.remove("no-scroll");
                  onConsult();
                }}
                className="btn-primary"
              >
                Book a Consultation
              </button>
              <a
                href={`tel:${site.studio.contact.phoneE164}`}
                className="btn-ghost"
              >
                <Phone className="h-4 w-4" />
                {site.studio.contact.phoneDisplay}
              </a>
            </motion.div>
          </nav>
        </div>
      </motion.div>
    </>
  );
}
