'use client';

import { motion } from 'framer-motion';
import { Camera, PenTool, Layout, MonitorPlay } from 'lucide-react';

const services = [
    { icon: Layout, label: '展場規劃', desc: 'Exhibition Design' },
    { icon: Camera, label: '空間設計', desc: 'Space Planning' },
    { icon: PenTool, label: '平面視覺', desc: 'Graphic Design' },
    { icon: MonitorPlay, label: '多媒體', desc: 'Multimedia' },
];

const About = () => {
    return (
        <section id="about" className="py-24 bg-brand-black relative overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Header */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-2">關於我們</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-white">
                        樂橙設計 = 阿德 (Claire)
                    </h3>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left: Image Placeholder */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-brand-gray group">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                            <div className="absolute bottom-0 left-0 p-8 z-20">
                                <p className="text-brand-orange font-bold text-lg">Liu Yide / Claire</p>
                                <p className="text-white/60 text-sm">創辦人 暨 創意總監</p>
                            </div>
                            {/* Placeholder text for image */}
                            <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                                <span className="text-white/10 text-6xl font-black rotate-[-15deg]">CLAIRE</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h4 className="text-2xl font-bold text-white mb-6">
                            商業策略 + 設計思維
                        </h4>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            全方位設計師經驗，2004年以來，在平面設計師 / 3D繪圖師 / 室內設計 /多媒體影音 / 展場專案設計 都累積許多工作經驗。<br /><br />
                            <strong className="text-white">成功的祕訣：</strong>觀察需求;滿足要求，掌握底線;耐心溝通。<br /><br />
                            <strong className="text-white">一句話解釋：</strong>出得了公司機關，上得了工地現場。
                        </p>

                        {/* Services Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {services.map((service, index) => (
                                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-brand-orange/50 transition-colors">
                                    <service.icon className="text-brand-orange mb-3" size={24} />
                                    <h5 className="text-white font-bold mb-1">{service.label}</h5>
                                    <p className="text-gray-500 text-xs">{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
