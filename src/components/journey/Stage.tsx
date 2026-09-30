"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Box, KRAFT_TONES } from "@/components/illustrations/Box";
import { Label, LabelGuide } from "@/components/illustrations/Label";
import { Pallet } from "@/components/illustrations/Pallet";
import { RuleTags } from "@/components/journey/RuleTags";
import { Tablet } from "@/components/journey/Tablet";
import { gridBg } from "@/lib/styles";

gsap.registerPlugin(useGSAP);

// Scene is a 480x420 SVG. Box artwork is 400x360 (see Box), placed with these transforms.
const BOX_AT = { x: 120, y: 110, scale: 0.6 };
const STACK_AT = { x: 124, y: 202, scale: 0.32 };
// The same stack pose expressed inside the box's own transform, so the main box can slide onto the pallet
const ON_PALLET = {
  x: (STACK_AT.x - BOX_AT.x) / BOX_AT.scale,
  y: (STACK_AT.y - BOX_AT.y) / BOX_AT.scale,
  scale: STACK_AT.scale / BOX_AT.scale,
};
// Five more boxes around the main box (which sits front-bottom). DOM order = paint order, back to front.
const slot = (k: number, z: number) => `translate(${160 * k} ${-80 * k - 140 * z})`;
const BEHIND = [slot(2, 0), slot(1, 0)];
const ABOVE = [slot(2, 1), slot(1, 1), slot(0, 1)];

type Props = { step: number; reduced: boolean };

/**
 * Pinned visual for How it works. `step` is -1 before the section, then 0-4.
 * Every element tweens to its pose for the new step, so it works scrolling either way;
 * forward entrances get extra choreography (drop, fly-in, flash, stacking).
 */
