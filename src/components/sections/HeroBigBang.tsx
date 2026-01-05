'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'mobius' | 'orange' | 'explosion' | 'brushStrokes' | 'merge' | 'splash'>('mobius');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runSequence = async () => {
            setPhase('mobius');
            await new Promise(r => setTimeout(r, 4500)); // Time for arrow to fly and hit

            setPhase('orange');
            await new Promise(r => setTimeout(r, 1500));

            setPhase('explosion');
            await new Promise(r => setTimeout(r, 800));

            setPhase('brushStrokes');
            await new Promise(r => setTimeout(r, 2500));

            setPhase('merge');
            await new Promise(r => setTimeout(r, 1500));

            setPhase('splash');
            await new Promise(r => setTimeout(r, 3000)); // Show text longer

            setLoopCount(prev => prev + 1);
        };

        runSequence();
    }, [loopCount]);

    const colors = [
        '#ff9a00', // Primary orange
        '#ffb62e', // Light orange
        '#ffd700', // Gold
        '#ff6b00', // Dark orange
        '#ff8c42', // Mid orange
    ];

    const explosionParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        angle: (i / 40) * 360,
        distance: 120 + Math.random() * 220,
        size: 8 + Math.random() * 15,
        color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const brushStrokes = [
        { from: { x: -500, y: -300 }, to: { x: 0, y: 0 }, angle: 45, color: colors[0], delay: 0 },
        { from: { x: 500, y: -300 }, to: { x: 0, y: 0 }, angle: -45, color: colors[1], delay: 0.1 },
        { from: { x: -500, y: 300 }, to: { x: 0, y: 0 }, angle: -45, color: colors[2], delay: 0.2 },
        { from: { x: 500, y: 300 }, to: { x: 0, y: 0 }, angle: 45, color: colors[3], delay: 0.3 },
        { from: { x: 0, y: -500 }, to: { x: 0, y: 0 }, angle: 0, color: colors[4], delay: 0.15 },
    ];

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">

            {/* PHASE 0: 3D REALISTIC MOBIUS & LEAPING ARROW */}
            <AnimatePresence>
                {phase === 'mobius' && (
                    <motion.div
                        key="mobius-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.5 } }}
                        className="relative w-full h-full flex flex-col items-center justify-center p-4"
                    >
                        {/* 3D Container - Scale for Mobile */}
                        <div className="relative w-full max-w-[1000px] aspect-[2/1] perspective-[2000px]">
                            <motion.div
                                className="w-full h-full"
                                initial={{ rotateX: 20, rotateY: 0 }}
                                animate={{ rotateY: [0, 5, -5, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <svg viewBox="0 0 800 400" className="w-full h-full" style={{ overflow: 'visible' }}>
                                    <defs>
                                        <linearGradient id="ribbonFront" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#ff9a00" />
                                            <stop offset="50%" stopColor="#ffd700" />
                                            <stop offset="100%" stopColor="#ffb62e" />
                                        </linearGradient>
                                        <linearGradient id="ribbonBack" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#8a5200" />
                                            <stop offset="50%" stopColor="#cc7a00" />
                                            <stop offset="100%" stopColor="#8a5200" />
                                        </linearGradient>
                                        <filter id="beautyGlow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur stdDeviation="10" result="blur" />
                                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                        </filter>
                                        <radialGradient id="arrowShade">
                                            <stop offset="0%" stopColor="#fff" />
                                            <stop offset="100%" stopColor="#ffb62e" />
                                        </radialGradient>
                                    </defs>

                                    {/* MOBIUS GEOMETRY - MULTI-LAYERED FOR DEPTH */}
                                    <g filter="url(#beautyGlow)">
                                        {/* Back loops - Slightly darker */}
                                        <motion.path
                                            d="M 150 200 C 150 0, 400 300, 400 200"
                                            fill="none"
                                            stroke="url(#ribbonBack)"
                                            strokeWidth="60"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                        <motion.path
                                            d="M 400 200 C 400 100, 650 400, 650 200"
                                            fill="none"
                                            stroke="url(#ribbonBack)"
                                            strokeWidth="60"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                        />

                                        {/* Front Section - Crossing Over to create the Mobius twist */}
                                        <motion.path
                                            d="M 400 200 C 400 300, 150 0, 150 200"
                                            fill="none"
                                            stroke="url(#ribbonFront)"
                                            strokeWidth="65"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
                                        />
                                        <motion.path
                                            d="M 650 200 C 650 0, 400 300, 400 200"
                                            fill="none"
                                            stroke="url(#ribbonFront)"
                                            strokeWidth="65"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
                                        />

                                        {/* Edge Highlights */}
                                        <motion.path
                                            d="M 150 200 C 150 0, 400 300, 400 200 C 400 100, 650 400, 650 200 C 650 0, 400 300, 400 200 C 400 300, 150 0, 150 200"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeDasharray="4, 10"
                                            opacity="0.3"
                                            animate={{ strokeDashoffset: -200 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        />
                                    </g>

                                    {/* LEAPING ARROW - FROM RIGHT TO LEFT, LEADING THE EYE */}
                                    <motion.g
                                        initial={{ x: 1000, y: 100, opacity: 0 }}
                                        animate={{ x: 0, y: 0, opacity: 1 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    >
                                        <motion.g filter="url(#beautyGlow)">
                                            {/* THE 3D ARROW BODY */}
                                            <motion.g>
                                                {/* Shadow for depth */}
                                                <motion.path
                                                    d="M -35 5 L -10 -18 L 35 5 L -10 22 Z"
                                                    fill="black"
                                                    opacity="0.2"
                                                    style={{ transform: 'translate(4px, 4px)' }}
                                                />
                                                {/* Main Shaded Arrow */}
                                                <motion.path
                                                    d="M -35 0 L -10 -20 L 35 0 L -10 20 Z"
                                                    fill="url(#arrowShade)"
                                                    animate={{ scale: [1, 1.15, 1], rotate: [0, 2, -2, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity }}
                                                />
                                                {/* Top Glow Edge */}
                                                <motion.path
                                                    d="M -30 -2 L -10 -15 L 20 -2"
                                                    fill="none"
                                                    stroke="white"
                                                    strokeWidth="3"
                                                    opacity="0.8"
                                                />
                                            </motion.g>

                                            <animateMotion
                                                dur="3.5s"
                                                begin="1s"
                                                keyPoints="0;0.5;1"
                                                keyTimes="0;0.6;1"
                                                calcMode="spline"
                                                keySplines="0.42, 0, 0.58, 1; 0.42, 0, 0.58, 1"
                                                path="M 750 200 C 650 0, 400 300, 400 200 C 400 100, 150 400, 150 200 C 150 0, 400 300, 400 200"
                                                rotate="auto"
                                                fill="freeze"
                                            />

                                            {/* Comet Trail */}
                                            {[0, 0.03, 0.06, 0.09, 0.12].map((delay, i) => (
                                                <motion.circle
                                                    key={i}
                                                    r={15 - i * 2.5}
                                                    fill={i === 0 ? "#fff" : colors[i % colors.length]}
                                                    opacity={1 - i * 0.18}
                                                >
                                                    <animateMotion
                                                        dur="3.5s"
                                                        begin={`${1 + delay}s`}
                                                        path="M 750 200 C 650 0, 400 300, 400 200 C 400 100, 150 400, 150 200 C 150 0, 400 300, 400 200"
                                                        fill="freeze"
                                                    />
                                                </motion.circle>
                                            ))}

                                            {/* Exploding sparks on impact (end of path) */}
                                            <motion.g
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ delay: 4.3, duration: 0.2 }}
                                            >
                                                <circle cx="400" cy="200" r="100" fill="white" />
                                            </motion.g>
                                        </motion.g>
                                    </motion.g>
                                </svg>
                            </motion.div>
                        </div>

                        <motion.div
                            className="mt-6 md:mt-12 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2 }}
                        >
                            <h2 className="text-brand-gold text-2xl md:text-5xl font-black italic tracking-[0.6em] md:tracking-[1.2em] uppercase">
                                Infinite <span className="text-white">Flow</span>
                            </h2>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PHASE 1: ORANGE EMERGES FROM EXPLOSION */}
            {phase === 'orange' && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 150, damping: 10 }}
                    className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px]"
                >
                    <motion.div
                        className="w-full h-full rounded-full"
                        animate={{
                            boxShadow: [
                                '0 30px 90px rgba(255,154,0,0.6)',
                                '0 40px 120px rgba(255,154,0,0.9)',
                                '0 30px 90px rgba(255,154,0,0.6)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                            background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)'
                        }}
                    >
                        <div className="absolute inset-0 opacity-20 mix-blend-overlay rounded-full" style={{ backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)', backgroundSize: '6px 6px' }} />
                        <div className="absolute top-[20%] left-[30%] w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/40 blur-3xl" />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0, rotate: 30 }}
                        animate={{ scale: 1, rotate: -12 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="absolute -top-10 md:-top-12 left-1/2 w-20 h-28 md:w-28 md:h-36 bg-gradient-to-br from-green-400 to-green-700 rounded-tr-[100%] rounded-bl-[100%] border-2 border-green-900 -translate-x-1/2"
                        style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))', transformOrigin: 'bottom center' }}
                    />
                </motion.div>
            )}

            {/* PHASE 2: BIG BANG EXPLOSION */}
            {phase === 'explosion' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div initial={{ scale: 0, opacity: 1 }} animate={{ scale: 5, opacity: 0 }} transition={{ duration: 0.6 }} className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-white" />
                    {explosionParticles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                            animate={{ x: Math.cos(p.angle * Math.PI / 180) * p.distance, y: Math.sin(p.angle * Math.PI / 180) * p.distance, scale: [0, 2, 0], opacity: [1, 1, 0] }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="absolute rounded-full"
                            style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 30px ${p.color}` }}
                        />
                    ))}
                    {[0, 0.1, 0.2, 0.3].map((delay, i) => (
                        <motion.div key={i} initial={{ scale: 0, opacity: 1 }} animate={{ scale: 8, opacity: 0 }} transition={{ duration: 1, delay }} className="absolute w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full border-[6px] border-orange-500/50" />
                    ))}
                </div>
            )}

            {/* PHASE 3: THE BRUSH STROKES - FROM 5 DIRECTIONS */}
            {phase === 'brushStrokes' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {brushStrokes.map((stroke, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: stroke.from.x, y: stroke.from.y, scaleX: 0, opacity: 0 }}
                            animate={{ x: stroke.to.x, y: stroke.to.y, scaleX: 1, opacity: 1 }}
                            transition={{ duration: 1.2, delay: stroke.delay, ease: [0.34, 1.56, 0.64, 1] }}
                            className="absolute"
                            style={{ transformOrigin: 'left center', rotate: `${stroke.angle}deg` }}
                        >
                            <div className="relative h-[80px] md:h-[120px]" style={{ width: '100vw', maxWidth: '500px', background: `linear-gradient(90deg, transparent 0%, ${stroke.color}80 20%, ${stroke.color} 50%, ${stroke.color}80 80%, transparent 100%)`, filter: 'blur(4px)', boxShadow: `0 0 60px ${stroke.color}40`, borderRadius: '60px' }} />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* PHASE 4: THE MERGE */}
            {phase === 'merge' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {colors.map((color, i) => (
                        <motion.div key={i} initial={{ scale: 2.5, opacity: 0 }} animate={{ scale: 0.2, opacity: 1 }} transition={{ duration: 1.5, delay: i * 0.1, ease: "anticipate" }} className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full" style={{ background: `radial-gradient(circle, ${color}, transparent)`, filter: 'blur(60px)', mixBlendMode: 'screen' }} />
                    ))}
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] z-10">
                        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 40px 120px rgba(255,154,0,0.8)' }} />
                    </motion.div>
                </div>
            )}

            {/* PHASE 5: FINAL BRANDING & SPLASH */}
            {phase === 'splash' && (
                <div className="absolute w-full h-full flex items-center justify-center text-center px-4">
                    <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
                        <div className="relative w-[200px] h-[200px] md:w-[320px] md:h-[320px] mx-auto mb-12 md:mb-20">
                            <motion.div className="w-full h-full rounded-full" animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 20px 70px rgba(255,154,0,0.7)' }} />
                            <div className="absolute -top-6 md:-top-10 left-1/2 w-16 h-24 md:w-24 md:h-32 bg-gradient-to-br from-green-400 to-green-700 rounded-tr-[100%] rounded-bl-[100%] border-2 border-green-900 -translate-x-1/2 -rotate-12" />
                        </div>
                        <h1 className="text-5xl md:text-[10rem] font-black text-white tracking-[0.1em] md:tracking-[0.2em] mb-4 md:mb-8 select-none">
                            ALL<span className="text-brand-gold">RANGE</span>
                        </h1>
                        <div className="flex flex-col gap-2 md:gap-4">
                            <p className="text-brand-gold text-lg md:text-4xl tracking-[0.4em] md:tracking-[0.8em] font-light italic uppercase">
                                Infinite Design
                            </p>
                            <p className="text-white/40 text-[10px] md:text-sm tracking-[0.8em] md:tracking-[1.5em] font-light uppercase">
                                Creative Dynamics • Space Mastery
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}

        </div>
    );
}
