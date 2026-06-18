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

  return (
    <section className="px-4 mx-auto">
      {/* Header */}
      <div className="text-center mb-12 flex flex-col gap-2 ">
        <h2 className="text-gray-400 text-2xl">{t("heading")}</h2>
        <p className="text-gray-400 text-2xl">{t("subheading")}</p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-10">
        {listings?.length > 0 &&
          listings.map((item: any) => (
            <ListingCard
              key={item.id}
              {...item}
              unit={item.unit as "night" | "day"}
              guests={guests}
              startDate={startDate}
            />
          ))}
      </div>
    </section>
  );
};

export default ListingGrid;
