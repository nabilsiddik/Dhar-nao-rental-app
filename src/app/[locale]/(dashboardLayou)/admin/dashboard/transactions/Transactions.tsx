// "use client";

// import { useGetTransactionsQuery } from "@/redux/features/admin/transaction.api";
// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";
// import { FiSearch, FiEye, FiMail } from "react-icons/fi";
// import { Loader2 } from "lucide-react";
// import Pagination from "@/components/common/Pagination";

// export default function Transactions() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // Extract current SSFP params from URL
//   const params = Object.fromEntries(searchParams.entries());

//   // Fetch Data using RTK Query
//   const {
//     data: transactionData,
//     isLoading,
//     isFetching,
//   } = useGetTransactionsQuery(params);
//   const transactions = transactionData?.data || [];
//   const meta = transactionData?.meta || null;
//   const stats = meta?.stats || null;

//   // Helper: Update URL Search Params
//   const updateQuery = (key: string, value: string) => {
//     const newParams = new URLSearchParams(searchParams.toString());
//     if (value && value !== "all") {
//       newParams.set(key, value);
//     } else {
//       newParams.delete(key);
//     }
//     newParams.set("page", "1"); // Reset to page 1 on filter change
//     router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
//   };

//   // Debounced Search Handler
//   const handleSearch = useDebouncedCallback((term: string) => {
//     updateQuery("searchTerm", term);
//   }, 500);

//   // Loading State
//   if (isLoading) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-primary" size={40} />
//         <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
//           Loading Transaction Data...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 pb-10">
//       <div className="flex justify-between items-end">
//         <div>
//           <h1 className="text-3xl font-black text-gray-900 tracking-tight">
//             Transactions
//           </h1>
//           <p className="mt-1 text-sm font-medium text-gray-500">
//             View and manage all platform transactions
//           </p>
//         </div>
//         {isFetching && (
//           <div className="text-primary animate-pulse text-sm font-bold uppercase">
//             Refreshing...
//           </div>
//         )}
//       </div>

//       {/* KPI METRIC CARDS */}
//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <MetricCard
//           title="Total Processed"
//           value={stats?.totalProcessed || "$0"}
//         />
//         <MetricCard
//           title="Commission Earned"
//           value={stats?.commissionEarned || "$0"}
//           valueClassName="text-primary"
//         />
//         <MetricCard
//           title="Completed"
//           value={stats?.completed || "0"}
//           valueClassName="text-green-600"
//         />
//         <MetricCard
//           title="Pending"
//           value={stats?.pending || "0"}
//           valueClassName="text-amber-500"
//         />
//       </div>

//       {/* FILTER BAR */}
//       <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
//         <div className="flex flex-col gap-3 md:flex-row md:items-center">
//           {/* SEARCH */}
//           <div className="flex flex-1 items-center gap-3 rounded-full border border-gray-200 bg-[#F9FAFB] px-5 py-3 focus-within:border-primary transition-all">
//             <FiSearch className="text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search ID, Ref, or User..."
//               defaultValue={searchParams.get("searchTerm") || ""}
//               onChange={(e) => handleSearch(e.target.value)}
//               className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-gray-400"
//             />
//           </div>

//           {/* TYPE FILTER */}
//           <select
//             value={searchParams.get("type") || "all"}
//             onChange={(e) => updateQuery("type", e.target.value)}
//             className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-600 outline-none hover:border-primary cursor-pointer min-w-[160px]"
//           >
//             <option value="all">All Types</option>
//             <option value="ONLINE">Online</option>
//             <option value="MANUAL">Manual</option>
//             <option value="REFUND">Refund</option>
//           </select>

//           {/* STATUS FILTER */}
//           <select
//             value={searchParams.get("status") || "all"}
//             onChange={(e) => updateQuery("status", e.target.value)}
//             className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-600 outline-none hover:border-primary cursor-pointer min-w-[160px]"
//           >
//             <option value="all">All Status</option>
//             <option value="PAID">Completed</option>
//             <option value="PENDING">Pending</option>
//           </select>
//         </div>
//       </div>

