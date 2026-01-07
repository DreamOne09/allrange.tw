'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'cosmic' | 'orange' | 'explosion' | 'radiation' | 'merge' | 'splash' | 'collapse'>('cosmic');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runSequence = async () => {
            setPhase('cosmic');
            await new Promise(r => setTimeout(r, 4800));

            setPhase('orange');
            await new Promise(r => setTimeout(r, 1200));

            setPhase('explosion');
            await new Promise(r => setTimeout(r, 600));

            setPhase('radiation');
            await new Promise(r => setTimeout(r, 1800));

            setPhase('merge');
            await new Promise(r => setTimeout(r, 1200));

            setPhase('splash');
            await new Promise(r => setTimeout(r, 5500));

            setPhase('collapse');
            await new Promise(r => setTimeout(r, 1000));

            setLoopCount(prev => prev + 1);
        };

        runSequence();
    }, [loopCount]);

    const colors = [
        '#ff9a00', '#ffb62e', '#ffd700', '#ff6b00', '#ff8c42',
    ];

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const radiationCount = isMobile ? 8 : 12;
    const particleCount = isMobile ? 24 : 40;

    const radiationRays = Array.from({ length: radiationCount }).map((_, i) => ({
        id: i,
        angle: (i / radiationCount) * 360,
        delay: i * 0.05,
        color: colors[i % colors.length]
    }));

    const explosionParticles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        angle: (i / particleCount) * 360,
        distance: 120 + Math.random() * 200,
        size: 5 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)]
    }));

    // Reusable core size
    const coreSize = "w-[240px] h-[240px] md:w-[380px] md:h-[380px]";

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">

            {/* BACKGROUND: GPU ACCELERATED VOID */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#120a00_0%,_#000_85%)] opacity-40" />

            <AnimatePresence mode="popLayout">
                {/* PHASE 0: THE COSMIC SINGULARITY */}
                {phase === 'cosmic' && (
                    <motion.div
                        key="cosmic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.1, filter: 'blur(30px)', transition: { duration: 0.8 } }}
                        className="absolute inset-0 flex items-center justify-center z-10"
                    >
                        {/* Singularity Core */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.1, 1], opacity: [0, 1] }}
                            transition={{ duration: 2.5 }}
                            className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_30px_white,0_0_80px_#ff9a00]"
                        />

                        {/* Nebula Whirl */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[350px] h-[350px] md:w-[650px] md:h-[650px] rounded-full opacity-20"
                            style={{
                                background: 'radial-gradient(circle, rgba(255,182,46,0.4) 0%, transparent 70%)',
                                filter: 'blur(35px)',
                                willChange: 'transform'
                            }}
                        />

                        {/* Birth of Sun */}
                        <motion.div
                            layoutId="orange-core"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 2.2, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                            className={`${coreSize} rounded-full`}
                            style={{
                                background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 20%, #ff9a00 50%, #cc7a00 85%, #8a5200 100%)',
                                boxShadow: '0 0 40px rgba(255,154,0,0.2)',
                                willChange: 'transform'
                            }}
                        />
                    </motion.div>
                )}

                {/* PHASE 1: BRAND ORANGE CORE */}
                {phase === 'orange' && (
                    <motion.div
                        key="orange"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        className="absolute inset-0 flex items-center justify-center z-20"
                    >
                        <motion.div
                            layoutId="orange-core"
                            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                            className={`relative ${coreSize}`}
                            style={{ willChange: 'transform' }}
                        >
                            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 20px 60px rgba(255,154,0,0.4)' }} />
                            <motion.div
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="absolute -top-[12%] left-1/2 w-[25%] h-[40%] bg-gradient-to-br from-green-300 to-green-800 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/10 -translate-x-1/2 -rotate-12"
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* PHASE 2: COSMIC EXPLOSION */}
                {phase === 'explosion' && (
                    <motion.div
                        key="explosion"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center z-30"
                    >
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 15, opacity: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute w-[150px] h-[150px] rounded-full bg-white blur-sm" />
                        {explosionParticles.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ x: 0, y: 0, scale: 0 }}
                                animate={{ x: Math.cos(p.angle * Math.PI / 180) * p.distance, y: Math.sin(p.angle * Math.PI / 180) * p.distance, scale: [0, 2.5, 0], opacity: [1, 1, 0] }}
                                transition={{ duration: 0.9, ease: "easeOut" }}
                                className="absolute rounded-full"
                                style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 15px ${p.color}`, willChange: 'transform' }}
                            />
                        ))}
                    </motion.div>
                )}

                {/* PHASE 3: CITRUS RADIATION */}
                {phase === 'radiation' && (
                    <motion.div
                        key="radiation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                        className="absolute inset-0 flex items-center justify-center z-40"
                    >
                        {radiationRays.map((ray) => (
                            <motion.div
                                key={ray.id}
                                initial={{ scaleY: 0, opacity: 0 }}
                                animate={{ scaleY: [0, 1.2, 1], opacity: [0, 0.7, 0] }}
                                transition={{ duration: 1.5, delay: ray.delay, ease: "circOut" }}
                                className="absolute origin-center"
                                style={{ rotate: `${ray.angle}deg`, height: '100vh', width: isMobile ? '16px' : '24px', willChange: 'transform' }}
                            >
                                <div className="w-full h-full" style={{ background: `linear-gradient(to top, transparent, ${ray.color} 50%, transparent)`, filter: 'blur(6px)', opacity: 0.4 }} />
                            </motion.div>
                        ))}
                        {/* THE SPIRIT OF THE CORE PERSISTS THROUGH THE BURST */}
                        <motion.div
                            layoutId="orange-core"
                            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                            className={`${coreSize} rounded-full blur-2xl opacity-20`}
                            style={{ background: '#ff9a00', willChange: 'transform' }}
                        />
                    </motion.div>
                )}

                {/* PHASE 4: THE MERGE TRANSITION - LONGER CROSSFADE */}
                {phase === 'merge' && (
                    <motion.div
                        key="merge"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.6 } }}
                        className="absolute inset-0 flex items-center justify-center z-50"
                    >
                        <motion.div
                            layoutId="orange-core"
                            transition={{ duration: 1.5, ease: "circOut" }}
                            className={`relative ${coreSize} rounded-full`}
                            style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 20px 80px rgba(255,154,0,0.5)', willChange: 'transform' }}
                        />
                    </motion.div>
                )}

                {/* PHASE 5: FINAL BRANDING - REFINED TYPOGRAPHY */}
                {phase === 'splash' && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.8 } }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-60"
                        style={{ willChange: 'opacity' }}
                    >
                        <motion.div
                            layoutId="orange-core"
                            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                            className={`relative w-[180px] h-[180px] md:w-[320px] md:h-[320px] mx-auto mb-8 md:mb-12`}
                            style={{ willChange: 'transform' }}
                        >
                            {/* The glow effect - use transparent to orange instead of white to avoid hard lines */}
                            <div className="absolute inset-[-40%] bg-[radial-gradient(circle_at_center,_rgba(255,154,0,0.3)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

                            <motion.div
                                className="w-full h-full rounded-full relative z-10"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)',
                                    boxShadow: '0 15px 50px rgba(255,154,0,0.3), inset 0 0 20px rgba(255,255,255,0.2)'
                                }}
                            />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute -top-[12%] left-1/2 w-[25%] h-[40%] bg-gradient-to-br from-green-300 to-green-800 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/10 -translate-x-1/2 -rotate-12 z-20"
                            />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
                            <h1 className="text-3xl md:text-8xl font-black text-white tracking-[0.1em] mb-4 md:mb-6 select-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.4)] leading-tight">
                                ALL<span className="text-brand-gold">RANGE</span>
                            </h1>
                            <p className="text-brand-gold text-lg md:text-3xl tracking-[0.2em] md:tracking-[0.4em] font-medium uppercase">
                                樂橙創作工作室
                            </p>
                        </motion.div>
                    </motion.div>
                )}

                {/* PHASE 6: COSMIC COLLAPSE */}
                {phase === 'collapse' && (
                    <motion.div
                        key="collapse"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40"
                    >
                        <motion.div
                            initial={{ scale: 3, opacity: 0 }}
                            animate={{ scale: 0, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "anticipate" }}
                            className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-white rounded-full blur-[60px] flex items-center justify-center"
                            style={{ willChange: 'transform' }}
                        >
                            <div className="relative w-4 h-4 bg-black rounded-full" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
