// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useEffect, useState } from "react";
// import { Plus, Calendar, Eye, Search, Loader2 } from "lucide-react";
// import Link from "next/link";
// import ManualBookingFlow from "@/components/booking/ManualBookingFlow";
// import { useGetAllBookingsQuery } from "@/redux/features/admin/bookings.api";
// import { useSearchParams } from "next/navigation";

// const BookingPageClient = () => {
//   const [manualBooking, setManualBooking] = useState(false);

//   // 1. MANAGING ALL FILTERS DIRECTLY INSIDE THIS COMPONENT
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("");
//   const [status, setStatus] = useState("");
//   const [bookingSource, setBookingSource] = useState("");

//   const searchParams = useSearchParams();
//   const isCreate = searchParams.get("isCreate") || "";

//   useEffect(() => {
//     if (isCreate) {
//       setManualBooking(true);
//     }
//   }, [manualBooking]);

//   // 2. CONSTRUCTING THE DYNAMIC ARRAY FOR YOUR RTK API SLICE
//   const queryArgs = [
//     { name: "page", value: page.toString() },
//     { name: "limit", value: "10" },
//   ];

//   if (searchTerm) queryArgs.push({ name: "searchTerm", value: searchTerm });
//   if (category) queryArgs.push({ name: "category", value: category });
//   if (status) queryArgs.push({ name: "status", value: status });
//   if (bookingSource)
//     queryArgs.push({ name: "bookingSource", value: bookingSource });

//   // 3. EXECUTE THE DYNAMIC RTK QUERY
//   const { data: bookingsResponse, isLoading } = useGetAllBookingsQuery(
//     queryArgs,
//   ) as any;

//   // 4. EXTRACT DATA SAFEGUARDS
//   const bookingsData = bookingsResponse?.data || [];
//   const meta = bookingsResponse?.meta || {};
//   const stats = meta?.stats || {};

//   const handlePageChange = (newPage: number) => {
//     const totalPages = Math.ceil((meta?.total || 0) / (meta?.limit || 10));
//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   const handleFilterChange = (filterType: string, value: string) => {
//     setPage(1); // Reset to page 1 whenever a filter is updated
//     if (filterType === "searchTerm") setSearchTerm(value);
//     if (filterType === "category") setCategory(value);
//     if (filterType === "status") setStatus(value);
//     if (filterType === "bookingSource") setBookingSource(value);
//   };

//   if (isLoading) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-primary" size={40} />
//         <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
//           Loading Booking Data...
//         </p>
//       </div>
//     );
//   }

//   return manualBooking ? (
//     <ManualBookingFlow onBack={() => setManualBooking(false)} />
//   ) : (
//     <div className="space-y-8 pb-10">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">All Bookings</h1>
//           <p className="text-gray-500 font-medium mt-1">
//             Manage all platform bookings and reservations
//           </p>
//         </div>
//         <button
//           onClick={() => setManualBooking(true)}
//           className="bg-primary text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity w-fit cursor-pointer"
//         >
//           <Plus size={20} strokeWidth={3} /> Create Manual Booking
//         </button>
//       </div>

//       {/* DYNAMIC STATS CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//         {[
//           { label: "Active", val: stats?.active ?? 0, color: "text-green-600" },
//           {
//             label: "Upcoming",
//             val: stats?.upcoming ?? 0,
//             color: "text-blue-600",
//           },
//           {
//             label: "Completed",
//             val: stats?.completed ?? 0,
//             color: "text-gray-600",
//           },
//           {
//             label: "Total Revenue",
//             val: stats?.totalRevenue || "$0",
//             color: "text-gray-900",
//           },
//           {
//             label: "Commission Earned",
//             val: stats?.commissionEarned || "$0",
//             color: "text-primary",
//           },
//         ].map((card, i) => (
//           <div
//             key={i}
//             className="bg-white border border-gray-100 p-6 rounded-[1.5rem] shadow-sm"
//           >
//             <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
//               {card.label}
//             </p>
//             <h2 className={`text-3xl font-black ${card.color}`}>{card.val}</h2>
//           </div>
//         ))}
//       </div>

