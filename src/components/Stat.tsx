type Props = { value: string; label: string; size: string; gap?: number | string };

export function Stat({ value, label, size, gap = 12 }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, paddingTop: "clamp(12px, 2.4vh, 20px)", borderTop: "1px solid #141414" }}>
      <span style={{ fontSize: size, lineHeight: 1, fontWeight: 500, letterSpacing: "-0.055em" }}>{value}</span>
      <span style={{ fontSize: 15, lineHeight: 1.5, color: "var(--body)" }}>{label}</span>
    </div>
  );
}
