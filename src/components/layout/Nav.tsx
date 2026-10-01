"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/illustrations/Logo";
import { CAL_URL, container, mono } from "@/lib/styles";

const menus = [
  {
    label: "Product",
    links: [
      { label: "Retail flows", href: "#flows" },
      { label: "How it works", href: "#how" },
      { label: "Who it's for", href: "#stakeholders" },
    ],
  },
  {
    label: "Customers",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Certified 3PLs", href: "/partners" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Roundup", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ transition: "transform 150ms", transform: open ? "rotate(180deg)" : undefined }}>
      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const cta = { display: "inline-flex", alignItems: "center", height: 44, borderRadius: 10, background: "#141414", color: "#FFFFFF", textDecoration: "none", ...mono, whiteSpace: "nowrap" } as const;

export function Nav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openMenu && !mobileOpen) return;
    const close = () => {
      setOpenMenu(null);
      setMobileOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDown = (e: PointerEvent) => !headerRef.current?.contains(e.target as Node) && close();
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [openMenu, mobileOpen]);

  return (
    <header
      ref={headerRef}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        // Transparent at the top; frosted with a border once scrolled past 40px
        ...(scrolled || mobileOpen
          ? { background: "rgba(246, 244, 241, 0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid var(--grid)" }
          : { background: "rgba(246, 244, 241, 0)", backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)", borderBottom: "1px solid transparent" }),
        transition: "background-color 200ms, border-color 200ms, backdrop-filter 200ms, -webkit-backdrop-filter 200ms",
      }}
    >
      <div className="gap-3 px-4 min-[900px]:gap-6 min-[900px]:px-6" style={{ ...container, height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, color: "#141414", textDecoration: "none" }}>
          <Logo size={22} stroke="#141414" />
          <span className="text-[19px] max-[400px]:text-[17px]" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>RetailReady</span>
        </Link>

        <nav aria-label="Main" className="hidden min-[900px]:flex" style={{ gap: 8, fontSize: 15 }}>
          {menus.map((m) => {
            const open = openMenu === m.label;
            const active = m.links.some((link) => link.href.startsWith("/") && pathname === link.href);
            const id = `menu-${m.label.toLowerCase()}`;
            return (
              <div
                key={m.label}
                style={{ position: "relative" }}
                onPointerEnter={(e) => e.pointerType === "mouse" && setOpenMenu(m.label)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setOpenMenu(null)}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={id}
                  onClick={() => setOpenMenu(open ? null : m.label)}
                  className="text-[#5E5A54] hover:text-[#141414]"
                  style={{ display: "flex", alignItems: "center", gap: 6, height: 44, padding: "0 10px", border: 0, background: "none", font: "inherit", cursor: "pointer", color: open || active ? "#141414" : undefined }}
                >
                  {m.label}
                  <Chevron open={open} />
                </button>
                {open && (
                  <div id={id} style={{ position: "absolute", top: "100%", left: 0, paddingTop: 6 }}>
                    <div style={{ minWidth: 200, padding: 6, display: "flex", flexDirection: "column", background: "#FFFFFF", border: "1px solid var(--border)", borderRadius: 14, boxShadow: "0 14px 30px rgba(20,20,20,0.08)" }}>
                      {m.links.map((l) => {
                        const linkActive = l.href.startsWith("/") && pathname === l.href;
                        return (
                        <Link
                          key={l.label}
                          href={l.href}
                          aria-current={linkActive ? "page" : undefined}
                          onClick={() => setOpenMenu(null)}
                          className="text-[#5E5A54] hover:bg-[#F6F4F1] hover:text-[#141414]"
                          style={{ padding: "10px 12px", borderRadius: 9, background: linkActive ? "#F6F4F1" : undefined, color: linkActive ? "#141414" : undefined, textDecoration: "none" }}
                        >
                          {l.label}
                        </Link>
                      )})}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href={CAL_URL} className="btn px-3 text-[13px] max-[400px]:text-xs min-[900px]:px-[18px]" style={cta}>Try our platform</a>
          <button
            type="button"
            className="flex min-[900px]:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ width: 44, height: 44, alignItems: "center", justifyContent: "center", border: "1px solid var(--grid)", borderRadius: 10, background: "#FFFFFF", cursor: "pointer" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d={mobileOpen ? "M3.5 3.5l9 9M12.5 3.5l-9 9" : "M2 4.5h12M2 8h12M2 11.5h12"} stroke="#141414" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="min-[900px]:hidden" style={{ position: "absolute", top: "100%", left: 0, right: 0, maxHeight: "calc(100dvh - 64px)", overflowY: "auto", background: "var(--background)", borderBottom: "1px solid var(--grid)" }}>
          <nav aria-label="Main" style={{ ...container, padding: "8px 24px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
            {menus.map((m) => (
              <div key={m.label} style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ ...mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)", padding: "8px 0" }}>{m.label}</span>
                {m.links.map((l) => (
                  <Link key={l.label} href={l.href} aria-current={l.href.startsWith("/") && pathname === l.href ? "page" : undefined} onClick={() => setMobileOpen(false)} style={{ padding: "10px 0", fontSize: 18, fontWeight: l.href.startsWith("/") && pathname === l.href ? 600 : undefined, textDecoration: "none" }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
