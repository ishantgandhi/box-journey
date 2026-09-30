"use client";

import type { CSSProperties, ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** Scrolls to the retail flows section and puts the cursor in its search box. */
export function FlowsLink({ style, children }: { style: CSSProperties; children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  return (
    <a
      href="#flows"
      style={style}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById("flows")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        document.getElementById("rr-search")?.focus({ preventScroll: true });
      }}
    >
      {children}
    </a>
  );
}
