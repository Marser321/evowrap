'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, MessageCircle, ChevronDown } from 'lucide-react';
import { ProcessTimeline } from '@/components/services/ProcessTimeline';
import SectionBackground from '@/components/ui/SectionBackground';
import Logo from '@/components/ui/Logo';
import { ServiceData } from '@/lib/services-data';

interface ServiceDetailClientProps {
    service: ServiceData;
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
    return (
        <main className="min-h-screen bg-neutral-950 text-white selection:bg-gold-500 selection:text-black">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <Link
                    href="/"
                    className="pointer-events-auto flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/20"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Volver</span>
                </Link>

                <div className="hidden md:block">
                    <Logo className="h-6 w-auto text-white/80" />
                </div>

                <div className="w-[88px] md:hidden" /> {/* Spacer for centering if needed */}
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <SectionBackground
                    src={service.heroImage}
                    alt={service.title}
                    opacity={0.4}
                    overlayClassName="bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-black/40"
                    priority={true}
                />

                <div className="container relative z-20 px-4 text-center max-w-5xl mx-auto mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block mb-6 px-6 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] backdrop-blur-xl"
                    >
                        Ingeniería de Detalle
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 100,
                            delay: 0.1
                        }}
                        className="text-4xl md:text-9xl font-black mb-8 uppercase italic tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] leading-[0.9]"
                    >
                        {service.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-3xl text-neutral-300 font-light leading-relaxed max-w-3xl mx-auto italic"
                    >
                        {service.subtitle}
                    </motion.p>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gold-500 z-20"
                >
                    <ChevronDown size={32} strokeWidth={1} />
                </motion.div>
            </section>

            {/* Technical Specs & Description */}
            <section className="relative py-32 px-4 md:px-6 overflow-hidden">
                <SectionBackground
                    src={service.secondaryImage || service.gallery?.[0]}
                    opacity={0.15}
                    overlayClassName="bg-neutral-950/95"
                />

                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            <div className="space-y-6">
                                <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
                                    Ciencia aplicada <br /><span className="text-gold-500">al Automóvil</span>
                                </h2>
                                <p className="text-neutral-400 leading-relaxed text-lg md:text-xl font-light">
                                    {service.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                                {service.technicalSpecs.map((spec, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-6 rounded-[32px] bg-white/5 border border-white/10 hover:border-gold-500/40 transition-all backdrop-blur-xl group"
                                    >
                                        <p className="text-gold-500 text-[10px] uppercase font-black tracking-widest mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            {spec.label}
                                        </p>
                                        <p className="text-white font-bold text-xl">{spec.value}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-square md:aspect-[4/5] rounded-[50px] overflow-hidden border border-white/10 group shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                        >
                            <img
                                src={service.secondaryImage || service.gallery?.[0] || service.heroImage}
                                alt={`${service.title} detail`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* The Process Timeline */}
            <div className="relative">
                <ProcessTimeline steps={service.process} />
            </div>

            {/* Gallery Section */}
            {service.gallery && service.gallery.length > 0 && (
                <section className="py-32 px-4 relative overflow-hidden bg-neutral-950">
                    <div className="container mx-auto max-w-7xl relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div>
                                <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-white">Galería de <span className="text-gold-500">Resultados</span></h2>
                                <p className="text-neutral-500 mt-4 text-lg font-light italic">Perfección capturada en detalle.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {service.gallery.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative aspect-video md:aspect-square rounded-[40px] overflow-hidden border border-white/10 group bg-neutral-900 shadow-2xl"
                                >
                                    <img
                                        src={img}
                                        alt={`Result ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gold-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                                        <p className="text-white font-black uppercase text-xs tracking-widest italic">Detalle Evo 0{idx + 1}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <section className="py-32 px-4 relative bg-neutral-950">
                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">Preguntas <span className="text-gold-500 text-outline-white">Frecuentes</span></h2>
                        <div className="w-20 h-1 bg-gold-500 mx-auto" />
                    </div>

                    <div className="space-y-6">
                        {service.faq.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-[32px] bg-white/5 border border-white/5 hover:border-gold-500/20 transition-all backdrop-blur-xl group"
                            >
                                <h3 className="text-xl md:text-2xl font-black mb-4 text-white flex items-center gap-4">
                                    <span className="w-2 h-2 rounded-full bg-gold-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                                    {item.question}
                                </h3>
                                <p className="text-neutral-400 font-light text-lg leading-relaxed pl-6 border-l border-white/5">
                                    {item.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 text-center px-4 relative">
                <SectionBackground
                    src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop"
                    opacity={0.5}
                    overlayClassName="bg-gradient-to-b from-neutral-950 via-neutral-950/60 to-black/95"
                />

                <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[60px] border border-white/10 backdrop-blur-3xl relative z-10 bg-black/40 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="relative z-10"
                    >
                        <h2 className="text-5xl md:text-8xl font-black mb-8 uppercase italic tracking-tighter leading-none">¿Su Vehículo <br /><span className="text-gold-500">Merece esto?</span></h2>
                        <p className="text-zinc-300 mb-12 text-xl md:text-2xl font-light italic">
                            Agenda una evaluación personalizada. <br />Cupos limitados por semana.
                        </p>
                        <Link href="/booking" className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-gold-600 text-black font-black uppercase tracking-[0.2em] rounded-full overflow-hidden hover:bg-gold-500 transition-all shadow-[0_20px_50px_rgba(245,158,11,0.4)]">
                            <MessageCircle className="w-6 h-6" />
                            <span>Agendar Diagnóstico</span>
                            <div className="absolute inset-0 rounded-full ring-4 ring-white/10 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                        </Link>
                    </motion.div>

                    {/* Animatedbg circles */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-500/10 blur-[100px] rounded-full" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />
                </div>
            </section>


        </main>
    );
}
