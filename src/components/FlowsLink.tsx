"use client";

import type { CSSProperties, ReactNode } from "react";
import { SHOW_ALL_EVENT } from "@/components/RetailFlows";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = { style: CSSProperties; children: ReactNode; showAll?: boolean; className?: string };

/**
 * Scrolls to the retail flows section and puts the cursor in its search box,
 * or with `showAll`, asks RetailFlows to open (and scroll to) the full list.
 */
export function FlowsLink({ style, children, showAll, className }: Props) {
  const reduced = usePrefersReducedMotion();
  return (
    <a
      href="#flows"
      className={className}
      style={style}
      onClick={(e) => {
        e.preventDefault();
        if (showAll) return void window.dispatchEvent(new Event(SHOW_ALL_EVENT));
        document.getElementById("flows")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        document.getElementById("rr-search")?.focus({ preventScroll: true });
      }}
    >
      {children}
    </a>
  );
}
