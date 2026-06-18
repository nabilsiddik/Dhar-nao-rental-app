"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const BookingFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    updateQuery("searchTerm", term);
  }, 500);

  return (
    <div className="bg-[#F3F4F6]/50 border border-gray-100 rounded-[1.5rem] p-4 flex flex-col lg:flex-row gap-4 items-center">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by booking ref, user, listing..."
          defaultValue={searchParams.get("searchTerm") || ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-white border-none rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium shadow-sm"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-fit">
        {/* Category Filter */}
        <select
          value={searchParams.get("category") || ""}
          onChange={(e) => updateQuery("category", e.target.value)}
          className="bg-white border-none rounded-xl px-4 py-3.5 text-sm font-bold text-gray-500 shadow-sm outline-none flex-1 lg:flex-none cursor-pointer"
        >
          <option value="all">All Categories</option>
          <option value="CAR">Cars</option>
          <option value="APARTMENT">Apartments</option>
        </select>

        {/* Status Filter */}
        <select
          value={searchParams.get("status") || ""}
          onChange={(e) => updateQuery("status", e.target.value)}
          className="bg-white border-none rounded-xl px-4 py-3.5 text-sm font-bold text-gray-500 shadow-sm outline-none flex-1 lg:flex-none cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="UPCOMING">Upcoming</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        {/* Source Filter */}
        <select
          value={searchParams.get("bookingSource") || ""}
          onChange={(e) => updateQuery("bookingSource", e.target.value)}
          className="bg-white border-none rounded-xl px-4 py-3.5 text-sm font-bold text-gray-500 shadow-sm outline-none flex-1 lg:flex-none cursor-pointer"
        >
          <option value="all">All Sources</option>
          <option value="client_side">Client Side</option>
          <option value="phone_call">Phone Call</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="walk_in">Walk-in</option>
          <option value="travel_agency">Travel Agency</option>
        </select>
      </div>
    </div>
  );
};

export default BookingFilters;
