// "use client";

// import {
//   ArrowLeft,
//   Copy,
//   Star,
//   MessageSquare,
//   XCircle,
//   Check,
//   Headphones,
//   Phone,
//   FileText,
//   Loader2,
//   Calendar,
//   MapPin,
//   AlertTriangle,
// } from "lucide-react";
// import Image from "next/image";
// import { toast } from "sonner";
// import { format } from "date-fns";
// import {
//   useCancelBookingMutation,
//   useGetBookingDetailsQuery,
// } from "@/redux/features/bookingApis/bookingApis";
// import Link from "next/link";
// import Modal from "@/components/common/modals/Modal";
// import { useState } from "react";

// const BookingDetailsClient = ({ bookingId }: { bookingId: string }) => {
//   // 1. Fetch Data
//   const {
//     data: apiResponse,
//     isLoading,
//     isError,
//   } = useGetBookingDetailsQuery(bookingId);
//   const booking = apiResponse?.data;

//   const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

//   console.log(booking, "my booking");

//   const [cancelBooking, { isLoading: cancelLoading }] =
//     useCancelBookingMutation();

//   // Casing logic for UI
//   const isUpcoming = booking?.status === "UPCOMING";

//   const handleConfirmCancellation = async () => {
//     if (!isUpcoming) {
//       toast.error("Only Upcomming Booking Can be canceled.");
//     }

//     const toastId = toast.loading("Processing cancellation...");

//     try {
//       const res = await cancelBooking(bookingId).unwrap();

//       if (res?.success) {
//         toast.success(res?.message || "Booking cancelled successfully", {
//           id: toastId,
//         });
//         setIsCancelModalOpen(false);
//       }
//     } catch (error: any) {
//       const errorMsg =
//         error?.data?.message || "Failed to cancel booking. Please try again.";
//       toast.error(errorMsg, { id: toastId });
//     }
//   };

//   const handleViewStripeReceipt = () => {
//     if (booking?.stripeReceiptUrl) {
//       window.open(booking.stripeReceiptUrl, "_blank");
//     } else {
//       toast.error("Receipt not available yet.");
//     }
//   };

//   // 2. Loading & Error States
//   if (isLoading) {
//     return (
//       <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-primary" size={40} />
//         <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
//           Loading details...
//         </p>
//       </div>
//     );
//   }

//   if (isError || !booking) {
//     return (
//       <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4">
//         <h2 className="text-2xl font-bold text-gray-800">Booking not found</h2>
//         <button
//           onClick={() => window.history.back()}
//           className="mt-4 text-primary font-bold hover:underline"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   // 3. Helper: Dynamic Specs logic (Car vs Apartment)
//   const getSpecs = () => {
//     const isCar = booking?.listing?.category === "CAR";
//     if (isCar) {
//       return [
//         {
//           label: "Vehicle Type",
//           value: booking?.listing?.carDetails?.cartType,
//         },
//         { label: "Model", value: booking?.listing?.carDetails?.model },
//         {
//           label: "Transmission",
//           value: booking?.listing?.carDetails?.transmission,
//         },
//         { label: "Fuel Type", value: booking?.listing?.carDetails?.fuelType },
//         {
//           label: "Seats",
//           value: `${booking?.listing?.carDetails?.seats} Seats`,
//         },
//         { label: "Mileage", value: booking?.listing?.carDetails?.mileage },
//       ];
//     } else {
//       const baseSpecs = [
//         { label: "Property Type", value: "Apartment" },
//         { label: "Location", value: booking?.listing?.city },
//         { label: "Guests", value: `${booking?.guests || 1} Guests` },
//       ];

//       const amenitySpecs =
//         booking?.listing?.apartmentDetails?.amenities?.map(
//           (amenity: string) => ({
//             label: amenity,
//             value: "Included",
//           }),
//         ) || [];

//       return [...baseSpecs, ...amenitySpecs];
//     }
//   };

