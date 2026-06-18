"use client";

import { useEffect, useMemo, useState } from "react";
import BookingCalendar from "../booking/BookingCalendar";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const ReservationSidebar = ({
  listing,
  bookedDates,
  startDate,
}: {
  listing: any;
  bookedDates: any[];
  startDate: any;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const user: any = useSelector(selectCurrentUser);

  // Initial State Sync
  const selectedGuests = Number(params?.get("guests")) || 1;
  const [guests, setGuests] = useState(selectedGuests);
  const [dateRange, setDateRange] = useState<any>();

  // FIXED: Function to actually update the URL
  const updateGuestQuery = (newCount: number) => {
    const currentParams = new URLSearchParams(params.toString());
    currentParams.set("guests", newCount.toString());

    // This updates the URL without a full page reload or scrolling to top
    router.replace(`${pathname}?${currentParams.toString()}`, {
      scroll: false,
    });
  };

  const increment = () => {
    const newCount = guests + 1;
    setGuests(newCount);
    updateGuestQuery(newCount);
  };

  const decrement = () => {
    if (guests > 1) {
      const newCount = guests - 1;
      setGuests(newCount);
      updateGuestQuery(newCount);
    }
  };

  // Sync state if URL changes (e.g. browser back button)
  useEffect(() => {
    setGuests(Number(params?.get("guests")) || 1);
  }, [params]);

  const formatDateUTC = (date: Date, isEnd: boolean = false) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return isEnd
      ? `${year}-${month}-${day}T23:59:59.999Z`
      : `${year}-${month}-${day}T00:00:00.000Z`;
  };

  const startISO = dateRange?.from ? formatDateUTC(dateRange.from) : "";
  const endISO = dateRange?.to ? formatDateUTC(dateRange.to, true) : "";

  // 4. Pricing Calculations
  const { totalDays, baseTotal, extraTotal, grandTotal } = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) {
      return { totalDays: 0, baseTotal: 0, extraTotal: 0, grandTotal: 0 };
    }

    const start = new Date(dateRange.from);
    const end = new Date(dateRange.to);

    const diff = differenceInCalendarDays(end, start);
    const days = diff + (listing?.category === "CAR" ? 1 : 0);
    // const days = diff + (listing?.category === "CAR" ? 1 : 0);

    const base = (listing?.basePrice || 0) * days;
    const extras =
      listing?.extraCharges?.reduce(
        (sum: number, item: any) => sum + (item.amount || 0),
        0,
      ) || 0;

    return {
      totalDays: days,
      baseTotal: base,
      extraTotal: extras,
      grandTotal: base + extras,
    };
  }, [dateRange, listing]);

  return (
    <div className="border rounded-[2rem] p-8 shadow-sm shadow-gray-100 bg-white">
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-3xl font-black text-gray-900">
          ${listing?.basePrice}
        </span>
        <span className="text-gray-400 font-bold text-sm">
          / {listing?.category === "CAR" ? "day" : "night"}
        </span>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-black text-gray-900 uppercase tracking-tighter ml-1">
            Select Dates
          </p>
          <div className="w-full">
            <BookingCalendar
              dateRange={dateRange}
              setDateRange={setDateRange}
              bookedDates={bookedDates}
            />
          </div>
        </div>

        {/* GUESTS COUNTER */}
        {listing?.category === "APARTMENT" && (
          <div className="bg-[#F3F4F6] px-6 py-4 rounded-3xl flex items-center justify-between w-full">
            <span className="text-gray-900 font-bold text-base">Guests</span>
            <div className="flex items-center gap-6">
              <button
                onClick={decrement}
                className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <Minus size={18} className="text-gray-600" />
              </button>
              <span className="text-xl font-black text-gray-900 min-w-[20px] text-center">
                {guests}
              </span>
              <button
                onClick={increment}
                className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl hover:shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <Plus size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        )}

        {/* PRICE SUMMARY */}
        {totalDays > 0 && (
          <div className="pt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex justify-between text-sm font-medium text-gray-500">
              <span>
                ${listing?.basePrice} × {totalDays} days
              </span>
              <span className="text-gray-900 font-bold">
                ${baseTotal.toFixed(2)}
              </span>
            </div>

            {listing?.extraCharges?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex justify-between text-sm font-medium text-gray-500"
              >
                <span>{item?.label}</span>
                <span>${item?.amount.toFixed(2)}</span>
              </div>
            ))}

            <hr className="border-gray-100" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-gray-900">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* RESERVE BUTTON */}
        <div className="pt-2">
          {grandTotal > 0 ? (
            user ? (
              <Link
                href={`/booking/confirmation/${listing?.id}?listingId=${listing?.id}&startDate=${startISO}&endDate=${endISO}&guests=${guests}`}
              >
                <button className="w-full bg-primary py-5 rounded-[2rem] text-white font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/20 cursor-pointer active:scale-95">
                  Reserve Now
                </button>
              </Link>
            ) : (
              <Link href={`/auth/signin`}>
                <button className="w-full bg-primary py-5 rounded-[2rem] text-white font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/20 cursor-pointer active:scale-95">
                  Reserve Now
                </button>
              </Link>
            )
          ) : (
            <button
              disabled
              className="w-full bg-gray-200 py-5 rounded-[2rem] text-gray-400 font-black text-lg cursor-not-allowed"
            >
              Select Dates
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationSidebar;
