'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { realProjects } from '@/data/real_projects';

export default function WorkPage() {
    return (
        <div className="min-h-screen bg-black pt-24 pb-20">
            {/* Page Header */}
            <div className="container mx-auto px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-sm block mb-4">
                        Portfolio
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                        作品集
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        探索我們的設計作品，從展場設計到空間規劃，每個專案都展現獨特的創意與專業。
                    </p>
                </motion.div>
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
