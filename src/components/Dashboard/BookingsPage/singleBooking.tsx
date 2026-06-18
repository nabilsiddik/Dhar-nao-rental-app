// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   CalendarDays,
//   CheckCircle2,
//   Clock3,
//   CreditCard,
//   Download,
//   Mail,
//   MapPin,
//   MessageSquare,
//   Phone,
//   Send,
//   ShieldCheck,
//   Loader2,
//   User,
//   History,
//   ExternalLink,
//   AlertTriangle,
//   DollarSign,
// } from "lucide-react";
// import { useGetBookingDetailsQuery } from "@/redux/features/bookingApis/bookingApis";
// import { format } from "date-fns";
// import { toast } from "sonner";
// import {
//   useAdminCancelBookingMutation,
//   useProcessRefundMutation,
//   useSendMessageToCustomerMutation,
//   useUpdateAdminNoteMutation,
// } from "@/redux/features/admin/bookings.api";
// import { useEffect, useState } from "react";
// import Modal from "@/components/common/modals/Modal";
// import ContactUserForm from "@/components/form/ContactUserForm";

// type ModalType = "CANCEL" | "REFUND" | "EMAIL" | null;

// const SingleBooking = ({ bookingId }: { bookingId: string }) => {
//   const { data: bookingDetailsData, isLoading } =
//     useGetBookingDetailsQuery(bookingId);
//   const booking = bookingDetailsData?.data || null;
//   const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

//   const [sendMessage, { isLoading: isSending }] =
//     useSendMessageToCustomerMutation();
//   const [adminCancel, { isLoading: isCancelling }] =
//     useAdminCancelBookingMutation();
//   const [processRefund, { isLoading: isRefunding }] =
//     useProcessRefundMutation();
//   const [updateNote, { isLoading: isSavingNote }] =
//     useUpdateAdminNoteMutation();

//   const [modalType, setModalType] = useState<ModalType>(null);
//   const [note, setNote] = useState("");
//   useEffect(() => {
//     if (booking?.adminNote) setNote(booking.adminNote);
//   }, [booking]);

//   // Cancel confirm
//   const handleConfirmCancel = async () => {
//     const toastId = toast.loading("Processing admin cancellation...");
//     try {
//       await adminCancel(bookingId).unwrap();
//       toast.success("Booking cancelled successfully", { id: toastId });
//       setModalType(null);
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Cancellation failed", { id: toastId });
//     }
//   };

//   // confirm refund
//   const handleConfirmRefund = async () => {
//     const toastId = toast.loading("Initiating Stripe refund...");
//     try {
//       await processRefund(bookingId).unwrap();
//       toast.success("Refund processed successfully!", { id: toastId });
//       setModalType(null);
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Refund failed", { id: toastId });
//     }
//   };

//   // save note
//   const handleSaveNote = async () => {
//     try {
//       await updateNote({ id: bookingId, note: note }).unwrap();
//       toast.success("Admin notes saved");
//     } catch (err: any) {
//       toast.error("Failed to save notes");
//     }
//   };

//   const handleSendEmail = async (formData: {
//     subject: string;
//     message: string;
//   }) => {
//     try {
//       await sendMessage({ id: bookingId, body: formData }).unwrap();
//       toast.success("Email sent successfully to customer!");
//       setIsEmailModalOpen(false);
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to send email");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-primary" size={40} />
//         <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
//           Loading Booking Records...
//         </p>
//       </div>
//     );
//   }

//   if (!booking) {
//     return (
//       <div className="py-20 text-center font-bold text-gray-400">
//         Booking not found.
//       </div>
//     );
//   }

//   // --- Dynamic Financial Calculations ---
//   const commission = booking?.transaction?.commission || 0;
//   const ownerPayout = (booking?.totalPrice || 0) - commission;

//   // --- Dynamic Timeline Generation ---
//   const dynamicTimeline = [
//     {
//       title: "Booking Created",
//       description: `User created booking via ${booking?.bookingSource?.replace("_", " ")}`,
//       time: booking?.createdAt
//         ? format(new Date(booking.createdAt), "MMM dd, yyyy 'at' h:mm b")
//         : "N/A",
//       tone: "blue",
//     },
//     {
//       title: "Payment Confirmed",
//       description: `Payment of $${booking?.totalPrice} received successfully`,
//       time: booking?.transaction?.createdAt
//         ? format(
//             new Date(booking.transaction.createdAt),
//             "MMM dd, yyyy 'at' h:mm b",
//           )
//         : "Pending",
//       tone: booking?.paymentStatus === "PAID" ? "green" : "yellow",
//     },
//     {
//       title: "Booking Status",
//       description: `Reservation is currently ${booking?.status}`,
//       time: booking?.updatedAt
//         ? format(new Date(booking.updatedAt), "MMM dd, yyyy 'at' h:mm b")
//         : "",
//       tone: booking?.status === "CANCELLED" ? "red" : "blue",
//     },
//   ];

