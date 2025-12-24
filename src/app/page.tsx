import HeroV1 from "@/components/sections/HeroV1";
import HeroV2 from "@/components/sections/HeroV2";
import HeroV3 from "@/components/sections/HeroV3";
import About from "@/components/sections/About";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <div className="bg-brand-orange text-black font-black text-center py-2 text-xs uppercase tracking-[0.5em] sticky top-0 z-[100]">Variation 1: Classic Exhibition</div>
      <HeroV1 />

      <div className="bg-brand-orange text-black font-black text-center py-2 text-xs uppercase tracking-[0.5em] sticky top-0 z-[100]">Variation 2: Modern Bento</div>
      <HeroV2 />

      <div className="bg-brand-orange text-black font-black text-center py-2 text-xs uppercase tracking-[0.5em] sticky top-0 z-[100]">Variation 3: Dynamic Vision</div>
      <HeroV3 />

      <div className="h-20 bg-black border-t border-brand-gray flex items-center justify-center">
        <p className="text-gray-600 text-[10px] uppercase tracking-widest">End of Hero Variations — Start of Content</p>
      </div>

      <About />
      <PortfolioGrid />
      <Contact />
    </div>
  );
}
