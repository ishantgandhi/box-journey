import type { CSSProperties } from "react";
import { BoxIllustration } from "@/components/illustrations/BoxIllustration";
import { CAL_URL, container, gridBg, mono } from "@/lib/styles";

const cardLabel: CSSProperties = { ...mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" };
const card: CSSProperties = {
  position: "absolute",
  flexDirection: "column",
  border: "1px solid var(--border)",
  borderRadius: 14,
  background: "#FFFFFF",
  textAlign: "left",
  boxShadow: "0 14px 30px rgba(20,20,20,0.06)",
};
const button: CSSProperties = { display: "inline-flex", alignItems: "center", minHeight: 48, padding: "0 22px", borderRadius: 10, textDecoration: "none" };

export function Hero() {
  return (
    <section style={{ ...container, padding: "72px 24px 0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <a href="#flows" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "5px 5px 5px 14px", border: "1px solid #E2DED8", borderRadius: 999, background: "#FFFFFF", ...mono, fontSize: 12, textDecoration: "none" }}>
        <span>139 retail flows built</span>
        <span style={{ padding: "5px 10px", borderRadius: 999, background: "#141414", color: "#FFFFFF" }}>See them</span>
      </a>
      <h1 style={{ margin: "28px 0 0", maxWidth: 1040, fontSize: "clamp(40px, 8vw, 72px)", lineHeight: 1.02, fontWeight: 600, letterSpacing: "-0.05em", textWrap: "balance" }}>
        RetailReady is the future of supply chain compliance.
      </h1>
      <p style={{ margin: "20px 0 0", maxWidth: 880, fontSize: "clamp(20px, 3.4vw, 30px)", lineHeight: 1.22, letterSpacing: "-0.03em", color: "#858179", textWrap: "balance" }}>
        Meet the system enabling brands and 3PLs to achieve zero chargebacks while helping retailers process inbound shipments faster.
      </p>
      <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, ...mono, fontSize: 14 }}>
        <a href={CAL_URL} style={{ ...button, background: "#141414", color: "#FFFFFF" }}>Try our platform</a>
        <a href="#flows" style={{ ...button, border: "1px solid #DCD8D1", background: "#FFFFFF", color: "#141414" }}>Show all flows (139)</a>
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: 900, height: 360, marginTop: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div aria-hidden="true" style={gridBg(25, 70)} />
        <div className="flex max-sm:hidden" style={{ ...card, left: 56, top: 64, transform: "rotate(-3deg)", gap: 6, padding: "16px 20px" }}>
          <span style={cardLabel}>Walmart&apos;s routing guide</span>
          <span style={{ fontSize: 26, fontWeight: 500, letterSpacing: "-0.03em" }}>399 pages</span>
          <span style={cardLabel}>Read for you</span>
        </div>
        <BoxIllustration width={280} height={252} label="A cardboard box with its shipping label about to be placed" />
        <div className="flex max-sm:hidden" style={{ ...card, right: 48, top: 150, transform: "rotate(2deg)", width: 210, boxSizing: "border-box", gap: 8, padding: "16px 18px" }}>
          <span style={cardLabel}>Current step</span>
          <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.02em" }}>Guided Packaging Process</span>
          <div style={{ height: 4, borderRadius: 2, background: "var(--line)", overflow: "hidden" }}>
            <div style={{ width: "60%", height: "100%", background: "#141414" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