//       {/* DATA TABLE */}
//       <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left min-w-[1200px] border-collapse">
//             <thead>
//               <tr className="border-b border-gray-50 bg-gray-50/50 text-[11px] font-black uppercase tracking-widest text-gray-400">
//                 <th className="px-8 py-6">Transaction ID</th>
//                 <th className="px-5 py-6">Booking Ref</th>
//                 <th className="px-5 py-6">User</th>
//                 <th className="px-5 py-6">Type</th>
//                 <th className="px-5 py-6">Amount</th>
//                 <th className="px-5 py-6">Commission</th>
//                 <th className="px-5 py-6">Status</th>
//                 <th className="px-5 py-6">Date & Time</th>
//                 <th className="px-8 py-6 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {transactions.map((t: any) => (
//                 <tr
//                   key={t.id}
//                   className="text-sm font-medium text-gray-700 hover:bg-gray-50/50 transition-colors group"
//                 >
//                   <td className="px-8 py-5 font-bold text-gray-900">
//                     {t.transactionId}
//                   </td>
//                   <td className="px-5 py-5 text-gray-500 font-bold">
//                     {t.bookingRef}
//                   </td>
//                   <td className="px-5 py-5 text-gray-900">{t.user}</td>
//                   <td className="px-5 py-5">
//                     <span
//                       className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase ${
//                         t.type === "REFUND"
//                           ? "bg-red-50 text-red-600"
//                           : t.type === "MANUAL"
//                             ? "bg-orange-50 text-orange-600"
//                             : "bg-blue-50 text-blue-600"
//                       }`}
//                     >
//                       {t.type}
//                     </span>
//                   </td>
//                   <td className="px-5 py-5 font-black text-gray-900">
//                     {t.amount}
//                   </td>
//                   <td className="px-5 py-5 font-black text-primary">
//                     {t.commission}
//                   </td>
//                   <td className="px-5 py-5">
//                     <span
//                       className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase ${
//                         t.status === "PAID"
//                           ? "bg-green-50 text-green-600"
//                           : "bg-amber-50 text-amber-600"
//                       }`}
//                     >
//                       {t.status === "PAID" ? "Completed" : "Pending"}
//                     </span>
//                   </td>
//                   <td className="px-5 py-5 text-gray-500">
//                     <div>
//                       <p className="font-bold">{t.date}</p>
//                       <p className="text-[11px] text-gray-400 uppercase">
//                         {t.time}
//                       </p>
//                     </div>
//                   </td>
//                   <td className="px-8 py-5 text-right">
//                     <div className="flex items-center justify-end gap-2">
//                       <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all cursor-pointer">
//                         <FiEye size={18} />
//                       </button>
//                       <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all cursor-pointer">
//                         <FiMail size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="px-8 border-t border-gray-50">
//           <Pagination
//             total={meta?.total || 0}
//             limit={meta?.limit || 10}
//             page={meta?.page || 1}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// // Reusable Metric Card Sub-component
// function MetricCard({
//   title,
//   value,
//   valueClassName = "text-gray-900",
// }: {
//   title: string;
//   value: string;
//   valueClassName?: string;
// }) {
//   return (
//     <div className="rounded-[1.5rem] border border-gray-100 bg-white p-8 shadow-sm">
//       <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//         {title}
//       </p>
//       <p className={`text-3xl font-black ${valueClassName}`}>{value}</p>
//     </div>
//   );
// }

"use client";

import { useGetTransactionsQuery } from "@/redux/features/admin/transaction.api";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { FiSearch, FiEye, FiMail } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import Pagination from "@/components/common/Pagination";
import { useTranslations, useLocale } from "next-intl";

