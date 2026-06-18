// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";
// import {
//   FiEye,
//   FiTrash2,
//   FiMessageSquare,
//   FiMail,
//   FiClock,
//   FiCheckCircle,
//   FiSearch,
//   FiAlertTriangle,
// } from "react-icons/fi";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import {
//   useGetAllInquiriesQuery,
//   useDeleteInquiryMutation,
// } from "@/redux/features/admin/inquiry.api";
// import Pagination from "@/components/common/Pagination";
// import Modal from "@/components/common/modals/Modal";

// export default function Messages() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   // --- 1. STATE & API ---
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const params = Object.fromEntries(searchParams.entries());
//   const { data: inquiryData, isLoading } = useGetAllInquiriesQuery(params);
//   const [deleteInquiry, { isLoading: isDeleting }] = useDeleteInquiryMutation();

//   const inquiries = inquiryData?.data || [];
//   const meta = inquiryData?.meta || null;
//   const stats = meta?.stats;

//   // --- 2. HANDLERS ---
//   const updateQuery = (key: string, value: string) => {
//     const newParams = new URLSearchParams(searchParams.toString());
//     if (value && value !== "all") newParams.set(key, value);
//     else newParams.delete(key);
//     newParams.set("page", "1");
//     router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
//   };

//   const handleSearch = useDebouncedCallback((term: string) => {
//     updateQuery("searchTerm", term);
//   }, 500);

//   // Triggered when user clicks Trash icon
//   const handleDeleteClick = (id: string) => {
//     setDeleteId(id);
//     setIsModalOpen(true);
//   };

//   // Triggered when user clicks "Delete" inside Modal
//   const handleConfirmDelete = async () => {
//     if (!deleteId) return;
//     const toastId = toast.loading("Deleting message...");
//     try {
//       await deleteInquiry(deleteId).unwrap();
//       toast.success("Message deleted successfully", { id: toastId });
//       setIsModalOpen(false);
//       setDeleteId(null);
//     } catch (err) {
//       toast.error("Failed to delete message", { id: toastId });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-primary" size={40} />
//         <p className="text-gray-400 font-black uppercase tracking-widest text-sm">
//           Syncing Inbox...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 pb-10">
//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-black text-gray-900 tracking-tight">
//             Contact & Inquiries
//           </h2>
//           <p className="text-sm font-medium text-gray-500 mt-1">
//             Manage messages and respond to user inquiries
//           </p>
//         </div>
//         {stats?.unreadCount > 0 && (
//           <span className="bg-red-500 text-white text-[11px] font-black uppercase px-3 py-1.5 rounded-lg shadow-lg shadow-red-100">
//             {stats.unreadCount} unread
//           </span>
//         )}
//       </div>

//       {/* KPI STATS CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <StatCard
//           title="Total Messages"
//           val={stats?.totalMessages || 0}
//           icon={FiMessageSquare}
//           color="gray"
//         />
//         <StatCard
//           title="Unread"
//           val={stats?.unreadCount || 0}
//           icon={FiMail}
//           color="red"
//         />
//         <StatCard
//           title="Awaiting Reply"
//           val={stats?.awaitingReply || 0}
//           icon={FiClock}
//           color="yellow"
//         />
//         <StatCard
//           title="Resolved Today"
//           val={stats?.resolvedToday || 0}
//           icon={FiCheckCircle}
//           color="green"
//         />
//       </div>

