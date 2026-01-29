'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MousePointer2, ArrowDown, Sparkles } from 'lucide-react';
import BookingCalendar from '@/components/booking/BookingCalendar';
import TransformationShowcase from '@/components/home/TransformationShowcase';
import EducationFAQ from '@/components/home/EducationFAQ';
import ServicesHorizontal from '@/components/home/ServicesHorizontal';
import BackgroundGlow from '@/components/layout/BackgroundGlow';
import HeroBackground from '@/components/home/HeroBackground';
import ProtectionDiagnosis from '@/components/home/ProtectionDiagnosis';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import SectionBackground from '@/components/ui/SectionBackground';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-white selection:bg-indigo-500 selection:text-white">
      <BackgroundGlow />
      <WhatsAppButton />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <SectionBackground
            src="/images/backgrounds/porsche-993.png" // Using a high-quality car image
            opacity={0.6} // Increased opacity for visibility
            overlayColor="bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/30" // Gradient overlay
          />
        </div>

        {/* Subtle Tech Overlay - Kept for "Evo" vibe but reduced */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
          <HeroBackground />
        </div>

        <div className="relative z-10 max-w-5xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-block"
          >
            {/* Logo Brand */}
            <motion.div
              className="relative w-72 md:w-[500px] h-32 mx-auto mb-4"
            >
              <Image
                src="/images/branding/logo.png"
                alt="Evo Wrap Uruguay"
                fill
                className="object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 text-glow"
          >
            ESTÉTICA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400">ABSOLUTA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-2xl text-zinc-300 font-light max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md"
          >
            Ingeniería de protección y diseño automotriz. <br className="hidden md:block" />
            Elevamos el estándar de lo <span className="text-white font-normal italic">"impecable"</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Visualizer Mini-Entry */}
            <Link
              href="/visualizer"
              className="group relative px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 text-white rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 transition-all hover:scale-105 overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <MousePointer2 className="w-4 h-4 text-indigo-400" />
              <span className="relative z-10">Diseñar Mi Auto</span>
            </Link>

            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full bg-white text-black hover:bg-zinc-200 transition-colors uppercase tracking-widest font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
            >
              Ver Servicios <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-white/50"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* 2. SERVICES HORIZONTAL SCROLL */}
      <div id="services" className="relative">
        <SectionBackground
          src="/images/backgrounds/defender-side.png"
          opacity={0.2}
          overlayColor="bg-neutral-950/90"
        />
        <ServicesHorizontal />
      </div>

      {/* 3. DIAGNOSIS (SMART FEATURE) */}
      <section id="diagnosis" className="py-24 px-4 relative z-10">
        <SectionBackground
          src="/images/backgrounds/gr-yaris-interior.png"
          opacity={0.15}
          overlayColor="bg-neutral-950/95"
        />
        <ProtectionDiagnosis />
      </section>

      {/* 4. SHOWCASE SECTION */}
      <section className="py-24 md:py-32 px-4 relative">
        <SectionBackground
          src="/images/backgrounds/porsche-993.png"
          opacity={0.15}
          overlayColor="bg-neutral-950/90"
        />
        <TransformationShowcase />
      </section>

      {/* 5. EDUCATION SECTION */}
      <section className="py-32 bg-neutral-900/30 border-y border-white/5 backdrop-blur-sm relative">
        <SectionBackground
          src="/images/backgrounds/gr-yaris-side.png"
          opacity={0.1}
          overlayColor="bg-neutral-950/95"
        />
        <EducationFAQ />
      </section>

      {/* 6. BOOKING SECTION */}
      <section className="py-32 px-4 relative overflow-hidden">
        <SectionBackground
          src="/images/backgrounds/bmw-interior.png"
          opacity={0.15}
          overlayColor="bg-neutral-950/90"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8 text-left">
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Agenda<br />
              <span className="text-indigo-500">Exclusiva.</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-md">
              Un vehículo a la vez. Sin esperas, sin apuros.
            </p>

            <div className="p-8 bg-zinc-900/50 rounded-3xl border border-white/10 backdrop-blur-xl">
              <button className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition-all shadow-lg hover:shadow-green-900/50 text-lg">
                Escribir a Gonzalo
              </button>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-3xl p-4 border border-white/5 shadow-2xl">
            <BookingCalendar />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
