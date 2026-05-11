"use client";

import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Calculator as CalcIcon, CheckCircle2, Phone, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { site } from "@/lib/site";

const propertySizes = [
  { id: "1bhk", label: "1 BHK", sqft: 600 },
  { id: "2bhk", label: "2 BHK", sqft: 1000 },
  { id: "3bhk", label: "3 BHK", sqft: 1500 },
  { id: "4bhk", label: "4 BHK", sqft: 2200 },
  { id: "villa", label: "Villa", sqft: 5000 },
];

const tiers = [
  {
    id: "essential",
    label: "Essential",
    note: "Refined basics, brand-name fittings",
    multiplier: 1850,
  },
  {
    id: "premium",
    label: "Premium",
    note: "Custom joinery, designer lighting, art",
    multiplier: 3200,
  },
  {
    id: "ultra",
    label: "Ultra-Luxury",
    note: "Imported stone, bespoke furniture, full styling",
    multiplier: 5400,
  },
];

const scopes = [
  { id: "fullhome", label: "Full home turnkey", weight: 1 },
  { id: "kitchenwardrobe", label: "Kitchen + wardrobes", weight: 0.45 },
  { id: "civil", label: "Civil + flooring only", weight: 0.55 },
  { id: "softstyle", label: "Soft styling refresh", weight: 0.18 },
];

