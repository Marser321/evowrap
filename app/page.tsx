"use client";

import { motion } from "framer-motion";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import SectionBackground from "@/components/ui/SectionBackground";
import Hero from "@/components/home/Hero";
import TransformationSection from "@/components/home/TransformationSection";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Star } from "lucide-react";
<<<<<<< HEAD
import ServicesHorizontal from "@/components/home/ServicesHorizontal";
=======
import Logo from "@/components/ui/Logo";
>>>>>>> 5d3a3dd062e16b4ccd93d5fd54915dbc09436a13

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-neutral-950 text-white">

      {/* 1. HERO SECTION (Redesigned) */}
      <Hero />

      {/* 2. TRANSFORMATION SECTION (Slider) */}
      <TransformationSection />

<<<<<<< HEAD
      {/* 3. SERVICES HORIZONTAL SCROLL (Restored) */}
      <ServicesHorizontal />
=======
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-6xl font-black uppercase italic mb-4">
              Transformación <span className="text-gold-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">Total</span>
            </h3>
            <p className="text-neutral-400 max-w-xl mx-auto text-lg">
              Desliza para descubrir el cambio radical. De lo estándar a lo extraordinario.
            </p>
          </div>

          <div className="max-w-5xl mx-auto shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl">
            <BeforeAfterSlider
              beforeImage="/images/slider/before.png"
              afterImage="/images/slider/after.png"
              altText="Ferrari Transformation"
              className="aspect-[16/9] md:aspect-[21/9]"
            />
          </div>
        </div>
      </section>

      {/* 3. SERVICES BENTO GRID */}
      <section className="relative py-32 px-6 border-t border-white/5">
        <SectionBackground
          src="https://images.unsplash.com/photo-1605218427306-6354db206fa5?q=80&w=2072&auto=format&fit=crop" // Matte Car Side Profile
          alt="Matte Car Background"
          opacity={0.1}
          overlayClassName="bg-gradient-to-b from-neutral-950 via-neutral-950/95 to-neutral-950"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h3 className="text-4xl md:text-5xl font-black uppercase italic mb-2">
                Servicios <span className="text-neon-lime">Elite</span>
              </h3>
              <p className="text-neutral-400">Soluciones de protección y personalización de clase mundial.</p>
            </div>
            <Link href="/services" className="text-neon-cyan hover:text-white uppercase tracking-widest font-bold text-sm flex items-center gap-2 transition-colors">
              Ver Todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
            {/* Card 1: PPF (Large) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-sm hover:border-white/30 transition-all duration-500"
            >
              {/* Hover Reveal Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
                <SectionBackground
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop" // PPF Detail
                  opacity={0.4}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

              <div className="absolute bottom-0 left-0 p-10 z-20">
                <Shield className="w-12 h-12 text-neon-cyan mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-3xl font-black uppercase italic mb-3">Paint Protection Film</h4>
                <p className="text-neutral-300 max-w-md">Escudo invisible de auto-curación contra impactos, arañazos y elementos ambientales. Garantía de 10 años.</p>
              </div>
            </motion.div>

            {/* Card 2: Wrapping */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-sm hover:border-neon-lime/50 transition-all duration-500"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
                <SectionBackground
                  src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop" // Wrapping
                  opacity={0.4}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <Zap className="w-10 h-10 text-neon-lime mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-2xl font-black uppercase italic mb-2">Color Change</h4>
                <p className="text-neutral-400 text-sm">Personalización total con vinilos premium.</p>
              </div>
            </motion.div>

            {/* Card 3: Ceramic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
                <SectionBackground
                  src="https://images.unsplash.com/photo-1632823471441-28564a51e505?q=80&w=1972&auto=format&fit=crop" // Ceramic Water Beads
                  opacity={0.4}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-8 z-20">
                <Star className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-2xl font-black uppercase italic mb-2">Ceramic Coating</h4>
                <p className="text-neutral-400 text-sm">Brillo extremo y repelencia hidrofóbica.</p>
              </div>
            </motion.div>

            {/* Card 4: Taining / More (Optional filler) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-sm hover:border-white/30 transition-all duration-500 flex items-center justify-center p-6"
            >
              <div className="text-center z-10">
                <h4 className="text-xl font-bold uppercase mb-2">¿Buscas algo más?</h4>
                <Link href="/services" className="px-6 py-2 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all uppercase text-sm font-bold tracking-widest">
                  Ver todos los servicios
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
>>>>>>> 5d3a3dd062e16b4ccd93d5fd54915dbc09436a13

    </main>
  );
}
