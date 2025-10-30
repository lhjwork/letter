"use client";

import { useState, useEffect, useCallback } from "react";
import { faker } from "@faker-js/faker";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface CarouselData {
  id: number;
  title: string;
  order: number;
  image: string;
  url: string;
  nowUsing: boolean;
  description: string;
  marketingCompany: string;
}

export function CarouselPlugin() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Faker.js 시드 고정으로 hydration 오류 방지
  faker.seed(123);

  // Faker.js로 더미 데이터 생성
  const carouselData: CarouselData[] = Array.from({ length: 5 }).map((_, index) => ({
    id: index + 1,
    title: faker.commerce.productName(),
    order: index + 1,
    image: faker.image.urlLoremFlickr({
      width: 800,
      height: 345,
      category: "business",
    }),
    url: faker.internet.url(),
    nowUsing: faker.datatype.boolean(),
    description: faker.lorem.sentence({ min: 8, max: 15 }),
    marketingCompany: faker.company.name(),
  }));

  // Embla Carousel 설정
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 10000, stopOnInteraction: true })]
  );

  // 선택된 슬라이드 인덱스 업데이트
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // 특정 슬라이드로 이동
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  // Embla API 초기화
  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Embla 컨테이너 */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {carouselData.map((data, index) => (
            <div key={data.id} className="flex-[0_0_100%] min-w-0 px-1">
              <div className="relative w-full h-[345px] bg-card rounded-lg border border-border overflow-hidden group">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`rounded-full transition-all ${index === selectedIndex ? "bg-white w-6 h-2" : "bg-gray-400 hover:bg-gray-300 w-2 h-2"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
