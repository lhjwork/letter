export { auth as middleware } from "@/auth";

// 로그인을 해야만 접근 가능
export const config = {
  matcher: ["/my/:path*", "/write"],
};
