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
            await new Promise(r => setTimeout(r, 4500));

            setPhase('collapse');
            await new Promise(r => setTimeout(r, 1500));

            setLoopCount(prev => prev + 1);
        };

        runSequence();
    }, [loopCount]);

    const colors = [
        '#ff9a00', '#ffb62e', '#ffd700', '#ff6b00', '#ff8c42',
    ];

    const explosionParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        angle: (i / 40) * 360,
        distance: 140 + Math.random() * 240,
        size: 8 + Math.random() * 15,
        color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const brushStrokes = [
        { from: { x: -600, y: 0 }, to: { x: 0, y: 0 }, angle: 0, color: colors[0], delay: 0 },
        { from: { x: 600, y: 0 }, to: { x: 0, y: 0 }, angle: 0, color: colors[1], delay: 0.1 },
        { from: { x: 0, y: -600 }, to: { x: 0, y: 0 }, angle: 90, color: colors[2], delay: 0.2 },
        { from: { x: 0, y: 600 }, to: { x: 0, y: 0 }, angle: 90, color: colors[3], delay: 0.3 },
    ];

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">

            {/* PERFORMANCE OPTIMIZED BACKGROUND */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#1a1000_0%,_#000_70%)] opacity-50" />

            <AnimatePresence>
                {/* PHASE 0: THE COSMIC BIG BANG */}
                {phase === 'cosmic' && (
                    <motion.div
                        key="cosmic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
                        className="absolute inset-0 flex items-center justify-center z-10"
                    >
                        {/* Singularity Core - Simple and fast */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 0.9, 1] }}
                            transition={{ duration: 3 }}
                            className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_40px_white,0_0_80px_#ff9a00]"
                        />

                        {/* Nebula - Using CSS Gradients for performance instead of heavy SVG filters */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-30"
                            style={{
                                background: 'radial-gradient(circle, rgba(255,182,46,0.5) 0%, rgba(255,107,0,0.1) 40%, transparent 70%)',
                                filter: 'blur(40px)',
                            }}
                        />

                        {/* Ignition Core */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1] }}
                            transition={{ delay: 2.5, duration: 2.5, ease: "circOut" }}
                            className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 20%, #ff9a00 50%, #cc7a00 85%, #000 100%)',
                                boxShadow: '0 0 80px rgba(255,154,0,0.4)',
                                willChange: 'transform'
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
                        <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px]">
                            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 40px 100px rgba(255,154,0,0.6)' }} />
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="absolute -top-12 left-1/2 w-24 h-36 md:w-32 md:h-44 bg-gradient-to-br from-green-300 to-green-800 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/10 -translate-x-1/2 -rotate-12"
                            />
                        </div>
                    </motion.div>
                )}

                {/* PHASE 2: EXPLOSION */}
                {phase === 'explosion' && (
                    <motion.div key="explosion" className="absolute inset-0 flex items-center justify-center z-30">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 15, opacity: 0 }} transition={{ duration: 0.8 }} className="absolute w-[200px] h-[200px] rounded-full bg-white blur-md" />
                        {explosionParticles.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ x: 0, y: 0, scale: 0 }}
                                animate={{ x: Math.cos(p.angle * Math.PI / 180) * p.distance, y: Math.sin(p.angle * Math.PI / 180) * p.distance, scale: [0, 2.5, 0], opacity: [1, 1, 0] }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="absolute rounded-full"
                                style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 30px ${p.color}` }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* PHASE 3: THE BRUSH SWEEPS */}
                {phase === 'brushStrokes' && (
                    <motion.div key="brush" className="absolute inset-0 flex items-center justify-center z-40">
                        {brushStrokes.map((stroke, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: stroke.from.x, y: stroke.from.y, scaleX: 0, opacity: 0 }}
                                animate={{ x: stroke.to.x, y: stroke.to.y, scaleX: 1, opacity: 1 }}
                                transition={{ duration: 1.2, delay: stroke.delay, ease: "circOut" }}
                                className="absolute"
                                style={{ transformOrigin: 'center center', rotate: `${stroke.angle}deg` }}
                            >
                                <div className="relative h-[80px] md:h-[120px]" style={{ width: '100vw', maxWidth: '600px', background: `linear-gradient(90deg, transparent 0%, ${stroke.color} 50%, transparent 100%)`, filter: 'blur(5px)', borderRadius: '100px', opacity: 0.6 }} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* PHASE 4: THE MERGE */}
                {phase === 'merge' && (
                    <motion.div key="merge" className="absolute inset-0 flex items-center justify-center z-50">
                        {colors.map((color, i) => (
                            <motion.div key={i} initial={{ scale: 3, opacity: 0 }} animate={{ scale: 0.1, opacity: 1 }} transition={{ duration: 1.5, delay: i * 0.1 }} className="absolute w-[400px] h-[400px] rounded-full blur-[60px]" style={{ background: color, mixBlendMode: 'screen' }} />
                        ))}
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, delay: 0.5 }} className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px]">
                            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 40px 120px rgba(255,154,0,0.6)' }} />
                        </motion.div>
                    </motion.div>
                )}

                {/* PHASE 5: FINAL BRANDING */}
                {phase === 'splash' && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-60"
                    >
                        <div className="relative w-[240px] h-[240px] md:w-[360px] md:h-[360px] mx-auto mb-12 md:mb-16">
                            <motion.div className="w-full h-full rounded-full" animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 20px 70px rgba(255,154,0,0.5)' }} />
                            <div className="absolute -top-10 md:-top-16 left-1/2 w-20 h-32 md:w-32 md:h-48 bg-gradient-to-br from-green-300 to-green-800 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/10 -translate-x-1/2 -rotate-12" />
                        </div>
                        <h1 className="text-5xl md:text-[10rem] font-black text-white tracking-widest md:tracking-[0.15em] mb-8 md:mb-10 select-none drop-shadow-2xl">
                            ALL<span className="text-brand-gold">RANGE</span>
                        </h1>
                        <p className="text-brand-gold text-lg md:text-5xl tracking-[0.4em] md:tracking-[1em] font-light italic uppercase">
                            Infinite Design
                        </p>
                    </motion.div>
                )}

                {/* PHASE 6: COSMIC COLLAPSE */}
                {phase === 'collapse' && (
                    <motion.div
                        key="collapse"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] flex items-center justify-center bg-black/50"
                    >
                        <motion.div
                            initial={{ scale: 5, opacity: 0 }}
                            animate={{ scale: 0, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "anticipate" }}
                            className="w-[800px] h-[800px] bg-white rounded-full blur-[80px]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