export default function Transactions() {
  const t = useTranslations("AdminTransactions");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());

  const {
    data: transactionData,
    isLoading,
    isFetching,
  } = useGetTransactionsQuery(params);
  const transactions = transactionData?.data || [];
  const meta = transactionData?.meta || null;
  const stats = meta?.stats || null;

  const updateQuery = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set("page", "1");
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    updateQuery("searchTerm", term);
  }, 500);

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
    <div className="space-y-6 pb-10" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex justify-between items-end">
        <div className={isRtl ? "text-right" : "text-left"}>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-500">
            {t("subtitle")}
          </p>
        </div>
        {isFetching && (
          <div className="text-primary animate-pulse text-sm font-bold uppercase">
            {t("refreshing")}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title={t("stats.total")}
          value={stats?.totalProcessed || "$0"}
          isRtl={isRtl}
        />
        <MetricCard
          title={t("stats.commission")}
          value={stats?.commissionEarned || "$0"}
          valueClassName="text-primary"
          isRtl={isRtl}
        />
        <MetricCard
          title={t("stats.completed")}
          value={stats?.completed || "0"}
          valueClassName="text-green-600"
          isRtl={isRtl}
        />
        <MetricCard
          title={t("stats.pending")}
          value={stats?.pending || "0"}
          valueClassName="text-amber-500"
          isRtl={isRtl}
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-full border border-gray-200 bg-[#F9FAFB] px-5 py-3 focus-within:border-primary transition-all">
            <FiSearch className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder={t("filters.searchPlaceholder")}
              defaultValue={searchParams.get("searchTerm") || ""}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-gray-400"
            />
          </div>

          <select
            value={searchParams.get("type") || "all"}
            onChange={(e) => updateQuery("type", e.target.value)}
            className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-600 outline-none hover:border-primary cursor-pointer min-w-[160px]"
          >
            <option value="all">{t("filters.allTypes")}</option>
            <option value="ONLINE">{t("filters.online")}</option>
            <option value="MANUAL">{t("filters.manual")}</option>
            <option value="REFUND">{t("filters.refund")}</option>
          </select>

          <select
            value={searchParams.get("status") || "all"}
            onChange={(e) => updateQuery("status", e.target.value)}
            className="rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-600 outline-none hover:border-primary cursor-pointer min-w-[160px]"
          >
            <option value="all">{t("filters.allStatus")}</option>
            <option value="PAID">{t("filters.paid")}</option>
            <option value="PENDING">{t("filters.pending")}</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table
            className={`w-full ${isRtl ? "text-right" : "text-left"} min-w-[1200px] border-collapse`}
          >
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50 text-[11px] font-black uppercase tracking-widest text-gray-400">
                <th className="px-8 py-6">{t("table.id")}</th>
                <th className="px-5 py-6">{t("table.ref")}</th>
                <th className="px-5 py-6">{t("table.user")}</th>
                <th className="px-5 py-6">{t("table.type")}</th>
                <th className="px-5 py-6">{t("table.amount")}</th>
                <th className="px-5 py-6">{t("table.commission")}</th>
                <th className="px-5 py-6">{t("table.status")}</th>
                <th className="px-5 py-6">{t("table.date")}</th>
                <th
                  className={`px-8 py-6 ${isRtl ? "text-left" : "text-right"}`}
                >
                  {t("table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {transactions.map((transaction: any) => (
                <tr
                  key={transaction.id}
                  className="text-sm font-medium text-gray-700 hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-8 py-5 font-bold text-gray-900">
                    {transaction.transactionId}
                  </td>
                  <td className="px-5 py-5 text-gray-500 font-bold">
                    {transaction.bookingRef}
                  </td>
                  <td className="px-5 py-5 text-gray-900">
                    {transaction.user}
                  </td>
                  <td className="px-5 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase ${transaction.type === "REFUND" ? "bg-red-50 text-red-600" : transaction.type === "MANUAL" ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"}`}
                    >
                      {t(`filters.${transaction.type.toLowerCase()}` as any) ||
                        transaction.type}
                    </span>
                  </td>
                  <td className="px-5 py-5 font-black text-gray-900">
                    {transaction.amount}
                  </td>
                  <td className="px-5 py-5 font-black text-primary">
                    {transaction.commission}
                  </td>
                  <td className="px-5 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase ${transaction.status === "PAID" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}
                    >
                      {transaction.status === "PAID"
                        ? t("filters.paid")
                        : t("filters.pending")}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-gray-500">
                    <div>
                      <p className="font-bold">{transaction.date}</p>
                      <p className="text-[11px] text-gray-400 uppercase">
                        {transaction.time}
                      </p>
                    </div>
                  </td>
                  <td
                    className={`px-8 py-5 ${isRtl ? "text-left" : "text-right"}`}
                  >
                    <div
                      className={`flex items-center gap-2 ${isRtl ? "justify-start" : "justify-end"}`}
                    >
                      <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all cursor-pointer">
                        <FiEye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all cursor-pointer">
                        <FiMail size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 border-t border-gray-50">
          <Pagination
            total={meta?.total || 0}
            limit={meta?.limit || 10}
            page={meta?.page || 1}
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  valueClassName = "text-gray-900",
  isRtl,
}: any) {
  return (
    <div className="rounded-[1.5rem] border border-gray-100 bg-white p-8 shadow-sm">
      <p
        className={`text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 ${isRtl ? "text-right" : "text-left"}`}
      >
        {title}
      </p>
      <p
        className={`text-3xl font-black ${valueClassName} ${isRtl ? "text-right" : "text-left"}`}
      >
        {value}
      </p>
    </div>
  );
}
