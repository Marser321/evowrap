'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { WrapMaterial } from './ModelViewer3D';

interface CarModelProps {
    url: string | null;
    material: WrapMaterial;
}

// Componente de fallback - auto estilizado visible
export function FallbackCar({ material }: { material: WrapMaterial }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            {/* Cuerpo principal - forma de coupé */}
            <mesh position={[0, 0.4, 0]} castShadow>
                <boxGeometry args={[3.5, 0.7, 1.6]} />
                <meshStandardMaterial
                    color={material.color}
                    metalness={material.metalness}
                    roughness={material.roughness}
                    envMapIntensity={2}
                />
            </mesh>

            {/* Capó inclinado frontal */}
            <mesh position={[1.2, 0.55, 0]} rotation={[0, 0, -0.15]} castShadow>
                <boxGeometry args={[1.2, 0.5, 1.5]} />
                <meshStandardMaterial
                    color={material.color}
                    metalness={material.metalness}
                    roughness={material.roughness}
                    envMapIntensity={2}
                />
            </mesh>

            {/* Cabina / Techo */}
            <mesh position={[-0.2, 1, 0]} castShadow>
                <boxGeometry args={[1.8, 0.5, 1.4]} />
                <meshStandardMaterial
                    color={material.color}
                    metalness={material.metalness}
                    roughness={material.roughness}
                    envMapIntensity={2}
                />
            </mesh>

            {/* Vidrios (oscuros) */}
            <mesh position={[-0.2, 1, 0]}>
                <boxGeometry args={[1.75, 0.45, 1.35]} />
                <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Spoiler trasero */}
            <mesh position={[-1.5, 0.85, 0]} castShadow>
                <boxGeometry args={[0.3, 0.1, 1.3]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Ruedas - más detalladas */}
            {[
                [-1.1, 0, 0.85],
                [-1.1, 0, -0.85],
                [1.2, 0, 0.85],
                [1.2, 0, -0.85]
            ].map((pos, i) => (
                <group key={i} position={pos as [number, number, number]}>
                    {/* Llanta */}
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.38, 0.38, 0.25, 24]} />
                        <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.9} />
                    </mesh>
                    {/* Rin */}
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.25, 0.25, 0.26, 8]} />
                        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
                    </mesh>
                </group>
            ))}

            {/* Luces frontales */}
            <mesh position={[1.75, 0.5, 0.55]}>
                <boxGeometry args={[0.1, 0.15, 0.25]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
            </mesh>
            <mesh position={[1.75, 0.5, -0.55]}>
                <boxGeometry args={[0.1, 0.15, 0.25]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
            </mesh>

            {/* Luces traseras */}
            <mesh position={[-1.75, 0.5, 0.55]}>
                <boxGeometry args={[0.1, 0.15, 0.25]} />
                <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[-1.75, 0.5, -0.55]}>
                <boxGeometry args={[0.1, 0.15, 0.25]} />
                <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
            </mesh>
        </group>
    );
}

// Componente principal - siempre muestra FallbackCar por ahora
// TODO: Agregar carga de modelos GLTF cuando el usuario suba uno
export default function CarModel({ url, material }: CarModelProps) {
    // Por ahora siempre mostramos el auto de fallback
    // hasta que el usuario suba un modelo real
    return <FallbackCar material={material} />;
}
