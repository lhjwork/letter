import { CarouselPlugin } from "@/components/carousel/Carousel";
import { MarqueeDemo } from "@/components/Marquee/Marquee";
import { TypingAnimation } from "@/components/ui/typing-animation";

export default function Home() {
  return (
    <div>
      <main>
        <div className="w-full justify-center flex p-8">
          <CarouselPlugin />
        </div>
        <div className="w-full flex flex-col items-center py-16 px-8 bg-gradient-to-b from-background to-muted/20">
          {/* 서브타이틀 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">당신을 위한 편지를 받아보세요</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">소중한 사람에게 마음을 전하는 특별한 방법</p>
          </div>

          {/* 편지지 스타일 */}
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden relative">
            {/* 편지지 구멍 (바인더 효과) */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-red-300"></div>
            <div className="absolute left-6 top-4 w-3 h-3 bg-gray-200 rounded-full border border-gray-300"></div>
            <div className="absolute left-6 top-12 w-3 h-3 bg-gray-200 rounded-full border border-gray-300"></div>
            <div className="absolute left-6 top-20 w-3 h-3 bg-gray-200 rounded-full border border-gray-300"></div>

            {/* 편지지 내용 영역 */}
            <div
              className="pl-16 pr-8 py-12 min-h-[500px] relative"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  transparent,
                  transparent 27px,
                  #e5e7eb 27px,
                  #e5e7eb 28px
                )`,
                backgroundSize: "100% 28px",
              }}
            >
              {/* 편지 헤더 */}
              <div className="mb-8">
                <div className="text-right text-sm text-gray-500 mb-2">2025년 10월 28일</div>
                <div className="text-left text-base text-gray-700 mb-8">소중한 당신에게,</div>
              </div>

              {/* 타이핑 애니메이션 텍스트 */}
              <div className="relative z-10 text-lg leading-7 text-gray-800">
                <TypingAnimation
                  className="text-lg leading-7 font-handwriting"
                  duration={80}
                  showCursor={true}
                  blinkCursor={true}
                  cursorStyle="line"
                  style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    lineHeight: "28px",
                  }}
                >
                  {`안녕하세요! 👋

오늘도 좋은 하루 보내고 계신가요?

이 편지를 통해 마음을 전하고 싶어서
글을 써봅니다.

소중한 당신에게 따뜻한 안부를
전합니다. ✨

언제나 건강하시고 행복하세요.`}
                </TypingAnimation>
              </div>

              {/* 편지 마무리 */}
              <div className="absolute bottom-12 right-8 text-base text-gray-700">
                <div className="text-right mt-16">보내는 사람 올림 💌</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full justify-center flex px-48 mt-36">
          <MarqueeDemo />
        </div>
      </main>
    </div>
  );
}
