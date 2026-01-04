import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-gold/5 rounded-full blur-[80px]"></div>
            </div>

            <div className="z-10 text-center flex flex-col items-center gap-8 max-w-lg mx-auto">
                {/* Large 404 Text */}
                <div className="relative">
                    <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-brand-orange to-transparent opacity-20 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            Page Not Found
                        </h2>
                    </div>
                </div>

                <p className="text-gray-400 text-lg md:text-xl max-w-md">
                    The page you are looking for seems to have drifted into deep space.
                </p>

                {/* Home Button */}
                <Link
                    href="/"
                    className="group flex items-center gap-2 px-8 py-4 bg-brand-orange text-black font-semibold rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105"
                >
                    <MoveLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span>Return Home</span>
                </Link>
            </div>

            {/* Footer copyright for style */}
            <div className="absolute bottom-8 text-brand-gray text-xs tracking-widest uppercase">
                © AllRange Design
            </div>
        </div>
    );
}
