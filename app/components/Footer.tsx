"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

const Instagram = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Pinterest = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12c0 4 2.5 6 4 6 1.5 0 3-2 3-2" />
    <path d="M11 9c0-1.5 1-2.5 2.5-2.5S16 7.5 16 9.5c0 2.5-2 4-3 4" />
    <path d="M11 11l-1.5 9" />
  </svg>
);

const navColumns = [
  {
    label: "Studio",
    links: [
      { label: "Philosophy", href: "#philosophy" },
      { label: "Process", href: "#process" },
    ],
  },
  {
    label: "Practice",
    links: [
      { label: "Residences", href: "#services" },
      { label: "Hospitality", href: "#services" },
      { label: "Bespoke Furniture", href: "#services" },
      { label: "Restoration", href: "#services" },
    ],
  },
  {
    label: "Engagement",
    links: [
      { label: "Consultation", href: "#contact" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0a0a0a] text-white pt-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Top: large studio name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-10 border-b border-white/10 pb-14 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="eyebrow lux-rule text-gold-soft before:bg-gold-soft after:bg-gold-soft">Designed in India · For India</span>
            <div className="mt-6 flex items-center gap-6">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/10">
                <Image
                  src={site.studio.logo}
                  alt={`${site.studio.name} logo`}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="h-display text-[clamp(3rem,6vw,8rem)] leading-none text-white">
                {site.studio.name}
              </h2>
            </div>
            <p className="mt-4 max-w-md text-base text-white/60">
              {site.studio.tagline} · A practice for the modern Indian residence, since {site.studio.foundedYear}.
            </p>
          </div>

          <a
            href="#top"
            className="group flex items-center gap-3 self-start rounded-full border border-white/20 px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-white/70 transition-colors hover:border-gold-soft hover:text-white"
          >
            Back to top
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white/70 transition-transform group-hover:-translate-y-1">
              <ArrowUp className="h-4 w-4" />
            </span>
          </a>
        </motion.div>

        {/* Main grid */}
        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold-soft">
              The Studio
            </span>
            <ul className="mt-6 flex flex-col gap-4 text-[15px]">
              <li className="flex items-start gap-3 text-white/50">
                <MapPin className="mt-0.5 h-4 w-4 text-gold-soft" />
                <span>
                  {site.studio.address.street}, {site.studio.address.city} {site.studio.address.pin}
                </span>
              </li>
              <li className="flex items-start gap-3 text-white/50">
                <Phone className="mt-0.5 h-4 w-4 text-gold-soft" />
                <a href={`tel:${site.studio.contact.phoneE164}`} className="hover:text-white transition-colors">
                  {site.studio.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/50">
                <Mail className="mt-0.5 h-4 w-4 text-gold-soft" />
                <a href={`mailto:${site.studio.contact.email}`} className="hover:text-white transition-colors">
                  {site.studio.contact.email}
                </a>
              </li>
            </ul>

            <div className="mt-10 flex items-center gap-4">
              {[
                { Icon: Instagram, href: site.studio.socials.instagram, label: "Instagram" },
                { Icon: Linkedin, href: site.studio.socials.linkedin, label: "LinkedIn" },
                { Icon: Youtube, href: site.studio.socials.youtube, label: "Youtube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-gold-soft hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-4 lg:grid-cols-2">
            {navColumns.map((col) => (
              <div key={col.label}>
                <span className="text-[10px] uppercase tracking-[0.32em] text-white/40">
                  {col.label}
                </span>
                <ul className="mt-6 flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13px] text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:col-span-4">
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold-soft mb-6 block">
              Location
            </span>
            <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-white/10 bg-white/5 md:aspect-square">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114584.73562699865!2d78.10986704107147!3d26.214156689893976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c5d1792291cb%3A0x85e683f2a8cc83!2sGwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1715360000000!5m2!1sen!2sin"
                className="absolute inset-0 h-full w-full grayscale invert-[0.9] opacity-60 transition-all duration-700 hover:grayscale-0 hover:invert-0 hover:opacity-100"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <a 
              href="https://maps.google.com/?q=Gwalior,India" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gold-soft hover:underline"
            >
              Get Directions →
            </a>
          </div>
        </div>

        {/* Bottom: legal */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">
              © {new Date().getFullYear()} {site.studio.legalName}
            </p>
            <p className="text-[10px] text-white/30">
              Handcrafted in {site.studio.city}, India
            </p>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
      
      {/* Cinematic name */}
      <div className="-mb-10 select-none overflow-hidden text-center md:-mb-16">
        <p className="font-serif text-[clamp(4rem,18vw,28rem)] leading-none whitespace-nowrap text-white/[0.03]">
          {site.studio.short}
        </p>
      </div>
    </footer>
  );
}
