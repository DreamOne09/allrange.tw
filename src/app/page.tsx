import HeroV2 from "@/components/sections/HeroV2";
import About from "@/components/sections/About";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Contact from "@/components/sections/Contact";
import HeroParticle from "@/components/sections/HeroParticle";
import HeroLiquid from "@/components/sections/HeroLiquid";
import HeroRive from "@/components/sections/HeroRive"; // Option 3
import HeroPro from "@/components/sections/HeroPro";   // Option 4

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      {/* Existing Hero (keeping as reference or backup) */}
      {/* <HeroV2 /> */}

      {/* Rive Animation (Option 3 - Requested) */}
      <HeroRive />

      {/* Pro Code Fallback (Option 4 - Requested) */}
      <HeroPro />

      {/* Previous Options (Hidden but kept) */}
      {/* <HeroParticle /> */}
      {/* <HeroLiquid /> */}

      {/* Divider */}
      {/* <div className="h-10 bg-brand-gray flex items-center justify-center border-y border-brand-gold/20">
        <span className="text-brand-orange text-xs tracking-widest">OPTION 2 BELOW</span>
      </div> */}


      <div className="h-20 bg-black border-t border-brand-gray flex items-center justify-center">
        <p className="text-gray-600 text-[10px] uppercase tracking-widest">Scroll Down</p>
      </div>

      <About />
      <PortfolioGrid />
      <Contact />
    </div>
  );
}
