'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { realProjects } from '@/data/real_projects';

// The 9 requested projects + fillers if needed
const selectedProjects = [
    realProjects.find(p => p.id === 'real-10'), // Yulon
    realProjects.find(p => p.id === 'real-02'), // CMP
    realProjects.find(p => p.id === 'real-03'), // Broadsims
    realProjects.find(p => p.id === 'real-04'), // Ji-Bao
    realProjects.find(p => p.id === 'real-05'), // Shui-She
    realProjects.find(p => p.id === 'real-06'), // Lydia
    realProjects.find(p => p.id === 'real-07'), // Yi-Hong
    realProjects.find(p => p.id === 'real-08'), // You-Cheng
    realProjects.find(p => p.id === 'real-09'), // Hsinchu EPA
].filter(Boolean) as typeof realProjects;

const items = selectedProjects.map((project, i) => ({
    id: i,
    // varied sizes for "masonry" feel
    span: i === 0 || i === 3 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1',
    height: i === 0 || i === 3 ? 'h-[500px]' : 'h-[240px]',
    image: project.image,
    title: project.title,
    category: project.category
}));

export default function WorkPage() {
    return (
        <div className="min-h-screen bg-black pt-24 pb-20 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <span className="text-brand-gold font-bold tracking-[0.4em] uppercase text-sm block mb-4">
                        Featured Works
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                        精選作品
                    </h1>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-min">
                    {items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className={`${item.span} relative rounded-2xl overflow-hidden group border border-white/10 bg-zinc-900 ${item.height} min-h-[200px]`}
                        >
                            <Image
                                src={item.image}
                                alt="Project"
                                fill
                                className="object-cover transition-transform duration-700" // No hover scale
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />

                            {/* Always visible gradient for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block mb-1">
                                    {item.category}
                                </span>
                                <h3 className="text-white font-bold text-xl md:text-2xl leading-tight">
                                    {item.title}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
