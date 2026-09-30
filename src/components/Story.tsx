import { Stat } from "@/components/Stat";
import { container, eyebrow, mono } from "@/lib/styles";

const founders = [
  { name: "Sarah Hamer", role: "Co-founder & COO" },
  { name: "Elle Smyth", role: "Co-founder & CEO" },
];

export function Story() {
  return (
    <section id="story" style={{ ...container, padding: "48px 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(460px, 100%), 1fr))", gap: "48px 64px", padding: "clamp(24px, 5vw, 48px)", borderRadius: 24, background: "#FFFFFF", border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <span style={eyebrow}>05 / Our story</span>
          <p style={{ margin: 0, fontSize: "clamp(22px, 3.4vw, 30px)", lineHeight: 1.28, letterSpacing: "-0.025em", textWrap: "pretty" }}>
            Before YC, we worked at Stord, a supply chain unicorn, keeping their warehouse shipping facility running efficiently. We realized operations still largely relied on paper to pack an order correctly.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
            {founders.map((f) => (
              <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 18, fontWeight: 500 }}>{f.name}</span>
                <span style={{ ...mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>{f.role}</span>
                <a href="#" style={{ fontSize: 14, textUnderlineOffset: 4 }}>LinkedIn</a>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 28 }}>
          <Stat value="100+" label="pages in the manuals workers are supposed to reference on every order" size={64} min={48} gap={10} />
          <Stat value="p. 227" label="of Walmart's 399-page guide is where one of its label rules lives. Nobody checks that on every order." size={64} min={48} gap={10} />
        </div>
      </div>
    </section>
  );
}
