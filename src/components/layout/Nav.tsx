"use client";

import { useState } from "react";
import { Logo } from "@/components/illustrations/Logo";
import { CAL_URL, LOGIN_URL, mono } from "@/lib/styles";

const links = [
  { label: "Home", href: "#", active: true },
  { label: "Case Studies", href: "#" },
  { label: "Certified 3PLs", href: "#" },
  { label: "About", href: "#" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  const navLinks = links.map((l) => (
    <a key={l.label} href={l.href} style={{ color: l.active ? "#FFFFFF" : "#C4C0B9", textDecoration: "none" }}>
      {l.label}
    </a>
  ));

  const actions = (
    <>
      <a href={LOGIN_URL} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 14px", color: "#FFFFFF", textDecoration: "none" }}>
        Log in
      </a>
      <a href={CAL_URL} style={{ display: "inline-flex", alignItems: "center", minHeight: 44, padding: "0 16px", borderRadius: 9, background: "#FFFFFF", color: "#141414", textDecoration: "none" }}>
        Meet with us
      </a>
    </>
  );

  return (
    <header style={{ display: "flex", justifyContent: "center", padding: "20px 16px 0" }}>
      <div
        className="w-full md:w-auto"
        style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", columnGap: 28, padding: "8px 8px 8px 18px", borderRadius: 14, background: "var(--dark)", color: "#FFFFFF" }}
      >
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, color: "#FFFFFF", textDecoration: "none" }}>
          <Logo size={22} stroke="#FFFFFF" />
          <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>RetailReady</span>
        </a>

        <nav aria-label="Main" className="hidden md:flex" style={{ gap: 24, fontSize: 15 }}>
          {navLinks}
        </nav>
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 4, ...mono, fontSize: 13 }}>
          {actions}
        </div>

        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
          style={{ minHeight: 44, padding: "0 14px", border: 0, borderRadius: 9, background: "#FFFFFF", color: "#141414", ...mono, fontSize: 13, cursor: "pointer" }}
        >
          {open ? "Close" : "Menu"}
        </button>

        {open && (
          <div id="mobile-menu" className="md:hidden" style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16, padding: "20px 10px 10px 0" }}>
            <nav aria-label="Main" style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 17 }}>
              {navLinks}
            </nav>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", ...mono, fontSize: 13 }}>
              {actions}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
