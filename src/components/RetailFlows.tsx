import type { CSSProperties } from "react";
import { container, eyebrow, mono } from "@/lib/styles";

const retailers = ["CVS", "Chewy", "Dick's Sporting Goods", "Dillard's", "H-E-B", "JCPenney"];

const darkEyebrow: CSSProperties = { ...eyebrow, color: "var(--dark-muted)" };
const tile: CSSProperties = { display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 44, minHeight: 150, boxSizing: "border-box", padding: 20, borderRadius: 16, textDecoration: "none" };
const tileTitle: CSSProperties = { fontSize: 23, fontWeight: 500, letterSpacing: "-0.02em" };
const tileFoot: CSSProperties = { ...mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" };

export function RetailFlows() {
  return (
    <section id="flows" style={{ background: "var(--dark)", color: "var(--background)" }}>
      <div style={{ ...container, padding: "112px 24px", display: "flex", flexDirection: "column", gap: 44 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))", gap: "32px 64px", alignItems: "end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={darkEyebrow}>01 / Retail flows</span>
            <h2 style={{ margin: 0, fontSize: "clamp(40px, 7vw, 60px)", lineHeight: 1.02, fontWeight: 500, letterSpacing: "-0.045em" }}>Compliant shipping made easy</h2>
            <p style={{ margin: 0, maxWidth: 480, fontSize: 19, lineHeight: 1.55, color: "var(--dark-muted)", textWrap: "pretty" }}>
              Check out the retail flows we&apos;ve built to ensure compliant and efficient shipping.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right", gap: 4 }}>
            <span style={{ fontSize: "clamp(88px, 18vw, 148px)", lineHeight: 0.9, fontWeight: 500, letterSpacing: "-0.06em" }}>139</span>
            <span style={darkEyebrow}>Retail flows and counting</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 560 }}>
          <label htmlFor="rr-search" style={darkEyebrow}>Find your retailer</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input id="rr-search" type="text" placeholder="Search 139 retailers" style={{ flexGrow: 1, minWidth: 0, minHeight: 48, boxSizing: "border-box", padding: "0 16px", border: "1px solid #3A3A38", borderRadius: 10, background: "#1F1F1E", color: "var(--background)", fontFamily: "inherit", fontSize: 16 }} />
            <button type="button" style={{ minHeight: 48, padding: "0 20px", border: 0, borderRadius: 10, background: "var(--background)", color: "#141414", ...mono, fontSize: 14 }}>Search</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 12 }}>
          {retailers.map((name) => (
            <a key={name} href="#" style={{ ...tile, border: "1px solid #2E2E2C", background: "#1F1F1E", color: "var(--background)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <span style={tileTitle}>{name}</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M5 13L13 5M6.5 5H13v6.5" stroke="#A8A49D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ ...tileFoot, display: "flex", alignItems: "center", gap: 8, color: "var(--dark-muted)" }}>
                <span style={{ width: 7, height: 7, borderRadius: 999, background: "#5FD08A" }} />
                Flow live
              </span>
            </a>
          ))}
          <a href="#" style={{ ...tile, background: "var(--background)", color: "#141414" }}>
            <span style={tileTitle}>More retailers</span>
            <span style={tileFoot}>Show all flows (139)</span>
          </a>
          <a href="#" style={{ ...tile, border: "1px dashed #4A4A47", color: "var(--background)" }}>
            <span style={tileTitle}>Don&apos;t see yours?</span>
            <span style={{ ...tileFoot, color: "var(--dark-muted)" }}>Ask us about it</span>
          </a>
        </div>
      </div>
    </section>
  );
}
