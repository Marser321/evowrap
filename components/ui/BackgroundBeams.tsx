'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function BackgroundBeams({ className }: { className?: string }) {
    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                    rotate: [0, 10, -10, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[20%] -left-[20%] w-[70vw] h-[70vw] bg-indigo-600/20 rounded-full blur-[90px] mix-blend-screen will-change-transform transform-gpu"
            />

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                    rotate: [0, -15, 15, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-cyan-500/10 rounded-full blur-[80px] mix-blend-screen will-change-transform transform-gpu"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
                className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] bg-purple-900/20 rounded-full blur-[110px] mix-blend-screen will-change-transform transform-gpu"
            />
        </div>
    );
}
