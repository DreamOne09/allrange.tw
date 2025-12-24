'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Placeholder data for the infinite scroll
const col1 = [
    { id: 1, title: '台北 101 展覽', color: 'bg-zinc-800' },
    { id: 2, title: '品牌視覺識別', color: 'bg-neutral-800' },
    { id: 3, title: '商業空間設計', color: 'bg-stone-800' },
    { id: 4, title: '多媒體互動', color: 'bg-zinc-900' },
];

const col2 = [
    { id: 5, title: '科技藝術節', color: 'bg-orange-900' }, // Orange accent
    { id: 6, title: '博物館導覽', color: 'bg-neutral-900' },
    { id: 7, title: '企業總部', color: 'bg-stone-900' },
    { id: 8, title: '快閃店企劃', color: 'bg-zinc-800' },
];

const col3 = [
    { id: 9, title: '產品發表會', color: 'bg-stone-800' },
    { id: 10, title: '文創園區', color: 'bg-neutral-800' },
    { id: 11, title: '燈光藝術節', color: 'bg-zinc-800' },
    { id: 12, title: '沉浸式體驗', color: 'bg-orange-950' }, // Dark orange
];

const Card = ({ item }: { item: { title: string; color: string } }) => (
    <div className={`w-full aspect-[3/4] ${item.color} rounded-lg flex items-center justify-center relative overflow-hidden group border border-white/5`}>
        <div className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-brand-orange/40 to-transparent" />
        <h3 className="text-white font-bold text-xl relative z-10 writing-vertical-rl lg:writing-horizontal-tb tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
            {item.title}
        </h3>
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
                <Column items={col1} duration={25} />
                <Column items={col2} duration={35} reversed />
                <Column items={col3} duration={28} />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10 pointer-events-none" />
        </section>
    );
};

export default HeroV1;
