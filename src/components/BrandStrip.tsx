"use client";

import gsap from "gsap";
import { useRef } from "react";
import { HERO_LOADED } from "@/components/illustrations/BoxIllustration";
import { useMotion } from "@/lib/motion";
import { container, eyebrow } from "@/lib/styles";

const brands = ["Brümate", "Natural Dog Company", "Ware2Go", "GoBolt", "Radial"];

export function BrandStrip() {
  const ref = useRef<HTMLDivElement>(null);
  // Names fade in one by one once the hero's load timeline lands its label
  useMotion(() => {
    const names = gsap.utils.toArray<HTMLElement>(".brand");
    gsap.set(names, { opacity: 0 });
    const show = () => gsap.to(names, { opacity: 1, duration: 0.4, stagger: 0.09, ease: "power2.out" });
    window.addEventListener(HERO_LOADED, show, { once: true });
    return () => window.removeEventListener(HERO_LOADED, show);
  }, ref);

  return (
    <div ref={ref} style={{ ...container, marginTop: "clamp(24px, 4vh, 48px)", padding: "clamp(14px, 2.6vh, 28px) 24px clamp(18px, 3.4vh, 40px)", borderTop: "1px solid var(--grid)", display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(10px, 2vh, 22px)" }}>
      <span style={eyebrow}>Trusted by brands and 3PLs</span>
      <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "16px 40px", fontSize: "clamp(18px, min(1.8vw, 3.2vh), 23px)", fontWeight: 600, letterSpacing: "-0.03em", color: "#57534E" }}>
        {brands.map((b) => (
          <span key={b} className="brand">
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
