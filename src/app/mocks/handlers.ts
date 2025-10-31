import { http, HttpResponse } from "msw"; // StrictResponse 제거
import { faker } from "@faker-js/faker";

const User = [
  { id: "elonmusk", nickname: "Elon Musk", image: "/yRsRRjGO.jpg" },
  { id: "zerohch0", nickname: "제로초", image: "/5Udwvqim.jpg" },
  { id: "leoturtle", nickname: "레오", image: faker.image.avatar() },
];

// 기본값 추가
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const handlers = [
  http.post(`${baseUrl}/api/login`, () => {
    console.log("로그인");
    return HttpResponse.json(User[1], {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),

  http.post(`${baseUrl}/api/logout`, () => {
    console.log("로그아웃");
    return new HttpResponse(null, {
      headers: {
        "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),

  http.post(`${baseUrl}/api/users`, async ({ request }) => {
    console.log("회원가입");
    return HttpResponse.text(JSON.stringify("ok"), {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),

  // NextAuth 관련 핸들러 - baseUrl 추가
  http.get(`${baseUrl}/api/auth/csrf`, () => {
    return HttpResponse.json({
      csrfToken: "mock-csrf-token",
    });
  }),

  http.get(`${baseUrl}/api/auth/session`, () => {
    // 실제 NextAuth 세션 형태로 수정
    return HttpResponse.json({
      user: {
        id: "mock-user-id",
        name: "테스트 사용자",
        email: "test@naver.com",
        image: "https://ssl.pstatic.net/static/pwe/address/img_profile.png",
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  }),

  // 네이버 로그인 플로우를 단순화
  http.post(`${baseUrl}/api/auth/signin/naver`, () => {
    console.log("네이버 로그인 시작");
    // 직접 성공 세션으로 응답
    return HttpResponse.json({
      ok: true,
      url: `${baseUrl}/?login=success`,
    });
  }),

  // 네이버 콜백 처리
  http.get(`${baseUrl}/api/auth/callback/naver`, () => {
    console.log("네이버 콜백 처리");
    return HttpResponse.redirect(`${baseUrl}/?login=success`, 302);
  }),

  http.post(`${baseUrl}/api/auth/callback/naver`, () => {
    console.log("네이버 콜백 POST");
    return HttpResponse.json({
      user: {
        id: "naver-user-123",
        name: "네이버 사용자",
        email: "user@naver.com",
        image: "https://ssl.pstatic.net/static/pwe/address/img_profile.png",
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  }),

  // NextAuth providers 정보 (선택사항)
  http.get(`${baseUrl}/api/auth/providers`, () => {
    return HttpResponse.json({
      naver: {
        id: "naver",
        name: "Naver",
        type: "oauth",
        signinUrl: `${baseUrl}/api/auth/signin/naver`,
        callbackUrl: `${baseUrl}/api/auth/callback/naver`,
      },
    });
  }),

  // 로그아웃 처리
  http.post(`${baseUrl}/api/auth/signout`, () => {
    console.log("NextAuth 로그아웃");
    return HttpResponse.json({
      url: baseUrl,
    });
  }),
];
