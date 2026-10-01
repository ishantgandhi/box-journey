import type { CSSProperties } from "react";
import { BrandStrip } from "@/components/BrandStrip";
import { FlowsLink } from "@/components/FlowsLink";
import { BoxIllustration } from "@/components/illustrations/BoxIllustration";
import { Logo } from "@/components/illustrations/Logo";
import { TOTAL_FLOWS } from "@/data/retailers";
import { CAL_URL, container, mono, padY } from "@/lib/styles";
const button: CSSProperties = { display: "inline-flex", alignItems: "center", minHeight: 48, padding: "0 22px", borderRadius: 10, textDecoration: "none" };

export function Hero() {
  return (
    <section className="screen">
      <div style={{ ...container, flex: 1, display: "flex", alignItems: "center", padding: `${padY} 24px 0` }}>
        <div className="grid w-full items-center gap-3 sm:gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <FlowsLink className="pill-link" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "5px 5px 5px 14px", border: "1px solid #E2DED8", borderRadius: 12, background: "transparent", ...mono, fontSize: 12, textDecoration: "none" }}>
              <span>{TOTAL_FLOWS} retail flows built</span>
              <span style={{ padding: "5px 10px", borderRadius: 8, background: "#141414", color: "#FFFFFF" }}>See them</span>
            </FlowsLink>
            <h1 style={{ margin: "clamp(24px, 4.4vh, 38px) 0 0", fontSize: "clamp(36px, min(5vw, 8vh), 72px)", lineHeight: 1.1, fontWeight: 600, letterSpacing: "-0.05em", textWrap: "balance" }}>
              <span className="hero-mark"><Logo size={48} stroke="#141414" />RetailReady</span> is the future of supply chain compliance.
            </h1>
            <p style={{ margin: "clamp(12px, 2.4vh, 20px) 0 0", maxWidth: 620, fontSize: "clamp(17px, min(2vw, 3.4vh), 30px)", lineHeight: 1.22, letterSpacing: "-0.03em", color: "#858179", textWrap: "balance" }}>
              Meet the system enabling brands and 3PLs to achieve zero chargebacks while helping retailers process inbound shipments faster.
            </p>
            <div className="justify-center lg:justify-start" style={{ marginTop: "clamp(20px, 4.4vh, 36px)", display: "flex", flexWrap: "wrap", gap: 8, ...mono, fontSize: 14 }}>
              <a href={CAL_URL} className="btn" style={{ ...button, background: "#141414", color: "#FFFFFF" }}>Try our platform</a>
              <span style={{ ...button, gap: 10, color: "var(--muted)" }}>
                Backed by
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "#F26522", fontFamily: "var(--font-body)", fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                    <rect width="22" height="22" fill="#F26522" />
                    <path d="M6.5 5.5 11 12.2 15.5 5.5M11 12.2V17" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
                  </svg>
                  Y Combinator
                </span>
              </span>
            </div>
          </div>

          <BoxIllustration />
        </div>
      </div>
      <BrandStrip />
    </section>
  );
}
