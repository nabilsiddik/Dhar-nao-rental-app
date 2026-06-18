// "use client";

// import Link from "next/link";
// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";
// import {
//   FiSearch,
//   FiEye,
//   FiMail,
//   FiUserMinus,
//   FiAlertTriangle,
// } from "react-icons/fi";
// import {
//   useGetAllUsersQuery,
//   useSoftDeleteUserMutation,
//   useSuspendUserMutation,
// } from "@/redux/features/admin/usersApi";
// import Image from "next/image";
// import { Loader2, User } from "lucide-react";
// import Pagination from "@/components/common/Pagination";
// import { toast } from "sonner";
// import { useState } from "react";
// import Modal from "@/components/common/modals/Modal";
// import ContactUserForm from "@/components/form/ContactUserForm";
// import { useSendMessageToUserMutation } from "@/redux/features/admin/inquiry.api";

// export default function AllUsers() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const [sendMessage, { isLoading: isSending }] =
//     useSendMessageToUserMutation();
//   const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//   const [contactUser, setContactUser] = useState<any>();

//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState<any>(null);

//   const [suspendUser, { isLoading: isDeleting }] = useSuspendUserMutation();

//   const handleDeleteClick = (user: any) => {
//     setUserToDelete(user);
//     setIsDeleteModalOpen(true);
//   };

//   const handleConfirmSoftDelete = async () => {
//     if (!userToDelete?.id) return;

//     const toastId = toast.loading("Suspending user account...");
//     try {
//       await suspendUser(userToDelete.id).unwrap();
//       toast.success("User account suspended successfully!", { id: toastId });
//       setIsDeleteModalOpen(false);
//       setUserToDelete(null);
//     } catch (error: any) {
//       const errorMsg = error?.data?.message || "Failed to suspend user.";
//       toast.error(errorMsg, { id: toastId });
//     }
//   };

//   // This ensures the hook re-runs whenever the URL changes
//   const params = Object.fromEntries(searchParams.entries());
//   const { data: userData, isLoading, isFetching } = useGetAllUsersQuery(params);

//   const users = userData?.data || [];
//   const meta = userData?.meta;

//   // 2. HELPER: Update URL Query Parameters
//   const updateQuery = (key: string, value: string) => {
//     const current = new URLSearchParams(searchParams.toString());

//     if (value && value !== "all") {
//       current.set(key, value);
//     } else {
//       current.delete(key);
//     }

//     // Always reset to page 1 when a filter changes
//     if (key !== "page") {
//       current.set("page", "1");
//     }

//     router.push(`${pathname}?${current.toString()}`, { scroll: false });
//   };

//   // 3. SEARCH: Debounced to avoid hitting API on every keystroke
//   const handleSearch = useDebouncedCallback((term: string) => {
//     updateQuery("searchTerm", term);
//   }, 500);

//   const handleOpenContactModal = (user: any) => {
//     setIsContactModalOpen(true);
//     setContactUser(user);
//   };

//   // 3. Email Submission Handler
//   const handleContactSubmit = async (formData: {
//     subject: string;
//     message: string;
//   }) => {
//     if (!contactUser) return;
//     const toastId = toast.loading("Sending email...");
//     try {
//       console.log(contactUser, "user user");
//       console.log(formData, "form data");
//       console.log(contactUser?.id, "form data");
//       const res = await sendMessage({
//         id: contactUser?.id,
//         body: formData,
//       }).unwrap();
//       console.log(res, "contact res");
//       toast.success("Email sent successfully!", { id: toastId });
//       setIsContactModalOpen(false); // Close modal
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to send email", {
//         id: toastId,
//       });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-primary" size={40} />
//         <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
//           Loading Users...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 pb-10">
//       <div className="flex justify-between items-end">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Manage platform users and their accounts
//           </p>
//         </div>
//         {isFetching && (
//           <div className="text-primary animate-pulse text-xs font-bold uppercase">
//             Refreshing...
//           </div>
//         )}
//       </div>

//       {/* KPI STATS CARDS */}
//       <div className="grid gap-4 md:grid-cols-4">
//         <MetricCard title="Total Users" val={meta?.stats?.totalUsers} />
//         <MetricCard
//           title="Active Users"
//           val={meta?.stats?.activeUsers}
//           color="text-green-600"
//         />
//         <MetricCard
//           title="Suspended"
//           val={meta?.stats?.suspendedUsers}
//           color="text-red-600"
//         />
//         <MetricCard
//           title="Total Revenue"
//           val={meta?.stats?.totalRevenue}
//           color="text-purple-600"
//         />
//       </div>

