import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

// 개발 환경에서만 서버 시작
if (process.env.NODE_ENV !== "production") {
  server.listen({
    onUnhandledRequest: "warn",
  });
  console.log("MSW Node server started");
}
