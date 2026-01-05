'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'mobius' | 'orange' | 'explosion' | 'brushStrokes' | 'merge' | 'splash'>('mobius');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runSequence = async () => {
            // 0. Mobius intro
            setPhase('mobius');
            await new Promise(r => setTimeout(r, 2500));

            // 1. Orange appears (transformed from Mobius)
            setPhase('orange');
            await new Promise(r => setTimeout(r, 1500));

            // 2. Explosion
            setPhase('explosion');
            await new Promise(r => setTimeout(r, 800));

            // 3. Paint brush strokes 
            setPhase('brushStrokes');
            await new Promise(r => setTimeout(r, 2500));

            // 4. Merge into orange
            setPhase('merge');
            await new Promise(r => setTimeout(r, 1500));

            // 5. Color splash
            setPhase('splash');
            await new Promise(r => setTimeout(r, 1200));

            // Loop back to Mobius
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

            {/* PHASE 0: MOBIUS STRIP */}
            {phase === 'mobius' && (
                <motion.div
                    initial={{ scale: 0, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1.5, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-[800px] h-[500px] flex items-center justify-center p-20"
                >
                    <svg width="800" height="400" viewBox="0 0 400 200" style={{ overflow: 'visible' }}>
                        <defs>
                            <linearGradient id="mobiusGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ff9a00" />
                                <stop offset="50%" stopColor="#ffd700" />
                                <stop offset="100%" stopColor="#ff6b00" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Mobius Strip Path - Twisted Infinity */}
                        <motion.path
                            d="M 100 100 C 100 0, 300 200, 300 100 C 300 0, 100 200, 100 100"
                            fill="none"
                            stroke="url(#mobiusGrad)"
                            strokeWidth="35"
                            strokeLinecap="round"
                            filter="url(#glow)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: [0, 1],
                                opacity: 1,
                                rotate: [0, 2, -2, 0]
                            }}
                            transition={{
                                pathLength: { duration: 2, ease: "easeInOut" },
                                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                            }}
                        />

                        {/* Leaping Arrow Effect */}
                        <motion.g filter="url(#glow)">
                            {/* The "Arrow" Head */}
                            <motion.path
                                d="M -15 0 L -5 -8 L 15 0 L -5 8 Z"
                                fill="#ffffff"
                                style={{ transformOrigin: 'center' }}
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path="M 100 100 C 100 0, 300 200, 300 100 C 300 0, 100 200, 100 100"
                                    rotate="auto"
                                />
                            </motion.path>

                            {/* Dynamic Trail / Sparkles to give "leaping" feel */}
                            {[0, 0.05, 0.1, 0.15].map((delay, i) => (
                                <motion.circle
                                    key={i}
                                    r={8 - i * 1.5}
                                    fill={i === 0 ? "#fff" : "#ffb62e"}
                                    opacity={1 - i * 0.2}
                                >
                                    <animateMotion
                                        dur="2s"
                                        begin={`${delay}s`}
                                        repeatCount="indefinite"
                                        path="M 100 100 C 100 0, 300 200, 300 100 C 300 0, 100 200, 100 100"
                                    />
                                </motion.circle>
                            ))}
                        </motion.g>

                        {/* Second layer for 3D overlap effect */}
                        <motion.path
                            d="M 200 100 C 230 80, 270 80, 300 100"
                            fill="none"
                            stroke="#ffb62e"
                            strokeWidth="10"
                            strokeLinecap="round"
                            opacity="0.5"
                            animate={{ opacity: [0.2, 0.6, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </svg>

                    <motion.div
                        className="absolute text-brand-gold text-2xl tracking-[1em] mt-80 font-black italic"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        INFINITE DESIGN
                    </motion.div>
                </motion.div>
            )}

            {/* PHASE 1: ORANGE APPEARS */}
            {phase === 'orange' && (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                    }}
                    className="relative w-[300px] h-[300px]"
                >
                    <motion.div
                        className="w-full h-full rounded-full"
                        animate={{
                            boxShadow: [
                                '0 20px 60px rgba(255,154,0,0.6)',
                                '0 25px 80px rgba(255,154,0,0.8)',
                                '0 20px 60px rgba(255,154,0,0.6)'
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                            background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)'
                        }}
                    >
                        <div
                            className="absolute inset-0 opacity-20 mix-blend-overlay rounded-full"
                            style={{
                                backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)',
                                backgroundSize: '6px 6px'
                            }}
                        />
                        <div className="absolute top-[20%] left-[30%] w-20 h-20 rounded-full bg-white/40 blur-2xl" />
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="absolute -top-8 left-1/2 w-20 h-28 bg-gradient-to-br from-green-400 to-green-700 rounded-tr-[100%] rounded-bl-[100%] border-2 border-green-900"
                        style={{
                            filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))',
                            transform: 'translateX(-50%) rotateZ(-12deg)',
                            transformOrigin: 'bottom center'
                        }}
                    />
                </motion.div>
            )}

            {/* PHASE 2: EXPLOSION */}
            {phase === 'explosion' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute w-[300px] h-[300px] rounded-full bg-white"
                    />

                    {explosionParticles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                            animate={{
                                x: Math.cos(p.angle * Math.PI / 180) * p.distance,
                                y: Math.sin(p.angle * Math.PI / 180) * p.distance,
                                scale: [0, 1.5, 0],
                                opacity: [1, 1, 0]
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute rounded-full"
                            style={{
                                width: p.size,
                                height: p.size,
                                background: p.color,
                                boxShadow: `0 0 20px ${p.color}`
                            }}
                        />
                    ))}

                    {[0, 0.15, 0.3].map((delay, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 5, opacity: 0 }}
                            transition={{ duration: 0.8, delay }}
                            className="absolute w-[200px] h-[200px] rounded-full border-4 border-orange-500"
                        />
                    ))}
                </div>
            )}

            {/* PHASE 3: PAINT BRUSH STROKES */}
            {phase === 'brushStrokes' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {brushStrokes.map((stroke, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: stroke.from.x,
                                y: stroke.from.y,
                                scaleX: 0,
                                opacity: 0
                            }}
                            animate={{
                                x: stroke.to.x,
                                y: stroke.to.y,
                                scaleX: 1,
                                opacity: 1
                            }}
                            transition={{
                                duration: 1.2,
                                delay: stroke.delay,
                                ease: [0.34, 1.56, 0.64, 1]
                            }}
                            className="absolute"
                            style={{
                                transformOrigin: 'left center',
                                rotate: `${stroke.angle}deg`
                            }}
                        >
                            <div
                                style={{
                                    width: '400px',
                                    height: '80px',
                                    background: `linear-gradient(90deg, 
                                        transparent 0%, 
                                        ${stroke.color}40 10%, 
                                        ${stroke.color} 50%, 
                                        ${stroke.color}40 90%, 
                                        transparent 100%)`,
                                    filter: 'blur(2px)',
                                    boxShadow: `0 0 40px ${stroke.color}80`
                                }}
                            />
                            {Array.from({ length: 10 }).map((_, j) => (
                                <motion.div
                                    key={`splatter-${j}`}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.8, delay: stroke.delay + 0.4 + j * 0.05 }}
                                    className="absolute rounded-full"
                                    style={{
                                        left: `${100 + j * 40}px`,
                                        top: `${Math.random() * 60}px`,
                                        width: `${4 + Math.random() * 8}px`,
                                        height: `${4 + Math.random() * 8}px`,
                                        background: stroke.color
                                    }}
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
                        <motion.div
                            key={i}
                            initial={{ scale: 1.5, opacity: 0 }}
                            animate={{ scale: 0.2, opacity: 0.8 }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                            className="absolute w-[300px] h-[300px] rounded-full"
                            style={{
                                background: `radial-gradient(circle, ${color}, transparent)`,
                                filter: 'blur(40px)',
                                mixBlendMode: 'screen'
                            }}
                        />
                    ))}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="relative w-[300px] h-[300px] z-10"
                    >
                        <div
                            className="w-full h-full rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)',
                                boxShadow: '0 30px 80px rgba(255,154,0,0.7)'
                            }}
                        />
                    </motion.div>
                </div>
            )}

            {/* PHASE 5: SPLASH */}
            {phase === 'splash' && (
                <div className="absolute w-full h-full flex items-center justify-center text-center">
                    <motion.div initial={{ scale: 1 }}>
                        <div className="relative w-[300px] h-[300px] mx-auto mb-16">
                            <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)', boxShadow: '0 20px 60px rgba(255,154,0,0.6)' }} />
                            <div className="absolute -top-8 left-1/2 w-20 h-28 bg-gradient-to-br from-green-400 to-green-700 rounded-tr-[100%] rounded-bl-[100%] border-2 border-green-900 -translate-x-1/2 -rotate-12" />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-6xl md:text-8xl font-black text-white tracking-widest mb-4">ALLRANGE</h1>
                            <p className="text-brand-gold text-xl md:text-2xl tracking-[0.5em] font-light italic">設計無界 • 創意無限</p>
                        </motion.div>
                    </motion.div>
                </div>
            )}

        </div>
    );
}
