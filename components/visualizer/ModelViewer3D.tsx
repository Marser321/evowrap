'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import CarModel, { FallbackCar } from './CarModel';

// Tipos de materiales disponibles
export interface WrapMaterial {
    id: string;
    name: string;
    color: string;
    metalness: number;
    roughness: number;
}

export const WRAP_MATERIALS: WrapMaterial[] = [
    { id: 'original', name: 'Original', color: '#1a1a1a', metalness: 0.9, roughness: 0.2 },
    { id: 'matte-black', name: 'Matte Stealth', color: '#0a0a0a', metalness: 0.1, roughness: 0.9 },
    { id: 'nardo-grey', name: 'Nardo Grey', color: '#6b7280', metalness: 0.3, roughness: 0.7 },
    { id: 'satin-white', name: 'Satin White', color: '#f5f5f5', metalness: 0.2, roughness: 0.5 },
    { id: 'midnight-purple', name: 'Midnight Purple', color: '#3b0764', metalness: 0.8, roughness: 0.3 },
    { id: 'race-red', name: 'Race Red', color: '#b91c1c', metalness: 0.7, roughness: 0.3 },
    { id: 'miami-blue', name: 'Miami Blue', color: '#06b6d4', metalness: 0.6, roughness: 0.25 },
    { id: 'gold-wrap', name: 'EVO Gold', color: '#d4a017', metalness: 0.95, roughness: 0.15 },
];

interface ModelViewer3DProps {
    modelUrl: string;
    activeMaterial: WrapMaterial;
}

function LoadingSpinner({ material }: { material: WrapMaterial }) {
    return <FallbackCar material={material} />;
}

export default function ModelViewer3D({ modelUrl, activeMaterial }: ModelViewer3DProps) {
    return (
        <div className="w-full h-full bg-gradient-to-b from-zinc-900 to-black rounded-3xl overflow-hidden">
            <Canvas
                camera={{ position: [5, 2, 5], fov: 50 }}
                shadows={true}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                {/* Iluminación */}
                <ambientLight intensity={0.4} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1}
                    castShadow={true}
                />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                {/* Entorno HDRI para reflejos realistas */}
                <Environment preset="city" background={false} />

                {/* Modelo del auto con Suspense */}
                <Suspense fallback={<LoadingSpinner material={activeMaterial} />}>
                    <CarModel url={modelUrl} material={activeMaterial} />
                </Suspense>

                {/* Sombra de contacto */}
                <ContactShadows
                    position={[0, -1.5, 0]}
                    opacity={0.75}
                    scale={10}
                    blur={2.5}
                    far={4}
                />

                {/* Controles de órbita */}
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={10}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    );
}
