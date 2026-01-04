'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroPro() {
    const [phase, setPhase] = useState<'singularity' | 'bigbang' | 'formation' | 'branding'>('singularity');
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse tracking
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set((e.clientX / innerWidth) * 2 - 1);
            mouseY.set((e.clientY / innerHeight) * 2 - 1);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const rotateX = useTransform(springY, [-1, 1], [25, -25]); // More dramatic rotation
    const rotateY = useTransform(springX, [-1, 1], [-25, 25]);
    const glowX = useTransform(springX, [-1, 1], [-20, 20]);
    const glowY = useTransform(springY, [-1, 1], [-20, 20]);

    // Sequence
    useEffect(() => {
        const sequence = async () => {
            // 0.0s: Singularity
            await new Promise(r => setTimeout(r, 500));
            setPhase('bigbang'); // BOOM

            // 1.0s: Debris & Chaos
            await new Promise(r => setTimeout(r, 800));
            setPhase('formation'); // Converge

            // 2.0s: Reveal
            await new Promise(r => setTimeout(r, 1500));
            setPhase('branding'); // Title
        };
        sequence();
    }, []);

    // Chaos Particles
    const particles = Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        angle: Math.random() * Math.PI * 2,
        distance: 400 + Math.random() * 1000,
        size: 5 + Math.random() * 20,
        color: Math.random() > 0.6 ? '#ffffff' : '#f8b62d', // Mix of white/orange sparks
        delay: Math.random() * 0.2
    }));

    return (
        <div className="relative w-full h-[100vh] bg-[#0F0F0F] overflow-hidden flex items-center justify-center perspective-[2000px]">

            {/* Dynamic Background Fog/Light */}
            <motion.div
                animate={{ opacity: [0, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
                className="absolute inset-0 bg-radial-gradient from-[#f8b62d]/10 to-transparent pointer-events-none"
            />

            {/* SVG Liquid Filter (Subtle for cleanup) */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="goo3d">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
                    </filter>
                </defs>
            </svg>

            {/* 1. Singularity */}
            {phase === 'singularity' && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 3, 0.2], opacity: 1, rotate: 180 }}
                    transition={{ duration: 0.5, times: [0, 0.6, 1], ease: "easeInOut" }}
                    className="w-4 h-4 bg-[#fff] rounded-full blur-[2px] shadow-[0_0_50px_#fff]"
                />
            )}

            {/* 2. Big Bang Explosion & Implosion */}
            {(phase === 'bigbang' || phase === 'formation') && (
                <div className="absolute inset-0 flex items-center justify-center w-full h-full" style={{ filter: 'url(#goo3d)' }}>
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, scale: 0 }}
                            animate={phase === 'bigbang'
                                ? {
                                    x: Math.cos(p.angle) * p.distance,
                                    y: Math.sin(p.angle) * p.distance,
                                    scale: [0, 1.5, 0],
                                    opacity: [1, 1, 0]
                                }
                                : { // Implode for formation state? 
                                    // Actually, let's keep them exploded and fade out, while core grows
                                    opacity: 0
                                }
                            }
                            transition={{ duration: 1.5, ease: "circOut" }}
                            style={{
                                width: p.size,
                                height: p.size,
                                backgroundColor: p.color
                            }}
                            className="absolute rounded-full"
                        />
                    ))}
                </div>
            )}

            {/* 3. The 3D Orange (Formation + Branding) */}
            {(phase === 'formation' || phase === 'branding') && (
                <motion.div
                    className="relative z-10 flex flex-col items-center justify-center"
                    style={{
                        transformStyle: "preserve-3d",
                        perspective: 1200
                    }}
                >
                    {/* THE SPHERE */}
                    <motion.div
                        layoutId="main-orange"
                        initial={{ scale: 0, rotateZ: 180 }}
                        animate={{
                            scale: phase === 'branding' ? 1 : 0.8,
                            rotateZ: 0,
                            y: phase === 'branding' ? 0 : 20
                        }}
                        style={{
                            rotateX: phase === 'branding' ? rotateX : 0,
                            rotateY: phase === 'branding' ? rotateY : 0
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
                    >
                        {/* 3D Body Construction */}
                        <div className="absolute inset-0 rounded-full bg-[#faad14] shadow-[inset_-20px_-20px_60px_rgba(168,85,0,0.8),inset_20px_20px_60px_rgba(255,255,255,0.4),0_0_50px_rgba(248,182,45,0.3)]">

                            {/* Surface Texture (Pores) */}
                            <div className="absolute inset-0 rounded-full opacity-60 mix-blend-overlay"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
                                    backgroundSize: '4px 4px'
                                }}
                            />

                            {/* Dynamic High-Gloss Reflection */}
                            <motion.div
                                style={{ x: glowX, y: glowY }}
                                className="absolute top-[10%] left-[10%] w-[40%] h-[30%] bg-gradient-to-br from-white to-transparent opacity-40 blur-xl rounded-full"
                            />

                            {/* Rim Light */}
                            <div className="absolute inset-0 rounded-full border border-white/10" />
                        </div>

                        {/* The Green Leaf (Dancing) */}
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                            transition={{
                                delay: 0.5,
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-10 left-1/2 w-24 h-32 bg-[#4B6F44] rounded-tr-[100%] rounded-bl-[100%] origin-bottom-left shadow-2xl skew-y-6"
                        >
                            <div className="w-full h-full bg-gradient-to-tr from-black/20 to-transparent rounded-tr-[100%] rounded-bl-[100%]" />
                            {/* Leaf Veins */}
                            <div className="absolute inset-0 border-r border-[#ffffff33] rounded-tr-[100%]" />
                        </motion.div>
                    </motion.div>

                    {/* TEXT REVEAL: ALLRANGE STUDIO */}
                    {phase === 'branding' && (
                        <div className="absolute flex flex-col items-center justify-center mix-blend-screen pointer-events-none mt-12 md:mt-0">
                            <motion.h1
                                initial={{ opacity: 0, z: -500, scale: 3 }}
                                animate={{ opacity: 1, z: 50, scale: 1 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="text-5xl md:text-9xl font-black text-white tracking-tighter drop-shadow-[0_0_30px_rgba(248,182,45,0.5)] text-center whitespace-nowrap"
                            >
                                ALLRANGE STUDIO
                            </motion.h1>

                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 200 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="h-1 bg-[#f8b62d] my-6 shadow-[0_0_20px_#f8b62d]"
                            />

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="text-white text-xl md:text-3xl font-bold tracking-[0.5em]"
                            >
                                樂橙設計工作室
                            </motion.h2>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}
