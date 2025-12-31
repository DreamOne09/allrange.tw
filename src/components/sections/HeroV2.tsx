'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

import { heroSubset } from '@/data/real_projects';

const projects = [
    {
        id: 1,
        title: "台北 101 觀景台博覽會",
        category: "展場設計",
        year: "2024",
        color: "from-brand-orange to-red-900",
        image: heroSubset[0].image // 0012
    },
    {
        id: 2,
        title: "Lexus 品牌概念店",
        category: "空間規劃",
        year: "2023",
        color: "from-blue-900 to-black",
        image: heroSubset[3].image // 0015
    },
    {
        id: 3,
        title: "故宮博物院 - 數位典藏",
        category: "多媒體互動",
        year: "2023",
        color: "from-emerald-900 to-black",
        image: heroSubset[5].image // 0017
    },
    {
        id: 4,
        title: "Nike 旗艦店 - 沉浸式體驗",
        category: "零售設計",
        year: "2022",
        color: "from-purple-900 to-black",
        image: heroSubset[8].image // 0020
    }
];

const HeroV2 = () => {
    const [activeProject, setActiveProject] = useState(projects[0]);

    return (
        <section className="relative h-screen bg-brand-black flex items-center overflow-hidden border-b border-white/10">
            {/* Dynamic Background with Vivid Images */}
            <div className="absolute inset-0 transition-colors duration-700 ease-in-out bg-black">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeProject.id === project.id ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        {/* Vivid Image - Low Opacity Background Version */}
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover opacity-30 blur-sm" // Blurred background
                            priority={project.id === 1}
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Dynamic MAIN Visual (3D & Vivid) */}
                <motion.div
                    className="relative h-[50vh] md:h-[60vh] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-brand-gold/30 shadow-[0_0_30px_rgba(248,182,45,0.15)]"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ perspective: 1000 }}
                >
                    <motion.div
                        className="w-full h-full relative"
                        whileHover={{ rotateY: 5, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* VIVID IMAGE: No opacity, full color */}
                                <Image
                                    src={activeProject.image}
                                    alt={activeProject.title}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Subtle internal border glow */}
                                <div className="absolute inset-0 border-[1px] border-white/10 rounded-2xl pointer-events-none" />

                                {/* Label Overlay */}
                                <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-brand-gold/50">
                                    <h3 className="text-white font-bold text-lg md:text-xl tracking-wide">
                                        <span className="text-brand-gold mr-3">●</span>
                                        {activeProject.title}
                                    </h3>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                {/* Right: Interactive List */}
                <div className="flex flex-col pl-0 md:pl-12">
                    <h3 className="text-brand-gold mb-8 uppercase tracking-[0.3em] text-sm font-bold pl-4 border-l-2 border-brand-gold">
                        Featured Projects
                    </h3>
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="relative border-b border-white/10 py-6 pl-4 cursor-pointer group transition-all duration-300 hover:pl-8 hover:bg-white/5"
                            onHoverStart={() => setActiveProject(project)}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-col justify-center min-w-0">
                                <h4 className={`text-2xl md:text-3xl font-bold transition-all duration-300 ${activeProject.id === project.id ? 'text-white translate-x-2 text-gold-gradient' : 'text-white/40'
                                    }`}>
                                    {project.title}
                                </h4>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className={`h-[1px] w-8 transition-all duration-300 ${activeProject.id === project.id ? 'bg-brand-gold w-16' : 'bg-transparent'}`} />
                                    <span className="text-sm text-brand-gold/80 font-mono hidden md:block uppercase tracking-wider">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroV2;
