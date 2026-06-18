// "use client";
// import { useState } from "react";
// import { Loader2, Star } from "lucide-react";
// import Link from "next/link";
// import { useGetAllReviewsQuery } from "@/redux/features/admin/review.api";
// import Image from "next/image";
// import { cn } from "@/lib/utils";
// import { useSearchParams } from "next/navigation";
// import { useSendMessageToUserMutation } from "@/redux/features/admin/inquiry.api";
// import { toast } from "sonner";
// import Modal from "@/components/common/modals/Modal";
// import ContactUserForm from "@/components/form/ContactUserForm";
// import Pagination from "@/components/common/Pagination";

// const Reviews = () => {
//   const [sendMessage, { isLoading: isSending }] =
//     useSendMessageToUserMutation();
//   const [isContactModalOpen, setIsContactModalOpen] = useState(false);
//   const [contactReview, setContactReview] = useState<any>();

//   const searchParams = useSearchParams();

//   const params = Object.fromEntries(searchParams.entries());

//   const { data: reviewData, isLoading } = useGetAllReviewsQuery(params);
//   const reviews = reviewData?.data || [];
//   const meta = reviewData?.meta;

//   const handleOpenContactModal = (review: any) => {
//     setIsContactModalOpen(true);
//     setContactReview(review);
//   };

//   // 3. Email Submission Handler
//   const handleContactSubmit = async (formData: {
//     subject: string;
//     message: string;
//   }) => {
//     if (!contactReview) return;
//     const toastId = toast.loading("Sending email...");
//     try {
//       const res = await sendMessage({
//         id: contactReview?.userId,
//         body: formData,
//       }).unwrap();
//       console.log(res, "contact res");
//       toast.success("Email sent successfully!", { id: toastId });
//       setIsContactModalOpen(false);
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
//           Loading Review Data...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* contact modal */}
//       <Modal
//         isOpen={isContactModalOpen}
//         onClose={() => setIsContactModalOpen(false)}
//         title="Contact User"
//       >
//         {contactReview && (
//           <ContactUserForm
//             emailTo={contactReview?.userEmail}
//             onSubmit={handleContactSubmit}
//             isLoading={isSending}
//           />
//         )}
//       </Modal>

//       <h2 className="text-xl font-bold">All Reviews</h2>
//       <p className="text-sm text-gray-500">Manage and moderate user reviews</p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white border border-gray-100 rounded-2xl p-4">
//           <p className="text-sm text-gray-500">Total Reviews</p>
//           <p className="text-2xl font-bold mt-2">{meta?.stats?.totalReviews}</p>
//         </div>
//         <div className="bg-white border border-gray-100 rounded-2xl p-4">
//           <p className="text-sm text-gray-500">Pending Approval</p>
//           <p className="text-2xl font-bold mt-2">
//             {meta?.stats?.pendingApproval}
//           </p>
//         </div>
//         <div className="bg-white border border-gray-100 rounded-2xl p-4">
//           <p className="text-sm text-gray-500">Average Rating</p>
//           <p className="text-2xl font-bold mt-2 flex items-center gap-2">
//             {meta?.stats?.averageRating} <Star className="text-yellow-400" />
//           </p>
//         </div>
//       </div>

//       <div className="space-y-4">
//         {reviews?.length === 0 ? (
//           <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//             <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
//               {status === "PENDING"
//                 ? "No Pending Reviews Available"
//                 : "No Review Data Available"}
//             </p>
//           </div>
//         ) : (
//           reviews?.map((r: any) => (
//             <div
//               key={r.id}
//               className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-sm relative group flex justify-between"
//             >
//               <div className="flex flex-col md:flex-row items-start gap-6">
//                 {/* Left Side: Avatar */}
//                 <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-primary/20">
//                   {r?.userImage ? (
//                     <Image
//                       className="rounded-full object-cover"
//                       src={r?.userImage}
//                       width={100}
//                       height={100}
//                       alt="User Profile"
//                     />
//                   ) : (
//                     r.userName
//                       ?.split(" ")
//                       ?.map((n: any) => n[0])
//                       ?.slice(0, 2)
//                       ?.join("")
//                   )}
//                 </div>

//                 {/* Middle Section: Content */}
//                 <div className="flex-1 min-w-0 w-full">
//                   <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
//                     <h3 className="text-lg font-bold text-gray-900">
//                       {r?.userName}
//                     </h3>
//                     <div className="flex items-center gap-1 text-yellow-500">
//                       {Array.from({ length: r?.rating })?.map((_, i) => (
//                         <Star key={i} size={16} fill="currentColor" />
//                       ))}
//                     </div>
//                     <p className="text-sm font-medium text-gray-400">
//                       {r?.date}
//                     </p>
//                   </div>

