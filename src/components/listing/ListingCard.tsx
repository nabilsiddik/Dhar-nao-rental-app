import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";

interface ListingCardProps {
  id: string;
  images: string[];
  title: string;
  city: string;
  country: string;
  location: string;
  basePrice: number;
  category: string;
  avgRating: number;
  totalReviews: number;
  guests: string | number;
  startDate: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  id,
  images,
  title,
  city,
  country,
  location,
  basePrice,
  category,
  avgRating,
  totalReviews,
  guests,
  startDate,
}) => {
  return (
    <Link
      href={`/listing/${id}?guests=${guests}${startDate && `&startDate=${startDate}`}`}
    >
      <div className="group cursor-pointer flex flex-col gap-2">
        {/* Image Container */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
          <Image
            src={images[0] || "/listing-image.png"} // Assuming images is an array, use the first image
            alt={title}
            fill
            className="object-cover transition group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-gray-900 text-base truncate">
            {title}
          </h3>
          <p className="text-gray-500 text-sm">
            {city}, {country}
          </p>

          <div className="flex items-center gap-1 mt-0.5">
            <span className="font-semibold text-gray-900">
              ${basePrice.toFixed(2)}
            </span>
            <span className="text-gray-500 text-sm">/day</span>

            <div className="flex items-center gap-1 ml-auto">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">
                {avgRating?.toFixed(1)}
              </span>
              <span className="text-sm text-gray-400">({totalReviews})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;



