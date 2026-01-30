'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Droplets, Sparkles, Zap, ChevronDown } from 'lucide-react';
import SectionBackground from '@/components/ui/SectionBackground';

const services = [
    {
        id: 'ceramic-coating',
        title: 'Tratamiento Cerámico',
        subtitle: 'Protección Molecular Gtechniq',
        description: 'Crea una barrera química permanente que se une a la pintura de su vehículo. Proporciona resistencia extrema a químicos, rayos UV y suciedad con un brillo de exhibición.',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop', // Lamborghini Detail (Gloss)
        icon: Droplets,
        stats: ['9H Dureza', '5 Años Garantía', 'Efecto Espejo']
    },
    {
        id: 'ppf',
        title: 'Paint Protection Film',
        subtitle: 'Blindaje Invisible Autorregenerativo',
        description: 'La única protección real contra impactos de piedras, raspones y vandalismo. Película de poliuretano termoplástico que se cura sola con el calor.',
        image: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?q=80&w=2070&auto=format&fit=crop', // Silver Audi Sport (Clean/Protected look)
        icon: Shield,
        stats: ['200 micrones', 'Self-Healing', '10 Años Garantía']
    },
    {
        id: 'wrapping',
        title: 'Vinyl Wrapping',
        subtitle: 'Transformación de Color Premium',
        description: 'Personalización total sin comprometer la pintura original. Cientos de acabados: mate, satinado, cromo o texturizados con materiales de grado automotriz.',
        image: 'https://images.unsplash.com/photo-1554223090-7e482851df45?q=80&w=2003&auto=format&fit=crop', // Satin Grey Ferrari (Wrap look)
        icon: Zap,
        stats: ['Reversible', 'Protección UV', '+500 Colores']
    },
    {
        id: 'detailing',
        title: 'Elite Detailing',
        subtitle: 'Restauración Profunda de Habitáculo',
        description: 'Revivimos el interior de su vehículo con vapor a alta presión y química enzimática. Eliminación de bacterias, olores y restauración de cueros.',
        image: 'https://images.unsplash.com/photo-1594503723307-e432a688b75f?q=80&w=2062&auto=format&fit=crop', // Ultra Clean Shiny Sports Car
        icon: Sparkles,
        stats: ['Desinfección Ozono', 'Acabado Factory', 'Cuero Nutrido']
    }
];

const introImage = "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2070&auto=format&fit=crop"; // Mercedes Sport Front
const ctaImage = "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop"; // Porsche Front Gold/Silver

