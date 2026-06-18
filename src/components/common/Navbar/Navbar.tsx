// "use client";
// import Link from "next/link";
// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import Image from "next/image";
// import { LuHouse } from "react-icons/lu";
// import NavbarActions from "./NavbarActions";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "@/redux/features/auth/authSlice";
// import { useTranslations, useLocale } from "next-intl";

// export const Navbar = () => {
//   const t = useTranslations("Navbar");
//   const locale = useLocale();
//   const user = useSelector(selectCurrentUser);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const currentCategory = searchParams.get("category") || "";
//   const pathname = usePathname();

//   const handleCategoryChange = (category: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("category", category);
//     router.push(`${pathname}?${params.toString()}`);
//   };

//   const categories = [
//     { name: t("Category.cars"), value: "CAR", icon: "/car.png" },
//     {
//       name: t("Category.apartments"),
//       value: "APARTMENT",
//       icon: "/apatmaint.png",
//     },
//   ];

//   return (
//     <header className="sticky top-0 z-50 w-full bg-[#F6F6F6] border-b border-gray-100 py-5">
//       <div className="max-w-7xl mx-auto flex items-center justify-between p-4 gap-4">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2 shrink-0">
//           <div className="flex items-center gap-2 shrink-0">
//             <div className="bg-primary p-2 rounded-xl text-white">
//               <LuHouse size={24} />
//             </div>
//             <span className="text-2xl font-bold tracking-tight hidden sm:block">
//               Rent<span className="font-light">Hub</span>
//             </span>
//           </div>
//         </Link>

//         {/* Category Toggle (Figma Style) */}
//         <div className="bg-white p-1.5 rounded-full flex shadow-sm border border-gray-100">
//           {categories?.map((cat) => (
//             <button
//               key={cat.value}
//               onClick={() => handleCategoryChange(cat.value)}
//               className={`cursor-pointer flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
//                 currentCategory === cat.value
//                   ? " border border-primary shadow-md shadow-primary/20"
//                   : "bg-white text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               <Image src={cat.icon} alt="" width={20} height={20} />
//               {cat.name}
//             </button>
//           ))}
//         </div>

//         {/* Action Icons */}
//         <NavbarActions />
//       </div>
//     </header>
//   );
// };


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
      
      <div className="relative px-6 h-20 flex items-center justify-between gap-8">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-3 transition-transform duration-300 active:scale-95">
          <div>
            <Image src={'/logo.png'} width={50} height={50} alt="Logo"/>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-4xl font-black tracking-tighter text-gray-900">
              Dhar<span className="text-primary">Nao</span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">Rental Platform</span>
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
