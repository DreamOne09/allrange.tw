'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'splash' | 'fish' | 'transform' | 'rocket' | 'explosion' | 'branding'>('splash');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runStory = async () => {
            // 1. Orange Splash
            setPhase('splash');
            await new Promise(r => setTimeout(r, 1200));

            // 2. Fish Swimming
            setPhase('fish');
            await new Promise(r => setTimeout(r, 3000));

            // 3. Watercolor Transform
            setPhase('transform');
            await new Promise(r => setTimeout(r, 1500));

            // 4. Rocket Launch
            setPhase('rocket');
            await new Promise(r => setTimeout(r, 2500));

            // 5. Explosion
            setPhase('explosion');
            await new Promise(r => setTimeout(r, 1000));

            // 6. Branding
            setPhase('branding');
            await new Promise(r => setTimeout(r, 3000));

            // Loop
            setLoopCount(prev => prev + 1);
        };

        runStory();
    }, [loopCount]);

    // Splash particles
    const splashParticles = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        angle: (i / 20) * 360,
        distance: 80 + Math.random() * 120,
        size: 15 + Math.random() * 25,
    }));

    // Explosion particles
    const explosionParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        angle: (i / 40) * 360,
        distance: 100 + Math.random() * 200,
        size: 8 + Math.random() * 15,
    }));

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">

            {/* 1. ORANGE SPLASH */}
            {phase === 'splash' && (
                <>
                    {/* Central Orange */}
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

                    {/* Splash Droplets */}
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

            {/* 2. FISH SWIMMING IN CIRCLE */}
            {phase === 'fish' && (
                <motion.div
                    className="absolute"
                    animate={{
                        rotate: 360
                    }}
                    transition={{ duration: 3, ease: "linear" }}
                >
                    <motion.div
                        className="relative"
                        style={{
                            x: 150,
                            filter: 'drop-shadow(0 10px 30px rgba(255,154,0,0.6))'
                        }}
                        animate={{
                            scaleX: [1, -1, 1],
                        }}
                        transition={{
                            duration: 3,
                            times: [0, 0.5, 1]
                        }}
                    >
                        {/* Fish Body */}
                        <svg width="120" height="80" viewBox="0 0 120 80" className="relative">
                            <defs>
                                <linearGradient id="fishBody" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ffd700" />
                                    <stop offset="50%" stopColor="#ff9a00" />
                                    <stop offset="100%" stopColor="#ff6b00" />
                                </linearGradient>
                                <radialGradient id="fishShine">
                                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                                </radialGradient>
                            </defs>

                            {/* Body */}
                            <ellipse cx="50" cy="40" rx="40" ry="25" fill="url(#fishBody)" />

                            {/* Shine */}
                            <ellipse cx="35" cy="30" rx="15" ry="10" fill="url(#fishShine)" />

                            {/* Tail */}
                            <path d="M 10 40 Q 0 25, 5 15 Q 0 40, 5 65 Q 0 55, 10 40 Z" fill="url(#fishBody)" opacity="0.9" />

                            {/* Fins */}
                            <ellipse cx="50" cy="60" rx="20" ry="8" fill="url(#fishBody)" opacity="0.7" />
                            <ellipse cx="50" cy="20" rx="20" ry="8" fill="url(#fishBody)" opacity="0.7" />

                            {/* Eye */}
                            <circle cx="70" cy="35" r="5" fill="#000" />
                            <circle cx="72" cy="33" r="2" fill="#fff" />
                        </svg>

                        {/* Bubbles */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full bg-white/30 border border-white/50"
                                style={{
                                    width: 8 + i * 3,
                                    height: 8 + i * 3,
                                    left: -20 - i * 15,
                                    top: 30 + i * 10
                                }}
                                animate={{
                                    y: [-10, -30],
                                    opacity: [0.6, 0],
                                    scale: [1, 1.5]
                                }}
                                transition={{
                                    duration: 1.5,
                                    delay: i * 0.3,
                                    repeat: Infinity
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            )}

            {/* 3. WATERCOLOR TRANSFORMATION */}
            {phase === 'transform' && (
                <motion.div
                    className="absolute"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Watercolor Splashes */}
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

                    {/* Morphing Shape */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                        }}
                        transition={{ duration: 1.5 }}
                        className="relative"
                    >
                        <svg width="150" height="150" viewBox="0 0 150 150">
                            <defs>
                                <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ffd700" />
                                    <stop offset="50%" stopColor="#ff9a00" />
                                    <stop offset="100%" stopColor="#ff6b00" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M 75 10 Q 100 40, 90 75 Q 75 100, 60 75 Q 50 40, 75 10 Z"
                                fill="url(#morphGradient)"
                                opacity="0.8"
                            />
                        </svg>
                    </motion.div>
                </motion.div>
            )}

            {/* 4. ROCKET LAUNCH */}
            {phase === 'rocket' && (
                <motion.div
                    className="absolute"
                    initial={{ y: 0, scale: 0.8 }}
                    animate={{
                        y: [-50, -400],
                        scale: [0.8, 1.2]
                    }}
                    transition={{ duration: 2.5, ease: "easeIn" }}
                    style={{
                        filter: 'drop-shadow(0 10px 30px rgba(255,154,0,0.8))'
                    }}
                >
                    <svg width="100" height="150" viewBox="0 0 100 150">
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
                        </defs>

                        {/* Rocket Body */}
                        <path d="M 50 10 L 70 50 L 70 100 L 30 100 L 30 50 Z" fill="url(#rocketBody)" />

                        {/* Nose Cone */}
                        <path d="M 50 10 L 70 50 L 30 50 Z" fill="url(#rocketBody)" />
                        <ellipse cx="45" cy="30" rx="10" ry="15" fill="url(#rocketShine)" />

                        {/* Fins */}
                        <path d="M 30 80 L 10 120 L 30 100 Z" fill="url(#rocketBody)" opacity="0.9" />
                        <path d="M 70 80 L 90 120 L 70 100 Z" fill="url(#rocketBody)" opacity="0.9" />

                        {/* Window */}
                        <circle cx="50" cy="60" r="12" fill="#1a1a1a" opacity="0.8" />
                        <circle cx="50" cy="60" r="10" fill="#4a9eff" opacity="0.6" />
                    </svg>

                    {/* Exhaust Fire */}
                    <motion.div
                        className="absolute left-1/2 -translate-x-1/2"
                        style={{ top: 140 }}
                        animate={{
                            scaleY: [1, 1.5, 1],
                            opacity: [0.9, 1, 0.9]
                        }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                    >
                        <svg width="60" height="80" viewBox="0 0 60 80">
                            <defs>
                                <linearGradient id="fire" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#ffff00" />
                                    <stop offset="50%" stopColor="#ff9a00" />
                                    <stop offset="100%" stopColor="#ff0000" />
                                </linearGradient>
                            </defs>
                            <path d="M 30 0 Q 10 30, 15 60 Q 30 80, 45 60 Q 50 30, 30 0 Z" fill="url(#fire)" opacity="0.9" />
                        </svg>
                    </motion.div>

                    {/* Smoke Trail */}
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gray-400/30"
                            style={{
                                width: 30 + i * 10,
                                height: 30 + i * 10,
                                top: 150 + i * 40,
                                filter: 'blur(10px)'
                            }}
                            animate={{
                                opacity: [0.5, 0],
                                scale: [1, 1.5]
                            }}
                            transition={{
                                duration: 1,
                                delay: i * 0.2,
                                repeat: Infinity
                            }}
                        />
                    ))}
                </motion.div>
            )}

            {/* 5. EXPLOSION */}
            {phase === 'explosion' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Flash */}
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute w-[300px] h-[300px] rounded-full bg-white"
                    />

                    {/* Explosion Particles */}
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

                    {/* Shockwave */}
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

            {/* 6. BRANDING - 3D ORANGE */}
            {phase === 'branding' && (
                <div className="relative flex flex-col items-center z-50">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15
                        }}
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
                            className="absolute -top-8 left-1/2 w-20 h-28 bg-gradient-to-br from-green-400 to-green-700 rounded-tr-[100%] rounded-bl-[100%] origin-bottom-left border-2 border-green-900"
                            style={{
                                filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))',
                                transform: 'translateX(-50%) rotateZ(-12deg)'
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
