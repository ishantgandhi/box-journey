"use client";

import { useEffect, useRef, useState } from "react";
import { Stat } from "@/components/Stat";
import { container, eyebrow, h2Size, mono, padY, statSize } from "@/lib/styles";

const problems = [
  ["$40B", "lost to retail chargebacks every year"],
  ["3%", "of a brand's gross invoice, on average"],
  ["10–12%", "of inbound orders get flagged non-compliant"],
  ["2x", "the labor to process each of those orders"],
];

const without = ["100+ page routing guides on the floor", "Weeks of training per retailer", "Mistakes found after the truck leaves", "Chargebacks off your invoice"];
const withRR = ["Step-by-step tasks on a tablet", "No training time or integrations", "Rules checked as the box is packed", "Live across your network in days, not months"];

const features = [
  ["Lightning Fast Setup", "Deploy across your warehouse network in days, not months. Immediate impact on operations."],
  ["Real-time Updates", "Stay ahead with instant notifications about compliance changes and requirements."],
  ["Mobile First", "Intuitive mobile interface designed for warehouse operations and on-the-go management."],
  ["Automated Workflows", "Streamline operations with AI-powered task management and compliance checks."],
];

const grid = (min: number) => ({ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))` });

const colHead = { ...mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" } as const;
const row = { display: "flex", gap: 12, padding: "clamp(12px, 2vh, 18px) 0", borderTop: "1px solid var(--line)", fontSize: "clamp(15px, 2.2vh, 18px)", lineHeight: 1.5 } as const;
// Centers a 16px icon on the first line of text
const icon = { flexShrink: 0, marginTop: "calc((1.5em - 16px) / 2)" };

export function Challenge() {
  // Right-column rows animate in once, the first time the comparison scrolls into view
  const withCol = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.3 });
    io.observe(withCol.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section id="challenge" style={{ scrollMarginTop: 64 }}>
      <div style={{ ...container, padding: `${padY} 24px`, display: "flex", flexDirection: "column", gap: "clamp(24px, 6vh, 56px)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 2vh, 16px)" }}>
          <span style={eyebrow}>02 / The challenge</span>
          <h2 style={{ margin: 0, fontSize: h2Size, lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.04em", textWrap: "balance" }}>The Challenge of Retail Compliance</h2>
        </div>
        <div style={{ ...grid(240), gap: 32 }}>
          {problems.map(([v, l]) => <Stat key={l} value={v} label={l} size={statSize} />)}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 4.4vh, 40px)", padding: "clamp(24px, 4vh, 40px)", borderRadius: 24, background: "#FFFFFF", border: "1px solid var(--border)" }}>
          <span style={eyebrow}>How RetailReady solves it</span>
          <div className="grid md:grid-cols-2">
            <div className="pb-6 md:pr-8 md:pb-0">
              <span style={{ ...colHead, color: "var(--muted)" }}>Without RetailReady</span>
              <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0 }}>
                {without.map((t) => (
                  <li key={t} style={{ ...row, color: "var(--muted)" }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={icon}>
                      <circle cx="8" cy="8" r="6.5" stroke="#B5B0A8" />
                      <path d="M3.5 12.5l9-9" stroke="#B5B0A8" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div ref={withCol} className="border-t border-[#E6E2DC] pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
              <span style={{ ...colHead, color: "#141414" }}>With RetailReady</span>
              <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0 }}>
                {withRR.map((t, i) => (
                  <li
                    key={t}
                    className="transition-[opacity,transform] duration-500 ease-out motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:transition-none"
                    style={{ ...row, color: "#141414", fontWeight: 500, opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(8px)", transitionDelay: `${i * 60}ms` }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={icon}>
                      <path d="M3 8.5l3 3 7-7" stroke="#141414" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ ...grid(220), gap: "clamp(20px, 4vh, 32px) 32px", paddingTop: "clamp(18px, 3.4vh, 32px)", borderTop: "1px solid var(--line)" }}>
            {features.map(([t, d], i) => (
              <div key={t} style={{ display: "flex", flexDirection: "column", gap: "clamp(6px, 1.2vh, 10px)" }}>
                <span style={{ ...mono, fontSize: 12, color: "var(--muted)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em" }}>{t}</span>
                <span style={{ fontSize: 15, lineHeight: 1.55, color: "var(--body)" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
