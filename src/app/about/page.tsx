'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { heroSubset } from '@/data/real_projects';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <div className="container mx-auto px-6 md:px-12">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 border-b border-white/10 pb-12"
                >
                    <h1 className="text-4xl md:text-7xl font-black mb-6">
                        WHO WE ARE
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light">
                        不只是設計師，更是快樂的橙子。<br />
                        我們用策展思維，為每一個空間注入獨特的靈魂。
                    </p>
                </motion.div>


                {/* Profile Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-[3/4] lg:aspect-square bg-zinc-900 rounded-2xl overflow-hidden"
                    >
                        {/* Placeholder for Ade's Photo - using a project image as fallback stylistic choice for now */}
                        <Image
                            src={heroSubset[5].image}
                            alt="Liu Yide Profile"
                            fill
                            className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-8 left-8">
                            <h2 className="text-3xl font-bold text-white mb-1">Liu Yide (Claire)</h2>
                            <p className="text-brand-gold font-bold tracking-widest uppercase">Founder / Creative Director</p>
                        </div>
                    </motion.div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-brand-gold font-bold uppercase tracking-[0.2em] mb-4 text-sm">Philosopy</h3>
                            <h4 className="text-3xl font-bold leading-tight mb-6">
                                觀察需求，滿足要求。<br />
                                掌握底線，耐心溝通。
                            </h4>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                我們的核心價值在於「聆聽」與「轉化」。擁有豐富的展場專案設計、3D繪圖與多媒體影音經驗，
                                讓我們能夠在不同的載體中自由切換，為客戶提供最精準的視覺解決方案。
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                            <div>
                                <span className="block text-4xl font-black text-white mb-2">10+</span>
                                <span className="text-sm text-gray-500 uppercase tracking-widest">Years Experience</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-black text-white mb-2">2034</span>
                                <span className="text-sm text-gray-500 uppercase tracking-widest">Vision Goal</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team / Vision Section */}
                <div className="bg-zinc-900/50 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h3 className="text-brand-gold font-bold uppercase tracking-[0.2em] mb-6">Future Vision</h3>
                        <h2 className="text-3xl md:text-5xl font-black mb-8">
                            打造雲端設計團隊
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            我們的目標是在 2034 年建立一個匯聚各方設計與商業人才的「雲端設計團隊」。
                            打破地域限制，讓創意在雲端自由流動，為每一個專案帶來最頂尖的設計能量。
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
