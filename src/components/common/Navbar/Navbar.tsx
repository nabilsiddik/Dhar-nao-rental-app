"use client";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import NavbarActions from "./NavbarActions";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-100 w-full px-5 lg:px-10">
      {/* Subtle top blur layer */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-gray-200/50" />
      
      <div className="max-w-7xl mx-auto relative px-6 h-20 flex items-center justify-between gap-8">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-3 transition-transform duration-300 active:scale-95">
          
          <div className="flex flex-col -space-y-1">
            <span className="text-4xl font-black tracking-tighter text-gray-900">
              Dhar<span className="text-primary">Nao</span>
            </span>
            <span className="text-[14px] mt-1 font-bold tracking-[0.2em] text-gray-400 uppercase">Rental Platform</span>
          </div>
        </Link>

        {/* Actions Container */}
        <div className="flex items-center gap-2">
          <NavbarActions />
        </div>
      </div>
    </header>
  );
};
