'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu } from 'lucide-react';
import SpotlightMenu from './SpotlightMenu';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/" className="relative z-50">
                        <span className="text-2xl font-black text-white tracking-widest">
                            ALL<span className="text-brand-gold">RANGE</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-8">
                        {/* Desktop Direct Links */}
                        <div className="hidden md:flex items-center gap-10">
                            <Link href="/" className="text-sm font-bold tracking-[0.15em] text-white hover:text-brand-gold transition-colors">
                                首頁
                            </Link>
                            <Link href="/work" className="text-sm font-bold tracking-[0.15em] text-white hover:text-brand-gold transition-colors">
                                精選作品
                            </Link>
                            <Link href="/about" className="text-sm font-bold tracking-[0.15em] text-white hover:text-brand-gold transition-colors">
                                關於我們
                            </Link>
                            <Link href="/services" className="text-sm font-bold tracking-[0.15em] text-white hover:text-brand-gold transition-colors">
                                服務項目
                            </Link>
                            <Link href="/contact" className="text-sm font-bold tracking-[0.15em] text-white hover:text-brand-gold transition-colors">
                                聯絡我們
                            </Link>
                        </div>

                        {/* Mobile Menu Trigger */}
                        <button
                            onClick={() => setIsOpen(true)}
                            aria-label="Open Menu"
                            className="md:hidden flex items-center gap-3 text-white hover:text-brand-gold transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-brand-gold/10 group-hover:border-brand-gold/50 transition-all">
                                <Menu size={20} />
                            </div>
                        </button>

                    </div>
                </div>
            </motion.nav>

            <SpotlightMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export default Navbar;
