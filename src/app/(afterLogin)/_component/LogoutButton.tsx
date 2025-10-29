"use client";

import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const me = {
    id: "zeroncho",
    nickname: "제로초",
    image: "/user-avatar.jpg",
  };

  const onLogout = () => {
    alert("로그아웃 되었습니다!");
  };

  return (
    <Button className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50" onClick={onLogout}>
      <div className="text-sm text-red-600 font-medium">로그아웃</div>
    </Button>
  );
}
