export type CaseStudy = {
  company: string;
  title: string;
  description: string;
  attribution?: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    company: "Ware2Go, a UPS Company",
    title: "Streamlining B2B retail enablement",
    description: "\u201cRetailReady is easy to integrate with, easy to implement, easy for users to learn.\u201d",
    attribution: "Chris Dikes, VP of Product Management",
    image: "/screenshots/W2G.webp",
    imageAlt: "Ware2Go and RetailReady teams in a fulfillment warehouse",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7308147757628706816",
  },
  {
    company: "BruMate",
    title: "Saving hours weekly with automated chargeback defense",
    description: "Goal: increasing chargeback win rate month over month",
    image: "/screenshots/brumate.webp",
    imageAlt: "Colorful BruMate can coolers",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7262534985939574784/",
  },
  {
    company: "GoBolt",
    title: "Saving days on orders and $0.75 per unit",
    description: "Goal: eliminate chargebacks and decrease processing time",
    image: "/screenshots/frankoak.webp",
    imageAlt: "Frank And Oak storefront",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7237112233191727104/",
  },
  {
    company: "Deliverzen",
    title: "Cut order processing time by 66%",
    description: "B2B order processing went from 90 minutes to 30 minutes per order, with chargebacks caught proactively.",
    image: "/screenshots/divi2.webp",
    imageAlt: "Divi haircare products",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7265031138102894593/",
  },
];
