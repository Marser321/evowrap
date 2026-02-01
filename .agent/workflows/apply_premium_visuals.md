---
description: Apply the "Premium Visuals" design system (Magnetic Scroll, Glassmorphism, Dark Luxury) to a component or page.
---

# Premium Visuals Workflow

This workflow captures the "Evo Wrap" signature style: immersive scroll-linked animations, deep glassmorphism, and high-end dark aesthetics.

## 1. Core Principles
*   **Magnetic Scroll**: Use `sticky top-0` combined with `useScroll` to lock the viewport while content animates.
*   **Dark Glass**: Heavy use of `backdrop-blur-md` or `xl`, low-opacity black backgrounds (`bg-neutral-900/40`), and subtle white borders (`border-white/10`).
*   **Cinematic Typography**: Large, bold headings with drop shadows for legibility over images.
*   **Interactive Glow**: Elements glow `gold` or accent color on hover.

## 2. Dependencies
Ensure these are installed:
```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

## 3. The "Magnetic Scroll" Pattern
Use this template for sections that should feel "locked" and immersive.

```tsx
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function MagneticSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    // 1. Track scroll progress relative to this section
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // 2. Transfrom horizontal position based on vertical scroll
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

    return (
        // 3. Container with huge height to allow scroll time (e.g. 400vh)
        <section ref={targetRef} className="relative h-[400vh] bg-neutral-950">
            
            {/* 4. Sticky Window: Locks the view */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
                
                {/* 5. Moving Track */}
                <motion.div style={{ x }} className="flex gap-10 px-20">
                    <Card title="Card 1" />
                    <Card title="Card 2" />
                    <Card title="Card 3" />
                </motion.div>
                
            </div>
        </section>
    );
}
```

## 4. The "Glass Card" Style
Apply these classes to create the premium glass look.

```tsx
function PremiumCard({ children }) {
    return (
        <div className="
            relative overflow-hidden rounded-3xl 
            border border-white/10 
            bg-neutral-900/40 backdrop-blur-md
            transition-all duration-500
            hover:border-gold-500/50 
            hover:shadow-[0_0_50px_rgba(245,158,11,0.2)]
        ">
            {/* Optional: Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 pointer-events-none" />
            
            {/* Content with high z-index */}
            <div className="relative z-10 p-8">
                {children}
            </div>
        </div>
    )
}
```

## 5. Typography Standards
*   **Headings**: `font-black uppercase tracking-tight`
*   **Subtitles**: `text-gold-500 font-bold tracking-widest uppercase`
*   **Body**: `text-zinc-300 font-light`

## 6. Implementation Checklist
- [ ] Wrap main interactive section in a `h-[300vh+]` container.
- [ ] Use `sticky top-0 h-screen` for the viewport.
- [ ] Map `scrollYProgress` to `x` (horizontal) or `scale`/`opacity` (parallax).
- [ ] Add `stroke-text` or gradients to key headlines.
- [ ] Ensure all text over images has a `bg-gradient-to-t` overlay behind it.
