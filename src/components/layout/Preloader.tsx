'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const minTimePromise = new Promise(resolve => setTimeout(resolve, 2000));
        const loadPromise = new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve(true);
            } else {
                window.addEventListener('load', () => resolve(true));
            }
        });

        Promise.all([minTimePromise, loadPromise]).then(() => {
            setProgress(100);
            setTimeout(() => setIsLoading(false), 800);
        });

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return prev;
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-none"
                    exit={{
                        opacity: 0,
                        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    <div className="relative flex flex-col items-center justify-center">

                        {/* The Loading Orange (Hero Position Sync) */}
                        <motion.div
                            initial={{ scale: 0.8, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="relative w-[300px] h-[300px] mb-12"
                        >
                            <motion.div
                                className="w-full h-full rounded-full flex items-center justify-center"
                                style={{
                                    background: 'radial-gradient(circle at 35% 35%, #fff 0%, #ffd700 15%, #ffb62e 35%, #ff9a00 60%, #cc7a00 85%, #8a5200 100%)',
                                    boxShadow: '0 20px 80px rgba(255,154,0,0.5)'
                                }}
                            >
                                {/* Percentage inside orange */}
                                <div className="text-white text-6xl font-black italic tracking-tighter">
                                    {progress}%
                                </div>
                                <div className="absolute inset-0 opacity-20 mix-blend-overlay rounded-full" style={{ backgroundImage: 'radial-gradient(black 1.5px, transparent 1.5px)', backgroundSize: '6px 6px' }} />
                                <div className="absolute top-[20%] left-[30%] w-24 h-24 rounded-full bg-white/40 blur-3xl opacity-60" />
                            </motion.div>

                            {/* Orange Leaf */}
                            <div className="absolute -top-10 left-1/2 w-20 h-28 bg-gradient-to-br from-green-400 to-green-700 rounded-tr-[100%] rounded-bl-[100%] border-2 border-green-900 -translate-x-1/2 -rotate-12 opacity-80" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center"
                        >
                            <h2 className="text-brand-gold text-2xl font-black tracking-[1em] mb-2">ALLRANGE</h2>
                            <div className="w-48 h-[2px] bg-white/10 mx-auto relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-brand-orange h-full"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: `${progress - 100}%` }}
                                    transition={{ ease: "linear" }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
