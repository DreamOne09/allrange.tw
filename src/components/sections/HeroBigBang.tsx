'use client';

import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Fish, Rocket, Lightbulb } from 'lucide-react';

export default function HeroBigBang() {
    const [phase, setPhase] = useState<'singularity' | 'bang' | 'morph' | 'coalesce' | 'branding'>('singularity');
    const [morphIndex, setMorphIndex] = useState(0); // 0: Fish, 1: Rocket, 2: Bulb

    // Animation Controls
    useEffect(() => {
        const sequence = async () => {
            // 0s: Singularity (Wait a bit then explode)
            await new Promise(r => setTimeout(r, 1000));
            setPhase('bang');

            // 1.5s: Start Morphing
            await new Promise(r => setTimeout(r, 800)); // Explosion duration
            setPhase('morph');

            // Cycle Morphs
            // Fish -> Rocket
            await new Promise(r => setTimeout(r, 1500));
            setMorphIndex(1);
            // Rocket -> Bulb
            await new Promise(r => setTimeout(r, 1500));
            setMorphIndex(2);
            // Bulb -> Coalesce
            await new Promise(r => setTimeout(r, 1500));
            setPhase('coalesce');

            // Coalesce -> Branding
            await new Promise(r => setTimeout(r, 1000));
            setPhase('branding');
        };
        sequence();
    }, []);


    // Explosion Particles
    const particleCount = 20;
    const particles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        angle: (i / particleCount) * 360,
        distance: 100 + Math.random() * 200,
        size: 5 + Math.random() * 15,
        color: ['#ff9a00', '#ffb62e', '#ffffff'][Math.floor(Math.random() * 3)]
    }));

    return (
        <div className="relative w-full h-[100vh] bg-black overflow-hidden flex items-center justify-center font-sans">

            {/* 1. SINGULARITY */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={phase === 'singularity' ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                exit={{ scale: 20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_20px_#ff9a00,0_0_40px_#ff9a00]"
            />

            {/* 2. BIG BANG EXPLOSION */}
            {phase === 'bang' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {particles.map((p) => (
                        <motion.div
                            key={p.id}
                            initial={{ x: 0, y: 0, scale: 0 }}
                            animate={{
                                x: Math.cos(p.angle * Math.PI / 180) * p.distance,
                                y: Math.sin(p.angle * Math.PI / 180) * p.distance,
                                scale: [0, 1, 0], // Pop and vanish
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute rounded-full"
                            style={{
                                width: p.size,
                                height: p.size,
                                backgroundColor: p.color,
                                boxShadow: `0 0 10px ${p.color}`
                            }}
                        />
                    ))}
                    {/* Shockwave */}
                    <motion.div
                        initial={{ scale: 0, opacity: 1, borderColor: '#fff' }}
                        animate={{ scale: 3, opacity: 0, borderColor: '#ff9a00' }}
                        transition={{ duration: 0.8 }}
                        className="absolute w-[200px] h-[200px] rounded-full border-4"
                    />
                </div>
            )}

            {/* 3. FLUID MORPHING (Fish -> Rocket -> Bulb) */}
            {phase === 'morph' && (
                <div className="relative z-10">
                    <motion.div
                        key={morphIndex}
                        initial={{ scale: 0, opacity: 0, rotate: -45 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0, opacity: 0, rotate: 45 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="text-brand-orange drop-shadow-[0_0_30px_rgba(255,154,0,0.6)]"
                    >
                        {morphIndex === 0 && <Fish size={180} strokeWidth={1} fill="#ff9a00" className="text-white" />}
                        {morphIndex === 1 && <Rocket size={180} strokeWidth={1} fill="#ff9a00" className="text-white" />}
                        {morphIndex === 2 && <Lightbulb size={180} strokeWidth={1} fill="#ff9a00" className="text-white" />}
                    </motion.div>
                </div>
            )}

            {/* 4. COALESCE (Sucking back in) */}
            {phase === 'coalesce' && (
                <motion.div className="absolute inset-0 flex items-center justify-center">
                    {/* Reverse Particles */}
                    {particles.map((p) => (
                        <motion.div
                            key={`c-${p.id}`}
                            initial={{
                                x: Math.cos(p.angle * Math.PI / 180) * p.distance * 1.5,
                                y: Math.sin(p.angle * Math.PI / 180) * p.distance * 1.5,
                                scale: 0,
                                opacity: 0
                            }}
                            animate={{
                                x: 0,
                                y: 0,
                                scale: 1,
                                opacity: 1
                            }}
                            transition={{ duration: 0.8, ease: "backIn" }}
                            className="absolute rounded-full"
                            style={{
                                width: p.size,
                                height: p.size,
                                backgroundColor: p.color
                            }}
                        />
                    ))}
                </motion.div>
            )}

            {/* 5. BRANDING (Iteractive Orange) */}
            {phase === 'branding' && (
                <div className="relative flex flex-col items-center z-50">
                    <motion.div
                        initial={{ scale: 0, y: 0 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 10
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9, rotate: 15 }} // Boing effect
                        className="relative w-[300px] h-[300px] cursor-pointer"
                    >
                        {/* The Orange */}
                        <div className="w-full h-full rounded-full shadow-[0_20px_50px_rgba(255,154,0,0.4)]"
                            style={{
                                background: 'radial-gradient(circle at 30% 30%, #fff 0%, #ffc845 20%, #ff9a00 60%, #a85d00 100%)'
                            }}
                        >
                            {/* Texture Pores */}
                            <div className="absolute inset-0 opacity-30 mix-blend-overlay rounded-full"
                                style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '4px 4px' }}
                            />
                        </div>

                        {/* Leaf */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="absolute -top-6 left-1/2 w-16 h-24 bg-green-600 rounded-tr-[100%] rounded-bl-[100%] origin-bottom-left -rotate-12 border-2 border-green-800"
                        />
                    </motion.div>

                    {/* Text */}
                    <div className="mt-12 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl font-black text-white tracking-widest"
                        >
                            ALLRANGE
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-brand-gold mt-4 text-xl tracking-[0.5em] font-light"
                        >
                            設計無界 • 創意無限
                        </motion.p>
                    </div>
                </div>
            )}

        </div>
    );
}
