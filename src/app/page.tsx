import HeroV2 from "@/components/sections/HeroV2";
import HeroV3 from "@/components/sections/HeroV3";
import HeroV4 from "@/components/sections/HeroV4";
import About from "@/components/sections/About";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <HeroV2 />

      {/* HeroV3 (Proposal 2) and HeroV4 (Proposal 3) Removed as requested */}

      <div className="h-20 bg-black border-t border-brand-gray flex items-center justify-center">
        <p className="text-gray-600 text-[10px] uppercase tracking-widest">Scroll Down</p>
      </div>

      <About />
      <PortfolioGrid />
      <Contact />
    </div>
  );
}