//       {/* INLINE FILTER BAR */}
//       <div className="bg-white p-5 border border-gray-100 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
//         <div className="relative w-full md:w-72">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//             size={18}
//           />
//           <input
//             type="text"
//             placeholder="Search reference or user..."
//             value={searchTerm}
//             onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
//             className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-sm font-medium focus:outline-none focus:border-primary transition-colors"
//           />
//         </div>

//         <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
//           {/* Category Filter */}
//           <select
//             value={category}
//             onChange={(e) => handleFilterChange("category", e.target.value)}
//             className="bg-gray-50/50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 focus:outline-none cursor-pointer"
//           >
//             <option value="">All Categories</option>
//             <option value="CAR">Car</option>
//             <option value="APARTMENT">Apartment</option>
//           </select>

//           {/* Status Filter */}
//           <select
//             value={status}
//             onChange={(e) => handleFilterChange("status", e.target.value)}
//             className="bg-gray-50/50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 focus:outline-none cursor-pointer"
//           >
//             <option value="">All Statuses</option>
//             <option value="ACTIVE">Active</option>
//             <option value="UPCOMING">Upcoming</option>
//             <option value="COMPLETED">Completed</option>
//           </select>

//           {/* Booking Source Filter */}
//           <select
//             value={bookingSource}
//             onChange={(e) =>
//               handleFilterChange("bookingSource", e.target.value)
//             }
//             className="bg-gray-50/50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 focus:outline-none cursor-pointer"
//           >
//             <option value="">All Booking Sources</option>
//             <option value="client_side">Client Side</option>
//             <option value="phone_call">Phone Call</option>
//             <option value="whatsapp">WhatsApp</option>
//             <option value="walk_in">Walk In</option>
//             <option value="travel_agency">Travel Agency</option>
//             <option value="email">Email</option>
//           </select>
//         </div>
//       </div>

//       {/* TABLE SECTION */}
//       <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           {isLoading ? (
//             <div className="py-20 text-center text-sm font-medium text-gray-500">
//               Loading bookings data...
//             </div>
//           ) : bookingsData.length === 0 ? (
//             <div className="py-20 text-center text-sm font-medium text-gray-500">
//               No bookings found matching current filters.
//             </div>
//           ) : (
//             <table className="w-full text-left min-w-[1400px] border-collapse">
//               <thead className="bg-gray-50/50 border-b border-gray-50">
//                 <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                   <th className="py-6 px-8">Booking Ref</th>
//                   <th className="py-6">User</th>
//                   <th className="py-6">Listing</th>
//                   <th className="py-6 text-center">Category</th>
//                   <th className="py-6">Dates</th>
//                   <th className="py-6">Total</th>
//                   <th className="py-6">Commission</th>
//                   <th className="py-6">Status</th>
//                   <th className="py-6 px-8 text-right">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {bookingsData.map((b: any) => {
//                   const isManual =
//                     b.bookingSource &&
//                     b.bookingSource.toLowerCase() !== "client side";

