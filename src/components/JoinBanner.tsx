"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Box, KRAFT_TONES } from "@/components/illustrations/Box";
import { CAL_URL, container, eyebrow, mono } from "@/lib/styles";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const W = 72;
const H = 36;
const MAX_BOXES = 40;
const HOLD_MS = 900;
const FADE_MS = 450;


type HoverBox = { id: string; cellX: number; cellY: number; phase: "in" | "out" };

/**
 * Diamond centers sit at (k*72, m*36) and (k*72+36, m*36+18). In the skewed coords
 * u = x/72 + y/36, v = x/72 - y/36 every center lands on an integer point and each
 * diamond becomes the unit square around it, so rounding finds the cell.
 */
function cellAt(x: number, y: number) {
  const u = Math.round(x / W + y / H);
  const v = Math.round(x / W - y / H);
  const cx = (u + v) * (W / 2);
  const cy = (u - v) * (H / 2);
  return { id: `${u},${v}`, cellX: cx - W / 2, cellY: cy - H / 2 };
}

function toneFor(box: HoverBox) {
  const n = Math.round(box.cellX / (W / 2)) * 7 + Math.round(box.cellY / (H / 2)) * 13;
  return KRAFT_TONES[((n % 3) + 3) % 3];
}

export function JoinBanner() {
  const reduced = usePrefersReducedMotion();
  const [boxes, setBoxes] = useState<HoverBox[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const lastCell = useRef<string | null>(null);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  function schedule(id: string) {
    clearTimeout(timers.current.get(id));
    timers.current.set(
      id,
      setTimeout(() => {
        const remove = () => {
          timers.current.delete(id);
          setBoxes((bs) => bs.filter((b) => b.id !== id));
        };
        if (reduced) return remove();
        setBoxes((bs) => bs.map((b) => (b.id === id ? { ...b, phase: "out" } : b)));
        timers.current.set(id, setTimeout(remove, FADE_MS));
      }, HOLD_MS),
    );
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cell = cellAt(e.clientX - rect.left, e.clientY - rect.top);
    if (cell.id === lastCell.current) return;
    lastCell.current = cell.id;

    const exists = timers.current.has(cell.id);
    if (!exists && timers.current.size >= MAX_BOXES) return;
    setBoxes((bs) =>
      exists
        ? bs.map((b) => (b.id === cell.id ? { ...b, phase: "in" } : b))
        : [...bs, { ...cell, phase: "in" }],
    );
    schedule(cell.id);
  }

  const sorted = [...boxes].sort((a, b) => a.cellY - b.cellY || a.cellX - b.cellX);

  return (
    <section style={{ ...container, padding: "48px 24px 96px" }}>
      <div
        onPointerMove={onPointerMove}
        onPointerDown={onPointerMove}
        onPointerLeave={() => (lastCell.current = null)}
        style={{ position: "relative", minHeight: 400, borderRadius: 28, overflow: "hidden", background: "var(--dark)", color: "var(--background)" }}>
        <svg aria-hidden="true" width="1440" height="440" style={{ position: "absolute", left: 0, top: 0 }}>
          <defs>
            <pattern id="rr-iso" width="72" height="36" patternUnits="userSpaceOnUse">
              <path d="M0 18L36 0L72 18L36 36Z" stroke="#FFFFFF" strokeOpacity="0.11" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="1440" height="440" fill="url(#rr-iso)" />
        </svg>

        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {sorted.map((b) => {
            return (
              <svg
                key={b.id}
                className={reduced ? undefined : b.phase === "in" ? "rr-in" : "rr-out"}
                width="90"
                height="81"
                viewBox="0 0 400 360"
                fill="none"
                style={{ position: "absolute", left: b.cellX - 9, top: b.cellY - 40 }}
              >
                <Box tone={toneFor(b)} />
              </svg>
            );
          })}
        </div>

        <div style={{ position: "relative", minHeight: 400, boxSizing: "border-box", maxWidth: 640, padding: "clamp(28px, 6vw, 56px)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18, pointerEvents: "none" }}>
          <span style={{ ...eyebrow, color: "var(--dark-muted)" }}>06 / Get started</span>
          <h2 style={{ margin: 0, fontSize: "clamp(34px, 6vw, 50px)", lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.04em" }}>Join the future of retail compliance</h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#BDB9B2", textWrap: "pretty" }}>
            Many warehouses have already transformed their operations with RetailReady. Experience how our platform can revolutionize your supply chain compliance.
          </p>
          <a href={CAL_URL} style={{ alignSelf: "flex-start", pointerEvents: "auto", display: "inline-flex", alignItems: "center", minHeight: 48, padding: "0 22px", borderRadius: 10, background: "var(--background)", color: "#141414", ...mono, fontSize: 14, textDecoration: "none" }}>
            Get Started – Demo &amp; Pricing
          </a>
        </div>
        <span className="max-sm:hidden" style={{ position: "absolute", right: 24, bottom: 20, ...mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#8F8B84", pointerEvents: "none" }}>
          Move your cursor
        </span>
      </div>
    </section>
  );
}
