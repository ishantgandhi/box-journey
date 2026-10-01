import { Logo } from "@/components/illustrations/Logo";
import { CAREERS_URL, container, mono } from "@/lib/styles";

const links = [
  { label: "Privacy", href: "https://www.retailreadyai.com/privacy-policy" },
  { label: "Terms", href: "https://www.retailreadyai.com/terms-of-service" },
  { label: "Roundup", href: "/newsletter" },
  { label: "Careers", href: CAREERS_URL },
];
const meta = { ...mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" } as const;

export function Footer() {
  return (
    <footer style={{ ...container, padding: "0 24px 32px", display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, paddingTop: 24, borderTop: "1px solid var(--grid)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 28, fontSize: 15 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, letterSpacing: "-0.02em", textDecoration: "none" }}>
            <Logo size={18} stroke="#141414" />
            <span>RetailReady</span>
          </a>
          {links.map((l) => (
            <a key={l.label} href={l.href} {...(l.href.startsWith("http") && { target: "_blank", rel: "noreferrer" })} style={{ color: "var(--body)", textDecoration: "none" }}>{l.label}</a>
          ))}
        </div>
        <a href="https://www.linkedin.com/company/retailreadyai/" target="_blank" rel="noreferrer" aria-label="RetailReady on LinkedIn" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10, border: "1px solid var(--grid)" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="#141414" strokeWidth="1.3" />
            <path d="M5 7v4.5M5 4.8v.1M7.8 11.5V7m0 1.9c0-1.1.8-1.9 1.8-1.9s1.6.7 1.6 1.8v2.7" stroke="#141414" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </a>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px 32px", ...meta }}>
        <span>© 2026 RetailReady. All rights reserved.</span>
        <span>San Francisco</span>
      </div>
      <p style={{ margin: 0, ...meta, textTransform: "none", letterSpacing: 0, fontSize: 11 }}>Unofficial concept redesign by Ishant Gandhi.</p>
    </footer>
  );
}