//                   return (
//                     <tr
//                       key={b.id}
//                       className="hover:bg-gray-50/30 transition-colors group"
//                     >
//                       <td className="py-6 px-8 text-sm font-bold text-gray-900 leading-tight">
//                         {b.bookingRef}
//                       </td>
//                       <td className="py-6">
//                         <div className="flex items-center gap-2">
//                           <span className="text-sm font-bold text-gray-800">
//                             {b.user}
//                           </span>
//                           {isManual && (
//                             <span className="bg-gray-100 text-gray-500 text-[9px] font-black uppercase px-2 py-0.5 rounded border border-gray-200">
//                               {b.bookingSource?.replace("_", " ")}
//                             </span>
//                           )}
//                         </div>
//                       </td>
//                       <td className="py-6 text-sm font-medium text-gray-600 max-w-[180px] truncate">
//                         {b.listing}
//                       </td>
//                       <td className="py-6 text-center">
//                         <span
//                           className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
//                             b.category === "CAR"
//                               ? "bg-purple-50 text-purple-600"
//                               : "bg-blue-50 text-blue-600"
//                           }`}
//                         >
//                           {b.category}
//                         </span>
//                       </td>
//                       <td className="py-6">
//                         <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
//                           <Calendar size={14} className="text-gray-300" />
//                           {b.dates}
//                         </div>
//                       </td>
//                       <td className="py-6 text-sm font-bold text-gray-900">
//                         {b.total}
//                       </td>
//                       <td className="py-6 text-sm font-bold text-primary">
//                         {b.commission}
//                       </td>
//                       <td className="py-6">
//                         <span
//                           className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase
//                           ${
//                             b.status === "ACTIVE"
//                               ? "bg-green-50 text-green-600"
//                               : b.status === "UPCOMING"
//                                 ? "bg-blue-50 text-blue-600"
//                                 : b.status === "COMPLETED"
//                                   ? "bg-gray-100 text-gray-500"
//                                   : "bg-red-50 text-red-600"
//                           }`}
//                         >
//                           {b.status}
//                         </span>
//                       </td>
//                       <td className="py-6 px-8 text-right">
//                         <Link
//                           href={`/admin/dashboard/bookings/${b.id}`}
//                           className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors flex items-center justify-end gap-1 text-[11px] font-bold uppercase"
//                         >
//                           <Eye size={14} /> View Details
//                         </Link>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* PAGINATION FOOTER */}
//         {!isLoading && bookingsData.length > 0 && (
//           <div className="p-6 border-t border-gray-50 flex items-center justify-between">
//             <p className="text-sm text-gray-400 font-medium">
//               Showing {bookingsData.length} of {meta?.total || 0} bookings
//             </p>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handlePageChange(page - 1)}
//                 disabled={page === 1}
//                 className="text-sm font-bold text-gray-400 px-4 py-2 hover:text-gray-900 transition-colors disabled:opacity-40 disabled:hover:text-gray-400 cursor-pointer"
//               >
//                 Previous
//               </button>
//               <button className="w-8 h-8 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20">
//                 {meta?.page || page}
//               </button>
//               <button
//                 onClick={() => handlePageChange(page + 1)}
//                 disabled={
//                   page >= Math.ceil((meta?.total || 0) / (meta?.limit || 10))
//                 }
//                 className="text-sm font-bold text-gray-400 px-4 py-2 hover:text-gray-900 transition-colors disabled:opacity-40 disabled:hover:text-gray-400 cursor-pointer"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingPageClient;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Plus, Calendar, Eye, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import ManualBookingFlow from "@/components/booking/ManualBookingFlow";
import { useGetAllBookingsQuery } from "@/redux/features/admin/bookings.api";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

