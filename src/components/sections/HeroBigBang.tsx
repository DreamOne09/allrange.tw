'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'cosmic' | 'orange' | 'explosion' | 'radiation' | 'merge' | 'splash' | 'collapse'>('cosmic');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runSequence = async () => {
            setPhase('cosmic');
            await new Promise(r => setTimeout(r, 5000));

            setPhase('orange');
            await new Promise(r => setTimeout(r, 1200));

            setPhase('explosion');
            await new Promise(r => setTimeout(r, 600));

            setPhase('radiation');
            await new Promise(r => setTimeout(r, 2000));

            setPhase('merge');
            await new Promise(r => setTimeout(r, 1200));

            setPhase('splash');
            await new Promise(r => setTimeout(r, 4500));

            setPhase('collapse');
            await new Promise(r => setTimeout(r, 1200));

            setLoopCount(prev => prev + 1);
        };

        runSequence();
    }, [loopCount]);

    const colors = [
        '#ff9a00', '#ffb62e', '#ffd700', '#ff6b00', '#ff8c42',
    ];

    // Refined Radiation Rays (Citrus Segment Style)
    const radiationRays = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        angle: (i / 12) * 360,
        delay: i * 0.05,
        color: colors[i % colors.length]
    }));

    const explosionParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        angle: (i / 40) * 360,
        distance: 140 + Math.random() * 220,
        size: 6 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)]
    }));

    // Unified Orange Core Size
    const coreSize = "w-[260px] h-[260px] md:w-[400px] md:h-[400px]";

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">

            {/* BACKGROUND: COSMIC VOID */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#1a1000_0%,_#000_80%)] opacity-30" />

            <AnimatePresence mode="popLayout">
                {/* PHASE 0: THE COSMIC SINGULARITY */}
                {phase === 'cosmic' && (
                    <motion.div
                        key="cosmic"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.1, filter: 'blur(40px)' }}
                        className="absolute inset-0 flex items-center justify-center z-10"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.1, 1], opacity: [0, 1] }}
                            transition={{ duration: 2.5 }}
                            className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_40px_white,0_0_100px_#ff9a00]"
                        />

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full opacity-25"
                            style={{
                                background: 'radial-gradient(circle, rgba(255,182,46,0.5) 0%, rgba(255,107,0,0.1) 50%, transparent 80%)',
                                filter: 'blur(40px)',
                            }}
                        />

                        {/* Birth of Sun */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1], opacity: [0, 1] }}
                            transition={{ delay: 2.2, duration: 2, ease: "circOut" }}
                            className={`relative ${coreSize} rounded-full`}
                            style={{
                                background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 20%, #ff9a00 50%, #cc7a00 85%, #8a5200 100%)',
                                boxShadow: '0 0 50px rgba(255,154,0,0.3)'
                            }}
                        />
                    </motion.div>
                )}

                {/* PHASE 1: BRAND ORANGE CORE - FIXED POSITION */}
                {phase === 'orange' && (
                    <motion.div
                        key="orange"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center z-20"
                    >
                        <div className={`relative ${coreSize}`}>
                            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 30px 80px rgba(255,154,0,0.5)' }} />
                            <motion.div
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="absolute -top-[12%] left-1/2 w-[25%] h-[40%] bg-gradient-to-br from-green-300 to-green-800 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/10 -translate-x-1/2 -rotate-12"
                            />
                        </div>
                    </motion.div>
                )}

                {/* PHASE 2: COSMIC EXPLOSION */}
                {phase === 'explosion' && (
                    <motion.div key="explosion" className="absolute inset-0 flex items-center justify-center z-30">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 15, opacity: 0 }} transition={{ duration: 0.6 }} className="absolute w-[180px] h-[180px] rounded-full bg-white blur-sm" />
                        {explosionParticles.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ x: 0, y: 0, scale: 0 }}
                                animate={{ x: Math.cos(p.angle * Math.PI / 180) * p.distance, y: Math.sin(p.angle * Math.PI / 180) * p.distance, scale: [0, 2.5, 0], opacity: [1, 1, 0] }}
                                transition={{ duration: 0.9, ease: "easeOut" }}
                                className="absolute rounded-full"
                                style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 20px ${p.color}` }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* PHASE 3: CITRUS RADIATION - THE BURST OPEN EFFECT */}
                {phase === 'radiation' && (
                    <motion.div key="radiation" className="absolute inset-0 flex items-center justify-center z-40">
                        {/* THE SPIRIT OF RADIATING ENERGY */}
                        {radiationRays.map((ray) => (
                            <motion.div
                                key={ray.id}
                                initial={{ scaleY: 0, opacity: 0 }}
                                animate={{ scaleY: [0, 1.2, 1], opacity: [0, 0.8, 0] }}
                                transition={{ duration: 1.5, delay: ray.delay, ease: "circOut" }}
                                className="absolute origin-center"
                                style={{ rotate: `${ray.angle}deg`, height: '100vh', width: '24px' }}
                            >
                                <div
                                    className="w-full h-full"
                                    style={{
                                        background: `linear-gradient(to top, transparent, ${ray.color} 50%, transparent)`,
                                        filter: 'blur(8px)',
                                        opacity: 0.5
                                    }}
                                />
                                {/* Juice Droplets Radiating */}
                                <motion.div
                                    animate={{ y: [-100, -600], opacity: [0, 1, 0] }}
                                    transition={{ duration: 1.2, delay: ray.delay + 0.2 }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 w-3 h-10 rounded-full"
                                    style={{ background: ray.color, boxShadow: `0 0 20px ${ray.color}` }}
                                />
                            </motion.div>
                        ))}
                        {/* Inner Core Pulsing through radiation */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1], opacity: [0, 0.5] }}
                            transition={{ duration: 0.8 }}
                            className={`absolute ${coreSize} rounded-full bg-brand-orange-light blur-2xl opacity-30`}
                        />
                    </motion.div>
                )}

                {/* PHASE 4: THE MERGE TRANSITION - UNIFIED SCALE */}
                {phase === 'merge' && (
                    <motion.div key="merge" className="absolute inset-0 flex items-center justify-center z-50">
                        {colors.map((color, i) => (
                            <motion.div key={i} initial={{ scale: 2.5, opacity: 0 }} animate={{ scale: 0.1, opacity: 1 }} transition={{ duration: 1.5, delay: i * 0.08 }} className="absolute w-[400px] h-[400px] rounded-full blur-[50px]" style={{ background: color, mixBlendMode: 'screen' }} />
                        ))}
                        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className={`relative ${coreSize}`}>
                            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 30px 100px rgba(255,154,0,0.5)' }} />
                        </motion.div>
                    </motion.div>
                )}

                {/* PHASE 5: FINAL BRANDING - REMOVED FLOAT UP */}
                {phase === 'splash' && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 1.2 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-60"
                    >
                        <div className={`relative ${coreSize} mx-auto mb-10 md:mb-14`}>
                            <motion.div className="w-full h-full rounded-full" animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 30px 80px rgba(255,154,0,0.4)' }} />
                            <div className="absolute -top-[12%] left-1/2 w-[25%] h-[40%] bg-gradient-to-br from-green-300 to-green-800 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/10 -translate-x-1/2 -rotate-12" />
                        </div>
                        <h1 className="text-5xl md:text-[10rem] font-black text-white tracking-[0.1em] mb-6 md:mb-8 select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            ALL<span className="text-brand-gold">RANGE</span>
                        </h1>
                        <p className="text-brand-gold text-2xl md:text-5xl tracking-[0.2em] md:tracking-[0.4em] font-medium uppercase">
                            樂橙創作工作室
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
                            initial={{ scale: 4, opacity: 0 }}
                            animate={{ scale: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "anticipate" }}
                            className="w-[500px] h-[500px] bg-white rounded-full blur-[80px] flex items-center justify-center"
                        >
                            <div className="relative w-4 h-4 bg-black rounded-full" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
