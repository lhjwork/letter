"use client";

import { useState, useEffect } from "react";

interface CarouselItem {
  id: number;
  content: React.ReactNode;
}

export function CarouselPlugin() {
  const [currentIndex, setCurrentIndex] = useState(1); // 1부터 시작 (복제된 첫 슬라이드 다음)
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const items: CarouselItem[] = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
    content: (
      <div className="w-full h-[345px] bg-card rounded-lg border border-border flex items-center justify-center">
        <span className="text-6xl font-semibold text-foreground">{index + 1}</span>
      </div>
    ),
  }));

  // 무한 루프를 위해 앞뒤에 복제 슬라이드 추가
  const extendedItems = [items[items.length - 1], ...items, items[0]];

  const goToSlide = (index: number) => {
    setCurrentIndex(index + 1);
  };

  // 드래그 시작
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setIsTransitioning(false);
  };

  // 드래그 중
  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  // 드래그 종료
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsTransitioning(true);

    // 50px 이상 드래그하면 슬라이드 변경
    if (translateX > 50) {
      setCurrentIndex((prev) => prev - 1);
    } else if (translateX < -50) {
      setCurrentIndex((prev) => prev + 1);
    }
    setTranslateX(0);
  };

  // 마우스 이벤트
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // 자동 재생
  useEffect(() => {
    if (!isHovered && isTransitioning && !isDragging) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 10000);
      return () => clearInterval(timer);
    }
  }, [isHovered, isTransitioning, isDragging]);

  // 무한 루프 처리
  useEffect(() => {
    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(items.length);
      }, 500);
      setTimeout(() => {
        setIsTransitioning(true);
      }, 550);
    } else if (currentIndex === items.length + 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
      setTimeout(() => {
        setIsTransitioning(true);
      }, 550);
    }
  }, [currentIndex, items.length]);

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 슬라이드 컨테이너 */}
      <div
        className={`flex ${isTransitioning ? "transition-transform duration-500 ease-out" : ""}`}
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {extendedItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="min-w-full px-1">
            {item.content}
          </div>
        ))}
      </div>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${(currentIndex - 1 + items.length) % items.length === index ? "bg-white w-6" : "bg-gray-400 hover:bg-gray-300"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
