// "use client";
// import Pagination from "@/components/common/Pagination";
// import {
//   useDeleteNotificationMutation,
//   useMarkAllAsReadMutation,
// } from "@/redux/features/notification/notification.api";
// import { useGetAllNotificationsQuery } from "@/redux/features/userApis/userApis";
// import { Loader2 } from "lucide-react";
// import { usePathname, useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import {
//   FiTrash2,
//   FiChevronLeft,
//   FiChevronRight,
//   FiCalendar,
//   FiDollarSign,
//   FiMail,
//   FiAlertCircle,
//   FiDatabase,
//   FiUser,
//   FiBell,
// } from "react-icons/fi";
// import { toast } from "sonner";

// export default function Notifications() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const page = Number(searchParams.get("page")) || 1;
//   const limit = Number(searchParams.get("limit")) || 10;
//   const params = Object.fromEntries(searchParams.entries());

//   const { data: notificationData, isLoading } =
//     useGetAllNotificationsQuery(params);
//   const [deleteNotification] = useDeleteNotificationMutation();
//   const [markAllRead] = useMarkAllAsReadMutation();

//   const notifications = notificationData?.data || [];
//   const meta = notificationData?.meta || { total: 0 };

//   console.log(meta, "meta");

//   const updateQuery = (updates: Record<string, string>) => {
//     const newParams = new URLSearchParams(searchParams.toString());
//     Object.entries(updates).forEach(([key, value]) =>
//       newParams.set(key, value),
//     );
//     router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
//   };

//   const handleDelete = async (id: string) => {
//     const toastId = toast.loading("Deleting notification...");
//     try {
//       await deleteNotification(id).unwrap();
//       toast.success("Deleted", { id: toastId });
//     } catch (err) {
//       toast.error("Failed to delete", { id: toastId });
//     }
//   };

//   // const handleMarkAllRead = async () => {
//   //   try {
//   //     await markAllRead(undefined).unwrap();
//   //     toast.success("All caught up!");
//   //   } catch (err) {
//   //     toast.error("Action failed");
//   //   }
//   // };

//   if (isLoading) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center">
//         <Loader2 className="animate-spin text-primary" size={40} />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold">All Notifications</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             View and manage platform notifications
//           </p>
//         </div>
//         {/*
//         {/* HEADER */}
//         {/* <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-3xl font-black text-gray-900 tracking-tight">
//               Notifications
//             </h2>
//             <p className="text-sm font-medium text-gray-500">
//               View and manage platform activity logs
//             </p>
//           </div>
//           <button
//             onClick={handleMarkAllRead}
//             className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer"
//           >
//             Mark All as Read
//           </button>
//         </div> */}
//       </div>

//       <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
//         <ul className="divide-y divide-gray-100">
//           {notifications?.length > 0 &&
//             notifications?.map((n: any) => {
//               const Icon =
//                 n.type === "BOOKING"
//                   ? FiCalendar
//                   : n.type === "PAYMENT"
//                     ? FiDollarSign
//                     : n.type === "REVIEW"
//                       ? FiMail
//                       : n.type === "ALERT"
//                         ? FiAlertCircle
//                         : n.type === "SYSTEM"
//                           ? FiDatabase
//                           : n.type === "USER"
//                             ? FiUser
//                             : FiBell;
//               const bg =
//                 n.type === "BOOKING"
//                   ? "bg-blue-50 text-blue-600"
//                   : n.type === "PAYMENT"
//                     ? "bg-green-50 text-green-600"
//                     : n.type === "REVIEW"
//                       ? "bg-pink-50 text-pink-600"
//                       : n.type === "ALERT"
//                         ? "bg-red-50 text-red-600"
//                         : n.type === "SYSTEM"
//                           ? "bg-gray-50 text-gray-700"
//                           : n.type === "USER"
//                             ? "bg-purple-50 text-purple-600"
//                             : "bg-gray-50 text-gray-700";

