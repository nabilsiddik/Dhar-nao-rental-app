// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useGetStatsQuery } from "@/redux/features/admin/dashboard.stats";
// import { useGetRevenueOverviewQuery } from "@/redux/features/admin/revenue.api";
// import {
//   Calendar,
//   DollarSign,
//   Eye,
//   LayoutGrid,
//   List,
//   Loader2,
//   Share2,
//   Star,
//   Users,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   Cell,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const STATUS_STYLES: Record<string, string> = {
//   ACTIVE: "bg-green-50 text-green-600",
//   UPCOMING: "bg-blue-50 text-blue-600",
//   COMPLETED: "bg-gray-100 text-gray-600",
//   CANCELLED: "bg-red-50 text-red-600",
// };

// const STATUS_STYLES_MOBILE: Record<string, string> = {
//   ACTIVE: "bg-green-100 text-green-600",
//   UPCOMING: "bg-blue-100 text-blue-600",
//   COMPLETED: "bg-gray-200 text-gray-600",
//   CANCELLED: "bg-red-100 text-red-600",
// };

// const CATEGORY_STYLES: Record<string, string> = {
//   CAR: "bg-purple-50 text-purple-500",
//   APARTMENT: "bg-blue-50 text-blue-500",
// };

// const CATEGORY_STYLES_MOBILE: Record<string, string> = {
//   CAR: "bg-purple-100 text-purple-600",
//   APARTMENT: "bg-blue-100 text-blue-600",
// };

// const PIE_COLORS: Record<string, string> = {
//   cars: "#A446FF",
//   apartments: "#3B82F6",
// };

// export default function DashboardOverview() {
//   const { data: statsResponse, isLoading } = useGetStatsQuery([]) as any;
//   const stats = statsResponse?.data;

//   const topCards = stats?.topCards;
//   const revenueData = stats?.revenueOverview ?? [];
//   const bookingsSplit = stats?.bookingsSplit;
//   const recentBookings = stats?.recentBookings ?? [];
//   const recentRegistrations = stats?.recentRegistrations ?? [];

//   console.log(recentBookings, "recent");

//   const pieData = bookingsSplit
//     ? [
//         {
//           name: "Cars",
//           value: bookingsSplit.cars.count,
//           percentage: bookingsSplit.cars.percentage,
//           color: PIE_COLORS.cars,
//         },
//         {
//           name: "Apartments",
//           value: bookingsSplit.apartments.count,
//           percentage: bookingsSplit.apartments.percentage,
//           color: PIE_COLORS.apartments,
//         },
//       ]
//     : [];

