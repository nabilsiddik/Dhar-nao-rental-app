import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { Globe } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Auth",
  description: "Rent hub authentication.",
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between px-10 py-2">
        <div>
          <Link href="/" className="group flex items-center gap-3 transition-transform duration-300 active:scale-95">
                    
                    <div className="flex flex-col -space-y-1">
                      <span className="text-4xl font-black tracking-tighter text-gray-900">
                        Dhar<span className="text-primary">Nao</span>
                      </span>
                      <span className="text-[14px] mt-1 font-bold tracking-[0.2em] text-gray-400 uppercase">Rental Platform</span>
                    </div>
                  </Link>
        </div>
        <div className="flex items-center gap-2">
          <Globe />
          <LanguageSwitcher />
        </div>
      </div>
      {children}
    </div>
  );
}
