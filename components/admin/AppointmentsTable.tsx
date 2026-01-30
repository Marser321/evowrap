'use client';

import { useState, useEffect, useCallback } from 'react';
import { MoreHorizontal, MessageCircle, CheckCircle, Clock, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { notifyClient } from '@/lib/webhookService';
import { supabase } from '@/lib/supabase';

const PAGE_SIZE = 10;

// Type definition for Supabase row
interface Appointment {
    id: string;
    contact_name: string;
    contact_phone: string;
    car_details: string;
    service_type: string;
    status: string;
    requested_date: string;
    created_at: string;
}

export default function AppointmentsTable() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const fetchAppointments = useCallback(async () => {
        setLoading(true);
        const from = page * PAGE_SIZE;
        const to = from + PAGE_SIZE - 1;

        const { data, error, count } = await supabase
            .from('citas')
            .select('id, contact_name, contact_phone, car_details, service_type, status, requested_date, created_at', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) {
            console.error('Error fetching appointments:', error);
        } else {
            setAppointments(data || []);
            setTotalCount(count || 0);
        }
        setLoading(false);
    }, [page]);

    useEffect(() => {
        fetchAppointments();

        // Optional: Real-time subscription could go here
    }, [fetchAppointments]);

    const handleStatusChange = async (id: string, newStatus: string) => {
        setLoadingId(id);

        // 1. Update Supabase
        const { error } = await supabase
            .from('citas')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            console.error('Error updating status:', error);
            alert('Error al actualizar estado');
            setLoadingId(null);
            return;
        }

        // 2. Update Local State (Optimistic UI)
        setAppointments(prev => prev.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        ));

        // 3. Trigger Automation if "Listo"
        if (newStatus === 'Listo para Entrega') {
            const app = appointments.find(a => a.id === id);
            if (app) {
                console.log(`Triggering WhatsApp for ${app.contact_name}...`);
                await notifyClient(id, newStatus, {
                    name: app.contact_name,
                    phone: app.contact_phone,
                    service: app.service_type
                });
                alert(`✅ Cliente notificado por WhatsApp`);
            }
        }
        setLoadingId(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'En Proceso': return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
            case 'Listo para Entrega': return 'bg-gold-500/20 text-gold-500 border-gold-500/30';
            case 'Pendiente': return 'bg-zinc-800 text-zinc-400 border-white/5';
            default: return 'bg-zinc-800 text-zinc-400';
        }
    };

    return (
        <div className="bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-transparent to-gold-500/5">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    Agenda Activa
                    {loading && <RefreshCw className="w-4 h-4 animate-spin text-gold-500" />}
                </h3>
                <button
                    onClick={fetchAppointments}
                    className="px-4 py-2 bg-gold-600 text-black rounded-lg text-sm font-bold hover:bg-gold-500 transition-all shadow-[0_0_15px_rgba(217,119,6,0.3)]"
                >
                    Actualizar
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-zinc-400">
                        <tr>
                            <th className="px-6 py-4 font-medium">Cliente / Auto</th>
                            <th className="px-6 py-4 font-medium">Servicio</th>
                            <th className="px-6 py-4 font-medium">Estado</th>
                            <th className="px-6 py-4 font-medium">Fecha Solicitada</th>
                            <th className="px-6 py-4 font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {appointments.length === 0 && !loading && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                                    No hay citas registradas aún.
                                </td>
                            </tr>
                        )}
                        {appointments.map((app) => (
                            <tr key={app.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-white">{app.contact_name}</div>
                                    <div className="text-zinc-500 text-xs">{app.car_details}</div>
                                    <div className="text-zinc-600 text-[10px] mt-1">{app.contact_phone}</div>
                                </td>
                                <td className="px-6 py-4 text-zinc-300">{app.service_type}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getStatusColor(app.status || 'Pendiente')}`}>
                                        {app.status || 'Pendiente'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-zinc-400">{app.requested_date}</td>
                                <td className="px-6 py-4 text-right">
                                    {app.status !== 'Listo para Entrega' && (
                                        <button
                                            onClick={() => handleStatusChange(app.id, 'Listo para Entrega')}
                                            disabled={loadingId === app.id}
                                            className="p-2 hover:bg-green-500/20 text-zinc-400 hover:text-green-400 rounded-lg transition-colors mr-2"
                                            title="Marcar Listo y Notificar"
                                        >
                                            {loadingId === app.id ? <Clock className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                        </button>
                                    )}
                                    <button className="p-2 hover:bg-indigo-500/20 text-zinc-400 hover:text-indigo-400 rounded-lg transition-colors">
                                        <MessageCircle className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/5">
                <span className="text-sm text-zinc-400">
                    Mostrando {appointments.length > 0 ? page * PAGE_SIZE + 1 : 0} - {Math.min((page + 1) * PAGE_SIZE, totalCount)} de {totalCount}
                </span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0 || loading}
                        className="p-2 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-medium text-zinc-300">
                        Página {page + 1}
                    </span>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={(page + 1) * PAGE_SIZE >= totalCount || loading}
                        className="p-2 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-zinc-400 hover:text-white transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
