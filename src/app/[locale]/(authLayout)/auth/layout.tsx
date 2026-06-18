import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { Globe } from "lucide-react";
import { Metadata } from "next";
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
      <div className="absolute top-5 right-5">
        <div className="flex items-center gap-2">
          <Globe />
          <LanguageSwitcher />
        </div>
      </div>
      {children}
    </div>
  );
}
