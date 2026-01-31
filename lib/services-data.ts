import React from 'react';
import { supabase } from '@/lib/supabase';

// Helper type for Icon strings
export type IconName = 'Shield' | 'Sparkles' | 'Droplets' | 'Sun' | 'Layers' | 'Microscope' | 'Scan' | 'UserCheck' | 'Zap';

export interface ProcessStep {
    title: string;
    description: string;
    icon: string; // Changed from React.ElementType to string for serialization
    image?: string;
}

export interface ServiceData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    secondaryImage?: string;
    technicalSpecs: {
        label: string;
        value: string;
    }[];
    process: ProcessStep[];
    faq: {
        question: string;
        answer: string;
    }[];
    gallery?: string[];
}

export const defaultServicesData: Record<string, ServiceData> = {
    'ceramic-coating': {
        id: 'ceramic-coating',
        title: 'Tratamiento Cerámico',
        subtitle: 'Blindaje molecular. Brillo eterno.',
        description: 'La barrera definitiva. Nuestro recubrimiento químico se funde con la pintura, creando una armadura hidrofóbica capaz de repeler suciedad, químicos y radiación UV. No es solo brillo; es inmortalidad para tu carrocería.',
        heroImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2070&auto=format&fit=crop', // Dark Reflection / Liquid look
        secondaryImage: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070', // Dramatic dark car
        technicalSpecs: [
            { label: 'Dureza', value: '10H Diamond' },
            { label: 'Garantía', value: 'Vitalicia*' },
            { label: 'Res. Química', value: 'pH 1-14' },
            { label: 'Efecto', value: 'Espejo Líquido' },
        ],
        process: [
            {
                title: 'Descontaminación',
                description: 'Eliminación quirúrgica de impurezas.',
                icon: 'Microscope',
                image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070'
            },
            {
                title: 'Corrección Paint',
                description: 'Restauración de reflectividad al 100%.',
                icon: 'Sparkles',
                image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070'
            },
            {
                title: 'IPA Prep',
                description: 'Esterilización de superficie.',
                icon: 'Droplets',
                image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070'
            },
            {
                title: 'Nano Aplicación',
                description: 'Fusión molecular capa por capa.',
                icon: 'Layers',
                image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070'
            },
            {
                title: 'Curado',
                description: 'Cristalización bajo espectro IR.',
                icon: 'Scan',
                image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070'
            },
        ],
        faq: [
            {
                question: '¿Diferencia con cera?',
                answer: 'La cera es cosmética y dura semanas. El cerámico es estructural, dura años y es infinitamente más duro.',
            },
            {
                question: '¿Evita rayones?',
                answer: 'Reduce el "swirl" de lavados, pero no detiene rocas. Para eso necesitas PPF.',
            },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070', // Foam / Washing
            'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070', // Polishing
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070' // Coating application
        ]
    },
    'ppf': {
        id: 'ppf',
        title: 'Paint Protection Film',
        subtitle: 'Armadura invisible. Resistencia militar.',
        description: 'La única defensa real contra la carretera. Film de poliuretano autorregenerativo que absorbe impactos de piedras, raspones y vandalismo. Tu pintura original, intacta, para siempre.',
        heroImage: 'https://images.unsplash.com/photo-1621905252472-943af68f03fa?q=80&w=2070', // PPF Application / Detail
        secondaryImage: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070',
        technicalSpecs: [
            { label: 'Grosor', value: '250 Micrones' },
            { label: 'Self-Healing', value: 'Instantáneo' },
            { label: 'Garantía', value: '10 Años' },
            { label: 'Acabado', value: 'Invisible' },
        ],
        process: [
            {
                title: 'Prep Quirúrgica',
                description: 'Descontaminación total.',
                icon: 'Microscope',
                image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070'
            },
            {
                title: 'Diseño CNC',
                description: 'Corte digital, cero navajas en pintura.',
                icon: 'Scan',
                image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070'
            },
            {
                title: 'Instalación',
                description: 'Posicionamiento en gel sin tensión.',
                icon: 'Layers',
                image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070'
            },
            {
                title: 'Wrapping de Bordes',
                description: 'Bordes envueltos para invisibilidad.',
                icon: 'Shield',
                image: 'https://images.unsplash.com/photo-1621359953476-b1629904f81c?q=80&w=2070'
            },
            {
                title: 'Control QC',
                description: 'Inspección microscópica final.',
                icon: 'UserCheck',
                image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070'
            },
        ],
        faq: [
            { question: '¿Amarillea?', answer: 'Jamás. Garantía escrita antiamarilleo de por vida.' },
            { question: '¿Se nota?', answer: 'Si está bien instalado, es indetectable a simple vista.' },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1493238792015-fa643c15b179?q=80&w=2071',
            'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2070',
            'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070'
        ]
    },
    'wrapping': {
        id: 'wrapping',
        title: 'Color Change Wrap',
        subtitle: 'Tu visión. Tu color. Sin compromisos.',
        description: 'Reinventa tu vehículo. Más de 500 acabados premium desde Matte Metallic hasta Satin Chrome. Personalización reversible que protege tu pintura original.',
        heroImage: 'https://images.unsplash.com/photo-1493238792015-fa643c15b179?q=80&w=2071&auto=format&fit=crop', // Matte Black Merc
        secondaryImage: 'https://images.unsplash.com/photo-1615900119312-2acd3a71f3ad?q=80&w=2070',
        technicalSpecs: [
            { label: 'Film', value: '3M / Avery' },
            { label: 'Vida Útil', value: '5-7 Años' },
            { label: 'Reversibilidad', value: '100% Segura' },
            { label: 'Acabados', value: '+500' },
        ],
        process: [
            {
                title: 'Desarme',
                description: 'Acceso a bordes profundos.',
                icon: 'Scan',
                image: 'https://images.unsplash.com/photo-1597598852336-39f50e321591?q=80&w=2070'
            },
            {
                title: 'Limpieza',
                description: 'Eliminación total de ceras.',
                icon: 'Droplets',
                image: 'https://images.unsplash.com/photo-1618485295982-f67353f40d58?q=80&w=2070'
            },
            {
                title: 'Aplicación',
                description: 'Técnica de vidrio "zero-stretch".',
                icon: 'Layers',
                image: 'https://images.unsplash.com/photo-1621359953476-b1629904f81c?q=80&w=2070'
            },
            {
                title: 'Post-Heat',
                description: 'Sellado de memoria a 90°C.',
                icon: 'Sparkles',
                image: 'https://images.unsplash.com/photo-1549429184-c8d8c973f739?q=80&w=2070'
            },
            {
                title: 'Re-Armado',
                description: 'Ajuste de fábrica.',
                icon: 'Shield',
                image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=2071'
            }
        ],
        faq: [
            { question: '¿Daña la pintura?', answer: 'No. La preserva como una cápsula del tiempo.' },
            { question: '¿Cuidados?', answer: 'Lavado a mano. Evitar túneles de rodillos.' },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1493238792015-fa643c15b179?q=80&w=2071',
            'https://images.unsplash.com/photo-1621359953476-b1629904f81c?q=80&w=2070'
        ]
    },
    'detailing': {
        id: 'detailing',
        title: 'Interior Boutique',
        subtitle: 'Restauración. Desinfección. Perfección.',
        description: 'Vapor a alta presión y química enzimática para devolver la textura y el olor original a su interior. Cada superficie, desde el cuero más fino hasta las alfombras más densas, es tratada con precisión quirúrgica.',
        heroImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop', // Interior Dark
        secondaryImage: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070',
        technicalSpecs: [
            { label: 'Tiempo', value: 'Full Day' },
            { label: 'Proceso', value: 'Vapor/Ozono' },
            { label: 'Cueros', value: 'Hidratación' },
            { label: 'Bacterias', value: 'Eliminación 99%' },
        ],
        process: [
            {
                title: 'Aspirado',
                description: 'Extracción de profundidad.',
                icon: 'Scan',
                image: 'https://images.unsplash.com/photo-1520031856722-e3e979d38392?q=80&w=2070'
            },
            {
                title: 'Enzimas',
                description: 'Breakdown de manchas orgánicas.',
                icon: 'Droplets',
                image: 'https://images.unsplash.com/photo-1632823471449-3353db47f525?q=80&w=2070'
            },
            {
                title: 'Vapor',
                description: 'Sanitización de ductos.',
                icon: 'Sparkles',
                image: 'https://images.unsplash.com/photo-1635332847249-144f80877014?q=80&w=2070'
            },
            {
                title: 'Cueros',
                description: 'Nutrición mate acabado fábrica.',
                icon: 'Layers',
                image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2070'
            },
            {
                title: 'Protección',
                description: 'Sellado UV de tableros.',
                icon: 'Shield',
                image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070'
            },
        ],
        faq: [
            { question: '¿Queda olor?', answer: 'Solo a limpio. No usamos perfumes invasivos.' },
            { question: '¿Secado?', answer: 'Se entrega 100% seco y listo para usar.' },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070',
            'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070',
            'https://images.unsplash.com/photo-1584621539227-2ad16a8d8763?q=80&w=2070'
        ]
    }
};

export const servicesData = defaultServicesData;

export async function getServices(): Promise<Record<string, ServiceData>> {
    try {
        const { data, error } = await supabase.from('services').select('*');

        if (error) {
            // console.warn("Supabase fetch error (using defaults):", error.message);
            // Return defaults silently to avoid blocking the UI with error overlays in dev
            return defaultServicesData;
        }

        // If no data in DB, return defaults
        if (!data || data.length === 0) {
            return defaultServicesData;
        }

        const newServices = { ...defaultServicesData };

        data.forEach((service: any) => {
            if (newServices[service.id]) {
                newServices[service.id] = {
                    ...newServices[service.id],
                    title: service.title || newServices[service.id].title,
                    description: service.description || newServices[service.id].description,
                    heroImage: service.hero_image_url || newServices[service.id].heroImage,
                };
            }
        });
        return newServices;
    } catch (e) {
        console.error("Failed to fetch services", e);
        return defaultServicesData;
    }
}
