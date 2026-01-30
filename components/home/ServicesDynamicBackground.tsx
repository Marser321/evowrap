'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

interface ServicesDynamicBackgroundProps {
    scrollYProgress: MotionValue<number>;
}

const backgroundImages = [
    {
        src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
        alt: "Ceramic Coating Detail",
        position: "center"
    },
    {
        src: "https://images.unsplash.com/photo-1621996659490-6213b5fe48bc?q=80&w=2070&auto=format&fit=crop",
        alt: "PPF Protection",
        position: "center"
    },
    {
        src: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop",
        alt: "Luxury Interior Detailing",
        position: "center center"
    }
];

export default function ServicesDynamicBackground({ scrollYProgress }: ServicesDynamicBackgroundProps) {
    // Opacity Mappings
    // Image 1: Visible initially, fades out as we move to Card 2
    const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);

    // Image 2: Fades in for Card 2, fades out for Card 3
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.6, 0.7], [0, 1, 1, 0]);

    // Image 3: Fades in for Card 3, fades out for Final CTA
    const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 0]);

    const opacities = [opacity1, opacity2, opacity3];

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {backgroundImages.map((img, index) => (
                <motion.div
                    key={index}
                    style={{ opacity: opacities[index] }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
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
