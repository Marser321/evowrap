'use client';

import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Calendar,
    Users,
    TrendingUp,
    DollarSign,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import AppointmentsTable from '@/components/admin/AppointmentsTable';

export default function AdminDashboard() {
    return (
        <div className="space-y-10">
            {/* Header / KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Citas Hoy"
                    value="12"
                    change="+20%"
                    icon={Calendar}
                    color="gold"
                />
                <KPICard
                    title="En Proceso"
                    value="5"
                    change="Bahías Full"
                    icon={Clock}
                    color="amber"
                />
                <KPICard
                    title="Ingresos Mes"
                    value="$45k"
                    change="+12.5%"
                    icon={TrendingUp}
                    color="gold"
                />
                <KPICard
                    title="Satisfacción"
                    value="99%"
                    change="NPS Elite"
                    icon={CheckCircle2}
                    color="zinc"
                />
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 gap-8">
                <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                                Gestión de <span className="text-gold-500">Citas</span>
                            </h2>
                            <p className="text-zinc-400 mt-1">Control de taller en tiempo real.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-all">
                                Exportar
                            </button>
                            <button className="px-6 py-2 bg-gold-600 text-black rounded-full text-sm font-bold hover:bg-gold-500 transition-all">
                                Nueva Cita
                            </button>
                        </div>
                    </div>

                    <AppointmentsTable />
                </div>
            </div>
        </div>
    );
}

function KPICard({ title, value, change, icon: Icon, color }: any) {
    const stylesMap = {
        gold: "bg-gold-500/10 text-gold-400 border-gold-500/20",
        amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        zinc: "bg-white/5 text-white border-white/10",
    };
    const colorStyles = stylesMap[color as keyof typeof stylesMap] || "bg-white/5 text-white border-white/10";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-3xl border ${colorStyles} backdrop-blur-md relative overflow-hidden group`}
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon size={64} />
            </div>

            <p className="text-sm font-bold tracking-widest uppercase opacity-60 mb-2">{title}</p>
            <h3 className="text-4xl font-black mb-1">{value}</h3>
            <p className="text-xs font-medium tracking-tight">
                <span className="opacity-80">{change}</span>
            </p>
        </motion.div>
    );
}
