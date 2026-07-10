/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import MyFormWrapper from "../form/MyFormWrapper";
import MyFormSelect from "../form/MyFormSelect";
import ListingGrid from "../listing/ListingGrid";
import GuestCounter from "../listing/GuestCounter";
import { DatePickerWithRange } from "../listing/DatePickerWithRange";
import { DateRange } from "react-day-picker";
import { useGetUniqueCitiesQuery } from "@/redux/features/listingApis/listingApis";
import { X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import CategorySection from "../sections/CategorySection";
import HowItWorks from "../sections/HowItworksSection";
import BecomeHostCTA from "../sections/BecomeHostSection";

const WHATSAPP_NUMBER = "01957282230";

const Home = () => {
  const t = useTranslations("SearchForm");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const category = searchParams.get("category") || "CAR";
  const guests = searchParams?.get("guests") || 1;
  const startDate = searchParams?.get("startDate") || "";

  const { data: cityData } = useGetUniqueCitiesQuery(undefined);
  const cityList = cityData?.data || [];

  const updateQuery = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(name, value);
    else params.delete(name);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const initialDateRange = useMemo(() => {
    const start = searchParams.get("startDate");
    const end = searchParams.get("endDate");
    if (start && end) {
      return { from: new Date(start), to: new Date(end) };
    }
    return undefined;
  }, [searchParams]);

  const initialValues = useMemo(
    () => ({
      city: searchParams.get("city") || "",
      cartType: searchParams.get("cartType") || "any_type",
    }),
    [searchParams],
  );

  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(initialDateRange);

  const [guestCount, setGuestCount] = useState(
    Number(searchParams.get("guests")) || 1,
  );

  const handleDateChange = (range: DateRange | undefined) => {
    setSelectedDateRange(range);

    const params = new URLSearchParams(searchParams.toString());

    if (range?.from) {
      params.set("startDate", range.from.toISOString());
    } else {
      params.delete("startDate");
    }

    if (range?.to) {
      params.set("endDate", range.to.toISOString());
    } else {
      params.delete("endDate");
    }

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleSearch = (formData: any) => {
    const params = new URLSearchParams();
    params.set("category", category);

    Object.keys(formData).forEach((key) => {
      if (formData[key]) params.set(key, formData[key]);
    });

    if (selectedDateRange?.from)
      params.set("startDate", selectedDateRange.from.toISOString());
    if (selectedDateRange?.to)
      params.set("endDate", selectedDateRange.to.toISOString());

    if (category === "APARTMENT") params.set("guests", guestCount.toString());

    router.push(`?${params.toString()}`);
  };

  const cities =
    cityList?.length > 0 &&
    cityList?.map((city: string) => ({
      label: city,
      value: city.toLowerCase(),
      keyOption: city.toLowerCase(),
    }));

  const carTypes = [
    { label: "Any Type", value: "any_type", keyOption: "any" },
    { label: "Sedan", value: "sedan", keyOption: "sedan" },
    { label: "SUV", value: "suv", keyOption: "suv" },
    { label: "Luxury", value: "luxury", keyOption: "luxury" },
    { label: "Van", value: "van", keyOption: "van" },
    { label: "Economy", value: "economy", keyOption: "economy" },
  ];

  return (
    <div className="w-full bg-[#F6F6F6] min-h-screen">
      <div className="py-10 px-4">
        {/* The Search Bar Capsule */}
        <MyFormWrapper
          onSubmit={handleSearch}
          defaultValues={initialValues}
          className="max-w-6xl mx-auto bg-white shadow-xl shadow-gray-200/50 md:rounded-full rounded-3xl flex flex-col md:flex-row items-center gap-4 border border-primary px-5 py-3"
        >
          <div className="relative flex items-center gap-2 flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100 pr-4">
            <MyFormSelect
              name="city"
              placeholder={t("location.placeholder")}
              label={
                category === "CAR"
                  ? t("location.label")
                  : t("destination.label")
              }
              options={cities}
              setSelectedState={(val) => updateQuery("city", val.toString())}
            />

            {searchParams.get("city") && (
              <button
                type="button"
                onClick={() => updateQuery("city", "")}
                className=" z-10 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4 cursor-pointer text-primary" />
              </button>
            )}
          </div>

          {/* Date Range */}
          <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100 pr-4">
            <DatePickerWithRange
              placeholder={t("dates.label")}
              onDateChange={handleDateChange}
              initialValue={initialDateRange}
            />
          </div>

          {/* Category Specific Field */}
          <div className="flex-1 w-full pr-4">
            {category === "CAR" ? (
              <div className="relative flex items-center gap-2 flex-1 w-full border-b md:border-b-0 md:border-r border-gray-100 pr-4">
                <div className="block w-full">
                  <MyFormSelect
                  name="cartType"
                  placeholder={t("carType.placeholder")}
                  label={t("carType.label")}
                  options={carTypes}
                  setSelectedState={(val) =>
                    updateQuery("cartType", val.toString())
                  }
                />
                </div>

                {searchParams.get("cartType") && (
                  <button
                    type="button"
                    onClick={() => updateQuery("cartType", "")}
                    className=" z-10 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4 cursor-pointer text-primary" />
                  </button>
                )}
              </div>
            ) : (
              <div>
                <label className="mb-1 block">{t("guests.label")}</label>
                <GuestCounter
                  onChange={(val) => {
                    setGuestCount(val);
                    updateQuery("guests", val.toString());
                  }}
                />
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-primary text-white h-14 md:h-16 px-10 rounded-full flex items-center justify-center gap-2 font-bold hover:opacity-90 transition-all w-full md:w-auto shadow-lg shadow-primary/30"
          >
            <IoSearch size={22} />
            <span className="md:hidden lg:inline">Search</span>
          </button>
        </MyFormWrapper>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <CategorySection/>
      </div>

      <div className="w-full mx-auto py-10 lg:px-20 px-4">
        <ListingGrid startDate={startDate} guests={guests} />
      </div>

      <HowItWorks/>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
        >
          <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.75.72 5.37 2.08 7.67L.5 31.5l8.07-2.05A15.44 15.44 0 0 0 16 31.5C24.56 31.5 31.5 24.56 31.5 16S24.56.5 16 .5zm0 28.3a13.26 13.26 0 0 1-6.76-1.85l-.48-.29-4.8 1.22 1.27-4.66-.32-.5A13.3 13.3 0 1 1 16 28.8zm7.3-9.97c-.4-.2-2.36-1.16-2.73-1.3-.36-.13-.63-.2-.9.2s-1.03 1.3-1.27 1.57c-.23.27-.46.3-.86.1a10.87 10.87 0 0 1-3.2-1.97 12.03 12.03 0 0 1-2.21-2.75c-.23-.4 0-.61.18-.81.16-.18.4-.46.6-.7.2-.23.27-.4.4-.66.14-.27.07-.5-.03-.7-.1-.2-.9-2.16-1.23-2.96-.32-.78-.65-.67-.9-.68h-.76c-.27 0-.7.1-1.06.5s-1.4 1.37-1.4 3.33 1.43 3.86 1.63 4.13c.2.26 2.82 4.3 6.83 6.03.96.41 1.7.66 2.28.85.96.3 1.83.26 2.52.16.77-.12 2.36-.97 2.7-1.9.33-.93.33-1.73.23-1.9-.1-.17-.36-.27-.76-.47z" />
        </svg>
      </a>
    </div>
  );
};

export default Home;
