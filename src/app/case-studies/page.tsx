import type { Metadata } from "next";
import { CaseStudiesPage } from "@/components/CaseStudiesPage";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "How brands and 3PLs reach zero chargebacks with RetailReady.",
};

export default function Page() {
  return (
    <>
      <Nav />
      <CaseStudiesPage />
      <Footer />
    </>
  );
}
