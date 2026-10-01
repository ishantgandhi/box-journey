"use client";

import gsap from "gsap";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { IsoBoxField } from "@/components/IsoBoxField";
import { PARTNERS } from "@/data/partners";
import { Reveal, playOnceInView, useMotion } from "@/lib/motion";
import { container, eyebrow, mono } from "@/lib/styles";

const PARTNER_URL = "https://cal.com/thea-dietrick/30min?overlayCalendar=true";

const STEPS = [
  ["Brands come to us", "Brands using RetailReady ask us which 3PLs can handle their retailer compliance needs."],
  ["We recommend Certified Partners", "We only refer brands to 3PLs that run RetailReady and consistently hit compliance benchmarks."],
  ["Partners grow their book of business", "Certified 3PLs get warm introductions to brands already bought into the platform."],
];

const h2: CSSProperties = { margin: 0, fontSize: "clamp(34px, 5vw, 56px)", lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.045em", textWrap: "balance" };
const button: CSSProperties = { display: "inline-flex", alignItems: "center", minHeight: 48, padding: "0 22px", borderRadius: 10, ...mono, fontSize: 14, textDecoration: "none" };
const sectionPad = "0 24px clamp(88px, 11vw, 136px)";

function ArrowIcon() {
  return (
    <svg className="flow-arrow" width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5 13L13 5M6.5 5H13v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 5.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PartnersPage() {
  const cardGrid = useRef<HTMLDivElement>(null);

  useMotion(() => {
    playOnceInView(
      cardGrid.current!,
      gsap.from(cardGrid.current!.children, {
        opacity: 0,
        y: 12,
        duration: 0.3,
        stagger: 0.04,
        ease: "power2.out",
        clearProps: "transform,opacity",
      }),
    );
  }, cardGrid);

  return (
    <main>
      <section style={{ ...container, padding: "clamp(56px, 10vh, 112px) 24px clamp(72px, 10vw, 120px)", textAlign: "center" }}>
        <Reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <span style={eyebrow}>Certified partner program</span>
          <h1 style={{ maxWidth: 900, margin: 0, fontSize: "clamp(40px, 7vw, 80px)", lineHeight: 0.98, fontWeight: 500, letterSpacing: "-0.055em", textWrap: "balance" }}>
            RetailReady Certified 3PL Partners
          </h1>
          <p style={{ maxWidth: "68ch", margin: "8px 0 0", fontSize: "clamp(18px, 2vw, 20px)", lineHeight: 1.55, color: "var(--muted)", textWrap: "pretty" }}>
            The 3PLs trusted by the fastest-growing brands to ship retailer-compliant orders with zero chargebacks. When brands ask us who to work with, these are the partners we recommend.
          </p>
          <a href={PARTNER_URL} target="_blank" rel="noreferrer" className="btn" style={{ ...button, marginTop: 8, background: "var(--dark)", color: "#FFFFFF" }}>
            Become a Certified Partner
          </a>
        </Reveal>
      </section>

      <section style={{ ...container, padding: sectionPad }}>
        <Reveal style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={eyebrow}>How it works</span>
          <h2 style={h2}>From referral to revenue in three steps</h2>
        </Reveal>
        <Reveal className="grid gap-x-6 md:grid-cols-3" style={{ margin: 0 }}>
          {STEPS.map(([title, desc], i) => (
            <div key={title} style={{ display: "grid", gridTemplateColumns: "48px minmax(0, 1fr)", gap: 8, padding: "22px 0", borderTop: "1px solid var(--line)" }}>
              <span style={{ ...mono, fontSize: 13, paddingTop: 4, color: "var(--muted)" }}>{String(i + 1).padStart(2, "0")}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", textWrap: "balance" }}>{title}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "var(--body)", textWrap: "pretty" }}>{desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <section style={{ ...container, padding: sectionPad }}>
        <Reveal style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={eyebrow}>Our partners</span>
          <h2 style={h2}>Certified 3PL Partners</h2>
          <p style={{ maxWidth: "60ch", margin: 0, fontSize: 17, lineHeight: 1.6, color: "var(--body)", textWrap: "pretty" }}>
            These partners have been vetted, tested, and trusted to deliver retailer-compliant orders at scale.
          </p>
        </Reveal>

        <div ref={cardGrid} className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-3">
          {PARTNERS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="partner-card"
              style={{ minHeight: 200, boxSizing: "border-box", padding: 24, display: "flex", flexDirection: "column", gap: 16, border: "1px solid var(--border)", borderRadius: 16, background: "var(--surface)", color: "var(--text)", textDecoration: "none" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 8px", border: "1px solid var(--border)", borderRadius: 999, ...mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--body)" }}>
                  <CheckIcon />
                  RetailReady Certified
                </span>
                <ArrowIcon />
              </div>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ position: "relative", width: 40, height: 40, flexShrink: 0, overflow: "hidden", border: "1px solid var(--border)", borderRadius: 10, background: "#FFFFFF" }}>
                  <Image src={p.logo} alt="" fill sizes="40px" style={{ objectFit: "contain", padding: 5 }} />
                </span>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em" }}>{p.name}</h3>
              </div>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#5E5A54", textWrap: "pretty" }}>{p.description}</p>
            </a>
          ))}
        </div>
      </section>

      <IsoBoxField style={{ marginBottom: 48 }}>
        <section style={{ ...container, position: "relative", padding: "clamp(72px, 10vw, 128px) 24px", pointerEvents: "none" }}>
          <Reveal style={{ maxWidth: 760, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
            <span style={{ ...eyebrow, color: "var(--dark-muted)" }}>The network</span>
            <p style={{ margin: 0, fontSize: "clamp(20px, 2.4vw, 24px)", lineHeight: 1.4, letterSpacing: "-0.02em", textWrap: "pretty" }}>
              Hundreds of brands use RetailReady. When they need a 3PL, this is where we send them.
            </p>
            <h2 style={{ ...h2, fontSize: "clamp(40px, 7vw, 76px)", lineHeight: 1, letterSpacing: "-0.05em" }}>Your competitors are already Certified.</h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#A8A49D", textWrap: "pretty" }}>
              Brands are choosing 3PLs that guarantee compliance. Don&apos;t get left behind.
            </p>
            <a href={PARTNER_URL} target="_blank" rel="noreferrer" className="btn" style={{ ...button, marginTop: 8, pointerEvents: "auto", background: "var(--background)", color: "#141414" }}>
              Work With Us
            </a>
          </Reveal>
        </section>
      </IsoBoxField>
    </main>
  );
}
