'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'cosmic' | 'orange' | 'explosion' | 'brushStrokes' | 'merge' | 'splash'>('cosmic');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runSequence = async () => {
            setPhase('cosmic');
            await new Promise(r => setTimeout(r, 7000)); // Big Bang duration

            setPhase('orange');
            await new Promise(r => setTimeout(r, 1500));

            setPhase('explosion');
            await new Promise(r => setTimeout(r, 800));

            setPhase('brushStrokes');
            await new Promise(r => setTimeout(r, 2500));

            setPhase('merge');
            await new Promise(r => setTimeout(r, 1500));

            setPhase('splash');
            await new Promise(r => setTimeout(r, 3500));

            setLoopCount(prev => prev + 1);
        };

        runSequence();
    }, [loopCount]);

    const colors = [
        '#ff9a00', '#ffb62e', '#ffd700', '#ff6b00', '#ff8c42',
    ];

    const explosionParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        angle: (i / 50) * 360,
        distance: 140 + Math.random() * 260,
        size: 10 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const brushStrokes = [
        { from: { x: -700, y: -450 }, to: { x: 0, y: 0 }, angle: 45, color: colors[0], delay: 0 },
        { from: { x: 700, y: -450 }, to: { x: 0, y: 0 }, angle: -45, color: colors[1], delay: 0.1 },
        { from: { x: -700, y: 450 }, to: { x: 0, y: 0 }, angle: -45, color: colors[2], delay: 0.2 },
        { from: { x: 700, y: 450 }, to: { x: 0, y: 0 }, angle: 45, color: colors[3], delay: 0.3 },
        { from: { x: 0, y: -700 }, to: { x: 0, y: 0 }, angle: 0, color: colors[4], delay: 0.15 },
    ];

    const stars = Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2
    }));

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">

            {/* PHASE 0: THE COSMIC BIG BANG */}
            <AnimatePresence mode="wait">
                {phase === 'cosmic' && (
                    <motion.div
                        key="cosmic-intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 2, filter: 'brightness(3) blur(20px)', transition: { duration: 1 } }}
                        className="relative w-full h-full flex items-center justify-center bg-[#050005]"
                    >
                        {/* Starfield Background */}
                        <div className="absolute inset-0 z-0">
                            {stars.map((star) => (
                                <motion.div
                                    key={star.id}
                                    className="absolute bg-white rounded-full"
                                    style={{
                                        left: `${star.x + 50}%`,
                                        top: `${star.y + 50}%`,
                                        width: star.size,
                                        height: star.size,
                                    }}
                                    animate={{ opacity: [0.1, 0.8, 0.1] }}
                                    transition={{ duration: star.duration, repeat: Infinity }}
                                />
                            ))}
                        </div>

                        {/* Mysterious Singularity / Black Hole Core */}
                        <div className="relative z-10">
                            {/* Singularity Bloom */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: [0, 1, 0.8, 1.2],
                                    opacity: [0, 1, 0.8, 1],
                                }}
                                transition={{ duration: 3, ease: "easeOut" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_100px_white,0_0_200px_rgba(255,154,0,0.5)] z-20"
                            />

                            {/* Accretion Disk / Nebula Swirl */}
                            <motion.div
                                initial={{ rotate: 0, scale: 0, opacity: 0 }}
                                animate={{ rotate: 360, scale: [0, 1, 1.2], opacity: [0, 0.4, 0.6] }}
                                transition={{ duration: 7, ease: "linear" }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none"
                            >
                                <svg viewBox="0 0 800 800" className="w-full h-full opacity-40">
                                    <defs>
                                        <radialGradient id="nebulaGrad" cx="50%" cy="50%" r="50%">
                                            <stop offset="0%" stopColor="#ffb62e" stopOpacity="0.8" />
                                            <stop offset="50%" stopColor="#ff6b00" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#000" stopOpacity="0" />
                                        </radialGradient>
                                    </defs>
                                    <circle cx="400" cy="400" r="350" fill="url(#nebulaGrad)" style={{ filter: 'blur(60px)' }} />
                                    {/* Swirling Arms */}
                                    {[0, 120, 240].map((rot) => (
                                        <motion.path
                                            key={rot}
                                            d="M 400 400 C 500 300, 700 400, 400 700"
                                            stroke="white"
                                            strokeWidth="1"
                                            fill="none"
                                            opacity="0.2"
                                            transform={`rotate(${rot} 400 400)`}
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 4, delay: 2 }}
                                        />
                                    ))}
                                </svg>
                            </motion.div>

                            {/* THE ORANGE SUN (IGNITION) */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: [0, 0.5, 1],
                                    opacity: [0, 0, 1],
                                    filter: ['brightness(1)', 'brightness(2)', 'brightness(1)']
                                }}
                                transition={{ delay: 3, duration: 3, times: [0, 0.5, 1] }}
                                className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
                            >
                                {/* Heat Aura */}
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{ background: 'radial-gradient(circle, #ff9a00 0%, transparent 70%)', filter: 'blur(40px)' }}
                                />
                                {/* Sun Surface */}
                                <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 20%, #ff9a00 50%, #cc7a00 80%, #000 100%)', boxShadow: '0 0 100px rgba(255,154,0,0.8)' }}>
                                    <div className="absolute inset-0 opacity-10 mix-blend-overlay rounded-full" style={{ backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)', backgroundSize: '4px 4px' }} />
                                </div>
                            </motion.div>
                        </div>

                        <motion.div
                            className="absolute bottom-20 text-center z-30"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 4.5 }}
                        >
                            <h2 className="text-white text-3xl md:text-5xl font-black tracking-[1.5em] uppercase opacity-40">
                                Big <span className="text-brand-gold italic">Bang</span>
                            </h2>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PHASE 1: BRAND ORANGE EMERGES (From the supernova center) */}
            {phase === 'orange' && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100, damping: 10 }}
                    className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px]"
                >
                    <motion.div
                        className="w-full h-full rounded-full"
                        animate={{
                            boxShadow: [
                                '0 40px 100px rgba(255,154,0,0.6)',
                                '0 60px 160px rgba(255,154,0,0.9)',
                                '0 40px 100px rgba(255,154,0,0.6)'
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{
                            background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)'
                        }}
                    >
                        <div className="absolute inset-0 opacity-20 mix-blend-overlay rounded-full" style={{ backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)', backgroundSize: '7px 7px' }} />
                    </motion.div>

                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="absolute -top-16 left-1/2 w-28 h-40 md:w-36 md:h-52 bg-gradient-to-br from-green-300 to-green-800 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/10 -translate-x-1/2 -rotate-12"
                    />
                </motion.div>
            )}

            {/* PHASE 2: COSMIC EXPLOSION */}
            {phase === 'explosion' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 12, opacity: 0 }} transition={{ duration: 0.8 }} className="absolute w-[300px] h-[300px] rounded-full bg-white shadow-[0_0_100px_#fff]" />
                    {explosionParticles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, scale: 0 }}
                            animate={{ x: Math.cos(p.angle * Math.PI / 180) * p.distance, y: Math.sin(p.angle * Math.PI / 180) * p.distance, scale: [0, 3, 0], opacity: [1, 1, 0] }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="absolute rounded-full"
                            style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 50px ${p.color}` }}
                        />
                    ))}
                </div>
            )}

            {/* PHASE 3: THE BRUSH DYNAMICS */}
            {phase === 'brushStrokes' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {brushStrokes.map((stroke, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: stroke.from.x, y: stroke.from.y, scaleX: 0, opacity: 0 }}
                            animate={{ x: stroke.to.x, y: stroke.to.y, scaleX: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: stroke.delay, ease: "circOut" }}
                            className="absolute"
                            style={{ transformOrigin: 'left center', rotate: `${stroke.angle}deg` }}
                        >
                            <div className="relative h-[100px] md:h-[180px]" style={{ width: '100vw', maxWidth: '700px', background: `linear-gradient(90deg, transparent 0%, ${stroke.color} 50%, transparent 100%)`, filter: 'blur(5px)', borderRadius: '150px', opacity: 0.8 }} />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* PHASE 4: THE MERGE CORE */}
            {phase === 'merge' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {colors.map((color, i) => (
                        <motion.div key={i} initial={{ scale: 4, opacity: 0 }} animate={{ scale: 0.1, opacity: 1 }} transition={{ duration: 2, delay: i * 0.12 }} className="absolute w-[600px] h-[600px] rounded-full blur-[100px]" style={{ background: color, mixBlendMode: 'screen' }} />
                    ))}
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1.5, opacity: 1 }} transition={{ duration: 1.2, delay: 1 }} className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] z-10">
                        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 50px 180px rgba(255,154,0,0.8)' }} />
                    </motion.div>
                </div>
            )}

            {/* PHASE 5: FINAL BRANDING PRESENTATION */}
            {phase === 'splash' && (
                <div className="absolute w-full h-full flex items-center justify-center text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }}>
                        <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px] mx-auto mb-20">
                            <motion.div className="w-full h-full rounded-full shadow-[0_40px_100px_rgba(255,154,0,0.7)]" animate={{ y: [0, -30, 0], scale: [1, 1.08, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)' }} />
                            <div className="absolute -top-12 md:-top-20 left-1/2 w-24 h-36 md:w-36 md:h-52 bg-gradient-to-br from-green-300 to-green-900 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/10 -translate-x-1/2 -rotate-15" />
                        </div>
                        <h1 className="text-7xl md:text-[14rem] font-black text-white tracking-widest md:tracking-[0.1em] mb-12 select-none drop-shadow-[0_20px_50px_rgba(255,154,0,0.5)]">
                            ALL<span className="text-brand-gold">RANGE</span>
                        </h1>
                        <div className="space-y-6">
                            <p className="text-brand-gold text-3xl md:text-6xl tracking-[0.6em] md:tracking-[1.2em] font-light italic uppercase">
                                Infinite Design
                            </p>
                            <p className="text-neutral-500 text-xs md:text-xl tracking-[2em] font-light uppercase">
                                Curating Spaces • Branding Spirits
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}

        </div>
    );
}
