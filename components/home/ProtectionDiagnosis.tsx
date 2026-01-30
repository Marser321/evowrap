'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, MapPin, Warehouse, Sun } from 'lucide-react';

type LocationType = 'city' | 'coast';
type ParkingType = 'garage' | 'street';

export default function ProtectionDiagnosis() {
    const [location, setLocation] = useState<LocationType | null>(null);
    const [parking, setParking] = useState<ParkingType | null>(null);

    const getRiskLevel = () => {
        if (!location || !parking) return null;
        if (location === 'coast' && parking === 'street') return 'EXTREMO';
        if (location === 'coast' || parking === 'street') return 'ALTO';
        return 'MODERADO';
    };

    const getRecommendation = () => {
        const risk = getRiskLevel();
        if (risk === 'EXTREMO') return {
            title: 'Pack Full Blindaje (PPF + Cerámico)',
            description: 'El salitre y el sol directo destruirán tu barniz en meses. Necesitas barrera física (PPF) y química (Cerámico).',
            action: 'Solicitar Blindaje Total'
        };
        if (risk === 'ALTO') return {
            title: 'Tratamiento Cerámico 5 Años',
            description: 'Tu exposición requiere sellado molecular para evitar oxidación prematura y manchas de agua ácida.',
            action: 'Solicitar Cerámico Pro'
        };
        return {
            title: 'Corrección + Cerámico Light',
            description: 'Mantenimiento ideal para preservar el brillo en condiciones controladas.',
            action: 'Agendar Mantenimiento'
        };
    };

    const risk = getRiskLevel();
    const rec = getRecommendation();

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Diagnóstico de <span className="text-gold-500">Riesgo</span></h2>
                <p className="text-zinc-400">Descubre qué nivel de protección necesita tu vehículo realmente.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Q1: Location */}
                <div className="space-y-4">
                    <p className="text-sm font-bold uppercase tracking-wider text-zinc-500">1. ¿Zona de Circulación Principal?</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setLocation('city')}
                            className={`p-6 rounded-2xl border transition-all ${location === 'city' ? 'bg-gold-600 border-gold-500 text-white shadow-lg' : 'bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800'}`}
                        >
                            <Warehouse className="w-8 h-8 mb-2 mx-auto" />
                            <span className="block font-bold">Ciudad / Interior</span>
                        </button>
                        <button
                            onClick={() => setLocation('coast')}
                            className={`p-6 rounded-2xl border transition-all ${location === 'coast' ? 'bg-sky-600 border-sky-500 text-white shadow-lg' : 'bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800'}`}
                        >
                            <Sun className="w-8 h-8 mb-2 mx-auto" />
                            <span className="block font-bold">Costa / Punta</span>
                        </button>
                    </div>
                </div>

                {/* Q2: Parking */}
                <div className="space-y-4">
                    <p className="text-sm font-bold uppercase tracking-wider text-zinc-500">2. ¿Dónde duerme el vehículo?</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setParking('garage')}
                            className={`p-6 rounded-2xl border transition-all ${parking === 'garage' ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg' : 'bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800'}`}
                        >
                            <Warehouse className="w-8 h-8 mb-2 mx-auto" />
                            <span className="block font-bold">Garage Cerrado</span>
                        </button>
                        <button
                            onClick={() => setParking('street')}
                            className={`p-6 rounded-2xl border transition-all ${parking === 'street' ? 'bg-orange-600 border-orange-500 text-white shadow-lg' : 'bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800'}`}
                        >
                            <MapPin className="w-8 h-8 mb-2 mx-auto" />
                            <span className="block font-bold">Intemperie</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Result Area */}
            <AnimatePresence mode='wait'>
                {risk && (
                    <motion.div
                        key={risk}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-zinc-900/80 border border-white/10 p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 p-4 rounded-bl-3xl font-black text-xl uppercase ${risk === 'EXTREMO' ? 'bg-red-500 text-white' : risk === 'ALTO' ? 'bg-amber-500 text-white' : 'bg-gold-500 text-white'}`}>
                            Riesgo {risk}
                        </div>

                        <div className="flex items-start gap-6 relative z-10">
                            <div className={`p-4 rounded-full ${risk === 'EXTREMO' ? 'bg-red-500/20 text-red-500' : 'bg-gold-500/20 text-gold-500'}`}>
                                {risk === 'EXTREMO' ? <ShieldAlert size={32} /> : <ShieldCheck size={32} />}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">{rec.title}</h3>
                                <p className="text-zinc-300 mb-6 max-w-lg">{rec.description}</p>
                                <button className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors">
                                    {rec.action}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
