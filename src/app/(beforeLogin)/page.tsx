import { CarouselPlugin } from "@/components/carousel/Carousel";

export default function Home() {
  return (
    <div>
      <main>
        <div className="w-full justify-center flex p-8">
          <CarouselPlugin />
        </div>
      </main>
    </div>
  );
}