//       {/* FILTER & SEARCH BAR */}
//       <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col md:flex-row gap-4">
//         <div className="flex flex-1 items-center gap-3 rounded-full border border-gray-200 bg-[#F9FAFB] px-5 py-3 focus-within:border-primary transition-all">
//           <FiSearch className="text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             defaultValue={searchParams.get("searchTerm") || ""}
//             onChange={(e) => handleSearch(e.target.value)}
//             className="w-full bg-transparent text-sm font-medium outline-none"
//           />
//         </div>

//         <select
//           value={searchParams.get("role") || "all"}
//           onChange={(e) => updateQuery("role", e.target.value)}
//           className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-600 outline-none cursor-pointer min-w-[180px]"
//         >
//           <option value="all">All Roles</option>
//           <option value="USER">User</option>
//           <option value="ADMIN">Admin</option>
//         </select>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left min-w-[1200px] border-collapse">
//             <thead>
//               <tr className="border-b border-gray-50 bg-gray-50/50 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
//                 <th className="px-8 py-6">User</th>
//                 <th className="px-5 py-6">Email</th>
//                 <th className="px-5 py-6">Join Date</th>
//                 <th className="px-5 py-6 text-center">Bookings</th>
//                 <th className="px-5 py-6">Total Spent</th>
//                 <th className="px-5 py-6">Last Active</th>
//                 <th className="px-5 py-6 text-center">Status</th>
//                 <th className="px-8 py-6 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {users.map((user: any) => (
//                 <tr
//                   key={user.id}
//                   className="text-sm font-medium text-gray-700 hover:bg-gray-50/50 transition-colors group"
//                 >
//                   <td className="px-8 py-5">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
//                         {user.image ? (
//                           <Image
//                             src={user.image}
//                             width={40}
//                             height={40}
//                             alt=""
//                             className="object-cover h-full"
//                           />
//                         ) : (
//                           <User size={20} className="text-purple-600" />
//                         )}
//                       </div>
//                       <span className="font-bold text-gray-900">
//                         {user.name}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-5 py-5 text-gray-500 font-bold">
//                     {user.email}
//                   </td>
//                   <td className="px-5 py-5 text-gray-400 font-bold uppercase text-[11px]">
//                     {user.joinDate}
//                   </td>
//                   <td className="px-5 py-5 text-center font-black text-gray-900">
//                     {user.bookings}
//                   </td>
//                   <td className="px-5 py-5 font-black text-gray-900">
//                     {user.totalSpent}
//                   </td>
//                   <td className="px-5 py-5 text-gray-400 font-bold uppercase text-[11px]">
//                     {user.lastActive}
//                   </td>
//                   <td className="px-5 py-5 text-center">
//                     <span
//                       className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${user.status === "ACTIVE" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
//                     >
//                       {user.status}
//                     </span>
//                   </td>
//                   <td className="px-8 py-5 text-right">
//                     <div className="flex items-center justify-end gap-2">
//                       <Link
//                         href={`/admin/dashboard/users/${user.id}`}
//                         className="p-2 text-gray-400 hover:text-primary transition-all cursor-pointer"
//                       >
//                         <FiEye size={18} />
//                       </Link>
//                       <button
//                         onClick={() => handleOpenContactModal(user)}
//                         className="p-2 text-gray-400 hover:text-primary transition-all cursor-pointer"
//                         title="Send Email"
//                       >
//                         <FiMail size={18} />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(user)}
//                         className="p-2.5 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all cursor-pointer shadow-sm active:scale-90"
//                         title="Suspend User"
//                       >
//                         <FiUserMinus size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* --- Delete CONFIRMATION MODAL --- */}
//         <Modal
//           isOpen={isDeleteModalOpen}
//           onClose={() => setIsDeleteModalOpen(false)}
//           title="Suspend Account"
//         >
//           <div className="text-center space-y-6">
//             <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
//               <FiAlertTriangle size={32} />
//             </div>

//             <div className="space-y-2">
//               <h3 className="text-xl font-bold text-gray-900 leading-tight">
//                 Are you sure?
//               </h3>
//               <p className="text-sm text-gray-500 leading-relaxed font-medium">
//                 You are about to delete{" "}
//                 <span className="text-gray-900 font-bold">
//                   {userToDelete?.name}
//                 </span>
//                 . The user will be deleted user and.
//               </p>
//             </div>

