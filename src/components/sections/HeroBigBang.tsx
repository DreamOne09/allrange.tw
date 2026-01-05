'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Fish, Rocket, Lightbulb } from 'lucide-react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'singularity' | 'bang' | 'morph' | 'coalesce' | 'branding'>('singularity');
    const [morphIndex, setMorphIndex] = useState(0); // 0: Fish, 1: Rocket, 2: Bulb
    const [loopCount, setLoopCount] = useState(0);

    // Animation Controls
    useEffect(() => {
        const runSequence = async () => {
            // 0s: Singularity
            setPhase('singularity');
            await new Promise(r => setTimeout(r, 1000));

            // Bang
            setPhase('bang');
            await new Promise(r => setTimeout(r, 800));

            // Morphing sequence
            setPhase('morph');
            setMorphIndex(0);

            // Fish
            await new Promise(r => setTimeout(r, 1500));
            setMorphIndex(1);

            // Rocket
            await new Promise(r => setTimeout(r, 1500));
            setMorphIndex(2);

            // Bulb
            await new Promise(r => setTimeout(r, 1500));

            // Coalesce
            setPhase('coalesce');
            await new Promise(r => setTimeout(r, 1000));

            // Branding
            setPhase('branding');
            await new Promise(r => setTimeout(r, 3000));

            // Loop back
            setLoopCount(prev => prev + 1);
        };

        runSequence();
    }, [loopCount]);

    // Explosion Particles
    const particleCount = 30;
    const particles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        angle: (i / particleCount) * 360,
        distance: 150 + Math.random() * 250,
        size: 8 + Math.random() * 20,
        color: ['#ff9a00', '#ffb62e', '#ffd700', '#ffffff'][Math.floor(Math.random() * 4)]
    }));

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center font-sans">

            {/* 1. SINGULARITY */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={phase === 'singularity' ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_30px_#ff9a00,0_0_60px_#ff9a00,0_0_90px_#ff9a00]"
            />

            {/* 2. BIG BANG EXPLOSION */}
            {phase === 'bang' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                            animate={{
                                x: Math.cos(p.angle * Math.PI / 180) * p.distance,
                                y: Math.sin(p.angle * Math.PI / 180) * p.distance,
                                scale: [0, 1.5, 0],
                                opacity: [1, 1, 0]
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute rounded-full"
                            style={{
                                width: p.size,
                                height: p.size,
                                backgroundColor: p.color,
                                boxShadow: `0 0 20px ${p.color}, 0 0 40px ${p.color}`
                            }}
                        />
                    ))}
                    {/* Shockwave Rings */}
                    {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 1, borderColor: '#fff' }}
                            animate={{ scale: 4, opacity: 0, borderColor: '#ff9a00' }}
                            transition={{ duration: 0.8, delay }}
                            className="absolute w-[200px] h-[200px] rounded-full border-4"
                        />
                    ))}
                </div>
            )}

            {/* 3. FLUID MORPHING (Fish -> Rocket -> Bulb) with 3D Effects */}
            {phase === 'morph' && (
                <div className="relative z-10">
                    <motion.div
                        key={morphIndex}
                        initial={{ scale: 0, opacity: 0, rotateY: -180 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        exit={{ scale: 0, opacity: 0, rotateY: 180 }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        className="relative"
                        style={{
                            filter: 'drop-shadow(0 20px 40px rgba(255,154,0,0.6)) drop-shadow(0 0 60px rgba(255,182,45,0.4))',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        {/* Background glow layers for depth */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 blur-3xl"
                            style={{
                                background: 'radial-gradient(circle, rgba(255,154,0,0.8) 0%, transparent 70%)',
                                transform: 'translateZ(-50px)'
                            }}
                        />

                        {morphIndex === 0 && (
                            <motion.div
                                animate={{
                                    x: [0, 20, -20, 0],
                                    rotateZ: [0, 5, -5, 0]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Fish
                                    size={220}
                                    strokeWidth={1.5}
                                    className="text-white"
                                    style={{
                                        fill: 'url(#fishGradient)',
                                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
                                    }}
                                />
                                <svg width="0" height="0">
                                    <defs>
                                        <linearGradient id="fishGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#ff9a00" />
                                            <stop offset="50%" stopColor="#ffb62e" />
                                            <stop offset="100%" stopColor="#ffd700" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </motion.div>
                        )}

                        {morphIndex === 1 && (
                            <motion.div
                                animate={{
                                    y: [0, -30, 0],
                                    rotateZ: [0, -10, 0]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Rocket
                                    size={220}
                                    strokeWidth={1.5}
                                    className="text-white"
                                    style={{
                                        fill: 'url(#rocketGradient)',
                                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
                                    }}
                                />
                                <svg width="0" height="0">
                                    <defs>
                                        <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#ffd700" />
                                            <stop offset="50%" stopColor="#ff9a00" />
                                            <stop offset="100%" stopColor="#ff6b00" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </motion.div>
                        )}

                        {morphIndex === 2 && (
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [1, 0.8, 1]
                                }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <Lightbulb
                                    size={220}
                                    strokeWidth={1.5}
                                    className="text-white"
                                    style={{
                                        fill: 'url(#bulbGradient)',
                                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
                                    }}
                                />
                                <svg width="0" height="0">
                                    <defs>
                                        <radialGradient id="bulbGradient">
                                            <stop offset="0%" stopColor="#ffffff" />
                                            <stop offset="50%" stopColor="#ffd700" />
                                            <stop offset="100%" stopColor="#ff9a00" />
                                        </radialGradient>
                                    </defs>
                                </svg>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )}

            {/* 4. COALESCE (Sucking back in) */}
            {phase === 'coalesce' && (
                <motion.div className="absolute inset-0 flex items-center justify-center">
                    {particles.slice(0, 15).map((p) => (
                        <motion.div
                            key={`c-${p.id}`}
                            initial={{
                                x: Math.cos(p.angle * Math.PI / 180) * p.distance * 1.5,
                                y: Math.sin(p.angle * Math.PI / 180) * p.distance * 1.5,
                                scale: 0,
                                opacity: 0
                            }}
                            animate={{
                                x: 0,
                                y: 0,
                                scale: 1,
                                opacity: 1
                            }}
                            transition={{ duration: 0.8, ease: "backIn" }}
                            className="absolute rounded-full"
                            style={{
                                width: p.size,
                                height: p.size,
                                backgroundColor: p.color,
                                boxShadow: `0 0 15px ${p.color}`
                            }}
                        />
                    ))}
                </motion.div>
            )}

            {/* 5. BRANDING (Interactive Orange) */}
            {phase === 'branding' && (
                <div className="relative flex flex-col items-center z-50">
                    <motion.div
                        initial={{ scale: 0, y: 0 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9, rotate: 15 }}
                        className="relative w-[300px] h-[300px] cursor-pointer"
                    >
                        {/* The Orange with enhanced 3D effect */}
                        <motion.div
                            className="w-full h-full rounded-full shadow-[0_20px_60px_rgba(255,154,0,0.6)]"
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
                            {/* Texture Pores */}
                            <div className="absolute inset-0 opacity-20 mix-blend-overlay rounded-full"
                                style={{ backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)', backgroundSize: '6px 6px' }}
                            />

                            {/* Highlight */}
                            <div className="absolute top-[20%] left-[30%] w-20 h-20 rounded-full bg-white/40 blur-2xl" />
                        </motion.div>

                        {/* Leaf with 3D effect */}
                        <motion.div
                            initial={{ scale: 0, rotateZ: -45 }}
                            animate={{ scale: 1, rotateZ: -12 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="absolute -top-8 left-1/2 w-20 h-28 bg-gradient-to-br from-green-400 to-green-700 rounded-tr-[100%] rounded-bl-[100%] origin-bottom-left border-2 border-green-900"
                            style={{
                                filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))',
                                transform: 'translateX(-50%) rotateZ(-12deg)'
                            }}
                        />
                    </motion.div>

                    {/* Text */}
                    <div className="mt-16 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl md:text-8xl font-black text-white tracking-widest mb-4"
                        >
                            ALLRANGE
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
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
