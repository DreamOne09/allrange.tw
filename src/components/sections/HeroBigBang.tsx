'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'orange' | 'explosion' | 'brushStrokes' | 'merge' | 'splash'>('orange');
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        const runSequence = async () => {
            // 1. Orange appears
            setPhase('orange');
            await new Promise(r => setTimeout(r, 1500));

            // 2. Explosion
            setPhase('explosion');
            await new Promise(r => setTimeout(r, 800));

            // 3. Paint brush strokes from 5 directions
            setPhase('brushStrokes');
            await new Promise(r => setTimeout(r, 2500));

            // 4. Merge into orange
            setPhase('merge');
            await new Promise(r => setTimeout(r, 1500));

            // 5. Color splash
            setPhase('splash');
            await new Promise(r => setTimeout(r, 1200));

            // Loop
            setLoopCount(prev => prev + 1);
        };

        runSequence();
    }, [loopCount]);

    // Color palette
    const colors = [
        '#ff9a00', // Primary orange
        '#ffb62e', // Light orange
        '#ffd700', // Gold
        '#ff6b00', // Dark orange
        '#ff8c42', // Mid orange
    ];

    // Explosion particles
    const explosionParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        angle: (i / 40) * 360,
        distance: 100 + Math.random() * 200,
        size: 8 + Math.random() * 15,
        color: colors[Math.floor(Math.random() * colors.length)]
    }));

    // Paint brush strokes - 5 directions
    const brushStrokes = [
        { from: { x: -400, y: -300 }, to: { x: 0, y: 0 }, angle: 45, color: colors[0], delay: 0 },      // Top-left
        { from: { x: 400, y: -300 }, to: { x: 0, y: 0 }, angle: -45, color: colors[1], delay: 0.1 },    // Top-right
        { from: { x: -400, y: 300 }, to: { x: 0, y: 0 }, angle: -45, color: colors[2], delay: 0.2 },    // Bottom-left
        { from: { x: 400, y: 300 }, to: { x: 0, y: 0 }, angle: 45, color: colors[3], delay: 0.3 },      // Bottom-right
        { from: { x: 0, y: -400 }, to: { x: 0, y: 0 }, angle: 0, color: colors[4], delay: 0.15 },       // Top-center
    ];

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center">

            {/* PHASE 1: ORANGE APPEARS */}
            {phase === 'orange' && (
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
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

                    {/* Shockwave */}
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
                            {/* Main brush stroke */}
                            <div
                                className="relative"
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

                            {/* Brush texture overlay */}
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    background: `repeating-linear-gradient(
                                        ${stroke.angle}deg,
                                        transparent,
                                        transparent 3px,
                                        ${stroke.color}20 3px,
                                        ${stroke.color}20 6px
                                    )`,
                                    mixBlendMode: 'overlay'
                                }}
                            />

                            {/* Paint drips */}
                            {Array.from({ length: 8 }).map((_, j) => (
                                <motion.div
                                    key={`drip-${j}`}
                                    initial={{ scaleY: 0, opacity: 0 }}
                                    animate={{
                                        scaleY: [0, 1, 0.8],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: stroke.delay + 0.3 + j * 0.05,
                                        ease: "easeOut"
                                    }}
                                    className="absolute rounded-full"
                                    style={{
                                        left: `${20 + j * 50}px`,
                                        top: '70px',
                                        width: '8px',
                                        height: '40px',
                                        background: `linear-gradient(180deg, ${stroke.color}, transparent)`,
                                        transformOrigin: 'top center'
                                    }}
                                />
                            ))}

                            {/* Splatter particles */}
                            {Array.from({ length: 15 }).map((_, j) => (
                                <motion.div
                                    key={`splatter-${j}`}
                                    initial={{
                                        x: 0,
                                        y: 0,
                                        scale: 0,
                                        opacity: 0
                                    }}
                                    animate={{
                                        x: (Math.random() - 0.5) * 200,
                                        y: (Math.random() - 0.5) * 150,
                                        scale: [0, 1, 0.5],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 1,
                                        delay: stroke.delay + 0.5 + j * 0.03,
                                        ease: "easeOut"
                                    }}
                                    className="absolute rounded-full"
                                    style={{
                                        left: `${100 + Math.random() * 200}px`,
                                        top: `${20 + Math.random() * 40}px`,
                                        width: `${4 + Math.random() * 8}px`,
                                        height: `${4 + Math.random() * 8}px`,
                                        background: stroke.color,
                                        boxShadow: `0 0 15px ${stroke.color}`
                                    }}
                                />
                            ))}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* PHASE 4: MERGE INTO ORANGE */}
            {phase === 'merge' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {/* Merging paint strokes */}
                    {brushStrokes.map((stroke, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: stroke.to.x,
                                y: stroke.to.y,
                                scale: 1,
                                opacity: 1,
                                rotate: stroke.angle
                            }}
                            animate={{
                                x: 0,
                                y: 0,
                                scale: 0.3,
                                opacity: 0.8,
                                rotate: 0
                            }}
                            transition={{
                                duration: 1.5,
                                delay: i * 0.05,
                                ease: [0.34, 1.56, 0.64, 1]
                            }}
                            className="absolute w-[300px] h-[300px] rounded-full"
                            style={{
                                background: `radial-gradient(circle, ${stroke.color}, transparent)`,
                                filter: 'blur(30px)',
                                mixBlendMode: 'screen'
                            }}
                        />
                    ))}

                    {/* Forming orange */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 1.5,
                            delay: 0.5,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                        className="relative w-[300px] h-[300px] z-10"
                    >
                        <div
                            className="w-full h-full rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)',
                                boxShadow: '0 30px 80px rgba(255,154,0,0.7), 0 0 60px rgba(255,154,0,0.5)'
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
                        </div>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8, type: "spring" }}
                            className="absolute -top-8 left-1/2 w-20 h-28 bg-gradient-to-br from-green-400 to-green-700 rounded-tr-[100%] rounded-bl-[100%] border-2 border-green-900"
                            style={{
                                filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))',
                                transform: 'translateX(-50%) rotateZ(-12deg)',
                                transformOrigin: 'bottom center'
                            }}
                        />
                    </motion.div>
                </div>
            )}

            {/* PHASE 5: COLOR SPLASH */}
            {phase === 'splash' && (
                <div className="absolute w-full h-full flex items-center justify-center">
                    {/* Orange */}
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: 1 }}
                        className="relative w-[300px] h-[300px] z-10"
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

                        <div
                            className="absolute -top-8 left-1/2 w-20 h-28 bg-gradient-to-br from-green-400 to-green-700 rounded-tr-[100%] rounded-bl-[100%] border-2 border-green-900"
                            style={{
                                filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.3))',
                                transform: 'translateX(-50%) rotateZ(-12deg)',
                                transformOrigin: 'bottom center'
                            }}
                        />
                    </motion.div>

                    {/* Splash particles around orange */}
                    {Array.from({ length: 30 }).map((_, i) => {
                        const angle = (i / 30) * 360;
                        const distance = 180 + Math.random() * 80;
                        return (
                            <motion.div
                                key={`splash-${i}`}
                                initial={{
                                    x: Math.cos(angle * Math.PI / 180) * 150,
                                    y: Math.sin(angle * Math.PI / 180) * 150,
                                    scale: 0,
                                    opacity: 0
                                }}
                                animate={{
                                    x: Math.cos(angle * Math.PI / 180) * distance,
                                    y: Math.sin(angle * Math.PI / 180) * distance,
                                    scale: [0, 1.5, 0.8],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 1.2,
                                    delay: i * 0.02,
                                    ease: "easeOut"
                                }}
                                className="absolute rounded-full"
                                style={{
                                    width: `${6 + Math.random() * 12}px`,
                                    height: `${6 + Math.random() * 12}px`,
                                    background: colors[i % colors.length],
                                    boxShadow: `0 0 20px ${colors[i % colors.length]}`
                                }}
                            />
                        );
                    })}

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                    >
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-widest">
                            ALL<span className="text-brand-gold">RANGE</span>
                        </h1>
                    </motion.div>
                </div>
            )}

        </div>
    );
}