//             <div className="flex gap-4 pt-4">
//               <button
//                 onClick={() => setIsDeleteModalOpen(false)}
//                 className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-all cursor-pointer"
//               >
//                 Cancel
//               </button>
//               <button
//                 disabled={isDeleting}
//                 onClick={handleConfirmSoftDelete}
//                 className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-100 hover:bg-red-600 transition-all active:scale-95 disabled:opacity-50"
//               >
//                 {isDeleting ? "Suspending..." : "Yes, Suspend"}
//               </button>
//             </div>
//           </div>
//         </Modal>

//         {/* modal */}
//         <Modal
//           isOpen={isContactModalOpen}
//           onClose={() => setIsContactModalOpen(false)}
//           title="Contact User"
//         >
//           {contactUser && (
//             <ContactUserForm
//               emailTo={contactUser?.email}
//               onSubmit={handleContactSubmit}
//               isLoading={isSending}
//             />
//           )}
//         </Modal>

//         {/* PAGINATION INTEGRATION */}
//         {meta && (
//           <div className="px-8 border-t border-gray-50">
//             <Pagination
//               total={meta.total}
//               limit={meta.limit}
//               page={meta.page}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const MetricCard = ({ title, val, color = "text-gray-900" }: any) => (
//   <div className="rounded-[1.5rem] border border-gray-100 bg-white p-8 shadow-sm">
//     <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">
//       {title}
//     </p>
//     <p className={`text-3xl font-black ${color}`}>{val || "0"}</p>
//   </div>
// );

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  FiSearch,
  FiEye,
  FiMail,
  FiUserMinus,
  FiAlertTriangle,
} from "react-icons/fi";
import {
  useGetAllUsersQuery,
  useSuspendUserMutation,
} from "@/redux/features/admin/usersApi";
import Image from "next/image";
import { Loader2, User } from "lucide-react";
import Pagination from "@/components/common/Pagination";
import { toast } from "sonner";
import { useState } from "react";
import Modal from "@/components/common/modals/Modal";
import ContactUserForm from "@/components/form/ContactUserForm";
import { useSendMessageToUserMutation } from "@/redux/features/admin/inquiry.api";
import { useTranslations, useLocale } from "next-intl";

