'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'splash' | 'fish' | 'transform' | 'rocket' | 'explosion' | 'branding'>('splash');
    const [loopCount, setLoopCount] = useState(0);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const runStory = async () => {
            setPhase('splash');
            await new Promise(r => setTimeout(r, 1200));

            setPhase('fish');
            setTime(0);
            await new Promise(r => setTimeout(r, 4000));

            setPhase('transform');
            await new Promise(r => setTimeout(r, 1500));

            setPhase('rocket');
            await new Promise(r => setTimeout(r, 3500));

            setPhase('explosion');
            await new Promise(r => setTimeout(r, 1000));

            setPhase('branding');
            await new Promise(r => setTimeout(r, 3000));

            setLoopCount(prev => prev + 1);
        };

        runStory();
    }, [loopCount]);

    // Physics timer for fish
    useEffect(() => {
        if (phase === 'fish') {
            const interval = setInterval(() => {
                setTime(t => t + 0.016); // 60fps
            }, 16);
            return () => clearInterval(interval);
        }
    }, [phase]);

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

            {/* PREMIUM FISH - Physics-based swimming */}
            {phase === 'fish' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    <motion.div
                        className="absolute"
                        style={{
                            x: Math.cos(time * 0.8) * 250,
                            y: Math.sin(time * 0.8) * 150,
                        }}
                    >
                        <motion.div
                            style={{
                                rotateY: Math.cos(time * 0.8) > 0 ? 0 : 180,
                                filter: 'drop-shadow(0 20px 60px rgba(255,154,0,0.8)) drop-shadow(0 0 40px rgba(255,200,0,0.6))'
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Fish Body - Premium 3D look */}
                            <svg width="240" height="160" viewBox="0 0 240 160" style={{ overflow: 'visible' }}>
                                <defs>
                                    <linearGradient id="fishGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#ffd700" />
                                        <stop offset="30%" stopColor="#ffb62e" />
                                        <stop offset="60%" stopColor="#ff9a00" />
                                        <stop offset="100%" stopColor="#ff6b00" />
                                    </linearGradient>
                                    <radialGradient id="fishHighlight">
                                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                                        <stop offset="50%" stopColor="#ffd700" stopOpacity="0.5" />
                                        <stop offset="100%" stopColor="transparent" />
                                    </radialGradient>
                                    <filter id="fishGlow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Shadow layer */}
                                <ellipse
                                    cx="120"
                                    cy="95"
                                    rx="70"
                                    ry="30"
                                    fill="rgba(0,0,0,0.3)"
                                    filter="blur(8px)"
                                />

                                {/* Main body with sine wave */}
                                <motion.path
                                    d={`M 40 80 Q 80 ${75 + Math.sin(time * 8) * 5}, 120 80 Q 160 ${85 - Math.sin(time * 8) * 5}, 180 80`}
                                    stroke="url(#fishGradient)"
                                    strokeWidth="55"
                                    fill="none"
                                    strokeLinecap="round"
                                    filter="url(#fishGlow)"
                                />

                                {/* Highlight shine */}
                                <ellipse cx="100" cy="65" rx="40" ry="25" fill="url(#fishHighlight)" opacity="0.7" />

                                {/* Animated tail with physics */}
                                <motion.g
                                    style={{
                                        rotate: Math.sin(time * 8) * 15,
                                        x: Math.sin(time * 8) * -5,
                                        transformOrigin: '30px 80px'
                                    }}
                                >
                                    <path
                                        d="M 30 80 Q 10 50, 15 30 Q 5 80, 15 130 Q 10 110, 30 80 Z"
                                        fill="url(#fishGradient)"
                                        opacity="0.95"
                                        filter="url(#fishGlow)"
                                    />
                                    <path
                                        d="M 30 80 Q 15 60, 18 40 Q 10 80, 18 120 Q 15 100, 30 80 Z"
                                        fill="url(#fishHighlight)"
                                        opacity="0.5"
                                    />
                                </motion.g>

                                {/* Dorsal fin */}
                                <motion.path
                                    d="M 110 50 Q 120 25, 110 20 Q 125 35, 110 50 Z"
                                    fill="url(#fishGradient)"
                                    opacity="0.9"
                                    style={{ y: Math.sin(time * 6) * 3 }}
                                />

                                {/* Pectoral fins */}
                                <motion.ellipse
                                    cx="100"
                                    cy="90"
                                    rx="25"
                                    ry="12"
                                    fill="url(#fishGradient)"
                                    opacity="0.7"
                                    style={{
                                        rotate: Math.sin(time * 6) * 20,
                                        transformOrigin: '100px 90px'
                                    }}
                                />

                                {/* Eye with depth */}
                                <circle cx="160" cy="72" r="10" fill="#1a1a1a" />
                                <circle cx="160" cy="72" r="8" fill="#2a2a2a" />
                                <circle cx="163" cy="69" r="4" fill="#fff" opacity="0.9" />
                                <circle cx="165" cy="70" r="2" fill="#fff" />

                                {/* Scale pattern */}
                                <g opacity="0.2">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <circle
                                            key={i}
                                            cx={60 + (i % 4) * 30}
                                            cy={65 + Math.floor(i / 4) * 15}
                                            r="10"
                                            fill="none"
                                            stroke="#fff"
                                            strokeWidth="1.5"
                                        />
                                    ))}
                                </g>
                            </svg>

                            {/* Water particles trail */}
                            {Array.from({ length: 8 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full"
                                    style={{
                                        width: 4 + i,
                                        height: 4 + i,
                                        left: -40 - i * 15,
                                        top: 70 + Math.sin(time * 8 + i) * 10,
                                        background: `radial-gradient(circle, rgba(255,200,100,${0.6 - i * 0.07}), transparent)`,
                                        boxShadow: `0 0 ${10 + i * 2}px rgba(255,154,0,${0.5 - i * 0.05})`
                                    }}
                                    animate={{
                                        opacity: [0.8, 0],
                                        scale: [1, 1.5]
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: i * 0.1,
                                        repeat: Infinity
                                    }}
                                />
                            ))}

                            {/* Bubbles */}
                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={`bubble-${i}`}
                                    className="absolute rounded-full border-2 border-white/50"
                                    style={{
                                        width: 8 + i * 2,
                                        height: 8 + i * 2,
                                        left: -25 - i * 20,
                                        top: 65 + Math.sin(i) * 20,
                                        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.2))',
                                        boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5)'
                                    }}
                                    animate={{
                                        y: [-10, -60],
                                        x: [0, (i % 2 ? 15 : -15)],
                                        opacity: [0.9, 0],
                                        scale: [1, 1.4]
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: i * 0.5,
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

            {/* PREMIUM ROCKET - Cinematic launch */}
            {phase === 'rocket' && (
                <motion.div
                    className="absolute"
                    initial={{ y: 50, scale: 0.9 }}
                    animate={{
                        y: [-50, -600],
                        scale: [0.9, 1.4]
                    }}
                    transition={{
                        duration: 3.5,
                        ease: [0.34, 1.56, 0.64, 1]
                    }}
                >
                    {/* Camera shake effect */}
                    <motion.div
                        animate={{
                            x: [0, -2, 2, -1, 1, 0],
                            rotate: [0, -0.5, 0.5, -0.3, 0.3, 0]
                        }}
                        transition={{
                            duration: 0.15,
                            repeat: 20
                        }}
                        style={{
                            filter: 'drop-shadow(0 20px 80px rgba(255,154,0,1)) drop-shadow(0 0 60px rgba(255,200,0,0.8))'
                        }}
                    >
                        <svg width="140" height="220" viewBox="0 0 140 220" style={{ overflow: 'visible' }}>
                            <defs>
                                <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#ffd700" />
                                    <stop offset="40%" stopColor="#ffb62e" />
                                    <stop offset="70%" stopColor="#ff9a00" />
                                    <stop offset="100%" stopColor="#ff6b00" />
                                </linearGradient>
                                <radialGradient id="rocketHighlight">
                                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                                    <stop offset="100%" stopColor="transparent" />
                                </radialGradient>
                                <filter id="rocketGlow">
                                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Rocket body with 3D effect */}
                            <path
                                d="M 40 70 L 40 140 L 100 140 L 100 70 Z"
                                fill="url(#rocketGrad)"
                                filter="url(#rocketGlow)"
                            />
                            <rect x="43" y="73" width="54" height="64" fill="rgba(0,0,0,0.1)" />

                            {/* Nose cone */}
                            <path d="M 70 20 L 100 70 L 40 70 Z" fill="url(#rocketGrad)" filter="url(#rocketGlow)" />
                            <ellipse cx="62" cy="42" rx="18" ry="25" fill="url(#rocketHighlight)" opacity="0.6" />

                            {/* Fins with depth */}
                            <path d="M 40 100 L 15 160 L 40 140 Z" fill="url(#rocketGrad)" opacity="0.95" filter="url(#rocketGlow)" />
                            <path d="M 100 100 L 125 160 L 100 140 Z" fill="url(#rocketGrad)" opacity="0.95" filter="url(#rocketGlow)" />
                            <path d="M 43 105 L 20 155 L 43 138 Z" fill="rgba(0,0,0,0.2)" />
                            <path d="M 97 105 L 120 155 L 97 138 Z" fill="rgba(0,0,0,0.2)" />

                            {/* Window */}
                            <circle cx="70" cy="90" r="18" fill="#1a1a1a" opacity="0.9" />
                            <circle cx="70" cy="90" r="15" fill="#2a4a6a" opacity="0.8" />
                            <ellipse cx="65" cy="85" rx="8" ry="10" fill="url(#rocketHighlight)" opacity="0.7" />

                            {/* Details */}
                            <rect x="43" y="110" width="54" height="4" fill="#ff6b00" opacity="0.7" />
                            <rect x="43" y="125" width="54" height="4" fill="#ff6b00" opacity="0.7" />
                        </svg>

                        {/* Premium exhaust flames with particles */}
                        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 200 }}>
                            {/* Main flame core */}
                            <motion.div
                                className="absolute left-1/2 -translate-x-1/2"
                                animate={{
                                    scaleY: [1, 1.5, 1.2, 1.4, 1],
                                    scaleX: [1, 0.85, 1.1, 0.9, 1]
                                }}
                                transition={{ duration: 0.08, repeat: Infinity }}
                            >
                                <svg width="100" height="150" viewBox="0 0 100 150">
                                    <defs>
                                        <linearGradient id="flameCore" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#ffffff" />
                                            <stop offset="20%" stopColor="#ffff00" />
                                            <stop offset="50%" stopColor="#ff9a00" />
                                            <stop offset="100%" stopColor="#ff0000" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M 50 0 Q 20 50, 25 100 Q 50 140, 75 100 Q 80 50, 50 0 Z"
                                        fill="url(#flameCore)"
                                        opacity="0.95"
                                        filter="url(#rocketGlow)"
                                    />
                                </svg>
                            </motion.div>

                            {/* Outer flame */}
                            <motion.div
                                className="absolute left-1/2 -translate-x-1/2"
                                animate={{
                                    scaleY: [1, 1.6, 1.3, 1.5, 1],
                                    scaleX: [1, 0.9, 1.15, 0.95, 1]
                                }}
                                transition={{ duration: 0.1, repeat: Infinity }}
                            >
                                <svg width="120" height="180" viewBox="0 0 120 180">
                                    <defs>
                                        <linearGradient id="flameOuter" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#ffff00" />
                                            <stop offset="40%" stopColor="#ff9a00" />
                                            <stop offset="80%" stopColor="#ff0000" />
                                            <stop offset="100%" stopColor="#8b0000" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M 60 0 Q 25 60, 30 120 Q 60 170, 90 120 Q 95 60, 60 0 Z"
                                        fill="url(#flameOuter)"
                                        opacity="0.8"
                                    />
                                </svg>
                            </motion.div>

                            {/* Flame particles */}
                            {Array.from({ length: 20 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute left-1/2 -translate-x-1/2 rounded-full"
                                    style={{
                                        width: 4 + Math.random() * 8,
                                        height: 4 + Math.random() * 8,
                                        background: ['#ffff00', '#ff9a00', '#ff0000', '#fff'][Math.floor(Math.random() * 4)],
                                        boxShadow: '0 0 20px currentColor',
                                        left: (Math.random() - 0.5) * 60,
                                        top: Math.random() * 40
                                    }}
                                    animate={{
                                        y: [0, 100 + Math.random() * 100],
                                        x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80],
                                        opacity: [1, 0],
                                        scale: [1, 0.3]
                                    }}
                                    transition={{
                                        duration: 0.5 + Math.random() * 0.5,
                                        delay: i * 0.05,
                                        repeat: Infinity
                                    }}
                                />
                            ))}
                        </div>

                        {/* Smoke trail with physics */}
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                                key={`smoke-${i}`}
                                className="absolute left-1/2 -translate-x-1/2 rounded-full"
                                style={{
                                    width: 35 + i * 12,
                                    height: 35 + i * 12,
                                    top: 210 + i * 60,
                                    background: `radial-gradient(circle, rgba(120,120,120,${0.5 - i * 0.08}), transparent)`,
                                    filter: 'blur(12px)'
                                }}
                                animate={{
                                    opacity: [0.6, 0],
                                    scale: [1, 2.5],
                                    x: [(i % 2 ? -10 : 10), (i % 2 ? -30 : 30)]
                                }}
                                transition={{
                                    duration: 1.5,
                                    delay: i * 0.2,
                                    repeat: Infinity
                                }}
                            />
                        ))}
                    </motion.div>
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
