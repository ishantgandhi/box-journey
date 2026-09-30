type Props = { value: string; label: string; size: number; min: number; gap?: number };

export function Stat({ value, label, size, min, gap = 12 }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, paddingTop: 20, borderTop: "1px solid #141414" }}>
      <span style={{ fontSize: `clamp(${min}px, 10vw, ${size}px)`, lineHeight: 1, fontWeight: 500, letterSpacing: "-0.055em" }}>{value}</span>
      <span style={{ fontSize: 15, lineHeight: 1.5, color: "var(--body)" }}>{label}</span>
    </div>
  );
}
