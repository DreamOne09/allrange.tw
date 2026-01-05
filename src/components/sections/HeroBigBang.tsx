'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'mobius' | 'orange' | 'explosion' | 'brushStrokes' | 'merge' | 'splash'>('mobius');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runSequence = async () => {
            setPhase('mobius');
            await new Promise(r => setTimeout(r, 6000)); // Longer cinematic duration

            setPhase('orange');
            await new Promise(r => setTimeout(r, 1500));

            setPhase('explosion');
            await new Promise(r => setTimeout(r, 800));

            setPhase('brushStrokes');
            await new Promise(r => setTimeout(r, 2500));

            setPhase('merge');
            await new Promise(r => setTimeout(r, 1500));

            setPhase('splash');
            await new Promise(r => setTimeout(r, 3000));

            setLoopCount(prev => prev + 1);
        };

        runSequence();
    }, [loopCount]);

    const colors = [
        '#ff9a00', '#ffb62e', '#ffd700', '#ff6b00', '#ff8c42',
    ];

    const explosionParticles = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        angle: (i / 45) * 360,
        distance: 130 + Math.random() * 250,
        size: 10 + Math.random() * 18,
        color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const brushStrokes = [
        { from: { x: -600, y: -400 }, to: { x: 0, y: 0 }, angle: 45, color: colors[0], delay: 0 },
        { from: { x: 600, y: -400 }, to: { x: 0, y: 0 }, angle: -45, color: colors[1], delay: 0.1 },
        { from: { x: -600, y: 400 }, to: { x: 0, y: 0 }, angle: -45, color: colors[2], delay: 0.2 },
        { from: { x: 600, y: 400 }, to: { x: 0, y: 0 }, angle: 45, color: colors[3], delay: 0.3 },
        { from: { x: 0, y: -600 }, to: { x: 0, y: 0 }, angle: 0, color: colors[4], delay: 0.15 },
    ];

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">

            {/* PHASE 0: 3D GOLDEN MOBIUS & RACING ORANGE SPIRIT */}
            <AnimatePresence>
                {phase === 'mobius' && (
                    <motion.div
                        key="mobius-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)', transition: { duration: 0.8 } }}
                        className="relative w-full h-full flex flex-col items-center justify-center p-4"
                    >
                        <div className="relative w-full max-w-[1200px] aspect-[2/1] perspective-[2500px]">
                            <motion.div
                                className="w-full h-full"
                                initial={{ rotateX: 25, rotateY: 0 }}
                                animate={{ rotateY: [0, 8, -8, 0], rotateX: [25, 30, 20, 25] }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <svg viewBox="0 0 800 400" className="w-full h-full" style={{ overflow: 'visible' }}>
                                    <defs>
                                        <linearGradient id="goldRibbonFront" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#ffb62e" />
                                            <stop offset="50%" stopColor="#fff" />
                                            <stop offset="100%" stopColor="#ffd700" />
                                        </linearGradient>
                                        <linearGradient id="goldRibbonBack" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#664400" />
                                            <stop offset="50%" stopColor="#aa7700" />
                                            <stop offset="100%" stopColor="#664400" />
                                        </linearGradient>
                                        <filter id="hyperGlow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur stdDeviation="20" result="blur" />
                                            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 1  0 0 0 0 0.8  0 0 0 0 0  0 0 0 18 -7" result="glow" />
                                            <feComposite in="SourceGraphic" in2="glow" operator="over" />
                                        </filter>
                                        <radialGradient id="spiritOrange">
                                            <stop offset="0%" stopColor="#fff" />
                                            <stop offset="40%" stopColor="#ffd700" />
                                            <stop offset="100%" stopColor="#ff6b00" />
                                        </radialGradient>
                                    </defs>

                                    {/* MOBIUS - ADVANCED LAYERED GEOMETRY */}
                                    <g filter="url(#hyperGlow)">
                                        {/* Back Path */}
                                        <motion.path
                                            d="M 150 200 C 150 -50, 400 350, 400 200 C 400 50, 650 450, 650 200"
                                            fill="none"
                                            stroke="url(#goldRibbonBack)"
                                            strokeWidth="70"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                        />

                                        {/* Front Overlapping Path for Twist */}
                                        <motion.path
                                            d="M 650 200 C 650 -50, 400 450, 400 200 C 400 -50, 150 450, 150 200"
                                            fill="none"
                                            stroke="url(#goldRibbonFront)"
                                            strokeWidth="75"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                                        />

                                        {/* Light Streaks following the loop */}
                                        <motion.path
                                            d="M 150 200 C 150 -50, 400 350, 400 200 C 400 50, 650 450, 650 200 C 650 -50, 400 450, 400 200 C 400 -50, 150 450, 150 200"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="3"
                                            strokeDasharray="2, 50"
                                            opacity="0.6"
                                            animate={{ strokeDashoffset: -1000 }}
                                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                        />
                                    </g>

                                    {/* RACING ORANGE SPIRIT - REPLACING ARROW */}
                                    <motion.g filter="url(#hyperGlow)">
                                        <motion.g>
                                            {/* Mini 3D Orange Object */}
                                            <circle r="22" fill="url(#spiritOrange)" />
                                            {/* Leaf */}
                                            <path d="M 0 -22 C 10 -35, 25 -30, 5 -20 Z" fill="#2d5a27" />
                                            {/* Glow Ring */}
                                            <circle r="26" fill="none" stroke="#fff" strokeWidth="2" opacity="0.4" />

                                            <animateMotion
                                                dur="4s"
                                                begin="1s"
                                                path="M 850 200 C 700 -50, 400 450, 400 200 C 400 -50, 100 450, 100 200 C 100 -50, 400 450, 400 200"
                                                rotate="auto"
                                                fill="freeze"
                                                calcMode="spline"
                                                keySplines="0.4, 0, 0.2, 1; 0.4, 0, 0.2, 1; 0.4, 0, 0.2, 1"
                                                keyTimes="0; 0.35; 0.7; 1"
                                            />

                                            {/* Dynamic Trail of miniature oranges/particles */}
                                            {[0, 0.05, 0.1, 0.15, 0.2].map((delay, i) => (
                                                <motion.circle
                                                    key={i}
                                                    r={18 - i * 3}
                                                    fill={colors[i % colors.length]}
                                                    opacity={0.8 - i * 0.15}
                                                >
                                                    <animateMotion
                                                        dur="4s"
                                                        begin={`${1 + delay}s`}
                                                        path="M 850 200 C 700 -50, 400 450, 400 200 C 400 -50, 100 450, 100 200 C 100 -50, 400 450, 400 200"
                                                        fill="freeze"
                                                    />
                                                </motion.circle>
                                            ))}
                                        </motion.g>

                                        {/* IMPACT FLASH */}
                                        <motion.circle
                                            cx="400" cy="200" r="0"
                                            fill="#fff"
                                            animate={{ r: [0, 300, 0], opacity: [0, 1, 0] }}
                                            transition={{ delay: 5.5, duration: 0.8 }}
                                        />
                                    </motion.g>
                                </svg>
                            </motion.div>
                        </div>

                        <motion.div
                            className="mt-16 text-center"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 3 }}
                        >
                            <h2 className="text-white text-3xl md:text-6xl font-black tracking-[0.8em] md:tracking-[1.5em] uppercase">
                                SPIRIT OF <span className="text-brand-orange">ORANGE</span>
                            </h2>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PHASE 1: BRAND ORANGE EMERGES */}
            {phase === 'orange' && (
                <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: 180 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                    className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
                >
                    <motion.div
                        className="w-full h-full rounded-full"
                        animate={{
                            boxShadow: [
                                '0 40px 100px rgba(255,154,0,0.5)',
                                '0 60px 150px rgba(255,154,0,0.8)',
                                '0 40px 100px rgba(255,154,0,0.5)'
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{
                            background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)'
                        }}
                    >
                        <div className="absolute inset-0 opacity-25 mix-blend-overlay rounded-full" style={{ backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)', backgroundSize: '7px 7px' }} />
                        <div className="absolute top-[20%] left-[30%] w-32 h-32 rounded-full bg-white/40 blur-3xl" />
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -top-16 left-1/2 w-24 h-36 md:w-32 md:h-48 bg-gradient-to-br from-green-400 to-green-800 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/20 -translate-x-1/2 -rotate-15"
                        style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
                    />
                </motion.div>
            )}

            {/* PHASE 2: EXPLOSION (Same as before but refined) */}
            {phase === 'explosion' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 10, opacity: 0 }} transition={{ duration: 0.8 }} className="absolute w-[300px] h-[300px] rounded-full bg-brand-gold" />
                    {explosionParticles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, scale: 0 }}
                            animate={{ x: Math.cos(p.angle * Math.PI / 180) * p.distance, y: Math.sin(p.angle * Math.PI / 180) * p.distance, scale: [0, 2.5, 0], opacity: [1, 1, 0] }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute rounded-full"
                            style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 40px ${p.color}` }}
                        />
                    ))}
                </div>
            )}

            {/* PHASE 3: PAINT BRUSH STROKES (Responsive) */}
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
                            <div className="relative h-[80px] md:h-[150px]" style={{ width: '100vw', maxWidth: '600px', background: `linear-gradient(90deg, transparent 0%, ${stroke.color} 50%, transparent 100%)`, filter: 'blur(3px)', borderRadius: '100px', opacity: 0.9 }} />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* PHASE 4: THE MERGE */}
            {phase === 'merge' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {colors.map((color, i) => (
                        <motion.div key={i} initial={{ scale: 3, opacity: 0 }} animate={{ scale: 0.1, opacity: 1 }} transition={{ duration: 1.8, delay: i * 0.1 }} className="absolute w-[600px] h-[600px] rounded-full shadow-2xl" style={{ background: color, filter: 'blur(80px)', mixBlendMode: 'screen' }} />
                    ))}
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1, delay: 1 }} className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] z-10">
                        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 50px 150px rgba(255,154,0,0.8)' }} />
                    </motion.div>
                </div>
            )}

            {/* PHASE 5: FINAL BRANDING */}
            {phase === 'splash' && (
                <div className="absolute w-full h-full flex items-center justify-center text-center px-6">
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
                        <div className="relative w-[220px] h-[220px] md:w-[380px] md:h-[380px] mx-auto mb-16">
                            <motion.div className="w-full h-full rounded-full" animate={{ y: [0, -20, 0], scale: [1, 1.03, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 40px 120px rgba(255,154,0,0.6)' }} />
                            <div className="absolute -top-10 md:-top-16 left-1/2 w-20 h-32 md:w-32 md:h-48 bg-gradient-to-br from-green-400 to-green-800 rounded-tr-[100%] rounded-bl-[100%] border-4 border-black/10 -translate-x-1/2 -rotate-12" />
                        </div>
                        <h1 className="text-6xl md:text-[12rem] font-black text-white tracking-widest md:tracking-[0.1em] mb-10 select-none drop-shadow-2xl">
                            ALL<span className="text-brand-gold">RANGE</span>
                        </h1>
                        <div className="space-y-4">
                            <p className="text-brand-gold text-2xl md:text-5xl tracking-[0.5em] md:tracking-[1em] font-light italic uppercase">
                                Infinite Design
                            </p>
                            <p className="text-white/30 text-xs md:text-lg tracking-[1.5em] font-light uppercase">
                                Space • Brand • Exhibition
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}

        </div>
    );
}
