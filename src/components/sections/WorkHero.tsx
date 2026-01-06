'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { realProjects } from '@/data/real_projects';

const WorkHero = () => {
    // Generate a larger grid by repeating the projects if necessary
    const displayProjects = [...realProjects, ...realProjects, ...realProjects];

    return (
        <section className="relative h-[80vh] w-full overflow-hidden bg-black flex items-center justify-center pt-20">
            {/* 3D Grid Container */}
            <div className="absolute inset-0 flex items-center justify-center perspective-[1500px] overflow-hidden">
                <motion.div
                    initial={{
                        rotateX: 25,
                        rotateZ: -15,
                        scale: 1.2,
                        opacity: 0
                    }}
                    animate={{
                        rotateX: 25,
                        rotateZ: -15,
                        scale: 1,
                        opacity: 0.8,
                        x: [0, -30, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{
                        opacity: { duration: 1.5 },
                        scale: { duration: 1.5, ease: "easeOut" },
                        x: { duration: 25, repeat: Infinity, ease: "linear" },
                        y: { duration: 25, repeat: Infinity, ease: "linear" }
                    }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[160vw] h-[160vh] pointer-events-none"
                    style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                >
                    {displayProjects.map((project, index) => (
                        <div
                            key={`${project.id}-${index}`}
                            className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl"
                            style={{
                                backfaceVisibility: 'hidden',
                                transform: 'translateZ(0)'
                            }}
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105 opacity-90"
                            />
                            {/* Subtle Brand Tint */}
                            <div className="absolute inset-0 bg-brand-orange/5 mix-blend-overlay" />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Dark Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />

            {/* Content Section */}
            <div className="container mx-auto px-6 relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <span className="text-brand-gold font-bold tracking-[0.6em] uppercase text-xs block mb-6">
                        Creative Portfolio
                    </span>
                    <h1 className="text-6xl md:text-[10rem] font-black text-white leading-tight mb-8">
                        精選<span className="text-brand-orange">作品</span>
                    </h1>
                    <div className="w-24 h-1 bg-brand-orange mx-auto mb-8" />
                    <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
                        揉合美學與機能，在光影與結構之間<br />
                        構築專屬品牌的靈魂空間。
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block"
            >
                <div className="w-[1px] h-20 bg-gradient-to-b from-brand-gold to-transparent opacity-50" />
            </motion.div>
        </section>
    );
};

export default WorkHero;
