"use client";

import Hero from "@/components/home/Hero";
import TransformationSection from "@/components/home/TransformationSection";
import ServicesHorizontal from "@/components/home/ServicesHorizontal";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-neutral-950 text-white">

      {/* 1. HERO SECTION (Redesigned) */}
      <Hero />

      {/* 2. TRANSFORMATION SECTION (Slider) */}
      <TransformationSection />

      {/* 3. SERVICES HORIZONTAL SCROLL (Restored) */}
      <ServicesHorizontal />

    </main>
  );
}
