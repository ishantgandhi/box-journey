import { BrandStrip } from "@/components/BrandStrip";
import { Challenge } from "@/components/Challenge";
import { HowItWorks } from "@/components/HowItWorks";
import { JoinBanner } from "@/components/JoinBanner";
import { RetailFlows } from "@/components/RetailFlows";
import { Stakeholders } from "@/components/Stakeholders";
import { Story } from "@/components/Story";
import { Hero } from "@/components/hero/Hero";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BrandStrip />
        <RetailFlows />
        <Challenge />
        <HowItWorks />
        <Stakeholders />
        <Story />
        <JoinBanner />
      </main>
      <Footer />
    </>
  );
}
