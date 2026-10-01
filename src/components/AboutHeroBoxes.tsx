"use client";

import gsap from "gsap";
import { useRef, type CSSProperties } from "react";
import { Box, KRAFT_TONES } from "@/components/illustrations/Box";
import { useMotion } from "@/lib/motion";

/**
 * Box positions inside a pile, in Box units (see Box): r steps along the right-hand edge,
 * l along the left-hand edge, u stacks upward.
 */
type Slot = { r?: number; l?: number; u?: number };
type Pile = { spot: CSSProperties; scale: number; slots: Slot[] };

const PILES: Pile[] = [
  { spot: { left: "5%", top: "10%" }, scale: 0.24, slots: [{}, { u: 1 }] },
  { spot: { left: "10%", top: "37%" }, scale: 0.12, slots: [{}] },
  { spot: { left: "2%", top: "54%" }, scale: 0.17, slots: [{ r: 1 }, {}] },
  { spot: { left: "11%", top: "70%" }, scale: 0.2, slots: [{}, { l: 1 }, { u: 1 }] },
  { spot: { left: "30%", top: "84%" }, scale: 0.1, slots: [{}] },
  { spot: { right: "4%", top: "8%" }, scale: 0.2, slots: [{}, { u: 1 }, { u: 2 }] },
  { spot: { right: "22%", top: "10%" }, scale: 0.12, slots: [{}] },
  { spot: { right: "10%", top: "50%" }, scale: 0.15, slots: [{}] },
  { spot: { right: "3%", top: "70%" }, scale: 0.2, slots: [{ r: 1 }, {}, { u: 1 }] },
  { spot: { right: "28%", top: "82%" }, scale: 0.11, slots: [{}] },
];

const pos = ({ r = 0, l = 0, u = 0 }: Slot) => ({ x: 160 * (r + l), y: -80 * r + 80 * l - 140 * u });
// Paint back to front: lower layers first, then from the far corner toward the viewer
const depthOrder = ({ r = 0, l = 0, u = 0 }: Slot) => u * 100 + l - r;

function PileSvg({ pile, index }: { pile: Pile; index: number }) {
  const slots = [...pile.slots].sort((a, b) => depthOrder(a) - depthOrder(b));
  const pts = slots.map(pos);
  const minX = Math.min(...pts.map((p) => p.x)) + 40;
  const maxX = Math.max(...pts.map((p) => p.x)) + 360;
  const minY = Math.min(...pts.map((p) => p.y)) + 40;
  const maxY = Math.max(...pts.map((p) => p.y)) + 360;
  const ground = slots.filter((s) => !s.u).map(pos);
  const w = maxX - minX;
  const h = maxY - minY;

  return (
    <svg width={w * pile.scale} height={h * pile.scale} viewBox={`${minX} ${minY} ${w} ${h}`} overflow="visible" style={{ display: "block" }}>
      {ground.map((p, i) => (
        <ellipse key={i} className="pile-shadow" cx={p.x + 200} cy={p.y + 300} rx="170" ry="70" fill="#141414" fillOpacity="0.07" />
      ))}
      {slots.map((s, i) => {
        const p = pos(s);
        return (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            <g className="pile-box" data-top={i === slots.length - 1 || undefined}>
              <Box tone={KRAFT_TONES[(index + i) % 3]} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

/** Kraft box piles around the About hero: they drop in and stack, and hop now and then */
export function AboutHeroBoxes() {
  const layer = useRef<HTMLDivElement>(null);

  useMotion(() => {
    const piles = gsap.utils.toArray<HTMLElement>(".about-pile", layer.current);
    const hopping = new WeakSet<Element>();
    let ready = false;

    const hop = (box: Element) => {
      if (!ready || hopping.has(box)) return;
      hopping.add(box);
      gsap
        .timeline({ onComplete: () => void hopping.delete(box) })
        .to(box, { scaleY: 0.86, scaleX: 1.06, duration: 0.1, ease: "power1.out", transformOrigin: "50% 100%" })
        .to(box, { y: -90, scaleY: 1.06, scaleX: 0.96, duration: 0.28, ease: "power2.out" })
        .to(box, { y: 0, scaleY: 1, scaleX: 1, duration: 0.26, ease: "power2.in" })
        .to(box, { scaleY: 0.9, scaleX: 1.05, duration: 0.08, ease: "power1.out" })
        .to(box, { scaleY: 1, scaleX: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    };

    // Drop in pile by pile, bottom box first, each squashing as it lands
    const intro = gsap.timeline({ delay: 0.25, onComplete: () => void (ready = true) });
    piles.forEach((pile, p) => {
      const at = p * 0.09;
      intro.from(pile.querySelectorAll(".pile-shadow"), { scale: 0.3, opacity: 0, duration: 0.5, ease: "power2.out", transformOrigin: "50% 50%" }, at);
      pile.querySelectorAll(".pile-box").forEach((box, k) => {
        const t = at + k * 0.16;
        intro.from(box, { y: -900, opacity: 0, duration: 0.5, ease: "power2.in" }, t);
        intro.fromTo(box, { scaleY: 0.78, scaleX: 1.1 }, { scaleY: 1, scaleX: 1, duration: 0.6, ease: "elastic.out(1, 0.35)", transformOrigin: "50% 100%", immediateRender: false }, t + 0.5);
      });
    });

    // Every so often a random top box hops
    const tops = gsap.utils.toArray<Element>("[data-top]", layer.current);
    const tick = () => {
      hop(tops[Math.floor(Math.random() * tops.length)]);
      idle = gsap.delayedCall(1.2 + Math.random() * 1.4, tick);
    };
    let idle = gsap.delayedCall(2.6, tick);

    const cleanups = piles.map((pile) => {
      const top = pile.querySelector("[data-top]")!;
      const onEnter = () => hop(top);
      pile.addEventListener("pointerenter", onEnter);
      return () => pile.removeEventListener("pointerenter", onEnter);
    });

    return () => {
      idle.kill();
      cleanups.forEach((fn) => fn());
    };
  }, layer);

  return (
    <div ref={layer} aria-hidden="true" className="hidden md:block" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {PILES.map((pile, i) => (
        <div key={i} className="about-pile" style={{ position: "absolute", ...pile.spot, pointerEvents: "auto", filter: "drop-shadow(0 10px 14px rgba(20,20,20,0.06))" }}>
          <PileSvg pile={pile} index={i} />
        </div>
      ))}
    </div>
  );
}
