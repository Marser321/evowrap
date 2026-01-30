'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Droplets, ShieldAlert, Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "¿El PPF se pone amarillo con el tiempo?",
        answer: "Absolutamente no con nuestra tecnología. Utilizamos películas de TPU (Poliuretano Termoplástico) alifático de grado óptico. A diferencia de los films baratos de PVC, nuestra estructura molecular no reacciona a la radiación UV. Garantizamos 'Non-Yellowing' por 10 años por escrito.",
        icon: ShieldAlert,
        tag: "Garantía Escrita"
    },
    {
        question: "¿Puedo llevar mi auto a lavaderos automáticos?",
        answer: "No recomendamos los túneles de rodillos. Incluso con protección cerámica o PPF, la abrasión mecánica de los rodillos sucios genera 'swirls' (micro-arañazos) profundos. Recomendamos lavado manual con guante de microfibra o 'Touchless' para mantener la integridad hidrofóbica y el brillo espejo.",
        icon: AlertCircle,
        tag: "Cuidado Crítico"
    },
    {
        question: "¿Qué protege contra el salitre de Maldonado?",
        answer: "El salitre es corrosivo y ataca la laca desnuda rápidamente. Nuestro Tratamiento Cerámico (Gtechniq) crea una barrera química impermeable que sella los poros del barniz. La sal no puede penetrar ni anclar, permitiendo que se elimine con un simple enjuague sin dejar marcas de agua ácida.",
        icon: Droplets,
        tag: "Protección Costera"
    }
];

export default function EducationFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="flex flex-col h-full justify-center w-full max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                    EVO <span className="text-gold-500">KNOWLEDGE</span>
                </h2>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    La verdad técnica detrás de la protección automotriz. Sin mitos.
                </p>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div
                        key={idx}
                        className={`group rounded-2xl border transition-all duration-300 ${openIndex === idx ? 'bg-zinc-900/80 border-gold-500/50 shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'bg-transparent border-white/10 hover:border-white/20'}`}
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            className="w-full text-left p-6 flex items-start gap-4"
                        >
                            <div className={`mt-1 p-2 rounded-lg transition-colors ${openIndex === idx ? 'bg-gold-500 text-black' : 'bg-zinc-800 text-zinc-400 group-hover:text-white'}`}>
                                <faq.icon size={24} />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className={`text-xl font-bold transition-colors ${openIndex === idx ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                                        {faq.question}
                                    </h3>
                                    <span className="text-zinc-500">
                                        {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                                    </span>
                                </div>

                                <AnimatePresence>
                                    {openIndex === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pt-4 text-zinc-400 leading-relaxed text-base">
                                                {faq.answer}
                                            </p>
                                            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 text-xs text-gold-400 font-medium uppercase tracking-wider">
                                                {faq.tag}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