//   const handleCopyRef = () => {
//     navigator.clipboard.writeText(booking?.bookingRef || "");
//     toast.success("Reference copied to clipboard");
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <button
//         onClick={() => window.history.back()}
//         className="mb-8 hover:bg-gray-100 p-2 rounded-full transition cursor-pointer"
//       >
//         <ArrowLeft size={28} />
//       </button>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
//         {/* LEFT SIDEBAR */}
//         <div className="lg:col-span-4 space-y-6">
//           <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-8 shadow-sm">
//             <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-gray-200">
//               <Image
//                 src={booking?.listing?.images?.[0] || ""}
//                 alt="Listing"
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             <h2 className="text-xl font-bold text-gray-900 mb-1">
//               {booking?.listing?.title}
//             </h2>
//             <p className="text-sm text-gray-500 mb-4 flex items-center gap-1 font-medium">
//               <MapPin size={14} className="text-gray-400" />{" "}
//               {booking?.listing?.city}, {booking?.listing?.country}
//             </p>

//             <div className="flex items-center gap-1 mb-6">
//               {[1, 2, 3, 4, 5].map((s) => (
//                 <Star
//                   key={s}
//                   size={14}
//                   className={
//                     s <= (booking?.listing?.avgRating || 0)
//                       ? "fill-orange-400 text-orange-400"
//                       : "text-gray-500"
//                   }
//                 />
//               ))}
//               <span className="text-sm font-bold ml-1">
//                 {booking?.listing?.avgRating?.toFixed(1)}
//               </span>
//               <span className="text-sm text-gray-600">
//                 · {booking?.listing?.totalReviews} reviews
//               </span>
//             </div>

//             <div className="flex flex-col items-center gap-4 py-6 border-y border-gray-200/60 mb-6">
//               <span
//                 className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
//                   booking?.status === "UPCOMING"
//                     ? "bg-blue-50 text-blue-600"
//                     : "bg-green-50 text-green-600"
//                 }`}
//               >
//                 {booking?.status}
//               </span>
//               <div className="text-center">
//                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
//                   Booking Reference
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <span className="font-bold text-gray-800">
//                     {booking?.bookingRef}
//                   </span>
//                   <button
//                     onClick={handleCopyRef}
//                     className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
//                   >
//                     <Copy size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-3 mb-8">
//               <div className="flex justify-between text-sm font-medium">
//                 <span className="text-gray-500">
//                   ${booking?.basePrice} × {booking?.totalDays}{" "}
//                   {booking?.listing?.category === "CAR" ? "days" : "nights"}
//                 </span>
//                 <span className="text-gray-900 font-bold">
//                   ${(booking?.basePrice * booking?.totalDays).toLocaleString()}
//                 </span>
//               </div>

//               {booking?.extraCharges?.length > 0 &&
//                 booking?.extraCharges?.map((item: any) => {
//                   return (
//                     <div className="flex justify-between text-sm text-gray-600">
//                       <span>{item?.label}</span>
//                       <span>${item?.amount.toFixed(2)}</span>
//                     </div>
//                   );
//                 })}

//               <div className="flex justify-between text-base border-t border-gray-100 pt-3">
//                 <span className="font-bold text-gray-900">Total paid</span>
//                 <span className="font-black text-gray-900 text-xl">
//                   ${booking?.totalPrice?.toLocaleString()}
//                 </span>
//               </div>
//             </div>

//             <div className="space-y-3">
//               {booking?.status === "UPCOMING" && (
//                 <button
//                   onClick={() => setIsCancelModalOpen(true)}
//                   className="w-full border-2 border-red-100 text-red-500 py-4 rounded-2xl font-bold hover:bg-red-50 transition-colors cursor-pointer"
//                 >
//                   Cancel Booking
//                 </button>
//               )}
//               <Link href="/contact" target="_blank">
//                 <button className="w-full bg-gray-200 text-gray-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors cursor-pointer">
//                   <MessageSquare size={18} /> Contact Host
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="lg:col-span-8 space-y-8">
//           <div>
//             <h1 className="text-3xl font-black text-gray-900">
//               Booking Details
//             </h1>
//             <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter mt-1">
//               Booked on{" "}
//               {booking?.createdAt
//                 ? format(new Date(booking.createdAt), "MMMM dd, yyyy")
//                 : "N/A"}
//             </p>
//           </div>

