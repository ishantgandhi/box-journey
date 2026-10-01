import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { ISSUES, getIssue } from "@/data/issues";
import { container, mono } from "@/lib/styles";

export const dynamicParams = false;

export function generateStaticParams() {
  return ISSUES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/newsletter/[slug]">): Promise<Metadata> {
  const issue = getIssue((await params).slug);
  return issue ? { title: issue.title, description: issue.summary } : {};
}

const paragraph = { margin: 0, fontSize: 18, lineHeight: 1.75, color: "var(--body)", textWrap: "pretty" } as const;

export default async function Page({ params }: PageProps<"/newsletter/[slug]">) {
  const issue = getIssue((await params).slug);
  if (!issue) notFound();

  return (
    <>
      <Nav />
      <main style={{ ...container, padding: "clamp(40px, 8vh, 88px) 24px clamp(72px, 10vw, 120px)" }}>
        <article style={{ maxWidth: "68ch", margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          <Link href="/newsletter" style={{ alignSelf: "flex-start", ...mono, fontSize: 13, color: "var(--muted)", textDecoration: "none" }}>
            ← All issues
          </Link>
          <header style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 16 }}>
            <span style={{ ...mono, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6E6A64" }}>
              {issue.number} · {issue.date}
            </span>
            <h1 style={{ margin: 0, fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.06, fontWeight: 500, letterSpacing: "-0.045em", textWrap: "balance" }}>{issue.title}</h1>
          </header>
          <p style={{ ...paragraph, fontSize: 20, color: "var(--text)" }}>{issue.summary}</p>
          {issue.body.length ? (
            issue.body.map((text) => (
              <p key={text} style={paragraph}>
                {text}
              </p>
            ))
          ) : (
            <p style={{ ...paragraph, color: "var(--muted)" }}>This issue is coming soon.</p>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
