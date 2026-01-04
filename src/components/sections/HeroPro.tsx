'use client';

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroPro() {
    const [phase, setPhase] = useState<'invasion' | 'climax' | 'split' | 'branding'>('invasion');
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Mouse tracking
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

    // Transforms
    const rotateX = useTransform(springY, [-1, 1], [15, -15]);
    const rotateY = useTransform(springX, [-1, 1], [-15, 15]);

    // Sequence
    useEffect(() => {
        const sequence = async () => {
            // 0.0s: Invasion (Rolling in)
            setPhase('invasion');

            // 2.0s: Stop & Center
            await new Promise(r => setTimeout(r, 2000));
            setPhase('climax');

            // 2.5s: SPLIT OPEN
            await new Promise(r => setTimeout(r, 500));
            setPhase('split');

            // 3.5s: Reveal Text
            await new Promise(r => setTimeout(r, 1000));
            setPhase('branding');
        };
        sequence();
    }, []);

    // Decoy Oranges
    const decoys = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        startX: (Math.random() - 0.5) * 1200, // Wide spread
        startY: (Math.random() - 0.5) * 1200,
        endX: (Math.random() - 0.5) * 600,
        endY: (Math.random() - 0.5) * 400,
        size: 20 + Math.random() * 60,
        delay: Math.random() * 0.5
    }));

    // Inner Juicy Face Style (Orange Segment Texture)
    const juicyGradient = `
    radial-gradient(circle at 50% 50%, 
      #fff4d6 0%, 
      #fff4d6 5%, 
      transparent 6%
    ),
    conic-gradient(
      from 0deg at 50% 50%,
      #ff9a00 0deg, #ffb62e 15deg, #fff 16deg, #fff 18deg,
      #ffb62e 19deg, #ff9a00 35deg, #fff 36deg, #fff 38deg,
      #ffb62e 39deg, #ff9a00 55deg, #fff 56deg, #fff 58deg,
      #ffb62e 59deg, #ff9a00 75deg, #fff 76deg, #fff 78deg,
      #ffb62e 79deg, #ff9a00 95deg, #fff 96deg, #fff 98deg,
      #ffb62e 99deg, #ff9a00 115deg, #fff 116deg, #fff 118deg,
      #ffb62e 119deg, #ff9a00 135deg, #fff 136deg, #fff 138deg,
      #ffb62e 139deg, #ff9a00 155deg, #fff 156deg, #fff 158deg,
      #ffb62e 159deg, #ff9a00 175deg, #fff 176deg, #fff 178deg,
      #ffb62e 179deg, #ff9a00 195deg, #fff 196deg, #fff 198deg,
      #ffb62e 199deg, #ff9a00 215deg, #fff 216deg, #fff 218deg,
      #ffb62e 219deg, #ff9a00 235deg, #fff 236deg, #fff 238deg,
      #ffb62e 239deg, #ff9a00 255deg, #fff 256deg, #fff 258deg,
      #ffb62e 259deg, #ff9a00 275deg, #fff 276deg, #fff 278deg,
      #ffb62e 279deg, #ff9a00 295deg, #fff 296deg, #fff 298deg,
      #ffb62e 299deg, #ff9a00 315deg, #fff 316deg, #fff 318deg,
      #ffb62e 319deg, #ff9a00 335deg, #fff 336deg, #fff 338deg,
      #ffb62e 339deg, #ff9a00 360deg
    )
  `;

    return (
        <div className="relative w-full h-[100vh] bg-[#0F0F0F] overflow-hidden flex items-center justify-center perspective-[2000px]">

            {/* Dynamic Background */}
            <motion.div
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 bg-radial-gradient from-[#f8b62d]/10 to-transparent pointer-events-none"
            />

            {/* Decoys (Invasion Phase) */}
            {(phase === 'invasion' || phase === 'climax') && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {decoys.map(d => (
                        <motion.div
                            key={d.id}
                            initial={{ x: d.startX, y: d.startY, opacity: 0, scale: 0 }}
                            animate={phase === 'invasion'
                                ? { x: d.endX, y: d.endY, opacity: 1, scale: 1, rotate: 360 }
                                : { opacity: 0, scale: 0 } // Clear out
                            }
                            transition={{ duration: 1.2, delay: d.delay }}
                            className="absolute rounded-full bg-brand-orange shadow-lg"
                            style={{ width: d.size, height: d.size }}
                        />
                    ))}
                </div>
            )}

            {/* MAIN ORANGE CONTAINER */}
            {(phase === 'climax' || phase === 'split' || phase === 'branding') && (
                <motion.div
                    className="relative z-50 flex flex-col items-center justify-center"
                    style={{
                        transformStyle: "preserve-3d",
                        perspective: 1200,
                        rotateX: phase === 'branding' ? rotateX : 0,
                        rotateY: phase === 'branding' ? rotateY : 0
                    }}
                >
                    {/* 
               THE SPLIT ORANGE: Two halves (Left & Right)
               When Phase >= 'split', they move apart and rotate Y to show inside
            */}

                    <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]" style={{ transformStyle: 'preserve-3d' }}>

                        {/* LEFT HALF */}
                        <motion.div
                            className="absolute top-0 left-0 w-1/2 h-full overflow-hidden origin-right"
                            initial={{ x: -200, opacity: 0 }}
                            animate={{
                                x: phase === 'invasion' ? -200 : 0, // Enters
                                opacity: 1,
                                // Split Logic
                                x: (phase === 'split' || phase === 'branding') ? -80 : 0,
                                rotateY: (phase === 'split' || phase === 'branding') ? -50 : 0
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Outer Skin (Left Half) */}
                            <div className="absolute top-0 left-0 w-[200%] h-full rounded-full bg-brand-orange shadow-[inset_10px_10px_40px_rgba(255,255,255,0.3),inset_-20px_-20px_60px_rgba(0,0,0,0.5)] border-l border-t border-white/20">
                                {/* Texture */}
                                <div className="absolute inset-0 opacity-40 mix-blend-overlay"
                                    style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.2) 1px, transparent 1px)', backgroundSize: '6px 6px' }}
                                />
                            </div>

                            {/* Inner Face (Visible on split) */}
                            <div className="absolute top-0 right-0 w-[20px] h-full bg-[#ffcc80] origin-right transform rotateY(90deg) opacity-0"
                                style={{ opacity: (phase === 'split' || phase === 'branding') ? 1 : 0 }}
                            ></div>
                        </motion.div>


                        {/* RIGHT HALF */}
                        <motion.div
                            className="absolute top-0 right-0 w-1/2 h-full overflow-hidden origin-left"
                            initial={{ x: 200, opacity: 0 }}
                            animate={{
                                x: phase === 'invasion' ? 200 : 0,
                                opacity: 1,
                                // Split Logic
                                x: (phase === 'split' || phase === 'branding') ? 80 : 0,
                                rotateY: (phase === 'split' || phase === 'branding') ? 50 : 0
                            }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Outer Skin (Right Half) */}
                            <div className="absolute top-0 right-0 w-[200%] h-full rounded-full bg-brand-orange shadow-[inset_-10px_10px_40px_rgba(255,255,255,0.3),inset_20px_-20px_60px_rgba(0,0,0,0.5)] border-r border-t border-white/20">
                                {/* Texture */}
                                <div className="absolute inset-0 opacity-40 mix-blend-overlay"
                                    style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.2) 1px, transparent 1px)', backgroundSize: '6px 6px' }}
                                />
                            </div>
                        </motion.div>

                        {/* THE CROSS SECTION FACES (Juicy Inside) */}
                        {/* We fake these as separate discs that appear in the center when splitting */}

                        {/* Left Inner Disc */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{
                                scale: 1,
                                x: (phase === 'split' || phase === 'branding') ? -75 : 0,
                                rotateY: (phase === 'split' || phase === 'branding') ? -50 : 0,
                                opacity: (phase === 'split' || phase === 'branding') ? 1 : 0
                            }}
                            style={{
                                background: juicyGradient,
                                border: '4px solid #fff',
                                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)'
                            }}
                        />
                        {/* Right Inner Disc (offset slightly for 3D depth illusion?) 
                     Actually, simpler: Just show ONE big cross section if we are purely "splitting open".
                     But user wants to "see the cross section".
                     Let's having TWO halves separating revealing the Juicy insides on the faces.
                 */}
                        <motion.div
                            className="absolute top-0 left-1/2 w-[300px] h-[300px] -ml-[150px] md:w-[450px] md:h-[450px] md:-ml-[225px] rounded-full origin-center pointer-events-none"
                            initial={{ opacity: 0, rotateY: 90 }}
                            animate={{
                                // When split, this circle becomes the "Face" of the left or right half
                                // For simplicity, let's just create 2 circles that move with the halves
                            }}
                        />

                        {/* Corrected Approach: Attach Inner Face to Each Half via separate div? 
                    Masking halves is tricky. Let's try 2 Circles moving apart.
                    Circle 1 (Left Half Skin): Clip path polygon(0 0, 50% 0, 50% 100%, 0 100%)
                    Circle 2 (Right Half Skin): Clip path polygon(50% 0, 100% 0, 100% 100%, 50% 100%)
                    Circle 3 (Left Face Juicy): Clip path polygon... but rotated.
                    
                    Simplest High Impact:
                    2 Halves move apart.
                    A "Juicy Center" (sphere or disc) is revealed in the middle? No, "Cross section" implies the cut surface.
                    
                    Let's do:
                    Left Half keeps Outer Skin.
                    Right Half keeps Outer Skin.
                    When they rotate out, we see the "Flat Side".
                    This needs a 3D construct: A semi-cylinder.
                    
                    Framer Motion 3D is limited without Three.js.
                    
                    Cheating:
                    Move halves apart (Left x-80, Right x+80).
                    Rotate Left Y -60deg (Reveals its right side).
                    Rotate Right Y +60deg (Reveals its left side).
                    Place a "Juicy Circle" on the Right side of Left Half.
                    Place a "Juicy Circle" on the Left side of Right Half.
                */}

                        {/* Left Juicy Face */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 w-[280px] h-[280px] -mt-[140px] -ml-[140px] md:w-[420px] md:h-[420px] md:-mt-[210px] md:-ml-[210px] rounded-full backface-visible"
                            initial={{ opacity: 0 }}
                            animate={{
                                x: (phase === 'split' || phase === 'branding') ? -80 : 0,
                                rotateY: (phase === 'split' || phase === 'branding') ? -50 : 0,
                                opacity: (phase === 'split' || phase === 'branding') ? 1 : 0
                            }}
                            style={{
                                background: juicyGradient,
                                border: '6px solid #f8b62d', // Peeling skin rim
                            }}
                        />
                        {/* Right Juicy Face */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 w-[280px] h-[280px] -mt-[140px] -ml-[140px] md:w-[420px] md:h-[420px] md:-mt-[210px] md:-ml-[210px] rounded-full backface-visible"
                            initial={{ opacity: 0 }}
                            animate={{
                                x: (phase === 'split' || phase === 'branding') ? 80 : 0,
                                rotateY: (phase === 'split' || phase === 'branding') ? 50 : 0,
                                opacity: (phase === 'split' || phase === 'branding') ? 1 : 0
                            }}
                            style={{
                                background: juicyGradient,
                                border: '6px solid #f8b62d',
                            }}
                        />

                    </div>

                    {/* TEXT REVEAL (From the middle?) */}
                    {phase === 'branding' && (
                        <div className="absolute mt-20 text-center z-[100]">
                            <motion.h1
                                initial={{ opacity: 0, scale: 0, y: 0 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="text-6xl md:text-[8rem] font-black text-white tracking-tighter drop-shadow-2xl"
                            >
                                ALLRANGE
                            </motion.h1>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 100 }}
                                className="h-2 bg-[#f8b62d] mx-auto my-4"
                            />
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-2xl font-bold tracking-[0.5em] text-white"
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
