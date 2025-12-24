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
                        <span className="text-brand-orange text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
                            Portfolio Gallery
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-6 text-shadow-lg">
                            靈感牆
                        </h1>
                        <p className="text-white/80 text-lg font-light tracking-wider mb-8">
                            探索我們在不同維度的空間創作
                        </p>
                        <button className="pointer-events-auto px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-orange transition-colors rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]">
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
                            {/* Image */}
                            <div className="relative w-full h-full">
                                <Image
                                    src={item.image}
                                    alt="Portfolio Item"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                            {/* Decorative Crosshair */}
                            <div className="absolute bottom-4 left-4">
                                <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center text-white/60 text-[10px]">
                                    +
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Vignette & Gradients */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />

        </section>
    );
};

export default HeroV4;