export default function ServicesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 30,
        restDelta: 0.001
    });

    // Total content: Intro (1) + Services (4) + CTA (1) = 6 Sections
    const totalSections = 6;

    return (
        <main ref={containerRef} className="relative bg-neutral-950 min-h-[600vh]">
            {/* STICKY BACKGROUND SYSTEM */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* 1. Intro Background */}
                <motion.div
                    style={{
                        opacity: useTransform(smoothProgress, [0, 0.15], [1, 0]),
                        scale: useTransform(smoothProgress, [0, 0.15], [1, 1.1])
                    }}
                    className="absolute inset-0"
                >
                    <SectionBackground
                        src={introImage}
                        alt="Evo Wrap Luxury Intro"
                        opacity={0.6}
                        overlayClassName="bg-gradient-to-b from-black/80 via-black/20 to-black/95"
                        priority
                    />
                </motion.div>

                {/* 2. Services Backgrounds */}
                {services.map((service, index) => {
                    const start = (index + 1) / totalSections;
                    const end = (index + 2) / totalSections;

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const opacity = useTransform(smoothProgress,
                        [start - 0.1, start, end - 0.05, end],
                        [0, 1, 1, 0]
                    );

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const scale = useTransform(smoothProgress,
                        [start - 0.1, end + 0.1],
                        [1.1, 1.0]
                    );

                    // Reduced blur for premium clarity
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const blur = useTransform(smoothProgress,
                        [start - 0.1, start, end - 0.05, end + 0.1],
                        ["4px", "0px", "0px", "4px"]
                    );

                    return (
                        <motion.div
                            key={service.id}
                            style={{ opacity, scale, filter: `blur(${blur})` }}
                            className="absolute inset-0"
                        >
                            <SectionBackground
                                src={service.image}
                                alt={service.title}
                                opacity={0.6}
                                overlayClassName="bg-gradient-to-b from-black/90 via-black/30 to-black/95"
                            />
                        </motion.div>
                    );
                })}

                {/* 3. CTA Background */}
                <motion.div
                    style={{
                        opacity: useTransform(smoothProgress, [0.85, 1], [0, 1]),
                        scale: useTransform(smoothProgress, [0.85, 1], [1.1, 1])
                    }}
                    className="absolute inset-0"
                >
                    <SectionBackground
                        src={ctaImage}
                        alt="Ready for change"
                        opacity={0.6}
                        overlayClassName="bg-gradient-to-t from-black via-black/40 to-black/90"
                    />
                </motion.div>

                {/* Progress Indicators */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50 hidden md:flex">
                    {[0, 1, 2, 3].map((index) => {
                        const start = (index + 1) / totalSections;
                        const end = (index + 2) / totalSections;
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const progress = useTransform(smoothProgress, [start, end], ["0%", "100%"]);

                        return (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-1 h-16 bg-white/5 rounded-full relative overflow-hidden">
                                    <motion.div
                                        style={{ height: progress }}
                                        className="absolute top-0 left-0 w-full bg-gold-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]"
                                    />
                                </div>
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest vertical-text">
                                    0{index + 1}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* SCROLLING CONTENT LAYERS */}
            <div className="relative z-30">
                {/* 0. Intro Hero Section */}
                <section className="h-screen flex flex-col items-center justify-center px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-6">
                            Nuestra <br /><span className="text-gold-500 stroke-text-gold">Expertise</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-light mb-12 mx-auto">
                            Ingeniería y arte combinados para la protección definitiva de su inversión automotriz.
                        </p>
                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-gold-500"
                        >
                            <ChevronDown size={40} strokeWidth={1} />
                        </motion.div>
                    </motion.div>
                </section>

                {/* 1-4. Service Cards Sections */}
                {services.map((service, index) => (
                    <section
                        key={service.id}
                        className="h-screen flex items-center justify-center md:items-center md:justify-start px-6 md:px-[15vw]"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -100, scale: 0.9, rotateY: -15 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                            viewport={{ margin: "-25%", once: false }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 80,
                                duration: 1
                            }}
                            className="relative max-w-2xl bg-black/60 backdrop-blur-3xl p-8 md:p-14 rounded-[50px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] group overflow-hidden"
                        >
                            {/* Golden Scan Line Effect */}
                            <motion.div
                                initial={{ top: "-100%" }}
                                whileInView={{ top: "200%" }}
                                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                                className="absolute left-0 right-0 h-[200px] bg-gradient-to-b from-transparent via-gold-500/10 to-transparent -rotate-12 pointer-events-none"
                            />

                            <div className="flex items-center gap-6 mb-8">
                                <motion.div
                                    whileHover={{ rotate: 15, scale: 1.1 }}
                                    className="p-5 bg-gold-500 rounded-3xl text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                                >
                                    <service.icon size={40} />
                                </motion.div>
                                <div>
                                    <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white">
                                        {service.title}
                                    </h2>
                                    <p className="text-gold-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm mt-3">
                                        {service.subtitle}
                                    </p>
                                </div>
                            </div>

                            <p className="text-lg md:text-2xl text-zinc-300 font-light leading-relaxed mb-10">
                                {service.description}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                                {service.stats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + (i * 0.1) }}
                                        className="flex flex-col"
                                    >
                                        <div className="h-[2px] w-8 bg-gold-500 mb-3" />
                                        <span className="text-white font-black text-xs md:text-sm uppercase tracking-wider">{stat}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <Link
                                    href={`/services/${service.id}`}
                                    className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-gold-500 transition-all duration-300 hover:scale-105 shadow-xl"
                                >
                                    <span className="relative z-10">Detalles Técnicos</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                                    <div className="absolute inset-0 bg-gold-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </Link>
                                <Link
                                    href="/booking"
                                    className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
                                >
                                    Solicitar Turno
                                </Link>
                            </div>
                        </motion.div>
                    </section>
                ))}

                {/* 5. Final Call to Action Section */}
                <section className="h-screen flex flex-col items-center justify-center px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <h2 className="text-5xl md:text-9xl font-black uppercase italic tracking-tighter mb-12 leading-none">
                            ¿Su Vehículo <br /><span className="text-gold-500">Es el Próximo?</span>
                        </h2>
                        <Link
                            href="/booking"
                            className="relative group px-16 py-8 bg-gold-600 text-black font-black uppercase text-2xl tracking-[0.2em] rounded-full hover:bg-gold-500 transition-all shadow-[0_30px_100px_rgba(245,158,11,0.5)] block md:inline-block"
                        >
                            Empezar Proyecto
                            <motion.div
                                className="absolute -inset-2 border border-gold-500/50 rounded-full"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </Link>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}
