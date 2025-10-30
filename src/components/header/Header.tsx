"use client";

import React from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import LoginModal from "@/app/(beforeLogin)/_component/LoginModal";
import LogoutButton from "@/app/(afterLogin)/_component/LogoutButton";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { DialogTitle } from "@radix-ui/react-dialog";

const Header = () => {
  return (
    <header className="border-b border-border bg-background">
      <Dialog>
        <div className="w-full">
          <div className="flex items-center justify-between h-16 w-full">
            {/* 좌측: 로고 + 네비게이션 */}
            <div className="flex items-center gap-8">
              {/* 로고 */}
              <Link href="/" className="text-2xl font-bold text-primary">
                LETTER
              </Link>

              {/* 네비게이션 버튼들 */}
              <nav className="hidden sm:flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/update" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Update
                </Link>
              </nav>
            </div>

            <LogoutButton />
            {/* 우측: 로그인 버튼 */}
            <div className="flex items-center gap-4">
              <DialogTrigger asChild>
                <ShimmerButton
                  shimmerColor="#e41e26"
                  shimmerSize="0.1em"
                  background="#fff"
                  className="rounded-lg text-black font-semibold border-none border-gray-200 hover:border-gray-300 transition-colors"
                >
                  Login
                </ShimmerButton>
              </DialogTrigger>
              {/* 로고 */}
              <div>
                <div></div>
              </div>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle className=" text-center text-4xl font-bold text-primary-500">LETTER</DialogTitle>
                </DialogHeader>
                <LoginModal />
              </DialogContent>
            </div>
          </div>
        </div>
      </Dialog>
    </header>
  );
};

export default Header;
