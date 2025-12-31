'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { heroSubset } from '@/data/real_projects';
import Image from 'next/image';

// Use the RealPic images (subset 0012-0020)
const images = heroSubset.map(p => p.image);

// Generate a large set of items for the grid to feel "infinite" and abundant
const items = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    span: i % 5 === 0 ? 'col-span-2' : 'col-span-1', // Random-ish spans
    height: i % 3 === 0 ? 'h-96' : (i % 2 === 0 ? 'h-64' : 'h-80'), // Varied heights
    image: images[i % images.length],
}));

const HeroV4 = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax effect for the text
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center perspective-[2000px]">

            {/* Overlay Content */}
            <motion.div
                style={{ y: yText, opacity: opacityText }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
            >
                <div className="text-center p-12 bg-black/40 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-gold text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
                            Portfolio Gallery
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-6 text-shadow-lg">
                            靈感牆
                        </h1>
                        <p className="text-white/80 text-lg font-light tracking-wider mb-8">
                            探索我們在不同維度的空間創作
                        </p>
                        <button className="pointer-events-auto px-10 py-4 bg-brand-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-full shadow-[0_0_20px_rgba(248,182,45,0.4)]">
                            開始探索
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Tilted Scrolling Wall */}
            <div className="fixed top-[-50%] left-[-25%] w-[150%] h-[200%] flex items-center justify-center pointer-events-none perspective-[2000px]">
                <motion.div
                    style={{
                        rotateX: 20,
                        rotateY: -10,
                        rotateZ: -5,
                    }}
                    className="w-full grid grid-cols-4 md:grid-cols-5 gap-4 p-4 opacity-50"

                    // Continuous Scrolling Animation
                    animate={{
                        y: ["-25%", "0%"]  // Scroll upwards naturally
                    }}
                    transition={{
                        duration: 30, // Slow, smooth scroll
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {/* Double the items to create a seamless loop effect (conceptually) */}
                    {[...items, ...items, ...items].map((item, idx) => (
                        <div
                            key={`${item.id}-${idx}`}
                            className={`${item.span} ${item.height} relative rounded-xl overflow-hidden group shadow-lg border border-white/5 bg-zinc-900`}
                        >
                            {/* Vivid Image Container */}
                            <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700">
                                <Image
                                    src={item.image}
                                    alt="Portfolio Item"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                                {/* subtle shine effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Gold Border Glow on Hover */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-gold/70 transition-colors duration-300 pointer-events-none z-20 rounded-xl" />

                            {/* Overlay Gradient (Minimal, just for text at bottom) */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                            {/* Decorative Crosshair & Text */}
                            <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full border border-brand-gold flex items-center justify-center text-brand-gold text-[10px]">
                                    +
                                </div>
                                <span className="text-[10px] text-white/50 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                    View Case
                                </span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div >

            {/* Vignette & Gradients */}
            < div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />

        </section >
    );
};

export default HeroV4;
