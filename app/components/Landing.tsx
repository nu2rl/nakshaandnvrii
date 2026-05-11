"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import Loader from "./Loader";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Philosophy from "./Philosophy";
import Stats from "./Stats";
import Services from "./Services";
import Portfolio from "./Portfolio";
import BeforeAfter from "./BeforeAfter";
import Process from "./Process";
import Testimonials from "./Testimonials";
import WhyUs from "./WhyUs";
import Journal from "./Journal";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Footer from "./Footer";
import WhatsAppFab from "./WhatsAppFab";
import CustomCursor from "./CustomCursor";

// modal can stay code-split
const ConsultationModal = dynamic(() => import("./ConsultationModal"), {
  ssr: false,
});

export default function Landing() {
  const [modalOpen, setModalOpen] = useState(false);

  // Auto-open modal once after scroll engagement
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("artha:consult-shown")) return;

    let triggered = false;
    const onScroll = () => {
      if (triggered) return;
      const ratio = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (ratio > 0.35) {
        triggered = true;
        sessionStorage.setItem("artha:consult-shown", "1");
        setTimeout(() => setModalOpen(true), 600);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openConsult = () => setModalOpen(true);

  return (
    <>
      <CustomCursor />
      <Loader />
      <Navbar onConsult={openConsult} />

      <main>
        <Hero onConsult={openConsult} />
        <Philosophy />
        <Stats />
        <Services onConsult={openConsult} />
        <Portfolio />
        <BeforeAfter />
        <Process />
        <Testimonials />
        <WhyUs />
        <Journal />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      <WhatsAppFab />
      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
