// // "use client";
// // import React, { useState } from "react";
// // import Link from "next/link";
// // import { FiArrowLeft, FiCheckCircle, FiTrash2 } from "react-icons/fi";

// // const sample = [
// //   {
// //     id: "1",
// //     name: "Ahmed Ben Ali",
// //     email: "ahmed@example.com",
// //     phone: "+213 555 123 456",
// //     subject: "Unable to complete booking payment",
// //     received: "May 9, 2026 at 2:34 PM",
// //     body: `Hello, I have been trying to book the Mercedes C-Class (Listing #LST-10234) for May 15-20, but every time I try to complete the payment, it fails with an error message saying "Payment processing error". I have tried with two different credit cards and the issue persists. Can you please help me complete this booking? I really need the car for my business trip. Thank you, Ahmed`,
// //     status: "Unread",
// //   },
// // ];

// // export default function SingleMessage({ id }: { id?: string }) {
// //   const msg = sample.find((s) => s.id === id) || sample[0];
// //   const [reply, setReply] = useState("");
// //   const [notes, setNotes] = useState("");

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center gap-4">
// //         <Link
// //           href="/admin/dashboard/messages"
// //           className="inline-flex items-center text-gray-600 hover:text-gray-900 gap-2"
// //         >
// //           <FiArrowLeft /> Back to Messages
// //         </Link>
// //       </div>

// //       <div className="bg-white border border-gray-100 rounded-2xl p-4">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <h3 className="text-lg font-semibold">{msg.subject}</h3>
// //             <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
// //               <span className="inline-flex items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
// //                 {msg.status}
// //               </span>
// //               <span>Received {msg.received}</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         <div className="lg:col-span-2 space-y-6">
// //           <div className="bg-white border border-gray-100 rounded-2xl p-6">
// //             <div className="flex items-start gap-4">
// //               <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
// //                 {msg.name
// //                   .split(" ")
// //                   .map((n) => n[0])
// //                   .slice(0, 2)
// //                   .join("")}
// //               </div>
// //               <div>
// //                 <div className="flex items-center gap-3">
// //                   <h4 className="font-semibold">{msg.name}</h4>
// //                   <p className="text-sm text-gray-400">{msg.email}</p>
// //                 </div>
// //                 <p className="text-sm text-gray-400 mt-1">{msg.received}</p>
// //               </div>
// //             </div>

// //             <div className="mt-6 text-sm text-gray-700 leading-relaxed">
// //               {msg.body}
// //             </div>

// //             <div className="mt-6 border-t border-gray-100 pt-4">
// //               <a className="text-sm text-green-600">Open WhatsApp</a>
// //             </div>
// //           </div>

// //           <div className="bg-white border border-gray-100 rounded-2xl p-6">
// //             <h4 className="font-semibold">Reply to {msg.name}</h4>
// //             <textarea
// //               value={reply}
// //               onChange={(e) => setReply(e.target.value)}
// //               maxLength={2000}
// //               placeholder={`Write your reply...`}
// //               className="w-full mt-3 p-4 rounded-lg border border-gray-100 min-h-[120px] text-sm"
// //             />

// //             <div className="mt-4">
// //               <label className="flex items-center gap-2 text-sm text-gray-500">
// //                 <input type="checkbox" /> Mark as resolved after replying
// //               </label>
// //               <div className="flex items-center mt-4 gap-3">
// //                 <button className="px-4 py-2 rounded-full bg-purple-600 text-white">
// //                   Send Reply via Email
// //                 </button>
// //                 <button className="px-4 py-2 rounded-full border border-green-200 text-green-600">
// //                   Open WhatsApp
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <aside className="space-y-6">
// //           <div className="bg-white border border-gray-100 rounded-2xl p-4">
// //             <h5 className="font-semibold mb-3">Sender Information</h5>
// //             <p className="text-sm font-semibold">{msg.name}</p>
// //             <p className="text-sm text-gray-500">{msg.email}</p>
// //             <p className="text-sm text-gray-500 mb-4">{msg.phone}</p>
// //             <hr className="text-sm text-gray-500 py-2" />

