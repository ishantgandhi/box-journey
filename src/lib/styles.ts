import type { CSSProperties } from "react";

export const CAL_URL = "https://cal.com/team/retailready/retailready-intro-meeting";
export const LOGIN_URL = "https://3pl.retailreadyai.com/login";

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
