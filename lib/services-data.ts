import React from 'react';
import { Shield, Sparkles, Droplets, Sun, Layers, Microscope, Scan, UserCheck } from 'lucide-react';

export interface ProcessStep {
    title: string;
    description: string;
    icon: React.ElementType; // Lucide icon component
    image?: string;
}

export interface ServiceData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage: string; // Placeholder for now
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

export const servicesData: Record<string, ServiceData> = {
    'ceramic-coating': {
        id: 'ceramic-coating',
        title: 'Tratamiento Cerámico Gtechniq',
        subtitle: 'Protección molecular de vanguardia para una estética inigualable.',
        description: 'Nuestro tratamiento cerámico crea una barrera química permanente que se une a la pintura de su vehículo. Proporciona resistencia extrema a químicos, rayos UV y suciedad, manteniendo un brillo de exhibición por años.',
        heroImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop', // Close up of car paint
        secondaryImage: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2070&auto=format&fit=crop', // Red car detailing
        technicalSpecs: [
            { label: 'Dureza', value: '9H/10H (Escala Mohs)' },
            { label: 'Duración', value: 'Hasta 5 años' },
            { label: 'Resistencia Química', value: 'pH 2 - pH 13' },
            { label: 'Efecto Hidrofóbico', value: 'Extremo' },
        ],
        process: [
            {
                title: 'Descontaminación Química',
                description: 'Eliminación profunda de partículas metálicas y brea.',
                icon: Microscope,
                image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop' // Foam Wash
            },
            {
                title: 'Corrección de Barniz',
                description: 'Nivelación microscópica de la laca para brillo extremo.',
                icon: Sparkles,
                image: 'https://images.unsplash.com/photo-1626077383615-189f3a8b418a?q=80&w=2070&auto=format&fit=crop' // Polishing
            },
            {
                title: 'Desengrasado IPA',
                description: 'Limpieza final para una adhesión perfecta.',
                icon: Droplets,
                image: 'https://images.unsplash.com/photo-1634055610667-336706900f07?q=80&w=2070&auto=format&fit=crop' // Surface cleaning
            },
            {
                title: 'Aplicación Multicapa',
                description: 'Control de humedad y temperatura para curado uniforme.',
                icon: Layers,
                image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2070&auto=format&fit=crop' // Detailing detail
            },
            {
                title: 'Curado IR',
                description: 'Lámparas infrarrojas para sellar la protección.',
                icon: Scan,
                image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop' // Red car detail
            },
        ],
        faq: [
            {
                question: '¿Necesito encerar mi auto?',
                answer: 'No. El cerámico reemplaza la necesidad de ceras.',
            },
            {
                question: '¿Protege contra golpes?',
                answer: 'No. Para protección contra impactos recomendamos PPF.',
            },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop'
        ]
    },
    'ppf': {
        id: 'ppf',
        title: 'Paint Protection Film (PPF)',
        subtitle: 'El escudo invisible definitivo contra impactos y desgaste.',
        description: 'Película de poliuretano termoplástico transparente y autorregenerativa. La única protección real contra impactos de piedras, raspones y vandalismo, manteniendo la pintura original intacta por décadas.',
        heroImage: 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?q=80&w=2070&auto=format&fit=crop', // Supercar detail
        secondaryImage: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?q=80&w=2070&auto=format&fit=crop', // Hood close up
        technicalSpecs: [
            { label: 'Espesor', value: '200 Micrones' },
            { label: 'Autorregeneración', value: 'Sí (con calor)' },
            { label: 'Garantía', value: '10 Años' },
            { label: 'Acabado', value: 'Invisible / Mate' },
        ],
        process: [
            {
                title: 'Descontaminación Extrema',
                description: 'Limpieza quirúrgica previa.',
                icon: Microscope,
                image: 'https://images.unsplash.com/photo-1600294037233-0c46aec33486?q=80&w=2070&auto=format&fit=crop' // High pressure wash
            },
            {
                title: 'Diseño Digital',
                description: 'Patrones exactos por computadora.',
                icon: Scan,
                image: 'https://images.unsplash.com/photo-1563206767-5b18f218e03d?q=80&w=2070&auto=format&fit=crop' // Computerized pattern
            },
            {
                title: 'Instalación con Gel',
                description: 'Posicionamiento preciso sin burbujas.',
                icon: Layers,
                image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop' // Porsche detail
            },
            {
                title: 'Sellado de Bordes',
                description: 'Instalación indetectable en aristas.',
                icon: Shield,
                image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop' // Supercar detail
            },
            {
                title: 'Inspección Final',
                description: 'Revisión tras 24hs de asentamiento.',
                icon: UserCheck,
                image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop' // Ford Mustang detail
            },
        ],
        faq: [
            { question: '¿Se pone amarillo?', answer: 'No. Usamos films con inhibidores UV garantizados por 10 años que mantienen la transparencia absoluta.' },
            { question: '¿Se autorregenera?', answer: 'Sí. Las marcas de lavado y micro-arañazos desaparecen por completo al aplicar calor.' },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1567818735868-e71b99932e29?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop'
        ]
    },
    'wrapping': {
        id: 'wrapping',
        title: 'Vinyl Wrapping',
        subtitle: 'Transformación radical de color y estética premium.',
        description: 'Personalización total sin comprometer la pintura original. Cientos de acabados premium: mate, satinado, cromo o texturizados.',
        heroImage: 'https://images.unsplash.com/photo-1621359953476-b1629904f81c?q=80&w=2070&auto=format&fit=crop', // Wrapped Lambo
        secondaryImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop', // Supercar
        technicalSpecs: [
            { label: 'Material', value: 'Vinilo Cast 3M/Avery' },
            { label: 'Duración', value: '5-7 Años' },
            { label: 'Reversible', value: '100%' },
            { label: 'Colores', value: '+500 Opciones' },
        ],
        process: [
            {
                title: 'Desarmado Técnico',
                description: 'Remoción de manijas y espejos para ocultar bordes.',
                icon: Scan,
                image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025&auto=format&fit=crop'
            },
            {
                title: 'Limpieza de Residuos',
                description: 'Eliminación total de ceras y grasas.',
                icon: Droplets,
                image: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?q=80&w=2070&auto=format&fit=crop' // Polay detail
            },
            {
                title: 'Moldeado Térmico',
                description: 'Adaptación perfecta a curvas complejas.',
                icon: Layers,
                image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2070&auto=format&fit=crop' // Surface detail
            },
            {
                title: 'Corte Invisible',
                description: 'Precisión quirúrgica en cada panel.',
                icon: Sparkles,
                image: 'https://images.unsplash.com/photo-1614002241517-742a1cf45501?q=80&w=2070&auto=format&fit=crop' // Precision detail
            },
            {
                title: 'Post-Calentamiento',
                description: 'Sellado de memoria del material.',
                icon: Shield,
                image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2070&auto=format&fit=crop' // Supercar
            },
        ],
        faq: [
            { question: '¿Daña la pintura?', answer: 'No. Al contrario, la protege de rayos UV y pequeños impactos.' },
            { question: '¿Se puede lavar?', answer: 'Sí, pero recomendamos lavado a mano o sin cepillos agresivos.' },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1621359953476-b1629904f81c?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop'
        ]
    },
    'detailing': {
        id: 'detailing',
        title: 'Elite Interior Detailing',
        subtitle: 'Restauración profunda para una experiencia de cabina nueva.',
        description: 'Vapor a alta presión y química enzimática para devolver la textura y el olor original a su interior. Cada superficie, desde el cuero más fino hasta las alfombras más densas, es tratada con precisión quirúrgica.',
        heroImage: 'https://images.unsplash.com/photo-1607604318146-2f98642ba5ba?q=80&w=2070&auto=format&fit=crop', // Stunning interior view
        secondaryImage: 'https://images.unsplash.com/photo-1570197730598-6ce814524817?q=80&w=2070&auto=format&fit=crop', // Interior spray detail
        technicalSpecs: [
            { label: 'Tiempo', value: '1 Día' },
            { label: 'Desinfección', value: 'Ozono / Vapor' },
            { label: 'Protección', value: 'Hidratación UV' },
            { label: 'Alcance', value: 'Techo, Alfombras, Cueros' },
        ],
        process: [
            {
                title: 'Aspirado de Alta Succión',
                description: 'Remoción de suciedad encapsulada en zonas imposibles.',
                icon: Scan,
                image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop' // Vacuuming interior
            },
            {
                title: 'Limpieza Enzimática',
                description: 'Descomposición biológica de olores y manchas.',
                icon: Droplets,
                image: 'https://images.unsplash.com/photo-1634055610667-336706900f07?q=80&w=2070&auto=format&fit=crop' // Detailing brush
            },
            {
                title: 'Vapor de Grado Médico',
                description: 'Desinfección total a 140°C de ductos y telas.',
                icon: Sparkles,
                image: 'https://images.unsplash.com/photo-1614000531402-74cca389903f?q=80&w=2070&auto=format&fit=crop' // Steam detail
            },
            {
                title: 'Nutrición de Cueros',
                description: 'Acondicionadores con aceites naturales y lanolina.',
                icon: Layers,
                image: 'https://images.unsplash.com/photo-1647288764834-4bc594956aa4?q=80&w=2070&auto=format&fit=crop' // Leather care
            },
            {
                title: 'Protección Satín UV',
                description: 'Acabado mate original que bloquea el envejecimiento solar.',
                icon: Shield,
                image: 'https://images.unsplash.com/photo-1594248512140-54605963f46f?q=80&w=2070&auto=format&fit=crop' // Dashboard detail
            },
        ],
        faq: [
            { question: '¿Huele a químico?', answer: 'No. Usamos productos biodegradables con aromas neutros que desaparecen rápido.' },
            { question: '¿Elimina manchas de café/sangre?', answer: 'Removemos el 99% de manchas orgánicas comunes. El éxito depende de cuánto tiempo lleve la mancha allí.' },
        ],
        gallery: [
            'https://images.unsplash.com/photo-1607604318146-2f98642ba5ba?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1594503723307-e432a688b75f?q=80&w=2062&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1650380802100-848834466b03?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1602419227945-91f98bc1ea3e?q=80&w=2102&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1617469767053-d3b508a04ea0?q=80&w=2102&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1614000531402-74cca389903f?q=80&w=2070&auto=format&fit=crop'
        ]
    },
};
