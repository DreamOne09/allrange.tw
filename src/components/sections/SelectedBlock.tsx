'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { realProjects, heroSubset } from '@/data/real_projects';

// Mapping user's requested "Old Hero" projects to our available RealProjects
// 1. 台北 101 => real-01 (Found)
// 2. Lexus (Space) => real-02 (Using CMP/Iron as proxy or real-05) -> Let's use real-05 (Water Design) as a space placeholder or real-02
// 3. Palace (Multimedia) => real-09 (Hsinchu EPA? or real-03 Broadsims) -> Let's use real-03 Broadsims
// 4. Nike (Retail) => real-10 (Yulon) -> As requested by user to replace "Nike" with Yulon? Or keep strictly old code.
// User code had: 101, Lexus, Palace, Nike. 
// I will map these to the best available images in realProjects to ensure no broken images.

// using heroSubset which now contains [101, Yulon, ITRI]
const projects = heroSubset.map((project, index) => ({
    id: project.id,
    title: project.title,
    category: project.category,
    year: "2023", // Placeholder year or add to data
    color: index === 0 ? "from-brand-orange to-red-900" :
        index === 1 ? "from-emerald-900 to-black" :
            "from-blue-900 to-black",
    image: project.image,
    videoUrl: project.videoUrl
}));

const SelectedBlock = () => {
    const [activeCategory, setActiveCategory] = useState<'all' | 'space' | 'exhibition' | 'graphic'>('all');

    // Filter projects based on category
    const filteredProjects = realProjects.filter(p =>
        activeCategory === 'all' ? true : p.category === activeCategory
    ).slice(0, 5); // Show up to 5 featured projects in the list

    const [activeProject, setActiveProject] = useState(filteredProjects[0] || realProjects[0]);

    const categories = [
        { id: 'all', label: 'All / 全部', icon: '✦' },
        { id: 'space', label: 'Space / 空間', icon: '⬢' },
        { id: 'exhibition', label: 'Exhibition / 展覽', icon: '■' },
        { id: 'graphic', label: 'Graphic / 平面', icon: '▲' },
    ] as const;

    const handleCategoryChange = (catId: typeof activeCategory) => {
        setActiveCategory(catId);
        const newFiltered = realProjects.filter(p => catId === 'all' ? true : p.category === catId);
        if (newFiltered.length > 0) {
            setActiveProject(newFiltered[0]);
        }
    };

    return (
        <section className="relative min-h-screen bg-brand-black flex flex-col overflow-hidden border-b border-white/10">
            {/* Section Title & Category Filter */}
            <div className="container mx-auto px-6 pt-20 pb-8 relative z-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-2">
                            精選作品
                        </h2>
                        <p className="text-brand-gold text-sm md:text-base tracking-[0.4em] uppercase font-bold opacity-80">
                            Selected Works Portfolio
                        </p>
                    </motion.div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 md:gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${activeCategory === cat.id
                                    ? 'bg-brand-orange border-brand-orange text-white shadow-[0_0_20px_rgba(255,102,0,0.4)]'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                <span className="mr-2 opacity-60 group-hover:opacity-100">{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Dynamic Background with Vivid Images */}
            <div className="absolute inset-0 transition-colors duration-700 ease-in-out bg-black">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeProject.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0"
                    >
                        {activeProject.image && (
                            <Image
                                src={activeProject.image}
                                alt={activeProject.title}
                                fill
                                className="object-cover opacity-20 blur-md scale-110"
                                priority
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 pb-20">
                {/* Left: Dynamic MAIN Visual (3D & Vivid) OR Video */}
                <div className="lg:col-span-7">
                    <Link href={`/work#${activeProject.id}`} className="block">
                        <motion.div
                            key={activeProject.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group cursor-pointer"
                        >
                            <AnimatePresence mode="wait">
                                {activeProject.videoUrl ? (
                                    <motion.div
                                        key={`video-${activeProject.id}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${activeProject.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${activeProject.videoUrl}&controls=0`}
                                            title="Project Video"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full object-cover pointer-events-none"
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={`img-${activeProject.id}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={activeProject.image}
                                            alt={activeProject.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-brand-orange text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                                    Featured Project
                                </span>
                                <h3 className="text-2xl md:text-4xl font-black text-white mb-4">
                                    {activeProject.title}
                                </h3>
                                <div className="flex items-center gap-4 text-white/60 text-sm">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                                        {activeProject.categoryLabel}
                                    </span>
                                </div>
                            </div>

                            {/* Hover hint */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                <div className="bg-brand-orange/90 text-white px-8 py-3 rounded-full font-bold tracking-[0.2em] uppercase text-xs">
                                    View Details
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </div>

                {/* Right: Project List */}
                <div className="lg:col-span-5 space-y-2">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`relative border border-white/5 rounded-xl p-4 md:p-6 cursor-pointer group transition-all duration-300 ${activeProject.id === project.id
                                    ? 'bg-white/10 border-brand-gold/30 shadow-xl'
                                    : 'hover:bg-white/5'
                                    }`}
                                onHoverStart={() => setActiveProject(project)}
                                onClick={() => setActiveProject(project)}
                            >
                                <div className="flex items-center gap-6">
                                    <span className={`text-2xl font-black font-mono transition-colors duration-300 ${activeProject.id === project.id ? 'text-brand-orange' : 'text-white/10'
                                        }`}>
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`text-lg md:text-xl font-bold transition-all duration-300 ${activeProject.id === project.id ? 'text-white' : 'text-white/40 group-hover:text-white/60'
                                            }`}>
                                            {project.title.split('：')[0]}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">
                                                {project.categoryLabel}
                                            </span>
                                        </div>
                                    </div>

                                    {activeProject.id === project.id && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-brand-orange"
                                        >
                                            <ArrowRight size={20} />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                            <p className="text-gray-500 uppercase tracking-widest text-xs">No projects in this category yet</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SelectedBlock;
