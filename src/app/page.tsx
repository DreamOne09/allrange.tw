// import HeroPro from "@/components/sections/HeroPro";
import SelectedBlock from "@/components/sections/SelectedBlock";
import About from "@/components/sections/About";
import HeroBigBang from "@/components/sections/HeroBigBang";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">

      {/* 1. Main Animation: Juice Universe */}
      <HeroBigBang />

      {/* 2. Featured Projects */}
      <SelectedBlock />

      <div className="h-20 bg-black border-t border-brand-gray flex items-center justify-center">
        <p className="text-gray-600 text-[10px] uppercase tracking-widest">Scroll Down</p>
      </div>

      <About />
      {/* Contact is now integrated into Footer */}
    </div>
  );
}