// //             <div className="mt-4 text-sm my-2">
// //               <span className="text-green-600 bg-green-100 p-2 rounded-full font-semibold">
// //                 Registered User
// //               </span>
// //               <br />
// //               <a className="text-sm text-indigo-600 mt-2 inline-block">
// //                 View User Profile →
// //               </a>
// //             </div>
// //             <hr className="text-sm text-gray-500 py-2" />
// //             <div>
// //               <p className="text-sm text-gray-500">Subject: Payment Problem</p>
// //               <p className="text-sm text-gray-500">
// //                 Submitted via: Contact Us page
// //               </p>
// //               <p className="text-sm text-gray-500">
// //                 Received: May 9, 2026 at 2:34 PM
// //               </p>
// //               <p className="text-sm text-gray-500">IP: 197.148.21.45</p>
// //             </div>
// //           </div>

// //           <div className="bg-white border border-gray-100 rounded-2xl p-4">
// //             <h5 className="font-semibold">Private Notes</h5>
// //             <textarea
// //               value={notes}
// //               onChange={(e) => setNotes(e.target.value)}
// //               placeholder="Add a note visible only to admins..."
// //               className="w-full mt-3 p-3 rounded-lg border border-gray-100 text-sm min-h-[90px]"
// //             />
// //             <button className="mt-3 w-full px-4 py-2 rounded bg-gray-100">
// //               Save Note
// //             </button>

// //             <hr className="text-sm text-gray-500 py-2 my-4" />
// //             <div>
// //               <div>
// //                 <span className="text-sm bg-purple-600 text-white p-2 rounded-full font-semibold">
// //                   A
// //                 </span>
// //                 <span className="text-sm text-gray-500 ml-2">
// //                   Admin User · 1h ago
// //                 </span>
// //               </div>
// //                 <p className="text-sm text-gray-700 mt-4 ml-6"> Checked with Stripe - customer card was declined due to insufficient funds. Will suggest alternative payment method.</p>
// //             </div>
// //           </div>

// //           <div className="bg-white border border-gray-100 rounded-2xl p-4">
// //             <button className="w-full px-4 py-3 rounded-full bg-purple-600 text-white mb-3 flex items-center justify-center gap-2">
// //               <FiCheckCircle /> Mark as Resolved
// //             </button>
// //             <button className="w-full px-4 py-3 rounded-full border border-red-100 text-red-600 flex items-center justify-center gap-2">
// //               <FiTrash2 /> Delete Message
// //             </button>
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   FiArrowLeft,
//   FiCheckCircle,
//   FiTrash2,
//   FiMessageSquare,
//   FiUser,
//   FiInfo,
//   FiExternalLink,
//   FiClock,
//   FiMapPin,
// } from "react-icons/fi";
// import { useDeleteInquiryMutation } from "@/redux/features/admin/inquiry.api";
// import { format } from "date-fns";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { Loader2 } from "lucide-react";
// import {
//   useGetInquiryByIdQuery,
//   useReplyToInquiryMutation,
//   useUpdateInquiryMutation,
// } from "@/redux/features/inquiry/inquiryApi";

// export default function SingleMessage({ id }: { id: string }) {
//   const router = useRouter();
//   const [replyText, setReplyText] = useState("");
//   const [adminNoteInput, setAdminNoteInput] = useState("");
//   const [isResolvedChecked, setIsResolvedChecked] = useState(false);

//   // RTK Queries & Mutations
//   const { data: apiResponse, isLoading, isError } = useGetInquiryByIdQuery(id);

//   const [replyToInquiry, { isLoading: isReplying }] =
//     useReplyToInquiryMutation();

//   const [updateInquiry, { isLoading: isUpdating }] = useUpdateInquiryMutation();

//   const [deleteInquiry] = useDeleteInquiryMutation();

//   const msg = apiResponse?.data;

//   console.log(msg, "msg");

//   // Pre-fill admin notes state when data loads
//   useEffect(() => {
//     if (msg?.adminNotes) setAdminNoteInput(msg.adminNotes);
//   }, [msg]);

//   // Handlers
//   const handleWhatsApp = () => {
//     if (!msg?.phone) return toast.error("Phone number not available");
//     const cleanNum = msg.phone.replace(/\D/g, "");
//     window.open(`https://wa.me/${cleanNum}`, "_blank");
//   };

//   const handleReplyEmail = async () => {
//     if (!replyText) return toast.error("Please write a response first");
//     const toastId = toast.loading("Sending email reply...");
//     try {
//       await replyToInquiry({
//         id,
//         body: { replyMessage: replyText, markAsResolved: isResolvedChecked },
//       }).unwrap();
//       toast.success("Reply sent and user notified!", { id: toastId });
//       setReplyText("");
//     } catch (err) {
//       toast.error("Failed to send reply", { id: toastId });
//     }
//   };

