'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Upload, Image as ImageIcon, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceEditorProps {
    service?: any; // If present, edit mode. If null, create mode.
    onSave: () => void;
    onCancel: () => void;
}

export default function ServiceEditor({ service, onSave, onCancel }: ServiceEditorProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState(service?.title || '');
    const [description, setDescription] = useState(service?.description || '');
    const [heroImage, setHeroImage] = useState(service?.hero_image_url || '');
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('services')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get Public URL
            const { data } = supabase.storage.from('services').getPublicUrl(filePath);
            setHeroImage(data.publicUrl);

        } catch (error) {
            alert('Error uploading image!');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const serviceData = {
                title,
                description,
                hero_image_url: heroImage,
                updated_at: new Date().toISOString(),
            };

            let error;
            if (service?.id) {
                // Update
                const { error: updateError } = await supabase
                    .from('services')
                    .update(serviceData)
                    .eq('id', service.id);
                error = updateError;
            } else {
                // Insert (Not primary use case yet as IDs are tricky with current map, but good to have)
                // We'll rely on pre-seeded rows mostly, but let's allow insert
                const { error: insertError } = await supabase
                    .from('services')
                    .insert([{ ...serviceData, id: title.toLowerCase().replace(/\s/g, '-') }]);
                error = insertError;
            }

            if (error) throw error;
            onSave();
        } catch (error) {
            alert('Error saving service!');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                        Editar <span className="text-gold-500">Servicio</span>
                    </h2>
                    <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Title Input */}
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Título del Servicio</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50 transition-colors placeholder:text-zinc-700"
                            placeholder="Ej. Ceramic Coating"
                        />
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Descripción</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50 transition-colors placeholder:text-zinc-700 resize-none"
                            placeholder="Descripción breve..."
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Imagen Principal (Hero)</label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* Preview */}
                            <div className="aspect-video bg-black/50 rounded-xl border border-white/10 overflow-hidden relative group">
                                {heroImage ? (
                                    <img src={heroImage} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-zinc-600">
                                        <ImageIcon size={32} className="mb-2 opacity-50" />
                                        <span className="text-xs">Sin imagen</span>
                                    </div>
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                                        <Loader2 className="animate-spin text-gold-500" />
                                    </div>
                                )}
                            </div>

                            {/* Uploader */}
                            <div className="space-y-4">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-gold-500/50 hover:bg-gold-500/5 transition-all group">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-3 text-zinc-500 group-hover:text-gold-500 transition-colors" />
                                        <p className="text-sm text-zinc-400 group-hover:text-zinc-200"><span className="font-semibold">Click para subir</span> imagen</p>
                                        <p className="text-xs text-zinc-600">SVG, PNG, JPG (MAX. 2MB)</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                                </label>
                                <p className="text-xs text-zinc-500 italic">
                                    * La imagen se actualizará automáticamente en la web al guardar.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
                        <button
                            onClick={onCancel}
                            className="px-6 py-3 rounded-full border border-white/10 font-bold text-sm hover:bg-white/5 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isLoading || uploading}
                            className="px-8 py-3 rounded-full bg-gold-600 text-black font-bold text-sm hover:bg-gold-500 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
