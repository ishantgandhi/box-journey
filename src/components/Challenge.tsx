import { TOTAL_FLOWS } from "@/data/retailers";
import { Stat } from "@/components/Stat";
import { container, eyebrow, mono } from "@/lib/styles";

const problems = [
  ["$40B", "lost to retail chargebacks every year"],
  ["3%", "of a brand's gross invoice, on average"],
  ["10–12%", "of inbound orders get flagged non-compliant"],
  ["2x", "the labor to process each of those orders"],
];

const solutions = [
  [String(TOTAL_FLOWS), "retail flows built and kept current"],
  ["Days", "to deploy across your warehouse network, not months"],
  ["0", "hours of retailer training before packers start"],
  ["0", "integrations required to get started"],
];

const features = [
  ["Lightning Fast Setup", "Deploy across your warehouse network in days, not months. Immediate impact on operations."],
  ["Real-time Updates", "Stay ahead with instant notifications about compliance changes and requirements."],
  ["Mobile First", "Intuitive mobile interface designed for warehouse operations and on-the-go management."],
  ["Automated Workflows", "Streamline operations with AI-powered task management and compliance checks."],
];

const grid = (min: number) => ({ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))` });

export function Challenge() {
  return (
    <section id="challenge" style={{ ...container, padding: "112px 24px", display: "flex", flexDirection: "column", gap: 56 }}>
      <div style={{ ...grid(420), gap: "24px 64px", alignItems: "end" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={eyebrow}>02 / The challenge</span>
          <h2 style={{ margin: 0, fontSize: "clamp(36px, 6vw, 52px)", lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.04em", textWrap: "balance" }}>The Challenge of Retail Compliance</h2>
        </div>
        <p style={{ margin: 0, fontSize: 19, lineHeight: 1.55, color: "var(--body)", textWrap: "pretty" }}>
          Retailers have complex shipping requirements that lead to costly chargebacks. Here&apos;s how RetailReady solves this.
        </p>
      </div>

      <div style={{ ...grid(240), gap: 32 }}>
        {problems.map(([v, l]) => <Stat key={l} value={v} label={l} size={76} min={52} />)}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 40, padding: "clamp(24px, 5vw, 40px)", borderRadius: 24, background: "#FFFFFF", border: "1px solid var(--border)" }}>
        <span style={eyebrow}>How RetailReady solves it</span>
        <div style={{ ...grid(220), gap: 32 }}>
          {solutions.map(([v, l]) => <Stat key={l} value={v} label={l} size={72} min={52} />)}
        </div>
        <div style={{ ...grid(220), gap: 32, paddingTop: 32, borderTop: "1px solid var(--line)" }}>
          {features.map(([t, d], i) => (
            <div key={t} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ ...mono, fontSize: 12, color: "var(--muted)" }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em" }}>{t}</span>
              <span style={{ fontSize: 15, lineHeight: 1.55, color: "var(--body)" }}>{d}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
