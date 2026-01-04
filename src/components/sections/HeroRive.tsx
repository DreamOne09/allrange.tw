'use client';

import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroRive() {
    // 1. 初始化 Rive
    // IMPORTANT: You must export your Rive file as 'le-cheng-hero.riv' and place it in 'public/'
    const { rive, RiveComponent } = useRive({
        src: '/le-cheng-hero.riv', // 你的 Rive 檔案
        stateMachines: 'HeroStateMachine', // Rive 裡的狀態機名稱
        autoplay: true,
        layout: new Layout({
            fit: Fit.Cover, // 關鍵：類似 CSS background-size: cover
            alignment: Alignment.Center,
        }),
    });

    // 2. 獲取 State Machine Inputs (用於 RWD 控制)
    // 假設你在 Rive 裡設了一個名為 "IsMobile" 的 Boolean Input
    const isMobileInput = useStateMachineInput(rive, 'HeroStateMachine', 'IsMobile');

    // 3. 監聽螢幕尺寸並更新 Rive 狀態
    useEffect(() => {
        const handleResize = () => {
            if (isMobileInput) {
                // 如果寬度小於 768px，告訴 Rive 切換到手機佈局
                isMobileInput.value = window.innerWidth < 768;
            }
        };

        // 初始檢查
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileInput, rive]); // Updated dependency array to be safe

    return (
        <div className="relative w-full h-[100vh] bg-[#1A1918] overflow-hidden">
            <div className="absolute top-4 left-4 z-40 bg-brand-black/50 p-2 rounded border border-brand-orange text-brand-orange text-xs pointer-events-none">
                OPTION 3: Rive Animation (Needs /public/le-cheng-hero.riv)
            </div>

            {/* Rive Canvas Layer */}
            <div className="absolute inset-0 z-10 mix-blend-screen"> {/* Applied mix-blend as requested */}
                {/* If no file is present, this will likely be blank or log an error */}
                <RiveComponent className="w-full h-full" />
            </div>

            {/* HTML/CSS Overlay Layer (可選：增加噪點質感) */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.05] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}>
            </div>

            {/* 進入動畫遮罩 (確保 Rive 載入前不白屏) */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute inset-0 bg-[#1A1918] z-30 pointer-events-none"
            />

            {/* Fallback Text if Rive fails to load (User Experience) */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <p className="text-white/10 text-sm">(Rive Animation Placeholder)</p>
            </div>
        </div>
    );
}
