"use client";

import gsap from "gsap";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import { ISSUES } from "@/data/issues";
import { Reveal, playOnceInView, useMotion } from "@/lib/motion";
import { container, eyebrow, mono } from "@/lib/styles";

const meta: CSSProperties = { ...mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6E6A64" };

function ArrowIcon() {
  return (
    <svg className="flow-arrow" width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5 13L13 5M6.5 5H13v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Signup() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between" style={{ padding: "clamp(20px, 3vw, 32px)", border: "1px solid #E6E2DC", borderRadius: 24 }}>
      <p style={{ margin: 0, fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em" }}>Get the Roundup in your inbox</p>
      <div aria-live="polite" className="w-full md:max-w-[440px]">
        {done ? (
          <p style={{ margin: 0, minHeight: 48, display: "flex", alignItems: "center", gap: 10, fontSize: 16 }}>
            <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 999, background: "#5FD08A" }} />
            You&apos;re on the list.
          </p>
        ) : (
          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label htmlFor="roundup-email" style={meta}>Work email</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                id="roundup-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                style={{ flex: 1, minWidth: 0, minHeight: 48, boxSizing: "border-box", padding: "0 16px", border: "1px solid #DCD8D1", borderRadius: 10, background: "#FFFFFF", color: "var(--text)", fontFamily: "inherit", fontSize: 16 }}
              />
              <button type="submit" className="btn" style={{ minHeight: 48, padding: "0 20px", border: 0, borderRadius: 10, background: "var(--dark)", color: "#FFFFFF", ...mono, fontSize: 14, cursor: "pointer" }}>
                Subscribe
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function NewsletterPage() {
  const list = useRef<HTMLDivElement>(null);

  useMotion(() => {
    playOnceInView(
      list.current!,
      gsap.from(list.current!.children, { opacity: 0, y: 12, duration: 0.3, stagger: 0.04, ease: "power2.out", clearProps: "transform,opacity" }),
    );
  }, list);

  return (
    <main>
      <section style={{ ...container, padding: "clamp(56px, 10vh, 112px) 24px clamp(40px, 6vh, 64px)", textAlign: "center" }}>
        <Reveal style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <span style={eyebrow}>For partners &amp; consultants</span>
          <h1 style={{ margin: 0, fontSize: "clamp(44px, 7vw, 80px)", lineHeight: 0.98, fontWeight: 500, letterSpacing: "-0.055em", textWrap: "balance" }}>RetailReady Roundup</h1>
          <p style={{ maxWidth: "64ch", margin: "8px 0 0", fontSize: "clamp(18px, 2vw, 20px)", lineHeight: 1.55, color: "var(--muted)", textWrap: "pretty" }}>
            Compliance updates, platform news, and partner highlights for the consultants who keep brands RetailReady.
          </p>
        </Reveal>
      </section>

      <section style={{ ...container, padding: "0 24px clamp(64px, 9vw, 112px)" }}>
        <div ref={list} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ISSUES.map((issue) => (
            <Link
              key={issue.slug}
              href={`/newsletter/${issue.slug}`}
              className="issue-card grid gap-3 md:grid-cols-[140px_minmax(0,1fr)] md:gap-8"
              style={{ position: "relative", padding: "clamp(20px, 3vw, 32px)", paddingRight: 64, border: "1px solid #E6E2DC", borderRadius: 24, background: "var(--surface)", color: "var(--text)", textDecoration: "none" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.02em" }}>{issue.number}</span>
                <span style={meta}>{issue.date}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <h2 style={{ margin: 0, fontSize: 24, lineHeight: 1.2, fontWeight: 500, letterSpacing: "-0.025em", textWrap: "balance" }}>{issue.title}</h2>
                <p style={{ maxWidth: "68ch", margin: 0, fontSize: 16, lineHeight: 1.6, color: "#5E5A54", textWrap: "pretty" }}>{issue.summary}</p>
              </div>
              <span style={{ position: "absolute", top: "clamp(20px, 3vw, 32px)", right: "clamp(20px, 3vw, 32px)" }}>
                <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
        <Reveal style={{ marginTop: 36 }}>
          <Signup />
        </Reveal>
      </section>
    </main>
  );
}
