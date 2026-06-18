"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Update URL params
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1"); // Reset to page 1 on new filter
    router.push(`?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    updateQuery("searchTerm", term);
  }, 500);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search by title, location, ID..."
          defaultValue={searchParams.get("searchTerm") || ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary transition-all text-sm"
        />
      </div>

      {/* Category Filter */}
      <select
        value={searchParams.get("category") || ""}
        onChange={(e) => updateQuery("category", e.target.value)}
        className="bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm text-gray-600 min-w-[160px]"
      >
        <option value="">All Categories</option>
        <option value="CAR">Cars</option>
        <option value="APARTMENT">Apartments</option>
      </select>

      {/* Status Filter */}
      <select
        value={searchParams.get("status") || ""}
        onChange={(e) => updateQuery("status", e.target.value)}
        className="bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-primary text-sm text-gray-600 min-w-[160px]"
      >
        <option value="">All Status</option>
        <option value="PUBLISHED">Published</option>
        <option value="ARCHIVED">Archived</option>
      </select>
    </div>
  );
};

export default SearchFilters;
