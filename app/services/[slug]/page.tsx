'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';
import { servicesData } from '@/lib/services-data';
import { ProcessTimeline } from '@/components/services/ProcessTimeline';
import SectionBackground from '@/components/ui/SectionBackground';
import Logo from '@/components/ui/Logo';

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const service = servicesData[slug];

    if (!service) {
        return notFound();
    }

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
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <SectionBackground
                    src={service.heroImage}
                    alt={service.title}
                    opacity={0.5}
                    overlayClassName="bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-black/60"
                    priority={true}
                />

                <div className="container relative z-20 px-4 text-center max-w-4xl mx-auto mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md"
                    >
                        Servicio Premium
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6 uppercase italic tracking-tighter text-white drop-shadow-2xl"
                    >
                        {service.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto"
                    >
                        {service.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Technical Specs & Description */}
            <section className="relative py-20 px-4 md:px-6">
                <SectionBackground
                    src="https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop" // Abstract Car Texture
                    opacity={0.1}
                    overlayClassName="bg-neutral-950/90"
                />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-white uppercase italic">Ciencia aplicada a su vehículo</h2>
                            <p className="text-neutral-400 leading-relaxed text-lg">
                                {service.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4 pt-6">
                                {service.technicalSpecs.map((spec, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-neutral-900/50 border border-white/10 hover:border-gold-500/30 transition-colors backdrop-blur-sm">
                                        <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">{spec.label}</p>
                                        <p className="text-white font-bold">{spec.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                            <img
                                src={service.secondaryImage || service.gallery?.[0] || service.heroImage}
                                alt={`${service.title} detail`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </section>

            {/* The Process Timeline */}
            <div className="relative">
                <SectionBackground
                    src="https://images.unsplash.com/photo-1535732820275-9ffd998cac22?q=80&w=2070&auto=format&fit=crop" // Workshop blurred background
                    opacity={0.05}
                    overlayClassName="bg-neutral-950/95"
                />
                <ProcessTimeline steps={service.process} />
            </div>

            {/* Gallery Section */}
            {service.gallery && service.gallery.length > 0 && (
                <section className="py-20 px-4 relative overflow-hidden">
                    <SectionBackground
                        src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop" // Dark Gallery Background
                        opacity={0.2}
                        overlayClassName="bg-black/80"
                    />

                    <div className="container mx-auto max-w-6xl relative z-10">
                        <h2 className="text-3xl font-bold text-center mb-12 uppercase italic text-white/90">Galería de Resultados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {service.gallery.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group bg-neutral-900"
                                >
                                    <img
                                        src={img}
                                        alt={`Result ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <section className="py-24 px-4 relative">
                <SectionBackground
                    opacity={0.05} // Subtle gradient only
                />

                <div className="container mx-auto max-w-3xl relative z-10">
                    <h2 className="text-3xl font-bold text-center mb-12 uppercase italic">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        {service.faq.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 hover:border-white/20 transition-all backdrop-blur-sm"
                            >
                                <h3 className="text-lg font-bold mb-2 text-white flex items-start gap-3">
                                    <span className="text-gold-500 mt-1"><CheckCircle2 size={16} /></span>
                                    {item.question}
                                </h3>
                                <p className="text-neutral-400 ml-7 text-sm leading-relaxed">
                                    {item.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 text-center px-4 relative">
                <SectionBackground
                    src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1974&auto=format&fit=crop" // Final CTA Background
                    opacity={0.3}
                    overlayClassName="bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent"
                />

                <div className="max-w-3xl mx-auto p-12 rounded-3xl border border-white/10 backdrop-blur-md relative z-10 bg-black/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase italic">¿Listo para transformar su vehículo?</h2>
                    <p className="text-zinc-300 mb-8 text-lg font-light">
                        Agenda una evaluación personalizada. Trabajamos con un número limitado de vehículos por semana.
                    </p>
                    <Link href="/booking" className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold-600 text-black font-extrabold rounded-full overflow-hidden hover:bg-gold-500 transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                        <MessageCircle className="w-5 h-5" />
                        <span>Agendar Diagnóstico</span>
                        <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:scale-105 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Footer Simple */}
            <footer className="py-8 text-center text-neutral-600 text-sm border-t border-white/5 bg-neutral-950 relative z-10">
                <p>© {new Date().getFullYear()} EVO Wrap. Estética Absoluta.</p>
            </footer>
        </main>
    );
}
