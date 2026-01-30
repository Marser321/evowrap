'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HeroBackgroundProps {
    src: string;
    alt: string;
}

export default function HeroBackground({ src, alt }: HeroBackgroundProps) {
    // Parallax Logic
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]); // Scroll Parallax

    // Mouse Parallax Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            // Calculate percentage from center (-0.5 to 0.5)
            const xPct = (e.clientX / innerWidth) - 0.5;
            const yPct = (e.clientY / innerHeight) - 0.5;

            // Move background slightly opposite to mouse
            mouseX.set(xPct * -30);
            mouseY.set(yPct * -30);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <motion.div
                className="relative w-full h-full scale-110" // Initial scale to allow for movement without edges showing
                style={{
                    y, // Scroll movement
                    x: springX, // Mouse X movement
                    translateY: springY // Mouse Y movement (using translateY to avoid conflict with y)
                }}
            >
                {/* Ken Burns Effect Layer */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    animate={{
                        scale: [1, 1.15],
                    }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                >
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover object-center opacity-70"
                        priority
                        quality={90}
                    />
                </motion.div>
            </motion.div>

            {/* Cinematic Gradient Overlays */}
            {/* 1. Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

            {/* 2. Bottom Fade for Text Readability */}
            <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

            {/* 3. Gold Atmospheric Glow (Subtle) */}
            <div className="absolute inset-0 bg-gold-500/5 mix-blend-overlay pointer-events-none" />

            {/* 4. Film Noise Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 mix-blend-overlay pointer-events-none" />
        </div>
    );
}
