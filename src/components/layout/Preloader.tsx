'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading time based on "heavy" content
        // In a real app, this might track actual asset loading, but time-based is smoother for UX
        const duration = 2500; // 2.5 seconds
        const startTime = Date.now();

        const updateProgress = () => {
            const elapsedTime = Date.now() - startTime;
            const newProgress = Math.min(100, Math.round((elapsedTime / duration) * 100));

            setProgress(newProgress);

            if (newProgress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                setTimeout(() => setIsLoading(false), 500);
            }
        };

        requestAnimationFrame(updateProgress);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-none"
                    exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                >
                    <div className="relative">
                        {/* Percentage */}
                        <motion.h1
                            className="text-8xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-600"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {progress}%
                        </motion.h1>

                        {/* Decorative line */}
                        <motion.div
                            className="absolute bottom-4 left-0 h-1 bg-brand-orange"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear" }}
                        />
                    </div>

                    <motion.p
                        className="mt-4 text-brand-orange font-mono text-sm tracking-[0.5em] uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        AllRange Design
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