//   if (isLoading) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-primary" size={40} />
//         <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
//           Loading Overview Data...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8 pb-10">
//       {/* 1. TOP STATS CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//         {[
//           {
//             label: "Total Revenue",
//             val: topCards ? `$${topCards.totalRevenue.toLocaleString()}` : "—",
//             icon: DollarSign,
//           },
//           {
//             label: "Total Bookings",
//             val: topCards ? topCards.totalBookings.toString() : "—",
//             icon: Calendar,
//           },
//           {
//             label: "Active Listings",
//             val: topCards ? topCards.activeListings.toString() : "—",
//             icon: List,
//           },
//           {
//             label: "Registered Users",
//             val: topCards ? topCards.registeredUsers.toLocaleString() : "—",
//             icon: Users,
//           },
//         ].map((card) => (
//           <div
//             key={card.label}
//             className="bg-white p-5 xl:p-8 border border-gray-100 rounded-[2rem] shadow-sm flex flex-col gap-6"
//           >
//             <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-50">
//               <card.icon size={22} />
//             </div>
//             <div>
//               <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
//                 {card.label}
//               </p>
//               <h2 className="text-3xl font-black text-gray-900">{card.val}</h2>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 2. CHARTS SECTION */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Revenue Area Chart */}
//         <div className="col-span-full xl:col-span-2 bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//           <h3 className="text-xl font-bold text-gray-900 mb-8">
//             Revenue Overview
//           </h3>
//           <div className="h-[300px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={revenueData}>
//                 <defs>
//                   <linearGradient id="colorCars" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#A446FF" stopOpacity={0.1} />
//                     <stop offset="95%" stopColor="#A446FF" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   vertical={false}
//                   stroke="#F3F4F6"
//                 />
//                 <XAxis
//                   dataKey="month"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: "#9CA3AF", fontSize: 13 }}
//                   dy={10}
//                 />
//                 <YAxis
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: "#9CA3AF", fontSize: 13 }}
//                 />
//                 <Tooltip
//                   formatter={(value) => {
//                     const rawValue = Array.isArray(value) ? value[0] : value;
//                     return `$${Number(rawValue ?? 0).toLocaleString()}`;
//                   }}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="cars"
//                   stroke="#A446FF"
//                   strokeWidth={3}
//                   fillOpacity={1}
//                   fill="url(#colorCars)"
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="apartments"
//                   stroke="#3B82F6"
//                   strokeWidth={3}
//                   fillOpacity={0}
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="flex justify-center gap-8 mt-6">
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 rounded-full bg-primary" />
//               <span className="text-sm font-bold text-gray-500">
//                 Cars Revenue
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 rounded-full bg-blue-500" />
//               <span className="text-sm font-bold text-gray-500">
//                 Apartments Revenue
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Bookings Split Pie Chart */}
//         <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm flex flex-col items-center col-span-full xl:col-span-1">
//           <h3 className="text-xl font-bold text-gray-900 mb-8 w-full">
//             Bookings Split
//           </h3>
//           <div className="h-[220px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   innerRadius={65}
//                   outerRadius={90}
//                   paddingAngle={8}
//                   dataKey="value"
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={entry.color}
//                       stroke="none"
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip
//                   formatter={(
//                     value:
//                       | string
//                       | number
//                       | readonly (string | number)[]
//                       | undefined,
//                   ) => [String(value ?? 0), "Bookings"]}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="w-full space-y-4 mt-8">
//             {pieData.map((item) => (
//               <div
//                 key={item.name}
//                 className="flex justify-between items-center"
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className="w-3 h-3 rounded-full"
//                     style={{ backgroundColor: item.color }}
//                   />
//                   <span className="text-sm font-bold text-gray-500">
//                     {item.name}
//                   </span>
//                 </div>
//                 <span className="text-sm font-black text-gray-900">
//                   {item.value} ({item.percentage}%)
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 3. RECENT BOOKINGS TABLE */}
//       <div className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
//         <div className="flex items-center justify-between mb-8">
//           <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
//           <Link
//             href="/admin/dashboard/bookings"
//             className="text-primary text-sm font-bold hover:underline cursor-pointer"
//           >
//             View All
//           </Link>
//         </div>

