"use client";

import gsap from "gsap";
import Image from "next/image";
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
    photo: "/about/elle.jpg",
    bio: [
      "A Duke Engineering graduate, Elle's journey through BlackRock and later as a Product Leader at Stord showcases her blend of corporate expertise and startup innovation. While at Stord, she played a key role in product development during its rise to unicorn status.",
      "Elle's vision for RetailReady centers on transforming reactive compliance into proactive solutions, developing guided workflows that streamline operations for brands, 3PLs, and retailers alike.",
    ],
  },
  {
    name: "Sarah Hamer",
    role: "Co-Founder/COO",
    photo: "/about/sarah.jpg",
    bio: [
      "A Georgia Tech Industrial Engineering graduate, Sarah began her journey at Microsoft before becoming a Strategy Associate to the CTO at Stord. Her expertise in supply chain software solutions and passion for practical innovation drives RetailReady's technical vision.",
      "Sarah loves transforming retail compliance through AI-powered solutions, focusing on eliminating manual processes and introducing new standards of efficiency in the industry.",
    ],
  },
];

const press = [
  { outlet: "TechCrunch", logo: "/about/techcrunch.png", headline: "YC grad RetailReady raises $3.3M for AI warehouse app", href: "https://techcrunch.com/2024/06/12/yc-retailready-warehouse-shipping/" },
  { outlet: "Forbes", logo: "/about/forbes.png", headline: "30 Under 30, Transportation & Mobility 2025", href: "https://www.forbes.com/profile/retailready/" },
  { outlet: "Y Combinator", logo: "/about/yc.png", headline: "W24 Batch Company", href: "https://www.ycombinator.com/companies/retailready" },
];

function ArrowIcon() {
  return (
    <svg className="flow-arrow" width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5 13L13 5M6.5 5H13v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Avatar({ name, photo, compact = false }: { name: string; photo: string; compact?: boolean }) {
  return (
    <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", borderRadius: compact ? 14 : 18, background: "#ECE8E2" }}>
      <Image src={photo} alt={name} fill sizes={compact ? "(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw" : "(min-width: 768px) 560px, 100vw"} style={{ objectFit: "cover", objectPosition: "50% 25%" }} />
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
      <section className="screen" style={{ ...container, padding: "clamp(56px, 10vh, 112px) 24px", textAlign: "center" }}>
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

      <section className="screen" style={{ ...container, padding: "clamp(32px, 6vh, 72px) 24px", marginBottom: "clamp(56px, 8vw, 96px)" }}>
        <Reveal style={{ marginBottom: "clamp(20px, 3.5vh, 36px)", display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={eyebrow}>Our story</span>
          <h2 style={{ ...h2, fontSize: "clamp(34px, min(5vw, 7vh), 56px)" }}>Our Story</h2>
        </Reveal>
        <Reveal className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-12" style={{ alignItems: "center" }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl md:aspect-auto md:h-[clamp(320px,calc(100svh-320px),600px)]">
            <Image src="/about/our-story.png" alt="RetailReady founders Elle Smyth and Sarah Hamer visiting a warehouse" fill sizes="(min-width: 768px) 42vw, 100vw" style={{ objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "clamp(14px, 2.4vh, 24px)" }}>
            <p style={{ maxWidth: "68ch", margin: 0, fontSize: "clamp(16px, min(2vw, 2.5vh), 20px)", lineHeight: 1.55, color: "var(--body)", textWrap: "pretty" }}>
              RetailReady was born from a simple observation: retail compliance shouldn&apos;t cost brands billions. Founded by industry veterans who met while working at supply chain unicorn Stord, Elle and Sarah bonded over their shared passion for solving complex supply chain challenges.
            </p>
            <p style={{ maxWidth: "68ch", margin: 0, fontSize: "clamp(16px, min(2vw, 2.5vh), 20px)", lineHeight: 1.55, color: "var(--body)", textWrap: "pretty" }}>
              In 2024, after being accepted into Y Combinator&apos;s Winter batch, the journey began to transform how retail compliance is managed. Brands were losing an average of 3% of their revenue due to compliance chargebacks from incorrect shipping practices, contributing to a $40 billion industry problem.
            </p>
            <p style={{ maxWidth: "68ch", margin: 0, fontSize: "clamp(16px, min(2vw, 2.5vh), 20px)", lineHeight: 1.55, color: "var(--body)", textWrap: "pretty" }}>
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
                <Avatar name={founder.name} photo={founder.photo} />
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

        <div ref={teamGrid} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {TEAM.map((member) => (
            <article key={member.name} style={{ padding: 12, display: "flex", flexDirection: "column", gap: 14, border: "1px solid var(--border)", borderRadius: 16, background: "var(--surface)" }}>
              <Avatar name={member.name} photo={member.photo} compact />
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
                <span style={{ display: "flex", alignItems: "center", gap: 10, ...mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>
                  <span style={{ position: "relative", width: 32, height: 32, flexShrink: 0, overflow: "hidden", borderRadius: 8 }}>
                    <Image src={item.logo} alt="" fill sizes="32px" style={{ objectFit: "cover" }} />
                  </span>
                  {item.outlet}
                </span>
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
