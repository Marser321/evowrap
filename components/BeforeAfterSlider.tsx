"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
    beforeImage: string;
    afterImage: string;
    altText: string;
    className?: string;
}

export default function BeforeAfterSlider({
    beforeImage,
    afterImage,
    altText,
    className
}: BeforeAfterSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
        setSliderPosition(percent);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        handleMove(e.clientX);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        handleMove(e.touches[0].clientX);
    };

    const handleInteractionStart = () => setIsDragging(true);
    const handleInteractionEnd = () => setIsDragging(false);

    return (
        <div
            className={cn(
                "relative w-full aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-2xl select-none group cursor-ew-resize",
                className
            )}
            ref={containerRef}
            onMouseDown={handleInteractionStart}
            onMouseUp={handleInteractionEnd}
            onMouseLeave={handleInteractionEnd}
            onMouseMove={handleMouseMove}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            onTouchMove={handleTouchMove}
        >
            {/* Imagen 'Antes' (Fondo base - Original) */}
            <div className="absolute inset-0">
                <Image
                    src={beforeImage}
                    alt={`${altText} - Antes`}
                    fill
                    className="object-cover"
                    priority
                    draggable={false}
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 z-10">
                    <span className="text-xs font-bold text-white uppercase tracking-widest">
                        Pintura Original
                    </span>
                </div>
            </div>

            {/* Imagen 'Después' (Máscara recortada - Resultado) */}
            <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                initial={false}
            >
                <Image
                    src={afterImage}
                    alt={`${altText} - Después`}
                    fill
                    className="object-cover"
                    priority
                    draggable={false}
                />

                {/* Etiqueta 'Después' */}
                <div className="absolute top-4 right-4 bg-gold-500/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                    <span className="text-xs font-bold text-black uppercase tracking-widest">
                        Evo Wrap Finish
                    </span>
                </div>
            </motion.div>

            {/* Línea divisoria y manija */}
            <div
                className="absolute inset-y-0 w-1 bg-gradient-to-b from-transparent via-gold-500 to-transparent z-20 pointer-events-none shadow-[0_0_20px_rgba(245,158,11,0.8)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-black/80 border border-gold-500/50 rounded-full flex items-center justify-center backdrop-blur-lg shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-transform hover:scale-110">
                    <div className="absolute inset-0 rounded-full bg-gold-500/20 animate-ping" />
                    <MoveHorizontal className="w-6 h-6 text-gold-500 relative z-10" />
                </div>
            </div>
        </div>
    );
}
