'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Minimum loading time to prevent flashing (1.5s)
        const minTimePromise = new Promise(resolve => setTimeout(resolve, 1500));

        // Real loading event (waits for all images to load)
        const loadPromise = new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve(true);
            } else {
                window.addEventListener('load', () => resolve(true));
            }
        });

        // Wait for both: minimum time AND real content loaded
        Promise.all([minTimePromise, loadPromise]).then(() => {
            // Animate to 100% quickly if not there
            setProgress(100);
            setTimeout(() => setIsLoading(false), 500);
        });

        // Background progress animation (fake 0-99% so user sees activity)
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 99) return prev; // Stall at 99% until loaded
                return prev + 1; // Increment
            });
        }, 15); // Faster smooth increment (15ms * 100 = 1.5s approx to full)

        return () => clearInterval(interval);
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
