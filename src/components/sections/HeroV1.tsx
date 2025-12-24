'use client';

import { motion } from 'framer-motion';
import TiltedCard from '../ui/TiltedCard';

const HeroV1 = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center">

                {/* Left Content: Typography */}
                <div className="w-full lg:w-1/2 mb-16 lg:mb-0 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-brand-orange font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
                            We are Happy Oranges
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8">
                            用策展思維<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                打造空間
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-light">
                            Observe. Satisfy. Master. Communicate.<br />
                            我們是樂橙設計，專注於將品牌故事轉化為具體的空間體驗。
                        </p>

                        <a
                            href="#contact"
                            className="inline-block px-8 py-4 bg-brand-orange text-black font-bold text-lg rounded-full hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,140,0,0.3)]"
                        >
                            Start a Project
                        </a>
                    </motion.div>
                </div>

                {/* Right Content: Tilted Grid */}
                <div className="w-full lg:w-1/2 relative h-[600px] lg:h-[800px] flex justify-center items-center perspective-[2000px]">
                    {/* We rotate the entire container slightly to give that 'off-axis' look from the reference */}
                    <motion.div
                        className="grid grid-cols-2 gap-6 w-full max-w-lg"
                        initial={{ rotate: 12, opacity: 0 }}
                        animate={{ rotate: 12, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {/* Card 1 */}
                        <motion.div
                            className="mt-12"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <TiltedCard
                                category="Exhibition"
                                title="Taipei 101"
                                imageSrc=""
                                className="h-64 md:h-80 shadow-2xl"
                            />
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            className="-mb-12"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <TiltedCard
                                category="Space"
                                title="Aspire Resort"
                                imageSrc=""
                                className="h-64 md:h-80 shadow-2xl"
                            />
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            className="mt-8"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <TiltedCard
                                category="Identity"
                                title="Brand Vision"
                                imageSrc=""
                                className="h-64 md:h-80 shadow-2xl"
                            />
                        </motion.div>

                        {/* Card 4 */}
                        <motion.div
                            className="-mt-8"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                        >
                            <TiltedCard
                                category="Product"
                                title="Showroom"
                                imageSrc=""
                                className="h-64 md:h-80 shadow-2xl"
                            />
                        </motion.div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroV1;
