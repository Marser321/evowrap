import React from 'react';
import { MapPin, Phone, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function Footer() {
    return (
        <footer className="relative bg-neutral-950 text-white overflow-hidden border-t border-white/5">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full -z-10" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <div className="w-48 group">
                            <Logo className="w-full h-auto text-white transition-all group-hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                        </div>
                        <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-xs">
                            Elevando la estética automotriz a niveles de arte. Protección, diseño y perfección en cada detalle.
                        </p>
                        <div className="flex gap-4">
                            <Link href="https://instagram.com" target="_blank" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all duration-300">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="mailto:contacto@evowrap.uy" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all duration-300">
                                <Mail className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-black text-xl mb-8 text-white uppercase italic tracking-tighter">Explorar</h4>
                        <ul className="space-y-4">
                            {['PPF', 'Ceramic Coating', 'Wrapping', 'Detailing', 'Visualizador 3D'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={item === 'Visualizador 3D' ? '/visualizer' : `/services/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-zinc-400 hover:text-gold-500 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-gold-500 transition-all overflow-hidden" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-black text-xl mb-8 text-white uppercase italic tracking-tighter">Ubicación</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 group">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <span className="text-zinc-400 leading-relaxed group-hover:text-zinc-200 transition-colors">
                                    Santa Tereza 719<br />
                                    Maldonado, Uruguay
                                </span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-colors">
                                    <Phone size={20} />
                                </div>
                                <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">+598 99 123 456</span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA / Schedule */}
                    <div className="flex flex-col justify-between h-full min-h-[160px]">
                        <div>
                            <h4 className="font-black text-xl mb-6 text-white uppercase italic tracking-tighter">¿Listo para el cambio?</h4>
                            <Link
                                href="/booking"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-600 text-black font-black uppercase text-sm tracking-widest hover:bg-gold-500 transition-all shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95"
                            >
                                Agendar Diagnóstico
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-zinc-600 text-sm font-light italic">
                            © {new Date().getFullYear()} EVO Wrap. Estética Absoluta.
                        </p>
                        <div className="flex gap-8">
                            <Link href="#" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">Privacidad</Link>
                            <Link href="#" className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors">Términos</Link>
                            <Link href="/admin" className="text-zinc-600 hover:text-gold-500 text-sm transition-colors font-medium">Panel Admin</Link>
                        </div>
                    </div>

                    <div className="text-zinc-700 text-[10px] uppercase tracking-[0.3em] font-bold">
                        Crafted for Excellence
                    </div>
                </div>
            </div>
        </footer>
    );
}
