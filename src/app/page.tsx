import { Challenge } from "@/components/Challenge";
import { HowItWorks } from "@/components/HowItWorks";
import { JoinBanner } from "@/components/JoinBanner";
import { RetailFlows } from "@/components/RetailFlows";
import { Stakeholders } from "@/components/Stakeholders";
import { Hero } from "@/components/hero/Hero";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <RetailFlows />
        <Challenge />
        <HowItWorks />
        <Stakeholders />
        <JoinBanner />
      </main>
      <Footer />
    </>
  );
}
