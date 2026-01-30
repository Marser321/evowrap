'use client';

import React from 'react';
import { MapPin, Phone, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function Footer() {
    return (
        <footer className="relative bg-neutral-900 text-white overflow-hidden">
            {/* Background Image - Rear of Sports Car */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 bg-[url('/images/showcase/black-mustang.png')]" // Using black mustang as placeholder for rear car
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="w-48">
                            <Logo className="w-full h-auto text-white" />
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                            Elevando la estética automotriz a niveles de arte. Protección, diseño y perfección en cada detalle.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">Explorar</h4>
                        <ul className="space-y-4 text-zinc-400">
                            <li><Link href="/services/ppf" className="hover:text-indigo-400 transition-colors">Paint Protection Film</Link></li>
                            <li><Link href="/services/ceramic" className="hover:text-indigo-400 transition-colors">Tratamiento Cerámico</Link></li>
                            <li><Link href="/services/wrapping" className="hover:text-indigo-400 transition-colors">Vinyl Wrapping</Link></li>
                            <li><Link href="/visualizer" className="hover:text-indigo-400 transition-colors">Visualizador 3D</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">Contacto</h4>
                        <ul className="space-y-4 text-zinc-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-indigo-500 shrink-0 mt-1" />
                                <span>Santa Tereza 719<br />Maldonado, Punta del Este</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-indigo-500 shrink-0" />
                                <span>+598 99 123 456</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-indigo-500 shrink-0" />
                                <span>contacto@evowrap.uy</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social / CTA */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">Síguenos</h4>
                        <div className="flex gap-4 mb-8">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            {/* Add more social icons if needed */}
                        </div>
                        <Link
                            href="/booking"
                            className="inline-block px-6 py-3 rounded-full bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-zinc-200 transition-colors"
                        >
                            Agendar Cita
                        </Link>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
                    <p>© {new Date().getFullYear()} Evo Wrap Uruguay. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="#">Privacidad</Link>
                        <Link href="#">Términos</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
