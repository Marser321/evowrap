'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';

const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/#services' },
    { name: 'Diágnostico', href: '/#diagnosis' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const { scrollY } = useScroll();

    // Header opacity logic
    const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
    const headerBlur = useTransform(scrollY, [0, 100], [0, 12]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled ? "py-3" : "py-6"
            )}
        >
            {/* Glass Background Layer */}
            <motion.div
                className="absolute inset-0 bg-black/40 border-b border-white/10"
                style={{ opacity: headerOpacity, backdropFilter: `blur(${headerBlur}px)` }}
            />

            <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-2">
                    <Logo variant="header" className="h-full w-auto" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium tracking-widest uppercase transition-all duration-300 relative group",
                                pathname === item.href ? "text-white" : "text-zinc-400 hover:text-white"
                            )}
                        >
                            {item.name}
                            <span className={cn(
                                "absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full",
                                pathname === item.href ? "w-full" : ""
                            )} />
                        </Link>
                    ))}
                    <Link
                        href="/booking"
                        className="px-6 py-2 bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        Reservar
                    </Link>
                </nav>

                {/* Mobile Menu Button - Placeholder */}
                <Link href="/booking" className="md:hidden px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg font-bold text-xs uppercase backdrop-blur-sm">
                    Reservar
                </Link>
            </div>
        </motion.header>
    );
}