//   return (
//     <div className="space-y-6 pb-10">
//       {/* HEADER ACTIONS */}
//       <div className="flex items-center justify-between gap-4 flex-wrap">
//         <Link
//           href="/dashboard/bookings"
//           className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors cursor-pointer"
//         >
//           <ArrowLeft size={18} />
//           Back to All Bookings
//         </Link>

//         <div className="flex items-center gap-3">
//           <span
//             className={`inline-flex items-center rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
//               booking?.status === "UPCOMING"
//                 ? "bg-blue-50 text-blue-600"
//                 : booking?.status === "ACTIVE"
//                   ? "bg-green-50 text-green-600"
//                   : "bg-red-50 text-red-600"
//             }`}
//           >
//             {booking?.status}
//           </span>
//           {/* CANCEL BUTTON TRIGGER */}
//           {booking?.status !== "CANCELLED" && (
//             <button
//               onClick={() => setModalType("CANCEL")}
//               className="rounded-2xl bg-red-500 px-6 py-3 text-sm font-black text-white hover:bg-red-600 transition-all cursor-pointer shadow-lg shadow-red-100"
//             >
//               Cancel Booking
//             </button>
//           )}
//         </div>
//       </div>

//       {/* TITLE SECTION */}
//       <div>
//         <h1 className="text-3xl font-black text-gray-900 tracking-tight">
//           Booking #{booking?.bookingRef}
//         </h1>
//         <p className="mt-2 text-sm font-bold text-gray-400 uppercase tracking-tighter">
//           Reference ID: {booking?.id}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
//         <div className="xl:col-span-8 space-y-6">
//           {/* CUSTOMER INFORMATION */}
//           <section className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//             <div className="flex items-center justify-between gap-4 mb-8">
//               <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">
//                 Customer Information
//               </h2>
//               <Link
//                 target="_blank"
//                 href={`/admin/dashboard/users/${booking?.user?.id}`}
//                 className="text-sm font-bold text-primary hover:underline"
//               >
//                 View Full Profile
//               </Link>
//             </div>

//             <div className="flex flex-col lg:flex-row gap-8">
//               <div className="flex items-start gap-5 flex-1">
//                 <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-primary/10">
//                   {booking?.customerName
//                     ?.split(" ")
//                     .map((n: any) => n[0])
//                     .slice(0, 2)
//                     .join("")}
//                 </div>
//                 <div className="min-w-0">
//                   <h3 className="text-xl font-bold text-gray-900 truncate">
//                     {booking?.customerName}
//                   </h3>
//                   <p className="text-sm text-gray-400 font-medium">
//                     Member since{" "}
//                     {booking?.user?.createdAt
//                       ? format(new Date(booking.user.createdAt), "MMM yyyy")
//                       : "N/A"}
//                   </p>
//                   <div className="mt-6 space-y-3 text-sm font-medium text-gray-600">
//                     <div className="flex items-center gap-3">
//                       <Mail size={16} className="text-primary" />
//                       <span className="truncate">{booking?.customerEmail}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <CalendarDays size={16} className="text-primary" />
//                       <span>
//                         {booking?.user?._count?.bookings || 0} total bookings
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-4 text-sm font-medium text-gray-600 lg:border-l lg:pl-8 border-gray-50 lg:min-w-[280px]">
//                 <div className="flex items-center gap-3">
//                   <Phone size={16} className="text-primary" />
//                   <span>{booking?.customerPhone || "No Phone Provided"}</span>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <MapPin size={16} className="text-primary shrink-0" />
//                   <span className="leading-relaxed">
//                     Pickup: {booking?.pickupAddress || "N/A"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* LISTING INFORMATION */}
//           <section className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//             <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8">
//               Listing Information
//             </h2>
//             <div className="flex flex-col sm:flex-row gap-6">
//               <div className="relative w-full sm:w-56 h-36 rounded-3xl overflow-hidden bg-gray-100 shrink-0 border border-gray-50">
//                 <Image
//                   src={booking?.listing?.images?.[0] || "/placeholder.png"}
//                   alt="Listing"
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div className="flex-1 min-w-0">
//                 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                   <div>
//                     <h3 className="text-2xl font-black text-gray-900">
//                       {booking?.listing?.title}
//                     </h3>
//                     <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">
//                       #LST-{booking?.listingId?.slice(-6).toUpperCase()}
//                     </p>
//                   </div>
//                   <Link
//                     href={`/listing/${booking?.listingId}`}
//                     className="text-sm font-bold text-primary hover:underline"
//                   >
//                     View Public Page
//                   </Link>
//                 </div>

