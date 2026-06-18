// "use client";

// import {
//   useDownloadBookingReceiptQuery,
//   useGetBookingDetailsQuery,
// } from "@/redux/features/bookingApis/bookingApis";
// import {
//   Download,
//   Calendar,
//   Loader2,
//   Home,
//   List,
//   Eye,
//   ExternalLink,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { format } from "date-fns";
// import { toast } from "sonner";
// import { useSelector } from "react-redux";
// import { selectCurrentToken } from "@/redux/features/auth/authSlice";
// import { useEffect } from "react";

// const SuccessClient = () => {
//   const params = useSearchParams();
//   const bookingId = params.get("bookingId") || "";

//   // Fetch data with Loading and Error states
//   const { data, isLoading, isError, refetch } = useGetBookingDetailsQuery(
//     bookingId,
//     {
//       skip: !bookingId,
//     },
//   );

//   const booking = data?.data || null;

//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     if (booking && !booking.receiptUrl) {
//       interval = setInterval(() => {
//         console.log("Polling for receipt URL...");
//         refetch();
//       }, 3000);
//     }

//     // Cleanup function to stop polling when component unmounts or URL is found
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [booking, refetch]);

//   const token = useSelector(selectCurrentToken);

//   const handleDownload = async () => {
//     if (!booking?.id) return;

//     const toastId = toast.loading("Generating your receipt PDF...");

