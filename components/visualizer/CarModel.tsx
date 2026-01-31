'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { WrapMaterial } from './ModelViewer3D';

interface CarModelProps {
    url: string;
    material: WrapMaterial;
}

// Componente de fallback cuando no hay modelo - auto simple de cajas
export function FallbackCar({ material }: { material: WrapMaterial }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    const wheelPositions: [number, number, number][] = [
        [-1, -0.4, 0.8],
        [-1, -0.4, -0.8],
        [1, -0.4, 0.8],
        [1, -0.4, -0.8]
    ];

    return (
        <group ref={groupRef}>
            {/* Cuerpo del auto simplificado */}
            <mesh position={[0, 0, 0]} castShadow>
                <boxGeometry args={[3, 0.8, 1.5]} />
                <meshStandardMaterial
                    color={material.color}
                    metalness={material.metalness}
                    roughness={material.roughness}
                />
            </mesh>
            {/* Cabina */}
            <mesh position={[0.2, 0.6, 0]} castShadow>
                <boxGeometry args={[1.5, 0.6, 1.3]} />
                <meshStandardMaterial
                    color={material.color}
                    metalness={material.metalness}
                    roughness={material.roughness}
                />
            </mesh>
            {/* Ruedas */}
            {wheelPositions.map((pos, i) => (
                <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.35, 0.35, 0.2, 16]} />
                    <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
                </mesh>
            ))}
        </group>
    );
}

// Componente que carga modelo GLTF
function LoadedCarModel({ url, material }: CarModelProps) {
    const { scene } = useGLTF(url);
    const groupRef = useRef<THREE.Group>(null);

    // Clonar la escena para evitar mutaciones
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    // Aplicar material a los meshes de carrocería
    useEffect(() => {
        clonedScene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const meshName = child.name.toLowerCase();

                // Excluir ciertas partes como vidrios, llantas, luces
                const isExcluded =
                    meshName.includes('glass') ||
                    meshName.includes('window') ||
                    meshName.includes('wheel') ||
                    meshName.includes('tire') ||
                    meshName.includes('rim') ||
                    meshName.includes('light') ||
                    meshName.includes('headlight') ||
                    meshName.includes('taillight') ||
                    meshName.includes('chrome') ||
                    meshName.includes('interior');

                if (!isExcluded) {
                    const newMaterial = new THREE.MeshStandardMaterial({
                        color: new THREE.Color(material.color),
                        metalness: material.metalness,
                        roughness: material.roughness,
                        envMapIntensity: 1.5,
                    });

                    child.material = newMaterial;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            }
        });
    }, [clonedScene, material]);

    // Centrar y escalar el modelo
    useEffect(() => {
        const box = new THREE.Box3().setFromObject(clonedScene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        clonedScene.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
            const scale = 3 / maxDim;
            clonedScene.scale.setScalar(scale);
            clonedScene.position.y = -size.y * scale / 2;
        }
    }, [clonedScene]);

    // Animación sutil
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <primitive object={clonedScene} />
        </group>
    );
}

// Componente principal que decide qué renderizar
export default function CarModel({ url, material }: CarModelProps) {
    // Siempre intentamos cargar - si falla, el Suspense padre lo maneja
    return <LoadedCarModel url={url} material={material} />;
}
