'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Stage } from '@react-three/drei';
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
    { id: 'original', name: 'Original', color: '#2a2a2a', metalness: 0.9, roughness: 0.2 },
    { id: 'matte-black', name: 'Matte Stealth', color: '#1a1a1a', metalness: 0.1, roughness: 0.9 },
    { id: 'nardo-grey', name: 'Nardo Grey', color: '#6b7280', metalness: 0.3, roughness: 0.7 },
    { id: 'satin-white', name: 'Satin White', color: '#f5f5f5', metalness: 0.2, roughness: 0.5 },
    { id: 'midnight-purple', name: 'Midnight Purple', color: '#581c87', metalness: 0.8, roughness: 0.3 },
    { id: 'race-red', name: 'Race Red', color: '#dc2626', metalness: 0.7, roughness: 0.3 },
    { id: 'miami-blue', name: 'Miami Blue', color: '#06b6d4', metalness: 0.6, roughness: 0.25 },
    { id: 'gold-wrap', name: 'EVO Gold', color: '#d4a017', metalness: 0.95, roughness: 0.15 },
];

interface ModelViewer3DProps {
    modelUrl: string | null;
    activeMaterial: WrapMaterial;
}

function LoadingSpinner({ material }: { material: WrapMaterial }) {
    return <FallbackCar material={material} />;
}

export default function ModelViewer3D({ modelUrl, activeMaterial }: ModelViewer3DProps) {
    return (
        <div className="w-full h-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black rounded-3xl overflow-hidden">
            <Canvas
                camera={{ position: [6, 3, 6], fov: 45 }}
                shadows={true}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            >
                {/* Iluminación potente */}
                <ambientLight intensity={0.6} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1.5}
                    castShadow={true}
                    shadow-mapSize={1024}
                />
                <directionalLight
                    position={[-10, 5, -5]}
                    intensity={0.8}
                />
                <spotLight
                    position={[0, 15, 0]}
                    angle={0.3}
                    penumbra={1}
                    intensity={2}
                    castShadow={true}
                />
                <pointLight position={[5, 5, 5]} intensity={0.5} />
                <pointLight position={[-5, 5, -5]} intensity={0.5} />

                {/* Entorno HDRI para reflejos */}
                <Environment preset="city" background={false} />

                {/* Auto */}
                <Suspense fallback={<LoadingSpinner material={activeMaterial} />}>
                    <CarModel url={modelUrl} material={activeMaterial} />
                </Suspense>

                {/* Sombra de contacto */}
                <ContactShadows
                    position={[0, -1.4, 0]}
                    opacity={0.6}
                    scale={12}
                    blur={3}
                    far={6}
                />

                {/* Piso reflectante sutil */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow={true}>
                    <planeGeometry args={[50, 50]} />
                    <meshStandardMaterial
                        color="#0a0a0a"
                        metalness={0.8}
                        roughness={0.4}
                        transparent={true}
                        opacity={0.8}
                    />
                </mesh>

                {/* Controles de órbita */}
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={4}
                    maxDistance={12}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2.2}
                    autoRotate={false}
                />
            </Canvas>
        </div>
    );
}
