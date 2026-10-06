"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type CSSProperties } from "react";
import { Box } from "@/components/illustrations/Box";
import { Label } from "@/components/illustrations/Label";
import { gridBg, mono } from "@/lib/styles";

gsap.registerPlugin(useGSAP);

/** Fired on window when the entrance finishes (BrandStrip follows it) */
export const HERO_LOADED = "hero:loaded";

const cardLabel: CSSProperties = { ...mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" };
const card: CSSProperties = {
  position: "absolute",
  flexDirection: "column",
  border: "1px solid var(--border)",
  borderRadius: 14,
  background: "#FFFFFF",
  textAlign: "left",
  boxShadow: "0 14px 30px rgba(20,20,20,0.06)",
  zIndex: 1,
};

/**
 * Hero visual: the box with its shipping label, plus the two floating cards.
 * Renders the finished state; with motion allowed, `hb-hide` (globals.css) hides the
 * animated parts until the one-time entrance brings them in.
 */
export function BoxIllustration() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The box, its two cards and the "139 retail flows built" chip (in Hero, outside this scope)
        // are one tween, so they fade and drop in from above together.
        const entering = [...root.current!.querySelectorAll(".hb-svg, .hb-card"), document.querySelector(".hero-chip")].filter(Boolean);
        const tl = gsap.timeline({ paused: true });
        tl.fromTo(entering, { opacity: 0, y: -48 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
          .call(() => window.dispatchEvent(new Event(HERO_LOADED)))
          .to(".hb-svg", { y: -6, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // Start once fonts are in, or after 300ms, whichever comes first
        Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 300))]).then(() => tl.play());
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="hero-anim h-[clamp(190px,30svh,300px)] sm:h-[clamp(260px,50vh,420px)]" style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div aria-hidden="true" style={gridBg(25, 70)} />
      <div className="hb-card hb-hide flex max-sm:hidden" style={{ ...card, left: 0, top: "3%", transform: "rotate(-3deg)", gap: 6, padding: "14px 18px" }}>
        <span style={cardLabel}>Walmart&apos;s routing guide</span>
        <span style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.03em" }}>350+ pages</span>
        <span style={cardLabel}>Read for you</span>
      </div>

      <svg
        className="hb-svg hb-hide w-[min(26svh,220px,60vw)] sm:w-[min(38vh,320px,80vw)]"
        width={280}
        height={252}
        viewBox="0 0 400 360"
        fill="none"
        role="img"
        aria-label="A cardboard box with its shipping label placed on it"
        style={{ position: "relative", height: "auto" }}
      >
        <ellipse cx="200" cy="344" rx="150" ry="12" fill="#141414" fillOpacity="0.07" />
        <Box />
        <Label />
      </svg>

      <div className="hb-card hb-hide flex max-sm:hidden" style={{ ...card, right: 0, bottom: "5%", transform: "rotate(2deg)", width: 200, boxSizing: "border-box", gap: 8, padding: "14px 16px" }}>
        <span style={cardLabel}>Current step</span>
        <span style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.02em" }}>Guided Packaging Process</span>
        <div style={{ height: 4, borderRadius: 2, background: "var(--line)", overflow: "hidden" }}>
          <div style={{ width: "60%", height: "100%", background: "#141414" }} />
        </div>
      </div>
    </div>
  );
}
