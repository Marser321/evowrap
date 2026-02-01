'use client';

import { Settings, Bell, Lock, Palette, Globe, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
                    <span className="text-gold-500">Configuración</span> del Sistema
                </h1>
                <p className="text-zinc-400 mt-1">Personaliza tu experiencia de administración.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-gold-500/20">
                            <Settings className="w-5 h-5 text-gold-500" />
                        </div>
                        <h2 className="text-xl font-bold text-white">General</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Nombre del Taller</label>
                            <input
                                type="text"
                                defaultValue="Evo Wrap Studio"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold-500/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Email de Contacto</label>
                            <input
                                type="email"
                                defaultValue="info@evowrap.uy"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold-500/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">Teléfono WhatsApp</label>
                            <input
                                type="text"
                                defaultValue="+598 99 123 456"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-gold-500/50"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-blue-500/20">
                            <Bell className="w-5 h-5 text-blue-500" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Notificaciones</h2>
                    </div>

                    <div className="space-y-4">
                        <ToggleSetting label="Nuevas reservas" description="Email cuando hay una nueva cita" defaultChecked />
                        <ToggleSetting label="Recordatorios" description="Enviar recordatorios a clientes" defaultChecked />
                        <ToggleSetting label="Reportes semanales" description="Resumen de actividad cada lunes" />
                    </div>
                </motion.div>

                {/* Security */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-red-500/20">
                            <Lock className="w-5 h-5 text-red-500" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Seguridad</h2>
                    </div>

                    <div className="space-y-4">
                        <button className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 transition-colors">
                            <span className="font-medium text-white">Cambiar Contraseña</span>
                            <p className="text-sm text-zinc-500">Última actualización: hace 30 días</p>
                        </button>
                        <button className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-left hover:bg-white/10 transition-colors">
                            <span className="font-medium text-white">Autenticación 2FA</span>
                            <p className="text-sm text-zinc-500">No configurada</p>
                        </button>
                    </div>
                </motion.div>

                {/* Appearance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-neutral-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-purple-500/20">
                            <Palette className="w-5 h-5 text-purple-500" />
                        </div>
                        <h2 className="text-xl font-bold text-white">Apariencia</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-3">Color de Acento</label>
                            <div className="flex gap-3">
                                <button className="w-10 h-10 rounded-full bg-gold-500 ring-2 ring-white ring-offset-2 ring-offset-zinc-900"></button>
                                <button className="w-10 h-10 rounded-full bg-blue-500"></button>
                                <button className="w-10 h-10 rounded-full bg-green-500"></button>
                                <button className="w-10 h-10 rounded-full bg-purple-500"></button>
                            </div>
                        </div>
                        <ToggleSetting label="Modo oscuro" description="Siempre activo (recomendado)" defaultChecked disabled />
                    </div>
                </motion.div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button className="px-8 py-3 bg-gold-600 text-black rounded-full font-bold hover:bg-gold-500 transition-all flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Guardar Cambios
                </button>
            </div>
        </div>
    );
}

function ToggleSetting({ label, description, defaultChecked = false, disabled = false }: {
    label: string;
    description: string;
    defaultChecked?: boolean;
    disabled?: boolean;
}) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-white">{label}</p>
                <p className="text-sm text-zinc-500">{description}</p>
            </div>
            <button
                disabled={disabled}
                className={`
                    w-12 h-7 rounded-full relative transition-colors
                    ${defaultChecked ? 'bg-gold-500' : 'bg-zinc-700'}
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                <div className={`
                    w-5 h-5 rounded-full bg-white absolute top-1 transition-transform
                    ${defaultChecked ? 'right-1' : 'left-1'}
                `}></div>
            </button>
        </div>
    );
}
