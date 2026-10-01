export type Issue = {
  slug: string;
  number: string;
  date: string;
  title: string;
  summary: string;
  /** Body paragraphs; empty until the issue is written */
  body: string[];
};

export const ISSUES: Issue[] = [
  {
    slug: "issue-1",
    number: "Issue #1",
    date: "June 2026",
    title: "Welcome to the first issue of the RetailReady Roundup",
    summary:
      "Built for the partners, consultants, and friends who've been part of this journey, a dedicated place to keep you in the loop on what we're shipping and where we're headed.",
    body: [],
  },
];

export const getIssue = (slug: string) => ISSUES.find((issue) => issue.slug === slug);
