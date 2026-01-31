'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WrapMaterial } from './ModelViewer3D';

interface MaterialSelectorProps {
    materials: WrapMaterial[];
    activeMaterial: WrapMaterial;
    onSelect: (material: WrapMaterial) => void;
}

export default function MaterialSelector({ materials, activeMaterial, onSelect }: MaterialSelectorProps) {
    return (
        <div className="space-y-3 overflow-y-auto max-h-[55vh] pr-2 custom-scrollbar">
            {materials.map((material, idx) => (
                <motion.button
                    key={material.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => onSelect(material)}
                    className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 group relative overflow-hidden",
                        activeMaterial.id === material.id
                            ? "bg-gold-500/10 border-gold-500 text-white shadow-[0_0_25px_rgba(212,160,23,0.2)]"
                            : "bg-black/30 border-white/5 text-zinc-400 hover:bg-white/5 hover:border-white/10"
                    )}
                >
                    {/* Color Preview */}
                    <div
                        className="w-10 h-10 rounded-full border-2 border-white/20 shadow-inner flex-shrink-0 transition-transform group-hover:scale-110"
                        style={{
                            background: material.color,
                            boxShadow: material.metalness > 0.5
                                ? `inset 0 -2px 4px rgba(255,255,255,0.3), 0 0 10px ${material.color}40`
                                : 'inset 0 2px 4px rgba(0,0,0,0.3)'
                        }}
                    />

                    {/* Material Info */}
                    <div className="flex-1 min-w-0">
                        <span className="font-bold text-sm group-hover:translate-x-1 transition-transform inline-block">
                            {material.name}
                        </span>
                        <div className="flex gap-3 mt-1 text-[10px] uppercase tracking-widest text-zinc-500">
                            <span>M: {Math.round(material.metalness * 100)}%</span>
                            <span>R: {Math.round(material.roughness * 100)}%</span>
                        </div>
                    </div>

                    {/* Active Indicator */}
                    {activeMaterial.id === material.id && (
                        <motion.div
                            layoutId="material-check"
                            className="text-gold-500"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                        </motion.div>
                    )}

                    {/* Hover glow effect */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
                        style={{ background: `radial-gradient(circle at 30% 50%, ${material.color}, transparent 70%)` }}
                    />
                </motion.button>
            ))}
        </div>
    );
}
