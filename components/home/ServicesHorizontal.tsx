'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Droplets } from 'lucide-react';
import ServicesDynamicBackground from './ServicesDynamicBackground';

const services = [
    {
        id: 'ceramic-coating',
        title: 'Tratamiento Cerámico',
        description: 'Brillo espejo y protección molecular.',
        image: '/images/services/ceramic-card.png',
        icon: Droplets,
        color: 'from-cyan-500 to-blue-500'
    },
    {
        id: 'ppf',
        title: 'Paint Protection Film',
        description: 'Blindaje invisible contra impactos.',
        image: '/images/services/ppf-card.png',
        icon: Shield,
        color: 'from-indigo-500 to-purple-500'
    },
    {
        id: 'detailing',
        title: 'Detailing de Interiores',
        description: 'Restauración profunda de cueros y fibras.',
        image: '/images/services/detailing-card.png',
        icon: Sparkles,
        color: 'from-amber-500 to-orange-500'
    }
];

export default function ServicesHorizontal() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Magnetic Scroll Effect: Defined stops for each card + Final CTA (Closer and integrated)
    const x = useTransform(scrollYProgress,
        [0, 0.15, 0.25, 0.45, 0.55, 0.75, 0.85, 1],
        ["1%", "-25%", "-25%", "-55%", "-55%", "-85%", "-85%", "-100%"]
    );

    // Parallax for Title (moves slower than cards)
    const titleX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

    // Synced Text Animations
    const opacityText1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const opacityText2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
    const opacityText3 = useTransform(scrollYProgress, [0.6, 0.75, 0.85, 0.95], [0, 1, 1, 0]);
    const opacityTextCTA = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

    return (
        <section ref={targetRef} className="relative h-[450vh] bg-neutral-950">
            {/* 1. Global Dynamic Background */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <ServicesDynamicBackground scrollYProgress={scrollYProgress} />
            </div>

            {/* 2. Scroll Content */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="sticky top-0 h-screen flex items-center overflow-hidden pointer-events-auto">

                    {/* Horizontal Scroll Track */}
                    <motion.div style={{ x }} className="flex gap-4 md:gap-8 pl-4 md:pl-[10vw] items-center">

                        {/* Intro Title Card */}
                        <motion.div
                            style={{ x: titleX }}
                            className="w-[85vw] md:w-[30vw] shrink-0 pr-4 md:pr-10 relative z-10"
                        >
                            <h2 className="text-4xl md:text-7xl font-black text-white mb-4 leading-tight drop-shadow-lg">
                                Nuestros <br /><span className="text-gold-500 stroke-text">Servicios</span>
                            </h2>
                            <p className="text-white/80 text-base md:text-lg font-light backdrop-blur-sm p-4 rounded-xl border border-white/10 bg-black/20 max-w-md">
                                Desliza para explorar la gama completa de protección y estética de alto nivel.
                            </p>
                            <div className="mt-8 flex items-center gap-4 text-sm font-bold text-white/50">
                                <ArrowRight className="animate-pulse" /> DESLIZA
                            </div>
                        </motion.div>

                        {services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}

                        {/* FINAL CTA SLIDE - Now integrated without extra negative space */}
                        <div className="w-[80vw] md:w-[40vw] h-[60vh] md:h-[70vh] shrink-0 flex flex-col justify-center items-start text-left relative z-20 px-4 md:px-12">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative z-10"
                            >
                                <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-6 leading-none drop-shadow-lg">
                                    ¿Tu Auto <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-amber-300">
                                        Está Listo?
                                    </span>
                                </h2>
                                <p className="text-lg md:text-xl text-neutral-300 mb-8 max-w-md font-light">
                                    El siguiente nivel de estética te espera.
                                </p>
                                <Link
                                    href="/reservar"
                                    className="group relative inline-flex items-center gap-4 px-8 py-4 bg-gold-500 text-black font-bold text-lg uppercase tracking-widest hover:bg-white transition-colors duration-300 rounded-full shadow-[0_0_25px_rgba(245,158,11,0.4)]"
                                >
                                    <span className="relative z-10">Agenda Visita</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>

                    </motion.div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-10 left-10 right-10 md:left-20 md:right-20 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gold-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                        />
                    </div>

                    {/* Dynamic Background Text - Now includes EVOLUTION for the CTA */}
                    <div className="absolute right-10 bottom-24 z-0 pointer-events-none text-right hidden lg:block mix-blend-overlay">
                        <motion.div style={{ opacity: opacityText1 }} className="absolute bottom-0 right-0 w-max">
                            <h3 className="text-9xl font-black text-white/10 uppercase leading-none">Protection</h3>
                        </motion.div>

                        <motion.div style={{ opacity: opacityText2 }} className="absolute bottom-0 right-0 w-max">
                            <h3 className="text-9xl font-black text-white/10 uppercase leading-none">Ceramic</h3>
                        </motion.div>

                        <motion.div style={{ opacity: opacityText3 }} className="absolute bottom-0 right-0 w-max">
                            <h3 className="text-9xl font-black text-white/10 uppercase leading-none">Detailing</h3>
                        </motion.div>

                        <motion.div style={{ opacity: opacityTextCTA }} className="absolute bottom-0 right-0 w-max">
                            <h3 className="text-9xl font-black text-gold-500/20 uppercase leading-none">Evolution</h3>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service }: { service: any }) {
    const Icon = service.icon;
    return (
        <div className="snap-center group relative h-[60vh] md:h-[70vh] w-[85vw] md:w-[40vw] shrink-0 overflow-hidden rounded-3xl border border-white/10 transition-all duration-700 hover:border-gold-500/50 hover:shadow-[0_0_50px_rgba(245,158,11,0.2)] bg-neutral-900/40 backdrop-blur-md">

            {/* 1. Base Glass Layer (Always visible, lets global background through) */}
            <div className="absolute inset-0 bg-white/5 transition-opacity duration-500 group-hover:opacity-0" />

            {/* 2. Specific Service Image (Reveals on Hover) */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${service.image})` }}
            >
                {/* Inner Gradient Overlay for interactions */}
                <div className="absolute inset-0 bg-neutral-950/20 mix-blend-multiply" />
            </div>

            {/* 3. Text Readability Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <div className={`mb-6 inline-flex p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:border-gold-500/50 group-hover:bg-gold-500`}>
                    <Icon className="text-gold-500 w-8 h-8 md:w-10 md:h-10 group-hover:text-black transition-colors duration-300" />
                </div>

                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-none uppercase tracking-tight drop-shadow-md">
                    {service.title}
                </h3>

                <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-sm font-light leading-relaxed group-hover:text-white transition-colors delay-100">
                    {service.description}
                </p>

                <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/20 text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:bg-white group-hover:text-black group-hover:border-white"
                >
                    Ver Detalles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
