import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Platforms } from "@/components/platforms";
import { WhyChoose } from "@/components/why-choose";
import { FAQ } from "@/components/faq";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Platforms />
        <WhyChoose />
        <FAQ />
      </main>
    </>
  );
}