//   const handleSaveNote = async () => {
//     const toastId = toast.loading("Saving private note...");
//     try {
//       const res = await updateInquiry({
//         id,
//         body: { adminNotes: adminNoteInput },
//       }).unwrap();

//       console.log(res, "myyyy resss");
//       toast.success("Note updated", { id: toastId });
//     } catch (err) {
//       toast.error("Failed to save note", { id: toastId });
//     }
//   };

//   const handleMarkResolved = async () => {
//     const toastId = toast.loading("Updating status...");
//     try {
//       await updateInquiry({ id, body: { status: "RESOLVED" } }).unwrap();
//       toast.success("Inquiry marked as resolved", { id: toastId });
//     } catch (err) {
//       toast.error("Failed to update status", { id: toastId });
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="h-[60vh] flex items-center justify-center">
//         <Loader2 className="animate-spin text-primary" size={40} />
//       </div>
//     );
//   if (isError || !msg)
//     return (
//       <div className="text-center py-20 font-bold text-gray-400">
//         Message not found.
//       </div>
//     );

//   return (
//     <div className="space-y-6 pb-20">
//       {/* HEADER NAV */}
//       <div className="flex items-center gap-4">
//         <Link
//           href="/admin/dashboard/messages"
//           className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary gap-2 transition-colors"
//         >
//           <FiArrowLeft size={18} /> Back to Messages
//         </Link>
//       </div>

//       {/* TOP STATUS BAR */}
//       <div className="bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow-sm">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h3 className="text-xl font-black text-gray-900 leading-tight">
//               {msg?.subject}
//             </h3>
//             <div className="flex items-center gap-3 mt-2">
//               <span
//                 className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
//                   msg?.status === "UNREAD"
//                     ? "bg-blue-50 text-blue-600"
//                     : "bg-green-50 text-green-600"
//                 }`}
//               >
//                 {msg?.status}
//               </span>
//               <span className="text-sm font-medium text-gray-400">
//                 Received{" "}
//                 {format(new Date(msg?.createdAt), "MMMM d, yyyy 'at' h:mm b")}
//               </span>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={handleMarkResolved}
//               className="bg-primary/10 text-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all"
//             >
//               Mark Resolved
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//         {/* LEFT COLUMN */}
//         <div className="lg:col-span-8 space-y-6">
//           {/* USER MESSAGE BOX */}
//           <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//             <div className="flex items-start gap-4 mb-8">
//               <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-black text-lg">
//                 {msg?.name?.[0]}
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-900 text-base">
//                   {msg?.name}
//                 </h4>
//                 <p className="text-sm text-gray-400 font-medium">
//                   {msg?.email}
//                 </p>
//               </div>
//             </div>

//             <div className="text-base text-gray-700 leading-relaxed bg-gray-50/50 p-6 rounded-2xl border border-gray-100 italic">
//               "{msg?.message}"
//             </div>

//             <div className="mt-8 pt-6 border-t border-gray-50">
//               <button
//                 onClick={handleWhatsApp}
//                 className="inline-flex items-center gap-2 text-sm font-bold text-[#25D366] hover:underline uppercase tracking-tighter"
//               >
//                 <FiMessageSquare /> Open WhatsApp Chat
//               </button>
//             </div>
//           </div>

//           {/* REPLY BOX */}
//           <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//             <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-4">
//               <FiMapPin className="text-primary" /> Reply to {msg?.name}
//             </h4>
//             <textarea
//               value={replyText}
//               onChange={(e) => setReplyText(e.target.value)}
//               placeholder="Write your professional response here..."
//               className="w-full bg-[#F9FAFB] p-6 rounded-2xl border border-gray-200 outline-none focus:border-primary transition-all min-h-[180px] text-base"
//             />

//             <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <label className="flex items-center gap-3 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   className="w-5 h-5 accent-primary rounded"
//                   checked={isResolvedChecked}
//                   onChange={(e) => setIsResolvedChecked(e.target.checked)}
//                 />
//                 <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors">
//                   Mark as resolved after replying
//                 </span>
//               </label>

