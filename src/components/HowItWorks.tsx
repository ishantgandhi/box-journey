import { BoxIllustration } from "@/components/illustrations/BoxIllustration";
import { container, eyebrow, gridBg, h2Size, mono, padY } from "@/lib/styles";

const ACTIVE_STEP = 2;

const steps = [
  ["Smart Order Processing", "Start your fulfillment journey with our intuitive mobile interface. Directed packout workflows ensure accuracy from the first step."],
  ["Proactive Compliance Checks", "Prevent costly mistakes before they happen. Our system automatically validates retailer requirements, ensuring every SKU meets compliance standards before shipping."],
  ["Guided Packaging Process", "Follow clear, step-by-step instructions for proper labeling and packaging. Our system ensures every box is correctly labeled and ready for shipment."],
  ["Verified Success", "Celebrate each perfectly packed order! Our system confirms successful completion, giving you confidence that every shipment meets the highest standards."],
  ["Comprehensive Compliance Reports", "Track your success with detailed compliance reports for every order. Get actionable insights and proof of compliance for your retail partners."],
];

const tasks: { label: string; state: "done" | "current" | "todo" }[] = [
  { label: "Count units", state: "done" },
  { label: "Check SKU rules", state: "done" },
  { label: "Label and scan", state: "current" },
  { label: "Photo of carton", state: "todo" },
];

const dot = { width: 18, height: 18, flexShrink: 0, boxSizing: "border-box", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center" } as const;

function TaskIcon({ state }: { state: "done" | "current" | "todo" }) {
  if (state === "done")
    return (
      <span style={{ ...dot, background: "#141414" }}>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  if (state === "current")
    return (
      <span style={{ ...dot, border: "2px solid #141414" }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "#141414" }} />
      </span>
    );
  return <span style={{ ...dot, border: "1.5px solid #CFCBC4" }} />;
}

export function HowItWorks() {
  return (
    <section id="how" className="screen" style={{ background: "#FFFFFF", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
      <div style={{ ...container, padding: `${padY} 24px`, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(460px, 100%), 1fr))", gap: "clamp(32px, 6vh, 64px) 64px", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 3.6vh, 36px)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 2vh, 16px)" }}>
            <span style={eyebrow}>03 / How it works</span>
            <h2 style={{ margin: 0, fontSize: h2Size, lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.04em", textWrap: "balance" }}>Follow one box through the warehouse.</h2>
          </div>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
            {steps.map(([title, desc], i) => {
              const active = i === ACTIVE_STEP;
              const muted = active ? undefined : "var(--muted)";
              return (
                <li
                  key={title}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px minmax(0, 1fr)",
                    gap: 8,
                    padding: "clamp(10px, 2vh, 22px) 0",
                    borderTop: `1px solid ${active ? "#141414" : "var(--line)"}`,
                    borderBottom: i === steps.length - 1 ? "1px solid var(--line)" : undefined,
                  }}
                >
                  <span style={{ ...mono, fontSize: 13, color: muted, paddingTop: 4 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "clamp(2px, 0.8vh, 6px)" }}>
                    <span style={{ fontSize: "clamp(17px, 2.8vh, 21px)", fontWeight: 500, letterSpacing: "-0.02em", color: muted }}>{title}</span>
                    <span className={active ? undefined : "step-desc-inactive"} style={{ fontSize: "clamp(14px, 2.2vh, 15px)", lineHeight: 1.5, color: muted ?? "#3D3A36" }}>{desc}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex-col sm:flex-row" style={{ position: "relative", minHeight: "min(620px, 70vh)", maxHeight: "70vh", borderRadius: 24, background: "var(--background)", border: "1px solid var(--line)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(16px, 4vh, 36px)", padding: "clamp(16px, 3vh, 32px)", boxSizing: "border-box" }}>
          <div aria-hidden="true" style={gridBg(20, 75)} />
          <BoxIllustration width={200} height={180} placed label="Cardboard box with its label applied" />
          <div style={{ position: "relative", width: 250, boxSizing: "border-box", padding: 12, border: "1.5px solid #141414", borderRadius: 26, background: "#FFFFFF" }}>
            <div style={{ boxSizing: "border-box", padding: 18, border: "1px solid var(--line)", borderRadius: 16, display: "flex", flexDirection: "column", gap: 14 }}>
              <span style={{ ...mono, fontSize: 11, color: "var(--muted)" }}>Current order</span>
              <span style={{ fontSize: 20, lineHeight: 1.15, fontWeight: 500, letterSpacing: "-0.02em" }}>Apply the carton label</span>
              <div style={{ height: 4, borderRadius: 2, background: "var(--line)", overflow: "hidden" }}>
                <div style={{ width: "60%", height: "100%", background: "#141414" }} />
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
                {tasks.map((t) => (
                  <li key={t.label} style={{ display: "flex", alignItems: "center", gap: 10, color: t.state === "current" ? undefined : "var(--muted)", fontWeight: t.state === "current" ? 500 : undefined }}>
                    <TaskIcon state={t.state} />
                    <span>{t.label}</span>
                  </li>
                ))}
              </ul>
              <button type="button" style={{ minHeight: 44, border: 0, borderRadius: 10, background: "#141414", color: "#FFFFFF", ...mono, fontSize: 13 }}>Scan label</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
