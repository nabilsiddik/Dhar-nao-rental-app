// "use client";
// import { useGetRevenueOverviewQuery } from "@/redux/features/admin/revenue.api";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";
// import React from "react";
// import { FiArrowUpRight, FiDollarSign } from "react-icons/fi";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// export default function Revenue() {
//   const { data: overviewData, isLoading } =
//     useGetRevenueOverviewQuery(undefined);
//   const overview = overviewData?.data || null;

//   const stats = [
//     {
//       label: "Total Revenue (6 months)",
//       value: `$${overview?.kpiCards?.totalRevenue?.value?.toLocaleString() || "0"}`,
//       change: overview?.kpiCards?.totalRevenue?.growth || "+0%",
//       icon: FiDollarSign,
//     },
//     {
//       label: "Commission Earned",
//       value: `$${overview?.kpiCards?.commissionEarned?.value?.toLocaleString() || "0"}`,
//       change: overview?.kpiCards?.commissionEarned?.growth || "+0%",
//       icon: FiDollarSign,
//     },
//     {
//       label: "Average Booking Value",
//       value: `$${overview?.kpiCards?.avgBookingValue?.value?.toFixed(2) || "0"}`,
//       change: overview?.kpiCards?.avgBookingValue?.growth || "+0%",
//       icon: FiDollarSign,
//     },
//     {
//       label: "Monthly Growth",
//       value: `${overview?.kpiCards?.monthlyGrowth?.value || "0"}%`,
//       change: overview?.kpiCards?.monthlyGrowth?.growth || "+0%",
//       icon: FiArrowUpRight,
//     },
//   ];

//   const trendData = overview?.revenueTrend || [];

//   const categoryStats = [
//     {
//       name: "Cars",
//       growth: "",
//       bookings: overview?.breakdown?.cars?.totalBookings || 0,
//       revenue: `$${overview?.breakdown?.cars?.totalRevenue?.toLocaleString() || "0"}`,
//       commission: `$${overview?.breakdown?.cars?.commissionEarned?.toLocaleString() || "0"}`,
//       avgBooking: `$${overview?.breakdown?.cars?.avgPerBooking?.toFixed(2) || "0"}`,
//     },
//     {
//       name: "Apartments",
//       growth: "",
//       bookings: overview?.breakdown?.apartments?.totalBookings || 0,
//       revenue: `$${overview?.breakdown?.apartments?.totalRevenue?.toLocaleString() || "0"}`,
//       commission: `$${overview?.breakdown?.apartments?.commissionEarned?.toLocaleString() || "0"}`,
//       avgBooking: `$${overview?.breakdown?.apartments?.avgPerBooking?.toFixed(2) || "0"}`,
//     },
//   ];

//   if (isLoading) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-primary" size={40} />
//         <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
//           Loading Revenue Overview Data...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900">
//             Revenue Overview
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Track platform revenue and financial performance
//           </p>
//         </div>

//         <Link href="/admin/dashboard/transactions">
//           <button className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-purple-700">
//             View Transactions
//             <FiArrowUpRight />
//           </button>
//         </Link>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//         {stats.map((item) => {
//           const Icon = item.icon;
//           return (
//             <div
//               key={item.label}
//               className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
//             >
//               <div className="flex items-start justify-between gap-4">
//                 <div className="rounded-2xl bg-purple-50 p-3 text-purple-500">
//                   <Icon size={18} />
//                 </div>
//                 <span className="text-sm font-medium text-green-500">
//                   ↗ {item.change}
//                 </span>
//               </div>
//               <p className="mt-4 text-3xl font-semibold text-gray-900">
//                 {item.value}
//               </p>
//               <p className="mt-1 text-sm text-gray-500">{item.label}</p>
//             </div>
//           );
//         })}
//       </div>

//       <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
//         <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
//           <div className="flex items-center gap-4 text-sm text-gray-500">
//             <LegendItem color="#A446FF" label="Cars" />
//             <LegendItem color="#2563EB" label="Apartments" />
//             <LegendItem color="#10B981" label="Commission" />
//           </div>
//         </div>

