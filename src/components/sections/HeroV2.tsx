'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: "台北 101 觀景台博覽會",
        category: "展場設計",
        year: "2024",
        color: "from-brand-orange to-red-900",
        image: "/allrange.tw/images/placeholders/exhibition_design_1.png"
    },
    {
        id: 2,
        title: "Lexus 品牌概念店",
        category: "空間規劃",
        year: "2023",
        color: "from-blue-900 to-black",
        image: "/allrange.tw/images/placeholders/retail_space_1.png"
    },
    {
        id: 3,
        title: "故宮博物院 - 數位典藏",
        category: "多媒體互動",
        year: "2023",
        color: "from-emerald-900 to-black",
        image: "/allrange.tw/images/placeholders/museum_display_1.png"
    },
    {
        id: 4,
        title: "Nike 旗艦店 - 沉浸式體驗",
        category: "零售設計",
        year: "2022",
        color: "from-purple-900 to-black",
        image: "/allrange.tw/images/placeholders/event_stage_1.png"
    }
];

const HeroV2 = () => {
    const [activeProject, setActiveProject] = useState(projects[0]);

    return (
        <section className="relative h-screen bg-brand-black flex items-center overflow-hidden border-b border-white/10">
            {/* Dynamic Background */}
            <div className="absolute inset-0 transition-colors duration-700 ease-in-out bg-black">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeProject.id === project.id ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90 mix-blend-multiply`} />
                        <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                    </div>
                ))}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Dynamic Content */}
                <div className="hidden lg:block space-y-8">
                    <motion.div
                        key={activeProject.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-brand-orange text-sm font-bold tracking-[0.3em] uppercase mb-4">
                            精選作品 / {activeProject.year}
                        </p>
                        <h2 className="text-5xl font-black text-white mb-6 leading-tight">
                            {activeProject.title}
                        </h2>
                        <a href="#portfolio" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
                            <span className="uppercase tracking-widest text-sm">查看案例</span>
                            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>

                {/* Right: Interactive List */}
                <div className="flex flex-col">
                    <p className="text-white/40 mb-8 uppercase tracking-widest text-xs font-bold pl-4 border-l border-white/20">
                        特色專案
                    </p>
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            className="relative border-t border-white/20 py-8 pl-4 cursor-pointer group transition-all duration-300 hover:pl-8 hover:bg-white/5"
                            onHoverStart={() => setActiveProject(project)}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex justify-between items-baseline min-w-0">
                                <h3 className={`text-2xl md:text-4xl font-bold transition-all duration-300 ${activeProject.id === project.id ? 'text-white translate-x-2' : 'text-white/40'
                                    }`}>
                                    {project.title}
                                </h3>
                                <span className="text-sm text-brand-orange font-mono opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                                    {project.category}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                    <div className="border-t border-white/20" />
                </div>
            </div>
        </section>
    );
};

export default HeroV2;
