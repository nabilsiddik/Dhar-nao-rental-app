// "use client";

// import React, { useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import { toast } from "sonner";
// import WishlistCard from "@/components/wishlist/WishlistCard";

// const DUMMY_WISHLIST = [
//   {
//     id: "1",
//     title: "BMW X5 SUV",
//     location: "Constantine, Algeria",
//     rating: 4.7,
//     reviews: 64,
//     price: 95,
//     image:
//       "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80",
//   },
//   {
//     id: "2",
//     title: "Audi A4 Sedan",
//     location: "Algiers, Algeria",
//     rating: 4.6,
//     reviews: 52,
//     price: 75,
//     image:
//       "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80",
//   },
//   {
//     id: "3",
//     title: "Mercedes-Benz C-Class 2024",
//     location: "Algiers, Algeria",
//     rating: 4.9,
//     reviews: 127,
//     price: 85,
//   },
// ];

// const WishlistClient = () => {
//   const [items, setItems] = useState(DUMMY_WISHLIST);

//   const handleRemove = (id: string) => {
//     console.log("Removing Item from Wishlist:", id);
//     setItems((prev) => prev.filter((item) => item.id !== id));
//     toast.success("Removed from wishlist");
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       <button
//         onClick={() => window.history.back()}
//         className="mb-8 hover:bg-gray-100 p-2 rounded-full transition"
//       >
//         <ArrowLeft size={28} />
//       </button>

//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Wishlist</h1>

//       <div className="space-y-4">
//         {items.map((item) => (
//           <WishlistCard key={item.id} {...item} onRemove={handleRemove} />
//         ))}
//         {items.length === 0 && (
//           <p className="text-center py-20 text-gray-400 font-medium">
//             Your wishlist is empty.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WishlistClient;

"use client";

import React from "react";
import { ArrowLeft, Loader2, HeartOff } from "lucide-react";
import { toast } from "sonner";
import WishlistCard from "@/components/wishlist/WishlistCard";
import {
  useGetMyWishlistQuery,
  useToggleWishlistMutation,
} from "@/redux/features/wishlist/wishlistApi";
import { useTranslations, useLocale } from "next-intl";

const WishlistClient = () => {
  const t = useTranslations("Wishlist");
  // Fetch Data
  const { data, isLoading, isError } = useGetMyWishlistQuery(undefined);
  const [toggleWishlist] = useToggleWishlistMutation();

  const wishlistItems = data?.data || [];

  // Remove Handler
  const handleRemove = async (listingId: string) => {
    const toastId = toast.loading("Removing from wishlist...");
    try {
      await toggleWishlist(listingId).unwrap();
      toast.success("Removed successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to remove item", { id: toastId });
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
          Loading wishlist...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => window.history.back()}
        className="mb-8 hover:bg-gray-100 p-2 rounded-full transition cursor-pointer"
      >
        <ArrowLeft size={28} />
      </button>

      <h1 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">
        {t("title")}
      </h1>

      <div className="space-y-4">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item: any) => (
            <WishlistCard key={item.id} item={item} onRemove={handleRemove} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <HeartOff size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-bold">Your wishlist is empty.</p>
            <p className="text-sm font-medium">
              Items you save will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistClient;
