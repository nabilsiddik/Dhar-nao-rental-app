"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  showLimit?: boolean;
}

const Pagination = ({
  total,
  limit,
  page,
  showLimit = true,
}: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / limit);

  // Helper: Update URL Params
  const updateQuery = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  // Handle Logic for Page Numbers (to avoid showing 100 buttons)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (total === 0) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full py-4">
      {/* 1. Showing Text */}
      <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
        Showing {Math.min((page - 1) * limit + 1, total)} to{" "}
        {Math.min(page * limit, total)} of {total} entries
      </p>

      <div className="flex items-center gap-6">
        {/* 2. Limit Selector (Optional) */}
        {showLimit && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase">
              Limit:
            </span>
            <select
              value={limit}
              onChange={(e) =>
                updateQuery({ limit: e.target.value, page: "1" })
              }
              className="bg-gray-100 border-none rounded-lg px-2 py-1 text-sm font-bold text-gray-600 outline-none cursor-pointer"
            >
              {[5, 10, 20, 50].map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 3. Page Controls */}
        <div className="flex items-center gap-2">
          {/* Previous */}
          <button
            disabled={page === 1}
            onClick={() => updateQuery({ page: (page - 1).toString() })}
            className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {getPageNumbers().map((num) => (
              <button
                key={num}
                onClick={() => updateQuery({ page: num.toString() })}
                className={cn(
                  "w-10 h-10 rounded-xl text-sm font-black transition-all cursor-pointer",
                  page === num
                    ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                    : "text-gray-500 hover:bg-gray-100",
                )}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            disabled={page === totalPages}
            onClick={() => updateQuery({ page: (page + 1).toString() })}
            className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
