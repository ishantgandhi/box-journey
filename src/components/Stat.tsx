"use client";

import gsap from "gsap";
import { useRef } from "react";
import { CountUp, playOnceInView, useMotion } from "@/lib/motion";

type Props = { value: string; label: string; size: string; gap?: number | string };

const RULE_S = 0.4;

export function Stat({ value, label, size, gap = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // The rule above the number draws in left to right, then the number counts up
  useMotion(() => {
    playOnceInView(ref.current!, gsap.from(".stat-rule", { scaleX: 0, transformOrigin: "left", duration: RULE_S, ease: "power2.out" }), "top 85%");
  }, ref);

  return (
    <div ref={ref} style={{ position: "relative", display: "flex", flexDirection: "column", gap, paddingTop: "clamp(12px, 2.4vh, 20px)" }}>
      <span className="stat-rule" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "#141414" }} />
      <CountUp value={value} delay={RULE_S} style={{ fontSize: size, lineHeight: 1, fontWeight: 500, letterSpacing: "-0.055em" }} />
      <span style={{ fontSize: 15, lineHeight: 1.5, color: "var(--body)" }}>{label}</span>
    </div>
  );
}
