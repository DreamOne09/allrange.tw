'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, ArrowUpRight } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20 flex flex-col justify-center">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">

                    {/* Left: Heading & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                            Let's Create <br />
                            <span className="text-brand-gold">Something Extraordinary.</span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-12 max-w-lg">
                            準備好開始您的下一個專案了嗎？或者只是想聊聊設計？
                            隨時歡迎與我們聯繫。
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-full bg-white/5 group-hover:bg-brand-gold transition-colors duration-300">
                                    <Mail className="text-white group-hover:text-black" size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email</h4>
                                    <a href="mailto:claire@allrange.tw" className="text-2xl font-bold text-white hover:text-brand-gold transition-colors">
                                        claire@allrange.tw
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-full bg-white/5 group-hover:bg-brand-gold transition-colors duration-300">
                                    <MapPin className="text-white group-hover:text-black" size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Studio</h4>
                                    <p className="text-xl font-bold text-white">
                                        新竹市金竹路109號
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 rounded-full bg-white/5 group-hover:bg-brand-gold transition-colors duration-300">
                                    <Facebook className="text-white group-hover:text-black" size={20} />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Social</h4>
                                    <a href="https://www.facebook.com/allrangeslife" target="_blank" className="text-xl font-bold text-white hover:text-brand-gold transition-colors flex items-center gap-2">
                                        AllRange 粉絲專頁 <ArrowUpRight size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Map or Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[400px] lg:h-auto bg-zinc-900 rounded-3xl overflow-hidden border border-white/10"
                    >
                        {/* Simple visual map placeholder since we don't have a real map API key handy, stylized map vibe */}
                        <div className="absolute inset-0 bg-[#111] flex items-center justify-center group">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px]" />
                            <div className="w-4 h-4 rounded-full bg-brand-gold animate-pulse relative z-10 box-content border-4 border-brand-gold/30"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full mb-4 px-4 py-2 bg-white text-black font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                We are here!
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
