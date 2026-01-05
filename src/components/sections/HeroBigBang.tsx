'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'cosmic' | 'orange' | 'explosion' | 'brushStrokes' | 'merge' | 'splash' | 'collapse'>('cosmic');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runSequence = async () => {
            setPhase('cosmic');
            await new Promise(r => setTimeout(r, 6500));

            setPhase('orange');
            await new Promise(r => setTimeout(r, 1500));

            setPhase('explosion');
            await new Promise(r => setTimeout(r, 800));

            setPhase('brushStrokes');
            await new Promise(r => setTimeout(r, 2200));

            setPhase('merge');
            await new Promise(r => setTimeout(r, 1500));

            setPhase('splash');
            await new Promise(r => setTimeout(r, 4000));

            // NEW: Black Hole Collapse/Implosion phase for infinite loop
            setPhase('collapse');
            await new Promise(r => setTimeout(r, 1500));

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

    // Simplified brush strokes - No arrows, just energy sweeps
    const brushStrokes = [
        { from: { x: -700, y: 0 }, to: { x: 0, y: 0 }, angle: 0, color: colors[0], delay: 0 },
        { from: { x: 700, y: 0 }, to: { x: 0, y: 0 }, angle: 0, color: colors[1], delay: 0.1 },
        { from: { x: 0, y: -700 }, to: { x: 0, y: 0 }, angle: 90, color: colors[2], delay: 0.2 },
        { from: { x: 0, y: 700 }, to: { x: 0, y: 0 }, angle: 90, color: colors[3], delay: 0.3 },
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

            {/* BACKGROUND: ETERNAL STARFIELD */}
            <div className="absolute inset-0 z-0">
                {stars.map((star) => (
                    <motion.div
                        key={`${loopCount}-${star.id}`}
                        className="absolute bg-white rounded-full"
                        style={{
                            left: `${star.x + 50}%`,
                            top: `${star.y + 50}%`,
                            width: star.size,
                            height: star.size,
                        }}
                        animate={{ opacity: [0.1, 0.6, 0.1] }}
                        transition={{ duration: star.duration, repeat: Infinity }}
                    />
                ))}
            </div>

            {/* PHASE 0: THE COSMIC BIG BANG */}
            <AnimatePresence mode="wait">
                {phase === 'cosmic' && (
                    <motion.div
                        key="cosmic-intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.2, filter: 'brightness(5) blur(30px)', transition: { duration: 0.8 } }}
                        className="relative w-full h-full flex items-center justify-center p-4"
                    >
                        {/* Singularity Bloom */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1.2, 0.8, 1], opacity: [0, 1, 0.8, 1] }}
                            transition={{ duration: 3 }}
                            className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_80px_white,0_0_150px_#ff9a00] z-20"
                        />

                        {/* Mysterious Nebula Swirl */}
                        <motion.div
                            className="absolute w-[800px] h-[800px] pointer-events-none opacity-40"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <svg viewBox="0 0 800 800" className="w-full h-full">
                                <defs>
                                    <radialGradient id="cosmicNebula" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#ffb62e" stopOpacity="0.6" />
                                        <stop offset="60%" stopColor="#ff6b00" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#000" stopOpacity="0" />
                                    </radialGradient>
                                </defs>
                                <circle cx="400" cy="400" r="350" fill="url(#cosmicNebula)" style={{ filter: 'blur(50px)' }} />
                            </svg>
                        </motion.div>

                        {/* THE IGNITION CORE */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1] }}
                            transition={{ delay: 2.5, duration: 2, ease: "circOut" }}
                            className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]"
                        >
                            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 20%, #ff9a00 50%, #cc7a00 80%, #000 100%)', boxShadow: '0 0 100px rgba(255,154,0,0.6)' }} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PHASE 1: BRAND ORANGE CORE */}
            {phase === 'orange' && (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px]"
                >
                    <div
                        className="w-full h-full rounded-full"
                        style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 40px 100px rgba(255,154,0,0.6)' }}
                    />
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute -top-12 left-1/2 w-24 h-36 md:w-32 md:h-44 bg-gradient-to-br from-green-300 to-green-800 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/10 -translate-x-1/2 -rotate-12"
                    />
                </motion.div>
            )}

            {/* PHASE 2: COSMIC EXPLOSION */}
            {phase === 'explosion' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 15, opacity: 0 }} transition={{ duration: 0.8 }} className="absolute w-[200px] h-[200px] rounded-full bg-white blur-md" />
                    {explosionParticles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, scale: 0 }}
                            animate={{ x: Math.cos(p.angle * Math.PI / 180) * p.distance, y: Math.sin(p.angle * Math.PI / 180) * p.distance, scale: [0, 2.5, 0], opacity: [1, 1, 0] }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="absolute rounded-full"
                            style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 40px ${p.color}` }}
                        />
                    ))}
                </div>
            )}

            {/* PHASE 3: THE BRUSH SWEEPS (Energy, not arrows) */}
            {phase === 'brushStrokes' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {brushStrokes.map((stroke, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: stroke.from.x, y: stroke.from.y, scaleX: 0, opacity: 0 }}
                            animate={{ x: stroke.to.x, y: stroke.to.y, scaleX: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: stroke.delay, ease: "circOut" }}
                            className="absolute"
                            style={{ transformOrigin: 'center center', rotate: `${stroke.angle}deg` }}
                        >
                            <div className="relative h-[80px] md:h-[120px]" style={{ width: '100vw', maxWidth: '600px', background: `linear-gradient(90deg, transparent 0%, ${stroke.color} 50%, transparent 100%)`, filter: 'blur(5px)', borderRadius: '100px', opacity: 0.7 }} />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* PHASE 4: THE MERGE */}
            {phase === 'merge' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {colors.map((color, i) => (
                        <motion.div key={i} initial={{ scale: 3, opacity: 0 }} animate={{ scale: 0.1, opacity: 1 }} transition={{ duration: 1.8, delay: i * 0.1 }} className="absolute w-[500px] h-[500px] rounded-full blur-[80px]" style={{ background: color, mixBlendMode: 'screen' }} />
                    ))}
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, delay: 0.8 }} className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] z-10">
                        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 40px 120px rgba(255,154,0,0.6)' }} />
                    </motion.div>
                </div>
            )}

            {/* PHASE 5: FINAL BRANDING (Optimized size) */}
            {phase === 'splash' && (
                <div className="absolute w-full h-full flex items-center justify-center text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                        <div className="relative w-[240px] h-[240px] md:w-[360px] md:h-[360px] mx-auto mb-12 md:mb-16">
                            <motion.div className="w-full h-full rounded-full" animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 20px 70px rgba(255,154,0,0.5)' }} />
                            <div className="absolute -top-10 md:-top-16 left-1/2 w-20 h-32 md:w-32 md:h-48 bg-gradient-to-br from-green-300 to-green-800 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/10 -translate-x-1/2 -rotate-12" />
                        </div>
                        <h1 className="text-5xl md:text-[10rem] font-black text-white tracking-widest md:tracking-[0.15em] mb-8 md:mb-10 select-none drop-shadow-2xl">
                            ALL<span className="text-brand-gold">RANGE</span>
                        </h1>
                        <div className="space-y-2 md:space-y-4">
                            <p className="text-brand-gold text-lg md:text-5xl tracking-[0.4em] md:tracking-[1em] font-light italic uppercase">
                                Infinite Design
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* PHASE 6: COSMIC COLLAPSE / BLACK HOLE SUCTION (For infinite loop) */}
            <AnimatePresence>
                {phase === 'collapse' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 5, opacity: 0 }}
                            animate={{ scale: 0, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "anticipate" }}
                            className="w-[1000px] h-[1000px] bg-white rounded-full flex items-center justify-center"
                            style={{ filter: 'blur(100px)' }}
                        >
                            <div className="w-4 h-4 bg-black rounded-full" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
