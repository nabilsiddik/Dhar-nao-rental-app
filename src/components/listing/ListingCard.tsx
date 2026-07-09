// import React from "react";
// import Image from "next/image";
// import { Star } from "lucide-react";
// import Link from "next/link";

// interface ListingCardProps {
//   id: string;
//   images: string[];
//   title: string;
//   city: string;
//   country: string;
//   location: string;
//   basePrice: number;
//   category: string;
//   avgRating: number;
//   totalReviews: number;
//   guests: string | number;
//   startDate: string;
// }

// const ListingCard: React.FC<ListingCardProps> = ({
//   id,
//   images,
//   title,
//   city,
//   country,
//   location,
//   basePrice,
//   category,
//   avgRating,
//   totalReviews,
//   guests,
//   startDate,
// }) => {
//   return (
//     <Link
//       href={`/listing/${id}?guests=${guests}${startDate && `&startDate=${startDate}`}`}
//     >
//       <div className="group cursor-pointer flex flex-col gap-2">
//         {/* Image Container */}
//         <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
//           <Image
//             src={images[0] || "/listing-image.png"} // Assuming images is an array, use the first image
//             alt={title}
//             fill
//             className="object-cover transition group-hover:scale-105"
//           />
//         </div>

//         {/* Content */}
//         <div className="flex flex-col gap-0.5">
//           <h3 className="font-semibold text-gray-900 text-base truncate">
//             {title}
//           </h3>
//           <p className="text-gray-500 text-sm">
//             {city}, {country}
//           </p>

//           <div className="flex items-center gap-1 mt-0.5">
//             <span className="font-semibold text-gray-900">
//               ${basePrice.toFixed(2)}
//             </span>
//             <span className="text-gray-500 text-sm">/day</span>

//             <div className="flex items-center gap-1 ml-auto">
//               <Star size={14} className="fill-yellow-400 text-yellow-400" />
//               <span className="text-sm font-medium text-gray-900">
//                 {avgRating?.toFixed(1)}
//               </span>
//               <span className="text-sm text-gray-400">({totalReviews})</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ListingCard;





"use client";
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

interface ListingProps {
  title: string;
  type: string;
  category: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  rating: number;
  images: string[];
  hostImage: string;
  isFeatured?: boolean;
  isVerified?: boolean;
}

const ListingCard = ({listing}: {
  listing: any
}) => {

  console.log(listing, 'listing');

  return (
    <Link target='_blank' href={`/listing/${listing?.id}`}>
      <div className="group cursor-pointer flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-3">
        
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="h-full w-full"
          loop={true}
        >
          {listing?.images?.map((img: string, index: number) => (
            <SwiperSlide key={index}>
              <img 
                src={img} 
                alt={`${listing?.title} - ${index}`} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </SwiperSlide>
          ))}

          <button className="swiper-button-prev-custom absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-1.5 rounded-full shadow-md hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ChevronLeft size={18} className="text-slate-800" />
          </button>
          <button className="swiper-button-next-custom absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-1.5 rounded-full shadow-md hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ChevronRight size={18} className="text-slate-800" />
          </button>
        </Swiper>
        
        {true && (
          <div className="absolute top-4 left-[-32px] bg-[#d97706]/90 text-white text-[9px] font-bold px-10 py-1 uppercase tracking-wider -rotate-45 z-20 shadow-sm">
            {listing?.category}
          </div>
        )}
{/* 
        {true && (
          <div className="absolute top-3 right-3 bg-[#f97316] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-md uppercase z-20">
            Verified
          </div>
        )} */}

        {/* <div className="absolute bottom-3 left-3 z-20">
          <img src={hostImage} alt="Host" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-xl" />
        </div> */}

        <button className="absolute bottom-3 right-3 text-white/50 hover:text-red-500 transition-colors z-20">
          <Heart size={24} fill="currentColor" className="stroke-white stroke-[1.5]" />
        </button>

        <style jsx global>{`
          .swiper-pagination-bullet { background: white !important; opacity: 0.6; }
          .swiper-pagination-bullet-active { opacity: 1; }
        `}</style>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-0.5">
          <h3 className="font-bold text-slate-800 text-[16px] leading-tight truncate">{listing?.title}</h3>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-slate-800 text-slate-800" />
            <span className="text-sm font-bold">{listing?.avgRating?.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-[13px] text-slate-500">
          {listing?.city} - {listing?.country}
        </p>

        {listing?.apartmentDetails?.amenities && 
           <div className="flex items-center gap-2">
            {listing?.apartmentDetails?.amenities?.slice(0,3).map((amenity: string, index: number) => (
              <span key={index} className="text-[13px] text-slate-500 mb-2 flex">
                   {amenity}
              </span>
           ))}
           </div>
        }

        {listing?.carDetails && 
           <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-2">
            <span>{listing?.carDetails?.cartType}</span>
            <span>-</span>
            <span>{listing?.carDetails?.model}</span>
            <span>-</span>
            <span>{listing?.carDetails?.seats} Seats</span>
           </div>
        }

        <p className="text-[13px] text-slate-500 font-medium leading-normal">
          {listing?.category}
        </p>

        {/* <p className="text-[13px] text-slate-500 mb-2">
          {guests} Guests • {bedrooms} Bedrooms • {bathrooms} Bathrooms
        </p> */}

        <div className="mt-auto">
          <span className="text-[#f97316] font-extrabold text-lg">€ {listing?.basePrice}</span>
          <span className="text-slate-500 text-sm font-medium">/night</span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default ListingCard;