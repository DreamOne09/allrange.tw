'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'mobius' | 'orange' | 'explosion' | 'brushStrokes' | 'merge' | 'splash'>('mobius');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runSequence = async () => {
            setPhase('mobius');
            await new Promise(r => setTimeout(r, 7000)); // Cinematic Mobius time

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

    // SVG Mobius Path - More stylized like the user screenshot
    const mainPath = "M 150 200 C 150 50, 400 350, 400 200 C 400 50, 650 350, 650 200 C 650 50, 400 350, 400 200 C 400 50, 150 350, 150 200";

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">

            {/* PHASE 0: 3D ETERNAL RIBBON & MINI ORANGE SPIRIT */}
            <AnimatePresence mode="wait">
                {phase === 'mobius' && (
                    <motion.div
                        key="mobius-hero"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.4, filter: 'brightness(2) blur(10px)', transition: { duration: 0.8 } }}
                        className="relative w-full h-full flex flex-col items-center justify-center p-4"
                    >
                        <div className="relative w-full max-w-[1200px] aspect-[2/1] perspective-[3000px]">
                            <motion.div
                                className="w-full h-full"
                                animate={{
                                    rotateX: [20, 25, 15, 20],
                                    rotateY: [0, 5, -5, 0]
                                }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <svg viewBox="0 0 800 400" className="w-full h-full" style={{ overflow: 'visible' }}>
                                    <defs>
                                        <linearGradient id="glowRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#ffb62e" />
                                            <stop offset="30%" stopColor="#fff" />
                                            <stop offset="50%" stopColor="#ffd700" />
                                            <stop offset="70%" stopColor="#ffb62e" />
                                            <stop offset="100%" stopColor="#ff9a00" />
                                        </linearGradient>
                                        <linearGradient id="shadeRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#8a5200" />
                                            <stop offset="50%" stopColor="#cc7a00" />
                                            <stop offset="100%" stopColor="#8a5200" />
                                        </linearGradient>
                                        <filter id="ribbonGlow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur stdDeviation="15" result="blur" />
                                            <feColorMatrix in="blur" type="matrix" values="0 0 0 0 1  0 0 0 0 0.8  0 0 0 0 0  0 0 0 15 -5" result="glow" />
                                            <feComposite in="SourceGraphic" in2="glow" operator="over" />
                                        </filter>
                                        <radialGradient id="spiritOrangeGrad">
                                            <stop offset="0%" stopColor="#fff" />
                                            <stop offset="40%" stopColor="#ffd700" />
                                            <stop offset="100%" stopColor="#ff6b00" />
                                        </radialGradient>
                                    </defs>

                                    {/* MOBIUS GEOMETRY - HEAVILY LAYERED FOR EXTREME DEPTH */}
                                    <g filter="url(#ribbonGlow)">
                                        {/* 1. Underlying Base shadow */}
                                        <motion.path
                                            d={mainPath}
                                            fill="none"
                                            stroke="#000"
                                            strokeWidth="75"
                                            strokeLinecap="round"
                                            opacity="0.3"
                                            style={{ transform: 'translate(10px, 10px)' }}
                                        />

                                        {/* 2. Darker Inner Segment (Back side) */}
                                        <motion.path
                                            d="M 150 200 C 150 50, 400 350, 400 200 C 400 50, 650 350, 650 200"
                                            fill="none"
                                            stroke="url(#shadeRibbon)"
                                            strokeWidth="70"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                        />

                                        {/* 3. Brighter Outer Segment (Front side - Twist point) */}
                                        <motion.path
                                            d="M 650 200 C 650 50, 400 350, 400 200 C 400 50, 150 350, 150 200"
                                            fill="none"
                                            stroke="url(#glowRibbon)"
                                            strokeWidth="70"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                                        />

                                        {/* 4. Glassy Edge Highlight */}
                                        <motion.path
                                            d={mainPath}
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="3"
                                            opacity="0.4"
                                            strokeDasharray="1, 20"
                                            animate={{ strokeDashoffset: -500 }}
                                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        />
                                    </g>

                                    {/* MINI ORANGE SPIRIT - SMOOTH CONTINUOUS FLOW */}
                                    <motion.g filter="url(#ribbonGlow)">
                                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                                            {/* MINI ORANGE OBJECT */}
                                            <circle r="22" fill="url(#spiritOrangeGrad)" />
                                            <path d="M 0 -22 C 8 -30, 20 -28, 5 -18 Z" fill="#2d5a27" />
                                            {/* Pulse Aura */}
                                            <circle r="26" fill="white" opacity="0.1">
                                                <animate attributeName="r" values="26;32;26" dur="0.8s" repeatCount="indefinite" />
                                                <animate attributeName="opacity" values="0.2;0;0.2" dur="0.8s" repeatCount="indefinite" />
                                            </circle>

                                            <animateMotion
                                                dur="4.5s"
                                                repeatCount="indefinite"
                                                path={mainPath}
                                                rotate="auto"
                                                calcMode="spline"
                                                keySplines="0.4, 0, 0.2, 1; 0.4, 0, 0.2, 1; 0.4, 0, 0.2, 1; 0.4, 0, 0.2, 1"
                                                keyTimes="0; 0.25; 0.5; 0.75; 1"
                                            />

                                            {/* Trail of Light/Juice Drops */}
                                            {[0, 0.08, 0.16, 0.24, 0.32].map((delay, i) => (
                                                <motion.circle
                                                    key={i}
                                                    r={18 - i * 3.5}
                                                    fill={colors[i % colors.length]}
                                                    opacity={0.7 - i * 0.12}
                                                >
                                                    <animateMotion
                                                        dur="4.5s"
                                                        begin={`${delay}s`}
                                                        repeatCount="indefinite"
                                                        path={mainPath}
                                                    />
                                                </motion.circle>
                                            ))}
                                        </motion.g>

                                        {/* FINAL IMPACT SPLASH (Centered at twist point) */}
                                        <motion.circle
                                            cx="400" cy="200" r="0"
                                            fill="#fff"
                                            animate={{ r: [0, 500, 0], opacity: [0, 1, 0] }}
                                            transition={{ delay: 6.2, duration: 0.8 }}
                                        />
                                    </motion.g>
                                </svg>
                            </motion.div>
                        </div>

                        <motion.div
                            className="mt-16 text-center"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5 }}
                        >
                            <h2 className="text-white text-3xl md:text-7xl font-black tracking-[1em] md:tracking-[1.5em] uppercase drop-shadow-lg">
                                Spirit of <span className="text-brand-gold italic">Orange</span>
                            </h2>
                            <p className="text-white/30 text-xs md:text-sm tracking-[0.8em] font-light mt-4 uppercase">
                                Eternal Creativity • Infinite Dynamics
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* PHASE 1: BRAND ORANGE EMERGES (From the center of ribbon) */}
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

            {/* PHASE 2: BIG BANG EXPLOSION */}
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
