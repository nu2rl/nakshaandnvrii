"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { site } from "@/lib/site";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden>
      <path d="M27.07 4.93A15.93 15.93 0 0 0 16 0C7.18 0 .03 7.16.03 16c0 2.82.74 5.58 2.15 8.01L0 32l8.18-2.14A16 16 0 0 0 16 32c8.83 0 16-7.16 16-16 0-4.27-1.66-8.29-4.93-11.07ZM16 29.27c-2.5 0-4.95-.67-7.09-1.94l-.51-.3-4.86 1.27 1.3-4.74-.33-.52A13.18 13.18 0 0 1 2.78 16C2.78 8.69 8.69 2.78 16 2.78c3.53 0 6.85 1.38 9.34 3.87a13.18 13.18 0 0 1 3.87 9.34c0 7.31-5.91 13.28-13.21 13.28Zm7.61-9.94c-.41-.21-2.46-1.21-2.84-1.35-.38-.14-.66-.21-.94.21-.28.41-1.08 1.35-1.32 1.63-.24.28-.49.31-.9.1-2.46-1.23-4.07-2.19-5.69-4.97-.43-.74.43-.69 1.23-2.29.14-.28.07-.52-.04-.73-.1-.21-.94-2.27-1.29-3.11-.34-.81-.69-.7-.94-.71l-.8-.02c-.28 0-.73.1-1.11.52-.38.41-1.46 1.43-1.46 3.49s1.49 4.04 1.7 4.32c.21.28 2.94 4.49 7.13 6.3 1 .43 1.78.69 2.39.88.99.32 1.92.27 2.65.16.81-.12 2.46-1.01 2.81-1.98.35-.97.35-1.81.24-1.98-.1-.18-.38-.28-.79-.49Z" />
    </svg>
  );
}

export default function WhatsAppFab() {
  const [hover, setHover] = useState(false);
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setShow(y > 200);
  });

  const url = `https://wa.me/${site.studio.contact.whatsappE164}?text=${encodeURIComponent(
    site.studio.contact.whatsappPrefill
  )}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="fab"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3"
        >
          <AnimatePresence>
            {hover && (
              <motion.div
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="hidden rounded-full bg-bg-soft px-4 py-2 text-xs text-fg shadow-luxe ring-1 ring-line md:flex"
              >
                <span className="text-fg-muted">Chat with the studio</span>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_-12px_rgba(37,211,102,0.7)] transition-transform hover:scale-105"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppGlyph className="relative h-7 w-7" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
