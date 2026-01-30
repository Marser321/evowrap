'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

interface ServicesDynamicBackgroundProps {
    scrollYProgress: MotionValue<number>;
    images: string[];
}

export default function ServicesDynamicBackground({ scrollYProgress, images }: ServicesDynamicBackgroundProps) {
    // Opacity Mappings
    // Image 1: Visible initially, fades out as we move to Card 2
    const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);

    // Image 2: Fades in for Card 2
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);

    // Image 3: Fades in for Card 3
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.7, 0.8], [0, 1, 1, 0]);

    // Image 4: Fades in for Card 4 (New)
    const opacity4 = useTransform(scrollYProgress, [0.7, 0.8, 1, 1], [0, 1, 1, 1]);

    const opacities = [opacity1, opacity2, opacity3, opacity4];

    // Ensure we have 4 images or fallback
    const displayImages = images.length >= 4 ? images : [...images, ...images]; // naive fallback

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {displayImages.slice(0, 4).map((src, index) => (
                <motion.div
                    key={index}
                    style={{ opacity: opacities[index] }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={src}
                        alt={`Service Background ${index}`}
                        fill
                        className="object-cover transition-transform duration-[2s] ease-out scale-105"
                        quality={80}
                        priority={index === 0} // Prioritize first image
                        sizes="100vw"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/50 to-neutral-950/30" />

                    {/* Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
                </motion.div>
            ))}

            {/* Global Texture Overlay */}
            <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
        </div>
    );
}
