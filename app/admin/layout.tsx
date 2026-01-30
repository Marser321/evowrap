'use client';

import { LayoutDashboard, Calendar, Users, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import BrandWatermark from '@/components/ui/BrandWatermark';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-zinc-950 text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-zinc-900/50 backdrop-blur-xl hidden md:flex flex-col relative overflow-hidden">
                <BrandWatermark opacity={0.03} scale={1.2} />

                <div className="p-8 pb-4 relative z-10">
                    <img src="/images/branding/logo-metal-dark.png" alt="Evo Wrap Admin" className="h-10 mb-2" />
                    <p className="text-xs text-gold-500/50 tracking-[0.2em] uppercase mt-1 pl-1">Admin Panel</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 relative z-10">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gold-500/10 text-gold-500 font-bold border border-gold-500/20">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/calendar" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
                        <Calendar className="w-5 h-5" />
                        Calendario
                    </Link>
                    <Link href="/admin/clients" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
                        <Users className="w-5 h-5" />
                        Clientes
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
                        <Settings className="w-5 h-5" />
                        Configuración
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-gold-500/10 text-zinc-500 hover:text-gold-500 transition-colors">
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
