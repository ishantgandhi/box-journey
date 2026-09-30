import { CAL_URL, container, eyebrow, mono } from "@/lib/styles";

export function JoinBanner() {
  return (
    <section style={{ ...container, padding: "48px 24px 96px" }}>
      <div style={{ position: "relative", minHeight: 400, borderRadius: 28, overflow: "hidden", background: "var(--dark)", color: "var(--background)" }}>
        <svg aria-hidden="true" width="1440" height="440" style={{ position: "absolute", left: 0, top: 0 }}>
          <defs>
            <pattern id="rr-iso" width="72" height="36" patternUnits="userSpaceOnUse">
              <path d="M0 18L36 0L72 18L36 36Z" stroke="#FFFFFF" strokeOpacity="0.11" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="1440" height="440" fill="url(#rr-iso)" />
        </svg>

        {/* TODO(hover): box layer goes here. Invisible 72x36 diamond cells over the grid;
            hovering one pops a small kraft box onto it, which fades out after ~0.9s. */}

        <div style={{ position: "relative", minHeight: 400, boxSizing: "border-box", maxWidth: 640, padding: "clamp(28px, 6vw, 56px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18, pointerEvents: "none" }}>
          <span style={{ ...eyebrow, color: "var(--dark-muted)" }}>06 / Get started</span>
          <h2 style={{ margin: 0, fontSize: "clamp(34px, 6vw, 50px)", lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.04em" }}>Join the future of retail compliance</h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#BDB9B2", textWrap: "pretty" }}>
            Many warehouses have already transformed their operations with RetailReady. Experience how our platform can revolutionize your supply chain compliance.
          </p>
          <a href={CAL_URL} style={{ alignSelf: "flex-start", pointerEvents: "auto", display: "inline-flex", alignItems: "center", minHeight: 48, padding: "0 22px", borderRadius: 10, background: "var(--background)", color: "#141414", ...mono, fontSize: 14, textDecoration: "none" }}>
            Get Started – Demo &amp; Pricing
          </a>
        </div>
        <span className="max-sm:hidden" style={{ position: "absolute", right: 24, bottom: 20, ...mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8F8B84", pointerEvents: "none" }}>
          Move your cursor
        </span>
      </div>
    </section>
  );
}
