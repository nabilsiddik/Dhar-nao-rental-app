// "use client";

// import React, { useState } from "react";
// import { ArrowLeft, Star } from "lucide-react";
// import { toast } from "sonner";
// import { useSubmitReviewMutation } from "@/redux/features/reviewApis/reviewApis";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useGetSingleListingQuery } from "@/redux/features/listingApis/listingApis";
// import Image from "next/image";

// const ReviewClient = ({ bookingId }: { bookingId: string }) => {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const router = useRouter();
//   const [submitReview, { isLoading }] = useSubmitReviewMutation();
//   const params = useSearchParams();

//   const listingId = params.get("listingId") || "";

//   console.log(listingId, "id");

//   const { data: listingData } = useGetSingleListingQuery(listingId);
//   const listing = listingData?.data;

//   console.log(listingData, "my listing");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!listingId) {
//       return toast.error("Listing ID not provided");
//     }
//     if (!bookingId) {
//       return toast.error("Booking ID not provided");
//     }

//     if (rating === 0) return toast.error("Please select a star rating");
//     if (comment.length < 10) {
//       return toast.error(
//         `Review is too short. Need ${10 - comment.length} more characters.`,
//       );
//     }

//     const toastId = toast.loading("Submitting your review for moderation...");

//     try {
//       const payload = {
//         rating,
//         comment,
//         listingId,
//       };

//       const res = await submitReview({ payload, bookingId }).unwrap();

//       if (res?.success) {
//         toast.success("Review submitted! Admin will approve it shortly.", {
//           id: toastId,
//         });
//         setTimeout(() => router.push("/profile"), 2000);
//       }
//     } catch (error: any) {
//       const errorMessage =
//         error?.data?.message || "Failed to submit review. Please try again.";
//       toast.error(errorMessage, { id: toastId });
//       console.error("Review Submission Error:", error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-5">
//       <button
//         onClick={() => window.history.back()}
//         className="mb-5 hover:bg-gray-100 p-2 rounded-full transition"
//       >
//         <ArrowLeft size={28} />
//       </button>

//       <h1 className="text-3xl font-bold text-gray-900 mb-6">Give a review.</h1>

//       {/* Listing Header */}
//       <div className="flex items-center gap-4 border-b border-gray-100 pb-10 mb-10">
//         <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
//           <Image
//             src={listing?.images[0]}
//             width={500}
//             height={500}
//             alt={listing?.title || "listing image"}
//           />
//         </div>
//         <div>
//           <h3 className="font-extrabold text-xl text-gray-900 leading-tight">
//             {listing?.title}
//           </h3>
//           <p className="text-gray-500 font-medium">
//             {listing?.city}, {listing?.country}
//           </p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-12">
//         {/* Rating Selector */}
//         <div className="space-y-4">
//           <h4 className="text-xl font-bold text-gray-900">
//             Share your experience.
//           </h4>
//           <div className="flex gap-2">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <button
//                 key={star}
//                 type="button"
//                 className="transition-transform active:scale-90"
//                 onClick={() => setRating(star)}
//                 onMouseEnter={() => setHoverRating(star)}
//                 onMouseLeave={() => setHoverRating(0)}
//               >
//                 <Star
//                   size={32}
//                   className={`border rounded-lg p-1.5 transition-colors ${
//                     (hoverRating || rating) >= star
//                       ? "fill-orange-400 text-orange-400 bg-orange-50 border-orange-200"
//                       : "text-gray-300 border-gray-200"
//                   }`}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Text Area */}
//         <div className="space-y-4">
//           <h4 className="text-xl font-bold text-gray-900">
//             Describe about your experience.
//           </h4>
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Start your review..."
//             className="w-full h-48 bg-[#F3F4F6]/50 border border-gray-200 rounded-2xl p-6 outline-none focus:border-primary transition-all resize-none text-gray-700 text-base"
//           />
//           <div className="flex justify-between items-center">
//             <p className="text-sm text-gray-400 font-medium">
//               Reviews need to be at least 85 characters
//             </p>
//             <p
//               className={`text-sm font-bold ${comment.length >= 85 ? "text-green-500" : "text-gray-400"}`}
//             >
//               {comment.length} / 85
//             </p>
//           </div>
//         </div>

