import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import "./globals.css";
import { MSWProvider } from "@/components/msw/MSWComponent";

dayjs.locale("ko");
dayjs.extend(relativeTime);
if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NODE_ENV !== "production") {
  import("@/app/mocks/http").then(({ server }) => {
    server.listen();
  });
}

// Red Hat Display 폰트 로드 - 모든 weight 포함
const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-red-hat-display",
});

export const metadata: Metadata = {
  title: "Letter - 편지로 마음을 전하다",
  description: "편지로 마음을 전하는 특별한 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={redHatDisplay.className}>
      <body>
        <div className="w-full sm:w-11/12 lg:w-4/5 xl:w-3/4 mx-auto">
          <MSWProvider>{children}</MSWProvider>
        </div>
      </body>
    </html>
  );
}