//           {/* YOUR STAY CARD */}
//           <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2rem] p-8 shadow-sm">
//             <p className=" text-gray-400 font-black  mb-6">Your Stay</p>
//             <div className="flex flex-col md:flex-row justify-between items-center gap-8">
//               <div className="text-center md:text-left">
//                 <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">
//                   Start / Check-in
//                 </p>
//                 <p className="font-black text-gray-900">
//                   {booking?.startDate
//                     ? format(new Date(booking.startDate), "MMM dd, yyyy")
//                     : "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-500 font-medium">
//                   {booking?.startDate
//                     ? format(new Date(booking.startDate), "EEEE")
//                     : ""}
//                 </p>
//               </div>
//               <div className="flex flex-col items-center gap-1">
//                 <XCircle size={20} className="text-gray-300" />
//                 <span className="text-sm font-black text-gray-900">
//                   {booking?.totalDays}{" "}
//                   {booking?.listing?.category === "CAR" ? "Days" : "Nights"}
//                 </span>
//               </div>
//               <div className="text-center md:text-right">
//                 <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">
//                   End / Check-out
//                 </p>
//                 <p className="text-lg font-black text-gray-900">
//                   {booking?.endDate
//                     ? format(new Date(booking.endDate), "MMM dd, yyyy")
//                     : "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-500 font-medium">
//                   {booking?.endDate
//                     ? format(new Date(booking.endDate), "EEEE")
//                     : ""}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* LISTING DETAILS GRID */}
//           <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-8 shadow-sm">
//             <p className=" text-gray-400 font-black   mb-6">Listing Details</p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {getSpecs().map((spec, index) => (
//                 <div
//                   key={index}
//                   className="bg-white/60 border border-gray-200 p-5 rounded-2xl flex items-center gap-4"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
//                     <Check size={16} className="text-primary" strokeWidth={3} />
//                   </div>
//                   <div>
//                     <p className="text-gray-400 font-black tracking-tight">
//                       {spec.label}
//                     </p>
//                     <p className="font-bold text-gray-800 capitalize">
//                       {spec.value || "Included"}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* CANCELLATION POLICY */}
//           <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2rem] p-8 shadow-sm">
//             <span className="text-sm text-gray-400 font-black   border border-gray-200 px-3 py-1 rounded-full mb-4 inline-block">
//               Policy
//             </span>
//             <h3 className="text-2xl font-black text-gray-900 mb-2">
//               Moderate cancellation policy
//             </h3>
//             <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed">
//               Free cancellation until 48 hours before check-in. After that, its
//               not refundable.
//             </p>

//             <div className="bg-green-50 border border-green-100 p-5 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
//               {/* Circle Check Icon */}
//               <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-sm shadow-green-200">
//                 <Check size={14} strokeWidth={4} />
//               </div>

//               {/* Alert Text */}
//               <p className="text-green-700 text-sm md:text-base font-bold leading-relaxed">
//                 You are eligible for a full refund if cancelled before{" "}
//                 <span className="underline decoration-2 underline-offset-4">
//                   {booking?.cancellationDeadline}.
//                 </span>
//               </p>
//             </div>
//           </div>

//           {/* NEED HELP */}
//           <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2rem] p-8 shadow-sm">
//             <p className="text-sm text-gray-400 font-black tracking-widest mb-6">
//               Support & Files
//             </p>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <button className="flex flex-col items-center gap-2 p-6 bg-white/60 rounded-3xl hover:bg-white transition-all text-primary font-black text-xs uppercase border border-gray-200 cursor-pointer">
//                 <Link
//                   className="flex flex-col items-center gap-2"
//                   target="_blank"
//                   href={"/contact"}
//                 >
//                   <Headphones size={24} className="mb-1" /> Contact Support
//                 </Link>
//               </button>
//               <button className="p-6 bg-white/60 rounded-3xl hover:bg-white transition-all text-[#25D366] font-black text-xs uppercase border border-gray-200 cursor-pointer">
//                 <Link
//                   className="flex flex-col items-center gap-2 "
//                   target="_blank"
//                   href={"https://wa.me/8801934582230"}
//                 >
//                   <MessageSquare size={24} className="mb-1" /> WhatsApp Us
//                 </Link>
//               </button>
//               <button
//                 onClick={handleViewStripeReceipt}
//                 className="flex flex-col items-center gap-2 p-6 bg-white/60 rounded-3xl hover:bg-white transition-all text-gray-700 font-black text-xs uppercase border border-gray-200 cursor-pointer disabled:opacity-50"
//               >
//                 <FileText size={24} className="mb-1" /> View Receipt
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 4. CONFIRMATION MODAL */}
//       <Modal
//         isOpen={isCancelModalOpen}
//         onClose={() => setIsCancelModalOpen(false)}
//         title="Cancel Reservation"
//       >
//         <div className="text-center space-y-4">
//           <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
//             <AlertTriangle size={32} />
//           </div>
//           <p className="text-gray-900 font-bold text-lg">Are you sure?</p>
//           <p className="text-gray-500 text-sm leading-relaxed">
//             Do you really want to cancel your booking for{" "}
//             <span className="font-bold text-gray-900">
//               {booking?.listing?.title}
//             </span>
//             ? If you are within 48 hours of the start date, a refund will be
//             processed to your card.
//           </p>

