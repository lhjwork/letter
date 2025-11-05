"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function LogoutButton() {
  const { data: session } = useSession();

  const onLogout = async () => {
    console.log("[LogoutButton] 로그아웃 시작");
    const res = await signOut({
      redirect: false,
      callbackUrl: "/",
    });
    console.log("[LogoutButton] signOut 응답:", res);

    // 로그아웃 후 홈으로 리다이렉트
    window.location.href = "/";
  };

  return (
    <div className="flex items-center gap-3">
      {/* 사용자 정보 표시 */}
      {session?.user && (
        <Avatar>
          {session.user.image ? <AvatarImage src={session.user.image} alt={session.user.name ?? "User"} /> : null}
          <AvatarFallback>{session.user.name ?? session.user.email ?? "User"}</AvatarFallback>
        </Avatar>
      )}

      {/* 로그아웃 버튼 */}
      <Button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50" onClick={onLogout}>
        <div className="text-sm text-red-600 font-medium">로그아웃</div>
      </Button>
    </div>
  );
}