//         {/* Desktop Table */}
//         <div className="hidden md:block overflow-x-auto">
//           <table className="w-full text-left min-w-[800px]">
//             <thead>
//               <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
//                 <th className="pb-4">Booking Ref</th>
//                 <th className="pb-4">User</th>
//                 <th className="pb-4">Listing</th>
//                 <th className="pb-4">Category</th>
//                 <th className="pb-4">Dates</th>
//                 <th className="pb-4">Total</th>
//                 <th className="pb-4">Status</th>
//                 <th className="pb-4 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {recentBookings.map((b: any, i: number) => (
//                 <tr
//                   key={i}
//                   className="group hover:bg-gray-50/30 transition-colors"
//                 >
//                   <td className="py-5 text-sm font-bold text-gray-900">
//                     #{b.bookingRef}
//                   </td>
//                   <td className="py-5 text-sm font-medium text-gray-700">
//                     {b.user}
//                   </td>
//                   <td className="py-5 text-sm font-medium text-gray-700 truncate max-w-[150px]">
//                     {b.listing}
//                   </td>
//                   <td className="py-5">
//                     <span
//                       className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${CATEGORY_STYLES[b.category] ?? "bg-gray-50 text-gray-500"}`}
//                     >
//                       {b.category}
//                     </span>
//                   </td>
//                   <td className="py-5 text-sm text-gray-500 font-medium">
//                     {b.dates}
//                   </td>
//                   <td className="py-5 text-sm font-bold text-gray-900">
//                     {b.total}
//                   </td>
//                   <td className="py-5">
//                     <span
//                       className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${STATUS_STYLES[b.status] ?? "bg-gray-100 text-gray-600"}`}
//                     >
//                       {b.status}
//                     </span>
//                   </td>
//                   <td className="py-5 text-right">
//                     <Link href={`/admin/dashboard/bookings/${b?.id}`}>
//                       <button className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors flex items-center gap-1 ml-auto text-[11px] font-bold uppercase cursor-pointer">
//                         <Eye size={14} /> View
//                       </button>
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile Card View */}
//         <div className="md:hidden space-y-4">
//           {recentBookings.map((b: any, i: number) => (
//             <div
//               key={i}
//               className="bg-gray-50/50 border border-gray-100 rounded-2xl p-5 space-y-4"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                     Booking Ref
//                   </p>
//                   <h4 className="text-sm font-bold text-gray-900">
//                     #{b.bookingRef}
//                   </h4>
//                 </div>
//                 <span
//                   className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${STATUS_STYLES_MOBILE[b.status] ?? "bg-gray-200 text-gray-600"}`}
//                 >
//                   {b.status}
//                 </span>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                     User
//                   </p>
//                   <p className="text-sm font-medium text-gray-700">{b.user}</p>
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                     Category
//                   </p>
//                   <span
//                     className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${CATEGORY_STYLES_MOBILE[b.category] ?? "bg-gray-100 text-gray-600"}`}
//                   >
//                     {b.category}
//                   </span>
//                 </div>
//               </div>

//               <div>
//                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                   Listing
//                 </p>
//                 <p className="text-sm font-medium text-gray-700">{b.listing}</p>
//               </div>

//               <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
//                 <div>
//                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//                     Total Amount
//                   </p>
//                   <p className="text-lg font-black text-gray-900">{b.total}</p>
//                 </div>
//                 <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer">
//                   <Eye size={16} /> View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 4. BOTTOM SECTION */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//         {/* Quick Actions */}
//         <div className="lg:col-span-7 bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//           <h3 className="text-xl font-bold text-gray-900 mb-8">
//             Quick Actions
//           </h3>
//           <div className="grid grid-cols-2 gap-6 pb-4">
//             {[
//               {
//                 label: "Add New Listing",
//                 icon: LayoutGrid,
//                 link: "/admin/dashboard/listings?addNew=true",
//               },
//               {
//                 label: "View Pending Reviews",
//                 icon: Star,
//                 link: "/admin/dashboard/reviews?status=PENDING",
//               },
//               { label: "Export Report", icon: Share2 },
//               {
//                 label: "Create Manual Booking",
//                 icon: Calendar,
//                 link: "/admin/dashboard/bookings?isCreate=true",
//               },
//             ].map((btn) => {
//               if (btn?.link) {
//                 return (
//                   <Link
//                     target="_blank"
//                     href={btn?.link}
//                     className="flex flex-col items-center justify-center gap-3 py-5 bg-white border border-dashed border-gray-300 rounded-[1.5rem] hover:border-primary hover:bg-primary/5 transition-all text-gray-400 hover:text-primary group cursor-pointer"
//                   >
//                     <button
//                       key={btn.label}
//                       className="cursor-pointer flex flex-col items-center justify-center gap-3"
//                     >
//                       <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-primary/10 transition-colors">
//                         <btn.icon
//                           size={22}
//                           className="group-hover:scale-110 transition-transform text-primary"
//                         />
//                       </div>
//                       <span className="text-xs font-bold uppercase tracking-wider text-center">
//                         {btn.label}
//                       </span>
//                     </button>
//                   </Link>
//                 );
//               } else {
//                 return (
//                   <button
//                     key={btn.label}
//                     className="flex flex-col items-center justify-center gap-3 py-5 bg-white border border-dashed border-gray-300 rounded-[1.5rem] hover:border-primary hover:bg-primary/5 transition-all text-gray-400 hover:text-primary group cursor-pointer"
//                   >
//                     <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-primary/10 transition-colors">
//                       <btn.icon
//                         size={22}
//                         className="group-hover:scale-110 transition-transform text-primary"
//                       />
//                     </div>
//                     <span className="text-xs font-bold uppercase tracking-wider text-center">
//                       {btn.label}
//                     </span>
//                   </button>
//                 );
//               }
//             })}
//           </div>
//         </div>

