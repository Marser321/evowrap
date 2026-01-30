'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroBackground from './HeroBackground';
import GoldParticles from '@/components/ui/GoldParticles';
import { Logo } from '@/components/Logo';

// Animation Variants
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.5
        }
    }
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100
        }
    }
};

const letterContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.8
        }
    }
};

const letterAnimation: Variants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    show: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            damping: 15,
            stiffness: 200
        }
    }
};

const TitleLetters = ({ text, className }: { text: string, className?: string }) => (
    <motion.span
        variants={letterContainer}
        initial="hidden"
        animate="show"
        className={className}
    >
        {text.split("").map((char, index) => (
            <motion.span key={index} variants={letterAnimation} className="inline-block">
                {char === " " ? "\u00A0" : char}
            </motion.span>
        ))}
    </motion.span>
);

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-neutral-950">
            {/* 1. Cinematic Background Layer */}
            <HeroBackground
                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                alt="Luxury Sports Car in Dark Studio"
            />

            {/* 2. Atmosphere Layer */}
            <GoldParticles />

            {/* 3. Content Layer */}
            <div className="relative z-20 text-center max-w-6xl px-6 w-full">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center"
                >
                    {/* Logo */}
                    <motion.div variants={fadeInUp} className="mb-8 md:mb-12">
                        <div className="w-[80vw] max-w-[300px] md:max-w-[500px] h-auto mx-auto relative group">
                            {/* Glow Effect behind logo */}
                            <div className="absolute inset-0 bg-gold-500/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <Logo className="w-full text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                        </div>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.h2
                        variants={fadeInUp}
                        className="text-gold-500 text-sm md:text-xl font-bold tracking-[0.5em] md:tracking-[0.8em] uppercase mb-6 md:mb-10 pl-[5px]"
                    >
                        Automotive Luxury
                    </motion.h2>

                    {/* Main Title - Split for impact */}
                    <div className="flex flex-col items-center justify-center mb-12 md:mb-16">
                        <motion.span
                            variants={fadeInUp}
                            className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter text-white leading-[0.9] mb-2 md:mb-4"
                        >
                            REINVENTA
                        </motion.span>

                        {/* Gradient Text for "TU VEHÍCULO" */}
                        <motion.span
                            variants={fadeInUp}
                            className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500 text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]"
                        >
                            TU VEHÍCULO
                        </motion.span>
                    </div>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center w-full"
                    >
                        <Link
                            href="/booking"
                            className="relative overflow-hidden group bg-gold-500 text-black font-extrabold px-10 py-5 rounded-full text-lg uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Cotizar Proyecto <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            {/* Button Shine Effect */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                        </Link>

                        <Link
                            href="#transformation"
                            className="group px-10 py-5 rounded-full border border-white/20 bg-white/5 text-white font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-black hover:border-white backdrop-blur-sm"
                        >
                            Ver Resultados
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 z-20 text-white/30 flex flex-col items-center gap-2"
            >
                <div className="text-[10px] uppercase tracking-[0.3em]">Scroll</div>
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
            </motion.div>
        </section>
    );
}
