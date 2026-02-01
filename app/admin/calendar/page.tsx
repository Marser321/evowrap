'use client';

import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CalendarPage() {
    const today = new Date();
    const monthName = today.toLocaleString('es-UY', { month: 'long' });
    const year = today.getFullYear();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
                        <span className="text-gold-500">Calendario</span> de Citas
                    </h1>
                    <p className="text-zinc-400 mt-1">Gestiona las reservas del taller.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="px-4 py-2 bg-white/5 rounded-xl font-bold capitalize">
                        {monthName} {year}
                    </span>
                    <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-xl"
            >
                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
                        <div key={day} className="text-center text-xs font-bold text-zinc-500 uppercase tracking-widest py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar placeholder */}
                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }, (_, i) => {
                        const dayNum = i - 2; // offset for starting day
                        const isToday = dayNum === today.getDate();
                        const isCurrentMonth = dayNum > 0 && dayNum <= 31;

                        return (
                            <div
                                key={i}
                                className={`
                                    aspect-square rounded-xl flex flex-col items-center justify-start p-2
                                    transition-colors cursor-pointer
                                    ${isToday ? 'bg-gold-500/20 border border-gold-500/50' : 'bg-white/5 hover:bg-white/10'}
                                    ${!isCurrentMonth ? 'opacity-30' : ''}
                                `}
                            >
                                <span className={`text-sm font-bold ${isToday ? 'text-gold-500' : 'text-white'}`}>
                                    {isCurrentMonth ? dayNum : ''}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gold-500"></div>
                        <span className="text-zinc-400">Hoy</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-zinc-400">Disponible</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-zinc-400">Lleno</span>
                    </div>
                </div>
            </motion.div>

            {/* Coming Soon Notice */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 text-center">
                <Clock className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Calendario Interactivo - Próximamente</h3>
                <p className="text-zinc-400 text-sm">
                    La funcionalidad completa de arrastrar y soltar citas está en desarrollo.
                </p>
            </div>
        </div>
    );
}
