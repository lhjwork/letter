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
            // next가 내부적으로 처리하는 요청이기 때문에 무시
            if (request.url.includes("_next")) {
              return;
            }
            // 기본 동작을 덮어쓰고 경고 메시지를 출력
            print.warning();
          },
        });
        worker.use(...handlers);
        (module as any).hot?.dispose(() => {
          worker.stop();
        });
        console.log(worker.listHandlers());
      })
    : Promise.resolve();

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
