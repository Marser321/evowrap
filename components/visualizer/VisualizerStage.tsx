'use client';

import { useState, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Upload, RefreshCw, Palette, Download, RotateCcw, Loader2, Car } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import MaterialSelector from './MaterialSelector';
import { WRAP_MATERIALS, type WrapMaterial } from './ModelViewer3D';

// Dynamic import para evitar SSR issues con Three.js
const ModelViewer3D = dynamic(() => import('./ModelViewer3D'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-3xl">
            <div className="text-center">
                <Loader2 className="w-12 h-12 text-gold-500 animate-spin mx-auto mb-4" />
                <p className="text-zinc-500 text-sm">Cargando visualizador 3D...</p>
            </div>
        </div>
    ),
});

const DEFAULT_MODEL = null; // No hay modelo por defecto, usamos fallback geometry

export default function VisualizerStage() {
    const [modelUrl, setModelUrl] = useState<string | null>(DEFAULT_MODEL);
    const [activeMaterial, setActiveMaterial] = useState<WrapMaterial>(WRAP_MATERIALS[0]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validar extensión
            const validExtensions = ['.glb', '.gltf'];
            const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

            if (!validExtensions.includes(ext)) {
                alert('Por favor sube un archivo .glb o .gltf válido');
                return;
            }

            setIsUploading(true);
            const url = URL.createObjectURL(file);

            // Simular pequeña carga para UX
            setTimeout(() => {
                setModelUrl(url);
                setUploadedFileName(file.name);
                setActiveMaterial(WRAP_MATERIALS[0]); // Reset material
                setIsUploading(false);
            }, 500);
        }
    };

    const handleReset = () => {
        setModelUrl(DEFAULT_MODEL);
        setUploadedFileName(null);
        setActiveMaterial(WRAP_MATERIALS[0]);
    };

    return (
        <div className="flex flex-col lg:flex-row h-[85vh] gap-6 p-6">

            {/* 1. Main Stage (3D Canvas) */}
            <div className="flex-1 relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl group">

                {/* Loading overlay */}
                <AnimatePresence>
                    {isUploading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
                        >
                            <div className="text-center">
                                <Loader2 className="w-16 h-16 text-gold-500 animate-spin mx-auto mb-4" />
                                <p className="text-white font-bold">Cargando modelo...</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 3D Viewer */}
                <ModelViewer3D modelUrl={modelUrl} activeMaterial={activeMaterial} />

                {/* Floating Actions */}
                <div className="absolute top-6 right-6 flex gap-2 z-10">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 transition-colors border border-white/10 text-white group/btn"
                        title="Subir Modelo 3D"
                    >
                        <Upload className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".glb,.gltf"
                        onChange={handleFileUpload}
                    />
                    <button
                        onClick={handleReset}
                        className="p-3 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80 transition-colors border border-white/10 text-white group/btn"
                        title="Resetear a Demo"
                    >
                        <RotateCcw className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    </button>
                </div>

                {/* Current Material Badge */}
                <div className="absolute bottom-6 left-6 z-10">
                    <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-sm uppercase tracking-widest flex items-center gap-3">
                        <div
                            className="w-4 h-4 rounded-full border border-white/30"
                            style={{ background: activeMaterial.color }}
                        />
                        <Palette className="w-4 h-4 text-gold-500" />
                        {activeMaterial.name}
                    </div>
                </div>

                {/* Model Info Badge */}
                {uploadedFileName && (
                    <div className="absolute bottom-6 right-6 z-10">
                        <div className="px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-400 text-xs uppercase tracking-widest flex items-center gap-2">
                            <Car className="w-4 h-4" />
                            {uploadedFileName}
                        </div>
                    </div>
                )}

                {/* Instructions Overlay (shown initially) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                    <p className="text-zinc-500 text-xs uppercase tracking-widest text-center">
                        Arrastrá para rotar • Scroll para zoom
                    </p>
                </div>

            </div>

            {/* 2. Controls Sidebar */}
            <div className="w-full lg:w-80 flex flex-col gap-4">
                <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 h-full backdrop-blur-sm flex flex-col">

                    {/* Header */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-black text-white tracking-tight">
                            EVO <span className="text-gold-500">Studio</span>
                        </h3>
                        <p className="text-zinc-500 text-sm mt-1">
                            Seleccioná un acabado para visualizar el resultado.
                        </p>
                    </div>

                    {/* Material Selector */}
                    <div className="flex-1 overflow-hidden">
                        <MaterialSelector
                            materials={WRAP_MATERIALS}
                            activeMaterial={activeMaterial}
                            onSelect={setActiveMaterial}
                        />
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 pt-6 border-t border-white/5">
                        <a
                            href={`https://wa.me/59899123456?text=Hola! Me interesa el acabado ${activeMaterial.name} para mi vehículo.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 bg-gold-600 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-gold-500 transition-colors shadow-[0_10px_30px_rgba(212,160,23,0.3)]"
                        >
                            <Download className="w-5 h-5" />
                            Solicitar este Look
                        </a>
                        <p className="text-center text-xs text-zinc-600 mt-3">
                            *Simulación aproximada. Los colores reales pueden variar.
                        </p>
                    </div>

                    {/* Upload hint */}
                    <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-zinc-400 text-xs">
                            <strong className="text-white">Tip:</strong> Podés subir tu propio modelo 3D en formato <code className="text-gold-500">.glb</code> o <code className="text-gold-500">.gltf</code>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