//           <div className="flex gap-3 pt-6">
//             <button
//               onClick={() => setIsCancelModalOpen(false)}
//               className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-all cursor-pointer"
//             >
//               No, Keep it
//             </button>
//             <button
//               onClick={handleConfirmCancellation}
//               disabled={isLoading}
//               className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 shadow-lg shadow-red-100 transition-all disabled:opacity-50 cursor-pointer"
//             >
//               {isLoading ? "Cancelling..." : "Yes, Cancel"}
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default BookingDetailsClient;

"use client";

import {
  ArrowLeft,
  Copy,
  Star,
  MessageSquare,
  XCircle,
  Check,
  Headphones,
  FileText,
  Loader2,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { format } from "date-fns";
import { enUS, fr, ar } from "date-fns/locale";
import {
  useCancelBookingMutation,
  useGetBookingDetailsQuery,
} from "@/redux/features/bookingApis/bookingApis";
import Link from "next/link";
import Modal from "@/components/common/modals/Modal";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const BookingDetailsClient = ({ bookingId }: { bookingId: string }) => {
  const t = useTranslations("BookingDetails");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const dateLocale = locale === "fr" ? fr : locale === "ar" ? ar : enUS;

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useGetBookingDetailsQuery(bookingId);
  const booking = apiResponse?.data;

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelBooking, { isLoading: cancelLoading }] =
    useCancelBookingMutation();

  const isUpcoming = booking?.status === "UPCOMING";

  const handleConfirmCancellation = async () => {
    if (!isUpcoming) {
      return toast.error(t("toasts.cancelUpcoming"));
    }

    const toastId = toast.loading(t("toasts.processing"));

    try {
      const res = await cancelBooking(bookingId).unwrap();
      if (res?.success) {
        toast.success(t("toasts.cancelled"), { id: toastId });
        setIsCancelModalOpen(false);
      }
    } catch (error: any) {
      const errorMsg = error?.data?.message || t("toasts.error");
      toast.error(errorMsg, { id: toastId });
    }
  };

  const handleViewStripeReceipt = () => {
    if (booking?.stripeReceiptUrl) {
      window.open(booking.stripeReceiptUrl, "_blank");
    } else {
      toast.error(t("toasts.receiptError"));
    }
  };

  const getSpecs = () => {
    const isCar = booking?.listing?.category === "CAR";
    if (isCar) {
      return [
        {
          label: t("specs.vehicleType"),
          value: booking?.listing?.carDetails?.cartType,
        },
        { label: t("specs.model"), value: booking?.listing?.carDetails?.model },
        {
          label: t("specs.transmission"),
          value: booking?.listing?.carDetails?.transmission,
        },
        {
          label: t("specs.fuelType"),
          value: booking?.listing?.carDetails?.fuelType,
        },
        {
          label: t("specs.seats"),
          value: `${booking?.listing?.carDetails?.seats} ${t("specs.seats")}`,
        },
        {
          label: t("specs.mileage"),
          value: booking?.listing?.carDetails?.mileage,
        },
      ];
    } else {
      const baseSpecs = [
        { label: t("specs.propertyType"), value: "Apartment" },
        { label: t("specs.location"), value: booking?.listing?.city },
        {
          label: t("specs.guests"),
          value: `${booking?.guests || 1} ${t("specs.guests")}`,
        },
      ];

      const amenitySpecs =
        booking?.listing?.apartmentDetails?.amenities?.map(
          (amenity: string) => ({
            label: amenity,
            value: t("specs.included"),
          }),
        ) || [];

      return [...baseSpecs, ...amenitySpecs];
    }
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(booking?.bookingRef || "");
    toast.success(t("toasts.copied"));
  };

  if (isLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
          {t("loading")}
        </p>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div
        className="h-[70vh] flex flex-col items-center justify-center text-center px-4"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <h2 className="text-2xl font-bold text-gray-800">{t("notFound")}</h2>
        <button
          onClick={() => window.history.back()}
          className="mt-4 text-primary font-bold hover:underline"
        >
          {t("goBack")}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10" dir={isRtl ? "rtl" : "ltr"}>
      <button
        onClick={() => window.history.back()}
        className={`mb-8 hover:bg-gray-100 p-2 rounded-full transition cursor-pointer ${isRtl ? "rotate-180" : ""}`}
      >
        <ArrowLeft size={28} />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-8 shadow-sm">
            <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-gray-200">
              <Image
                src={booking?.listing?.images?.[0] || ""}
                alt="Listing"
                fill
                className="object-cover"
              />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {booking?.listing?.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4 flex items-center gap-1 font-medium">
              <MapPin size={14} className="text-gray-400" />{" "}
              {booking?.listing?.city}, {booking?.listing?.country}
            </p>

            <div className="flex items-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className={
                    s <= (booking?.listing?.avgRating || 0)
                      ? "fill-orange-400 text-orange-400"
                      : "text-gray-200"
                  }
                />
              ))}
              <span className="text-sm font-bold mx-1">
                {booking?.listing?.avgRating?.toFixed(1)}
              </span>
              <span className="text-sm text-gray-600">
                · {booking?.listing?.totalReviews} reviews
              </span>
            </div>

            <div className="flex flex-col items-center gap-4 py-6 border-y border-gray-200/60 mb-6">
              <span
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${booking?.status === "UPCOMING" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"}`}
              >
                {booking?.status}
              </span>
              <div className="text-center">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                  {t("refLabel")}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">
                    {booking?.bookingRef}
                  </span>
                  <button
                    onClick={handleCopyRef}
                    className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-500">
                  ${booking?.basePrice} × {booking?.totalDays}{" "}
                  {booking?.listing?.category === "CAR"
                    ? t("days")
                    : t("nights")}
                </span>
                <span className="text-gray-900 font-bold">
                  ${(booking?.basePrice * booking?.totalDays).toLocaleString()}
                </span>
              </div>
              {booking?.extraCharges?.map((item: any) => (
                <div
                  key={item.label}
                  className="flex justify-between text-sm text-gray-600"
                >
                  <span>{item?.label}</span>
                  <span>${item?.amount.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-base border-t border-gray-100 pt-3">
                <span className="font-bold text-gray-900">
                  {t("totalPaid")}
                </span>
                <span className="font-black text-gray-900 text-xl">
                  ${booking?.totalPrice?.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {isUpcoming && (
                <button
                  onClick={() => setIsCancelModalOpen(true)}
                  className="w-full border-2 border-red-100 text-red-500 py-4 rounded-2xl font-bold hover:bg-red-50 transition-colors cursor-pointer"
                >
                  {t("cancelBtn")}
                </button>
              )}
              <Link href="/contact">
                <button className="w-full bg-gray-200 text-gray-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors cursor-pointer">
                  <MessageSquare size={18} /> {t("contactHost")}
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              {t("bookingDetails")}
            </h1>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-tighter mt-1">
              {t("bookedOn")}{" "}
              {booking?.createdAt
                ? format(new Date(booking.createdAt), "MMMM dd, yyyy", {
                    locale: dateLocale,
                  })
                : "N/A"}
            </p>
          </div>

          <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2rem] p-8 shadow-sm">
            <p className="text-gray-400 font-black mb-6">{t("yourStay")}</p>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">
                  {t("checkIn")}
                </p>
                <p className="font-black text-gray-900">
                  {booking?.startDate
                    ? format(new Date(booking.startDate), "MMM dd, yyyy", {
                        locale: dateLocale,
                      })
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  {booking?.startDate
                    ? format(new Date(booking.startDate), "EEEE", {
                        locale: dateLocale,
                      })
                    : ""}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <XCircle size={20} className="text-gray-300" />
                <span className="text-sm font-black text-gray-900">
                  {booking?.totalDays}{" "}
                  {booking?.listing?.category === "CAR"
                    ? t("daysCount")
                    : t("nightsCount")}
                </span>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">
                  {t("checkOut")}
                </p>
                <p className="text-lg font-black text-gray-900">
                  {booking?.endDate
                    ? format(new Date(booking.endDate), "MMM dd, yyyy", {
                        locale: dateLocale,
                      })
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  {booking?.endDate
                    ? format(new Date(booking.endDate), "EEEE", {
                        locale: dateLocale,
                      })
                    : ""}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-8 shadow-sm">
            <p className="text-gray-400 font-black mb-6">
              {t("listingDetails")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getSpecs().map((spec, index) => (
                <div
                  key={index}
                  className="bg-white/60 border border-gray-200 p-5 rounded-2xl flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Check size={16} className="text-primary" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-gray-400 font-black tracking-tight">
                      {spec.label}
                    </p>
                    <p className="font-bold text-gray-800 capitalize">
                      {spec.value || t("specs.included")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2rem] p-8 shadow-sm">
            <span className="text-sm text-gray-400 font-black border border-gray-200 px-3 py-1 rounded-full mb-4 inline-block">
              {t("policy")}
            </span>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              {t("policyTitle")}
            </h3>
            <p className="text-gray-500 text-sm font-medium mb-6 leading-relaxed">
              {t("policyDesc")}
            </p>
            <div className="bg-green-50 border border-green-100 p-5 rounded-2xl flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Check size={14} strokeWidth={4} />
              </div>
              <p className="text-green-700 text-sm md:text-base font-bold leading-relaxed">
                {t("refundEligible")}{" "}
                <span className="underline decoration-2 underline-offset-4">
                  {booking?.cancellationDeadline}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2rem] p-8 shadow-sm">
            <p className="text-sm text-gray-400 font-black tracking-widest mb-6">
              {t("supportTitle")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-6 bg-white/60 rounded-3xl hover:bg-white transition-all text-primary font-black text-xs uppercase border border-gray-200 cursor-pointer">
                <Link
                  className="flex flex-col items-center gap-2"
                  href="/contact"
                >
                  <Headphones size={24} /> {t("contactSupport")}
                </Link>
              </button>
              <button className="p-6 bg-white/60 rounded-3xl hover:bg-white transition-all text-[#25D366] font-black text-xs uppercase border border-gray-200 cursor-pointer">
                <Link
                  className="flex flex-col items-center gap-2"
                  target="_blank"
                  href="https://wa.me/8801934582230"
                >
                  <MessageSquare size={24} /> {t("whatsapp")}
                </Link>
              </button>
              <button
                onClick={handleViewStripeReceipt}
                className="flex flex-col items-center gap-2 p-6 bg-white/60 rounded-3xl hover:bg-white transition-all text-gray-700 font-black text-xs uppercase border border-gray-200 cursor-pointer"
              >
                <FileText size={24} /> {t("viewReceipt")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title={t("modal.title")}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle size={32} />
          </div>
          <p className="text-gray-900 font-bold text-lg">
            {t("modal.confirm")}
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            {t.rich("modal.desc", {
              title: () => (
                <span className="font-bold text-gray-900">
                  {booking?.listing?.title}
                </span>
              ),
            })}
          </p>
          <div className="flex gap-3 pt-6">
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-all cursor-pointer"
            >
              {t("modal.keep")}
            </button>
            <button
              onClick={handleConfirmCancellation}
              disabled={cancelLoading}
              className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 shadow-lg shadow-red-100 transition-all disabled:opacity-50 cursor-pointer"
            >
              {cancelLoading ? t("modal.cancelling") : t("modal.cancel")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingDetailsClient;
