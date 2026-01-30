'use client';

import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import SectionBackground from '@/components/ui/SectionBackground';
import { cn } from '@/lib/utils';

export default function TransformationSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse Interaction for 3D Tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Animation Variants
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const slamIn: Variants = {
        hidden: { scale: 3, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.6, ease: "circOut", delay: 0.2 }
        }
    };

    return (
        <section id="transformation" className="relative py-32 px-6 overflow-hidden perspective-[1200px]">
            {/* Background with Spotlight Effect */}
            <div className="absolute inset-0 z-0">
                <SectionBackground
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop"
                    alt="Garage Texture Background"
                    opacity={0.15}
                    overlayClassName="bg-neutral-950/90"
                />
                {/* Dynamic Spotlight Follower (simplified for performance) */}
                <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(245,158,11,0.05),transparent)] pointer-events-none"
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Headers */}
                <div className="text-center mb-16 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <motion.h3
                            variants={fadeUp}
                            className="text-4xl md:text-6xl font-black uppercase italic mb-4"
                        >
                            Transformación
                        </motion.h3>

                        <motion.div variants={slamIn} className="relative inline-block">
                            <span className="text-6xl md:text-8xl font-black uppercase italic text-gold-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]">
                                TOTAL
                            </span>
                            {/* Sparks / Energy Burst */}
                            <motion.div
                                className="absolute -inset-10 bg-gold-500/20 blur-3xl -z-10 rounded-full"
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            />
                        </motion.div>

                        <motion.p
                            variants={fadeUp}
                            transition={{ delay: 0.6 }}
                            className="text-neutral-400 max-w-xl mx-auto text-lg mt-8"
                        >
                            Desliza para descubrir el cambio radical. De lo estándar a lo extraordinario.
                        </motion.p>
                    </motion.div>
                </div>

                {/* 3D Slider Container */}
                <motion.div
                    className="relative max-w-5xl mx-auto"
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    initial={{ opacity: 0, y: 100, rotateX: 20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, type: "spring" }}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d" // Enables 3D for children
                    }}
                >
                    {/* Shadow Layer that mimics depth */}
                    <div className="absolute -inset-4 bg-gold-500/10 blur-[50px] rounded-[30px] -z-10 opacity-60" />

                    <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] border border-white/10 bg-neutral-900 group-hover:border-gold-500/30 transition-colors duration-500">
                        <BeforeAfterSlider
                            beforeImage="/images/slider/before.png"
                            afterImage="/images/slider/after.png"
                            altText="Ferrari Transformation"
                            className="aspect-[16/9] md:aspect-[21/9]"
                        />
                    </div>

                    {/* Tech Accents / "Scan Lines" */}
                    <div className="absolute top-0 right-0 p-4 opacity-50 pointer-events-none">
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-gold-500 rounded-full animate-ping" />
                            <div className="text-[10px] font-mono text-gold-500 uppercase tracking-widest">Live View</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
