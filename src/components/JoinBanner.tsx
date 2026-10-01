"use client";

import { IsoBoxField } from "@/components/IsoBoxField";
import { Reveal } from "@/lib/motion";
import { CAL_URL, container, eyebrow, mono } from "@/lib/styles";

export function JoinBanner() {
  return (
    <section style={{ ...container, padding: "48px 24px 96px" }}>
      <IsoBoxField style={{ minHeight: 400, borderRadius: 28 }}>
        <div style={{ position: "relative", minHeight: 400, boxSizing: "border-box", maxWidth: 640, padding: "clamp(28px, 6vw, 56px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18, pointerEvents: "none" }}>
          <Reveal style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span style={{ ...eyebrow, color: "var(--dark-muted)" }}>06 / Get started</span>
            <h2 style={{ margin: 0, fontSize: "clamp(34px, 6vw, 50px)", lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.04em" }}>Join the future of retail compliance</h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#BDB9B2", textWrap: "pretty" }}>
              Many warehouses have already transformed their operations with RetailReady. Experience how our platform can revolutionize your supply chain compliance.
            </p>
          </Reveal>
          <a href={CAL_URL} className="btn" style={{ alignSelf: "flex-start", pointerEvents: "auto", display: "inline-flex", alignItems: "center", minHeight: 48, padding: "0 22px", borderRadius: 10, background: "var(--background)", color: "#141414", ...mono, fontSize: 14, textDecoration: "none" }}>
            Get Started – Demo &amp; Pricing
          </a>
        </div>
        <span className="max-sm:hidden" style={{ position: "absolute", right: 24, bottom: 20, ...mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8F8B84", pointerEvents: "none" }}>
          Move your cursor
        </span>
      </IsoBoxField>
    </section>
  );
}