//         {/* Submit */}
//         <div className="flex justify-end pt-4">
//           <button
//             type="submit"
//             className="bg-primary text-white px-12 py-4 rounded-3xl font-bold text-base hover:opacity-90 transition-opacity"
//           >
//             Submit Review
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ReviewClient;

"use client";

import React, { useState } from "react";
import { ArrowLeft, Star } from "lucide-react";
import { toast } from "sonner";
import { useSubmitReviewMutation } from "@/redux/features/reviewApis/reviewApis";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetSingleListingQuery } from "@/redux/features/listingApis/listingApis";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const ReviewClient = ({ bookingId }: { bookingId: string }) => {
  const t = useTranslations("Review");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const [submitReview, { isLoading }] = useSubmitReviewMutation();
  const params = useSearchParams();

  const listingId = params.get("listingId") || "";

  const { data: listingData } = useGetSingleListingQuery(listingId);
  const listing = listingData?.data;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!listingId) return toast.error(t("toasts.noListing"));
    if (!bookingId) return toast.error(t("toasts.noBooking"));
    if (rating === 0) return toast.error(t("toasts.selectStar"));

    if (comment.length < 10) {
      return toast.error(t("toasts.tooShort", { count: 10 - comment.length }));
    }

    const toastId = toast.loading(t("toasts.submitting"));

    try {
      const payload = {
        rating,
        comment,
        listingId,
      };

      const res = await submitReview({ payload, bookingId }).unwrap();

      if (res?.success) {
        toast.success(t("toasts.success"), { id: toastId });
        setTimeout(() => router.push("/profile"), 2000);
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || t("toasts.error");
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-5" dir={isRtl ? "rtl" : "ltr"}>
      <button
        onClick={() => window.history.back()}
        className={`mb-5 hover:bg-gray-100 p-2 rounded-full transition cursor-pointer ${isRtl ? "rotate-180" : ""}`}
      >
        <ArrowLeft size={28} />
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t("title")}</h1>

      {/* Listing Header */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-10 mb-10">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
          {listing?.images?.[0] && (
            <Image
              src={listing.images[0]}
              width={500}
              height={500}
              alt={listing?.title || "listing image"}
              className="object-cover h-full w-full"
            />
          )}
        </div>
        <div>
          <h3 className="font-extrabold text-xl text-gray-900 leading-tight">
            {listing?.title}
          </h3>
          <p className="text-gray-500 font-medium">
            {listing?.city}, {listing?.country}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Rating Selector */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-gray-900">
            {t("experienceTitle")}
          </h4>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform active:scale-90"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  size={32}
                  className={`border rounded-lg p-1.5 transition-colors ${
                    (hoverRating || rating) >= star
                      ? "fill-orange-400 text-orange-400 bg-orange-50 border-orange-200"
                      : "text-gray-300 border-gray-200"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-gray-900">
            {t("describeTitle")}
          </h4>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t("placeholder")}
            className="w-full h-48 bg-[#F3F4F6]/50 border border-gray-200 rounded-2xl p-6 outline-none focus:border-primary transition-all resize-none text-gray-700 text-base"
          />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <p className="text-sm text-gray-400 font-medium">{t("charHint")}</p>
            <p
              className={`text-sm font-bold ${comment.length >= 85 ? "text-green-500" : "text-gray-400"}`}
            >
              {comment.length} / 85
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className={`flex ${isRtl ? "justify-start" : "justify-end"} pt-4`}>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-white px-12 py-4 rounded-3xl font-bold text-base hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
          >
            {t("submit")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewClient;
