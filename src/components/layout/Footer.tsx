import { Facebook, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-gray py-12 border-t border-white/5">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Brand */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">
                        AllRange<span className="text-brand-orange">.</span>
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        我們是快樂的橙子。<br />
                        用策展思維打造空間，專注於細節與使用者體驗。
                    </p>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">聯絡我們</h4>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li className="flex items-center hover:text-brand-orange transition-colors">
                            <Mail size={18} className="mr-3 text-brand-orange" />
                            <a href="mailto:claire@allrange.tw">claire@allrange.tw</a>
                        </li>
                        <li className="flex items-center hover:text-brand-orange transition-colors">
                            <MapPin size={18} className="mr-3 text-brand-orange" />
                            <span>新竹市金竹路109號</span>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">關注我們</h4>
                    <div className="flex space-x-4">
                        <a
                            href="https://www.facebook.com/allrangeslife"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-black transition-all duration-300"
                        >
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
                &copy; {new Date().getFullYear()} AllRange Design. 版權所有.
            </div>
        </footer>
    );
};

export default Footer;
