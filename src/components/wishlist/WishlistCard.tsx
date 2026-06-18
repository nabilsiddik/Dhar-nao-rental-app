// import Image from "next/image";
// import { Star, Trash2, Image as ImageIcon } from "lucide-react";
// import Link from "next/link";

// interface WishlistCardProps {
//   id: string;
//   image?: string;
//   title: string;
//   location: string;
//   rating: number;
//   reviews: number;
//   price: number;
//   onRemove: (id: string) => void;
// }

// const WishlistCard = ({
//   id,
//   image,
//   title,
//   location,
//   rating,
//   reviews,
//   price,
//   onRemove,
// }: WishlistCardProps) => {
//   return (
//     <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/20 transition-all">
//       {/* Thumbnail */}
//       <div className="relative w-full md:w-24 h-24 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
//         {image ? (
//           <Image src={image} alt={title} fill className="object-cover" />
//         ) : (
//           <ImageIcon className="text-gray-400" size={32} />
//         )}
//       </div>

//       {/* Content */}
//       <div className="flex-1 space-y-1 text-center md:text-left">
//         <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
//         <p className="text-gray-500 text-sm">{location}</p>
//         <div className="flex items-center justify-center md:justify-start gap-1">
//           <Star size={14} className="fill-red-500 text-red-500" />
//           <span className="text-sm font-bold text-gray-900">{rating}</span>
//           <span className="text-sm text-gray-400">({reviews} reviews)</span>
//         </div>
//       </div>

//       {/* Price & Actions */}
//       <div className="flex items-center gap-6 shrink-0">
//         <div className="text-right hidden md:block">
//           <p className="text-lg font-bold text-gray-900">
//             ${price}{" "}
//             <span className="text-gray-400 font-medium text-sm">/ day</span>
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           <Link href={`/listing/${id}`}>
//             <button className="bg-gray-100 border border-gray-200 px-5 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-200 transition cursor-pointer">
//               View Details
//             </button>
//           </Link>
//           <button
//             onClick={() => onRemove(id)}
//             className="p-2.5 rounded-xl border border-red-100 text-red-400 hover:bg-red-50 transition-colors cursor-pointer"
//           >
//             <Trash2 size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WishlistCard;

"use client";

import Image from "next/image";
import { Star, Trash2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

interface WishlistCardProps {
  item: any; // The wishlist object from backend
  onRemove: (id: string) => void;
}

const WishlistCard = ({ item, onRemove }: WishlistCardProps) => {
  const t = useTranslations("Wishlist");
  const listing = item?.listing;

  return (
    <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/20 transition-all">
      {/* Thumbnail */}
      <div className="relative w-full md:w-24 h-24 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
        {listing?.images?.[0] ? (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover"
          />
        ) : (
          <ImageIcon className="text-gray-400" size={32} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1 text-center md:text-left">
        <h3 className="font-bold text-gray-900 text-lg">{listing?.title}</h3>
        <p className="text-gray-500 text-sm font-medium">
          {listing?.city}, {listing?.country}
        </p>
        <div className="flex items-center justify-center md:justify-start gap-1">
          <Star size={14} className="fill-red-500 text-red-500" />
          <span className="text-sm font-bold text-gray-900">
            {listing?.avgRating?.toFixed(1) || "0.0"}
          </span>
          <span className="text-sm text-gray-400 font-medium">
            ({listing?.totalReviews || 0} reviews)
          </span>
        </div>
      </div>

      {/* Price & Actions */}
      <div className="flex items-center gap-6 shrink-0">
        <div className="text-right hidden md:block">
          <p className="text-lg font-black text-gray-900">
            ${listing?.basePrice}
            <span className="text-gray-400 font-bold text-sm">
              /{listing?.category === "CAR" ? "day" : "night"}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/listing/${listing?.id}`}>
            <button className="bg-gray-100 border border-gray-100 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-200 transition cursor-pointer active:scale-95">
              {t("viewBtn")}
            </button>
          </Link>
          <button
            onClick={() => onRemove(listing?.id)}
            className="p-2.5 rounded-xl border border-red-100 text-red-400 hover:bg-red-50 transition-colors cursor-pointer active:scale-90"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
