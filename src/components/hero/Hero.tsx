import type { CSSProperties } from "react";
import { BrandStrip } from "@/components/BrandStrip";
import { FlowsLink } from "@/components/FlowsLink";
import { BoxIllustration } from "@/components/illustrations/BoxIllustration";
import { TOTAL_FLOWS } from "@/data/retailers";
import { CAL_URL, container, gridBg, mono, padY } from "@/lib/styles";

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
    <section className="screen">
      <div style={{ ...container, flex: 1, display: "flex", alignItems: "center", padding: `${padY} 24px 0` }}>
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <FlowsLink style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "5px 5px 5px 14px", border: "1px solid #E2DED8", borderRadius: 999, background: "#FFFFFF", ...mono, fontSize: 12, textDecoration: "none" }}>
              <span>{TOTAL_FLOWS} retail flows built</span>
              <span style={{ padding: "5px 10px", borderRadius: 999, background: "#141414", color: "#FFFFFF" }}>See them</span>
            </FlowsLink>
            <h1 style={{ margin: "clamp(16px, 3.4vh, 28px) 0 0", fontSize: "clamp(36px, min(5vw, 8vh), 72px)", lineHeight: 1.02, fontWeight: 600, letterSpacing: "-0.05em", textWrap: "balance" }}>
              RetailReady is the future of supply chain compliance.
            </h1>
            <p style={{ margin: "clamp(12px, 2.4vh, 20px) 0 0", maxWidth: 620, fontSize: "clamp(17px, min(2vw, 3.4vh), 30px)", lineHeight: 1.22, letterSpacing: "-0.03em", color: "#858179", textWrap: "balance" }}>
              Meet the system enabling brands and 3PLs to achieve zero chargebacks while helping retailers process inbound shipments faster.
            </p>
            <div className="justify-center lg:justify-start" style={{ marginTop: "clamp(20px, 4.4vh, 36px)", display: "flex", flexWrap: "wrap", gap: 8, ...mono, fontSize: 14 }}>
              <a href={CAL_URL} style={{ ...button, background: "#141414", color: "#FFFFFF" }}>Try our platform</a>
              <span style={{ ...button, gap: 10, color: "var(--muted)" }}>
                Backed by
                <span aria-label="Y Combinator" role="img" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "#F26522", fontFamily: "var(--font-body)", fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                    <rect width="22" height="22" fill="#F26522" />
                    <path d="M6.5 5.5 11 12.2 15.5 5.5M11 12.2V17" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
                  </svg>
                  Combinator
                </span>
              </span>
            </div>
          </div>

          <div style={{ position: "relative", width: "100%", height: "clamp(260px, 50vh, 420px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div aria-hidden="true" style={gridBg(25, 70)} />
            <div className="flex max-sm:hidden" style={{ ...card, left: 0, top: "3%", transform: "rotate(-3deg)", gap: 6, padding: "14px 18px", zIndex: 1 }}>
              <span style={cardLabel}>Walmart&apos;s routing guide</span>
              <span style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.03em" }}>300+ pages</span>
              <span style={cardLabel}>Read for you</span>
            </div>
            <BoxIllustration width={280} height={252} style={{ width: "min(38vh, 320px, 80vw)", height: "auto" }} label="A cardboard box with its shipping label about to be placed" />
            <div className="flex max-sm:hidden" style={{ ...card, right: 0, bottom: "5%", transform: "rotate(2deg)", width: 200, boxSizing: "border-box", gap: 8, padding: "14px 16px", zIndex: 1 }}>
              <span style={cardLabel}>Current step</span>
              <span style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.02em" }}>Guided Packaging Process</span>
              <div style={{ height: 4, borderRadius: 2, background: "var(--line)", overflow: "hidden" }}>
                <div style={{ width: "60%", height: "100%", background: "#141414" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BrandStrip />
    </section>
  );
}
