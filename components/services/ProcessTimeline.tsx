'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { ProcessStep } from '@/lib/services-data';
import { cn } from '@/lib/utils';
import { Shield, Sparkles, Droplets, Sun, Layers, Microscope, Scan, UserCheck, Zap, LucideIcon } from 'lucide-react';
import SectionBackground from '@/components/ui/SectionBackground';

// Icon Mapping
const iconMap: Record<string, LucideIcon> = {
    Shield,
    Sparkles,
    Droplets,
    Sun,
    Layers,
    Microscope,
    Scan,
    UserCheck,
    Zap
};

interface ProcessTimelineProps {
    steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
    // ... existing code ...
    // ...
    // ...
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <section ref={containerRef} className="relative min-h-[500vh] bg-neutral-950">
            {/* STICKY BACKGROUND SYSTEM */}
            <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
                {steps.map((step, index) => {
                    const start = index / steps.length;
                    const end = (index + 1) / steps.length;

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const opacity = useTransform(scrollYProgress,
                        [start - 0.1, start, end - 0.05, end],
                        [0, 1, 1, 0]
                    );

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const scale = useTransform(scrollYProgress,
                        [start - 0.1, end + 0.1],
                        [1.1, 1]
                    );

                    return (
                        <motion.div
                            key={index}
                            style={{ opacity, scale }}
                            className="absolute inset-0"
                        >
                            <SectionBackground
                                src={step.image || ""}
                                alt={step.title}
                                opacity={0.15} // Dimmed/Tenue as requested
                                overlayClassName="bg-neutral-950/80"
                            />
                        </motion.div>
                    );
                })}

                {/* Global Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950" />
            </div>

            {/* CONTENT LAYER */}
            <div className="relative z-10 -mt-[100vh]">
                <div className="container px-4 md:px-6 max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="h-screen flex flex-col justify-center items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6"
                        >
                            Metodología Evo
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-white mb-8"
                        >
                            El Proceso <span className="text-gold-500">EVO</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-neutral-400 max-w-3xl mx-auto font-light text-xl italic leading-relaxed"
                        >
                            Ingeniería y precisión en cada etapa. No saltamos pasos; cada detalle es auditado para garantizar un resultado de exhibición absoluta.
                        </motion.p>
                    </div>

                    <div className="relative pb-[50vh]">
                        {/* Central Golden Thread */}
                        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[1px] md:-translate-x-1/2 bg-white/5 h-full rounded-full">
                            <motion.div
                                style={{ scaleY, transformOrigin: 'top' }}
                                className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-500 via-amber-600 to-transparent origin-top h-full shadow-[0_0_20px_rgba(245,158,11,0.6)]"
                            />
                        </div>

                        {/* Timeline Items */}
                        <div className="space-y-[30vh]">
                            {steps.map((step, index) => (
                                <TimelineItem
                                    key={index}
                                    step={step}
                                    index={index}
                                    total={steps.length}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ step, index, total }: { step: ProcessStep; index: number; total: number }) {
    const isEven = index % 2 === 0;
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'center center'],
    });

    // Elegant motion values
    const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 0.5, 1, 1]);
    const x = useTransform(scrollYProgress, [0, 1], [isEven ? -50 : 50, 0]); // Reduced movement to stay inside
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const rotateY = useTransform(scrollYProgress, [0, 1], [isEven ? -10 : 10, 0]);

    // Dynamic coloring based on proximity
    const accentColor = useTransform(scrollYProgress, [0.7, 1], ["rgba(255, 255, 255, 0.1)", "rgba(245, 158, 11, 1)"]);
    const cardBg = useTransform(scrollYProgress, [0.7, 1], ["rgba(255, 255, 255, 0.02)", "rgba(255, 255, 255, 0.05)"]);

    const Icon = iconMap[step.icon as string] || Sparkles;

    return (
        <motion.div
            ref={ref}
            style={{ opacity, x, scale, perspective: 1000, rotateY }}
            className={cn(
                "relative flex items-center md:items-center gap-8 md:gap-0",
                isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}
        >
            {/* Timeline Node */}
            <div className="absolute left-[20px] md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full border border-white/20 bg-neutral-950 z-20 flex items-center justify-center">
                <motion.div
                    style={{ backgroundColor: accentColor }}
                    className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                />
            </div>

            {/* Step Counter (Desktop) */}
            <div className={cn(
                "hidden md:flex md:w-1/2 items-center",
                isEven ? "justify-end pr-16" : "justify-start pl-16"
            )}>
                <span className="text-[12rem] font-black text-white/[0.03] italic select-none">
                    0{index + 1}
                </span>
            </div>

            {/* Glass Card */}
            <div className="pl-10 md:pl-0 w-full md:w-5/12">
                <motion.div
                    style={{ backgroundColor: cardBg, borderColor: accentColor }}
                    className="group relative p-6 md:p-10 rounded-[40px] border border-white/5 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] transition-all duration-700 overflow-hidden"
                >
                    {/* Card Scan Line Effect */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-center" />

                    {/* Step Image (New - Fixes "No Photos" issue) */}
                    <div className="relative h-48 w-full mb-6 rounded-2xl overflow-hidden border border-white/10 shadow-inner group-hover:scale-[1.02] transition-transform duration-500 bg-neutral-900">
                        {step.image ? (
                            <Image
                                src={step.image}
                                alt={step.title}
                                fill
                                className="object-cover"
                                sizes="(max-w-768px) 100vw, 33vw"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                                <Icon className="text-white/20" size={48} />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    <div className="flex items-center gap-5 mb-6">
                        <div className="p-4 rounded-[20px] bg-white/5 text-gold-500 border border-white/10 group-hover:bg-gold-500 group-hover:text-black transition-all duration-500 flex-shrink-0">
                            <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-white leading-[0.9]">
                                {step.title}
                            </h3>
                            <div className="w-10 h-[2px] bg-gold-500 mt-3 opacity-60" />
                        </div>
                    </div>

                    <p className="text-neutral-400 leading-relaxed font-light text-base md:text-lg italic">
                        {step.description}
                    </p>

                    {/* Step Number (Mobile only) */}
                    <span className="absolute -top-4 -right-4 text-4xl font-black text-white/5 italic md:hidden">0{index + 1}</span>
                </motion.div>
            </div>
        </motion.div>
    );
}
