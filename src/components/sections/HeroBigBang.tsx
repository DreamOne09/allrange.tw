'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'mobius' | 'orange' | 'explosion' | 'brushStrokes' | 'merge' | 'splash'>('mobius');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runSequence = async () => {
            setPhase('mobius');
            await new Promise(r => setTimeout(r, 3500));

            setPhase('orange');
            await new Promise(r => setTimeout(r, 1500));

            setPhase('explosion');
            await new Promise(r => setTimeout(r, 800));

            setPhase('brushStrokes');
            await new Promise(r => setTimeout(r, 2500));

            setPhase('merge');
            await new Promise(r => setTimeout(r, 1500));

            setPhase('splash');
            await new Promise(r => setTimeout(r, 1200));

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
        distance: 100 + Math.random() * 200,
        size: 8 + Math.random() * 15,
        color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const brushStrokes = [
        { from: { x: -400, y: -300 }, to: { x: 0, y: 0 }, angle: 45, color: colors[0], delay: 0 },
        { from: { x: 400, y: -300 }, to: { x: 0, y: 0 }, angle: -45, color: colors[1], delay: 0.1 },
        { from: { x: -400, y: 300 }, to: { x: 0, y: 0 }, angle: -45, color: colors[2], delay: 0.2 },
        { from: { x: 400, y: 300 }, to: { x: 0, y: 0 }, angle: 45, color: colors[3], delay: 0.3 },
        { from: { x: 0, y: -400 }, to: { x: 0, y: 0 }, angle: 0, color: colors[4], delay: 0.15 },
    ];

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">

            {/* PHASE 0: GEOMETRIC MOBIUS STRIP (RIBBON) */}
            {phase === 'mobius' && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-full flex flex-col items-center justify-center"
                >
                    <div className="relative w-[1000px] h-[500px]">
                        <svg viewBox="0 0 800 400" className="w-full h-full" style={{ overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="mobiusMain" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#ff9a00" />
                                    <stop offset="30%" stopColor="#ffd700" />
                                    <stop offset="70%" stopColor="#ffb62e" />
                                    <stop offset="100%" stopColor="#ff6b00" />
                                </linearGradient>
                                <linearGradient id="mobiusShade" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#8a5200" />
                                    <stop offset="50%" stopColor="#cc7a00" />
                                    <stop offset="100%" stopColor="#8a5200" />
                                </linearGradient>
                                <filter id="glowMobius" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="15" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            <motion.g
                                animate={{ rotateY: [0, 10, -10, 0], rotateX: [0, 5, -5, 0] }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
                            >
                                {/* Back Half of the Mobius Strip */}
                                <motion.path
                                    d="M 200 200 C 200 50, 600 350, 600 200"
                                    fill="none"
                                    stroke="url(#mobiusShade)"
                                    strokeWidth="60"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    style={{ opacity: 0.7 }}
                                />

                                {/* Front Half with the half-twist cross-over */}
                                <motion.path
                                    d="M 600 200 C 600 50, 200 350, 200 200"
                                    fill="none"
                                    stroke="url(#mobiusMain)"
                                    strokeWidth="60"
                                    strokeLinecap="round"
                                    strokeDasharray="10, 2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    filter="url(#glowMobius)"
                                />

                                {/* Highlight line to emphasize the edges and twist */}
                                <motion.path
                                    d="M 200 200 C 200 50, 600 350, 600 200 C 600 50, 200 350, 200 200"
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="4"
                                    strokeDasharray="1, 15"
                                    opacity="0.3"
                                    animate={{ strokeDashoffset: -100 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                />

                                {/* THE LEAPING ARROW - 3D PATHING */}
                                <motion.g filter="url(#glowMobius)">
                                    <motion.path
                                        d="M -30 0 L -10 -15 L 30 0 L -10 15 Z"
                                        fill="#fff"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 0.4, repeat: Infinity }}
                                    >
                                        <animateMotion
                                            dur="2.5s"
                                            repeatCount="indefinite"
                                            path="M 200 200 C 200 50, 600 350, 600 200 C 600 50, 200 350, 200 200"
                                            rotate="auto"
                                        />
                                    </motion.path>

                                    {/* Comet Tail following the leaping move */}
                                    {[0, 0.04, 0.08, 0.12, 0.16].map((delay, i) => (
                                        <motion.circle
                                            key={i}
                                            r={12 - i * 2}
                                            fill={i === 0 ? "#fff" : colors[i % colors.length]}
                                            opacity={1 - i * 0.15}
                                        >
                                            <animateMotion
                                                dur="2.5s"
                                                begin={`${delay}s`}
                                                repeatCount="indefinite"
                                                path="M 200 200 C 200 50, 600 350, 600 200 C 600 50, 200 350, 200 200"
                                            />
                                        </motion.circle>
                                    ))}
                                </motion.g>
                            </motion.g>
                        </svg>
                    </div>

                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                    >
                        <h2 className="text-brand-gold text-4xl font-black italic tracking-[1.5em] mb-4">
                            INFINITE <span className="text-white">DESIGN</span>
                        </h2>
                        <div className="flex gap-4 justify-center overflow-hidden">
                            {"MOBUIUS".split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 2 + i * 0.1, type: "spring" }}
                                    className="text-white/40 text-sm tracking-widest font-light"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* PHASE 1: ORANGE APPEARS */}
            {phase === 'orange' && (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="relative w-[350px] h-[350px]"
                >
                    <motion.div
                        className="w-full h-full rounded-full"
                        animate={{
                            boxShadow: [
                                '0 20px 80px rgba(255,154,0,0.6)',
                                '0 30px 100px rgba(255,154,0,0.8)',
                                '0 20px 80px rgba(255,154,0,0.6)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                            background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)'
                        }}
                    >
                        <div className="absolute inset-0 opacity-20 mix-blend-overlay rounded-full" style={{ backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)', backgroundSize: '6px 6px' }} />
                        <div className="absolute top-[20%] left-[30%] w-24 h-24 rounded-full bg-white/40 blur-3xl" />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="absolute -top-10 left-1/2 w-24 h-32 bg-gradient-to-br from-green-400 to-green-700 rounded-tr-[100%] rounded-bl-[100%] border-2 border-green-900 -translate-x-1/2 -rotate-12"
                        style={{ filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.4))', transformOrigin: 'bottom center' }}
                    />
                </motion.div>
            )}

            {/* PHASE 2: EXPLOSION */}
            {phase === 'explosion' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div initial={{ scale: 0, opacity: 1 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 0.5 }} className="absolute w-[300px] h-[300px] rounded-full bg-white" />
                    {explosionParticles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                            animate={{ x: Math.cos(p.angle * Math.PI / 180) * p.distance, y: Math.sin(p.angle * Math.PI / 180) * p.distance, scale: [0, 1.5, 0], opacity: [1, 1, 0] }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute rounded-full"
                            style={{ width: p.size, height: p.size, background: p.color, boxShadow: `0 0 25px ${p.color}` }}
                        />
                    ))}
                    {[0, 0.1, 0.2].map((delay, i) => (
                        <motion.div key={i} initial={{ scale: 0, opacity: 1 }} animate={{ scale: 6, opacity: 0 }} transition={{ duration: 0.8, delay }} className="absolute w-[200px] h-[200px] rounded-full border-4 border-orange-500" />
                    ))}
                </div>
            )}

            {/* PHASE 3: PAINT BRUSH STROKES */}
            {phase === 'brushStrokes' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {brushStrokes.map((stroke, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: stroke.from.x, y: stroke.from.y, scaleX: 0, opacity: 0 }}
                            animate={{ x: stroke.to.x, y: stroke.to.y, scaleX: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: stroke.delay, ease: [0.34, 1.56, 0.64, 1] }}
                            className="absolute"
                            style={{ transformOrigin: 'left center', rotate: `${stroke.angle}deg` }}
                        >
                            <div className="relative" style={{ width: '450px', height: '100px', background: `linear-gradient(90deg, transparent 0%, ${stroke.color}60 20%, ${stroke.color} 50%, ${stroke.color}60 80%, transparent 100%)`, filter: 'blur(3px)', boxShadow: `0 0 50px ${stroke.color}60` }} />
                            {Array.from({ length: 12 }).map((_, j) => (
                                <motion.div
                                    key={`splatter-${j}`}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.7, delay: stroke.delay + 0.3 + j * 0.04 }}
                                    className="absolute rounded-full"
                                    style={{ left: `${80 + j * 35}px`, top: `${Math.random() * 80}px`, width: `${5 + Math.random() * 10}px`, height: `${5 + Math.random() * 10}px`, background: stroke.color, boxShadow: `0 0 15px ${stroke.color}` }}
                                />
                            ))}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* PHASE 4: MERGE */}
            {phase === 'merge' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {colors.map((color, i) => (
                        <motion.div key={i} initial={{ scale: 2, opacity: 0 }} animate={{ scale: 0.3, opacity: 0.9 }} transition={{ duration: 1.2, delay: i * 0.08 }} className="absolute w-[400px] h-[400px] rounded-full" style={{ background: `radial-gradient(circle, ${color}, transparent)`, filter: 'blur(50px)', mixBlendMode: 'screen' }} />
                    ))}
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="relative w-[350px] h-[350px] z-10">
                        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 40px 100px rgba(255,154,0,0.7)' }} />
                    </motion.div>
                </div>
            )}

            {/* PHASE 5: SPLASH & BRANDING */}
            {phase === 'splash' && (
                <div className="absolute w-full h-full flex items-center justify-center text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                        <div className="relative w-[300px] h-[300px] mx-auto mb-16">
                            <motion.div className="w-full h-full rounded-full" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 25px 70px rgba(255,154,0,0.6)' }} />
                            <div className="absolute -top-8 left-1/2 w-20 h-28 bg-gradient-to-br from-green-400 to-green-700 rounded-tr-[100%] rounded-bl-[100%] border-2 border-green-900 -translate-x-1/2 -rotate-12" />
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black text-white tracking-[0.2em] mb-6">
                            ALL<span className="text-brand-gold">RANGE</span>
                        </h1>
                        <p className="text-brand-gold text-2xl md:text-3xl tracking-[0.6em] font-light italic uppercase">
                            Infinite Design • Creative Power
                        </p>
                    </motion.div>
                </div>
            )}

        </div>
    );
}
