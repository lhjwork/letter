import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { ReactNode } from "react";

type Props = { children: ReactNode };
export default async function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className="w-full sm:w-11/12 lg:w-4/5 xl:w-3/4 mx-auto">{children}</div>
      <Footer />
    </div>
  );
}

// 주소가 localhost:3001일 때는 children->page.tsx, modal->@modal/default.tsx
// 주소가 localhost:3001/i/flow/login 때는 chldren->i/flow/login/page.tsx, modal->@modal/i/flow/login/page.tsx
