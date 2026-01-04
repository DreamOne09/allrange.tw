'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroPro() {
    const [phase, setPhase] = useState<'singularity' | 'bigbang' | 'formation' | 'branding'>('singularity');
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set((e.clientX / innerWidth) * 2 - 1);
            mouseY.set((e.clientY / innerHeight) * 2 - 1);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const rotateX = useTransform(mouseY, [-1, 1], [10, -10]);
    const rotateY = useTransform(mouseX, [-1, 1], [-10, 10]);

    // Sequence Timer
    useEffect(() => {
        const sequence = async () => {
            // 0.0s: Singularity (Tiny bright dot)
            await new Promise(r => setTimeout(r, 800));
            setPhase('bigbang'); // BOOM

            // 0.8s: Big Bang Expansion
            await new Promise(r => setTimeout(r, 600));
            setPhase('formation'); // Debris settles/morphs into Orange

            // 1.5s: Formation
            await new Promise(r => setTimeout(r, 1200));
            setPhase('branding'); // Text Reveal
        };
        sequence();
    }, []);

    // Generate explosion particles
    const particles = Array.from({ length: 40 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 800 + Math.random() * 800; // Explode outward far
        return {
            id: i,
            angle,
            distance,
            size: 10 + Math.random() * 30, // Varied chunks
            delay: Math.random() * 0.2
        };
    });

    return (
        <div className="relative w-full h-[100vh] bg-[#1A1918] overflow-hidden flex items-center justify-center">

            {/* SVG Liquid Filter for the "morph" from debris to orange */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="bangGoo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Animation Container */}
            <div className="absolute inset-0 flex items-center justify-center w-full h-full"
                style={{ filter: phase === 'branding' ? 'none' : 'url(#bangGoo)' }}>

                {/* 1. Singularity: Condensed Energy */}
                {phase === 'singularity' && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.5, 0.5], opacity: 1 }}
                        transition={{ duration: 0.8, times: [0, 0.6, 1] }}
                        className="w-12 h-12 bg-white rounded-full shadow-[0_0_100px_rgba(255,255,255,0.8)]"
                    />
                )}

                {/* 2 & 3. Big Bang & Formation */}
                {(phase === 'bigbang' || phase === 'formation') && (
                    <>
                        {particles.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                                animate={phase === 'bigbang'
                                    ? {
                                        x: Math.cos(p.angle) * p.distance,
                                        y: Math.sin(p.angle) * p.distance,
                                        scale: [0.5, 1.5, 0.8],
                                        opacity: 1
                                    } // Explode Out
                                    : {
                                        x: 0,
                                        y: 0,
                                        scale: 1,
                                        opacity: 1
                                    } // Implode Back / Merge
                                }
                                transition={{
                                    duration: phase === 'bigbang' ? 0.8 : 1.2,
                                    ease: phase === 'bigbang' ? "circOut" : "anticipate"
                                }}
                                style={{ width: p.size, height: p.size }}
                                className="absolute rounded-full bg-[#f8b62d]"
                            />
                        ))}
                    </>
                )}

                {/* 3. The Core Orange forming from the chaos */}
                {phase === 'formation' && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.0, ease: "backOut", delay: 0.2 }}
                        className="w-[300px] h-[300px] bg-[#f8b62d] rounded-full absolute z-10"
                    />
                )}
            </div>

            {/* 4. Final Branding */}
            {phase === 'branding' && (
                <motion.div
                    className="relative z-10 flex flex-col items-center justify-center perspective-1000"
                    style={{ perspective: 1000 }}
                >
                    {/* The Orange */}
                    <motion.div
                        layoutId="main-orange"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        style={{ rotateX, rotateY }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]"
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f8b62d] via-[#f8b62d] to-[#e09e1a] shadow-[0_0_100px_rgba(248,182,45,0.6)]">
                            {/* Highlights */}
                            <div className="absolute top-[15%] left-[15%] w-[40%] h-[25%] bg-white opacity-20 blur-2xl rounded-full -rotate-12" />
                            <div className="absolute inset-0 rounded-full opacity-30 mix-blend-overlay"
                                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}
                            />
                        </div>
                        {/* Green Leaf */}
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                            className="absolute -top-8 left-1/2 w-20 h-32 bg-[#4B6F44] rounded-tr-[100%] rounded-bl-[100%] origin-bottom-left shadow-lg"
                        >
                            <div className="w-full h-full bg-gradient-to-tr from-black/20 to-transparent rounded-tr-[100%] rounded-bl-[100%]" />
                        </motion.div>
                    </motion.div>

                    {/* Text Reveal */}
                    <div className="mt-12 text-center z-20 mix-blend-difference">
                        <motion.h1
                            initial={{ scale: 2, opacity: 0, filter: 'blur(10px)' }}
                            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                            transition={{ delay: 0.1, duration: 0.8, ease: "circOut" }}
                            className="text-5xl md:text-8xl font-black text-white tracking-tighter"
                        >
                            ALLRANGE STUDIO
                        </motion.h1>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="h-1 w-24 bg-[#f8b62d] mx-auto my-6"
                        />
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-white/80 text-xl tracking-[0.2em] font-medium"
                        >
                            跨領域設計資歷20年
                        </motion.h2>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