//         {/* Recent Registrations */}
//         <div className="lg:col-span-5 bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//           <div className="flex items-center justify-between mb-8">
//             <h3 className="text-xl font-bold text-gray-900">
//               Recent Registrations
//             </h3>
//             <Link
//               href="/admin/dashboard/users"
//               className="text-primary text-sm font-bold hover:underline cursor-pointer"
//             >
//               View All
//             </Link>
//           </div>
//           <div className="space-y-6">
//             {recentRegistrations.map((user: any, i: number) => (
//               <div key={i} className="flex items-center justify-between group">
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden relative flex items-center justify-center flex-shrink-0">
//                     {user.image ? (
//                       <Image
//                         src={user.image}
//                         alt={user.name}
//                         fill
//                         className="object-cover"
//                       />
//                     ) : (
//                       <span className="text-sm font-bold text-gray-400">
//                         {user.name?.charAt(0)?.toUpperCase() ?? "?"}
//                       </span>
//                     )}
//                   </div>
//                   <div>
//                     <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
//                       {user.name}
//                     </h4>
//                     <p className="text-sm text-gray-400 font-medium">
//                       {user.email}
//                     </p>
//                   </div>
//                 </div>
//                 <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight shrink-0 ml-2">
//                   {user.date}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetStatsQuery } from "@/redux/features/admin/dashboard.stats";
import {
  Calendar,
  DollarSign,
  Eye,
  LayoutGrid,
  List,
  Loader2,
  Share2,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslations, useLocale } from "next-intl";

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-green-50 text-green-600",
  UPCOMING: "bg-blue-50 text-blue-600",
  COMPLETED: "bg-gray-100 text-gray-600",
  CANCELLED: "bg-red-50 text-red-600",
};

const STATUS_STYLES_MOBILE: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-600",
  UPCOMING: "bg-blue-100 text-blue-600",
  COMPLETED: "bg-gray-200 text-gray-600",
  CANCELLED: "bg-red-100 text-red-600",
};

const CATEGORY_STYLES: Record<string, string> = {
  CAR: "bg-purple-50 text-purple-500",
  APARTMENT: "bg-blue-50 text-blue-500",
};

const CATEGORY_STYLES_MOBILE: Record<string, string> = {
  CAR: "bg-purple-100 text-purple-600",
  APARTMENT: "bg-blue-100 text-blue-600",
};

const PIE_COLORS: Record<string, string> = {
  cars: "#A446FF",
  apartments: "#3B82F6",
};

