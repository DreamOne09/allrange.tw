'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin, Facebook } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-brand-black relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-2">Get in Touch</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            Let&apos;s Build<br />Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">Awesome.</span>
                        </h3>
                    </motion.div>

                    <motion.div
                        className="mt-8 md:mt-0"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <a
                            href="mailto:claire@allrange.tw"
                            className="group flex items-center space-x-4 bg-white/5 hover:bg-brand-orange px-8 py-4 rounded-full transition-all duration-300"
                        >
                            <span className="text-xl font-bold text-white group-hover:text-black">Start a Project</span>
                            <ArrowRight className="text-brand-orange group-hover:text-black transition-colors" />
                        </a>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-white/10">
                    <div className="space-y-2">
                        <h4 className="text-gray-500 text-sm font-medium uppercase">Email</h4>
                        <a href="mailto:claire@allrange.tw" className="text-xl text-white font-bold hover:text-brand-orange transition-colors block">
                            claire@allrange.tw
                        </a>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-gray-500 text-sm font-medium uppercase">Location</h4>
                        <p className="text-xl text-white font-bold">
                            新竹市金竹路109號
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-gray-500 text-sm font-medium uppercase">Social</h4>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.facebook.com/allrangeslife"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-brand-orange transition-colors flex items-center gap-2 font-bold"
                            >
                                <Facebook size={24} />
                                <span>AllRange Facebook</span>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;
