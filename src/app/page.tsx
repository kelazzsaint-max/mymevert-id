import { Hero } from "@/components/hero";
import dynamic from "next/dynamic";

// Hero TIDAK di-dynamic-import karena dia above-the-fold —
// harus langsung ada saat halaman pertama kali render (LCP).
// Komponen di bawah ini baru terlihat setelah user scroll,
// jadi JS-nya nggak perlu ikut di initial bundle.

// PENTING: karena komponen kamu pakai "export function NamaKomponen"
// (named export, bukan "export default"), next/dynamic butuh
// .then(mod => mod.NamaKomponen) — kalau nggak, akan error
// "Element type is invalid" saat di-render.

const Features = dynamic(() =>
  import("@/components/features").then((mod) => mod.Features)
);

const HowItWorks = dynamic(() =>
  import("@/components/how-it-works").then((mod) => mod.HowItWorks)
);

const Platforms = dynamic(() =>
  import("@/components/platforms").then((mod) => mod.Platforms)
);

const WhyChoose = dynamic(() =>
  import("@/components/why-choose").then((mod) => mod.WhyChoose)
);

const FAQ = dynamic(() =>
  import("@/components/faq").then((mod) => mod.FAQ)
);

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