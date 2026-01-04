'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroPro() {
    const [phase, setPhase] = useState<'storm' | 'formation' | 'branding'>('storm');
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
            // Start directly with Storm
            setPhase('storm');

            // 2.5s Storm (Wild Lines)
            await new Promise(r => setTimeout(r, 2500));
            setPhase('formation');

            // 1.0s Formation
            await new Promise(r => setTimeout(r, 1000));
            setPhase('branding');
        };
        sequence();
    }, []);

    // Generate random starting positions for the "Storm" lines
    const streamlines = Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2; // Radial distribution
        const distance = 1500; // Far off screen
        return {
            id: i,
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            delay: Math.random() * 0.5,
            duration: 1.5 + Math.random(),
            width: 25 + Math.random() * 40, // Varied thickness
        };
    });

    return (
        <div className="relative w-full h-[100vh] bg-[#1A1918] overflow-hidden flex items-center justify-center">

            {/* SVG Liquid Filter (Stronger Goo) */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="fluidGoo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Animation Container with Filter */}
            <div className="absolute inset-0 flex items-center justify-center w-full h-full" style={{ filter: 'url(#fluidGoo)' }}>

                {/* PHASE 1 & 2: STORM - Lines rushing in */}
                {(phase === 'storm' || phase === 'formation') && (
                    <>
                        {streamlines.map((line) => (
                            <motion.div
                                key={line.id}
                                initial={{ x: line.x, y: line.y, opacity: 0, scale: 0.5 }}
                                animate={
                                    phase === 'storm'
                                        ? {
                                            x: 0,
                                            y: 0,
                                            opacity: 1,
                                            scale: [0.5, 1.5, 1],
                                            transition: {
                                                duration: line.duration,
                                                delay: line.delay,
                                                ease: [0.22, 1, 0.36, 1]
                                            }
                                        }
                                        : { // Formation state (all merge to center)
                                            x: 0, y: 0, scale: 1, opacity: 1
                                        }
                                }
                                style={{ width: line.width, height: line.width }}
                                className="absolute rounded-full bg-[#f8b62d]"
                            />
                        ))}
                    </>
                )}

                {/* PHASE 3: THE CORE (Growing Sphere) */}
                {phase === 'formation' && (
                    <motion.div
                        layoutId="main-orange"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: "backOut" }}
                        className="w-[300px] h-[300px] bg-[#f8b62d] rounded-full"
                    />
                )}
            </div>

            {/* PHASE 4: FINAL BRANDING (Clean, Removed Filter) */}
            {phase === 'branding' && (
                <motion.div
                    className="relative z-10 flex flex-col items-center justify-center perspective-1000"
                    style={{ perspective: 1000 }}
                >
                    {/* The Perfect Orange (Gradient & Texture) */}
                    <motion.div
                        layoutId="main-orange"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1, rotate: 0 }}
                        style={{ rotateX, rotateY }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]"
                    >
                        {/* Main Body: #f8b62d base */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f8b62d] via-[#f8b62d] to-[#e09e1a] shadow-[0_20px_60px_rgba(248,182,45,0.4)]">
                            {/* Upper Glint */}
                            <div className="absolute top-[15%] left-[15%] w-[40%] h-[25%] bg-white opacity-20 blur-2xl rounded-full -rotate-12" />

                            {/* Texture overlay (Dots) */}
                            <div className="absolute inset-0 rounded-full opacity-30 mix-blend-overlay"
                                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}
                            />
                        </div>

                        {/* Leaf (Green contrast) */}
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                            className="absolute -top-8 left-1/2 w-20 h-32 bg-[#4B6F44] rounded-tr-[100%] rounded-bl-[100%] origin-bottom-left shadow-lg"
                        >
                            <div className="w-full h-full bg-gradient-to-tr from-black/20 to-transparent rounded-tr-[100%] rounded-bl-[100%]" />
                        </motion.div>
                    </motion.div>

                    {/* Title Reveal */}
                    <div className="mt-12 text-center z-20 mix-blend-difference">
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-5xl md:text-8xl font-black text-white tracking-tighter"
                        >
                            ALLRANGE STUDIO
                        </motion.h1>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="h-1 w-24 bg-[#f8b62d] mx-auto my-6"
                        />
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-white/80 text-lg tracking-[0.5em] font-light"
                        >
                            MOTION & DESIGN
                        </motion.h2>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
