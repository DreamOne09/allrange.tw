import HeroV2 from "@/components/sections/HeroV2";
import About from "@/components/sections/About";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Contact from "@/components/sections/Contact";
import HeroParticle from "@/components/sections/HeroParticle";
import HeroLiquid from "@/components/sections/HeroLiquid";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Existing Hero (keeping as reference or backup) */}
      {/* <HeroV2 /> */}

      {/* New Option 1 */}
      <HeroParticle />

      {/* Divider */}
      <div className="h-10 bg-brand-gray flex items-center justify-center border-y border-brand-gold/20">
        <span className="text-brand-orange text-xs tracking-widest">OPTION 2 BELOW</span>
      </div>

      {/* New Option 2 */}
      <HeroLiquid />

      <div className="h-20 bg-black border-t border-brand-gray flex items-center justify-center">
        <p className="text-gray-600 text-[10px] uppercase tracking-widest">Scroll Down</p>
      </div>

      <About />
      <PortfolioGrid />
      <Contact />
    </div>
  );
}