//         <div className="h-90 w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={trendData}
//               margin={{ top: 10, right: 10, left: -12, bottom: 0 }}
//               barCategoryGap="18%"
//             >
//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 stroke="#e5e7eb"
//                 vertical={false}
//               />
//               <XAxis
//                 dataKey="month"
//                 tickLine={false}
//                 axisLine={false}
//                 tick={{ fill: "#6b7280", fontSize: 12 }}
//               />
//               <YAxis
//                 tickLine={false}
//                 axisLine={false}
//                 tick={{ fill: "#6b7280", fontSize: 12 }}
//                 width={36}
//               />
//               <Tooltip
//                 cursor={{ fill: "rgba(168, 85, 247, 0.06)" }}
//                 contentStyle={{
//                   borderRadius: 14,
//                   borderColor: "#e5e7eb",
//                   boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
//                 }}
//               />
//               <Bar
//                 dataKey="cars"
//                 name="Cars Revenue"
//                 fill="#a855f7"
//                 radius={[8, 8, 0, 0]}
//                 barSize={60}
//               />
//               <Bar
//                 dataKey="apartments"
//                 name="Apartments Revenue"
//                 fill="#3b82f6"
//                 radius={[8, 8, 0, 0]}
//                 barSize={60}
//               />
//               <Bar
//                 dataKey="commission"
//                 name="Commission"
//                 fill="#10b981"
//                 radius={[8, 8, 0, 0]}
//                 barSize={60}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500">
//           <LegendItem color="#A446FF" label="Cars Revenue" />
//           <LegendItem color="#2563EB" label="Apartments Revenue" />
//           <LegendItem color="#10B981" label="Commission" />
//         </div>
//       </div>

//       <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
//         <h2 className="text-lg font-semibold text-gray-900">
//           Revenue by Category
//         </h2>

//         <div className="mt-4 grid gap-4 lg:grid-cols-2">
//           {categoryStats.map((category) => (
//             <div
//               key={category.name}
//               className="rounded-2xl border border-gray-100 p-5 shadow-sm"
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h3 className="text-base font-semibold text-gray-900">
//                     {category.name}
//                   </h3>
//                 </div>
//                 <span className="text-sm font-semibold text-green-500">
//                   {category.growth}
//                 </span>
//               </div>

//               <div className="mt-4 grid gap-3 text-sm">
//                 <Row label="Total Bookings" value={category.bookings} />
//                 <Row
//                   label="Total Revenue"
//                   value={category.revenue}
//                   valueClassName="text-gray-900"
//                 />
//                 <Row
//                   label="Commission Earned"
//                   value={category.commission}
//                   valueClassName="text-purple-600"
//                 />
//                 <Row
//                   label="Avg per Booking"
//                   value={category.avgBooking}
//                   valueClassName="text-gray-900"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function LegendItem({ color, label }: { color: string; label: string }) {
//   return (
//     <span className="inline-flex items-center gap-2">
//       <span
//         className="h-2.5 w-2.5 rounded-full"
//         style={{ backgroundColor: color }}
//       />
//       {label}
//     </span>
//   );
// }

// function Row({
//   label,
//   value,
//   valueClassName = "text-gray-900",
// }: {
//   label: string;
//   value: React.ReactNode;
//   valueClassName?: string;
// }) {
//   return (
//     <div className="flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0">
//       <span className="text-gray-500">{label}</span>
//       <span className={`font-semibold ${valueClassName}`}>{value}</span>
//     </div>
//   );
// }

