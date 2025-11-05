import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// This configures a Service Worker with the given request handlers.
// setupWorker : 실제 네트워크 요청을 가로채서 모킹된 응답을 반환
// Service Worker가 하는 일:
// 요청 가로채기: 브라우저의 모든 HTTP 요청을 감지
// 매칭 확인: 요청 URL이 handlers에 정의된 패턴과 일치하는지 확인
// 모킹 응답: 일치하면 실제 서버 대신 가짜 데이터 반환
// 실제 요청: 일치하지 않으면 원래 서버로 요청 전달
const worker = setupWorker(...handlers);

export default worker;
