"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowLeftRight, Camera, ClipboardList, FileUp, LayoutDashboard, ListChecks, PackageCheck, ScanSearch, ShieldCheck, Timer, TrendingUp, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal, useMotion } from "@/lib/motion";
import { container, eyebrow, h2Size, mono, padY } from "@/lib/styles";

const panels = {
  "3pl": {
    label: "For 3PLs",
    shot: { src: "/screenshots/order-view.png", w: 2048, h: 1551, label: "Order view", alt: "RetailReady order screen showing packing progress, SKUs and packed cartons" },
    heading: "Streamline Your Operations",
    blurb: "Our user-friendly mobile application ensures operational shipping compliance to retailers. It turns routing guides into step-by-step tasks and keeps a visual repository of every order for dispute resolution.",
    cards: [
      { Icon: PackageCheck, t: "Smart Packout Flow", d: "Mobile-first compliance solution with AI-powered instructions" },
      { Icon: ListChecks, t: "Task Management", d: "Prioritized daily workflows with real-time tracking" },
      { Icon: ArrowLeftRight, t: "EDI Services", d: "Automated document exchange and compliance validation" },
      { Icon: Truck, t: "Automated ASN", d: "Streamlined shipping notices with multi-carrier support" },
    ],
  },
  brands: {
    label: "For Brands",
    shot: { src: "/screenshots/chargeback-analytics.png", w: 2048, h: 1437, label: "Chargeback analytics", alt: "RetailReady chargeback analytics dashboard with totals, amount won back and at-fault breakdown" },
    heading: "See how your orders are packed",
    blurb: "Our dashboard offers insights into your or your 3PL's operations, allowing you to upload chargebacks. That data tailors your packing process with extra validation checks.",
    cards: [
      { Icon: LayoutDashboard, t: "Operations Dashboard", d: "Insights into your own or your 3PL's operations" },
      { Icon: FileUp, t: "Chargeback Uploads", d: "Upload the chargebacks you receive from retailers" },
      { Icon: ShieldCheck, t: "Tailored Validation", d: "Your chargeback data adds extra validation checks to packing" },
      { Icon: Camera, t: "Order Photos", d: "A visual record of every order for dispute resolution" },
    ],
  },
  retailers: {
    label: "For Retailers",
    shot: { src: "/screenshots/compliance-form.png", w: 2048, h: 1381, label: "Compliance form", alt: "RetailReady compliance form where receiving teams select vendor compliance errors" },
    heading: "Catch vendor errors at the dock",
    blurb: "Our retailer mobile app automatically detects and records shipping compliance errors from vendors, speeding up revenue generation and increasing labor efficiency.",
    cards: [
      { Icon: ScanSearch, t: "Error Detection", d: "Automatically detects shipping compliance errors from vendors" },
      { Icon: ClipboardList, t: "Automatic Records", d: "Every error recorded for you, no more spreadsheets" },
      { Icon: TrendingUp, t: "Faster Revenue", d: "Speeds up revenue generation on inbound shipments" },
      { Icon: Timer, t: "Labor Efficiency", d: "Non-compliant orders take 2X the labor. Catch them early." },
    ],
  },
};

type Key = keyof typeof panels;
const PILL_BASE = 100;
const keys = Object.keys(panels) as Key[];

