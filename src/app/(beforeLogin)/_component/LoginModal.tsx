"use client";

export default function LoginModal() {
  return (
    <div>
      {/* 제목 */}
      <h2 className="text-center text-xl font-bold text-gray-800 mb-2">Letter에 오신 것을 환영합니다!</h2>
      <p className="text-center text-sm text-gray-500 mb-8">소셜 계정으로 간편하게 로그인하세요</p>

      {/* 로그인 버튼들 */}
      <div className="space-y-3">
        {/* 카카오 로그인 */}
        <button className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-[#FEE500] hover:bg-[#FDD835] rounded-lg font-medium text-gray-900 transition">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2.7-.6 2.5-.7 2.9 0 .3.1.6.4.7.2.1.5 0 .7-.1.3-.2 3.5-2.3 4-2.7.5.1 1.1.1 1.7.1 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
          </svg>
          Kakao 로그인
        </button>

        {/* 네이버 로그인 */}
        <button className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-[#03C75A] hover:bg-[#02B350] rounded-lg font-medium text-white transition">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
          </svg>
          네이버 로그인
        </button>
      </div>

      {/* 하단 안내 문구 */}
      <p className="mt-6 text-center text-xs text-gray-400">로그인 시 Letter의 서비스 이용약관에 동의하게 됩니다</p>
    </div>
  );
}
