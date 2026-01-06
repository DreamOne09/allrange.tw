'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { realProjects } from '@/data/real_projects';
import { useState, useEffect } from 'react';
import WorkHero from '@/components/sections/WorkHero';

export default function WorkPage() {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = realProjects.map(p => document.getElementById(p.id));
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
    }, []);

    return (
        <div className="min-h-screen bg-black pb-20">
            {/* 3D Isometric Wall Hero Section */}
            <WorkHero />

            {/* Project Index - Sticky Sidebar */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-50"
            >
                <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 max-w-[280px]">
                    <h3 className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-4 px-2">
                        專案索引
                    </h3>
                    <nav className="space-y-2">
                        {realProjects.map((project, index) => (
                            <Link
                                key={project.id}
                                href={`#${project.id}`}
                                className={`block px-3 py-2 rounded-lg transition-all duration-300 group ${activeSection === project.id
                                    ? 'bg-brand-orange text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs font-bold ${activeSection === project.id ? 'text-white' : 'text-brand-orange'
                                        }`}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium truncate">
                                            {project.title}
                                        </p>
                                        <p className="text-[10px] uppercase tracking-wider opacity-60">
                                            {project.category}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </nav>
                </div>
            </motion.div>

            {/* Mobile Project Index - Top Bar */}
            <div className="lg:hidden sticky top-20 z-40 bg-black/95 backdrop-blur-sm border-b border-white/10 mb-8">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                        {realProjects.map((project, index) => (
                            <Link
                                key={project.id}
                                href={`#${project.id}`}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${activeSection === project.id
                                    ? 'bg-brand-orange text-white'
                                    : 'bg-white/5 text-gray-400 hover:text-white'
                                    }`}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects List */}
            <div className="space-y-32">
                {realProjects.map((project, index) => (
                    <motion.section
                        key={project.id}
                        id={project.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="container mx-auto px-6"
                    >
                        {/* Project Header */}
                        <div className="mb-12">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-brand-orange text-6xl md:text-8xl font-black opacity-20">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="flex-1">
                                    <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block mb-2">
                                        {project.category}
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                                        {project.title}
                                    </h2>
                                </div>
                            </div>
                            <p className="text-gray-400 text-lg max-w-3xl ml-20 md:ml-32">
                                {project.description}
                            </p>
                        </div>

                        {/* Video Section (if exists) */}
                        {project.videoUrl && (
                            <div className="mb-12">
                                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${project.videoUrl}?rel=0&showinfo=0`}
                                        title={project.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Image Gallery */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Main Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="relative aspect-[4/3] rounded-xl overflow-hidden group lg:col-span-2 lg:row-span-2"
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>

                            {/* Gallery Images */}
                            {project.gallery?.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + (idx + 1) * 0.1 }}
                                    className="relative aspect-[4/3] rounded-xl overflow-hidden group"
                                >
                                    <Image
                                        src={img}
                                        alt={`${project.title} - Image ${idx + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Divider */}
                        {index < realProjects.length - 1 && (
                            <div className="mt-24 pt-8 border-t border-white/10" />
                        )}
                    </motion.section>
                ))}
            </div>
        </div>
    );
}
