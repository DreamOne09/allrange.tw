'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { realProjects } from '@/data/real_projects';

// Distribute real projects into columns
const items1 = [realProjects[0], realProjects[1], realProjects[2], realProjects[3]].map(p => ({
    ...p, height: 'h-64'
}));

const items2 = [realProjects[4], realProjects[5], realProjects[6], realProjects[7]].map(p => ({
    ...p, height: 'h-80'
}));

const items3 = [realProjects[8], realProjects[9], realProjects[10], realProjects[11]].map(p => ({
    ...p, height: 'h-72'
}));

const Card = ({ item }: { item: any }) => (
    <div className={`relative w-full ${item.height} bg-zinc-800/50 rounded-lg overflow-hidden border border-white/5 mx-auto group`}>
        {item.image && (
            <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4">
            <p className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">{item.category}</p>
            <p className="text-white font-bold">{item.title}</p>
        </div>
    </div>
);

const Column = ({ items, duration, reversed = false }: { items: any[], duration: number, reversed?: boolean }) => (
    <motion.div
        className="flex flex-col gap-6 w-1/3"
        initial={{ y: reversed ? -400 : 0 }}
        animate={{ y: reversed ? 0 : -400 }}
        transition={{
            repeat: Infinity,
            repeatType: "mirror", // Bounces back and forth smoothly
            duration: duration,
            ease: "linear",
            delay: 0,
        }}
    >
        {[...items, ...items, ...items].map((item, idx) => (
            <Card key={`${item.id}-${idx}`} item={item} />
        ))}
    </motion.div>
);

const HeroV1 = () => {
    return (
        <section className="relative h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
            {/* Center Content Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none bg-black/40 backdrop-blur-[2px]">
                <div className="text-center p-12 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-brand-orange font-bold tracking-[0.5em] uppercase mb-6 text-sm">
                            策展體驗
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
                            用策展思維<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">定義空間價值</span>
                        </h1>
                        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
                            我們將品牌故事轉化為具體的視覺體驗。<br />
                            從展覽、空間到多媒體，全方位打造沈浸式場域。
                        </p>
                        <button className="pointer-events-auto px-10 py-4 bg-brand-orange text-black font-bold text-lg rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,140,0,0.3)]">
                            瀏覽作品集
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Background Moving Columns */}
            <div className="absolute inset-0 flex gap-6 px-4 md:px-0 opacity-60 scale-105 rotate-3 md:pt-40">
                <Column items={items1} duration={25} />
                <Column items={items2} duration={35} reversed />
                <Column items={items3} duration={28} />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 pointer-events-none" />
        </section>
    );
};

export default HeroV1;
