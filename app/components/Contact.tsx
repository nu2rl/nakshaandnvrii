"use client";

import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";

const propertyOptions = [
  "Apartment · 2 BHK",
  "Apartment · 3 BHK",
  "Apartment · 4 BHK +",
  "Penthouse",
  "Villa / Bungalow",
  "Hospitality / Commercial",
  "Bespoke furniture",
];
const budgetOptions = [
  "₹15 – 30 L",
  "₹30 – 60 L",
  "₹60 L – 1.5 Cr",
  "₹1.5 – 3 Cr",
  "₹3 Cr +",
];
const timelineOptions = [
  "Possession in 0 – 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "Just exploring",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: site.studio.serviceCities[0],
    property: propertyOptions[2],
    budget: budgetOptions[2],
    timeline: timelineOptions[1],
    message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative border-t border-line pt-14 md:pt-20 pb-14 md:pb-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* Studio info */}
          <div>
            <span className="eyebrow lux-rule">Begin a Conversation</span>
            <h2 className="h-display mt-5 text-4xl text-fg md:text-6xl">
              Tell us about <span className="italic text-gold">the home</span>
            </h2>
            <p className="mt-5 max-w-md text-base text-fg-muted">
              The studio responds personally to every enquiry — usually within one working day. No
              automated funnel, no junior account manager.
            </p>

            <ul className="mt-12 flex flex-col gap-6 border-t border-line pt-8">
              <Detail icon={MapPin} label="Studio">
                {site.studio.address.street}, {site.studio.address.city} {site.studio.address.pin}
              </Detail>
              <Detail icon={Phone} label="Direct line">
                <a href={`tel:${site.studio.contact.phoneE164}`} className="hover:text-gold">
                  {site.studio.contact.phoneDisplay}
                </a>
              </Detail>
              <Detail icon={Mail} label="Email">
                <a href={`mailto:${site.studio.contact.email}`} className="hover:text-gold">
                  {site.studio.contact.email}
                </a>
              </Detail>
              <Detail icon={Clock} label="Studio hours">
                {site.studio.contact.hours}
              </Detail>
            </ul>

            <a
              href={`https://wa.me/${site.studio.contact.whatsappE164}?text=${encodeURIComponent(
                site.studio.contact.whatsappPrefill
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex w-full items-center justify-between gap-4 rounded-sm border border-line bg-bg-soft p-5 text-fg transition-colors hover:border-gold/40 hover:text-gold sm:w-fit"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-fg-dim">
                  Faster than email
                </p>
                <p className="font-serif text-xl">Continue on WhatsApp</p>
              </div>
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>

          {/* Form */}
          <div className="relative overflow-hidden rounded-sm border border-line bg-bg-soft">
            <span className="deco-corner tl" />
            <span className="deco-corner tr" />
            <span className="deco-corner bl" />
            <span className="deco-corner br" />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={onSubmit}
                  className="p-6 md:p-10"
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Your name" required>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="lux-input"
                        placeholder="e.g. Aanya Mehrotra"
                      />
                    </Field>
                    <Field label="WhatsApp number" required>
                      <input
                        required
                        type="tel"
                        pattern="[0-9+ ]{10,15}"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="lux-input"
                        placeholder="+91 98XXX XXXXX"
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="lux-input"
                        placeholder="aanya@studio.com"
                      />
                    </Field>
                    <Field label="City">
                      <select
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="lux-input"
                      >
                        {site.studio.serviceCities.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Project type">
                      <select
                        value={form.property}
                        onChange={(e) => setForm({ ...form, property: e.target.value })}
                        className="lux-input"
                      >
                        {propertyOptions.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Possession / timeline" wide>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {timelineOptions.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setForm({ ...form, timeline: t })}
                            className={`rounded-full border px-6 py-3 text-left text-sm transition-all duration-300 ${
                              form.timeline === t
                                ? "border-gold bg-gold text-white"
                                : "border-line text-fg-muted hover:border-gold/40 hover:text-fg"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </Field>
                    <Field label="Your vision for the home" wide>
                      <textarea
                        rows={6}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="lux-input min-h-40 resize-none"
                        placeholder="Tell us about the feeling you'd like your home to hold, your lifestyle, and any specific requirements..."
                      />
                    </Field>
                  </div>

                  <div className="mt-10 flex flex-col-reverse gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-fg-dim">
                      Personally responded to · 1 working day · NDA protected
                    </p>
                    <button type="submit" 
                      style={{
                        background: "linear-gradient(to bottom, #7c4dc4 0%, #4a248a 100%)",
                        boxShadow: "0 10px 30px -10px rgba(61, 31, 107, 0.5)"
                      }}
                      className="group flex h-[58px] items-center justify-center gap-4 rounded-full px-10 text-[13px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Send to studio</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center px-6 py-20 text-center md:px-10"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold text-gold">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="h-display mt-8 text-4xl text-fg">
                    Thank you, <span className="italic text-gold">{form.name.split(" ")[0] || "friend"}</span>
                  </h3>
                  <p className="mt-4 max-w-md text-base text-fg-muted">
                    Your vision has reached our principal designers. We will personally reach out on{" "}
                    <span className="font-bold text-fg">{form.phone}</span> within 24 hours.
                  </p>
                  <a
                    href={`https://wa.me/${site.studio.contact.whatsappE164}?text=${encodeURIComponent(
                      site.studio.contact.whatsappPrefill
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-10"
                  >
                    Continue on WhatsApp
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            <style>{`
              .lux-input {
                width: 100%;
                background: #ffffff;
                border: 1px solid var(--color-line);
                color: var(--color-fg);
                padding: 16px 20px;
                font-size: 15px;
                font-family: var(--font-sans);
                border-radius: 8px;
                transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
                outline: none;
              }
              .lux-input:focus { border-color: var(--color-gold); box-shadow: 0 0 0 4px rgba(107, 63, 160, 0.05); }
              .lux-input::placeholder { color: var(--color-fg-dim); opacity: 0.6; }
              select.lux-input { appearance: none; background-image: linear-gradient(45deg, transparent 50%, var(--color-fg-muted) 50%), linear-gradient(135deg, var(--color-fg-muted) 50%, transparent 50%); background-position: calc(100% - 20px) 50%, calc(100% - 14px) 50%; background-size: 6px 6px; background-repeat: no-repeat; padding-right: 40px; }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-bg-soft text-gold">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-[0.28em] text-fg-dim">{label}</p>
        <p className="mt-1 text-base text-fg">{children}</p>
      </div>
    </li>
  );
}

function Field({
  label,
  children,
  required,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  wide?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-2 ${wide ? "md:col-span-2" : ""}`}>
      <span className="text-[11px] uppercase tracking-[0.22em] text-fg-muted">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}
