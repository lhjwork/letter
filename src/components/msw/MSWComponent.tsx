"use client";

import { handlers } from "@/app/mocks/handlers";
import { Suspense, use } from "react";
//   typeof window !== "undefined"; 윈도우가 undefined가 아닌 경우 즉 브라우저일때 임
const mockingEnabledPromise =
  typeof window !== "undefined"
    ? import("@/app/mocks/browser").then(async ({ default: worker }) => {
        if (process.env.NODE_ENV === "production") {
          return;
        }
        //  worker.start 호출하면 msw 가 활성화 됨
        await worker.start({
          // onUnhandledRequest msw 가 처리하지 못한 요청이 있을 때 호출되는 콜백 함수
          onUnhandledRequest(request, print) {
            const url = new URL(request.url);

            // NextAuth 관련 경로는 MSW가 가로채지 않음
            if (url.pathname.startsWith("/api/auth")) {
              return;
            }

            // next가 내부적으로 처리하는 요청이기 때문에 무시
            if (request.url.includes("_next")) {
              return;
            }
            // 기본 동작을 덮어쓰고 경고 메시지를 출력
            print.warning();
          },
        });
        // 중복 등록 방지: 이미 browser.ts에서 핸들러를 전달했다면 중복 등록할 필요 없음
        // worker.use(...handlers);
        // HMR(핫 모듈 리플레이스먼트) 시 워커를 정리(stop)하기 위한 코드입니다. 개발 서버에서 코드 변경 후 워커가 남아있지 않게 함.
        // 문제 = Service Worker(MSW)가 이미 실행 중인데 모듈만 교체되면 이전 워커는 계속 살아있어 같은 요청을 두 번 가로채거나 중복 핸들러가 생김.
        // 그래서 해야 할 일 = 모듈이 교체되기 직전에 현재 워커를 멈추고(new start 시 중복 방지) 정리(cleanup)해야 함.
        // 코드가 하는 일(한 줄씩)

        // (module as any).hot?.dispose(() => { worker.stop(); });
        // HMR로 해당 모듈이 교체되기 전 호출되는 콜백을 등록해서 worker.stop()으로 기존 워커를 정리함.
        // 왜 필요한가?

        // 중복된 응답/핸들러, 콘솔 에러, 메모리 누수 같은 이상 동작을 방지함.
        // 개발 환경에서만 실행하면 되고(프로덕션에선 필요 없음), 안전하게 개발 중에 서비스 워커 재시작을 가능하게 함.
        (module as any).hot?.dispose(() => {
          worker.stop();
        });
        console.log(worker.listHandlers());
      })
    : // 서버(브라우저 아님) 환경에서는 MSW 초기화가 필요 없으니 바로 준비된 상태로 처리하라
      Promise.resolve();

export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  use(mockingEnabledPromise);
  return children;
}
