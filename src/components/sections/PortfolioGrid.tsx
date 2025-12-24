'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
    { id: 'all', label: '全部作品' },
    { id: 'exhibition', label: '展場設計' },
    { id: 'space', label: '空間規劃' },
    { id: 'graphic', label: '平面視覺' },
];

const projects = [
    { id: 1, title: '台北 101 觀景台博覽會', category: 'exhibition', image: '' },
    { id: 2, title: '渴望會館 - 遊戲室', category: 'space', image: '' },
    { id: 3, title: '勤美鑄鐵', category: 'space', image: '' },
    { id: 4, title: '裕隆汽車 - 育苗', category: 'exhibition', image: '' },
    { id: 5, title: '品牌視覺識別', category: 'graphic', image: '' },
    { id: 6, title: '蕭如松藝術節', category: 'exhibition', image: '' },
];

const PortfolioGrid = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProjects = projects.filter(
        (project) => activeCategory === 'all' || project.category === activeCategory
    );

    return (
        <section id="portfolio" className="py-24 bg-[#050505]">
            <div className="container mx-auto px-6">

                {/* Header & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <h2 className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-2">精選作品</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-white">Selected Works</h3>
                    </div>

                    <div className="flex space-x-2 mt-8 md:mt-0 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat.id
                                    ? 'bg-brand-orange text-black'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative aspect-video bg-brand-gray rounded-xl overflow-hidden cursor-pointer"
                            >
                                {/* Image Placeholder */}
                                <div className="w-full h-full bg-[#111] flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                    <span className="text-white/10 font-black text-4xl">{project.title.charAt(0)}</span>
                                </div>

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                    <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-1">
                                        {categories.find(c => c.id === project.category)?.label}
                                    </p>
                                    <h4 className="text-white text-xl font-bold">{project.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
};

export default PortfolioGrid;
