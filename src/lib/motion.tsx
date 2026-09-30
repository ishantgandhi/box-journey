"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type CSSProperties, type ReactNode, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Plays `anim` once, the first time `trigger` is 80% up the viewport. The tween isn't bound to the
 * ScrollTrigger, so ScrollTrigger refreshes (e.g. on window load) can't pause it mid-play.
 */
export function playOnceInView<T extends gsap.core.Animation>(trigger: Element, anim: T, start = "top 80%") {
  anim.pause();
  ScrollTrigger.create({ trigger, start, once: true, onEnter: () => void anim.play() });
  return anim;
}

/**
 * useGSAP that only runs with motion allowed. Markup should render the final state;
 * animations use from()/fromTo() so reduced-motion users simply see that final state.
 * Everything created inside (tweens, ScrollTriggers) is reverted on unmount.
 */
export function useMotion(fn: () => void | (() => void), scope: RefObject<Element | null>, dependencies: unknown[] = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", fn);
      return () => mm.revert();
    },
    { scope, dependencies },
  );
}

/** Fades its direct children in and up 16px, 80ms apart, once they scroll into view */
export function Reveal({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useMotion(() => {
    playOnceInView(ref.current!, gsap.from(ref.current!.children, { opacity: 0, y: 16, duration: 0.5, ease: "power2.out", stagger: 0.08 }));
  }, ref);
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/**
 * Counts every number inside `value` up from 0 ("$40B", "10–12%", "139"); other characters stay put.
 * Each number's final width is held while counting so nothing beside it shifts.
 */
export function CountUp({ value, duration = 1.4, delay = 0, style }: { value: string; duration?: number; delay?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  useMotion(() => {
    const nums = [...ref.current!.querySelectorAll<HTMLElement>("[data-n]")];
    const final = () => nums.forEach((el) => ((el.textContent = el.dataset.n!), (el.style.minWidth = "")));
    nums.forEach((el) => (el.style.minWidth = `${el.offsetWidth}px`));
    const p = { t: 0 };
    const render = () => nums.forEach((el) => (el.textContent = String(Math.round(+el.dataset.n! * p.t))));
    render();
    playOnceInView(ref.current!, gsap.to(p, { t: 1, duration, delay, ease: "power2.out", onUpdate: render, onComplete: final }), "top 85%");
    return final;
  }, ref);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {value.split(/(\d+)/).map((part, i) =>
        i % 2 ? (
          <span key={i} data-n={part} style={{ display: "inline-block", textAlign: "right" }}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
}
