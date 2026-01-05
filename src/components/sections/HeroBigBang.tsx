'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'splash' | 'fish' | 'transform' | 'rocket' | 'explosion' | 'branding'>('splash');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runStory = async () => {
            setPhase('splash');
            await new Promise(r => setTimeout(r, 1200));

            setPhase('fish');
            await new Promise(r => setTimeout(r, 3500));

            setPhase('transform');
            await new Promise(r => setTimeout(r, 1500));

            setPhase('rocket');
            await new Promise(r => setTimeout(r, 3000));

            setPhase('explosion');
            await new Promise(r => setTimeout(r, 1000));

            setPhase('branding');
            await new Promise(r => setTimeout(r, 3000));

            setLoopCount(prev => prev + 1);
        };

        runStory();
    }, [loopCount]);

    const splashParticles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        angle: (i / 20) * 360,
        distance: 80 + Math.random() * 120,
        size: 15 + Math.random() * 25,
    }));

    const explosionParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        angle: (i / 40) * 360,
        distance: 100 + Math.random() * 200,
        size: 8 + Math.random() * 15,
    }));

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">

            {/* SPLASH */}
            {phase === 'splash' && (
                <>
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.3, 0] }}
                        transition={{ duration: 1.2, times: [0, 0.6, 1] }}
                        className="absolute w-[200px] h-[200px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)',
                            boxShadow: '0 20px 60px rgba(255,154,0,0.6)'
                        }}
                    />

                    {splashParticles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                            animate={{
                                x: Math.cos(p.angle * Math.PI / 180) * p.distance,
                                y: Math.sin(p.angle * Math.PI / 180) * p.distance,
                                scale: [0, 1, 0.8],
                                opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="absolute rounded-full"
                            style={{
                                width: p.size,
                                height: p.size,
                                background: 'radial-gradient(circle, #ff9a00, #ffb62e)',
                                boxShadow: '0 0 20px rgba(255,154,0,0.8)'
                            }}
                        />
                    ))}
                </>
            )}

            {/* FISH SWIMMING - Enhanced with fluid motion */}
            {phase === 'fish' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {/* Swimming path - figure 8 */}
                    <motion.div
                        className="absolute"
                        animate={{
                            x: [0, 200, 200, 0, -200, -200, 0],
                            y: [0, -100, 100, 0, 100, -100, 0],
                        }}
                        transition={{
                            duration: 3.5,
                            ease: "easeInOut",
                            times: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1]
                        }}
                    >
                        <motion.div
                            animate={{
                                rotateY: [0, 0, 180, 180, 360, 360, 360],
                            }}
                            transition={{
                                duration: 3.5,
                                times: [0, 0.24, 0.26, 0.74, 0.76, 0.99, 1]
                            }}
                            style={{
                                filter: 'drop-shadow(0 15px 40px rgba(255,154,0,0.7))'
                            }}
                        >
                            <svg width="180" height="120" viewBox="0 0 180 120" className="relative">
                                <defs>
                                    <linearGradient id="fishBody" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#ffd700" />
                                        <stop offset="50%" stopColor="#ff9a00" />
                                        <stop offset="100%" stopColor="#ff6b00" />
                                    </linearGradient>
                                    <radialGradient id="fishShine">
                                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                                    </radialGradient>
                                    <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#ff9a00" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#ffd700" stopOpacity="0.8" />
                                    </linearGradient>
                                </defs>

                                {/* Body with wave animation */}
                                <motion.path
                                    d="M 30 60 Q 60 55, 90 60 Q 120 65, 140 60"
                                    stroke="url(#fishBody)"
                                    strokeWidth="45"
                                    fill="none"
                                    strokeLinecap="round"
                                    animate={{
                                        d: [
                                            "M 30 60 Q 60 55, 90 60 Q 120 65, 140 60",
                                            "M 30 60 Q 60 65, 90 60 Q 120 55, 140 60",
                                            "M 30 60 Q 60 55, 90 60 Q 120 65, 140 60"
                                        ]
                                    }}
                                    transition={{ duration: 0.6, repeat: Infinity }}
                                />

                                {/* Shine overlay */}
                                <ellipse cx="70" cy="50" rx="25" ry="18" fill="url(#fishShine)" />

                                {/* Animated Tail */}
                                <motion.g
                                    animate={{
                                        rotate: [-8, 8, -8],
                                        x: [0, -3, 0]
                                    }}
                                    transition={{ duration: 0.6, repeat: Infinity }}
                                    style={{ transformOrigin: '20px 60px' }}
                                >
                                    <path
                                        d="M 20 60 Q 5 40, 10 25 Q 0 60, 10 95 Q 5 80, 20 60 Z"
                                        fill="url(#fishBody)"
                                        opacity="0.95"
                                    />
                                    <path
                                        d="M 20 60 Q 8 50, 12 35 Q 5 60, 12 85 Q 8 70, 20 60 Z"
                                        fill="url(#finGradient)"
                                    />
                                </motion.g>

                                {/* Top Fin */}
                                <motion.path
                                    d="M 80 38 Q 85 20, 75 15 Q 90 30, 80 38 Z"
                                    fill="url(#fishBody)"
                                    opacity="0.8"
                                    animate={{ y: [-2, 2, -2] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                />

                                {/* Bottom Fin */}
                                <motion.path
                                    d="M 80 82 Q 85 100, 75 105 Q 90 90, 80 82 Z"
                                    fill="url(#fishBody)"
                                    opacity="0.8"
                                    animate={{ y: [2, -2, 2] }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                                />

                                {/* Eye */}
                                <circle cx="120" cy="55" r="7" fill="#1a1a1a" />
                                <circle cx="123" cy="52" r="3" fill="#fff" />

                                {/* Scales detail */}
                                <g opacity="0.3">
                                    {[0, 1, 2, 3].map((i) => (
                                        <circle key={i} cx={50 + i * 20} cy={60} r="8" fill="none" stroke="#fff" strokeWidth="1" />
                                    ))}
                                </g>
                            </svg>

                            {/* Animated Bubbles */}
                            {[0, 1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full bg-white/40 border border-white/60"
                                    style={{
                                        width: 6 + i * 2,
                                        height: 6 + i * 2,
                                        left: -30 - i * 20,
                                        top: 50 + Math.sin(i) * 15
                                    }}
                                    animate={{
                                        y: [-5, -40],
                                        x: [0, (i % 2 ? 10 : -10)],
                                        opacity: [0.7, 0],
                                        scale: [1, 1.3]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        delay: i * 0.4,
                                        repeat: Infinity
                                    }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            )}

            {/* WATERCOLOR TRANSFORMATION */}
            {phase === 'transform' && (
                <motion.div className="absolute" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: 100 + i * 50,
                                height: 100 + i * 50,
                                background: `radial-gradient(circle, rgba(255,154,0,${0.6 - i * 0.15}) 0%, transparent 70%)`,
                                filter: 'blur(20px)'
                            }}
                            animate={{
                                scale: [0.8, 1.5],
                                opacity: [0.8, 0],
                                rotate: i * 90
                            }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                        />
                    ))}
                </motion.div>
            )}

            {/* ROCKET LAUNCH - Enhanced with dynamic flames */}
            {phase === 'rocket' && (
                <motion.div
                    className="absolute"
                    initial={{ y: 50, scale: 0.9, rotate: 0 }}
                    animate={{
                        y: [-50, -500],
                        scale: [0.9, 1.3],
                        rotate: [0, -3, 3, 0]
                    }}
                    transition={{
                        duration: 3,
                        ease: [0.4, 0, 0.2, 1],
                        rotate: { duration: 0.5, repeat: 5 }
                    }}
                    style={{
                        filter: 'drop-shadow(0 15px 40px rgba(255,154,0,0.9))'
                    }}
                >
                    <svg width="120" height="180" viewBox="0 0 120 180">
                        <defs>
                            <linearGradient id="rocketBody" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ffd700" />
                                <stop offset="50%" stopColor="#ff9a00" />
                                <stop offset="100%" stopColor="#ff6b00" />
                            </linearGradient>
                            <radialGradient id="rocketShine">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="flame1" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ffff00" />
                                <stop offset="40%" stopColor="#ff9a00" />
                                <stop offset="100%" stopColor="#ff0000" />
                            </linearGradient>
                            <linearGradient id="flame2" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="50%" stopColor="#ffff00" />
                                <stop offset="100%" stopColor="#ff9a00" />
                            </linearGradient>
                        </defs>

                        {/* Rocket Body */}
                        <path d="M 35 60 L 35 120 L 85 120 L 85 60 Z" fill="url(#rocketBody)" />

                        {/* Nose Cone */}
                        <path d="M 60 15 L 85 60 L 35 60 Z" fill="url(#rocketBody)" />
                        <ellipse cx="55" cy="35" rx="12" ry="18" fill="url(#rocketShine)" />

                        {/* Fins */}
                        <path d="M 35 90 L 15 140 L 35 120 Z" fill="url(#rocketBody)" opacity="0.95" />
                        <path d="M 85 90 L 105 140 L 85 120 Z" fill="url(#rocketBody)" opacity="0.95" />

                        {/* Window */}
                        <circle cx="60" cy="75" r="15" fill="#1a1a1a" opacity="0.8" />
                        <circle cx="60" cy="75" r="12" fill="#4a9eff" opacity="0.7" />
                        <ellipse cx="55" cy="70" rx="5" ry="6" fill="#fff" opacity="0.6" />

                        {/* Details */}
                        <rect x="38" y="95" width="44" height="3" fill="#ff6b00" opacity="0.6" />
                        <rect x="38" y="105" width="44" height="3" fill="#ff6b00" opacity="0.6" />
                    </svg>

                    {/* Dynamic Exhaust Flames */}
                    <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 165 }}>
                        {/* Main Flame */}
                        <motion.svg
                            width="80"
                            height="120"
                            viewBox="0 0 80 120"
                            animate={{
                                scaleY: [1, 1.4, 1.1, 1.3, 1],
                                scaleX: [1, 0.9, 1.1, 0.95, 1]
                            }}
                            transition={{ duration: 0.15, repeat: Infinity }}
                        >
                            <path
                                d="M 40 0 Q 15 40, 20 80 Q 40 110, 60 80 Q 65 40, 40 0 Z"
                                fill="url(#flame1)"
                                opacity="0.95"
                            />
                        </motion.svg>

                        {/* Inner Bright Flame */}
                        <motion.svg
                            width="50"
                            height="80"
                            viewBox="0 0 50 80"
                            className="absolute top-0 left-1/2 -translate-x-1/2"
                            animate={{
                                scaleY: [1, 1.3, 1.2, 1.4, 1],
                                scaleX: [1, 0.95, 1.05, 0.9, 1]
                            }}
                            transition={{ duration: 0.12, repeat: Infinity }}
                        >
                            <path
                                d="M 25 0 Q 10 25, 12 50 Q 25 70, 38 50 Q 40 25, 25 0 Z"
                                fill="url(#flame2)"
                                opacity="0.9"
                            />
                        </motion.svg>
                    </div>

                    {/* Smoke Trail */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute left-1/2 -translate-x-1/2 rounded-full"
                            style={{
                                width: 25 + i * 8,
                                height: 25 + i * 8,
                                top: 180 + i * 50,
                                background: `radial-gradient(circle, rgba(150,150,150,${0.4 - i * 0.08}), transparent)`,
                                filter: 'blur(8px)'
                            }}
                            animate={{
                                opacity: [0.5, 0],
                                scale: [1, 1.8],
                                x: [0, (i % 2 ? 15 : -15)]
                            }}
                            transition={{
                                duration: 1.2,
                                delay: i * 0.15,
                                repeat: Infinity
                            }}
                        />
                    ))}
                </motion.div>
            )}

            {/* EXPLOSION */}
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
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute rounded-full"
                            style={{
                                width: p.size,
                                height: p.size,
                                background: ['#ffff00', '#ff9a00', '#ff6b00', '#ffffff'][Math.floor(Math.random() * 4)],
                                boxShadow: '0 0 20px rgba(255,154,0,0.8)'
                            }}
                        />
                    ))}

                    {[0, 0.15, 0.3].map((delay, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 5, opacity: 0 }}
                            transition={{ duration: 1, delay }}
                            className="absolute w-[200px] h-[200px] rounded-full border-4 border-orange-500"
                        />
                    ))}
                </div>
            )}

            {/* BRANDING */}
            {phase === 'branding' && (
                <div className="relative flex flex-col items-center z-50">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9, rotate: -5 }}
                        className="relative w-[300px] h-[300px] cursor-pointer"
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
                            <div className="absolute inset-0 opacity-20 mix-blend-overlay rounded-full"
                                style={{ backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)', backgroundSize: '6px 6px' }}
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

                    <div className="mt-16 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-6xl md:text-8xl font-black text-white tracking-widest mb-4"
                        >
                            ALLRANGE
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-brand-gold text-xl md:text-2xl tracking-[0.5em] font-light"
                        >
                            設計無界 • 創意無限
                        </motion.p>
                    </div>
                </div>
            )}

        </div>
    );
}
