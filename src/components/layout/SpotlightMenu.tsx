'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { X } from 'lucide-react';
import { heroSubset } from '@/data/real_projects';

// Define menu items with associated background images from our RealPic subset
const menuItems = [
    {
        id: 0,
        label: '返回首頁',
        eng: 'Home',
        href: '/',
        image: heroSubset[4]?.image || '/allrange.tw/images/placeholders/brand_identity_1.png'
    },
    {
        id: 1,
        label: '關於我們',
        eng: 'About',
        href: '/about',
        image: heroSubset[5]?.image || '/allrange.tw/images/placeholders/office_interior_1.png'
    },
    {
        id: 2,
        label: '精選作品',
        eng: 'Portfolio',
        href: '/work',
        image: heroSubset[0]?.image || '/allrange.tw/images/placeholders/exhibition_design_1.png'
    },
    {
        id: 4,
        label: '聯絡我們',
        eng: 'Contact',
        href: '/contact',
        image: heroSubset[3]?.image || '/allrange.tw/images/placeholders/retail_space_1.png'
    },
];

interface SpotlightMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const SpotlightMenu = ({ isOpen, onClose }: SpotlightMenuProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Default background if none hovered
    const defaultImage = heroSubset[4]?.image;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[9000] bg-black flex flex-col md:flex-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.2 } }}
                >
                    {/* Background Layer */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        {/* Base Dark Overlay */}
                        <div className="absolute inset-0 bg-black/80 z-10" />

                        {/* Dynamic Image Layer */}
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={hoveredIndex !== null ? hoveredIndex : 'default'}
                                src={hoveredIndex !== null ? menuItems[hoveredIndex].image : defaultImage}
                                alt="Menu Background"
                                className="absolute inset-0 w-full h-full object-cover opacity-60"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 0.4, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                            />
                        </AnimatePresence>

                        {/* Noise Texture */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-20" />
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        aria-label="Close Menu"
                        className="absolute top-8 right-8 z-50 p-2 text-white/50 hover:text-brand-orange transition-colors"
                    >
                        <X size={48} />
                    </button>

                    {/* Menu Content */}
                    <div className="relative z-30 flex-1 flex flex-col justify-center px-8 md:px-20 h-full">
                        <nav className="flex flex-col gap-6 md:gap-10">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className="group flex items-baseline gap-4"
                                    >
                                        <span className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/40 to-white/20 group-hover:from-brand-orange group-hover:to-white transition-all duration-500">
                                            {item.label}
                                        </span>
                                        <span className="text-white/40 font-mono text-sm tracking-widest uppercase group-hover:text-brand-orange transition-colors">
                                            {item.eng}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </div>

                    {/* Side Info (Desktop Only) */}
                    <div className="hidden md:flex relative z-30 w-1/3 h-full border-l border-white/10 flex-col justify-end p-12 bg-black/20 backdrop-blur-sm">
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">Location</h4>
                                <p className="text-white/60 leading-relaxed text-xs">
                                    台北市大安區<br />
                                    四維路 100-2 號 3 樓
                                </p>
                            </div>
                            <div>
                                <h4 className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-2">Get in Touch</h4>
                                <p className="text-white/60">
                                    hello@allrange.tw
                                </p>
                            </div>
                        </div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SpotlightMenu;
