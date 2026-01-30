'use client';

import AppointmentsTable from '@/components/admin/AppointmentsTable';
import { TrendingUp, Car, CalendarCheck } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-indigo-500/30 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-zinc-500 text-sm uppercase font-bold tracking-wider">Ingresos (Mes)</p>
                            <h4 className="text-2xl font-bold">$4,250 USD</h4>
                        </div>
                    </div>
                    <div className="text-xs text-zinc-500">
                        <span className="text-green-400 font-bold">+12%</span> vs mes anterior
                    </div>
                </div>

                <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-indigo-500/30 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                            <Car className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-zinc-500 text-sm uppercase font-bold tracking-wider">Autos en Taller</p>
                            <h4 className="text-2xl font-bold">5 Activos</h4>
                        </div>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[80%]" />
                    </div>
                </div>

                <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-indigo-500/30 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                            <CalendarCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-zinc-500 text-sm uppercase font-bold tracking-wider">Entregas Hoy</p>
                            <h4 className="text-2xl font-bold">2 Programadas</h4>
                        </div>
                    </div>
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-zinc-900 flex items-center justify-center text-xs">JP</div>
                        <div className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-zinc-900 flex items-center justify-center text-xs">CD</div>
                    </div>
                </div>

            </div>

            {/* Main Table */}
            <div>
                <h2 className="text-2xl font-bold mb-4">Control de Taller</h2>
                <AppointmentsTable />
            </div>
        </div>
    );
}
