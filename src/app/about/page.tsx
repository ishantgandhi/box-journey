import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

export const metadata: Metadata = {
  title: "About",
  description: "The team building an AI-powered supply chain compliance engine in San Francisco.",
};

export default function Page() {
  return (
    <>
      <Nav />
      <AboutPage />
      <Footer />
    </>
  );
}
