"use client";

import gsap from "gsap";
import { useRef, type CSSProperties } from "react";
import { JoinBanner } from "@/components/JoinBanner";
import { TEAM } from "@/data/team";
import { Reveal, playOnceInView, useMotion } from "@/lib/motion";
import { container, eyebrow, mono } from "@/lib/styles";

const sectionPad = "0 24px clamp(88px, 11vw, 136px)";
const h2: CSSProperties = { margin: 0, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.045em", textWrap: "balance" };

const founders = [
  {
    name: "Elle Smyth",
    role: "Co-Founder/CEO",
    initials: "ES",
    bio: [
      "A Duke Engineering graduate, Elle's journey through BlackRock and later as a Product Leader at Stord showcases her blend of corporate expertise and startup innovation. While at Stord, she played a key role in product development during its rise to unicorn status.",
      "Elle's vision for RetailReady centers on transforming reactive compliance into proactive solutions, developing guided workflows that streamline operations for brands, 3PLs, and retailers alike.",
    ],
  },
  {
    name: "Sarah Hamer",
    role: "Co-Founder/COO",
    initials: "SH",
    bio: [
      "A Georgia Tech Industrial Engineering graduate, Sarah began her journey at Microsoft before becoming a Strategy Associate to the CTO at Stord. Her expertise in supply chain software solutions and passion for practical innovation drives RetailReady's technical vision.",
      "Sarah loves transforming retail compliance through AI-powered solutions, focusing on eliminating manual processes and introducing new standards of efficiency in the industry.",
    ],
  },
];

const press = [
  { outlet: "TechCrunch", headline: "YC grad RetailReady raises $3.3M for AI warehouse app", href: "https://techcrunch.com/2024/06/12/yc-retailready-warehouse-shipping/" },
  { outlet: "Forbes", headline: "30 Under 30, Transportation & Mobility 2025", href: "https://www.forbes.com/profile/retailready/" },
  { outlet: "Y Combinator", headline: "W24 Batch Company", href: "https://www.ycombinator.com/companies/retailready" },
];

function ArrowIcon() {
  return (
    <svg className="flow-arrow" width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5 13L13 5M6.5 5H13v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Avatar({ initials, compact = false }: { initials: string; compact?: boolean }) {
  return (
    <div style={{ aspectRatio: "1", display: "grid", placeItems: "center", borderRadius: compact ? 14 : 18, background: "#ECE8E2", color: "#B5B0A8", fontSize: compact ? "clamp(36px, 5vw, 54px)" : "clamp(52px, 8vw, 88px)", fontWeight: 500, letterSpacing: "-0.05em" }}>
      {initials}
    </div>
  );
}

export function AboutPage() {
  const teamGrid = useRef<HTMLDivElement>(null);

  useMotion(() => {
    playOnceInView(
      teamGrid.current!,
      gsap.from(teamGrid.current!.children, {
        opacity: 0,
        y: 12,
        duration: 0.3,
        stagger: 0.04,
        ease: "power2.out",
        clearProps: "transform,opacity",
      }),
    );
  }, teamGrid);

  return (
    <main>
      <section style={{ ...container, padding: "clamp(96px, 15vw, 184px) 24px clamp(96px, 13vw, 152px)", textAlign: "center" }}>
        <Reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <h1 style={{ maxWidth: 960, margin: 0, fontSize: "clamp(44px, 7vw, 80px)", lineHeight: 0.98, fontWeight: 500, letterSpacing: "-0.055em", textWrap: "balance" }}>
            Building the future of retail operations
          </h1>
          <span style={{ ...mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6E6A64" }}>San Francisco · California</span>
          <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 9, fontSize: 15 }}>
            <span style={{ color: "var(--muted)" }}>Backed by</span>
            <span aria-hidden="true" style={{ width: 28, height: 28, display: "grid", placeItems: "center", borderRadius: 7, background: "#FF6600", color: "#FFFFFF", fontSize: 16, lineHeight: 1 }}>Y</span>
            <span style={{ color: "var(--text)", fontWeight: 500 }}>Y Combinator</span>
          </div>
        </Reveal>
      </section>

      <section style={{ ...container, padding: sectionPad }}>
        <Reveal style={{ marginBottom: 36, display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={eyebrow}>Our story</span>
          <h2 style={h2}>Our Story</h2>
        </Reveal>
        <Reveal className="grid gap-6 md:grid-cols-2 md:gap-12" style={{ alignItems: "start" }}>
          <p style={{ maxWidth: "68ch", margin: 0, fontSize: "clamp(18px, 2vw, 20px)", lineHeight: 1.6, color: "var(--body)", textWrap: "pretty" }}>
            RetailReady was born from a simple observation: retail compliance shouldn&apos;t cost brands billions. Founded by industry veterans who met while working at supply chain unicorn Stord, Elle and Sarah bonded over their shared passion for solving complex supply chain challenges.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <p style={{ maxWidth: "68ch", margin: 0, fontSize: "clamp(18px, 2vw, 20px)", lineHeight: 1.6, color: "var(--body)", textWrap: "pretty" }}>
              In 2024, after being accepted into Y Combinator&apos;s Winter batch, the journey began to transform how retail compliance is managed. Brands were losing an average of 3% of their revenue due to compliance chargebacks from incorrect shipping practices, contributing to a $40 billion industry problem.
            </p>
            <p style={{ maxWidth: "68ch", margin: 0, fontSize: "clamp(18px, 2vw, 20px)", lineHeight: 1.6, color: "var(--body)", textWrap: "pretty" }}>
              Today, we&apos;re building an AI-powered platform that replaces manual warehouse processes with intelligent, digital solutions. Our technology combines large language models and computer vision to ensure proper shipping compliance, helping brands save money and focus on what matters most: growing their business.
            </p>
          </div>
        </Reveal>
      </section>

      <section style={{ ...container, padding: sectionPad }}>
        <Reveal style={{ marginBottom: 36, display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={eyebrow}>The team</span>
          <h2 style={h2}>Meet Our Team</h2>
        </Reveal>

        <div className="grid gap-3 md:grid-cols-2" style={{ marginBottom: 48 }}>
          {founders.map((founder) => (
            <Reveal key={founder.name} style={{ height: "100%" }}>
              <article style={{ height: "100%", boxSizing: "border-box", padding: "clamp(16px, 3vw, 28px)", display: "flex", flexDirection: "column", gap: 22, border: "1px solid #E6E2DC", borderRadius: 24, background: "var(--surface)" }}>
                <Avatar initials={founder.initials} />
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <h3 style={{ margin: 0, fontSize: 24, fontWeight: 500, letterSpacing: "-0.025em" }}>{founder.name}</h3>
                  <span style={{ ...mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6E6A64" }}>{founder.role}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {founder.bio.map((paragraph) => (
                    <p key={paragraph} style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "var(--body)", textWrap: "pretty" }}>{paragraph}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div ref={teamGrid} className="grid grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-3">
          {TEAM.map((member) => (
            <article key={member.name} style={{ padding: 12, display: "flex", flexDirection: "column", gap: 14, border: "1px solid var(--border)", borderRadius: 16, background: "var(--surface)" }}>
              <Avatar initials={member.initials} compact />
              <div style={{ padding: "0 4px 5px", display: "flex", flexDirection: "column", gap: 3 }}>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 500, letterSpacing: "-0.015em" }}>{member.name}</h3>
                <span style={{ fontSize: 14, lineHeight: 1.4, color: "#5E5A54" }}>{member.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ ...container, padding: "0 24px 48px" }}>
        <Reveal style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={eyebrow}>Press coverage</span>
          <h2 style={h2}>Featured In</h2>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-3">
          {press.map((item) => (
            <a key={item.outlet} href={item.href} target="_blank" rel="noreferrer" className="press-card" style={{ minHeight: 220, boxSizing: "border-box", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32, border: "1px solid var(--border)", borderRadius: 16, background: "var(--surface)", color: "var(--text)", textDecoration: "none" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                <span style={{ ...mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>{item.outlet}</span>
                <ArrowIcon />
              </div>
              <h3 style={{ margin: 0, fontSize: 20, lineHeight: 1.25, fontWeight: 500, letterSpacing: "-0.02em", textWrap: "balance" }}>{item.headline}</h3>
            </a>
          ))}
        </div>
      </section>

      <JoinBanner />
    </main>
  );
}
