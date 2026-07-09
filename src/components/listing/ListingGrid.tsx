import { useSearchParams } from "next/navigation";
import ListingCard from "./ListingCard";
import { useGetAllListingsQuery } from "@/redux/features/listingApis/listingApis";
import { Loader2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";


const ListingGrid = ({
  guests,
  startDate,
}: {
  guests: string | number;
  startDate: string;
}) => {
  const t = useTranslations("ListingGrid");
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const { data, isLoading, isError } = useGetAllListingsQuery(queryParams);

const dummyData = [
  {
    id: 1,
    title: "Santa Cruz Bungalow",
    type: "Bungalow",
    category: "Entire home",
    guests: 3,
    bedrooms: 4,
    bathrooms: 3,
    price: 38,
    rating: 5.0,
    isFeatured: true,
    isVerified: true,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800"
    ],
    hostImage: "https://i.pravatar.cc/150?u=1"
  },
  {
    id: 2,
    title: "Minthis Delight Bungalow",
    type: "Loft",
    category: "Shared room",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 23,
    rating: 4.0,
    isFeatured: true,
    isVerified: false,
    images: [
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800"
    ],
    hostImage: "https://i.pravatar.cc/150?u=2"
  },
];


  if (isLoading)
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-gray-500 font-medium tracking-tight text-lg">
          Loading listing details...
        </p>
      </div>
    );
  if (isError) return <div>Error fetching listings.</div>;

  const listings = data?.data || [];
  console.log(listings, 'djfkdf');

  return (
    <section className="px-4 mx-auto">
      {/* Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-x-5 gap-y-12">
          {listings?.length > 0 && listings?.map((listing: any) => (
            <ListingCard key={listing?.id} listing={listing} />
          ))}
        </div>
    </section>
  );
};

export default ListingGrid;