//       {/* SEARCH & FILTERS */}
//       <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col md:flex-row gap-4">
//         <div className="flex-1 flex items-center gap-3 rounded-full border border-gray-200 bg-[#F9FAFB] px-5 py-3 focus-within:border-primary transition-all">
//           <FiSearch className="text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by name, email, or subject..."
//             defaultValue={searchParams.get("searchTerm") || ""}
//             onChange={(e) => handleSearch(e.target.value)}
//             className="w-full bg-transparent text-sm font-medium outline-none"
//           />
//         </div>
//         <select
//           value={searchParams.get("status") || "all"}
//           onChange={(e) => updateQuery("status", e.target.value)}
//           className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-600 outline-none cursor-pointer"
//         >
//           <option value="all">All Status</option>
//           <option value="UNREAD">Unread</option>
//           <option value="READ">Read</option>
//           <option value="REPLIED">Replied</option>
//           <option value="RESOLVED">Resolved</option>
//         </select>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left min-w-[1200px] border-collapse">
//             <thead>
//               <tr className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 bg-gray-50/50">
//                 <th className="px-8 py-6">Sender</th>
//                 <th className="px-6 py-6">Subject</th>
//                 <th className="px-6 py-6 text-center">Status</th>
//                 <th className="px-8 py-6 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {inquiries.map((m: any) => (
//                 <tr
//                   key={m.id}
//                   className="hover:bg-gray-50/30 transition-colors group"
//                 >
//                   <td className="px-8 py-5">
//                     <div className="flex items-center gap-4">
//                       <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-black shrink-0">
//                         {m.name
//                           .split(" ")
//                           .map((n: string) => n[0])
//                           .slice(0, 2)
//                           .join("")}
//                       </div>
//                       <div className="min-w-0">
//                         <div className="flex items-center gap-2">
//                           <span className="font-bold text-gray-900 text-sm">
//                             {m.name}
//                           </span>
//                           {m.status === "UNREAD" && (
//                             <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
//                           )}
//                         </div>
//                         <p className="text-sm text-gray-400 font-medium">
//                           {m.email}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-5">
//                     <div className="font-bold text-gray-800 text-sm max-w-[300px] truncate">
//                       {m.subject}
//                     </div>
//                     <p className="text-gray-400 text-sm font-medium line-clamp-1 italic">
//                       {m.message}
//                     </p>
//                   </td>
//                   <td className="px-6 py-5 text-center">
//                     <span
//                       className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
//                         m.status === "UNREAD"
//                           ? "bg-blue-50 text-blue-600"
//                           : m.status === "READ"
//                             ? "bg-gray-100 text-gray-500"
//                             : m.status === "REPLIED"
//                               ? "bg-yellow-50 text-yellow-600"
//                               : "bg-green-50 text-green-600"
//                       }`}
//                     >
//                       {m.status}
//                     </span>
//                   </td>
//                   <td className="px-8 py-5 text-right">
//                     <div className="flex items-center justify-end gap-2">
//                       <Link
//                         href={`/admin/dashboard/messages/${m.id}`}
//                         className="p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all cursor-pointer"
//                       >
//                         <FiEye size={18} />
//                       </Link>
//                       <button
//                         onClick={() => handleDeleteClick(m.id)}
//                         className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
//                       >
//                         <FiTrash2 size={18} />
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

//       {/* --- DELETE CONFIRMATION MODAL --- */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         title="Confirm Delete"
//       >
//         <div className="text-center space-y-6">
//           <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
//             <FiAlertTriangle size={32} />
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">
//               Are you sure?
//             </h3>
//             <p className="text-gray-500 text-sm leading-relaxed font-medium">
//               You are about to delete this inquiry permanently. This action
//               cannot be undone.
//             </p>
//           </div>
//           <div className="flex gap-4 pt-2">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-all cursor-pointer"
//             >
//               Cancel
//             </button>
//             <button
//               disabled={isDeleting}
//               onClick={handleConfirmDelete}
//               className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-100 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
//             >
//               {isDeleting ? "Deleting..." : "Yes, Delete"}
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// // Sub-component for KPI cards
// const StatCard = ({ title, val, icon: Icon, color }: any) => {
//   const colors: any = {
//     red: "bg-red-50 text-red-600",
//     yellow: "bg-yellow-50 text-yellow-600",
//     green: "bg-green-50 text-green-600",
//     gray: "bg-gray-50 text-gray-700",
//   };
//   return (
//     <div className="bg-white border border-gray-100 rounded-[1.5rem] p-6 flex items-center gap-5 shadow-sm">
//       <div
//         className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color]}`}
//       >
//         <Icon size={24} />
//       </div>
//       <div>
//         <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
//           {title}
//         </p>
//         <p className="text-2xl font-black text-gray-900 mt-1">{val}</p>
//       </div>
//     </div>
//   );
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  FiEye,
  FiTrash2,
  FiMessageSquare,
  FiMail,
  FiClock,
  FiCheckCircle,
  FiSearch,
  FiAlertTriangle,
} from "react-icons/fi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  useGetAllInquiriesQuery,
  useDeleteInquiryMutation,
} from "@/redux/features/admin/inquiry.api";
import Pagination from "@/components/common/Pagination";
import Modal from "@/components/common/modals/Modal";
import { useTranslations, useLocale } from "next-intl";