//                   <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
//                     <span className="text-sm font-bold text-gray-500">
//                       Review for:
//                     </span>
//                     <span className="text-sm font-bold text-gray-900 underline decoration-primary/30 underline-offset-4">
//                       {r?.listingTitle}
//                     </span>
//                     <span className="text-sm font-bold text-gray-400">
//                       {r?.listingId}
//                     </span>
//                     <span
//                       className={cn(
//                         "px-2 py-0.5 text-[11px] font-black rounded uppercase",
//                         r?.category === "APARTMENT"
//                           ? "text-blue-600 bg-blue-50"
//                           : "text-primary bg-[#A446FF1A]",
//                       )}
//                     >
//                       {r?.category}
//                     </span>
//                   </div>

//                   <p className="text-gray-600 mt-4 text-base leading-relaxed">
//                     {r?.comment}
//                   </p>

//                   {/* <p className="text-sm font-bold text-gray-400 mt-4 italic">
//                     {r.helpful} people found this helpful
//                   </p> */}

//                   {/* Action Buttons - Fully Responsive Grid */}
//                   <div className="mt-6 flex flex-wrap gap-3">
//                     <button
//                       onClick={() => handleOpenContactModal(r)}
//                       className="flex-1 sm:flex-none rounded-2xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap"
//                     >
//                       Contact Reviewer
//                     </button>
//                     <Link
//                       target="_blank"
//                       href={`/listing/${r?.listingId}`}
//                       className="flex-1 sm:flex-none text-center rounded-2xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap"
//                     >
//                       View Listing
//                     </Link>

//                     {r.status === "PENDING" && (
//                       <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
//                         <button className="flex-1 sm:flex-none rounded-2xl bg-green-500 text-white px-8 py-3 text-sm font-black shadow-lg shadow-green-100 hover:bg-green-600 transition-all cursor-pointer">
//                           Approve
//                         </button>
//                         <button className="flex-1 sm:flex-none rounded-2xl bg-red-500 text-white px-8 py-3 text-sm font-black shadow-lg shadow-red-100 hover:bg-red-600 transition-all cursor-pointer">
//                           Reject
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="absolute top-4 right-4 lg:static">
//                 <span
//                   className={`inline-flex items-center px-4 py-1.5 text-sm font-bold rounded-full uppercase tracking-tight ${
//                     r.status === "APPROVED"
//                       ? "bg-green-100 text-green-600"
//                       : "bg-orange-50 text-orange-600"
//                   }`}
//                 >
//                   {r?.status}
//                 </span>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* <div className="flex items-center justify-between">
//         <p className="text-sm text-gray-500">Showing 6 of 6 reviews</p>
//         <div className="flex items-center gap-2">
//           <button className="px-3 py-1 rounded border border-gray-200 text-sm">
//             Previous
//           </button>
//           <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
//             1
//           </div>
//           <button className="px-3 py-1 rounded border border-gray-200 text-sm">
//             Next
//           </button>
//         </div>
//       </div> */}

//       <Pagination total={meta?.total} limit={meta?.limit} page={meta?.page} />
//     </div>
//   );
// };

// export default Reviews;

"use client";
import { useState } from "react";
import { Loader2, Star } from "lucide-react";
import Link from "next/link";
import {
  useGetAllReviewsQuery,
  useUpdateReviewStatusMutation,
} from "@/redux/features/admin/review.api";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useSendMessageToUserMutation } from "@/redux/features/admin/inquiry.api";
import { toast } from "sonner";
import Modal from "@/components/common/modals/Modal";
import ContactUserForm from "@/components/form/ContactUserForm";
import Pagination from "@/components/common/Pagination";
import { useTranslations, useLocale } from "next-intl";

