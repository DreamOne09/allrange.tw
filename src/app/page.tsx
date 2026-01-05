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

      <About />
      {/* Contact is now integrated into Footer */}
    </div>
  );
}
