'use client';

import { motion } from 'framer-motion';
import TiltedCard from '../ui/TiltedCard';

const HeroV2 = () => {
    return (
        <section className="relative min-h-screen bg-brand-black overflow-hidden flex items-center py-20 border-b border-brand-gray">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                {/* Left Side: Text and CTA */}
                <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-center mb-12 xl:mb-0">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase leading-none italic">
                            All<br />
                            <span className="text-brand-orange">Range</span>
                        </h1>
                        <p className="text-2xl text-gray-400 mb-8 font-light max-w-md">
                            Exploring the intersection of exhibition design and spatial identity.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-8 py-3 bg-brand-orange text-black font-bold uppercase tracking-tighter hover:bg-white transition-colors">
                                Get in touch
                            </button>
                            <button className="px-8 py-3 border border-gray-700 text-white font-bold uppercase tracking-tighter hover:bg-white hover:text-black transition-colors">
                                Our Work
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Bento Grid */}
                <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Item 1 - Large */}
                    <motion.div
                        className="md:col-span-2 md:row-span-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <TiltedCard
                            category="Featured"
                            title="Exhibition Design"
                            className="h-full min-h-[400px]"
                        />
                    </motion.div>

                    {/* Item 2 - Orange Color Block */}
                    <motion.div
                        className="bg-brand-orange p-8 flex flex-col justify-end min-h-[200px]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-black font-black text-4xl leading-tight">10+ YEARS EXPERIENCE</h4>
                    </motion.div>

                    {/* Item 3 - Small */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <TiltedCard
                            category="Space"
                            title="Retail"
                            className="h-full min-h-[200px]"
                        />
                    </motion.div>

                    {/* Item 4 - Wide Bottom */}
                    <motion.div
                        className="md:col-span-3 flex bg-brand-gray border border-gray-800 p-6 items-center justify-between"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-black bg-gray-600 flex items-center justify-center text-[10px] text-white">
                                    P{i}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 uppercase tracking-widest hidden md:block">
                            Trusted by industry leaders
                        </p>
                        <div className="text-brand-orange font-mono text-xl">
                            01 / 03
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroV2;
