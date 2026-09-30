"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { RETAILERS, TOTAL_FLOWS } from "@/data/retailers";
import { matchRetailer } from "@/lib/matchRetailer";
import { CAL_URL, container, eyebrow, h2Size, mono, padY } from "@/lib/styles";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const EXIT_MS = 200;

const darkEyebrow: CSSProperties = { ...eyebrow, color: "var(--dark-muted)" };
const tile: CSSProperties = { display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "clamp(12px, 3vh, 44px)", minHeight: "clamp(96px, 14vh, 150px)", boxSizing: "border-box", padding: "clamp(14px, 2.4vh, 20px)", borderRadius: 16, textDecoration: "none" };
const tileTitle: CSSProperties = { fontSize: "clamp(19px, 3vh, 23px)", fontWeight: 500, letterSpacing: "-0.02em" };
const tileFoot: CSSProperties = { ...mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" };
const dashedTile: CSSProperties = { ...tile, border: "1px dashed #4A4A47", color: "var(--background)" };

function Highlighted({ name, range }: { name: string; range: [number, number] | null }) {
  if (!range) return name;
  const [a, b] = range;
  return (
    <>
      {name.slice(0, a)}
      <mark style={{ background: "rgba(246,244,241,0.14)", color: "inherit", borderRadius: 4, padding: "0 1px" }}>{name.slice(a, b)}</mark>
      {name.slice(b)}
    </>
  );
}

export function RetailFlows() {
  const reduced = usePrefersReducedMotion();
  const [query, setQuery] = useState("");
  // Cards that just stopped matching; kept mounted for EXIT_MS so they can fade out
  const [leaving, setLeaving] = useState<string[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const searching = query.trim() !== "";
  const matchesFor = (q: string) =>
    (q.trim() ? RETAILERS.filter((r) => matchRetailer(r.name, q)) : RETAILERS.filter((r) => r.featured)).map((r) => r.name);
  const matches = matchesFor(query);

  function update(next: string) {
    const nextMatches = matchesFor(next);
    const gone = matches.filter((n) => !nextMatches.includes(n));
    setQuery(next);
    if (reduced || gone.length === 0) return;
    setLeaving((l) => [...l, ...gone]);
    timers.current.push(setTimeout(() => setLeaving((l) => l.filter((n) => !gone.includes(n))), EXIT_MS));
  }

  const visible = RETAILERS.filter((r) => matches.includes(r.name) || leaving.includes(r.name));
  const noResults = searching && matches.length === 0;

  return (
    <section id="flows" className="screen" style={{ background: "var(--dark)", color: "var(--background)" }}>
      <div style={{ ...container, padding: `${padY} 24px`, display: "flex", flexDirection: "column", gap: "clamp(16px, 3vh, 44px)" }}>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:gap-16" style={{ alignItems: "end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 2vh, 16px)" }}>
            <span style={darkEyebrow}>01 / Retail flows</span>
            <h2 style={{ margin: 0, fontSize: h2Size, lineHeight: 1.02, fontWeight: 500, letterSpacing: "-0.045em" }}>Compliant shipping made easy</h2>
            <p style={{ margin: 0, fontSize: "clamp(16px, 2.6vh, 19px)", lineHeight: 1.5, color: "var(--dark-muted)", textWrap: "pretty" }}>
              Check out the retail flows we&apos;ve built to ensure compliant and efficient shipping.
            </p>
            <form role="search" onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 560, marginTop: "clamp(0px, 1vh, 12px)" }}>
              <label htmlFor="rr-search" style={darkEyebrow}>Find your retailer</label>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ position: "relative", flexGrow: 1, minWidth: 0, display: "flex" }}>
                  <input
                    id="rr-search"
                    type="text"
                    autoComplete="off"
                    placeholder={`Search ${TOTAL_FLOWS} retailers`}
                    value={query}
                    onChange={(e) => update(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && update("")}
                    style={{ flexGrow: 1, minWidth: 0, minHeight: 48, boxSizing: "border-box", padding: query ? "0 48px 0 16px" : "0 16px", border: "1px solid #3A3A38", borderRadius: 10, background: "#1F1F1E", color: "var(--background)", fontFamily: "inherit", fontSize: 16 }}
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => {
                        update("");
                        document.getElementById("rr-search")?.focus();
                      }}
                      className="text-[#A8A49D] hover:text-[#F6F4F1]"
                      style={{ position: "absolute", right: 4, top: 4, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", border: 0, borderRadius: 8, background: "none", cursor: "pointer" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  )}
                </div>
                <button type="submit" style={{ minHeight: 48, padding: "0 20px", border: 0, borderRadius: 10, background: "var(--background)", color: "#141414", ...mono, fontSize: 14, cursor: "pointer" }}>Search</button>
              </div>
              <span aria-live="polite" style={{ ...mono, fontSize: 12, color: "var(--dark-muted)" }}>
                {searching ? `${matches.length} ${matches.length === 1 ? "match" : "matches"}` : "Showing featured flows"}
              </span>
            </form>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right", gap: 4 }}>
            <span style={{ fontSize: "clamp(80px, min(10vw, 17vh), 148px)", lineHeight: 0.9, fontWeight: 500, letterSpacing: "-0.06em" }}>{TOTAL_FLOWS}</span>
            <span style={darkEyebrow}>Retail flows and counting</span>
          </div>
        </div>


        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-3 lg:grid-cols-4">
          {visible.map(({ name }) => {
            const out = !matches.includes(name);
            return (
              <a
                key={name}
                href="#"
                aria-hidden={out || undefined}
                tabIndex={out ? -1 : undefined}
                className={out ? "card-out" : "card-in"}
                style={{ ...tile, border: "1px solid #2E2E2C", background: "#1F1F1E", color: "var(--background)" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <span style={tileTitle}>
                    <Highlighted name={name} range={searching ? matchRetailer(name, query) : null} />
                  </span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M5 13L13 5M6.5 5H13v6.5" stroke="#A8A49D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ ...tileFoot, display: "flex", alignItems: "center", gap: 8, color: "var(--dark-muted)" }}>
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: "#5FD08A" }} />
                  Flow live
                </span>
              </a>
            );
          })}
          {noResults && visible.length === 0 && (
            <div className="card-in" style={{ ...dashedTile, gridColumn: "1 / -1", gap: 24, minHeight: 0 }}>
              <span style={{ ...tileTitle, textWrap: "pretty" }}>
                No featured flow for &ldquo;{query.trim()}&rdquo; yet. We may already cover them, ask us about it.
              </span>
              <a href={CAL_URL} style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 18px", borderRadius: 10, background: "var(--background)", color: "#141414", ...mono, fontSize: 13, textDecoration: "none" }}>
                Try our platform
              </a>
            </div>
          )}
          <a href="#" style={{ ...tile, background: "var(--background)", color: "#141414" }}>
            <span style={tileTitle}>More retailers</span>
            <span style={tileFoot}>Show all flows ({TOTAL_FLOWS})</span>
          </a>
          {!noResults && (
            <a href="#" style={dashedTile}>
              <span style={tileTitle}>Don&apos;t see yours?</span>
              <span style={{ ...tileFoot, color: "var(--dark-muted)" }}>Ask us about it</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
