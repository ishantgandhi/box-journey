"use client";

import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import { JoinBanner } from "@/components/JoinBanner";
import { Stat } from "@/components/Stat";
import { CASE_STUDIES } from "@/data/caseStudies";
import { Reveal, playOnceInView, useMotion } from "@/lib/motion";
import { container, eyebrow, mono } from "@/lib/styles";

const FEATURED_URL = "https://www.youtube.com/watch?v=7p1Cc3mQu84";

function ArrowIcon() {
  return (
    <svg className="flow-arrow" width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5 13L13 5M6.5 5H13v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M8.25 6.5v9l7-4.5-7-4.5Z" fill="currentColor" />
    </svg>
  );
}

export function CaseStudiesPage() {
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
      <section style={{ ...container, padding: "clamp(56px, 10vh, 112px) 24px clamp(40px, 7vh, 80px)", textAlign: "center" }}>
        <Reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <span style={eyebrow}>Customer stories</span>
          <h1 style={{ maxWidth: 900, margin: 0, fontSize: "clamp(44px, 7vw, 80px)", lineHeight: 0.98, fontWeight: 500, letterSpacing: "-0.055em", textWrap: "balance" }}>
            Customer Success Stories
          </h1>
          <p style={{ maxWidth: "68ch", margin: "8px 0 0", fontSize: "clamp(18px, 2vw, 20px)", lineHeight: 1.55, color: "var(--muted)", textWrap: "pretty" }}>
            Unlike competitors who profit from your chargebacks by charging a percentage of savings, we&apos;re committed to eliminating them entirely. Our goal isn&apos;t to manage your chargebacks, it&apos;s to help you reach zero.
          </p>
        </Reveal>
      </section>

      <section aria-label="Customer results" style={{ ...container, padding: "0 24px clamp(88px, 11vw, 136px)" }}>
        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
          <Stat value="100%" label="compliance shipping to Ulta Beauty, California Naturals" size="clamp(48px, 6vw, 76px)" />
          <Stat value="66%" label="faster B2B order processing, 90 minutes down to 30, Deliverzen" size="clamp(48px, 6vw, 76px)" />
          <Stat value="$0.75" label="saved per unit, plus days off processing time, GoBolt" size="clamp(48px, 6vw, 76px)" />
        </div>
      </section>

      <section style={{ ...container, padding: "0 24px clamp(88px, 11vw, 136px)" }}>
        <Reveal>
          <article className="grid gap-10 p-6 md:grid-cols-2 md:gap-14 md:p-10 lg:p-14" style={{ alignItems: "center", borderRadius: 24, background: "var(--surface)" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
              <span style={eyebrow}>Featured case study</span>
              <h2 style={{ margin: 0, fontSize: "clamp(34px, 4.5vw, 56px)", lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.045em", textWrap: "balance" }}>
                California Naturals: Shipping to Ulta with 100% compliance
              </h2>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "var(--body)", textWrap: "pretty" }}>
                Hear from California Natural&apos;s COO and learn how they achieved perfect compliance scores with Ulta Beauty by implementing RetailReady&apos;s automated compliance checks and guided packaging workflows.
              </p>
              <a href={FEATURED_URL} target="_blank" rel="noreferrer" className="btn" style={{ display: "inline-flex", alignItems: "center", minHeight: 48, padding: "0 22px", borderRadius: 10, background: "var(--dark)", color: "#FFFFFF", ...mono, fontSize: 14, textDecoration: "none" }}>
                Watch the case study
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href={FEATURED_URL} target="_blank" rel="noreferrer" aria-label="Watch the California Naturals case study on YouTube" className="featured-video" style={{ position: "relative", aspectRatio: "16 / 9", display: "grid", placeItems: "center", overflow: "hidden", borderRadius: 16, background: "#ECE8E2" }}>
                <Image src="/screenshots/cal.webp" alt="California Naturals shampoo against an ocean backdrop" fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectFit: "cover" }} />
                <span className="featured-play" style={{ position: "relative", width: 64, height: 64, display: "grid", placeItems: "center", borderRadius: 999, background: "var(--dark)", color: "#FFFFFF", boxShadow: "0 8px 24px rgba(20,20,20,0.2)" }}>
                  <PlayIcon />
                </span>
              </a>
              <span style={{ ...mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>California Naturals</span>
            </div>
          </article>
        </Reveal>
      </section>

      <section style={{ ...container, padding: "0 24px 48px" }}>
        <Reveal style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={eyebrow}>More customer stories</span>
          <h2 style={{ margin: 0, fontSize: "clamp(34px, 5vw, 56px)", lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.045em" }}>
            Built for measurable results
          </h2>
        </Reveal>

        <div ref={cardGrid} className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {CASE_STUDIES.map((study) => (
            <a
              key={study.company}
              href={study.href}
              target="_blank"
              rel="noreferrer"
              className="case-study-card"
              style={{ minHeight: 440, boxSizing: "border-box", padding: 12, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 28, border: "1px solid var(--border)", borderRadius: 16, background: "var(--surface)", color: "var(--text)", textDecoration: "none" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", borderRadius: 10, background: "var(--line)" }}>
                  <Image src={study.image} alt={study.imageAlt} fill sizes="(min-width: 1100px) 25vw, (min-width: 650px) 50vw, 100vw" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, padding: "0 12px" }}>
                  <span style={{ ...eyebrow, color: "var(--body)" }}>{study.company}</span>
                  <ArrowIcon />
                </div>
                <h3 style={{ margin: 0, padding: "0 12px", fontSize: 27, lineHeight: 1.08, fontWeight: 500, letterSpacing: "-0.035em", textWrap: "balance" }}>{study.title}</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 12px 12px" }}>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "var(--body)", textWrap: "pretty" }}>{study.description}</p>
                {study.attribution && <span style={{ ...mono, fontSize: 11, lineHeight: 1.45, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>{study.attribution}</span>}
              </div>
            </a>
          ))}
        </div>
      </section>

      <JoinBanner />
    </main>
  );
}
