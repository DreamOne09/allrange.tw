import HeroPro from "@/components/sections/HeroPro";
import SelectedBlock from "@/components/sections/SelectedBlock";
import About from "@/components/sections/About";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">

      {/* 1. Main Animation: Fluid Convergence (Option 4 Refined) */}
      <HeroPro />

      {/* 2. Featured Projects (Selected Block - Repurposed HeroV2) */}
      <SelectedBlock />

      <div className="h-20 bg-black border-t border-brand-gray flex items-center justify-center">
        <p className="text-gray-600 text-[10px] uppercase tracking-widest">Scroll Down</p>
      </div>

      <About />
      <PortfolioGrid />
      {/* Contact is now integrated into Footer */}
    </div>
  );
}
