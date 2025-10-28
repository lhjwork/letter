import { CarouselPlugin } from "@/components/carousel/Carousel";
import { MarqueeDemo } from "@/components/Marquee/Marquee";

export default function Home() {
  return (
    <div>
      <main>
        <div className="w-full justify-center flex p-8">
          <CarouselPlugin />
        </div>
        <div className="w-full justify-center flex px-48 mt-36">
          <MarqueeDemo />
        </div>
      </main>
    </div>
  );
}
