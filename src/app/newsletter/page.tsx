import type { Metadata } from "next";
import { NewsletterPage } from "@/components/NewsletterPage";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "RetailReady Roundup",
  description: "Compliance updates, platform news, and partner highlights.",
};

export default function Page() {
  return (
    <>
      <Nav />
      <NewsletterPage />
      <Footer />
    </>
  );
}
