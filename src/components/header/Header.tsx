"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Header = () => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
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

            {/* 우측: 로그인 버튼 */}
            <div className="flex items-center gap-4">
              <DialogTrigger asChild>
                <Button>Login</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </div>
          </div>
        </div>
      </Dialog>
    </header>
  );
};

export default Header;