export function Stage({ step, reduced }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const prevStep = useRef<number | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const prev = prevStep.current;
      prevStep.current = step;
      const first = prev === null;
      const from = prev ?? -1;
      const calm = first || reduced; // no choreography, just land in (or fade to) the new state

      timeline.current?.kill();
      const t = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });
      timeline.current = t;

      const put = (targets: string, vars: gsap.TweenVars, at = 0) => {
        if (first) return void t.set(targets, vars, 0);
        if (!reduced) return void t.to(targets, vars, at);
        const { opacity, ...rest } = vars;
        t.set(targets, rest, 0);
        if (opacity !== undefined) t.to(targets, { opacity, duration: 0.2 }, 0);
      };

      const onPallet = step === 4;

      // Main box: drops in on the first step, slides onto the pallet on the last
      const boxPose = step < 0 ? { x: 0, y: -180, scale: 1, opacity: 0 } : onPallet ? { ...ON_PALLET, opacity: 1 } : { x: 0, y: 0, scale: 1, opacity: 1 };
      if (!calm && from < 0 && step >= 0 && !onPallet) {
        t.fromTo(".st-main", { x: 0, y: -180, scale: 1, opacity: 0, svgOrigin: "0 0" }, { x: 0, y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, 0);
      } else put(".st-main", { ...boxPose, svgOrigin: "0 0" });
      put(".st-shadow", { opacity: step >= 0 && !onPallet ? 1 : 0 });

      // Rule tags pop in one by one, then each gets its check
      if (!calm && step === 1 && from !== 1) {
        t.fromTo(".st-tag", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.18, transformOrigin: "50% 50%" }, 0.1);
        t.fromTo(".st-tag-check", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)", stagger: 0.18, transformOrigin: "50% 50%" }, 0.4);
      } else {
        put(".st-tag", { opacity: step === 1 ? 1 : 0, scale: 1 });
        put(".st-tag-check", { opacity: step === 1 ? 1 : 0, scale: 1 });
      }

      // Dashed guide, then the label flies in from the upper left and snaps on
      put(".st-guide", { opacity: step >= 2 ? 1 : 0 });
      const labelPose = step >= 2 ? { x: 0, y: 0, opacity: 1 } : { x: -140, y: -170, opacity: 0 };
      if (!calm && step >= 2 && from < 2) {
        t.fromTo(".st-label", { x: -140, y: -170, opacity: 0 }, { ...labelPose, duration: 0.55, ease: "back.out(1.4)" }, 0.25);
      } else put(".st-label", labelPose);

      // Camera flash, then the green stamp lands on the top face
      if (!calm && step >= 3 && from < 3) {
        t.fromTo(".st-flash", { opacity: 0 }, { opacity: 0.85, duration: 0.08, ease: "none" }, 0);
        t.to(".st-flash", { opacity: 0, duration: 0.35 }, 0.08);
        t.fromTo(".st-stamp", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.5)", transformOrigin: "50% 50%" }, 0.2);
      } else put(".st-stamp", { opacity: step >= 3 ? 1 : 0, scale: step >= 3 ? 1 : 0.6, transformOrigin: "50% 50%" });

      // Pallet appears under the box, then the other five boxes drop in back to front
      put(".st-pallet", { opacity: onPallet ? 1 : 0, y: onPallet ? 0 : 30 });
      if (!calm && onPallet && from !== 4) {
        t.fromTo(".st-stack", { y: -260, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.3)", stagger: 0.18 }, 0.55);
      } else put(".st-stack", { opacity: onPallet ? 1 : 0, y: onPallet ? 0 : -60 });
    },
    { scope: root, dependencies: [step, reduced], revertOnUpdate: false },
  );

  return (
    <div ref={root} className="how-stage">
      <div style={{ position: "relative", height: "100%", borderRadius: 24, background: "var(--background)", border: "1px solid var(--line)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px, 2vw, 24px)", padding: "clamp(12px, 3vh, 32px)", boxSizing: "border-box" }}>
        <div aria-hidden="true" style={gridBg(20, 75)} />
        <svg viewBox="0 0 480 420" role="img" aria-label="A box moving through the packing steps" style={{ position: "relative", flex: 1, minWidth: 0, height: "100%", maxHeight: 460 }}>
          <g transform={`translate(${STACK_AT.x} ${STACK_AT.y}) scale(${STACK_AT.scale})`}>
            <g className="st-pallet">
              <Pallet />
            </g>
            {BEHIND.map((pos, i) => (
              <g key={pos} transform={pos}>
                <g className="st-stack">
                  <Box tone={KRAFT_TONES[(i + 1) % 3]} />
                </g>
              </g>
            ))}
          </g>

          <g transform={`translate(${BOX_AT.x} ${BOX_AT.y}) scale(${BOX_AT.scale})`}>
            <ellipse className="st-shadow" cx="200" cy="344" rx="150" ry="12" fill="#141414" fillOpacity="0.07" />
            <g className="st-main">
              <Box />
              <g className="st-guide">
                <LabelGuide />
              </g>
              <g className="st-label">
                <Label />
              </g>
              {/* Round stamp laid flat on the top face */}
              <g transform="translate(200 120) scale(1 0.5)">
                <g className="st-stamp">
                  <circle r="44" fill="#1F8A4C" />
                  <path d="M-19 1l12 12 26-27" stroke="#FFFFFF" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </g>
            </g>
          </g>

          <g transform={`translate(${STACK_AT.x} ${STACK_AT.y}) scale(${STACK_AT.scale})`}>
            {ABOVE.map((pos, i) => (
              <g key={pos} transform={pos}>
                <g className="st-stack">
                  <Box tone={KRAFT_TONES[i % 3]} />
                </g>
              </g>
            ))}
          </g>

          <RuleTags />
        </svg>
        <Tablet step={step} />
        <div className="st-flash" aria-hidden="true" style={{ position: "absolute", inset: 0, background: "#FFFFFF", opacity: 0, pointerEvents: "none" }} />
      </div>
    </div>
  );
}
