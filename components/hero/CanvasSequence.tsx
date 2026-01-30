'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface CanvasSequenceProps {
    frameCount: number;
    framePath: (index: number) => string;
}

export default function CanvasSequence({ frameCount, framePath }: CanvasSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Map scroll (0-1) to frame index (0 - frameCount-1)
    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        // Preload images
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        // Initialize array with image objects
        for (let i = 0; i < frameCount; i++) {
            imgArray.push(new Image());
        }
        setImages(imgArray);

        let isMounted = true;

        const loadImages = async () => {
            const concurrency = 6;
            let index = 0;
            const activePromises: Promise<void>[] = [];

            const loadNext = (): Promise<void> => {
                if (index >= frameCount) return Promise.resolve();

                const currentIndex = index++;
                const img = imgArray[currentIndex];

                return new Promise<void>((resolve) => {
                    img.onload = () => {
                        if (!isMounted) return;
                        loadedCount++;
                        if (loadedCount === frameCount) setIsLoaded(true);
                        resolve();
                    };
                    img.onerror = () => {
                        if (!isMounted) return;
                        // Count errors as loaded to allow completion
                        loadedCount++;
                        if (loadedCount === frameCount) setIsLoaded(true);
                        resolve();
                    };
                    img.src = framePath(currentIndex);
                }).then(() => {
                    // When one finishes, try to load next if any left
                    return loadNext();
                });
            };

            // Start initial batch
            for (let i = 0; i < concurrency; i++) {
                activePromises.push(loadNext());
            }

            await Promise.all(activePromises);
        };

        loadImages();

        return () => {
            isMounted = false;
        };
    }, [frameCount, framePath]);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[index];

        // Resize canvas to window size for high DPI
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;

        // Maintain aspect ratio
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }, [images]);

    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (isLoaded) {
            renderFrame(Math.floor(latest));
        }
    });

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded) renderFrame(0);
    }, [isLoaded, renderFrame]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-white z-50">
                        <span className="animate-pulse text-2xl font-bold tracking-widest">
                            EVO WRAP EXPERIENCE LOADING...
                        </span>
                    </div>
                )}

                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Hero Overlay Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                    <h1 className="text-6xl md:text-9xl font-extrabold text-white tracking-tighter mix-blend-difference">
                        EVO WRAP
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 mt-4 tracking-widest uppercase">
                        Transformación Automotriz
                    </p>
                </div>
            </div>
        </div>
    );
}
