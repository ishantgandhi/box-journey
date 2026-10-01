import type { Metadata } from "next";
import { PartnersPage } from "@/components/PartnersPage";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "Certified 3PL Partners",
  description: "The 3PLs trusted by fast-growing brands to ship retailer-compliant orders.",
};

export default function Page() {
  return (
    <>
      <Nav />
      <PartnersPage />
      <Footer />
    </>
  );
}
