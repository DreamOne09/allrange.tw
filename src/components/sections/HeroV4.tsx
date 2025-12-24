'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Generates random-ish heights/colors for a masonry feel
const items = [
    { id: 1, span: 'col-span-1', height: 'h-64', color: 'bg-zinc-800' },
    { id: 2, span: 'col-span-2', height: 'h-64', color: 'bg-stone-900' },
    { id: 3, span: 'col-span-1', height: 'h-96', color: 'bg-neutral-800' },
    { id: 4, span: 'col-span-1', height: 'h-64', color: 'bg-orange-950' },
    { id: 5, span: 'col-span-1', height: 'h-80', color: 'bg-zinc-900' },
    { id: 6, span: 'col-span-2', height: 'h-72', color: 'bg-brand-orange/20' },
    { id: 7, span: 'col-span-1', height: 'h-64', color: 'bg-stone-800' },
    { id: 8, span: 'col-span-1', height: 'h-80', color: 'bg-neutral-900' },
    { id: 9, span: 'col-span-2', height: 'h-64', color: 'bg-zinc-800' },
];

const HeroV4 = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Subtle parallax for the whole wall
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [20, 15]); // Slight rotation change

    return (
        <section ref={containerRef} className="relative min-h-[140vh] bg-black overflow-hidden flex flex-col items-center justify-center perspective-[2000px]">

            {/* Overlay Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-center p-8 bg-black/30 backdrop-blur-sm rounded-3xl border border-white/10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-orange text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
                            Portfolio Gallery
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-6 text-shadow-lg">
                            靈感牆
                        </h1>
                        <p className="text-white/80 text-lg font-light tracking-wider mb-8">
                            探索我們在不同維度的空間創作
                        </p>
                        <button className="pointer-events-auto px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors rounded-full">
                            開始探索
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Tilted Wall */}
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                {/* 
                    We use a fixed position background that gives the illusion of a huge wall 
                    The transform perspective creates the 3D tilt.
                    rotateX(20deg) tilts it back
                    rotateY(-10deg) tilts it sideways
                    rotateZ(-10deg) gives the diagonal angle
                 */}
                <motion.div
                    style={{ y, rotateX: 20, rotateY: -10, rotateZ: -5 }}
                    className="w-[150vw] grid grid-cols-4 gap-6 p-10 opacity-60 origin-center"
                    animate={{
                        rotateZ: [-5, -2, -5], // Gentle sway
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {/* Generative Grid of Cards */}
                    {[...items, ...items, ...items].map((item, idx) => (
                        <div
                            key={idx}
                            className={`${item.span} ${item.height} ${item.color} rounded-2xl border border-white/10 relative overflow-hidden group shadow-2xl`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/50 text-xs">
                                    +
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />

        </section>
    );
};

export default HeroV4;
