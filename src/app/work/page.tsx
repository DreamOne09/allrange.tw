'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { realProjects } from '@/data/real_projects';
import { useState, useEffect } from 'react';
import WorkHero from '@/components/sections/WorkHero';

export default function WorkPage() {
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'space' | 'exhibition' | 'graphic'>('all');
    const [activeSection, setActiveSection] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const categories = [
        { id: 'all', label: 'All / 全部' },
        { id: 'space', label: 'Space / 空間' },
        { id: 'exhibition', label: 'Exhibition / 展覽' },
        { id: 'graphic', label: 'Graphic / 平面' },
    ] as const;

    const filteredProjects = realProjects.filter(p =>
        selectedCategory === 'all' ? true : p.category === selectedCategory
    );

    useEffect(() => {
        const handleScroll = () => {
            const sections = filteredProjects.map(p => document.getElementById(p.id));
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                if (section) {
                    const { offsetTop, offsetHeight } = section;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [filteredProjects]);

    return (
        <div className="min-h-screen bg-black pb-20">
            {/* 3D Isometric Wall Hero Section */}
            <WorkHero />

            {/* Filter Tabs */}
            <div className="sticky top-20 z-[45] bg-black/80 backdrop-blur-md border-b border-white/5 py-6">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${selectedCategory === cat.id
                                    ? 'bg-brand-orange border-brand-orange text-white shadow-[0_0_20px_rgba(255,102,0,0.3)]'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Project Index - Sticky Sidebar */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{
                    opacity: 1,
                    x: 0,
                    width: isCollapsed ? '48px' : '280px'
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-50 group"
            >
                <div className={`bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-500 overflow-hidden ${isCollapsed ? 'p-2' : 'p-4'}`}>
                    <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                        {!isCollapsed && (
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em] px-2"
                            >
                                INDEX / 索引
                            </motion.h3>
                        )}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-brand-orange"
                            title={isCollapsed ? "展開索引" : "收縮索引"}
                        >
                            <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </motion.div>
                        </button>
                    </div>

                    <nav className={`space-y-1 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 h-0' : 'opacity-100'}`}>
                        {filteredProjects.map((project, index) => (
                            <Link
                                key={project.id}
                                href={`#${project.id}`}
                                className={`block px-3 py-2 rounded-lg transition-all duration-300 group ${activeSection === project.id
                                    ? 'bg-brand-orange text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-bold font-mono ${activeSection === project.id ? 'text-white' : 'text-brand-orange'}`}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[11px] font-bold truncate">
                                            {project.title.split('：')[0]}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </nav>

                    {isCollapsed && (
                        <div className="flex flex-col items-center gap-2 py-4">
                            {filteredProjects.map((project) => (
                                <Link
                                    key={`dot-${project.id}`}
                                    href={`#${project.id}`}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSection === project.id ? 'bg-brand-orange h-4' : 'bg-white/20 hover:bg-white/40'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Projects List */}
            <div className="space-y-32 pt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
                                <motion.section
                                    key={project.id}
                                    id={project.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className="container mx-auto px-6 mb-32 last:mb-0"
                                >
                                    {/* Project Header */}
                                    <div className="mb-12">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-brand-orange text-6xl md:text-8xl font-black opacity-20">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <div className="flex-1">
                                                <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block mb-2">
                                                    {project.categoryLabel || project.category}
                                                </span>
                                                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                                                    {project.title}
                                                </h2>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-lg max-w-3xl ml-20 md:ml-32 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Image Gallery */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            className="relative aspect-[4/3] rounded-xl overflow-hidden group lg:col-span-2 lg:row-span-2"
                                        >
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </motion.div>

                                        {project.gallery?.map((img, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`${project.title} - ${idx + 1}`}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    {index < filteredProjects.length - 1 && (
                                        <div className="mt-24 pt-8 border-t border-white/10" />
                                    )}
                                </motion.section>
                            ))
                        ) : (
                            <div className="container mx-auto px-6 py-40 text-center">
                                <p className="text-gray-500 uppercase tracking-widest">近日推出 / Coming Soon</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
