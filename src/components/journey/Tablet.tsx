import { Fragment, type ReactNode } from "react";
import { RULES } from "@/components/journey/RuleTags";
import { mono } from "@/lib/styles";

const GREEN = "#1F8A4C";

function CheckIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Empty ring that fills in (after `delay` ms) when `on` */
function Tick({ on, delay }: { on: boolean; delay: number }) {
  return (
    <span style={{ position: "relative", width: 18, height: 18, flexShrink: 0 }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: 999, border: "1.5px solid #CFCBC4" }} />
      <span
        className="transition-[opacity,transform] duration-200 ease-out"
        style={{ position: "absolute", inset: 0, borderRadius: 999, background: "#141414", display: "flex", alignItems: "center", justifyContent: "center", opacity: on ? 1 : 0, transform: on ? "none" : "scale(0.4)", transitionDelay: on ? `${delay}ms` : "0ms" }}
      >
        <CheckIcon />
      </span>
    </span>
  );
}

const caption = { ...mono, fontSize: 11, color: "var(--muted)" } as const;
const title = { fontSize: 20, lineHeight: 1.15, fontWeight: 500, letterSpacing: "-0.02em" } as const;
const list = { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 14 } as const;

const ORDER_ITEMS = [
  { sku: "21850891", upc: "5060568341163", qty: 12 },
  { sku: "21850919", upc: "5060568341170", qty: 6 },
  { sku: "23379551", upc: "5060568342320", qty: 6 },
];

function Progress({ value }: { value: number }) {
  return (
    <div style={{ height: 4, borderRadius: 2, background: "var(--line)", overflow: "hidden" }}>
      <div style={{ width: `${value}%`, height: "100%", background: "#141414" }} />
    </div>
  );
}

function screens(step: number): ReactNode[] {
  const tickDelay = (i: number) => 350 + i * 350;
  return [
    <Fragment key="order">
      <span style={caption}>Order DSG-2831</span>
      <span style={title}>New order</span>
      <ul style={list}>
        {ORDER_ITEMS.map((item, i) => (
          <li key={item.sku} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Tick on={step === 0} delay={tickDelay(i)} />
            <span style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
              <span style={{ ...mono, fontSize: 12 }}>{item.sku}</span>
              <span style={{ ...mono, fontSize: 10, color: "var(--muted)" }}>{item.upc}</span>
            </span>
            <span style={{ ...mono, fontSize: 12 }}>×{item.qty}</span>
          </li>
        ))}
      </ul>
    </Fragment>,
    <Fragment key="rules">
      <span style={caption}>Dick&apos;s Sporting Goods</span>
      <span style={title}>Checking retailer rules</span>
      <ul style={list}>
        {RULES.map((rule, i) => (
          <li key={rule} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Tick on={step === 1} delay={tickDelay(i)} />
            {rule}
          </li>
        ))}
      </ul>
    </Fragment>,
    <Fragment key="label">
      <span style={caption}>Current order</span>
      <span style={title}>Apply the carton label</span>
      <Progress value={60} />
      <ul style={{ ...list, gap: 10 }}>
        {["Count units", "Check SKU rules"].map((t) => (
          <li key={t} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)" }}>
            <span style={{ width: 18, height: 18, borderRadius: 999, background: "#141414", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckIcon />
            </span>
            {t}
          </li>
        ))}
        <li style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 500 }}>
          <span style={{ width: 18, height: 18, boxSizing: "border-box", borderRadius: 999, border: "2px solid #141414", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "#141414" }} />
          </span>
          Label and scan
        </li>
        <li style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--muted)" }}>
          <span style={{ width: 18, height: 18, boxSizing: "border-box", borderRadius: 999, border: "1.5px solid #CFCBC4" }} />
          Photo of carton
        </li>
      </ul>
      <span style={{ marginTop: "auto", minHeight: 40, borderRadius: 10, background: "#141414", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", ...mono, fontSize: 13 }}>Scan label</span>
    </Fragment>,
    <div key="verified" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center" }}>
      <span style={{ width: 72, height: 72, borderRadius: 999, background: GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CheckIcon size={34} />
      </span>
      <span style={title}>Order verified</span>
      <span style={caption}>DSG-2831 · photo saved</span>
    </div>,
    <Fragment key="report">
      <span style={caption}>Order DSG-2831</span>
      <span style={title}>Compliance report</span>
      <ul style={{ ...list, gap: 0 }}>
        {[...RULES, "Photos"].map((row) => (
          <li key={row} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderTop: "1px solid var(--line)" }}>
            {row}
            <span style={{ padding: "2px 8px", borderRadius: 999, background: "#E3F4EA", color: GREEN, ...mono, fontSize: 11 }}>Passed</span>
          </li>
        ))}
      </ul>
    </Fragment>,
  ];
}

/** Warehouse tablet whose screen crossfades between one state per step */
export function Tablet({ step }: { step: number }) {
  const current = Math.max(step, 0);
  // Scaled down on small screens with a transform (not CSS zoom, which Safari applies unevenly to inline SVGs);
  // the wrapper reserves the scaled size: 250x317 at 0.62
  return (
    <div className="max-lg:h-[197px] max-lg:w-[155px]" style={{ flexShrink: 0 }}>
    <div className="max-lg:origin-top-left max-lg:scale-[0.62]" style={{ position: "relative", width: 250, boxSizing: "border-box", padding: 12, border: "1.5px solid #141414", borderRadius: 26, background: "#FFFFFF" }}>
      <div style={{ position: "relative", height: 290, border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
        {screens(step).map((content, i) => (
          <div
            key={i}
            aria-hidden={i !== current}
            className="transition-[opacity,transform] duration-[400ms] ease-out motion-reduce:transition-opacity motion-reduce:duration-200"
            style={{ position: "absolute", inset: 0, padding: 18, display: "flex", flexDirection: "column", gap: 14, background: "#FFFFFF", opacity: i === current ? 1 : 0, transform: i === current ? "none" : "translateY(8px)" }}
          >
            {content}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
