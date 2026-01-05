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
    id: index + 1,
    title: project.title,
    category: project.category,
    year: "2023", // Placeholder year or add to data
    color: index === 0 ? "from-brand-orange to-red-900" :
        index === 1 ? "from-emerald-900 to-black" :
            "from-blue-900 to-black",
    image: project.image
}));

const SelectedBlock = () => {
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
                        {project.image && (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover opacity-30 blur-sm" // Blurred background
                                priority={project.id === 1}
                            />
                        )}
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                ))}
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left: Dynamic MAIN Visual (3D & Vivid) OR Video */}
                <Link href={`/work/${activeProject.id}`} className="w-full">
                    <motion.div
                        className="relative h-[40vh] md:h-[60vh] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-brand-gold/30 shadow-[0_0_30px_rgba(248,182,45,0.15)] group cursor-pointer"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
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
                                    {/* Disable iframe interactions so click goes to Link? Or add overlay?
                                        Actually, if controls=1, user might want to control video.
                                        But requirement is "Click to see detailed info".
                                        If video has controls, clicking play/pause won't navigate.
                                        Maybe we just make the Title/Button click navigate, and Video is playable?
                                        BUT I added "pointer-events-none" above to iframe to force click to pass through to Link?
                                        If user wants to watch video here, they can't.
                                        Let's keep controls=0 and pointer-events-none for "Preview" feel.
                                        User goes to work page to watch full video.
                                    */}
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
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Hover hint */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                            <div className="bg-brand-orange/90 text-white px-6 py-2 rounded-full font-bold tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                View Project
                            </div>
                        </div>

                    </motion.div>
                </Link>

                {/* Right: Project List */}
                <div className="space-y-4">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="relative border-b border-white/10 py-6 pl-4 cursor-pointer group transition-all duration-300 hover:pl-8 hover:bg-white/5 active:bg-white/10"
                            onHoverStart={() => setActiveProject(project)}
                            onClick={() => setActiveProject(project)} // Enable tap on mobile
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-col justify-center min-w-0">
                                <div className="flex justify-between items-center group-hover:translate-x-2 transition-transform duration-300">
                                    <h4 className={`text-xl md:text-3xl font-bold transition-all duration-300 ${activeProject.id === project.id ? 'text-white text-gold-gradient' : 'text-white/40'
                                        }`}>
                                        {project.title}
                                    </h4>

                                    {/* View Button (Visible when active) */}
                                    <Link
                                        href={`/work/${project.id}`}
                                        className={`ml-4 flex items-center text-brand-orange text-sm font-bold uppercase tracking-wider transition-opacity duration-300 ${activeProject.id === project.id ? 'opacity-100' : 'opacity-0'}`}
                                        onClick={(e) => e.stopPropagation()} // Prevent parent click from interfering
                                    >
                                        View Case <ArrowRight size={16} className="ml-1" />
                                    </Link>
                                </div>

                                <div className="flex items-center gap-3 mt-2">
                                    <span className={`h-[1px] w-8 transition-all duration-300 ${activeProject.id === project.id ? 'bg-brand-gold w-12 md:w-16' : 'bg-transparent'}`} />
                                    <span className="text-xs md:text-sm text-brand-gold/80 font-mono uppercase tracking-wider block">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default SelectedBlock;
