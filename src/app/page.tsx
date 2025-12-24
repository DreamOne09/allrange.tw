import HeroV1 from "@/components/sections/HeroV1";
import HeroV2 from "@/components/sections/HeroV2";
import HeroV3 from "@/components/sections/HeroV3";
import HeroV4 from "@/components/sections/HeroV4";
import About from "@/components/sections/About";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <div className="bg-brand-orange text-black font-black text-center py-2 text-xs uppercase tracking-[0.5em] sticky top-0 z-[100]">方案一：經典策展 (Infinite Scroll)</div>
      <HeroV1 />

      <div className="bg-brand-orange text-black font-black text-center py-2 text-xs uppercase tracking-[0.5em] sticky top-0 z-[100]">方案二：摩登方塊 (Spotlight Reveal)</div>
      <HeroV2 />

      <div className="bg-brand-orange text-black font-black text-center py-2 text-xs uppercase tracking-[0.5em] sticky top-0 z-[100]">方案三：動態視覺 (3D Carousel)</div>
      <HeroV3 />

      <div className="bg-brand-orange text-black font-black text-center py-2 text-xs uppercase tracking-[0.5em] sticky top-0 z-[100]">方案四：靈感藝廊 (Tilted Wall)</div>
      <HeroV4 />

      <div className="h-20 bg-black border-t border-brand-gray flex items-center justify-center">
        <p className="text-gray-600 text-[10px] uppercase tracking-widest">Hero 方案展示結束 — 網站內容開始</p>
      </div>

      <About />
      <PortfolioGrid />
      <Contact />
    </div>
  );
}
