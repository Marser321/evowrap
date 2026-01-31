'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

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

// Auto 3D simple inline para evitar problemas de importación
function SimpleCar({ material }: { material: WrapMaterial }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            {/* Cuerpo principal */}
            <mesh position={[0, 0.4, 0]} castShadow>
                <boxGeometry args={[3.5, 0.7, 1.6]} />
                <meshStandardMaterial
                    color={material.color}
                    metalness={material.metalness}
                    roughness={material.roughness}
                />
            </mesh>

            {/* Capó */}
            <mesh position={[1.2, 0.55, 0]} rotation={[0, 0, -0.15]} castShadow>
                <boxGeometry args={[1.2, 0.5, 1.5]} />
                <meshStandardMaterial
                    color={material.color}
                    metalness={material.metalness}
                    roughness={material.roughness}
                />
            </mesh>

            {/* Cabina */}
            <mesh position={[-0.2, 1, 0]} castShadow>
                <boxGeometry args={[1.8, 0.5, 1.4]} />
                <meshStandardMaterial
                    color={material.color}
                    metalness={material.metalness}
                    roughness={material.roughness}
                />
            </mesh>

            {/* Vidrios */}
            <mesh position={[-0.2, 1, 0]}>
                <boxGeometry args={[1.75, 0.45, 1.35]} />
                <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Ruedas */}
            <mesh position={[-1.1, 0, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.38, 0.38, 0.25, 24]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[-1.1, 0, -0.85]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.38, 0.38, 0.25, 24]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[1.2, 0, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.38, 0.38, 0.25, 24]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[1.2, 0, -0.85]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.38, 0.38, 0.25, 24]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* Luces delanteras */}
            <mesh position={[1.75, 0.5, 0.55]}>
                <boxGeometry args={[0.1, 0.15, 0.25]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[1.75, 0.5, -0.55]}>
                <boxGeometry args={[0.1, 0.15, 0.25]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
            </mesh>

            {/* Luces traseras */}
            <mesh position={[-1.75, 0.5, 0.55]}>
                <boxGeometry args={[0.1, 0.15, 0.25]} />
                <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[-1.75, 0.5, -0.55]}>
                <boxGeometry args={[0.1, 0.15, 0.25]} />
                <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.8} />
            </mesh>
        </group>
    );
}

// Fallback de carga
function LoadingBox() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#d4a017" wireframe />
        </mesh>
    );
}

export default function ModelViewer3D({ modelUrl, activeMaterial }: ModelViewer3DProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-zinc-900 rounded-3xl">
                <p className="text-zinc-500">Inicializando 3D...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black rounded-3xl overflow-hidden">
            <Canvas
                camera={{ position: [6, 3, 6], fov: 45 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'default',
                    failIfMajorPerformanceCaveat: false
                }}
            >
                {/* Iluminación fuerte */}
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <directionalLight position={[-10, 5, -5]} intensity={1} />
                <pointLight position={[0, 10, 0]} intensity={1.5} />

                {/* Entorno */}
                <Environment preset="city" />

                {/* Auto */}
                <Suspense fallback={<LoadingBox />}>
                    <SimpleCar material={activeMaterial} />
                </Suspense>

                {/* Piso */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
                    <planeGeometry args={[30, 30]} />
                    <meshStandardMaterial color="#0f0f0f" metalness={0.5} roughness={0.5} />
                </mesh>

                {/* Controles */}
                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={4}
                    maxDistance={12}
                    autoRotate={false}
                />
            </Canvas>
        </div>
    );
}