//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-gray-600">
//                   <div className="flex items-center gap-3">
//                     <MapPin size={16} className="text-gray-300" />
//                     <span>
//                       {booking?.listing?.city}, {booking?.listing?.country}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <CalendarDays size={16} className="text-gray-300" />
//                     <span>
//                       {booking?.startDate
//                         ? format(new Date(booking.startDate), "MMM dd")
//                         : ""}{" "}
//                       -
//                       {booking?.endDate
//                         ? format(new Date(booking.endDate), "MMM dd, yyyy")
//                         : ""}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Clock3 size={16} className="text-gray-300" />
//                     <span>
//                       {booking?.totalDays}{" "}
//                       {booking?.listing?.category === "CAR" ? "Days" : "Nights"}{" "}
//                       Total
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* BOOKING TIMELINE */}
//           <section className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//             <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8">
//               Booking Timeline
//             </h2>
//             <div className="space-y-8">
//               {dynamicTimeline?.map((item, idx) => (
//                 <div key={idx} className="flex gap-6">
//                   <div className="relative flex flex-col items-center shrink-0">
//                     <div
//                       className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-sm ${
//                         item.tone === "green"
//                           ? "bg-green-500 text-white"
//                           : item.tone === "yellow"
//                             ? "bg-amber-400 text-white"
//                             : "bg-primary text-white"
//                       }`}
//                     >
//                       {item.tone === "green" ? (
//                         <CheckCircle2 size={16} />
//                       ) : (
//                         <History size={16} />
//                       )}
//                     </div>
//                     {idx !== dynamicTimeline.length - 1 && (
//                       <div className="w-0.5 absolute top-8 bottom-[-32px] bg-gray-100" />
//                     )}
//                   </div>

//                   <div className="pb-2">
//                     <h3 className="text-base font-black text-gray-900">
//                       {item.title}
//                     </h3>
//                     <p className="mt-1 text-sm font-medium text-gray-500 italic">
//                       {item.description}
//                     </p>
//                     <p className="mt-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
//                       {item.time}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* ADMIN NOTES */}
//           <section className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//             <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">
//               Internal Admin Notes
//             </h2>
//             <textarea
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               placeholder="Add internal notes about this booking for other staff members..."
//               className="min-h-40 w-full rounded-2xl border border-gray-100 bg-gray-50 p-6 text-base font-medium outline-none transition focus:border-primary focus:bg-white resize-none"
//             />
//             <div className="mt-4 flex justify-end">
//               <button
//                 onClick={handleSaveNote}
//                 disabled={isSavingNote}
//                 className="rounded-2xl bg-primary px-8 py-4 text-sm font-black text-white hover:opacity-90 shadow-lg disabled:opacity-50 cursor-pointer"
//               >
//                 {isSavingNote ? "Saving..." : "Save Notes"}
//               </button>
//             </div>
//           </section>
//         </div>

//         {/* SIDEBAR */}
//         <aside className="xl:col-span-4 space-y-6">
//           {/* PAYMENT STATUS */}
//           <section className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
//             <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">
//               Payment Details
//             </h2>
//             <div className="space-y-5 text-sm font-bold">
//               <div className="flex items-center justify-between gap-4">
//                 <span className="text-gray-400 uppercase text-[11px] tracking-widest">
//                   Status
//                 </span>
//                 <span
//                   className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
//                     booking?.paymentStatus === "PAID"
//                       ? "bg-green-50 text-green-600"
//                       : "bg-red-50 text-red-600"
//                   }`}
//                 >
//                   {booking?.paymentStatus}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between gap-4">
//                 <span className="text-gray-400 uppercase text-[11px] tracking-widest">
//                   Method
//                 </span>
//                 <span className="text-gray-900 flex items-center gap-2">
//                   <CreditCard size={15} className="text-primary" />
//                   {booking?.paymentMethod || "Stripe"}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between gap-4">
//                 <span className="text-gray-400 uppercase text-[11px] tracking-widest">
//                   Transaction Date
//                 </span>
//                 <span className="text-gray-900">
//                   {booking?.transaction?.createdAt
//                     ? format(
//                         new Date(booking.transaction.createdAt),
//                         "MMM dd, yyyy",
//                       )
//                     : "N/A"}
//                 </span>
//               </div>
//             </div>
//           </section>

//           {/* FINANCIAL BREAKDOWN */}
//           <section className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
//             <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">
//               Financial Summary
//             </h2>
//             <div className="space-y-4 text-sm font-bold">
//               <div className="flex items-center justify-between gap-4 text-gray-500">
//                 <span>
//                   ${booking?.basePrice}/unit × {booking?.totalDays}
//                 </span>
//                 <span className="text-gray-900">
//                   ${(booking?.basePrice * booking?.totalDays).toFixed(2)}
//                 </span>
//               </div>