const cities = site.studio.serviceCities;

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [property, setProperty] = useState(propertySizes[2]);
  const [tier, setTier] = useState(tiers[1]);
  const [scope, setScope] = useState(scopes[0]);
  const [city, setCity] = useState(cities[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [done, setDone] = useState(false);

  const estimate = useMemo(() => {
    const base = property.sqft * tier.multiplier * scope.weight;
    const low = base * 0.92;
    const high = base * 1.18;
    return { low, high };
  }, [property, tier, scope]);

  const total = step >= 3;

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleOtp = () => setOtpRequested(true);
  const handleSubmit = () => setDone(true);

  return (
    <section id="calculator" className="relative border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <span className="eyebrow lux-rule">Private Estimate</span>
            <h2 className="h-display mt-5 text-4xl text-fg md:text-6xl">
              A directional cost, <span className="italic text-gold">in 60 seconds</span>
            </h2>
            <p className="mt-5 text-base text-fg-muted">
              A range, not a price. We build a true tender after the first studio visit — but this
              gives you and us a place to begin the conversation.
            </p>

            <div className="mt-10 grid gap-4 border-t border-line pt-8">
              {[
                { k: "Average ticket", v: "₹62 L" },
                { k: "Time to estimate", v: "1 working day" },
                { k: "Cost overrun cap", v: "0 % on signed scope" },
              ].map((m) => (
                <div key={m.k} className="flex items-baseline justify-between gap-6 text-fg-muted">
                  <span className="text-[11px] uppercase tracking-[0.28em]">{m.k}</span>
                  <span className="font-serif text-xl text-fg">{m.v}</span>
                </div>
              ))}
            </div>

            <p className="mt-10 text-xs leading-relaxed text-fg-dim">
              Estimates assume turnkey scope including civil, joinery, lighting, paint, soft
              furnishings and a 6-month post-handover snag service. Excludes statutory permissions
              and society NOC.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-sm border border-line bg-bg-soft">
            <div className="grain" />
            <span className="deco-corner tl" />
            <span className="deco-corner tr" />
            <span className="deco-corner bl" />
            <span className="deco-corner br" />

            {/* Stepper */}
            <div className="flex items-center justify-between border-b border-line px-6 py-5 md:px-8">
              <div className="flex items-center gap-2 text-fg-muted">
                <CalcIcon className="h-4 w-4 text-gold" />
                <span className="text-[11px] uppercase tracking-[0.28em]">Studio Estimator</span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border text-[11px] transition-all ${
                        s === step
                          ? "border-gold bg-gold/15 text-gold"
                          : s < step
                          ? "border-gold/40 text-gold/70"
                          : "border-line text-fg-dim"
                      }`}
                    >
                      {String(s).padStart(2, "0")}
                    </span>
                    {s < 3 && (
                      <span className="hidden h-px w-10 bg-line md:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[460px] p-6 md:p-8">
              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.div
                    key={`step-${step}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step === 1 && (
                      <Step
                        title="Step 01 · The Home"
                        sub="Tell us the canvas — size, scope, and city of work."
                      >
                        <FieldGroup label="Property size">
                          <Pills
                            value={property.id}
                            onChange={(id) =>
                              setProperty(propertySizes.find((p) => p.id === id) || property)
                            }
                            options={propertySizes.map((p) => ({
                              id: p.id,
                              label: p.label,
                              sub: `${p.sqft} sq ft (avg)`,
                            }))}
                          />
                        </FieldGroup>

                        <FieldGroup label="Scope of work">
                          <Pills
                            value={scope.id}
                            onChange={(id) =>
                              setScope(scopes.find((s) => s.id === id) || scope)
                            }
                            options={scopes.map((s) => ({ id: s.id, label: s.label }))}
                          />
                        </FieldGroup>

                        <FieldGroup label="City">
                          <Pills
                            value={city}
                            onChange={(id) => setCity(id)}
                            options={cities.map((c) => ({ id: c, label: c }))}
                          />
                        </FieldGroup>
                      </Step>
                    )}

                    {step === 2 && (
                      <Step
                        title="Step 02 · The Finish"
                        sub="Choose the level of bespoke craft you'd like the studio to design to."
                      >
                        <div className="grid gap-3">
                          {tiers.map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setTier(t)}
                              className={`group flex items-center justify-between gap-4 rounded-sm border p-5 text-left transition-all ${
                                tier.id === t.id
                                  ? "border-gold bg-gold/5"
                                  : "border-line hover:border-gold/40"
                              }`}
                            >
                              <div>
                                <p
                                  className={`font-serif text-xl ${
                                    tier.id === t.id ? "text-gold" : "text-fg"
                                  }`}
                                >
                                  {t.label}
                                </p>
                                <p className="mt-1 text-sm text-fg-muted">{t.note}</p>
                              </div>
                              <div className="hidden text-right md:block">
                                <span className="text-[10px] uppercase tracking-[0.28em] text-fg-dim">
                                  Per sq ft
                                </span>
                                <p
                                  className={`font-serif text-lg ${
                                    tier.id === t.id ? "text-gold" : "text-fg"
                                  }`}
                                >
                                  ₹ {fmt(t.multiplier)}
                                </p>
                              </div>
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                                  tier.id === t.id
                                    ? "border-gold bg-gold/20 text-gold"
                                    : "border-line text-fg-dim"
                                }`}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </span>
                            </button>
                          ))}
                        </div>
                      </Step>
                    )}

                    {step === 3 && (
                      <Step
                        title="Step 03 · Receive Your Estimate"
                        sub="A senior designer will WhatsApp your range and a sample brochure within 24 hours."
                      >
                        <div className="rounded-sm border border-gold/30 bg-gold/5 p-5">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                            Indicative range
                          </span>
                          <div className="mt-2 flex items-baseline gap-2">
                            <span className="font-serif text-3xl text-fg md:text-4xl">
                              ₹ {fmt(estimate.low / 100000)}
                            </span>
                            <span className="text-fg-muted">–</span>
                            <span className="font-serif text-3xl text-gold md:text-4xl">
                              ₹ {fmt(estimate.high / 100000)} L
                            </span>
                          </div>
                          <p className="mt-2 text-xs text-fg-muted">
                            For a {property.label} · {tier.label.toLowerCase()} · {city}
                          </p>
                        </div>

                        <div className="mt-5 grid gap-3 md:grid-cols-2">
                          <Input
                            label="Name"
                            value={name}
                            onChange={setName}
                            placeholder="Your full name"
                          />
                          <Input
                            label="WhatsApp"
                            value={phone}
                            onChange={setPhone}
                            placeholder="+91 98XXX XXXXX"
                            type="tel"
                          />
                          <div className="md:col-span-2">
                            {!otpRequested ? (
                              <button
                                type="button"
                                onClick={handleOtp}
                                disabled={!name || phone.length < 10}
                                className="btn-ghost w-full disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Send WhatsApp OTP to verify
                              </button>
                            ) : (
                              <Input
                                label="WhatsApp OTP"
                                value={otp}
                                onChange={setOtp}
                                placeholder="Enter 4-digit code"
                                hint="Code sent · Check your WhatsApp"
                              />
                            )}
                          </div>
                        </div>
                      </Step>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                      <Sparkles className="h-7 w-7" />
                    </div>
                    <h3 className="h-display mt-6 text-3xl text-fg md:text-4xl">
                      Your estimate is on its way
                    </h3>
                    <p className="mt-3 max-w-md text-sm text-fg-muted">
                      We've sent a starter brochure and the indicative range to{" "}
                      <span className="text-fg">+91 {phone.replace(/^\+?91/, "")}</span>. A senior
                      designer will pick up the conversation within one working day.
                    </p>
                    <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row">
                      <a
                        href={`https://wa.me/${site.studio.contact.whatsappE164}?text=${encodeURIComponent(
                          site.studio.contact.whatsappPrefill
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        Continue on WhatsApp
                      </a>
                      <a href={`tel:${site.studio.contact.phoneE164}`} className="btn-ghost">
                        <Phone className="h-4 w-4" /> Call studio
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!done && (
              <div className="flex items-center justify-between gap-3 border-t border-line bg-bg-soft/60 px-6 py-4 md:px-8">
                <div className="text-fg-muted">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-fg-dim">
                    Indicative range
                  </span>
                  <p className="font-serif text-lg text-fg">
                    ₹ {fmt(estimate.low / 100000)} – {fmt(estimate.high / 100000)} L
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {step > 1 && (
                    <button onClick={back} type="button" className="btn-ghost">
                      Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button onClick={next} type="button" className="btn-primary">
                      Continue <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      type="button"
                      disabled={!total || !otpRequested || otp.length < 4}
                      className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Get my estimate
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.32em] text-gold">{title.split(" · ")[0]}</p>
        <h3 className="h-display mt-2 text-2xl text-fg md:text-3xl">{title.split(" · ")[1]}</h3>
        <p className="mt-2 text-sm text-fg-muted">{sub}</p>
      </div>
      {children}
    </div>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[10px] uppercase tracking-[0.28em] text-fg-muted">{label}</span>
      {children}
    </div>
  );
}

function Pills({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string; sub?: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            type="button"
            key={o.id}
            onClick={() => onChange(o.id)}
            className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] uppercase tracking-[0.18em] transition-all ${
              active
                ? "border-gold bg-gold/15 text-gold"
                : "border-line text-fg-muted hover:border-gold/40 hover:text-fg"
            }`}
          >
            {o.label}
            {o.sub && (
              <span className="text-[10px] tracking-[0.2em] text-fg-dim">· {o.sub}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-[0.28em] text-fg-muted">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        className="rounded-sm border border-line bg-bg/50 px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-gold"
      />
      {hint && <span className="text-[11px] text-gold">{hint}</span>}
    </label>
  );
}