//               return (
//                 <li
//                   key={n.id}
//                   className="flex items-center justify-between p-4"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div
//                       className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg}`}
//                     >
//                       <Icon />
//                     </div>
//                     <div>
//                       <div className="flex items-center gap-3">
//                         <span className="text-sm font-semibold">{n.title}</span>
//                         <span className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full font-medium">
//                           {n.type}
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-500 mt-1">{n.body}</p>
//                       <p className="text-xs text-gray-400 mt-2">{n.time}</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => handleDelete(n.id)}
//                       className="text-gray-400 hover:text-red-600"
//                       aria-label={`Delete notification ${n.id}`}
//                     >
//                       <FiTrash2 />
//                     </button>
//                   </div>
//                 </li>
//               );
//             })}
//         </ul>
//       </div>

//       {/* <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">
//           Showing {notifications?.length} notifications
//         </p>
//         <div className="flex items-center gap-2">
//           <button className="p-2 rounded border border-gray-100">
//             <FiChevronLeft />
//           </button>
//           <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
//             1
//           </div>
//           <button className="p-2 rounded border border-gray-100">
//             <FiChevronRight />
//           </button>
//         </div>
//       </div> */}

//       {meta && (
//         <div className="px-8 border-t border-gray-50">
//           <Pagination
//             total={Number(meta.total)}
//             limit={Number(meta.limit)}
//             page={Number(meta.page)}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import Pagination from "@/components/common/Pagination";
import { useDeleteNotificationMutation } from "@/redux/features/notification/notification.api";
import { useGetAllNotificationsQuery } from "@/redux/features/userApis/userApis";
import { Loader2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  FiTrash2,
  FiCalendar,
  FiDollarSign,
  FiMail,
  FiAlertCircle,
  FiDatabase,
  FiUser,
  FiBell,
} from "react-icons/fi";
import { toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";

export default function Notifications() {
  const t = useTranslations("AdminNotifications");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const params = Object.fromEntries(useSearchParams().entries());
  const { data: notificationData, isLoading } =
    useGetAllNotificationsQuery(params);
  const [deleteNotification] = useDeleteNotificationMutation();

  const notifications = notificationData?.data || [];
  const meta = notificationData?.meta || { total: 0 };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading(t("toasts.deleting"));
    try {
      await deleteNotification(id).unwrap();
      toast.success(t("toasts.success"), { id: toastId });
    } catch (err) {
      toast.error(t("toasts.error"), { id: toastId });
    }
  };

  if (isLoading)
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );

  return (
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <div className={isRtl ? "text-right" : "text-left"}>
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <ul className="divide-y divide-gray-100">
          {notifications.map((n: any) => {
            const Icon =
              n.type === "BOOKING"
                ? FiCalendar
                : n.type === "PAYMENT"
                  ? FiDollarSign
                  : n.type === "REVIEW"
                    ? FiMail
                    : n.type === "ALERT"
                      ? FiAlertCircle
                      : n.type === "SYSTEM"
                        ? FiDatabase
                        : n.type === "USER"
                          ? FiUser
                          : FiBell;
            const bg =
              n.type === "BOOKING"
                ? "bg-blue-50 text-blue-600"
                : n.type === "PAYMENT"
                  ? "bg-green-50 text-green-600"
                  : n.type === "REVIEW"
                    ? "bg-pink-50 text-pink-600"
                    : n.type === "ALERT"
                      ? "bg-red-50 text-red-600"
                      : n.type === "SYSTEM"
                        ? "bg-gray-50 text-gray-700"
                        : n.type === "USER"
                          ? "bg-purple-50 text-purple-600"
                          : "bg-gray-50 text-gray-700";

            return (
              <li
                key={n.id}
                className="flex items-center justify-between p-4 group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${bg}`}
                  >
                    <Icon />
                  </div>
                  <div className={isRtl ? "text-right" : "text-left"}>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-gray-900">
                        {n.title}
                      </span>
                      <span className="text-[9px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-black uppercase">
                        {n.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{n.body}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-2 tracking-tighter">
                      {n.time}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="text-gray-300 hover:text-red-600 p-2 cursor-pointer transition-colors"
                >
                  <FiTrash2 size={18} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {meta && (
        <div className="px-8 border-t border-gray-50">
          <Pagination
            total={Number(meta.total)}
            limit={Number(meta.limit)}
            page={Number(meta.page)}
          />
        </div>
      )}
    </div>
  );
}
