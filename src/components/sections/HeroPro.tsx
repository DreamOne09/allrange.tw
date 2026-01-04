'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroPro() {
    const [phase, setPhase] = useState<'invasion' | 'climax' | 'branding'>('invasion');
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Mouse tracking for 3D parallax
    const springConfig = { damping: 20, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            mouseX.set((e.clientX / innerWidth) * 2 - 1);
            mouseY.set((e.clientY / innerHeight) * 2 - 1);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Parallax transforms
    const rotateX = useTransform(springY, [-1, 1], [30, -30]);
    const rotateY = useTransform(springX, [-1, 1], [-30, 30]);
    const highlightX = useTransform(springX, [-1, 1], [-30, 30]);
    const highlightY = useTransform(springY, [-1, 1], [-30, 30]);

    // Sequence
    useEffect(() => {
        const sequence = async () => {
            // 0s: Invasion starts (Oranges roll in)
            setPhase('invasion');

            // 2.0s: The Center is Crowded -> Main Orange Pops
            await new Promise(r => setTimeout(r, 2000));
            setPhase('climax');

            // 3.0s: Reveal Text
            await new Promise(r => setTimeout(r, 1000));
            setPhase('branding');
        };
        sequence();
    }, []);

    // Generate "Decoy" Oranges
    const decoys = Array.from({ length: 30 }).map((_, i) => {
        // Random start positions off-screen
        const edge = Math.floor(Math.random() * 4); // 0:top, 1:right, 2:bottom, 3:left
        let startX = 0, startY = 0;
        const offset = 800; // Distance off screen

        switch (edge) {
            case 0: startX = (Math.random() - 0.5) * 1000; startY = -offset; break;
            case 1: startX = offset; startY = (Math.random() - 0.5) * 1000; break;
            case 2: startX = (Math.random() - 0.5) * 1000; startY = offset; break;
            case 3: startX = -offset; startY = (Math.random() - 0.5) * 1000; break;
        }

        return {
            id: i,
            startX,
            startY,
            endX: (Math.random() - 0.5) * 400, // Clump near center
            endY: (Math.random() - 0.5) * 400,
            size: 40 + Math.random() * 80, // Varied sizes
            delay: Math.random() * 0.5,
            rotation: Math.random() * 720 - 360, // Roll rotation
        };
    });

    return (
        <div className="relative w-full h-[100vh] bg-[#0F0F0F] overflow-hidden flex items-center justify-center perspective-[1500px]">

            {/* Dynamic Background Light */}
            <motion.div
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 bg-radial-gradient from-[#f8b62d]/20 to-transparent pointer-events-none"
            />

            {/* PHASE 1: INVASION & CLIMAX (Decoys) */}
            {(phase === 'invasion' || phase === 'climax') && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {decoys.map((d) => (
                        <motion.div
                            key={d.id}
                            initial={{ x: d.startX, y: d.startY, rotate: 0, scale: 0.5, opacity: 0 }}
                            animate={
                                phase === 'invasion'
                                    ? {
                                        x: d.endX,
                                        y: d.endY,
                                        rotate: d.rotation,
                                        scale: 1,
                                        opacity: 1
                                    }
                                    : { // Climax: Scatter/Explode away (optional) or Fade out
                                        x: d.startX * 1.5, // Fly back out?
                                        y: d.startY * 1.5,
                                        opacity: 0,
                                        scale: 0
                                    }
                            }
                            transition={{
                                duration: phase === 'invasion' ? 1.5 : 0.8,
                                ease: phase === 'invasion' ? "backOut" : "circIn"
                            }}
                            className="absolute rounded-full shadow-lg"
                            style={{
                                width: d.size,
                                height: d.size,
                                background: 'radial-gradient(circle at 30% 30%, #ffcf70, #f8b62d, #a85d00)',
                                boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.3)',
                                zIndex: Math.floor(Math.random() * 10)
                            }}
                        />
                    ))}
                </div>
            )}

            {/* PHASE 2 & 3: THE ONE TRUE ORANGE */}
            {(phase === 'climax' || phase === 'branding') && (
                <motion.div
                    className="relative z-50 flex flex-col items-center justify-center"
                    style={{
                        transformStyle: "preserve-3d",
                        perspective: 1500
                    }}
                >
                    {/* THE SUPER SPHERE */}
                    <motion.div
                        layoutId="main-hero-orange"
                        initial={{ scale: 0, y: 100 }}
                        animate={{
                            scale: phase === 'branding' ? 1 : 1.1,
                            y: 0, // No vertical bounce
                            x: [0, 60, -60, 0], // Roll right, then left, then center
                            rotateZ: [0, 20, -20, 0] // Rotate with the roll
                        }}
                        // Apply 3D Rotation to the CONTAINER, so internal elements rotate with it properly
                        style={{
                            rotateX: phase === 'branding' ? rotateX : 0,
                            rotateY: phase === 'branding' ? rotateY : 0
                        }}
                        transition={{
                            // Main entry
                            scale: { duration: 0.8, ease: "backOut" },
                            // Rolling loop
                            x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                            rotateZ: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* 1. Base 3D Sphere Rendering (CSS Gradients) */}
                        <div className="absolute inset-0 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 35% 35%, #fff0d1 0%, #ffc845 20%, #f8b62d 50%, #d48200 80%, #753b00 100%)',
                                boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6), inset -10px -10px 40px rgba(0,0,0,0.4), inset 10px 10px 40px rgba(255,255,255,0.2)'
                            }}
                        >
                            {/* 2. Texture (Skin Pores) */}
                            <div className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.2) 1px, transparent 1px)',
                                    backgroundSize: '8px 8px',
                                    filter: 'contrast(1.2)'
                                }}
                            />

                            {/* 3. Rim Light (Backlight) */}
                            <div className="absolute inset-0 rounded-full border-[2px] border-white/20 blur-[1px]" />
                        </div>

                        {/* 4. Specular Movement (Follows Mouse Inverse) */}
                        <motion.div
                            style={{ x: highlightX, y: highlightY }}
                            className="absolute top-[20%] left-[20%] w-[25%] h-[20%] bg-white opacity-60 blur-[20px] rounded-full mix-blend-screen"
                        />

                        {/* 5. The Green Leaf (Bouncing/Waving) */}
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: [0, 8, -5, 0] }}
                            transition={{
                                delay: 0.2,
                                duration: 3,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "easeInOut"
                            }}
                            className="absolute -top-12 left-1/2 w-28 h-36 bg-gradient-to-br from-[#6aa354] to-[#2f4a25] rounded-tr-[100%] rounded-bl-[100%] origin-bottom-left shadow-2xl skew-y-3 border-l border-[#ffffff44]"
                        >
                            {/* Leaf Detail */}
                            <div className="absolute inset-0 border-r-2 border-[#ffffff22] rounded-tr-[100%] mix-blend-overlay" />
                        </motion.div>
                    </motion.div>

                    {/* TEXT REVEAL */}
                    {phase === 'branding' && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-[100] pointer-events-none mix-blend-hard-light">
                            {/* Using Hard Light or Difference to make text pop over the orange if it overlaps, though standard placement below is safer */}
                        </div>
                    )}

                    {/* Standard Text Placement (Below) */}
                    {phase === 'branding' && (
                        <div className="mt-12 text-center z-[60]">
                            <motion.h1
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.8, ease: "backOut" }}
                                className="text-6xl md:text-[8rem] leading-none font-black text-white tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                            >
                                ALLRANGE STUDIO
                            </motion.h1>

                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 120 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="h-1 bg-[#f8b62d] mx-auto my-6"
                            />

                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="text-white/90 text-2xl md:text-3xl font-bold tracking-[0.2em]"
                            >
                                樂橙設計工作室
                            </motion.h2>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
}
