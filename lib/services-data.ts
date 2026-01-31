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
        heroImage: '/images/portfolio/ceramic-reflection.jpg',
        secondaryImage: '/images/portfolio/porsche-ceramic-shine.jpg',
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
                image: '/images/portfolio/detail-macro.jpg'
            },
            {
                title: 'Corrección Paint',
                description: 'Restauración de reflectividad al 100%.',
                icon: 'Sparkles',
                image: '/images/portfolio/wrap-process-1.jpg'
            },
            {
                title: 'IPA Prep',
                description: 'Esterilización de superficie.',
                icon: 'Droplets',
                image: '/images/portfolio/wrap-studio-1.jpg'
            },
            {
                title: 'Nano Aplicación',
                description: 'Fusión molecular capa por capa.',
                icon: 'Layers',
                image: '/images/portfolio/wrap-process-2.jpg'
            },
            {
                title: 'Curado',
                description: 'Cristalización bajo espectro IR.',
                icon: 'Scan',
                image: '/images/portfolio/premium-finish.jpg'
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
            '/images/portfolio/ceramic-reflection.jpg',
            '/images/portfolio/detail-macro.jpg',
            '/images/portfolio/porsche-ceramic-shine.jpg'
        ]
    },
    'ppf': {
        id: 'ppf',
        title: 'Paint Protection Film',
        subtitle: 'Armadura invisible. Resistencia militar.',
        description: 'La única defensa real contra la carretera. Film de poliuretano autorregenerativo que absorbe impactos de piedras, raspones y vandalismo. Tu pintura original, intacta, para siempre.',
        heroImage: '/images/portfolio/ppf-application.jpg',
        secondaryImage: '/images/portfolio/lambo-matte-wrap.jpg',
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
                image: '/images/portfolio/detail-macro.jpg'
            },
            {
                title: 'Diseño CNC',
                description: 'Corte digital, cero navajas en pintura.',
                icon: 'Scan',
                image: '/images/portfolio/wrap-studio-1.jpg'
            },
            {
                title: 'Instalación',
                description: 'Posicionamiento en gel sin tensión.',
                icon: 'Layers',
                image: '/images/portfolio/wrap-process-1.jpg'
            },
            {
                title: 'Wrapping de Bordes',
                description: 'Bordes envueltos para invisibilidad.',
                icon: 'Shield',
                image: '/images/portfolio/wrap-process-2.jpg'
            },
            {
                title: 'Control QC',
                description: 'Inspección microscópica final.',
                icon: 'UserCheck',
                image: '/images/portfolio/premium-finish.jpg'
            },
        ],
        faq: [
            { question: '¿Amarillea?', answer: 'Jamás. Garantía escrita antiamarilleo de por vida.' },
            { question: '¿Se nota?', answer: 'Si está bien instalado, es indetectable a simple vista.' },
        ],
        gallery: [
            '/images/portfolio/ppf-application.jpg',
            '/images/portfolio/ceramic-reflection.jpg',
            '/images/portfolio/lambo-matte-wrap.jpg'
        ]
    },
    'wrapping': {
        id: 'wrapping',
        title: 'Color Change Wrap',
        subtitle: 'Tu visión. Tu color. Sin compromisos.',
        description: 'Reinventa tu vehículo. Más de 500 acabados premium desde Matte Metallic hasta Satin Chrome. Personalización reversible que protege tu pintura original.',
        heroImage: '/images/portfolio/matte-black-gtr.jpg',
        secondaryImage: '/images/portfolio/bmw-satin-wrap.jpg',
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
                image: '/images/portfolio/wrap-studio-2.jpg'
            },
            {
                title: 'Limpieza',
                description: 'Eliminación total de ceras.',
                icon: 'Droplets',
                image: '/images/portfolio/detail-macro.jpg'
            },
            {
                title: 'Aplicación',
                description: 'Técnica de vidrio "zero-stretch".',
                icon: 'Layers',
                image: '/images/portfolio/wrap-process-2.jpg'
            },
            {
                title: 'Post-Heat',
                description: 'Sellado de memoria a 90°C.',
                icon: 'Sparkles',
                image: '/images/portfolio/gallery-1.jpg'
            },
            {
                title: 'Re-Armado',
                description: 'Ajuste de fábrica.',
                icon: 'Shield',
                image: '/images/portfolio/premium-finish.jpg'
            }
        ],
        faq: [
            { question: '¿Daña la pintura?', answer: 'No. La preserva como una cápsula del tiempo.' },
            { question: '¿Cuidados?', answer: 'Lavado a mano. Evitar túneles de rodillos.' },
        ],
        gallery: [
            '/images/portfolio/matte-black-gtr.jpg',
            '/images/portfolio/wrap-process-2.jpg'
        ]
    },
    'detailing': {
        id: 'detailing',
        title: 'Interior Boutique',
        subtitle: 'Restauración. Desinfección. Perfección.',
        description: 'Vapor a alta presión y química enzimática para devolver la textura y el olor original a su interior. Cada superficie, desde el cuero más fino hasta las alfombras más densas, es tratada con precisión quirúrgica.',
        heroImage: '/images/portfolio/detailing-interior.jpg',
        secondaryImage: '/images/portfolio/detail-macro.jpg',
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
                image: '/images/portfolio/wrap-studio-2.jpg'
            },
            {
                title: 'Enzimas',
                description: 'Breakdown de manchas orgánicas.',
                icon: 'Droplets',
                image: '/images/portfolio/detail-macro.jpg'
            },
            {
                title: 'Vapor',
                description: 'Sanitización de ductos.',
                icon: 'Sparkles',
                image: '/images/portfolio/gallery-2.jpg'
            },
            {
                title: 'Cueros',
                description: 'Nutrición mate acabado fábrica.',
                icon: 'Layers',
                image: '/images/portfolio/gallery-3.jpg'
            },
            {
                title: 'Protección',
                description: 'Sellado UV de tableros.',
                icon: 'Shield',
                image: '/images/portfolio/premium-finish.jpg'
            },
        ],
        faq: [
            { question: '¿Queda olor?', answer: 'Solo a limpio. No usamos perfumes invasivos.' },
            { question: '¿Secado?', answer: 'Se entrega 100% seco y listo para usar.' },
        ],
        gallery: [
            '/images/portfolio/detailing-interior.jpg',
            '/images/portfolio/detail-macro.jpg',
            '/images/portfolio/gallery-4.jpg'
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