//     try {
//       // Manually fetch the binary data with Authorization
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/bookings/${booking.id}/receipt`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `${token}`,
//           },
//         },
//       );

//       console.log(response, "my res");

//       if (!response.ok) throw new Error("Failed to download PDF");

//       // Convert response to a Blob (Binary Large Object)
//       const blob = await response.blob();

//       // Create a temporary URL for the blob
//       const url = window.URL.createObjectURL(blob);

//       // Create a hidden anchor element and trigger click
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `receipt-${booking.bookingRef}.pdf`);
//       document.body.appendChild(link);
//       link.click();

//       // Cleanup
//       link.parentNode?.removeChild(link);
//       window.URL.revokeObjectURL(url);

//       toast.success("Receipt downloaded successfully!", { id: toastId });
//     } catch (error) {
//       console.error("Download error:", error);
//       toast.error("Could not download receipt. Please try again.", {
//         id: toastId,
//       });
//     }
//   };

//   const handleViewStripeReceipt = () => {
//     if (booking?.stripeReceiptUrl) {
//       window.open(booking.stripeReceiptUrl, "_blank");
//     } else {
//       toast.error("Receipt not available yet.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-primary" size={48} />
//         <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
//           Securing your reservation...
//         </p>
//       </div>
//     );
//   }

//   if (isError || (!booking && !isLoading)) {
//     return (
//       <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4">
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">
//           Booking Not Found
//         </h2>
//         <p className="text-gray-500 mb-8">
//           We couldn't retrieve the details for this booking.
//         </p>
//         <Link
//           href="/"
//           className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
//         >
//           Return Home
//         </Link>
//       </div>
//     );
//   }

//   const formattedDates =
//     booking?.startDate && booking?.endDate
//       ? `${format(new Date(booking.startDate), "MMM dd, yyyy")} - ${format(new Date(booking.endDate), "MMM dd, yyyy")}`
//       : "Dates not available";

//   return (
//     <div className="max-w-3xl mx-auto px-4 animate-in fade-in duration-500">
//       <div className="flex flex-col items-center text-center mb-10">
//         <div className="relative w-32 h-32 mb-6">
//           <div className="bg-primary/10 w-full h-full rounded-full flex items-center justify-center">
//             <div className="w-16 h-24 bg-white border-4 border-gray-800 rounded-xl relative flex flex-col items-center pt-2">
//               <div className="w-8 h-1 bg-gray-800 rounded-full mb-2" />
//               <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
//                 ✓
//               </div>
//               <div className="absolute -bottom-4 w-12 h-16 bg-gray-100 border border-gray-300 rounded shadow-sm" />
//             </div>
//           </div>
//         </div>
//         <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
//           Booking Confirmed!
//         </h1>
//         <p className="text-gray-500 text-lg font-medium">
//           Your reservation has been successfully confirmed
//         </p>
//       </div>

//       <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm mb-6">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-8 mb-8">
//           <div>
//             <p className="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-1">
//               Booking Reference
//             </p>
//             <h2 className="text-xl md:text-2xl font-black text-gray-900 break-all">
//               {booking?.bookingRef}
//             </h2>
//           </div>
//           <button
//             onClick={handleViewStripeReceipt}
//             // diabled={!booking?.receiptUrl}
//             className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white border border-gray-200 px-5 py-2.5 rounded-2xl text-sm font-bold  transition-all shrink-0 cursor-pointer"
//           >
//             <ExternalLink size={18} />
//             View Receipt
//           </button>
//         </div>

//         {/* Listing Info Strip */}
//         <div className="flex flex-col md:flex-row gap-6 mb-10">
//           <div className="relative w-full md:w-48 h-32 rounded-[1.5rem] overflow-hidden bg-gray-100 shrink-0 border border-gray-50">
//             {booking?.listing?.images?.[0] && (
//               <Image
//                 src={booking.listing.images[0]}
//                 alt={booking.listing?.title || "Listing"}
//                 fill
//                 className="object-cover"
//               />
//             )}
//           </div>
//           <div className="flex flex-col justify-center space-y-2">
//             <h3 className="text-xl font-black text-gray-900">
//               {booking?.listing?.title}
//             </h3>
//             <p className="text-gray-500 font-bold text-sm uppercase tracking-tighter">
//               {booking?.listing?.city}, {booking?.listing?.country}
//             </p>
//             <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
//               <Calendar size={16} className="text-primary" />
//               <span>{formattedDates}</span>
//             </div>
//           </div>
//         </div>

//         {/* Financial Strip */}
//         <div className="bg-[#F9FAFB] border border-gray-100 rounded-3xl p-6 flex justify-between items-center">
//           <span className="text-gray-400 font-black uppercase text-xs tracking-widest">
//             Total Paid
//           </span>
//           <span className="text-2xl font-black text-gray-900">
//             ${booking?.totalPrice?.toFixed(2)}
//           </span>
//         </div>
//       </div>

//       <div className="bg-[#EBF2F7] border border-blue-100 rounded-[2rem] p-6 mb-10">
//         <h4 className="text-[#1E3A8A] font-black text-base mb-1 tracking-tight">
//           Confirmation email sent!
//         </h4>
//         <p className="text-[#1E3A8A]/70 text-sm font-medium leading-relaxed">
//           A confirmation email has been sent to{" "}
//           <span className="font-bold text-[#1E3A8A]">
//             {booking?.customerEmail}
//           </span>{" "}
//           with all the booking details and instructions.
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4">
//         <Link
//           href="/account"
//           className="flex-1 bg-primary text-white py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-primary/20"
//         >
//           <List size={20} />
//           View My Bookings
//         </Link>
//         <Link
//           href="/"
//           className="flex-1 bg-white border border-gray-200 text-gray-700 py-5 rounded-[2rem] font-black flex items-center justify-center hover:bg-gray-50 transition-all"
//         >
//           <Home size={20} />
//           Back to Home
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default SuccessClient;

"use client";

import { useGetBookingDetailsQuery } from "@/redux/features/bookingApis/bookingApis";
import { Calendar, Loader2, Home, List, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { enUS, fr, ar } from "date-fns/locale";
import { toast } from "sonner";
import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";

const SuccessClient = () => {
  const t = useTranslations("Success");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const dateLocale = locale === "fr" ? fr : locale === "ar" ? ar : enUS;

  const params = useSearchParams();
  const bookingId = params.get("bookingId") || "";

  const { data, isLoading, isError, refetch } = useGetBookingDetailsQuery(
    bookingId,
    {
      skip: !bookingId,
    },
  );

  const booking = data?.data || null;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (booking && !booking.receiptUrl) {
      interval = setInterval(() => refetch(), 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [booking, refetch]);

  const handleViewStripeReceipt = () => {
    if (booking?.stripeReceiptUrl)
      window.open(booking.stripeReceiptUrl, "_blank");
    else toast.error("Receipt not available yet.");
  };

  if (isLoading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
          {t("securing")}
        </p>
      </div>
    );
  }

  if (isError || (!booking && !isLoading)) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {t("notFound")}
        </h2>
        <p className="text-gray-500 mb-8">{t("notFoundDesc")}</p>
        <Link
          href="/"
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
        >
          {t("backHome")}
        </Link>
      </div>
    );
  }

  const formattedDates =
    booking?.startDate && booking?.endDate
      ? `${format(new Date(booking.startDate), "MMM dd, yyyy", { locale: dateLocale })} - ${format(new Date(booking.endDate), "MMM dd, yyyy", { locale: dateLocale })}`
      : "Dates not available";

  return (
    <div
      className="max-w-3xl mx-auto px-4 animate-in fade-in duration-500"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="flex flex-col items-center text-center mb-10">
        <div className="relative w-32 h-32 mb-6">
          <div className="bg-primary/10 w-full h-full rounded-full flex items-center justify-center">
            <div className="w-16 h-24 bg-white border-4 border-gray-800 rounded-xl relative flex flex-col items-center pt-2">
              <div className="w-8 h-1 bg-gray-800 rounded-full mb-2" />
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                ✓
              </div>
              <div className="absolute -bottom-4 w-12 h-16 bg-gray-100 border border-gray-300 rounded shadow-sm" />
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-gray-500 text-lg font-medium">{t("subtitle")}</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-8 mb-8">
          <div>
            <p className="text-gray-400 text-[11px] font-black uppercase tracking-widest mb-1">
              {t("refLabel")}
            </p>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 break-all">
              {booking?.bookingRef}
            </h2>
          </div>
          <button
            onClick={handleViewStripeReceipt}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white border border-gray-200 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all shrink-0 cursor-pointer"
          >
            <ExternalLink size={18} /> {t("viewReceipt")}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="relative w-full md:w-48 h-32 rounded-[1.5rem] overflow-hidden bg-gray-100 shrink-0 border border-gray-50">
            {booking?.listing?.images?.[0] && (
              <Image
                src={booking.listing.images[0]}
                alt={booking.listing?.title || ""}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex flex-col justify-center space-y-2">
            <h3 className="text-xl font-black text-gray-900">
              {booking?.listing?.title}
            </h3>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-tighter">
              {booking?.listing?.city}, {booking?.listing?.country}
            </p>
            <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
              <Calendar size={16} className="text-primary" />
              <span>{formattedDates}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F9FAFB] border border-gray-100 rounded-3xl p-6 flex justify-between items-center">
          <span className="text-gray-400 font-black uppercase text-xs tracking-widest">
            {t("totalPaid")}
          </span>
          <span className="text-2xl font-black text-gray-900">
            ${booking?.totalPrice?.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="bg-[#EBF2F7] border border-blue-100 rounded-[2rem] p-6 mb-10">
        <h4 className="text-[#1E3A8A] font-black text-base mb-1 tracking-tight">
          {t("emailSent")}
        </h4>
        <p className="text-[#1E3A8A]/70 text-sm font-medium leading-relaxed">
          {t.rich("emailDesc", {
            email: (chunks) => (
              <span className="font-bold text-[#1E3A8A]">
                {booking?.customerEmail}
              </span>
            ),
          })}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Link
          href="/account"
          className="flex-1 bg-primary text-white py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-primary/20"
        >
          <List size={20} /> {t("viewBookings")}
        </Link>
        <Link
          href="/"
          className="flex-1 bg-white border border-gray-200 text-gray-700 py-5 rounded-[2rem] font-black flex items-center justify-center hover:bg-gray-50 transition-all gap-3"
        >
          <Home size={20} /> {t("backHome")}
        </Link>
      </div>
    </div>
  );
};

export default SuccessClient;