"use client";
import { useGetRevenueOverviewQuery } from "@/redux/features/admin/revenue.api";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FiArrowUpRight, FiDollarSign } from "react-icons/fi";
import { useTranslations, useLocale } from "next-intl";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Revenue() {
  const t = useTranslations("AdminRevenue");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const { data: overviewData, isLoading } =
    useGetRevenueOverviewQuery(undefined);
  const overview = overviewData?.data || null;

  const stats = [
    {
      label: t("kpi.total"),
      value: `$${overview?.kpiCards?.totalRevenue?.value?.toLocaleString() || "0"}`,
      change: overview?.kpiCards?.totalRevenue?.growth || "+0%",
      icon: FiDollarSign,
    },
    {
      label: t("kpi.commission"),
      value: `$${overview?.kpiCards?.commissionEarned?.value?.toLocaleString() || "0"}`,
      change: overview?.kpiCards?.commissionEarned?.growth || "+0%",
      icon: FiDollarSign,
    },
    {
      label: t("kpi.avgValue"),
      value: `$${overview?.kpiCards?.avgBookingValue?.value?.toFixed(2) || "0"}`,
      change: overview?.kpiCards?.avgBookingValue?.growth || "+0%",
      icon: FiDollarSign,
    },
    {
      label: t("kpi.growth"),
      value: `${overview?.kpiCards?.monthlyGrowth?.value || "0"}%`,
      change: overview?.kpiCards?.monthlyGrowth?.growth || "+0%",
      icon: FiArrowUpRight,
    },
  ];

  const trendData = overview?.revenueTrend || [];

  const categoryStats = [
    {
      name: t("categoryBreakdown.cars"),
      growth: "",
      bookings: overview?.breakdown?.cars?.totalBookings || 0,
      revenue: `$${overview?.breakdown?.cars?.totalRevenue?.toLocaleString() || "0"}`,
      commission: `$${overview?.breakdown?.cars?.commissionEarned?.toLocaleString() || "0"}`,
      avgBooking: `$${overview?.breakdown?.cars?.avgPerBooking?.toFixed(2) || "0"}`,
    },
    {
      name: t("categoryBreakdown.apartments"),
      growth: "",
      bookings: overview?.breakdown?.apartments?.totalBookings || 0,
      revenue: `$${overview?.breakdown?.apartments?.totalRevenue?.toLocaleString() || "0"}`,
      commission: `$${overview?.breakdown?.apartments?.commissionEarned?.toLocaleString() || "0"}`,
      avgBooking: `$${overview?.breakdown?.apartments?.avgPerBooking?.toFixed(2) || "0"}`,
    },
  ];

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

  return (
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className={isRtl ? "text-right" : "text-left"}>
          <h1 className="text-2xl font-semibold text-gray-900">{t("title")}</h1>
          <p className="mt-1 text-sm text-gray-500">{t("subtitle")}</p>
        </div>

        <Link href="/admin/dashboard/transactions">
          <button className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-purple-700">
            {t("viewTransactions")}
            <FiArrowUpRight className={isRtl ? "rotate-[-90deg]" : ""} />
          </button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-2xl bg-purple-50 p-3 text-purple-500">
                  <Icon size={18} />
                </div>
                <span className="text-sm font-medium text-green-500">
                  ↗ {item.change}
                </span>
              </div>
              <p
                className={`mt-4 text-3xl font-semibold text-gray-900 ${isRtl ? "text-right" : "text-left"}`}
              >
                {item.value}
              </p>
              <p
                className={`mt-1 text-sm text-gray-500 ${isRtl ? "text-right" : "text-left"}`}
              >
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("trend.title")}
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <LegendItem color="#A446FF" label={t("trend.cars")} />
            <LegendItem color="#2563EB" label={t("trend.apartments")} />
            <LegendItem color="#10B981" label={t("trend.commission")} />
          </div>
        </div>

        <div className="h-90 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={trendData}
              margin={{ top: 10, right: 10, left: -12, bottom: 0 }}
              barCategoryGap="18%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                reversed={isRtl}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                width={36}
                orientation={isRtl ? "right" : "left"}
              />
              <Tooltip
                cursor={{ fill: "rgba(168, 85, 247, 0.06)" }}
                contentStyle={{
                  borderRadius: 14,
                  borderColor: "#e5e7eb",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  textAlign: isRtl ? "right" : "left",
                }}
              />
              <Bar
                dataKey="cars"
                name={t("trend.carsRevenue")}
                fill="#a855f7"
                radius={[8, 8, 0, 0]}
                barSize={60}
              />
              <Bar
                dataKey="apartments"
                name={t("trend.apartmentsRevenue")}
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
                barSize={60}
              />
              <Bar
                dataKey="commission"
                name={t("trend.commission")}
                fill="#10b981"
                radius={[8, 8, 0, 0]}
                barSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500">
          <LegendItem color="#A446FF" label={t("trend.carsRevenue")} />
          <LegendItem color="#2563EB" label={t("trend.apartmentsRevenue")} />
          <LegendItem color="#10B981" label={t("trend.commission")} />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2
          className={`text-lg font-semibold text-gray-900 ${isRtl ? "text-right" : "text-left"}`}
        >
          {t("categoryBreakdown.title")}
        </h2>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {categoryStats.map((category) => (
            <div
              key={category.name}
              className="rounded-2xl border border-gray-100 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {category.name}
                  </h3>
                </div>
                <span className="text-sm font-semibold text-green-500">
                  {category.growth}
                </span>
              </div>

              <div className="mt-4 grid gap-3 text-sm">
                <Row
                  label={t("categoryBreakdown.totalBookings")}
                  value={category.bookings}
                  isRtl={isRtl}
                />
                <Row
                  label={t("categoryBreakdown.totalRevenue")}
                  value={category.revenue}
                  valueClassName="text-gray-900"
                  isRtl={isRtl}
                />
                <Row
                  label={t("categoryBreakdown.commissionEarned")}
                  value={category.commission}
                  valueClassName="text-purple-600"
                  isRtl={isRtl}
                />
                <Row
                  label={t("categoryBreakdown.avgPerBooking")}
                  value={category.avgBooking}
                  valueClassName="text-gray-900"
                  isRtl={isRtl}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}

function Row({
  label,
  value,
  valueClassName = "text-gray-900",
  isRtl,
}: {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
  isRtl: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between border-b border-gray-50 pb-2 last:border-0 last:pb-0 ${isRtl ? "flex-row-reverse" : ""}`}
    >
      <span className="text-gray-500">{label}</span>
      <span className={`font-semibold ${valueClassName}`}>{value}</span>
    </div>
  );
}
