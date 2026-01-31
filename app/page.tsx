import Hero from "@/components/home/Hero";
import TransformationSection from "@/components/home/TransformationSection";
import ServicesHorizontal from "@/components/home/ServicesHorizontal";
import Footer from "@/components/layout/Footer";
import { getServices } from "@/lib/services-data";

// This is a Server Component
export default async function Home() {
  const servicesData = await getServices();

  return (
    <main className="flex flex-col min-h-screen bg-neutral-950 text-white">

      {/* 1. HERO SECTION (Redesigned) */}
      <Hero />

      {/* 2. TRANSFORMATION SECTION (Slider) */}
      <TransformationSection />

      {/* 3. SERVICES HORIZONTAL SCROLL (Restored) */}
      <ServicesHorizontal data={servicesData} />

      {/* 4. FOOTER */}
      <Footer />

    </main>
  );
}
