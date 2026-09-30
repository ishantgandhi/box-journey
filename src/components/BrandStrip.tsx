import { container, eyebrow } from "@/lib/styles";

const brands = ["Brümate", "Natural Dog Company", "Ware2Go", "GoBolt", "Radial"];

export function BrandStrip() {
  return (
    <div style={{ ...container, margin: "48px auto 0", padding: "28px 24px 40px", borderTop: "1px solid var(--grid)", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
      <span style={eyebrow}>Trusted by brands and 3PLs</span>
      <div style={{ width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "16px 40px", fontSize: 23, fontWeight: 600, letterSpacing: "-0.03em", color: "#57534E" }}>
        {brands.map((b) => <span key={b}>{b}</span>)}
      </div>
    </div>
  );
}
