'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export default function TransformationShowcase() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;

        const { left, width } = containerRef.current.getBoundingClientRect();
        const pageX = 'touches' in event ? event.touches[0].pageX : (event as React.MouseEvent).pageX;

        let newPos = ((pageX - left) / width) * 100;
        newPos = Math.max(0, Math.min(100, newPos));

        setSliderPosition(newPos);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove as any);
            window.addEventListener('touchmove', handleMove as any);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMove as any);
            window.removeEventListener('touchmove', handleMove as any);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMove as any);
            window.removeEventListener('touchmove', handleMove as any);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gold-500 font-bold text-xs uppercase tracking-widest mb-6"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>Resultado Épico</span>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                    Antes vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600">Después</span>
                </h2>
                <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                    Desliza para ver la transformación completa. De un acabado estándar a una protección de nivel concurso.
                </p>
            </div>

            <div
                ref={containerRef}
                className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-col-resize group select-none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                onClick={handleMove}
            >
                {/* AFTER Image (Background) */}
                <div className="absolute inset-0">
                    <img
                        src="/images/showcase/after-caliper.jpg"
                        alt="After"
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                    <div className="absolute top-8 right-8 px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-white font-bold uppercase tracking-widest text-sm pointer-events-none">
                        Después
                    </div>
                </div>

                {/* BEFORE Image (Clipped) */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                >
                    <img
                        src="/images/showcase/before-caliper.jpg"
                        alt="Before"
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                    <div className="absolute top-8 left-8 px-4 py-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-white font-bold uppercase tracking-widest text-sm pointer-events-none">
                        Antes
                    </div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95">
                        <MoveHorizontal className="w-6 h-6 text-black" />
                    </div>
                </div>
            </div>
        </div>
    );
}
