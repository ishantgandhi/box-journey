"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { Stage } from "@/components/journey/Stage";
import { container, eyebrow, h2Size, mono, padY } from "@/lib/styles";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  ["Smart Order Processing", "Start your fulfillment journey with our intuitive mobile interface. Directed packout workflows ensure accuracy from the first step."],
  ["Proactive Compliance Checks", "Prevent costly mistakes before they happen. Our system automatically validates retailer requirements, ensuring every SKU meets compliance standards before shipping."],
  ["Guided Packaging Process", "Follow clear, step-by-step instructions for proper labeling and packaging. Our system ensures every box is correctly labeled and ready for shipment."],
  ["Verified Success", "Celebrate each perfectly packed order! Our system confirms successful completion, giving you confidence that every shipment meets the highest standards."],
  ["Comprehensive Compliance Reports", "Track your success with detailed compliance reports for every order. Get actionable insights and proof of compliance for your retail partners."],
];

// Must match the pinned-layout media query in globals.css
const PIN_QUERY = "(min-width: 1024px) and (min-height: 640px)";
// Scroll distance each step stays active while pinned, as a fraction of the viewport height
const STEP_SCROLL = 0.6;
// Where on screen a step becomes active when not pinned: the middle, or below the sticky stage on mobile
const DESKTOP_LINE = 0.5;
const MOBILE_LINE = 0.72;
const lineRatio = () => (window.matchMedia("(min-width: 1024px)").matches ? DESKTOP_LINE : MOBILE_LINE);

export function HowItWorks() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(-1);
  const section = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const pin = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(PIN_QUERY, () => {
        const fill = ".how-progress-fill";
        pin.current = ScrollTrigger.create({
          trigger: section.current,
          start: "top 64px",
          end: () => `+=${innerHeight * STEP_SCROLL * steps.length}`,
          pin: true,
          onUpdate: ({ progress }) => {
            setActive(Math.min(steps.length - 1, Math.floor(progress * steps.length)));
            gsap.set(fill, { scaleY: progress });
          },
          onLeaveBack: () => setActive(-1),
        });
        return () => {
          pin.current = null;
        };
      });
      mm.add(`not all and ${PIN_QUERY}`, () => {
        const line = `${lineRatio() * 100}%`;
        stepRefs.current.forEach((el, i) => {
          ScrollTrigger.create({
            trigger: el,
            start: `top ${line}`,
            end: `bottom ${line}`,
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
            onLeaveBack: i === 0 ? () => setActive(-1) : undefined,
          });
        });
        gsap.fromTo(
          ".how-progress-fill",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".how-steps", start: `top ${line}`, end: `bottom ${line}`, scrub: true } },
        );
      });

      // Content above can change height (search results, the full flows list), so keep trigger positions in sync
      let raf = 0;
      const observer = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      observer.observe(document.body);
      return () => {
        observer.disconnect();
        cancelAnimationFrame(raf);
      };
    },
    { scope: section },
  );

  function scrollToStep(i: number) {
    const behavior = reduced ? "auto" : "smooth";
    const st = pin.current;
    if (st) return window.scrollTo({ top: st.start + ((i + 0.5) / steps.length) * (st.end - st.start), behavior });
    const el = stepRefs.current[i];
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - innerHeight * lineRatio() + 40, behavior });
  }

  return (
    <section id="how" ref={section} style={{ scrollMarginTop: 64, background: "#FFFFFF", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div className="how-grid" style={{ ...container, padding: `${padY} 24px` }}>
        <div className="how-head" style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 2vh, 16px)" }}>
          <span style={eyebrow}>03 / How it works</span>
          <h2 style={{ margin: 0, fontSize: h2Size, lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.04em", textWrap: "balance" }}>Follow one box through the warehouse.</h2>
        </div>

        <Stage step={active} reduced={reduced} />

        <ol className="how-steps" style={{ position: "relative", listStyle: "none", margin: 0, padding: "0 0 0 20px" }}>
          <span aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, borderRadius: 1, background: "var(--line)", overflow: "hidden" }}>
            <span className="how-progress-fill" style={{ position: "absolute", inset: 0, background: "#141414", transformOrigin: "top", transform: "scaleY(0)" }} />
          </span>
          {steps.map(([title, desc], i) => {
            const on = i === active;
            const color = on ? "#141414" : "var(--muted)";
            return (
              <li key={title} ref={(el) => void (stepRefs.current[i] = el)} className="min-h-[40vh] last:min-h-0 lg:min-h-0">
                <button
                  type="button"
                  aria-current={on ? "step" : undefined}
                  onClick={() => scrollToStep(i)}
                  className="how-step-btn transition-colors duration-300"
                  style={{ width: "100%", display: "grid", gridTemplateColumns: "48px minmax(0, 1fr)", gap: 8, padding: "22px 0", border: 0, borderTop: "1px solid var(--line)", background: "none", font: "inherit", textAlign: "left", color, cursor: "pointer" }}
                >
                  <span style={{ ...mono, fontSize: 13, paddingTop: 4 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontSize: "clamp(19px, 2.8vh, 22px)", fontWeight: 500, letterSpacing: "-0.02em" }}>{title}</span>
                    <span className="how-desc">
                      <span style={{ fontSize: 15, lineHeight: 1.55 }}>{desc}</span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