//               <div className="flex gap-3">
//                 <button
//                   onClick={handleWhatsApp}
//                   className="px-6 py-3 rounded-xl border border-[#25D366] text-[#25D366] font-bold text-sm hover:bg-[#25D366]/5"
//                 >
//                   WhatsApp
//                 </button>
//                 <button
//                   disabled={isReplying}
//                   onClick={handleReplyEmail}
//                   className="px-8 py-3 rounded-xl bg-primary text-white font-black text-sm shadow-lg shadow-primary/20 hover:opacity-90 disabled:opacity-50"
//                 >
//                   {isReplying ? "Sending..." : "Send Reply via Email"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT ASIDE */}
//         <aside className="lg:col-span-4 space-y-6">
//           {/* SENDER INFO */}
//           <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//             <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
//               <FiUser size={14} /> Sender Information
//             </h5>
//             <div className="space-y-4">
//               <p className="text-lg font-bold text-gray-900">{msg?.name}</p>
//               <div className="space-y-1">
//                 <p className="text-sm text-primary font-bold">{msg?.email}</p>
//                 <p className="text-sm text-gray-500 font-medium">
//                   {msg?.phone || "No phone provided"}
//                 </p>
//               </div>

//               {msg?.user ? (
//                 <div className="pt-4 mt-4 border-t border-gray-50">
//                   <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
//                     Registered User
//                   </span>
//                   <Link
//                     href={`/dashboard/users/${msg.user.id}`}
//                     className="block mt-4 text-sm font-bold text-indigo-600 hover:underline flex items-center gap-2"
//                   >
//                     View User Profile <FiExternalLink />
//                   </Link>
//                 </div>
//               ) : (
//                 <div className="pt-4 mt-4 border-t border-gray-50 text-sm text-gray-400 italic">
//                   Guest User (No Account)
//                 </div>
//               )}

//               <div className="pt-6 space-y-3">
//                 <p className="text-sm text-gray-500 font-medium flex justify-between">
//                   <span>Source:</span>{" "}
//                   <span className="text-gray-900 font-bold">{msg?.source}</span>
//                 </p>
//                 <p className="text-sm text-gray-500 font-medium flex justify-between">
//                   <span>IP:</span>{" "}
//                   <span className="text-gray-900 font-bold">
//                     {msg?.ipAddress}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* ADMIN PRIVATE NOTES */}
//           <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//             <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
//               <FiInfo size={14} /> Private Notes
//             </h5>
//             <textarea
//               value={adminNoteInput}
//               onChange={(e) => setAdminNoteInput(e.target.value)}
//               placeholder="Add internal admin notes..."
//               className="w-full bg-gray-50 p-4 rounded-xl border border-transparent focus:border-primary outline-none transition-all text-sm min-h-[120px]"
//             />
//             <button
//               onClick={handleSaveNote}
//               className="mt-4 w-full bg-gray-100 py-3 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-200 transition-colors"
//             >
//               Save Private Note
//             </button>

//             {msg?.adminNotes && (
//               <div className="mt-8 pt-6 border-t border-gray-50">
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
//                     A
//                   </div>
//                   <span className="text-[11px] font-bold text-gray-400 uppercase">
//                     Last Updated {format(new Date(msg.updatedAt), "p")}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 leading-relaxed pl-8 border-l-2 border-primary/20">
//                   {msg.adminNotes}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* DANGER ZONE */}
//           <div className="bg-red-50/30 border border-red-100 rounded-[2rem] p-8 shadow-sm">
//             <button
//               onClick={() => handleMarkResolved()}
//               className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 mb-4"
//             >
//               <FiCheckCircle size={18} /> Mark as Resolved
//             </button>
//             <button className="w-full border border-red-200 text-red-500 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-red-50">
//               <FiTrash2 size={18} /> Delete Inquiry
//             </button>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiTrash2,
  FiMessageSquare,
  FiUser,
  FiInfo,
  FiExternalLink,
  FiMapPin,
  FiAlertTriangle,
} from "react-icons/fi";
import { useDeleteInquiryMutation } from "@/redux/features/admin/inquiry.api";
import { format } from "date-fns";
import { enUS, fr, ar } from "date-fns/locale";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  useGetInquiryByIdQuery,
  useReplyToInquiryMutation,
  useUpdateInquiryMutation,
} from "@/redux/features/inquiry/inquiryApi";
import { useTranslations, useLocale } from "next-intl";
import Modal from "@/components/common/modals/Modal";

