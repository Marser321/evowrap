'use client';

import { LayoutDashboard, Calendar, Users, Settings, LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import BrandWatermark from '@/components/ui/BrandWatermark';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-zinc-950 text-white">
            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-zinc-900/95 backdrop-blur-xl border-b border-white/5 md:hidden z-50 flex items-center justify-between px-4">
                <img src="/images/branding/logo-metal-dark.png" alt="Evo Wrap Admin" className="h-8" />
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-50
                w-64 border-r border-white/5 bg-zinc-900/95 backdrop-blur-xl 
                flex flex-col relative overflow-hidden
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <BrandWatermark opacity={0.03} scale={1.2} />

                <div className="p-8 pb-4 relative z-10">
                    <img src="/images/branding/logo-metal-dark.png" alt="Evo Wrap Admin" className="h-10 mb-2" />
                    <p className="text-xs text-gold-500/50 tracking-[0.2em] uppercase mt-1 pl-1">Admin Panel</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 relative z-10">
                    <Link href="/admin" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/services" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gold-500/10 text-gold-500 font-bold border border-gold-500/20">
                        <Settings className="w-5 h-5" />
                        Servicios
                    </Link>
                    <Link href="/admin/calendar" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
                        <Calendar className="w-5 h-5" />
                        Calendario
                    </Link>
                    <Link href="/admin/clients" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
                        <Users className="w-5 h-5" />
                        Clientes
                    </Link>
                    <Link href="/admin/settings" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
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
            <main className="flex-1 p-4 md:p-8 overflow-y-auto pt-20 md:pt-8">
                {children}
            </main>
        </div>
    );
}
