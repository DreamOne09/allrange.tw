'use client';

import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroPro() {
    const [phase, setPhase] = useState<'spark' | 'flow' | 'formation' | 'branding'>('spark');
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Mouse tracking logic for the final phase
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set((e.clientX / innerWidth) * 2 - 1);
            mouseY.set((e.clientY / innerHeight) * 2 - 1);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Pseudo-3D parallax for the orange
    const rotateX = useTransform(mouseY, [-1, 1], [5, -5]);
    const rotateY = useTransform(mouseX, [-1, 1], [-5, 5]);

    useEffect(() => {
        // Sequence Controller
        const sequence = async () => {
            // 0s-1s: Spark
            await new Promise(r => setTimeout(r, 1000));
            setPhase('flow');

            // 1s-3s: Flow
            await new Promise(r => setTimeout(r, 2000));
            setPhase('formation');

            // 3s-4.5s: Formation
            await new Promise(r => setTimeout(r, 1500));
            setPhase('branding');
        };
        sequence();
    }, []);

    return (
        <div className="relative w-full h-[100vh] bg-[#1A1918] overflow-hidden flex items-center justify-center">
            <div className="absolute top-4 left-4 z-40 bg-brand-black/50 p-2 rounded border border-brand-orange text-brand-orange text-xs pointer-events-none">
                OPTION 4: Pro Code Animation (Pure Code Fallback)
            </div>

            {/* SVG Liquid Filter */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="liquidGoo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Main Animation Container */}
            <div className="relative w-full h-full flex items-center justify-center">

                {/* Phase 1 & 2: Spark & Flow - Liquid Container */}
                {(phase === 'spark' || phase === 'flow' || phase === 'formation') && (
                    <div className="w-full h-full absolute inset-0 flex items-center justify-center" style={{ filter: 'url(#liquidGoo)' }}>
                        {/* 1. Spark Dot */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={
                                phase === 'spark' ? { scale: [0, 1.5, 0], opacity: 1 } :
                                    phase === 'flow' ? { scale: 0, opacity: 0 } : {}
                            }
                            transition={{ duration: 0.8, ease: "backOut" }}
                            className="w-4 h-4 bg-[#FF6B00] rounded-full absolute"
                        />

                        {/* 2. Flow Lines (Morphing Blobs) */}
                        {phase !== 'spark' && (
                            <>
                                {/* Blob 1 */}
                                <motion.div
                                    initial={{ x: 0, y: 0, width: 20, height: 20 }}
                                    animate={
                                        phase === 'flow' ? {
                                            x: [0, -150, 100, 0],
                                            y: [0, -100, 100, 0],
                                            width: [20, 100, 60, 200],
                                            height: [20, 40, 100, 200]
                                        } : phase === 'formation' ? {
                                            x: 0, y: 0, width: 300, height: 300, borderRadius: "50%"
                                        } : {}
                                    }
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    className="bg-[#FF6B00] absolute rounded-full opacity-80 mix-blend-screen"
                                />
                                {/* Blob 2 */}
                                <motion.div
                                    initial={{ x: 0, y: 0, width: 20, height: 20 }}
                                    animate={
                                        phase === 'flow' ? {
                                            x: [0, 150, -100, 0],
                                            y: [0, 100, -50, 0],
                                            width: [20, 80, 50, 200],
                                            height: [20, 30, 90, 200]
                                        } : phase === 'formation' ? {
                                            x: 0, y: 0, width: 300, height: 300, borderRadius: "50%"
                                        } : {}
                                    }
                                    transition={{ duration: 2, ease: "easeInOut", delay: 0.1 }}
                                    className="bg-[#FF6B00] absolute rounded-full opacity-80 mix-blend-screen"
                                />
                                {/* Blob 3 */}
                                <motion.div
                                    initial={{ x: 0, y: 0, width: 20, height: 20 }}
                                    animate={
                                        phase === 'flow' ? {
                                            x: [0, 0, 0, 0],
                                            y: [0, 200, -200, 0],
                                            width: [20, 40, 40, 200],
                                            height: [20, 40, 40, 200]
                                        } : phase === 'formation' ? {
                                            x: 0, y: 0, width: 300, height: 300, borderRadius: "50%"
                                        } : {}
                                    }
                                    transition={{ duration: 2, ease: "easeInOut", delay: 0.05 }}
                                    className="bg-[#FF6B00] absolute rounded-full opacity-80 mix-blend-screen"
                                />
                            </>
                        )}
                    </div>
                )}

                {/* Phase 3 & 4: The Orange Formation & Branding */}
                {phase === 'branding' && (
                    <motion.div
                        className="relative z-10 flex flex-col items-center justify-center perspective-1000"
                        style={{ perspective: 1000 }}
                    >
                        {/* The Geometric Orange */}
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{ rotateX, rotateY }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
                        >
                            {/* Orange Body Gradient */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF9F43] to-[#FF6B00] shadow-[0_20px_50px_rgba(255,107,0,0.3)]">
                                {/* Highlight (Gloss) */}
                                <div className="absolute top-[15%] left-[15%] w-[30%] h-[20%] bg-white opacity-20 blur-xl rounded-full skew-x-12" />
                            </div>

                            {/* The Leaf */}
                            <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="absolute -top-6 left-1/2 w-16 h-24 bg-[#4B6F44] rounded-tr-[100%] rounded-bl-[100%] origin-bottom-left"
                            />

                            {/* Shadow */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 0.4, scale: 1 }}
                                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[60%] h-8 bg-black/50 blur-xl rounded-[100%]"
                            />
                        </motion.div>

                        {/* Text Reveal */}
                        <div className="mt-16 text-center overflow-hidden">
                            <motion.h1
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "circOut" }}
                                className="text-5xl md:text-8xl font-black text-white tracking-tighter"
                            >
                                LE CHENG
                            </motion.h1>
                            <motion.div
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8, ease: "circOut" }}
                                className="text-brand-orange text-xl md:text-2xl font-bold tracking-[0.5em] uppercase mt-2"
                            >
                                Motion Design
                            </motion.div>
                        </div>

                    </motion.div>
                )}

            </div>
        </div>
    );
}