//               {/* Dynamic Extra Charges Mapping */}
//               {booking?.extraCharges?.map((charge: any, i: number) => (
//                 <div
//                   key={i}
//                   className="flex items-center justify-between gap-4 text-gray-500"
//                 >
//                   <span>{charge.label}</span>
//                   <span className="text-gray-900">
//                     ${charge.amount.toFixed(2)}
//                   </span>
//                 </div>
//               ))}

//               <div className="my-6 h-px bg-gray-50" />

//               <div className="flex items-center justify-between gap-4 text-gray-900">
//                 <span className="text-base uppercase tracking-tighter">
//                   Grand Total
//                 </span>
//                 <span className="text-2xl font-black">
//                   ${booking?.totalPrice?.toLocaleString()}
//                 </span>
//               </div>

//               <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-50">
//                 <span className="text-gray-400 font-medium">
//                   Commission Earned
//                 </span>
//                 <span className="text-primary font-black">
//                   ${commission.toLocaleString()}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between gap-4">
//                 <span className="text-gray-400 font-medium">Host Payout</span>
//                 <span className="text-green-600 font-black">
//                   ${ownerPayout.toLocaleString()}
//                 </span>
//               </div>
//             </div>
//           </section>

//           {/* CUSTOMER NOTES */}
//           <section className="bg-blue-50 border border-blue-100 rounded-[2rem] p-6 shadow-sm">
//             <h2 className="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em] mb-3">
//               Customer Special Requests
//             </h2>
//             <p className="text-sm font-medium text-blue-700 leading-relaxed italic">
//               "
//               {booking?.specialRequests ||
//                 "No special requests provided for this booking."}
//               "
//             </p>
//           </section>

//           {/* QUICK ACTIONS */}
//           <section className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
//             <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">
//               Quick Actions
//             </h2>
//             <div className="space-y-3">
//               <button
//                 onClick={() => setIsEmailModalOpen(true)}
//                 className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-5 py-4 text-sm font-black text-gray-700 hover:bg-gray-100 transition-all flex items-center justify-between cursor-pointer"
//               >
//                 <span className="inline-flex items-center gap-3">
//                   <Send size={18} className="text-primary" />
//                   Email Customer
//                 </span>
//               </button>

//               {/* REUSABLE MODAL */}
//               <Modal
//                 isOpen={isEmailModalOpen}
//                 onClose={() => setIsEmailModalOpen(false)}
//                 title="Contact Customer"
//               >
//                 <ContactUserForm
//                   emailTo={booking?.customerEmail || ""}
//                   onSubmit={handleSendEmail}
//                   isLoading={isSending}
//                 />
//               </Modal>

//               <button
//                 onClick={() => {
//                   if (!booking?.stripeReceiptUrl) {
//                     return toast.error("No Invoice for this booking.");
//                   }
//                   window.open(booking?.stripeReceiptUrl, "_blank");
//                 }}
//                 className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-5 py-4 text-sm font-black text-gray-700 hover:bg-gray-100 transition-all flex items-center justify-between cursor-pointer"
//               >
//                 <span className="inline-flex items-center gap-3">
//                   <ExternalLink size={18} className="text-primary" />
//                   View Invoice
//                 </span>
//               </button>

//               {/* PROCESS REFUND TRIGGER (Inside Sidebar) */}
//               <button
//                 onClick={() => setModalType("REFUND")}
//                 disabled={
//                   booking?.paymentStatus === "REFUNDED" ||
//                   booking?.paymentStatus === "PENDING"
//                 }
//                 className="w-full rounded-2xl border border-red-200 bg-red-50/20 px-5 py-4 text-sm font-black text-red-500 hover:bg-red-50 transition-all flex items-center justify-between cursor-pointer disabled:opacity-30"
//               >
//                 <span className="inline-flex items-center gap-3">
//                   <ShieldCheck size={18} />
//                   {booking?.paymentStatus === "REFUNDED"
//                     ? "Already Refunded"
//                     : "Process Refund"}
//                 </span>
//               </button>

