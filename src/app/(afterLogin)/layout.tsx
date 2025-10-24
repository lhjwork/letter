import { ReactNode } from "react";
// app 라우터의 layout은 기본적으로 서버 컴포넌트이며 async를 붙여 서버에서 데이터를 await할 수 있게 만듬.
// 만약 레이아웃에서 fetch/DB 호출 등을 await하려면 async가 필요
// 반대로 레이아웃을 클라이언트 컴포넌트로 만들면('use client') async를 붙이면 안 됨(클라이언트에서는 async 컴포넌트 불가).

export default async function AfterLoginLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      애프터 로그인 레이아웃
      {children}
    </div>
  );
}
