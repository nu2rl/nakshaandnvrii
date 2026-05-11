"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export default function CustomCursor() {
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 28, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest("a") || 
        target.closest("button") || 
        target.closest(".cursor-pointer") ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA";
      
      setActive(!!isInteractive);
    };

    const handleLeave = () => setHidden(true);
    const handleEnter = () => setHidden(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [mouseX, mouseY, hidden]);

  if (typeof window !== "undefined" && window.innerWidth < 1024) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed left-0 top-0 z-[9999] pointer-events-none h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%", opacity: hidden ? 0 : 1 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed left-0 top-0 z-[9998] pointer-events-none rounded-full border border-gold/40"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: active ? 64 : 32,
          height: active ? 64 : 32,
          opacity: hidden ? 0 : 1,
          backgroundColor: active ? "rgba(107, 63, 160, 0.05)" : "transparent"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.5 }}
      />
    </>
  );
}
