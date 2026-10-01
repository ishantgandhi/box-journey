import type { CSSProperties } from "react";

export const CAL_URL = "https://cal.com/team/retailready/retailready-intro-meeting";
export const CAREERS_URL = "https://www.ycombinator.com/companies/retailready/jobs";

export const mono: CSSProperties = { fontFamily: "var(--font-mono)" };

export const eyebrow: CSSProperties = {
  ...mono,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--muted)",
};

export const container: CSSProperties = {
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
  boxSizing: "border-box",
};

export const gridBg = (inner: number, outer: number): CSSProperties => ({
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
  maskImage: `radial-gradient(ellipse at center, #000000 ${inner}%, transparent ${outer}%)`,
  WebkitMaskImage: `radial-gradient(ellipse at center, #000000 ${inner}%, transparent ${outer}%)`,
});

// Vertical rhythm and type that scale with viewport height as well as width
export const padY = "clamp(32px, 6vh, 112px)";
export const h2Size = "clamp(30px, min(4vw, 6.5vh), 56px)";
export const statSize = "clamp(40px, min(5vw, 9vh), 76px)";
