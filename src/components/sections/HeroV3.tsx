'use client';

import { motion } from 'framer-motion';

const HeroV3 = () => {
    return (
        <section className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center py-20">
            {/* Background Mesh Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-orange/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-orange/10 rounded-full blur-[150px]" />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-white/5 rounded-full blur-[100px]" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.3em] mb-12 rounded-full">
                        Curating Spaces Since 2014
                    </span>

                    <h1 className="text-6xl md:text-9xl font-black text-white italic leading-tight mb-8">
                        OBSERVE.<br />
                        SATISFY.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">
                            MASTER.
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl font-light mb-12 tracking-wide uppercase">
                        We create concrete spatial experiences from brand stories.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-5 bg-white text-black font-black uppercase text-xl hover:bg-brand-orange transition-colors duration-500"
                        >
                            Explore Case Studies
                        </motion.button>
                        <a href="#about" className="text-gray-400 uppercase font-bold tracking-widest hover:text-white transition-colors">
                            Who we are —
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Branding */}
            <div className="absolute bottom-12 left-0 w-full px-12 flex justify-between items-end opacity-40">
                <div className="text-left">
                    <p className="text-xs uppercase tracking-tighter">ALLRANGE DESIGN</p>
                    <p className="text-[10px] text-gray-600">© 2025 ALL RIGHTS RESERVED</p>
                </div>
                <div className="rotate-90 origin-bottom-right">
                    <p className="text-xs uppercase tracking-[0.5em] whitespace-nowrap border-b border-gray-800 pb-2">SCROLL TO DISCOVER</p>
                </div>
            </div>
        </section>
    );
};

export default HeroV3;