export default function Messages() {
  const t = useTranslations("AdminMessages");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = Object.fromEntries(searchParams.entries());
  const { data: inquiryData, isLoading } = useGetAllInquiriesQuery(params);
  const [deleteInquiry, { isLoading: isDeleting }] = useDeleteInquiryMutation();

  const inquiries = inquiryData?.data || [];
  const meta = inquiryData?.meta || null;
  const stats = meta?.stats;

  const updateQuery = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") newParams.set(key, value);
    else newParams.delete(key);
    newParams.set("page", "1");
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    updateQuery("searchTerm", term);
  }, 500);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    const toastId = toast.loading(t("toasts.deleting"));
    try {
      await deleteInquiry(deleteId).unwrap();
      toast.success(t("toasts.success"), { id: toastId });
      setIsModalOpen(false);
      setDeleteId(null);
    } catch (err) {
      toast.error(t("toasts.error"), { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-gray-400 font-black uppercase tracking-widest text-sm">
          {t("loading")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <div className={isRtl ? "text-right" : "text-left"}>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm font-medium text-gray-500 mt-1">
            {t("subtitle")}
          </p>
        </div>
        {stats?.unreadCount > 0 && (
          <span className="bg-red-500 text-white text-[11px] font-black uppercase px-3 py-1.5 rounded-lg shadow-lg shadow-red-100">
            {t("unreadBadge", { count: stats.unreadCount })}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title={t("stats.total")}
          val={stats?.totalMessages || 0}
          icon={FiMessageSquare}
          color="gray"
          isRtl={isRtl}
        />
        <StatCard
          title={t("stats.unread")}
          val={stats?.unreadCount || 0}
          icon={FiMail}
          color="red"
          isRtl={isRtl}
        />
        <StatCard
          title={t("stats.awaiting")}
          val={stats?.awaitingReply || 0}
          icon={FiClock}
          color="yellow"
          isRtl={isRtl}
        />
        <StatCard
          title={t("stats.resolved")}
          val={stats?.resolvedToday || 0}
          icon={FiCheckCircle}
          color="green"
          isRtl={isRtl}
        />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center gap-3 rounded-full border border-gray-200 bg-[#F9FAFB] px-5 py-3 focus-within:border-primary transition-all">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder={t("filters.searchPlaceholder")}
            defaultValue={searchParams.get("searchTerm") || ""}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-transparent text-sm font-medium outline-none"
          />
        </div>
        <select
          value={searchParams.get("status") || "all"}
          onChange={(e) => updateQuery("status", e.target.value)}
          className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-600 outline-none cursor-pointer"
        >
          <option value="all">{t("filters.allStatus")}</option>
          <option value="UNREAD">{t("filters.unread")}</option>
          <option value="READ">{t("filters.read")}</option>
          <option value="REPLIED">{t("filters.replied")}</option>
          <option value="RESOLVED">{t("filters.resolved")}</option>
        </select>
      </div>

      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table
            className={`w-full ${isRtl ? "text-right" : "text-left"} min-w-[1200px] border-collapse`}
          >
            <thead>
              <tr className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 bg-gray-50/50">
                <th className="px-8 py-6">{t("table.sender")}</th>
                <th className="px-6 py-6">{t("table.subject")}</th>
                <th className="px-6 py-6 text-center">{t("table.status")}</th>
                <th
                  className={`px-8 py-6 ${isRtl ? "text-left" : "text-right"}`}
                >
                  {t("table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {inquiries.map((m: any) => (
                <tr
                  key={m.id}
                  className="hover:bg-gray-50/30 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-black shrink-0">
                        {m.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900 text-sm">
                            {m.name}
                          </span>
                          {m.status === "UNREAD" && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400 font-medium">
                          {m.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-bold text-gray-800 text-sm max-w-[300px] truncate">
                      {m.subject}
                    </div>
                    <p className="text-gray-400 text-sm font-medium line-clamp-1 italic">
                      {m.message}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        m.status === "UNREAD"
                          ? "bg-blue-50 text-blue-600"
                          : m.status === "READ"
                            ? "bg-gray-100 text-gray-500"
                            : m.status === "REPLIED"
                              ? "bg-yellow-50 text-yellow-600"
                              : "bg-green-50 text-green-600"
                      }`}
                    >
                      {t(`filters.${m.status.toLowerCase()}` as any)}
                    </span>
                  </td>
                  <td
                    className={`px-8 py-5 ${isRtl ? "text-left" : "text-right"}`}
                  >
                    <div
                      className={`flex items-center gap-2 ${isRtl ? "justify-start" : "justify-end"}`}
                    >
                      <Link
                        href={`/admin/dashboard/messages/${m.id}`}
                        className="p-2.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all cursor-pointer"
                      >
                        <FiEye size={18} />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(m.id)}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                      >
                        <FiTrash2 size={18} />
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("modal.title")}
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <FiAlertTriangle size={32} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t("modal.confirm")}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              {t("modal.desc")}
            </p>
          </div>
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-all cursor-pointer"
            >
              {t("modal.cancel")}
            </button>
            <button
              disabled={isDeleting}
              onClick={handleConfirmDelete}
              className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg hover:bg-red-600 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isDeleting ? t("modal.deleting") : t("modal.delete")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const StatCard = ({ title, val, icon: Icon, color, isRtl }: any) => {
  const colors: any = {
    red: "bg-red-50 text-red-600",
    yellow: "bg-yellow-50 text-yellow-600",
    green: "bg-green-50 text-green-600",
    gray: "bg-gray-50 text-gray-700",
  };
  return (
    <div className="bg-white border border-gray-100 rounded-[1.5rem] p-6 flex items-center gap-5 shadow-sm">
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color]}`}
      >
        <Icon size={24} />
      </div>
      <div className={isRtl ? "text-right" : "text-left"}>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          {title}
        </p>
        <p className="text-2xl font-black text-gray-900 mt-1">{val}</p>
      </div>
    </div>
  );
};