const Reviews = () => {
  const t = useTranslations("AdminReviews");
  const [updateStatus, { isLoading: isStatusUpdating }] =
    useUpdateReviewStatusMutation();

  const locale = useLocale();
  const isRtl = locale === "ar";

  const [sendMessage, { isLoading: isSending }] =
    useSendMessageToUserMutation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactReview, setContactReview] = useState<any>();

  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const { data: reviewData, isLoading } = useGetAllReviewsQuery(params);
  const reviews = reviewData?.data || [];
  const meta = reviewData?.meta;

  const handleOpenContactModal = (review: any) => {
    setIsContactModalOpen(true);
    setContactReview(review);
  };

  const handleStatusUpdate = async (
    id: string,
    status: "APPROVED" | "REJECTED",
  ) => {
    const toastId = toast.loading("Updating Status...");
    try {
      const res = await updateStatus({ id, status }).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Status Updated", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    }
  };

  const handleContactSubmit = async (formData: {
    subject: string;
    message: string;
  }) => {
    if (!contactReview) return;
    const toastId = toast.loading(t("toasts.sending"));
    try {
      await sendMessage({ id: contactReview?.userId, body: formData }).unwrap();
      toast.success(t("toasts.success"), { id: toastId });
      setIsContactModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || t("toasts.error"), { id: toastId });
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
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title={t("modals.contactTitle")}
      >
        {contactReview && (
          <ContactUserForm
            emailTo={contactReview?.userEmail}
            onSubmit={handleContactSubmit}
            isLoading={isSending}
          />
        )}
      </Modal>

      <div className={isRtl ? "text-right" : "text-left"}>
        <h2 className="text-xl font-bold">{t("title")}</h2>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <p className="text-sm text-gray-500">{t("stats.total")}</p>
          <p className="text-2xl font-bold mt-2">{meta?.stats?.totalReviews}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <p className="text-sm text-gray-500">{t("stats.pending")}</p>
          <p className="text-2xl font-bold mt-2">
            {meta?.stats?.pendingApproval}
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <p className="text-sm text-gray-500">{t("stats.average")}</p>
          <p className="text-2xl font-bold mt-2 flex items-center gap-2">
            {meta?.stats?.averageRating} <Star className="text-yellow-400" />
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews?.length === 0 ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
              {params.status === "PENDING"
                ? t("labels.noPending")
                : t("labels.noData")}
            </p>
          </div>
        ) : (
          reviews?.map((r: any) => (
            <div
              key={r.id}
              className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-sm relative group flex justify-between items-start flex-col lg:flex-row gap-6"
            >
              <div className="flex flex-col md:flex-row items-start gap-6 w-full">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-primary/20">
                  {r?.userImage ? (
                    <Image
                      className="rounded-full object-cover"
                      src={r?.userImage}
                      width={100}
                      height={100}
                      alt=""
                    />
                  ) : (
                    r.userName
                      ?.split(" ")
                      .map((n: any) => n[0])
                      .slice(0, 2)
                      .join("")
                  )}
                </div>

                <div className="flex-1 min-w-0 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      {r?.userName}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {Array.from({ length: r?.rating }).map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-sm font-medium text-gray-400">
                      {r?.date}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-bold text-gray-500">
                      {t("labels.reviewFor")}
                    </span>
                    <span className="text-sm font-bold text-gray-900 underline decoration-primary/30 underline-offset-4">
                      {r?.listingTitle}
                    </span>
                    <span className="text-sm font-bold text-gray-400">
                      {r?.listingId}
                    </span>
                    <span
                      className={cn(
                        "px-2 py-0.5 text-[11px] font-black rounded uppercase",
                        r?.category === "APARTMENT"
                          ? "text-blue-600 bg-blue-50"
                          : "text-primary bg-[#A446FF1A]",
                      )}
                    >
                      {r?.category}
                    </span>
                  </div>

                  <p
                    className={`text-gray-600 mt-4 text-base leading-relaxed ${isRtl ? "text-right" : "text-left"}`}
                  >
                    {r?.comment}
                  </p>

                  {/* <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => handleOpenContactModal(r)}
                      className="flex-1 sm:flex-none rounded-2xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap"
                    >
                      {t("buttons.contact")}
                    </button>
                    <Link
                      target="_blank"
                      href={`/listing/${r?.listingId}`}
                      className="flex-1 sm:flex-none text-center rounded-2xl border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer whitespace-nowrap"
                    >
                      {t("buttons.viewListing")}
                    </Link>
                    {r.status === "PENDING" && (
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none rounded-2xl bg-green-500 text-white px-8 py-3 text-sm font-black shadow-lg shadow-green-100 hover:bg-green-600 transition-all cursor-pointer">
                          {t("buttons.approve")}
                        </button>
                        <button className="flex-1 sm:flex-none rounded-2xl bg-red-500 text-white px-8 py-3 text-sm font-black shadow-lg shadow-red-100 hover:bg-red-600 transition-all cursor-pointer">
                          {t("buttons.reject")}
                        </button>
                      </div>
                    )}
                  </div> */}

                  {r.status === "PENDING" && (
                    <div className="flex gap-2 w-full sm:w-auto mt-3">
                      <button
                        disabled={isStatusUpdating}
                        onClick={() => handleStatusUpdate(r.id, "APPROVED")}
                        className="flex-1 sm:flex-none rounded-2xl bg-green-500 text-white px-8 py-3 text-sm font-black shadow-lg shadow-green-100 hover:bg-green-600 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {t("buttons.approve")}
                      </button>
                      <button
                        disabled={isStatusUpdating}
                        onClick={() => handleStatusUpdate(r.id, "REJECTED")}
                        className="flex-1 sm:flex-none rounded-2xl bg-red-500 text-white px-8 py-3 text-sm font-black shadow-lg shadow-red-100 hover:bg-red-600 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {t("buttons.reject")}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`lg:static self-start ${isRtl ? "lg:mr-auto" : "lg:ml-auto"}`}
              >
                <span
                  className={`inline-flex items-center px-4 py-1.5 text-sm font-bold rounded-full uppercase tracking-tight ${r.status === "APPROVED" ? "bg-green-100 text-green-600" : "bg-orange-50 text-orange-600"}`}
                >
                  {r?.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <Pagination total={meta?.total} limit={meta?.limit} page={meta?.page} />
    </div>
  );
};

export default Reviews;