export default function AllUsers() {
  const t = useTranslations("AdminUsers");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sendMessage, { isLoading: isSending }] =
    useSendMessageToUserMutation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactUser, setContactUser] = useState<any>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const [suspendUser, { isLoading: isDeleting }] = useSuspendUserMutation();

  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmSoftDelete = async () => {
    if (!userToDelete?.id) return;

    const toastId = toast.loading(t("toasts.suspending"));
    try {
      await suspendUser(userToDelete.id).unwrap();
      toast.success(t("toasts.suspendSuccess"), { id: toastId });
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error: any) {
      const errorMsg = error?.data?.message || t("toasts.suspendError");
      toast.error(errorMsg, { id: toastId });
    }
  };

  const params = Object.fromEntries(searchParams.entries());
  const { data: userData, isLoading, isFetching } = useGetAllUsersQuery(params);

  const users = userData?.data || [];
  const meta = userData?.meta;

  const updateQuery = (key: string, value: string) => {
    const current = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") current.set(key, value);
    else current.delete(key);
    if (key !== "page") current.set("page", "1");
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    updateQuery("searchTerm", term);
  }, 500);

  const handleOpenContactModal = (user: any) => {
    setIsContactModalOpen(true);
    setContactUser(user);
  };

  const handleContactSubmit = async (formData: {
    subject: string;
    message: string;
  }) => {
    if (!contactUser) return;
    const toastId = toast.loading(t("toasts.sendingEmail"));
    try {
      await sendMessage({ id: contactUser?.id, body: formData }).unwrap();
      toast.success(t("toasts.emailSuccess"), { id: toastId });
      setIsContactModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || t("toasts.emailError"), {
        id: toastId,
      });
    }
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

  return (
    <div className="space-y-6 pb-10" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex justify-between items-end">
        <div className={isRtl ? "text-right" : "text-left"}>
          <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
          <p className="mt-1 text-sm text-gray-500">{t("subtitle")}</p>
        </div>
        {isFetching && (
          <div className="text-primary animate-pulse text-xs font-bold uppercase">
            {t("refreshing")}
          </div>
        )}
      </div>

      {/* KPI STATS CARDS */}
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard title={t("stats.total")} val={meta?.stats?.totalUsers} />
        <MetricCard
          title={t("stats.active")}
          val={meta?.stats?.activeUsers}
          color="text-green-600"
        />
        <MetricCard
          title={t("stats.suspended")}
          val={meta?.stats?.suspendedUsers}
          color="text-red-600"
        />
        <MetricCard
          title={t("stats.revenue")}
          val={meta?.stats?.totalRevenue}
          color="text-purple-600"
        />
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex flex-1 items-center gap-3 rounded-full border border-gray-200 bg-[#F9FAFB] px-5 py-3 focus-within:border-primary transition-all">
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
          value={searchParams.get("role") || "all"}
          onChange={(e) => updateQuery("role", e.target.value)}
          className="rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-600 outline-none cursor-pointer min-w-[180px]"
        >
          <option value="all">{t("filters.allRoles")}</option>
          <option value="USER">{t("filters.user")}</option>
          <option value="ADMIN">{t("filters.admin")}</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table
            className={`w-full ${isRtl ? "text-right" : "text-left"} min-w-[1200px] border-collapse`}
          >
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                <th className="px-8 py-6">{t("table.user")}</th>
                <th className="px-5 py-6">{t("table.email")}</th>
                <th className="px-5 py-6">{t("table.joinDate")}</th>
                <th className="px-5 py-6 text-center">{t("table.bookings")}</th>
                <th className="px-5 py-6">{t("table.totalSpent")}</th>
                <th className="px-5 py-6">{t("table.lastActive")}</th>
                <th className="px-5 py-6 text-center">{t("table.status")}</th>
                <th
                  className={`px-8 py-6 ${isRtl ? "text-left" : "text-right"}`}
                >
                  {t("table.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user: any) => (
                <tr
                  key={user.id}
                  className="text-sm font-medium text-gray-700 hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden shrink-0">
                        {user.image ? (
                          <Image
                            src={user.image}
                            width={40}
                            height={40}
                            alt=""
                            className="object-cover h-full"
                          />
                        ) : (
                          <User size={20} className="text-purple-600" />
                        )}
                      </div>
                      <span className="font-bold text-gray-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-gray-500 font-bold">
                    {user.email}
                  </td>
                  <td className="px-5 py-5 text-gray-400 font-bold uppercase text-[11px]">
                    {user.joinDate}
                  </td>
                  <td className="px-5 py-5 text-center font-black text-gray-900">
                    {user.bookings}
                  </td>
                  <td className="px-5 py-5 font-black text-gray-900">
                    {user.totalSpent}
                  </td>
                  <td className="px-5 py-5 text-gray-400 font-bold uppercase text-[11px]">
                    {user.lastActive}
                  </td>
                  <td className="px-5 py-5 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${user.status === "ACTIVE" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div
                      className={`flex items-center gap-2 ${isRtl ? "justify-start" : "justify-end"}`}
                    >
                      <Link
                        href={`/admin/dashboard/users/${user.id}`}
                        className="p-2 text-gray-400 hover:text-primary transition-all"
                        title={t("table.tooltips.view")}
                      >
                        <FiEye size={18} />
                      </Link>
                      <button
                        onClick={() => handleOpenContactModal(user)}
                        className="p-2 text-gray-400 hover:text-primary transition-all cursor-pointer"
                        title={t("table.tooltips.email")}
                      >
                        <FiMail size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="p-2.5 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all cursor-pointer"
                        title={t("table.tooltips.suspend")}
                      >
                        <FiUserMinus size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title={t("suspendModal.title")}
        >
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <FiAlertTriangle size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {t("suspendModal.confirm")}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                {t.rich("suspendModal.desc", {
                  name: () => (
                    <span className="text-gray-900 font-bold">
                      {userToDelete?.name}
                    </span>
                  ),
                })}
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-all cursor-pointer"
              >
                {t("suspendModal.cancel")}
              </button>
              <button
                disabled={isDeleting}
                onClick={handleConfirmSoftDelete}
                className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg hover:bg-red-600 transition-all disabled:opacity-50"
              >
                {isDeleting
                  ? t("suspendModal.loading")
                  : t("suspendModal.submit")}
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          title={t("contactModal.title")}
        >
          {contactUser && (
            <ContactUserForm
              emailTo={contactUser?.email}
              onSubmit={handleContactSubmit}
              isLoading={isSending}
            />
          )}
        </Modal>

        {meta && (
          <div className="px-8 border-t border-gray-50">
            <Pagination
              total={meta.total}
              limit={meta.limit}
              page={meta.page}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const MetricCard = ({ title, val, color = "text-gray-900" }: any) => (
  <div className="rounded-[1.5rem] border border-gray-100 bg-white p-8 shadow-sm">
    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1 text-start">
      {title}
    </p>
    <p className={`text-3xl font-black ${color} text-start`}>{val || "0"}</p>
  </div>
);
