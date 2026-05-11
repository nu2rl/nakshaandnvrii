"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CheckCircle2, Phone, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type Props = {
  open: boolean;
  onClose: () => void;
};

const propertyTypes = ["2 BHK Apartment", "3 BHK Apartment", "4+ BHK / Villa", "Penthouse", "Commercial"];
const timelines = ["0–3 months", "3–6 months", "6–12 months", "Just exploring"];

export default function ConsultationModal({ open, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: site.studio.serviceCities[0],
    property: propertyTypes[1],
    timeline: timelines[1],
    message: "",
  });

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("no-scroll");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("no-scroll");
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setTimeout(() => setSubmitted(false), 300);
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-6"
        >
          <button
            aria-label="Close consultation form"
            onClick={onClose}
            className="absolute inset-0 bg-bg/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-white shadow-2xl"
          >
            <div className="grain opacity-[0.03]" />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line text-fg-dim transition-all hover:bg-bg-soft hover:text-gold"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative p-8 md:p-10"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">By Invitation</span>
                  </div>
                  <h3 className="h-display mt-3 text-3xl text-fg">
                    Begin a private <span className="italic text-gold">consultation</span>
                  </h3>

                  <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Your name" required>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="lux-input-modal"
                          placeholder="e.g. Aanya Mehrotra"
                        />
                      </Field>
                      <Field label="WhatsApp number" required>
                        <input
                          required
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="lux-input-modal"
                          placeholder="+91 98XXX XXXXX"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="City">
                        <select
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                          className="lux-input-modal"
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
                          className="lux-input-modal"
                        >
                          {propertyTypes.map((p) => (
                            <option key={p}>{p}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="Vision for the home">
                      <textarea
                        rows={4}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="lux-input-modal min-h-24 resize-none"
                        placeholder="Tell us about the feeling you'd like your home to hold..."
                      />
                    </Field>

                    <div className="mt-4 flex flex-col items-center gap-6">
                      <button type="submit" 
                        style={{
                          background: "linear-gradient(to bottom, #7c4dc4 0%, #4a248a 100%)",
                          boxShadow: "0 10px 30px -10px rgba(61, 31, 107, 0.5)"
                        }}
                        className="group flex h-[58px] w-full items-center justify-center gap-4 rounded-full text-[13px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>Request consultation</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-fg-dim">
                        1 Working Day Response · NDA Protected
                      </p>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="relative flex flex-col items-center p-12 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold text-gold">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="h-display mt-8 text-3xl text-fg">
                    Thank you, <span className="italic text-gold">{form.name.split(" ")[0] || "friend"}</span>
                  </h3>
                  <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-fg-muted">
                    Your vision is with us. We will reach out on <span className="font-bold text-fg">{form.phone}</span> within 24 hours.
                  </p>

                  <a
                    href={`https://wa.me/${site.studio.contact.whatsappE164}?text=${encodeURIComponent(
                      site.studio.contact.whatsappPrefill
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 flex h-[54px] w-full items-center justify-center rounded-full bg-[#25D366] text-[13px] font-bold uppercase tracking-[0.18em] text-white shadow-xl transition-transform hover:scale-[1.02]"
                  >
                    Continue on WhatsApp
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            <style>{`
              .lux-input-modal {
                width: 100%;
                background: #ffffff;
                border: 1px solid var(--color-line);
                color: var(--color-fg);
                padding: 12px 16px;
                font-size: 14px;
                font-family: var(--font-sans);
                border-radius: 8px;
                transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
                outline: none;
              }
              .lux-input-modal:focus { border-color: var(--color-gold); box-shadow: 0 0 0 4px rgba(107, 63, 160, 0.05); }
              .lux-input-modal::placeholder { color: var(--color-fg-dim); opacity: 0.5; }
              select.lux-input-modal { appearance: none; background-image: linear-gradient(45deg, transparent 50%, var(--color-fg-muted) 50%), linear-gradient(135deg, var(--color-fg-muted) 50%, transparent 50%); background-position: calc(100% - 18px) 50%, calc(100% - 12px) 50%; background-size: 5px 5px; background-repeat: no-repeat; padding-right: 36px; }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-fg-muted/80">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}
