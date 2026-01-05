'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'intro' | 'separation' | 'overlap' | 'branding'>('intro');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runSequence = async () => {
            // Intro - Single block
            setPhase('intro');
            await new Promise(r => setTimeout(r, 1000));

            // Separation - Blocks split apart
            setPhase('separation');
            await new Promise(r => setTimeout(r, 2500));

            // Overlap - Blocks recombine with overlap
            setPhase('overlap');
            await new Promise(r => setTimeout(r, 2500));

            // Branding - Final orange
            setPhase('branding');
            await new Promise(r => setTimeout(r, 3000));

            setLoopCount(prev => prev + 1);
        };

        runSequence();
    }, [loopCount]);

    // Color palette - Orange variations
    const colors = [
        '#ff9a00', // Primary orange
        '#ffb62e', // Light orange
        '#ffd700', // Gold
        '#ff6b00', // Dark orange
        '#ff8c42', // Mid orange
    ];

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">

            {/* INTRO - Single unified block */}
            {phase === 'intro' && (
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1]
                    }}
                    className="absolute"
                >
                    <div
                        className="w-[300px] h-[300px] rounded-[40px]"
                        style={{
                            background: `linear-gradient(135deg, ${colors[0]}, ${colors[3]})`,
                            boxShadow: `0 30px 80px rgba(255,154,0,0.6), 0 0 60px rgba(255,154,0,0.4)`
                        }}
                    />
                </motion.div>
            )}

            {/* SEPARATION - Blocks split into layers */}
            {phase === 'separation' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {/* Layer 1 - Background */}
                    <motion.div
                        initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                        animate={{
                            x: -180,
                            y: -120,
                            rotate: -15,
                            scale: 0.9
                        }}
                        transition={{
                            duration: 1.2,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="absolute w-[280px] h-[280px] rounded-[35px]"
                        style={{
                            background: colors[4],
                            boxShadow: `0 20px 60px rgba(255,140,66,0.5)`,
                            filter: 'blur(1px)'
                        }}
                    />

                    {/* Layer 2 - Mid-back */}
                    <motion.div
                        initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                        animate={{
                            x: 150,
                            y: -80,
                            rotate: 25,
                            scale: 1.1
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.1,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="absolute w-[260px] h-[260px] rounded-[32px]"
                        style={{
                            background: colors[1],
                            boxShadow: `0 25px 70px rgba(255,182,46,0.5)`,
                            opacity: 0.95
                        }}
                    />

                    {/* Layer 3 - Center */}
                    <motion.div
                        initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                        animate={{
                            x: 0,
                            y: 100,
                            rotate: 8,
                            scale: 1.15
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.2,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="absolute w-[300px] h-[300px] rounded-[40px]"
                        style={{
                            background: `linear-gradient(135deg, ${colors[0]}, ${colors[3]})`,
                            boxShadow: `0 30px 80px rgba(255,154,0,0.6)`,
                            zIndex: 10
                        }}
                    />

                    {/* Layer 4 - Mid-front */}
                    <motion.div
                        initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                        animate={{
                            x: -120,
                            y: 90,
                            rotate: -20,
                            scale: 0.85
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.15,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="absolute w-[240px] h-[240px] rounded-[28px]"
                        style={{
                            background: colors[2],
                            boxShadow: `0 20px 60px rgba(255,215,0,0.5)`,
                            opacity: 0.9
                        }}
                    />

                    {/* Layer 5 - Foreground */}
                    <motion.div
                        initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                        animate={{
                            x: 140,
                            y: 110,
                            rotate: 35,
                            scale: 0.75
                        }}
                        transition={{
                            duration: 1.2,
                            delay: 0.25,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="absolute w-[220px] h-[220px] rounded-[25px]"
                        style={{
                            background: colors[3],
                            boxShadow: `0 15px 50px rgba(255,107,0,0.5)`,
                            zIndex: 15
                        }}
                    />

                    {/* Particle effects */}
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: 0,
                                y: 0,
                                scale: 0,
                                opacity: 0
                            }}
                            animate={{
                                x: (Math.random() - 0.5) * 600,
                                y: (Math.random() - 0.5) * 400,
                                scale: [0, 1, 0],
                                opacity: [0, 0.8, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                delay: i * 0.05,
                                ease: "easeOut"
                            }}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                background: colors[i % colors.length],
                                boxShadow: `0 0 20px ${colors[i % colors.length]}`
                            }}
                        />
                    ))}
                </div>
            )}

            {/* OVERLAP - Blocks recombine with layering */}
            {phase === 'overlap' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {/* Base layer - Large */}
                    <motion.div
                        initial={{ x: -180, y: -120, rotate: -15, scale: 0.9, opacity: 0 }}
                        animate={{
                            x: -60,
                            y: -40,
                            rotate: -8,
                            scale: 1.2,
                            opacity: 0.4
                        }}
                        transition={{
                            duration: 1.5,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="absolute w-[350px] h-[350px] rounded-[45px]"
                        style={{
                            background: colors[4],
                            filter: 'blur(2px)',
                            mixBlendMode: 'multiply'
                        }}
                    />

                    {/* Layer 2 - Offset overlap */}
                    <motion.div
                        initial={{ x: 150, y: -80, rotate: 25, scale: 1.1, opacity: 0 }}
                        animate={{
                            x: 40,
                            y: -30,
                            rotate: 12,
                            scale: 1.15,
                            opacity: 0.6
                        }}
                        transition={{
                            duration: 1.5,
                            delay: 0.1,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="absolute w-[320px] h-[320px] rounded-[42px]"
                        style={{
                            background: colors[1],
                            mixBlendMode: 'screen',
                            opacity: 0.5
                        }}
                    />

                    {/* Main center block */}
                    <motion.div
                        initial={{ x: 0, y: 100, rotate: 8, scale: 1.15 }}
                        animate={{
                            x: 0,
                            y: 0,
                            rotate: 0,
                            scale: 1.3
                        }}
                        transition={{
                            duration: 1.5,
                            delay: 0.2,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="absolute w-[300px] h-[300px] rounded-[40px]"
                        style={{
                            background: `linear-gradient(135deg, ${colors[0]}, ${colors[3]})`,
                            boxShadow: `0 40px 100px rgba(255,154,0,0.7), 0 0 80px rgba(255,154,0,0.5)`,
                            zIndex: 20
                        }}
                    />

                    {/* Front overlap - Small */}
                    <motion.div
                        initial={{ x: -120, y: 90, rotate: -20, scale: 0.85, opacity: 0 }}
                        animate={{
                            x: -50,
                            y: 35,
                            rotate: -10,
                            scale: 0.9,
                            opacity: 0.7
                        }}
                        transition={{
                            duration: 1.5,
                            delay: 0.15,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="absolute w-[240px] h-[240px] rounded-[30px]"
                        style={{
                            background: colors[2],
                            mixBlendMode: 'overlay',
                            zIndex: 25
                        }}
                    />

                    {/* Top accent */}
                    <motion.div
                        initial={{ x: 140, y: 110, rotate: 35, scale: 0.75, opacity: 0 }}
                        animate={{
                            x: 55,
                            y: 40,
                            rotate: 18,
                            scale: 0.8,
                            opacity: 0.8
                        }}
                        transition={{
                            duration: 1.5,
                            delay: 0.25,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="absolute w-[200px] h-[200px] rounded-[25px]"
                        style={{
                            background: colors[3],
                            boxShadow: `0 20px 60px rgba(255,107,0,0.6)`,
                            zIndex: 30
                        }}
                    />

                    {/* Glow particles */}
                    {Array.from({ length: 15 }).map((_, i) => (
                        <motion.div
                            key={`glow-${i}`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 1.5, 0],
                                opacity: [0, 0.6, 0]
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 0.1,
                                repeat: Infinity
                            }}
                            className="absolute w-4 h-4 rounded-full"
                            style={{
                                left: `${45 + (Math.random() - 0.5) * 20}%`,
                                top: `${45 + (Math.random() - 0.5) * 20}%`,
                                background: colors[i % colors.length],
                                filter: 'blur(8px)'
                            }}
                        />
                    ))}
                </div>
            )}

            {/* BRANDING - Final 3D Orange */}
            {phase === 'branding' && (
                <div className="relative flex flex-col items-center z-50">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9, rotate: -5 }}
                        className="relative w-[300px] h-[300px] cursor-pointer"
                    >
                        <motion.div
                            className="w-full h-full rounded-full"
                            animate={{
                                boxShadow: [
                                    '0 20px 60px rgba(255,154,0,0.6)',
                                    '0 25px 80px rgba(255,154,0,0.8)',
                                    '0 20px 60px rgba(255,154,0,0.6)'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)'
                            }}
                        >
                            <div
                                className="absolute inset-0 opacity-20 mix-blend-overlay rounded-full"
                                style={{
                                    backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)',
                                    backgroundSize: '6px 6px'
                                }}
                            />
                            <div className="absolute top-[20%] left-[30%] w-20 h-20 rounded-full bg-white/40 blur-2xl" />
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                            className="absolute -top-8 left-1/2 w-20 h-28 bg-gradient-to-br from-green-400 to-green-700 rounded-tr-[100%] rounded-bl-[100%] border-2 border-green-900"
                            style={{
                                filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))',
                                transform: 'translateX(-50%) rotateZ(-12deg)',
                                transformOrigin: 'bottom center'
                            }}
                        />
                    </motion.div>

                    <div className="mt-16 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-6xl md:text-8xl font-black text-white tracking-widest mb-4"
                        >
                            ALLRANGE
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-brand-gold text-xl md:text-2xl tracking-[0.5em] font-light"
                        >
                            設計無界 • 創意無限
                        </motion.p>
                    </div>
                </div>
            )}

        </div>
    );
}
