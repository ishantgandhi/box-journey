"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useId, useRef, type CSSProperties } from "react";
import { Box } from "@/components/illustrations/Box";
import { Label } from "@/components/illustrations/Label";
import { gridBg, mono } from "@/lib/styles";

gsap.registerPlugin(useGSAP);

/** Fired on window when the load timeline lands the label (BrandStrip follows it) */
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
 * animated parts until the one-time load timeline brings them in.
 */
export function BoxIllustration() {
  const root = useRef<HTMLDivElement>(null);
  const maskId = useId();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
        gsap.set(".hb-label", { x: -60, y: -70, rotation: -6, transformOrigin: "50% 50%" });

        tl.fromTo(".hb-svg", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
          // Dashed outline fades in while a mask draws it around the label spot
          .to(".hb-guide", { opacity: 1, duration: 0.3 }, ">")
          .fromTo(".hb-guide-draw", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: "none" }, "<")
          .fromTo(".hb-card", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, "<")
          // Label appears where it hovers, waits, then travels onto the outline
          .to(".hb-label", { opacity: 1, duration: 0.25 }, ">")
          .to(".hb-label", { x: 0, y: 0, rotation: 0, duration: 0.65, ease: "power3.inOut" }, ">0.2")
          .addLabel("landed")
          .call(() => window.dispatchEvent(new Event(HERO_LOADED)), undefined, "landed")
          .fromTo(".hb-label", { scale: 1.04 }, { scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, "landed")
          .to(".hb-guide", { opacity: 0, duration: 0.25 }, "landed")
          .fromTo(".hb-check", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)", transformOrigin: "50% 50%" }, "landed+=0.2")
          .to(".hb-check", { opacity: 0, duration: 0.3 }, ">1.2")
          .to(".hb-svg", { y: -6, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 }, ">");

        // Start once fonts are in, or after 300ms, whichever comes first
        Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 300))]).then(() => tl.play());
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="hero-anim" style={{ position: "relative", width: "100%", height: "clamp(260px, 50vh, 420px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div aria-hidden="true" style={gridBg(25, 70)} />
      <div className="hb-card hb-hide flex max-sm:hidden" style={{ ...card, left: 0, top: "3%", transform: "rotate(-3deg)", gap: 6, padding: "14px 18px" }}>
        <span style={cardLabel}>Walmart&apos;s routing guide</span>
        <span style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.03em" }}>399 pages</span>
        <span style={cardLabel}>Read for you</span>
      </div>

      <svg
        className="hb-svg hb-hide"
        width={280}
        height={252}
        viewBox="0 0 400 360"
        fill="none"
        role="img"
        aria-label="A cardboard box with its shipping label placed on it"
        style={{ position: "relative", width: "min(38vh, 320px, 80vw)", height: "auto" }}
      >
        <ellipse cx="200" cy="344" rx="150" ry="12" fill="#141414" fillOpacity="0.07" />
        <Box />
        <g transform="matrix(1 0.5 0 1 0 0)">
          <mask id={maskId}>
            <rect className="hb-guide-draw" x="80" y="130" width="90" height="60" rx="3" pathLength={1} stroke="#FFFFFF" strokeWidth="4" strokeDasharray="1 1" />
          </mask>
          <rect className="hb-guide" opacity="0" mask={`url(#${maskId})`} x="80" y="130" width="90" height="60" rx="3" stroke="#6B5234" strokeWidth="1.5" strokeDasharray="5 4" />
        </g>
        <g className="hb-label hb-hide">
          <Label />
        </g>
        {/* Top-right corner of the placed label (170, 130) on the left face */}
        <g className="hb-check" opacity="0">
          <circle cx="170" cy="215" r="11" fill="#141414" />
          <path d="M165 215.3l3.3 3.3 6.4-6.8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
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
