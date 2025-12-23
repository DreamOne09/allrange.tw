'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltedCardProps {
    imageSrc?: string;
    title: string;
    category: string;
    className?: string;
}

const TiltedCard: React.FC<TiltedCardProps> = ({ imageSrc, title, category, className }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative w-full aspect-[4/5] rounded-xl bg-brand-gray overflow-hidden cursor-pointer group hover:z-20 ${className}`}
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute inset-0 bg-brand-gray"
            >
                {imageSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#222] to-[#111] flex items-center justify-center">
                        <span className="text-white/20 text-4xl font-bold">IMAGE</span>
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            </div>

            <div
                style={{ transform: "translateZ(80px)" }}
                className="absolute bottom-6 left-6 z-20"
            >
                <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-1">{category}</p>
                <h3 className="text-2xl font-bold text-white group-hover:text-brand-yellow transition-colors">{title}</h3>
            </div>
        </motion.div>
    );
};

export default TiltedCard;