export default function SingleMessage({ id }: { id: string }) {
  const t = useTranslations("AdminSingleMessage");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const dateLocale = locale === "fr" ? fr : locale === "ar" ? ar : enUS;

  const router = useRouter();
  const [replyText, setReplyText] = useState("");
  const [adminNoteInput, setAdminNoteInput] = useState("");
  const [isResolvedChecked, setIsResolvedChecked] = useState(false);

  const { data: apiResponse, isLoading, isError } = useGetInquiryByIdQuery(id);
  const [replyToInquiry, { isLoading: isReplying }] =
    useReplyToInquiryMutation();
  const [updateInquiry] = useUpdateInquiryMutation();
  const [deleteInquiry, { isLoading: isDeleting }] = useDeleteInquiryMutation();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    const toastId = toast.loading("Deleting...");
    try {
      await deleteInquiry(deleteId).unwrap();
      toast.success("Inquiry Deleted", { id: toastId });
      setIsModalOpen(false);
      setDeleteId(null);
    } catch (err) {
      toast.error("Something Went Wrong", { id: toastId });
    }
  };

  const msg = apiResponse?.data;

  useEffect(() => {
    if (msg?.adminNotes) setAdminNoteInput(msg.adminNotes);
  }, [msg]);

  const handleWhatsApp = () => {
    if (!msg?.phone) return toast.error(t("toasts.noPhone"));
    const cleanNum = msg.phone.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanNum}`, "_blank");
  };

  const handleReplyEmail = async () => {
    if (!replyText) return toast.error(t("toasts.emptyReply"));
    const toastId = toast.loading(t("toasts.sendingReply"));
    try {
      await replyToInquiry({
        id,
        body: { replyMessage: replyText, markAsResolved: isResolvedChecked },
      }).unwrap();
      toast.success(t("toasts.replySuccess"), { id: toastId });
      setReplyText("");
    } catch (err) {
      toast.error(t("toasts.replyError"), { id: toastId });
    }
  };

  const handleSaveNote = async () => {
    const toastId = toast.loading(t("toasts.savingNote"));
    try {
      await updateInquiry({
        id,
        body: { adminNotes: adminNoteInput },
      }).unwrap();
      toast.success(t("toasts.noteSuccess"), { id: toastId });
    } catch (err) {
      toast.error(t("toasts.noteError"), { id: toastId });
    }
  };

  const handleMarkResolved = async () => {
    const toastId = toast.loading(t("toasts.updatingStatus"));
    try {
      await updateInquiry({ id, body: { status: "RESOLVED" } }).unwrap();
      toast.success(t("toasts.statusSuccess"), { id: toastId });
    } catch (err) {
      toast.error(t("toasts.statusError"), { id: toastId });
    }
  };

  if (isLoading)
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );

  if (isError || !msg)
    return (
      <div className="text-center py-20 font-bold text-gray-400">
        {t("notFound")}
      </div>
    );

  return (
    <div className="space-y-6 pb-20" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex items-center gap-4">
        <Link
          href="/admin/dashboard/messages"
          className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary gap-2 transition-colors"
        >
          <FiArrowLeft size={18} className={isRtl ? "rotate-180" : ""} />{" "}
          {t("back")}
        </Link>
      </div>

      <div className="bg-white border border-gray-100 rounded-[1.5rem] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className={isRtl ? "text-right" : "text-left"}>
            <h3 className="text-xl font-black text-gray-900 leading-tight">
              {msg?.subject}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${msg?.status === "UNREAD" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"}`}
              >
                {msg?.status}
              </span>
              <span className="text-sm font-medium text-gray-400">
                {t("received")}{" "}
                {format(
                  new Date(msg?.createdAt),
                  `MMMM d, yyyy '${t("at")}' h:mm b`,
                  { locale: dateLocale },
                )}
              </span>
            </div>
          </div>
          <button
            onClick={handleMarkResolved}
            className="bg-primary/10 text-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all cursor-pointer"
          >
            {t("markResolved")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-black text-lg">
                {msg?.name?.[0]}
              </div>
              <div className={isRtl ? "text-right" : "text-left"}>
                <h4 className="font-bold text-gray-900 text-base">
                  {msg?.name}
                </h4>
                <p className="text-sm text-gray-400 font-medium">
                  {msg?.email}
                </p>
              </div>
            </div>
            <div
              className={`text-base text-gray-700 leading-relaxed bg-gray-50/50 p-6 rounded-2xl border border-gray-100 italic ${isRtl ? "text-right" : "text-left"}`}
            >
              "{msg?.message}"
            </div>
            <div className="mt-8 pt-6 border-t border-gray-50">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#25D366] hover:underline uppercase tracking-tighter cursor-pointer"
              >
                <FiMessageSquare /> {t("openWhatsApp")}
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-4">
              <FiMapPin className="text-primary" />{" "}
              {t("replyTitle", { name: msg?.name })}
            </h4>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={t("replyPlaceholder")}
              className="w-full bg-[#F9FAFB] p-6 rounded-2xl border border-gray-200 outline-none focus:border-primary transition-all min-h-[180px] text-base"
            />
            <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-primary rounded"
                  checked={isResolvedChecked}
                  onChange={(e) => setIsResolvedChecked(e.target.checked)}
                />
                <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors">
                  {t("resolveCheck")}
                </span>
              </label>
              <div className="flex gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="px-6 py-3 rounded-xl border border-[#25D366] text-[#25D366] font-bold text-sm hover:bg-[#25D366]/5 cursor-pointer"
                >
                  {t("whatsappBtn")}
                </button>
                <button
                  disabled={isReplying}
                  onClick={handleReplyEmail}
                  className="px-8 py-3 rounded-xl bg-primary text-white font-black text-sm shadow-lg hover:opacity-90 disabled:opacity-50 cursor-pointer"
                >
                  {isReplying ? t("sending") : t("emailBtn")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <FiUser size={14} /> {t("senderInfo")}
            </h5>
            <div className={`space-y-4 ${isRtl ? "text-right" : "text-left"}`}>
              <p className="text-lg font-bold text-gray-900">{msg?.name}</p>
              <div className="space-y-1">
                <p className="text-sm text-primary font-bold">{msg?.email}</p>
                <p className="text-sm text-gray-500 font-medium">
                  {msg?.phone || t("noPhone")}
                </p>
              </div>
              {msg?.user ? (
                <div className="pt-4 mt-4 border-t border-gray-50">
                  <span className="bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {t("registeredUser")}
                  </span>
                  <Link
                    href={`/admin/dashboard/users/${msg.user.id}`}
                    className="block mt-4 text-sm font-bold text-indigo-600 hover:underline flex items-center gap-2"
                  >
                    {t("viewProfile")} <FiExternalLink />
                  </Link>
                </div>
              ) : (
                <div className="pt-4 mt-4 border-t border-gray-50 text-sm text-gray-400 italic">
                  {t("guestUser")}
                </div>
              )}
              <div className="pt-6 space-y-3">
                <p className="text-sm text-gray-500 font-medium flex justify-between">
                  <span>{t("source")}</span>{" "}
                  <span className="text-gray-900 font-bold">{msg?.source}</span>
                </p>
                <p className="text-sm text-gray-500 font-medium flex justify-between">
                  <span>{t("ip")}</span>{" "}
                  <span className="text-gray-900 font-bold">
                    {msg?.ipAddress}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <h5 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <FiInfo size={14} /> {t("privateNotes")}
            </h5>
            <textarea
              value={adminNoteInput}
              onChange={(e) => setAdminNoteInput(e.target.value)}
              placeholder={t("notesPlaceholder")}
              className="w-full bg-gray-50 p-4 rounded-xl border border-transparent focus:border-primary outline-none transition-all text-sm min-h-[120px]"
            />
            <button
              onClick={handleSaveNote}
              className="mt-4 w-full bg-gray-100 py-3 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {t("saveNote")}
            </button>
            {msg?.adminNotes && (
              <div className="mt-8 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                    A
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase">
                    {t("lastUpdated")}{" "}
                    {format(new Date(msg.updatedAt), "p", {
                      locale: dateLocale,
                    })}
                  </span>
                </div>
                <p
                  className={`text-sm text-gray-600 leading-relaxed ${isRtl ? "pr-8 border-r-2" : "pl-8 border-l-2"} border-primary/20`}
                >
                  {msg.adminNotes}
                </p>
              </div>
            )}
          </div>

          <div className="bg-red-50/30 border border-red-100 rounded-[2rem] p-8 shadow-sm">
            <button
              onClick={handleMarkResolved}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 mb-4 cursor-pointer"
            >
              <FiCheckCircle size={18} /> {t("dangerZone.resolved")}
            </button>
            <button
              onClick={() => handleDeleteClick(msg.id)}
              className="w-full border border-red-200 text-red-500 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-red-50 cursor-pointer"
            >
              <FiTrash2 size={18} /> {t("dangerZone.delete")}
            </button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Delete Inquiry"
            >
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                  <FiAlertTriangle size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Are you sure?
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">
                    This inquiry will be permanently removed from the system.
                    This action cannot be undone.
                  </p>
                </div>
                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isDeleting}
                    onClick={handleConfirmDelete}
                    className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg hover:bg-red-600 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isDeleting ? "Deleting..." : "Delete Now"}
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </aside>
      </div>
    </div>
  );
}
