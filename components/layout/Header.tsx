'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const navItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Servicios', href: '/services' },
    { name: 'Diagnóstico', href: '/booking' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { scrollY } = useScroll();

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

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

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-white z-50 relative"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
                        >
                            <nav className="flex flex-col items-center gap-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "text-2xl font-medium tracking-widest uppercase transition-colors duration-300",
                                            pathname === item.href ? "text-white" : "text-zinc-500 hover:text-white"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/booking"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="px-8 py-3 bg-white/10 border border-white/20 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] mt-4"
                                >
                                    Reservar
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}
