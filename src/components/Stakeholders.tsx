"use client";

import Image from "next/image";
import { useState } from "react";
import { container, eyebrow, h2Size, mono, padY } from "@/lib/styles";

const panels = {
  "3pl": {
    label: "For 3PLs",
    shot: { src: "/screenshots/order-view.png", w: 2048, h: 1551, label: "Order view", alt: "RetailReady order screen showing packing progress, SKUs and packed cartons" },
    heading: "Streamline Your Operations",
    blurb: "Our user-friendly mobile application ensures operational shipping compliance to retailers. It turns routing guides into step-by-step tasks and keeps a visual repository of every order for dispute resolution.",
    cards: [
      { i: "A", t: "Smart Packout Flow", d: "Mobile-first compliance solution with AI-powered instructions" },
      { i: "B", t: "Task Management", d: "Prioritized daily workflows with real-time tracking" },
      { i: "C", t: "EDI Services", d: "Automated document exchange and compliance validation" },
      { i: "D", t: "Automated ASN", d: "Streamlined shipping notices with multi-carrier support" },
    ],
  },
  brands: {
    label: "For Brands",
    shot: { src: "/screenshots/chargeback-analytics.png", w: 2048, h: 1437, label: "Chargeback analytics", alt: "RetailReady chargeback analytics dashboard with totals, amount won back and at-fault breakdown" },
    heading: "See how your orders are packed",
    blurb: "Our dashboard offers insights into your or your 3PL's operations, allowing you to upload chargebacks. That data tailors your packing process with extra validation checks.",
    cards: [
      { i: "A", t: "Operations Dashboard", d: "Insights into your own or your 3PL's operations" },
      { i: "B", t: "Chargeback Uploads", d: "Upload the chargebacks you receive from retailers" },
      { i: "C", t: "Tailored Validation", d: "Your chargeback data adds extra validation checks to packing" },
      { i: "D", t: "Order Photos", d: "A visual record of every order for dispute resolution" },
    ],
  },
  retailers: {
    label: "For Retailers",
    shot: { src: "/screenshots/compliance-form.png", w: 2048, h: 1381, label: "Compliance form", alt: "RetailReady compliance form where receiving teams select vendor compliance errors" },
    heading: "Catch vendor errors at the dock",
    blurb: "Our retailer mobile app automatically detects and records shipping compliance errors from vendors, speeding up revenue generation and increasing labor efficiency.",
    cards: [
      { i: "A", t: "Error Detection", d: "Automatically detects shipping compliance errors from vendors" },
      { i: "B", t: "Automatic Records", d: "Every error recorded for you, no more spreadsheets" },
      { i: "C", t: "Faster Revenue", d: "Speeds up revenue generation on inbound shipments" },
      { i: "D", t: "Labor Efficiency", d: "Non-compliant orders take 2X the labor. Catch them early." },
    ],
  },
};

type Key = keyof typeof panels;
const keys = Object.keys(panels) as Key[];

export function Stakeholders() {
  const [tab, setTab] = useState<Key>("3pl");
  const panel = panels[tab];

  return (
    <section id="stakeholders" className="screen" style={{ ...container, padding: `${padY} 24px`, display: "flex", flexDirection: "column", gap: "clamp(20px, 4vh, 40px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={eyebrow}>04 / Who it&apos;s for</span>
          <h2 style={{ margin: 0, fontSize: h2Size, lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.04em" }}>Value for every stakeholder</h2>
        </div>
        <div role="tablist" aria-label="Stakeholder" style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: 4, borderRadius: 12, background: "var(--line)", ...mono, fontSize: 13 }}>
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
                style={{ minHeight: 44, padding: "0 18px", border: 0, borderRadius: 9, background: sel ? "#141414" : "transparent", color: sel ? "#FFFFFF" : "#141414", fontFamily: "inherit", fontSize: "inherit", cursor: "pointer" }}
              >
                {panels[key].label}
              </button>
            );
          })}
        </div>
      </div>

      <div id="stakeholder-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="grid gap-10 min-[900px]:grid-cols-2 min-[900px]:gap-12">
        {/* Stretches to the height of the text column on desktop */}
        <div style={{ display: "flex", flexDirection: "column", padding: 20, borderRadius: 24, background: "var(--line)" }}>
          <span key={tab} className="fade-up" style={{ display: "block", marginBottom: 14, ...mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>
            {panel.shot.label}
          </span>
          {/* All three stay mounted so they load up front and crossfade without a flash */}
          <div className="aspect-[16/10] min-[900px]:aspect-auto min-[900px]:flex-1" style={{ position: "relative", borderRadius: 12, border: "1px solid var(--grid)", overflow: "hidden", background: "#FFFFFF", boxShadow: "0 20px 50px rgba(20,20,20,0.10)" }}>
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
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: active ? 1 : 0, transform: active ? "none" : "translateY(8px)" }}
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
          <div className="grid gap-3 min-[900px]:grid-cols-2">
            {panel.cards.map((k) => (
              <div key={k.t} style={{ display: "flex", flexDirection: "column", gap: "clamp(6px, 1.2vh, 28px)", padding: "clamp(14px, 2.2vh, 20px)", borderRadius: 18, background: "#FFFFFF", border: "1px solid var(--border)" }}>
                <span style={{ ...mono, fontSize: 12, color: "var(--muted)" }}>{k.i}</span>
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
