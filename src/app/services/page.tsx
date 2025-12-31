'use client';

import { motion } from 'framer-motion';
import { Layout, Camera, PenTool, MonitorPlay } from 'lucide-react';

const services = [
    {
        id: '01',
        title: '展場規劃',
        eng: 'Exhibition Design',
        icon: Layout,
        desc: '從動線規劃到視覺呈現，我們打造引人入勝的展示空間，讓參觀者沉浸在品牌故事中。',
        tags: ['博覽會設計', '快閃店', '博物館展示']
    },
    {
        id: '02',
        title: '空間設計',
        eng: 'Space Planning',
        icon: Camera,
        desc: '結合美學與機能，為商業空間與辦公環境創造獨特的氛圍體驗，提升品牌價值。',
        tags: ['商業空間', '辦公室設計', '接待中心']
    },
    {
        id: '03',
        title: '平面視覺',
        eng: 'Graphic Design',
        icon: PenTool,
        desc: '精準的視覺語言，傳遞品牌核心價值。從品牌識別到活動主視覺，我們提供完整的平面解決方案。',
        tags: ['品牌識別', '活動主視覺', '包裝設計']
    },
    {
        id: '04',
        title: '多媒體互動',
        eng: 'Multimedia',
        icon: MonitorPlay,
        desc: '整合數位科技與實體空間，創造互動式的感官體驗，讓設計不再靜止。',
        tags: ['互動牆', '數位看板', '動態影像']
    }
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-20">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 text-center"
                >
                    <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-sm block mb-4">
                        What We Do
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        專業服務項目
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, idx) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group p-8 md:p-12 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-brand-gold/50 transition-all duration-500 hover:bg-zinc-900"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-brand-gold text-brand-gold group-hover:text-black transition-colors duration-300">
                                    <service.icon size={32} />
                                </div>
                                <span className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                                    {service.id}
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                            <p className="text-brand-gold/80 font-mono text-sm uppercase tracking-wider mb-6">{service.eng}</p>

                            <p className="text-gray-400 leading-relaxed mb-8">
                                {service.desc}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {service.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/60 border border-white/5">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