export function Stakeholders() {
  const [tab, setTab] = useState<Key>("3pl");
  const panel = panels[tab];

  // Black pill that slides between tabs. It has a fixed base width and is scaled to each tab,
  // so only its transform animates.
  const tabsRef = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const [pillReady, setPillReady] = useState(false);
  const placePill = (animate: boolean) => {
    const btn = tabsRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!btn || !pill.current) return;
    const vars = { x: btn.offsetLeft, y: btn.offsetTop, scaleX: btn.offsetWidth / PILL_BASE, transformOrigin: "left" };
    const still = !animate || matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) gsap.set(pill.current, vars);
    else gsap.to(pill.current, { ...vars, duration: 0.25, ease: "power2.out" });
  };
  useGSAP(
    () => {
      placePill(pillReady);
      setPillReady(true);
    },
    { dependencies: [tab] },
  );
  useEffect(() => {
    const onResize = () => placePill(false);
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
  });

  // Cards restagger in when the tab changes (not on first render)
  const cardsRef = useRef<HTMLDivElement>(null);
  const firstPanel = useRef(true);
  useMotion(
    () => {
      if (firstPanel.current) return void (firstPanel.current = false);
      gsap.from(cardsRef.current!.children, { opacity: 0, y: 8, duration: 0.3, stagger: 0.05, ease: "power2.out" });
    },
    cardsRef,
    [tab],
  );

  return (
    <section id="stakeholders" className="screen" style={{ ...container, padding: `${padY} 24px`, display: "flex", flexDirection: "column", gap: "clamp(20px, 4vh, 40px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: 24 }}>
        <Reveal style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={eyebrow}>04 / Who it&apos;s for</span>
          <h2 style={{ margin: 0, fontSize: h2Size, lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.04em" }}>Value for every stakeholder</h2>
        </Reveal>
        <div ref={tabsRef} role="tablist" aria-label="Stakeholder" style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 4, padding: 4, borderRadius: 12, background: "var(--line)", ...mono, fontSize: 13 }}>
          <span ref={pill} aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, width: PILL_BASE, height: 44, borderRadius: 9, background: "#141414", opacity: pillReady ? 1 : 0 }} />
          {keys.map((key) => {
            const sel = key === tab;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                id={`tab-${key}`}
                aria-selected={sel}
                aria-controls="stakeholder-panel"
                onClick={() => setTab(key)}
                style={{ position: "relative", minHeight: 44, padding: "0 18px", border: 0, borderRadius: 9, background: sel && !pillReady ? "#141414" : "transparent", color: sel ? "#FFFFFF" : "#141414", transition: "color 250ms, transform 120ms", fontFamily: "inherit", fontSize: "inherit", cursor: "pointer" }}
              >
                {panels[key].label}
              </button>
            );
          })}
        </div>
      </div>

      <div id="stakeholder-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="grid gap-10 min-[900px]:grid-cols-2 min-[900px]:gap-12">
        {/* Stretches to the height of the text column on desktop; the 4:3 frame is centered inside */}
        <div style={{ display: "flex", flexDirection: "column", padding: 20, borderRadius: 24, background: "var(--line)" }}>
          <span key={tab} className="fade-up" style={{ display: "block", marginBottom: 14, ...mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>
            {panel.shot.label}
          </span>
          {/* All three stay mounted so they load up front and crossfade without a flash */}
          <div className="aspect-[4/3] min-[900px]:my-auto" style={{ position: "relative", borderRadius: 12, border: "1px solid var(--grid)", overflow: "hidden", background: "#FFFFFF", boxShadow: "0 20px 50px rgba(20,20,20,0.10)" }}>
            {keys.map((key) => {
              const active = key === tab;
              return (
                <Image
                  key={key}
                  src={panels[key].shot.src}
                  alt={active ? panels[key].shot.alt : ""}
                  aria-hidden={!active}
                  width={panels[key].shot.w}
                  height={panels[key].shot.h}
                  sizes="(min-width: 1200px) 690px, (min-width: 900px) 58vw, 100vw"
                  className="transition-[opacity,transform] duration-[250ms] ease-out motion-reduce:transition-none"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "top", opacity: active ? 1 : 0, transform: active ? "none" : "translateY(8px)" }}
                />
              );
            })}
          </div>
        </div>

        <div key={tab} className="fade-up min-[900px]:order-first" style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 3vh, 28px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 1.6vh, 16px)" }}>
            <span style={{ fontSize: "clamp(22px, 4vh, 30px)", lineHeight: 1.15, fontWeight: 500, letterSpacing: "-0.025em" }}>{panel.heading}</span>
            <p style={{ margin: 0, fontSize: "clamp(15px, 2.4vh, 17px)", lineHeight: 1.55, color: "var(--body)", textWrap: "pretty" }}>{panel.blurb}</p>
          </div>
          <div ref={cardsRef} className="grid gap-3 min-[900px]:grid-cols-2">
            {panel.cards.map((k) => (
              <div key={k.t} style={{ display: "flex", flexDirection: "column", gap: "clamp(6px, 1.2vh, 28px)", padding: "clamp(14px, 2.2vh, 20px)", borderRadius: 18, background: "#FFFFFF", border: "1px solid var(--border)" }}>
                <span style={{ display: "grid", placeItems: "center", width: 36, height: 36, borderRadius: 10, background: "var(--background)", border: "1px solid var(--border)", color: "#141414" }}>
                  <k.Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: "clamp(16px, 2.6vh, 18px)", fontWeight: 500, letterSpacing: "-0.02em" }}>{k.t}</span>
                  <span className="card-desc" style={{ fontSize: 15, lineHeight: 1.5, color: "var(--body)" }}>{k.d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
