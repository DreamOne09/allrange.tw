"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HeroLiquid() {
    const [showFinal, setShowFinal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFinal(true);
        }, 2800); // Show final orange slightly before blobs disappear
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full h-[600px] bg-brand-black relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-4 left-4 z-10 bg-brand-black/50 p-2 rounded border border-brand-orange text-brand-orange text-xs">
                OPTION 2: Liquid Morph (Framer Motion)
            </div>

            {/* Gooey Filter Definition */}
            <svg style={{ position: "absolute", width: 0, height: 0 }}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* Animation Container */}
            <div className="relative w-[400px] h-[400px] flex items-center justify-center">
                {/* The Blob Group */}
                <div
                    style={{ filter: "url(#goo)" }}
                    className={`absolute inset-0 w-full h-full transform transition-opacity duration-1000 ${showFinal ? "opacity-0" : "opacity-100"
                        }`}
                >
                    {/* Main Blob (Center) */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: [0.5, 1.2, 1], opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-orange rounded-full"
                    />

                    {/* Orbiter 1 */}
                    <motion.div
                        initial={{ x: -150, y: -100, scale: 0.8 }}
                        animate={{ x: 0, y: 0, scale: 0 }}
                        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
                        className="absolute top-1/2 left-1/2 w-24 h-24 bg-brand-orange rounded-full"
                    />

                    {/* Orbiter 2 */}
                    <motion.div
                        initial={{ x: 150, y: 100, scale: 0.6 }}
                        animate={{ x: 0, y: 0, scale: 0 }}
                        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.4 }}
                        className="absolute top-1/2 left-1/2 w-32 h-32 bg-brand-orange rounded-full"
                    />

                    {/* Orbiter 3 */}
                    <motion.div
                        initial={{ x: 150, y: -50, scale: 0.7 }}
                        animate={{ x: 0, y: 0, scale: 0 }}
                        transition={{ duration: 2.3, ease: "easeInOut", delay: 0.1 }}
                        className="absolute top-1/2 left-1/2 w-20 h-20 bg-brand-orange rounded-full"
                    />
                </div>

                {/* Final Orange Reveal */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 transform ${showFinal ? "scale-100 opacity-100" : "scale-50 opacity-0"
                        }`}
                >
                    {/* Using a custom SVG for a "Design-y" Orange */}
                    <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="45" fill="#f8b62d" />
                        <path d="M50 5 Q55 0 65 10 Q75 5 70 25" fill="#4B6F44" stroke="#4B6F44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="65" cy="35" r="1.5" fill="#fff" opacity="0.6" />
                        <circle cx="35" cy="65" r="2" fill="#d49511" opacity="0.4" />
                        <circle cx="70" cy="60" r="1" fill="#d49511" opacity="0.4" />
                        {/* Texture dots */}
                        <path d="M50 50 L50 95" stroke="#d49511" strokeWidth="0.5" opacity="0.0" />
                    </svg>

                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-brand-orange blur-3xl opacity-20 rounded-full -z-10 animate-pulse"></div>
                </div>
            </div>

            <div className="absolute bottom-20 w-full text-center z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={showFinal ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-2xl font-bold text-white tracking-widest uppercase"
                >
                    Fresh Perspectives
                </motion.h2>
            </div>
        </div>
    );
}
