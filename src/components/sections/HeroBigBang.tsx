'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'cosmic' | 'orange' | 'explosion' | 'brushStrokes' | 'merge' | 'splash' | 'collapse'>('cosmic');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runSequence = async () => {
            setPhase('cosmic');
            await new Promise(r => setTimeout(r, 5000)); // Faster cosmic intro

            setPhase('orange');
            await new Promise(r => setTimeout(r, 1200));

            setPhase('explosion');
            await new Promise(r => setTimeout(r, 600));

            setPhase('brushStrokes');
            await new Promise(r => setTimeout(r, 1800));

            setPhase('merge');
            await new Promise(r => setTimeout(r, 1200));

            setPhase('splash');
            await new Promise(r => setTimeout(r, 4000));

            setPhase('collapse');
            await new Promise(r => setTimeout(r, 1200));

            setLoopCount(prev => prev + 1);
        };

        runSequence();
    }, [loopCount]);

    const colors = [
        '#ff9a00', '#ffb62e', '#ffd700', '#ff6b00', '#ff8c42',
    ];

    const explosionParticles = Array.from({ length: 36 }).map((_, i) => ({
        id: i,
        angle: (i / 36) * 360,
        distance: 120 + Math.random() * 200,
        size: 8 + Math.random() * 12,
        color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const brushStrokes = [
        { from: { x: -500, y: 0 }, to: { x: 0, y: 0 }, angle: 15, color: colors[0], delay: 0 },
        { from: { x: 500, y: 0 }, to: { x: 0, y: 0 }, angle: -15, color: colors[1], delay: 0.1 },
        { from: { x: 0, y: -500 }, to: { x: 0, y: 0 }, angle: 105, color: colors[2], delay: 0.2 },
        { from: { x: 0, y: 500 }, to: { x: 0, y: 0 }, angle: -75, color: colors[3], delay: 0.3 },
    ];

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">

            {/* BACKGROUND: GPU ACCELERATED GRADIENT */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#201500_0%,_#000_70%)] opacity-40 mix-blend-screen" />

            <AnimatePresence mode="popLayout">
                {/* PHASE 0: THE COSMIC BIG BANG */}
                {phase === 'cosmic' && (
                    <motion.div
                        key="cosmic"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.2, filter: 'blur(30px)' }}
                        className="absolute inset-0 flex items-center justify-center z-10"
                    >
                        {/* Singularity Core */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.1, 0.9, 1], opacity: [0, 1] }}
                            transition={{ duration: 2.5 }}
                            className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_50px_white,0_0_100px_#ff9a00]"
                        />

                        {/* Nebula Whirl - Optimized */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-30"
                            style={{
                                background: 'radial-gradient(circle, rgba(255,182,46,0.6) 0%, rgba(255,107,0,0.1) 50%, transparent 80%)',
                                filter: 'blur(30px)',
                            }}
                        />

                        {/* Ignition Sun */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1], opacity: [0, 1] }}
                            transition={{ delay: 2, duration: 2, ease: "circOut" }}
                            className="relative w-[260px] h-[260px] md:w-[380px] md:h-[380px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 20%, #ff9a00 50%, #cc7a00 85%, #8a5200 100%)',
                                boxShadow: '0 0 60px rgba(255,154,0,0.3)',
                                willChange: 'transform, opacity'
                            }}
                        />
                    </motion.div>
                )}

                {/* PHASE 1: BRAND ORANGE CORE */}
                {phase === 'orange' && (
                    <motion.div
                        key="orange"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center z-20"
                    >
                        <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
                            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 30px 80px rgba(255,154,0,0.5)' }} />
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="absolute -top-10 left-1/2 w-20 h-32 md:w-28 md:h-40 bg-gradient-to-br from-green-300 to-green-800 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/10 -translate-x-1/2 -rotate-12"
                            />
                        </div>
                    </motion.div>
                )}

                {/* PHASE 2: EXPLOSION - IMPACTFUL & CLEAN */}
                {phase === 'explosion' && (
                    <motion.div key="explosion" className="absolute inset-0 flex items-center justify-center z-30">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 12, opacity: 0 }} transition={{ duration: 0.6 }} className="absolute w-[150px] h-[150px] rounded-full bg-white blur-sm" />
                        {explosionParticles.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ x: 0, y: 0, scale: 0 }}
                                animate={{ x: Math.cos(p.angle * Math.PI / 180) * p.distance, y: Math.sin(p.angle * Math.PI / 180) * p.distance, scale: [0, 2, 0], opacity: [1, 1, 0] }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute rounded-full"
                                style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 20px ${p.color}`, willChange: 'transform, opacity' }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* PHASE 3: THE ENERGY BRUSH SWEEPS */}
                {phase === 'brushStrokes' && (
                    <motion.div key="brush" className="absolute inset-0 flex items-center justify-center z-40">
                        {brushStrokes.map((stroke, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: stroke.from.x, y: stroke.from.y, scaleX: 0, opacity: 0 }}
                                animate={{ x: stroke.to.x, y: stroke.to.y, scaleX: 1, opacity: 1 }}
                                transition={{ duration: 1, delay: stroke.delay, ease: "circOut" }}
                                className="absolute"
                                style={{ transformOrigin: 'center center', rotate: `${stroke.angle}deg` }}
                            >
                                <div className="relative h-[60px] md:h-[100px]" style={{ width: '80vw', maxWidth: '500px', background: `linear-gradient(90deg, transparent 0%, ${stroke.color} 50%, transparent 100%)`, filter: 'blur(3px)', borderRadius: '80px', opacity: 0.5 }} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* PHASE 4: THE MERGE TRANSITION */}
                {phase === 'merge' && (
                    <motion.div key="merge" className="absolute inset-0 flex items-center justify-center z-50">
                        {colors.map((color, i) => (
                            <motion.div key={i} initial={{ scale: 2.5, opacity: 0 }} animate={{ scale: 0.1, opacity: 1 }} transition={{ duration: 1.2, delay: i * 0.08 }} className="absolute w-[300px] h-[300px] rounded-full blur-[40px]" style={{ background: color, mixBlendMode: 'screen' }} />
                        ))}
                        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
                            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 30px 100px rgba(255,154,0,0.5)' }} />
                        </motion.div>
                    </motion.div>
                )}

                {/* PHASE 5: FINAL BRANDING - REFINED SCALE */}
                {phase === 'splash' && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-60"
                    >
                        <div className="relative w-[220px] h-[220px] md:w-[320px] md:h-[320px] mx-auto mb-10 md:mb-14">
                            <motion.div className="w-full h-full rounded-full" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 20px 60px rgba(255,154,0,0.4)' }} />
                            <div className="absolute -top-8 md:-top-14 left-1/2 w-18 h-28 md:w-28 md:h-40 bg-gradient-to-br from-green-300 to-green-800 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/10 -translate-x-1/2 -rotate-12" />
                        </div>
                        <h1 className="text-5xl md:text-[10rem] font-black text-white tracking-[0.1em] mb-6 md:mb-8 select-none drop-shadow-2xl">
                            ALL<span className="text-brand-gold">RANGE</span>
                        </h1>
                        <p className="text-brand-gold text-base md:text-5xl tracking-[0.4em] md:tracking-[0.8em] font-light italic uppercase">
                            Infinite Design
                        </p>
                    </motion.div>
                )}

                {/* PHASE 6: COSMIC COLLAPSE - SEAMLESS RESET */}
                {phase === 'collapse' && (
                    <motion.div
                        key="collapse"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40"
                    >
                        <motion.div
                            initial={{ scale: 3, opacity: 0 }}
                            animate={{ scale: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "anticipate" }}
                            className="w-[400px] h-[400px] bg-white rounded-full blur-[60px] flex items-center justify-center"
                        >
                            <div className="w-2 h-2 bg-black rounded-full" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