export default function DashboardOverview() {
  const t = useTranslations("DashboardOverview");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const { data: statsResponse, isLoading } = useGetStatsQuery([]) as any;
  const stats = statsResponse?.data;

  const topCardsData = stats?.topCards;
  const revenueData = stats?.revenueOverview ?? [];
  const bookingsSplit = stats?.bookingsSplit;
  const recentBookings = stats?.recentBookings ?? [];
  const recentRegistrations = stats?.recentRegistrations ?? [];

  const pieData = bookingsSplit
    ? [
        {
          name: t("bookingsChart.cars"),
          value: bookingsSplit.cars.count,
          percentage: bookingsSplit.cars.percentage,
          color: PIE_COLORS.cars,
        },
        {
          name: t("bookingsChart.apartments"),
          value: bookingsSplit.apartments.count,
          percentage: bookingsSplit.apartments.percentage,
          color: PIE_COLORS.apartments,
        },
      ]
    : [];

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

  const topCards = [
    {
      label: t("topCards.revenue"),
      val: topCardsData
        ? `$${topCardsData.totalRevenue.toLocaleString()}`
        : "—",
      icon: DollarSign,
    },
    {
      label: t("topCards.bookings"),
      val: topCardsData ? topCardsData.totalBookings.toString() : "—",
      icon: Calendar,
    },
    {
      label: t("topCards.listings"),
      val: topCardsData ? topCardsData.activeListings.toString() : "—",
      icon: List,
    },
    {
      label: t("topCards.users"),
      val: topCardsData ? topCardsData.registeredUsers.toLocaleString() : "—",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8 pb-10" dir={isRtl ? "rtl" : "ltr"}>
      {/* 1. TOP STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {topCards.map((card) => (
          <div
            key={card.label}
            className="bg-white p-5 xl:p-8 border border-gray-100 rounded-[2rem] shadow-sm flex flex-col gap-6"
          >
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-50">
              <card.icon size={22} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
                {card.label}
              </p>
              <h2 className="text-3xl font-black text-gray-900">{card.val}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* 2. CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <div className="col-span-full xl:col-span-2 bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8">
            {t("revenueChart.title")}
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorCars" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A446FF" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#A446FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F3F4F6"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 13 }}
                  dy={10}
                  reversed={isRtl}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 13 }}
                  orientation={isRtl ? "right" : "left"}
                />
                <Tooltip
                  formatter={(value) => {
                    const rawValue = Array.isArray(value) ? value[0] : value;
                    return `$${Number(rawValue ?? 0).toLocaleString()}`;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cars"
                  stroke="#A446FF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCars)"
                />
                <Area
                  type="monotone"
                  dataKey="apartments"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm font-bold text-gray-500">
                {t("revenueChart.cars")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm font-bold text-gray-500">
                {t("revenueChart.apartments")}
              </span>
            </div>
          </div>
        </div>

        {/* Bookings Split Pie Chart */}
        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm flex flex-col items-center col-span-full xl:col-span-1">
          <h3 className="text-xl font-bold text-gray-900 mb-8 w-full">
            {t("bookingsChart.title")}
          </h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [
                    String(value ?? 0),
                    t("bookingsChart.tooltip"),
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full space-y-4 mt-8">
            {pieData.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-bold text-gray-500">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-black text-gray-900">
                  {item.value} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. RECENT BOOKINGS TABLE */}
      <div className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-gray-900">
            {t("recentBookings.title")}
          </h3>
          <Link
            href="/admin/dashboard/bookings"
            className="text-primary text-sm font-bold hover:underline cursor-pointer"
          >
            {t("recentBookings.viewAll")}
          </Link>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table
            className={`w-full ${isRtl ? "text-right" : "text-left"} min-w-[800px]`}
          >
            <thead>
              <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                <th className="pb-4">{t("recentBookings.ref")}</th>
                <th className="pb-4">{t("recentBookings.user")}</th>
                <th className="pb-4">{t("recentBookings.listing")}</th>
                <th className="pb-4">{t("recentBookings.category")}</th>
                <th className="pb-4">{t("recentBookings.dates")}</th>
                <th className="pb-4">{t("recentBookings.total")}</th>
                <th className="pb-4">{t("recentBookings.status")}</th>
                <th className={`pb-4 ${isRtl ? "text-left" : "text-right"}`}>
                  {t("recentBookings.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentBookings.map((b: any, i: number) => (
                <tr
                  key={i}
                  className="group hover:bg-gray-50/30 transition-colors"
                >
                  <td className="py-5 text-sm font-bold text-gray-900">
                    #{b.bookingRef}
                  </td>
                  <td className="py-5 text-sm font-medium text-gray-700">
                    {b.user}
                  </td>
                  <td className="py-5 text-sm font-medium text-gray-700 truncate max-w-[150px]">
                    {b.listing}
                  </td>
                  <td className="py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${CATEGORY_STYLES[b.category] ?? "bg-gray-50 text-gray-500"}`}
                    >
                      {b.category}
                    </span>
                  </td>
                  <td className="py-5 text-sm text-gray-500 font-medium">
                    {b.dates}
                  </td>
                  <td className="py-5 text-sm font-bold text-gray-900">
                    {b.total}
                  </td>
                  <td className="py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${STATUS_STYLES[b.status] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className={`py-5 ${isRtl ? "text-left" : "text-right"}`}>
                    <Link href={`/admin/dashboard/bookings/${b?.id}`}>
                      <button
                        className={`text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors flex items-center gap-1 ${isRtl ? "mr-auto" : "ml-auto"} text-[11px] font-bold uppercase cursor-pointer`}
                      >
                        <Eye size={14} /> {t("recentBookings.view")}
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {recentBookings.map((b: any, i: number) => (
            <div
              key={i}
              className="bg-gray-50/50 border border-gray-100 rounded-2xl p-5 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {t("recentBookings.ref")}
                  </p>
                  <h4 className="text-sm font-bold text-gray-900">
                    #{b.bookingRef}
                  </h4>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${STATUS_STYLES_MOBILE[b.status] ?? "bg-gray-200 text-gray-600"}`}
                >
                  {b.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {t("recentBookings.user")}
                  </p>
                  <p className="text-sm font-medium text-gray-700">{b.user}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {t("recentBookings.category")}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${CATEGORY_STYLES_MOBILE[b.category] ?? "bg-gray-100 text-gray-600"}`}
                  >
                    {b.category}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {t("recentBookings.listing")}
                </p>
                <p className="text-sm font-medium text-gray-700">{b.listing}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {t("recentBookings.totalAmount")}
                  </p>
                  <p className="text-lg font-black text-gray-900">{b.total}</p>
                </div>
                <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer">
                  <Eye size={16} /> {t("recentBookings.viewDetails")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8">
            {t("quickActions.title")}
          </h3>
          <div className="grid grid-cols-2 gap-6 pb-4">
            {[
              {
                label: t("quickActions.addListing"),
                icon: LayoutGrid,
                link: "/admin/dashboard/listings?addNew=true",
              },
              {
                label: t("quickActions.viewReviews"),
                icon: Star,
                link: "/admin/dashboard/reviews?status=PENDING",
              },
              { label: t("quickActions.export"), icon: Share2 },
              {
                label: t("quickActions.manualBooking"),
                icon: Calendar,
                link: "/admin/dashboard/bookings?isCreate=true",
              },
            ].map((btn, idx) => {
              const content = (
                <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-primary/10 transition-colors">
                  <btn.icon
                    size={22}
                    className="group-hover:scale-110 transition-transform text-primary"
                  />
                </div>
              );

              if (btn?.link) {
                return (
                  <Link
                    key={idx}
                    target="_blank"
                    href={btn?.link}
                    className="flex flex-col items-center justify-center gap-3 py-5 bg-white border border-dashed border-gray-300 rounded-[1.5rem] hover:border-primary hover:bg-primary/5 transition-all text-gray-400 hover:text-primary group cursor-pointer"
                  >
                    {content}
                    <span className="text-xs font-bold uppercase tracking-wider text-center px-2">
                      {btn.label}
                    </span>
                  </Link>
                );
              }
              return (
                <button
                  key={idx}
                  className="flex flex-col items-center justify-center gap-3 py-5 bg-white border border-dashed border-gray-300 rounded-[1.5rem] hover:border-primary hover:bg-primary/5 transition-all text-gray-400 hover:text-primary group cursor-pointer"
                >
                  {content}
                  <span className="text-xs font-bold uppercase tracking-wider text-center px-2">
                    {btn.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="lg:col-span-5 bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900">
              {t("recentRegistrations.title")}
            </h3>
            <Link
              href="/admin/dashboard/users"
              className="text-primary text-sm font-bold hover:underline cursor-pointer"
            >
              {t("recentRegistrations.viewAll")}
            </Link>
          </div>
          <div className="space-y-6">
            {recentRegistrations.map((user: any, i: number) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden relative flex items-center justify-center flex-shrink-0">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-gray-400">
                        {user.name?.charAt(0)?.toUpperCase() ?? "?"}
                      </span>
                    )}
                  </div>
                  <div className={isRtl ? "text-right" : "text-left"}>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {user.name}
                    </h4>
                    <p className="text-sm text-gray-400 font-medium">
                      {user.email}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-bold text-gray-400 uppercase tracking-tight shrink-0 ${isRtl ? "mr-2" : "ml-2"}`}
                >
                  {user.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
