import { Facebook, Mail, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-gray pt-24 pb-8 border-t border-white/5">
            <div className="container mx-auto px-6">

                {/* CTA Section (Merged from Contact) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
                    <div>
                        <h2 className="text-sm font-bold text-brand-orange uppercase tracking-widest mb-2">聯絡我們</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            讓我們一起<br />創造 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">不凡體驗</span>
                        </h3>
                    </div>

                    <div className="mt-8 md:mt-0">
                        <a
                            href="mailto:claire@allrange.tw"
                            className="group flex items-center space-x-4 bg-white/5 hover:bg-brand-orange px-8 py-4 rounded-full transition-all duration-300"
                        >
                            <span className="text-xl font-bold text-white group-hover:text-black">開始專案</span>
                            <ArrowRight className="text-brand-orange group-hover:text-black transition-colors" />
                        </a>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-white/10">
                    <div className="space-y-2">
                        <h4 className="text-gray-500 text-sm font-medium uppercase">電子郵件</h4>
                        <a href="mailto:claire@allrange.tw" className="text-xl text-white font-bold hover:text-brand-orange transition-colors block">
                            claire@allrange.tw
                        </a>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-gray-500 text-sm font-medium uppercase">地址</h4>
                        <p className="text-xl text-white font-bold">
                            新竹市金竹路109號
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-gray-500 text-sm font-medium uppercase">社群媒體</h4>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.facebook.com/allrangeslife"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-brand-orange transition-colors flex items-center gap-2 font-bold"
                            >
                                <Facebook size={24} />
                                <span>AllRange 粉絲專頁</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center text-xs text-gray-600 mt-8 pt-8 border-t border-white/5">
                    &copy; {new Date().getFullYear()} AllRange Design. 版權所有.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
