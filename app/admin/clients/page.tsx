'use client';

import { Users, Search, Plus, Mail, Phone, Car } from 'lucide-react';
import { motion } from 'framer-motion';

const mockClients = [
    { id: 1, name: 'Carlos Rodríguez', email: 'carlos@email.com', phone: '099 123 456', vehicles: 2, lastVisit: '15/01/2026' },
    { id: 2, name: 'María González', email: 'maria@email.com', phone: '098 765 432', vehicles: 1, lastVisit: '20/01/2026' },
    { id: 3, name: 'Juan Pérez', email: 'juan@email.com', phone: '091 234 567', vehicles: 3, lastVisit: '25/01/2026' },
];

export default function ClientsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
                        Base de <span className="text-gold-500">Clientes</span>
                    </h1>
                    <p className="text-zinc-400 mt-1">Gestiona tu cartera de clientes VIP.</p>
                </div>
                <button className="px-6 py-3 bg-gold-600 text-black rounded-full font-bold hover:bg-gold-500 transition-all flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Nuevo Cliente
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                    type="text"
                    placeholder="Buscar por nombre, email o teléfono..."
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
            </div>

            {/* Clients Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-900/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl"
            >
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="text-left p-4 text-sm font-bold text-zinc-500 uppercase tracking-wider">Cliente</th>
                            <th className="text-left p-4 text-sm font-bold text-zinc-500 uppercase tracking-wider hidden md:table-cell">Contacto</th>
                            <th className="text-left p-4 text-sm font-bold text-zinc-500 uppercase tracking-wider hidden lg:table-cell">Vehículos</th>
                            <th className="text-left p-4 text-sm font-bold text-zinc-500 uppercase tracking-wider hidden lg:table-cell">Última Visita</th>
                            <th className="text-right p-4 text-sm font-bold text-zinc-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockClients.map((client) => (
                            <tr key={client.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                                            <span className="text-gold-500 font-bold">{client.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-white">{client.name}</p>
                                            <p className="text-sm text-zinc-500 md:hidden">{client.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 hidden md:table-cell">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                                            <Mail className="w-4 h-4" />
                                            {client.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                                            <Phone className="w-4 h-4" />
                                            {client.phone}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 hidden lg:table-cell">
                                    <div className="flex items-center gap-2">
                                        <Car className="w-4 h-4 text-gold-500" />
                                        <span className="text-white">{client.vehicles}</span>
                                    </div>
                                </td>
                                <td className="p-4 hidden lg:table-cell text-zinc-400">
                                    {client.lastVisit}
                                </td>
                                <td className="p-4 text-right">
                                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 transition-colors">
                                        Ver Perfil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-3xl font-black text-gold-500">156</p>
                    <p className="text-sm text-zinc-400 mt-1">Clientes Totales</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-3xl font-black text-green-500">23</p>
                    <p className="text-sm text-zinc-400 mt-1">Nuevos este Mes</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                    <p className="text-3xl font-black text-white">4.2</p>
                    <p className="text-sm text-zinc-400 mt-1">Visitas Promedio</p>
                </div>
            </div>
        </div>
    );
}
