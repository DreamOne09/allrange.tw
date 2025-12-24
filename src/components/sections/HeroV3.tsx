'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

const cards = [
    { id: 1, title: '空間美學', subtitle: '獨特氛圍', bg: 'bg-zinc-800', image: '/allrange.tw/images/placeholders/office_interior_1.png' },
    { id: 2, title: '品牌策展', subtitle: '核心價值', bg: 'bg-stone-900', image: '/allrange.tw/images/placeholders/brand_identity_1.png' },
    { id: 3, title: '互動體驗', subtitle: '科技整合', bg: 'bg-neutral-800', image: '/allrange.tw/images/placeholders/museum_display_1.png' },
    { id: 4, title: '五感設計', subtitle: '細節體驗', bg: 'bg-orange-950', image: '/allrange.tw/images/placeholders/retail_space_1.png' },
    { id: 5, title: '跨界整合', subtitle: '多元觀點', bg: 'bg-zinc-900', image: '/allrange.tw/images/placeholders/exhibition_design_1.png' },
];

const Card3D = ({ index, x, onHover }: { index: number, x: any, onHover: () => void }) => {
    // 3D Transforms based on x position
    // We map the x value (which drives the carousel) to rotation and opacity
    // Assuming card width + gap is around 300px
    const cardWidth = 320;
    const position = useTransform(x, value => {
        // Calculate relative position based on index
        // value is the current global scroll pixels
        // We want infinite looping feel, but for simplicity let's do a constrained perspective deck first
        // actually, let's keep it simple: mapped position
        return (index * cardWidth) + (value as number);
    });

    // NOTE: This simple transform logic is tricky for infinite loop without complex modulo math.
    // Let's switch to a simpler "Fan" layout interaction for robustness in this short time.
    return null;
};


// Replacing with a robust "3D Cover Flow" style that is guaranteed to work well
const HeroV3 = () => {
    const [activeIndex, setActiveIndex] = useState(2); // Center item

    const handleNext = () => setActiveIndex((prev) => (prev + 1) % cards.length);
    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);

    return (
        <section className="relative h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-20">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                className="text-center mb-12 relative z-10"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
            >
                <div className="inline-flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                    <span className="text-brand-orange text-xs font-bold tracking-[0.3em] uppercase">專業領域</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                    核心專業領域
                </h1>
            </motion.div>

            {/* 3D Container */}
            <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center perspective-[1000px]">
                {cards.map((card, index) => {
                    // Calculate distance from active index
                    let offset = index - activeIndex;
                    // Handle wrapping for infinite feel visually
                    if (offset > 2) offset -= cards.length;
                    if (offset < -2) offset += cards.length;

                    const isActive = offset === 0;

                    return (
                        <motion.div
                            key={card.id}
                            className={`absolute w-[300px] md:w-[380px] aspect-[3/4] rounded-2xl p-8 flex flex-col justify-end shadow-2xl transition-all duration-500 cursor-pointer ${card.bg} border-t border-white/10`}
                            animate={{
                                x: offset * 220, // Horizontal spacing
                                z: isActive ? 100 : 0 - Math.abs(offset) * 100, // Depth
                                rotateY: -offset * 15, // Rotation
                                scale: isActive ? 1.1 : 0.9 - Math.abs(offset) * 0.1,
                                opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2, // Fade out far items
                                zIndex: 10 - Math.abs(offset)
                            }}
                            onClick={() => setActiveIndex(index)}
                        >
                            <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover opacity-60 rounded-2xl" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-2xl" />
                            <div className="relative z-10">
                                <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-1">{card.subtitle}</p>
                                <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                            </div>

                            {/* Decorative Number */}
                            <div className="absolute top-6 right-6 text-6xl font-black text-white/5 select-none">
                                0{card.id}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Controls */}
            <div className="flex gap-4 mt-8 z-20">
                <button onClick={handlePrev} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                    ←
                </button>
                <button onClick={handleNext} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                    →
                </button>
            </div>
        </section>
    );
};

export default HeroV3;