//               {/* 1. CANCEL CONFIRMATION MODAL */}
//               <Modal
//                 isOpen={modalType === "CANCEL"}
//                 onClose={() => setModalType(null)}
//                 title="Confirm Cancellation"
//               >
//                 <div className="text-center space-y-6">
//                   <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
//                     <AlertTriangle size={40} />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">
//                       Admin Overrule
//                     </h3>
//                     <p className="text-sm text-gray-500 leading-relaxed font-medium">
//                       You are about to cancel booking{" "}
//                       <span className="text-gray-900 font-bold">
//                         #{booking?.bookingRef}
//                       </span>
//                       . This action is permanent and will notify the customer.
//                     </p>
//                   </div>
//                   <div className="flex gap-4 pt-4">
//                     <button
//                       onClick={() => setModalType(null)}
//                       className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 cursor-pointer"
//                     >
//                       Back
//                     </button>
//                     <button
//                       disabled={isCancelling}
//                       onClick={handleConfirmCancel}
//                       className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-100 hover:bg-red-600 transition-all disabled:opacity-50 cursor-pointer"
//                     >
//                       {isCancelling ? "Processing..." : "Yes, Cancel Booking"}
//                     </button>
//                   </div>
//                 </div>
//               </Modal>

//               {/* 2. REFUND CONFIRMATION MODAL */}
//               <Modal
//                 isOpen={modalType === "REFUND"}
//                 onClose={() => setModalType(null)}
//                 title="Process Refund"
//               >
//                 <div className="text-center space-y-6">
//                   <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm border-2 border-green-100">
//                     <DollarSign size={40} />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">
//                       Return Funds via Stripe
//                     </h3>
//                     <p className="text-sm text-gray-500 leading-relaxed font-medium">
//                       Are you sure you want to refund{" "}
//                       <span className="text-gray-900 font-bold">
//                         ${booking?.totalPrice}
//                       </span>{" "}
//                       to{" "}
//                       <span className="font-bold">{booking?.customerName}</span>
//                       ? This will trigger a transaction through the connected
//                       Stripe account.
//                     </p>
//                   </div>
//                   <div className="flex gap-4 pt-4">
//                     <button
//                       onClick={() => setModalType(null)}
//                       className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 cursor-pointer"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       disabled={isRefunding}
//                       onClick={handleConfirmRefund}
//                       className="flex-1 py-4 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
//                     >
//                       {isRefunding ? "Processing..." : "Confirm Refund"}
//                     </button>
//                   </div>
//                 </div>
//               </Modal>
//             </div>
//           </section>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default SingleBooking;

"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Loader2,
  History,
  ExternalLink,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import { useGetBookingDetailsQuery } from "@/redux/features/bookingApis/bookingApis";
import { format } from "date-fns";
import { enUS, fr, ar } from "date-fns/locale";
import { toast } from "sonner";
import {
  useAdminCancelBookingMutation,
  useProcessRefundMutation,
  useSendMessageToCustomerMutation,
  useUpdateAdminNoteMutation,
} from "@/redux/features/admin/bookings.api";
import { useEffect, useState } from "react";
import Modal from "@/components/common/modals/Modal";
import ContactUserForm from "@/components/form/ContactUserForm";
import { useTranslations, useLocale } from "next-intl";

type ModalType = "CANCEL" | "REFUND" | "EMAIL" | null;

