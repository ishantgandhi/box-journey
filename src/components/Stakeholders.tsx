"use client";

import { useState } from "react";
import { container, eyebrow, mono } from "@/lib/styles";

const panels = {
  "3pl": {
    label: "For 3PLs",
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

export function Stakeholders() {
  const [tab, setTab] = useState<Key>("3pl");
  const panel = panels[tab];

  return (
    <section id="stakeholders" style={{ ...container, padding: "112px 24px 64px", display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={eyebrow}>04 / Who it&apos;s for</span>
          <h2 style={{ margin: 0, fontSize: "clamp(36px, 6vw, 52px)", lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.04em" }}>Value for every stakeholder</h2>
        </div>
        <div role="tablist" aria-label="Stakeholder" style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: 4, borderRadius: 12, background: "var(--line)", ...mono, fontSize: 13 }}>
          {(Object.keys(panels) as Key[]).map((key) => {
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

      <div id="stakeholder-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))", gap: "16px 64px", alignItems: "end" }}>
          <span style={{ fontSize: 30, lineHeight: 1.15, fontWeight: 500, letterSpacing: "-0.025em" }}>{panel.heading}</span>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "var(--body)", textWrap: "pretty" }}>{panel.blurb}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))", gap: 12 }}>
          {panel.cards.map((k) => (
            <div key={k.t} style={{ display: "flex", flexDirection: "column", gap: 40, padding: 24, borderRadius: 18, background: "#FFFFFF", border: "1px solid var(--border)" }}>
              <span style={{ ...mono, fontSize: 12, color: "var(--muted)" }}>{k.i}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em" }}>{k.t}</span>
                <span style={{ fontSize: 15, lineHeight: 1.55, color: "var(--body)" }}>{k.d}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