const BookingPageClient = () => {
  const t = useTranslations("AdminBookings");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [manualBooking, setManualBooking] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [bookingSource, setBookingSource] = useState("");

  const searchParams = useSearchParams();
  const isCreate = searchParams.get("isCreate") || "";

  useEffect(() => {
    if (isCreate) {
      setManualBooking(true);
    }
  }, [isCreate]);

  const queryArgs = [
    { name: "page", value: page.toString() },
    { name: "limit", value: "10" },
  ];

  if (searchTerm) queryArgs.push({ name: "searchTerm", value: searchTerm });
  if (category) queryArgs.push({ name: "category", value: category });
  if (status) queryArgs.push({ name: "status", value: status });
  if (bookingSource)
    queryArgs.push({ name: "bookingSource", value: bookingSource });

  const { data: bookingsResponse, isLoading } = useGetAllBookingsQuery(
    queryArgs,
  ) as any;

  const bookingsData = bookingsResponse?.data || [];
  const meta = bookingsResponse?.meta || {};
  const stats = meta?.stats || {};

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil((meta?.total || 0) / (meta?.limit || 10));
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setPage(1);
    if (filterType === "searchTerm") setSearchTerm(value);
    if (filterType === "category") setCategory(value);
    if (filterType === "status") setStatus(value);
    if (filterType === "bookingSource") setBookingSource(value);
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
          {t("loading")}
        </p>
      </div>
    );
  }

  return manualBooking ? (
    <ManualBookingFlow onBack={() => setManualBooking(false)} />
  ) : (
    <div className="space-y-8 pb-10" dir={isRtl ? "rtl" : "ltr"}>
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className={isRtl ? "text-right" : "text-left"}>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("header.title")}
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            {t("header.subtitle")}
          </p>
        </div>
        <button
          onClick={() => setManualBooking(true)}
          className="bg-primary text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity w-fit cursor-pointer"
        >
          <Plus size={20} strokeWidth={3} /> {t("header.createBtn")}
        </button>
      </div>

      {/* DYNAMIC STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            label: t("stats.active"),
            val: stats?.active ?? 0,
            color: "text-green-600",
          },
          {
            label: t("stats.upcoming"),
            val: stats?.upcoming ?? 0,
            color: "text-blue-600",
          },
          {
            label: t("stats.completed"),
            val: stats?.completed ?? 0,
            color: "text-gray-600",
          },
          {
            label: t("stats.revenue"),
            val: stats?.totalRevenue || "$0",
            color: "text-gray-900",
          },
          {
            label: t("stats.commission"),
            val: stats?.commissionEarned || "$0",
            color: "text-primary",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 p-6 rounded-[1.5rem] shadow-sm"
          >
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              {card.label}
            </p>
            <h2 className={`text-3xl font-black ${card.color}`}>{card.val}</h2>
          </div>
        ))}
      </div>

      {/* INLINE FILTER BAR */}
      <div className="bg-white p-5 border border-gray-100 rounded-3xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search
            className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRtl ? "right-4" : "left-4"}`}
            size={18}
          />
          <input
            type="text"
            placeholder={t("filters.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
            className={`w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-3 text-sm font-medium focus:outline-none focus:border-primary transition-colors ${isRtl ? "pr-11 pl-4" : "pl-11 pr-4"}`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="bg-gray-50/50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 focus:outline-none cursor-pointer"
          >
            <option value="">{t("filters.allCategories")}</option>
            <option value="CAR">{t("filters.car")}</option>
            <option value="APARTMENT">{t("filters.apartment")}</option>
          </select>

          <select
            value={status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="bg-gray-50/50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 focus:outline-none cursor-pointer"
          >
            <option value="">{t("filters.allStatuses")}</option>
            <option value="ACTIVE">{t("stats.active")}</option>
            <option value="UPCOMING">{t("stats.upcoming")}</option>
            <option value="COMPLETED">{t("stats.completed")}</option>
          </select>

          <select
            value={bookingSource}
            onChange={(e) =>
              handleFilterChange("bookingSource", e.target.value)
            }
            className="bg-gray-50/50 border border-gray-100 rounded-2xl px-4 py-3 text-sm font-bold text-gray-600 focus:outline-none cursor-pointer"
          >
            <option value="">{t("filters.allSources")}</option>
            <option value="client_side">
              {t("filters.sources.client_side")}
            </option>
            <option value="phone_call">
              {t("filters.sources.phone_call")}
            </option>
            <option value="whatsapp">{t("filters.sources.whatsapp")}</option>
            <option value="walk_in">{t("filters.sources.walk_in")}</option>
            <option value="travel_agency">
              {t("filters.sources.travel_agency")}
            </option>
            <option value="email">{t("filters.sources.email")}</option>
          </select>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-20 text-center text-sm font-medium text-gray-500">
              {t("table.loadingTable")}
            </div>
          ) : bookingsData.length === 0 ? (
            <div className="py-20 text-center text-sm font-medium text-gray-500">
              {t("table.noResults")}
            </div>
          ) : (
            <table
              className={`w-full ${isRtl ? "text-right" : "text-left"} min-w-[1400px] border-collapse`}
            >
              <thead className="bg-gray-50/50 border-b border-gray-50">
                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <th className="py-6 px-8">{t("table.ref")}</th>
                  <th className="py-6">{t("table.user")}</th>
                  <th className="py-6">{t("table.listing")}</th>
                  <th className="py-6 text-center">{t("table.category")}</th>
                  <th className="py-6">{t("table.dates")}</th>
                  <th className="py-6">{t("table.total")}</th>
                  <th className="py-6">{t("table.commission")}</th>
                  <th className="py-6">{t("table.status")}</th>
                  <th
                    className={`py-6 px-8 ${isRtl ? "text-left" : "text-right"}`}
                  >
                    {t("table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookingsData.map((b: any) => {
                  const isManual =
                    b.bookingSource &&
                    b.bookingSource.toLowerCase() !== "client side";
                  return (
                    <tr
                      key={b.id}
                      className="hover:bg-gray-50/30 transition-colors group"
                    >
                      <td className="py-6 px-8 text-sm font-bold text-gray-900 leading-tight">
                        {b.bookingRef}
                      </td>
                      <td className="py-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-800">
                            {b.user}
                          </span>
                          {isManual && (
                            <span className="bg-gray-100 text-gray-500 text-[9px] font-black uppercase px-2 py-0.5 rounded border border-gray-200">
                              {t(`filters.sources.${b.bookingSource}` as any) ||
                                b.bookingSource}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-6 text-sm font-medium text-gray-600 max-w-[180px] truncate">
                        {b.listing}
                      </td>
                      <td className="py-6 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${b.category === "CAR" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}
                        >
                          {b.category}
                        </span>
                      </td>
                      <td className="py-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <Calendar size={14} className="text-gray-300" />{" "}
                          {b.dates}
                        </div>
                      </td>
                      <td className="py-6 text-sm font-bold text-gray-900">
                        {b.total}
                      </td>
                      <td className="py-6 text-sm font-bold text-primary">
                        {b.commission}
                      </td>
                      <td className="py-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase 
                          ${b.status === "ACTIVE" ? "bg-green-50 text-green-600" : b.status === "UPCOMING" ? "bg-blue-50 text-blue-600" : b.status === "COMPLETED" ? "bg-gray-100 text-gray-500" : "bg-red-50 text-red-600"}`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td
                        className={`py-6 px-8 ${isRtl ? "text-left" : "text-right"}`}
                      >
                        <Link
                          href={`/admin/dashboard/bookings/${b.id}`}
                          className={`text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors flex items-center ${isRtl ? "justify-start" : "justify-end"} gap-1 text-[11px] font-bold uppercase`}
                        >
                          <Eye size={14} /> {t("table.viewDetails")}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* PAGINATION FOOTER */}
        {!isLoading && bookingsData.length > 0 && (
          <div className="p-6 border-t border-gray-50 flex items-center justify-between">
            <p className="text-sm text-gray-400 font-medium">
              {t("pagination.showing", {
                count: bookingsData.length,
                total: meta?.total || 0,
              })}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="text-sm font-bold text-gray-400 px-4 py-2 hover:text-gray-900 transition-colors disabled:opacity-40 cursor-pointer"
              >
                {t("pagination.prev")}
              </button>
              <button className="w-8 h-8 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20">
                {meta?.page || page}
              </button>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={
                  page >= Math.ceil((meta?.total || 0) / (meta?.limit || 10))
                }
                className="text-sm font-bold text-gray-400 px-4 py-2 hover:text-gray-900 transition-colors disabled:opacity-40 cursor-pointer"
              >
                {t("pagination.next")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPageClient;
