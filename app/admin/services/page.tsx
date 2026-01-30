'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import ServiceEditor from '@/components/admin/ServiceEditor';

export default function ServicesAdminPage() {
    const [services, setServices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingService, setEditingService] = useState<any | null>(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const fetchServices = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching services:', error);
        } else {
            setServices(data || []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleEdit = (service: any) => {
        setEditingService(service);
        setIsEditorOpen(true);
    };

    const handleCreate = () => {
        setEditingService(null);
        setIsEditorOpen(true);
    };

    const handleSave = () => {
        setIsEditorOpen(false);
        fetchServices(); // Refresh list
    };

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase
            .from('services')
            .update({ active: !currentStatus })
            .eq('id', id);

        if (!error) fetchServices();
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                        Gestión de <span className="text-gold-500">Servicios</span>
                    </h1>
                    <p className="text-zinc-400 mt-1">Administra el contenido y las imágenes de tus servicios en tiempo real.</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-6 py-3 bg-gold-600 hover:bg-gold-500 text-black font-bold rounded-full transition-all shadow-[0_0_20px_rgba(250,204,21,0.2)]"
                >
                    <Plus size={20} />
                    Nuevo Servicio
                </button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-6">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-gold-500 w-10 h-10" />
                    </div>
                ) : services.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                        <p className="text-zinc-500 font-medium">No hay servicios registrados aún.</p>
                        <button onClick={handleCreate} className="text-gold-500 hover:underline mt-2">Crear el primero</button>
                    </div>
                ) : (
                    services.map((service) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 backdrop-blur-xl group hover:border-gold-500/20 transition-all"
                        >
                            {/* Image Thumbnail */}
                            <div className="w-full md:w-48 aspect-video rounded-xl overflow-hidden bg-black/50 relative border border-white/5">
                                {service.hero_image_url ? (
                                    <img src={service.hero_image_url} alt={service.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs">Sin imagen</div>
                                )}
                                {!service.active && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <span className="text-xs font-bold text-red-500 uppercase border border-red-500/50 px-2 py-1 rounded bg-red-900/20">Inactivo</span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gold-400 transition-colors">{service.title}</h3>
                                <p className="text-zinc-400 text-sm line-clamp-2">{service.description || 'Sin descripción'}</p>
                                <div className="mt-3 flex gap-2">
                                    {/* Specs Badges (Mockup for now) */}
                                    {service.specs && Array.isArray(service.specs) && service.specs.map((spec: any, i: number) => (
                                        <span key={i} className="text-[10px] px-2 py-1 bg-white/5 rounded border border-white/5 text-zinc-400">
                                            {spec.label}: {spec.value}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => toggleStatus(service.id, service.active)}
                                    className={`p-2 rounded-full border transition-all ${service.active ? 'text-zinc-400 border-white/5 hover:text-white' : 'text-zinc-600 border-white/5 hover:text-zinc-400'}`}
                                    title={service.active ? "Desactivar" : "Activar"}
                                >
                                    {service.active ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                                <button
                                    onClick={() => handleEdit(service)}
                                    className="p-2 rounded-full border border-white/5 text-gold-500 hover:bg-gold-500/10 transition-colors"
                                    title="Editar"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    className="p-2 rounded-full border border-white/5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                    title="Eliminar (Deshabilitado por seguridad)"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Editor Modal */}
            {isEditorOpen && (
                <ServiceEditor
                    service={editingService}
                    onSave={handleSave}
                    onCancel={() => setIsEditorOpen(false)}
                />
            )}
        </div>
    );
}