const SingleBooking = ({ bookingId }: { bookingId: string }) => {
  const t = useTranslations("AdminSingleBooking");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const dateLocale = locale === "fr" ? fr : locale === "ar" ? ar : enUS;

  const { data: bookingDetailsData, isLoading } =
    useGetBookingDetailsQuery(bookingId);
  const booking = bookingDetailsData?.data || null;
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const [sendMessage, { isLoading: isSending }] =
    useSendMessageToCustomerMutation();
  const [adminCancel, { isLoading: isCancelling }] =
    useAdminCancelBookingMutation();
  const [processRefund, { isLoading: isRefunding }] =
    useProcessRefundMutation();
  const [updateNote, { isLoading: isSavingNote }] =
    useUpdateAdminNoteMutation();

  const [modalType, setModalType] = useState<ModalType>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (booking?.adminNote) setNote(booking.adminNote);
  }, [booking]);

  const handleConfirmCancel = async () => {
    const toastId = toast.loading(t("toasts.cancelling"));
    try {
      await adminCancel(bookingId).unwrap();
      toast.success(t("toasts.cancelSuccess"), { id: toastId });
      setModalType(null);
    } catch (err: any) {
      toast.error(err?.data?.message || t("toasts.cancelError"), {
        id: toastId,
      });
    }
  };

  const handleConfirmRefund = async () => {
    const toastId = toast.loading(t("toasts.refunding"));
    try {
      await processRefund(bookingId).unwrap();
      toast.success(t("toasts.refundSuccess"), { id: toastId });
      setModalType(null);
    } catch (err: any) {
      toast.error(err?.data?.message || t("toasts.refundError"), {
        id: toastId,
      });
    }
  };

  const handleSaveNote = async () => {
    try {
      await updateNote({ id: bookingId, note: note }).unwrap();
      toast.success(t("toasts.noteSuccess"));
    } catch (err: any) {
      toast.error(t("toasts.noteError"));
    }
  };

  const handleSendEmail = async (formData: {
    subject: string;
    message: string;
  }) => {
    try {
      await sendMessage({ id: bookingId, body: formData }).unwrap();
      toast.success(t("toasts.emailSuccess"));
      setIsEmailModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || t("toasts.emailError"));
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

  if (!booking) {
    return (
      <div
        className="py-20 text-center font-bold text-gray-400"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {t("notFound")}
      </div>
    );
  }

  const commission = booking?.transaction?.commission || 0;
  const ownerPayout = (booking?.totalPrice || 0) - commission;

  const dynamicTimeline = [
    {
      title: t("timeline.step1"),
      description: t("timeline.desc1", {
        source: booking?.bookingSource?.replace("_", " "),
      }),
      time: booking?.createdAt
        ? format(new Date(booking.createdAt), "MMM dd, yyyy 'at' h:mm b", {
            locale: dateLocale,
          })
        : "N/A",
      tone: "blue",
    },
    {
      title: t("timeline.step2"),
      description: t("timeline.desc2", { amount: booking?.totalPrice }),
      time: booking?.transaction?.createdAt
        ? format(
            new Date(booking.transaction.createdAt),
            "MMM dd, yyyy 'at' h:mm b",
            { locale: dateLocale },
          )
        : t("timeline.pending"),
      tone: booking?.paymentStatus === "PAID" ? "green" : "yellow",
    },
    {
      title: t("timeline.step3"),
      description: t("timeline.desc3", { status: booking?.status }),
      time: booking?.updatedAt
        ? format(new Date(booking.updatedAt), "MMM dd, yyyy 'at' h:mm b", {
            locale: dateLocale,
          })
        : "",
      tone: booking?.status === "CANCELLED" ? "red" : "blue",
    },
  ];

  return (
    <div className="space-y-6 pb-10" dir={isRtl ? "rtl" : "ltr"}>
      {/* HEADER ACTIONS */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Link
          href="/admin/dashboard/bookings"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} className={isRtl ? "rotate-180" : ""} />
          {t("header.back")}
        </Link>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
              booking?.status === "UPCOMING"
                ? "bg-blue-50 text-blue-600"
                : booking?.status === "ACTIVE"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
            }`}
          >
            {booking?.status}
          </span>
          {booking?.status !== "CANCELLED" && (
            <button
              onClick={() => setModalType("CANCEL")}
              className="rounded-2xl bg-red-500 px-6 py-3 text-sm font-black text-white hover:bg-red-600 transition-all cursor-pointer shadow-lg"
            >
              {t("header.cancelBtn")}
            </button>
          )}
        </div>
      </div>

      {/* TITLE SECTION */}
      <div className={isRtl ? "text-right" : "text-left"}>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Booking #{booking?.bookingRef}
        </h1>
        <p className="mt-2 text-sm font-bold text-gray-400 uppercase tracking-tighter">
          {t("header.ref")} {booking?.id}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-8 space-y-6">
          {/* CUSTOMER INFORMATION */}
          <section className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-8">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">
                {t("customer.title")}
              </h2>
              <Link
                target="_blank"
                href={`/admin/dashboard/users/${booking?.user?.id}`}
                className="text-sm font-bold text-primary hover:underline"
              >
                {t("customer.viewProfile")}
              </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex items-start gap-5 flex-1">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg">
                  {booking?.customerName
                    ?.split(" ")
                    .map((n: any) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div
                  className={`min-w-0 ${isRtl ? "text-right" : "text-left"}`}
                >
                  <h3 className="text-xl font-bold text-gray-900 truncate">
                    {booking?.customerName}
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">
                    {t("customer.memberSince")}{" "}
                    {booking?.user?.createdAt
                      ? format(new Date(booking.user.createdAt), "MMM yyyy", {
                          locale: dateLocale,
                        })
                      : "N/A"}
                  </p>
                  <div className="mt-6 space-y-3 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-primary" />
                      <span className="truncate">{booking?.customerEmail}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CalendarDays size={16} className="text-primary" />
                      <span>
                        {t("customer.totalBookings", {
                          count: booking?.user?._count?.bookings || 0,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`flex flex-col gap-4 text-sm font-medium text-gray-600 border-gray-50 lg:min-w-[280px] ${isRtl ? "lg:border-r lg:pr-8" : "lg:border-l lg:pl-8"}`}
              >
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-primary" />
                  <span>{booking?.customerPhone || t("customer.noPhone")}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-primary shrink-0" />
                  <span className="leading-relaxed">
                    {t("customer.pickup")} {booking?.pickupAddress || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* LISTING INFORMATION */}
          <section className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8">
              {t("listing.title")}
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative w-full sm:w-56 h-36 rounded-3xl overflow-hidden bg-gray-100 shrink-0 border border-gray-50">
                <Image
                  src={booking?.listing?.images?.[0] || "/placeholder.png"}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className={isRtl ? "text-right" : "text-left"}>
                    <h3 className="text-2xl font-black text-gray-900">
                      {booking?.listing?.title}
                    </h3>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">
                      #LST-{booking?.listingId?.slice(-6).toUpperCase()}
                    </p>
                  </div>
                  <Link
                    href={`/listing/${booking?.listingId}`}
                    className="text-sm font-bold text-primary hover:underline"
                  >
                    {t("listing.viewPublic")}
                  </Link>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold text-gray-600">
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-gray-300" />
                    <span>
                      {booking?.listing?.city}, {booking?.listing?.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays size={16} className="text-gray-300" />
                    <span>
                      {booking?.startDate
                        ? format(new Date(booking.startDate), "MMM dd", {
                            locale: dateLocale,
                          })
                        : ""}{" "}
                      -{" "}
                      {booking?.endDate
                        ? format(new Date(booking.endDate), "MMM dd, yyyy", {
                            locale: dateLocale,
                          })
                        : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock3 size={16} className="text-gray-300" />
                    <span>
                      {booking?.listing?.category === "CAR"
                        ? t("listing.daysTotal", { count: booking?.totalDays })
                        : t("listing.nightsTotal", {
                            count: booking?.totalDays,
                          })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BOOKING TIMELINE */}
          <section className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-8">
              {t("timeline.title")}
            </h2>
            <div className="space-y-8">
              {dynamicTimeline.map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="relative flex flex-col items-center shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-sm ${item.tone === "green" ? "bg-green-500 text-white" : item.tone === "yellow" ? "bg-amber-400 text-white" : "bg-primary text-white"}`}
                    >
                      {item.tone === "green" ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <History size={16} />
                      )}
                    </div>
                    {idx !== dynamicTimeline.length - 1 && (
                      <div className="w-0.5 absolute top-8 bottom-[-32px] bg-gray-100" />
                    )}
                  </div>
                  <div className={`pb-2 ${isRtl ? "text-right" : "text-left"}`}>
                    <h3 className="text-base font-black text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gray-500 italic">
                      {item.description}
                    </p>
                    <p className="mt-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ADMIN NOTES */}
          <section className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
            <h2
              className={`text-lg font-black text-gray-900 uppercase tracking-tight mb-6 ${isRtl ? "text-right" : "text-left"}`}
            >
              {t("notes.title")}
            </h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t("notes.placeholder")}
              className={`min-h-40 w-full rounded-2xl border border-gray-100 bg-gray-50 p-6 text-base font-medium outline-none transition focus:border-primary focus:bg-white resize-none ${isRtl ? "text-right" : "text-left"}`}
            />
            <div
              className={`mt-4 flex ${isRtl ? "justify-start" : "justify-end"}`}
            >
              <button
                onClick={handleSaveNote}
                disabled={isSavingNote}
                className="rounded-2xl bg-primary px-8 py-4 text-sm font-black text-white hover:opacity-90 shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isSavingNote ? t("notes.saving") : t("notes.saveBtn")}
              </button>
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="xl:col-span-4 space-y-6">
          <section className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">
              {t("payment.title")}
            </h2>
            <div className="space-y-5 text-sm font-bold">
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-400 uppercase text-[11px] tracking-widest">
                  {t("payment.status")}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${booking?.paymentStatus === "PAID" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                >
                  {booking?.paymentStatus}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-400 uppercase text-[11px] tracking-widest">
                  {t("payment.method")}
                </span>
                <span className="text-gray-900 flex items-center gap-2">
                  <CreditCard size={15} className="text-primary" />
                  {booking?.paymentMethod || "Stripe"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-400 uppercase text-[11px] tracking-widest">
                  {t("payment.date")}
                </span>
                <span className="text-gray-900">
                  {booking?.transaction?.createdAt
                    ? format(
                        new Date(booking.transaction.createdAt),
                        "MMM dd, yyyy",
                        { locale: dateLocale },
                      )
                    : "N/A"}
                </span>
              </div>
            </div>
          </section>

          <section className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">
              {t("financial.title")}
            </h2>
            <div className="space-y-4 text-sm font-bold">
              <div className="flex items-center justify-between gap-4 text-gray-500">
                <span>
                  ${booking?.basePrice}/{t("financial.unit")} ×{" "}
                  {booking?.totalDays}
                </span>
                <span className="text-gray-900">
                  ${(booking?.basePrice * booking?.totalDays).toFixed(2)}
                </span>
              </div>
              {booking?.extraCharges?.map((charge: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 text-gray-500"
                >
                  <span>{charge.label}</span>
                  <span className="text-gray-900">
                    ${charge.amount.toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="my-6 h-px bg-gray-50" />
              <div className="flex items-center justify-between gap-4 text-gray-900">
                <span className="text-base uppercase tracking-tighter">
                  {t("financial.total")}
                </span>
                <span className="text-2xl font-black">
                  ${booking?.totalPrice?.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-50">
                <span className="text-gray-400 font-medium">
                  {t("financial.commission")}
                </span>
                <span className="text-primary font-black">
                  ${commission.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-400 font-medium">
                  {t("financial.payout")}
                </span>
                <span className="text-green-600 font-black">
                  ${ownerPayout.toLocaleString()}
                </span>
              </div>
            </div>
          </section>

          <section className="bg-blue-50 border border-blue-100 rounded-[2rem] p-6 shadow-sm">
            <h2 className="text-[11px] font-black text-blue-900 uppercase tracking-[0.2em] mb-3">
              {t("requests.title")}
            </h2>
            <p
              className={`text-sm font-medium text-blue-700 leading-relaxed italic ${isRtl ? "text-right" : "text-left"}`}
            >
              "{booking?.specialRequests || t("requests.empty")}"
            </p>
          </section>

          <section className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-6">
              {t("actions.title")}
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-5 py-4 text-sm font-black text-gray-700 hover:bg-gray-100 transition-all flex items-center justify-between cursor-pointer"
              >
                <span className="inline-flex items-center gap-3">
                  <Send size={18} className="text-primary" />
                  {t("actions.email")}
                </span>
              </button>

              <Modal
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
                title={t("actions.contactModal")}
              >
                <ContactUserForm
                  emailTo={booking?.customerEmail || ""}
                  onSubmit={handleSendEmail}
                  isLoading={isSending}
                />
              </Modal>

              <button
                onClick={() => {
                  if (!booking?.stripeReceiptUrl)
                    return toast.error(t("toasts.noInvoice"));
                  window.open(booking?.stripeReceiptUrl, "_blank");
                }}
                className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-5 py-4 text-sm font-black text-gray-700 hover:bg-gray-100 transition-all flex items-center justify-between cursor-pointer"
              >
                <span className="inline-flex items-center gap-3">
                  <ExternalLink size={18} className="text-primary" />
                  {t("actions.invoice")}
                </span>
              </button>

              <button
                onClick={() => setModalType("REFUND")}
                disabled={
                  booking?.paymentStatus === "REFUNDED" ||
                  booking?.paymentStatus === "PENDING"
                }
                className="w-full rounded-2xl border border-red-200 bg-red-50/20 px-5 py-4 text-sm font-black text-red-500 hover:bg-red-50 transition-all flex items-center justify-between cursor-pointer disabled:opacity-30"
              >
                <span className="inline-flex items-center gap-3">
                  <ShieldCheck size={18} />
                  {booking?.paymentStatus === "REFUNDED"
                    ? t("actions.refunded")
                    : t("actions.refund")}
                </span>
              </button>

              <Modal
                isOpen={modalType === "CANCEL"}
                onClose={() => setModalType(null)}
                title={t("modals.cancelTitle")}
              >
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <AlertTriangle size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t("modals.cancelHeader")}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      {t("modals.cancelDesc", { ref: booking?.bookingRef })}
                    </p>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={() => setModalType(null)}
                      className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 cursor-pointer"
                    >
                      {t("modals.back")}
                    </button>
                    <button
                      disabled={isCancelling}
                      onClick={handleConfirmCancel}
                      className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg hover:bg-red-600 disabled:opacity-50 cursor-pointer"
                    >
                      {isCancelling
                        ? t("modals.processing")
                        : t("modals.cancelConfirm")}
                    </button>
                  </div>
                </div>
              </Modal>

              <Modal
                isOpen={modalType === "REFUND"}
                onClose={() => setModalType(null)}
                title={t("modals.refundTitle")}
              >
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm border-2 border-green-100">
                    <DollarSign size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {t("modals.refundHeader")}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      {t("modals.refundDesc", {
                        amount: booking?.totalPrice,
                        name: booking?.customerName,
                      })}
                    </p>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button
                      onClick={() => setModalType(null)}
                      className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 cursor-pointer"
                    >
                      {t("modals.cancel")}
                    </button>
                    <button
                      disabled={isRefunding}
                      onClick={handleConfirmRefund}
                      className="flex-1 py-4 bg-primary text-white rounded-2xl font-black shadow-lg hover:opacity-90 disabled:opacity-50 cursor-pointer"
                    >
                      {isRefunding
                        ? t("modals.processing")
                        : t("modals.refundConfirm")}
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default SingleBooking;
