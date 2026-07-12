// "use client";

// import React, { useMemo, useState } from "react";
// import { ArrowLeft, CreditCard, Lock, ShieldCheck } from "lucide-react";
// import FormInput from "./FormInput";
// import { toast } from "sonner";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
// } from "@stripe/react-stripe-js";
// import { useGetSingleListingQuery } from "@/redux/features/listingApis/listingApis";
// import { useReserveAndPayBookingMutation } from "@/redux/features/bookingApis/bookingApis";
// import { differenceInCalendarDays, format, startOfDay } from "date-fns";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "@/redux/features/auth/authSlice";
// import Link from "next/link";

// type Step = "INFO" | "PAYMENT";

// const ConfirmationClient = ({ listingId }: { listingId: string }) => {
//   const { data: listingData } = useGetSingleListingQuery(listingId);
//   const listing = listingData?.data;
//   const router = useRouter();
//   const params = useSearchParams();
//   const startDate = params.get("startDate") || "";
//   const endDate = params.get("endDate") || "";
//   const guests = params.get("guests");

//   const user: any = useSelector(selectCurrentUser);

//   const [reserveAndPay, isLoading] = useReserveAndPayBookingMutation();

//   const displayStart = startDate
//     ? format(new Date(startDate.split("T")[0]), "MMMM d, yyyy")
//     : "N/A";

//   const displayEnd = endDate
//     ? format(new Date(endDate.split("T")[0]), "MMMM d, yyyy")
//     : "N/A";

//   const { totalDays, baseTotal, extraTotal, grandTotal } = useMemo(() => {
//     if (!startDate || !endDate)
//       return { totalDays: 0, baseTotal: 0, extraTotal: 0, grandTotal: 0 };

//     // startOfDay ensures we compare 00:00 to 00:00, ignoring the 23:59 offset
//     const start = startOfDay(new Date(startDate));
//     const end = startOfDay(new Date(endDate));

//     // July 5 to July 10 = 5 days difference
//     const diff = differenceInCalendarDays(end, start);

//     // For CAR: Inclusive (5 to 10 = 6 days).
//     // For APARTMENT: Nights (5 to 10 = 5 nights).
//     const days = diff + (listing?.category === "CAR" ? 1 : 0);

//     const base = (listing?.basePrice || 0) * days;
//     const extras =
//       listing?.extraCharges?.reduce(
//         (sum: number, item: any) => sum + (item.amount || 0),
//         0,
//       ) || 0;

//     return {
//       totalDays: days,
//       baseTotal: base,
//       extraTotal: extras,
//       grandTotal: base + extras,
//     };
//   }, [startDate, endDate, listing]);

//   const stripe = useStripe();
//   const elements = useElements();
//   const [cardHolder, setCardHolder] = useState("");

//   const elementOptions = {
//     style: {
//       base: {
//         fontSize: "16px",
//         color: "#111827", // text-gray-900
//         fontFamily: "inherit",
//         "::placeholder": { color: "#9CA3AF" }, // text-gray-400
//       },
//     },
//   };

//   // View State Logic
//   const [step, setStep] = useState<Step>("INFO");

//   // Form Data State
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     pickupAddress: "",
//     dropoffAddress: "",
//     specialRequests: "",
//   });

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Navigation Logic
//   const handleBack = () => {
//     if (step === "PAYMENT") {
//       setStep("INFO");
//     } else {
//       router.back();
//     }
//   };

//   const handleNextStep = () => {
//     // Basic validation before moving to payment
//     if (!formData.fullName || !formData.email || !formData.phone) {
//       return toast.error("Please fill in all required fields.");
//     }
//     console.log("Proceeding to Payment with Data:", formData);
//     setStep("PAYMENT");
//   };

//   // Final Submission Logic (One API Call)
//   const handleFinalSubmit = async () => {
//     if (!stripe || !elements) return;

//     const toastId = toast.loading("Processing your booking and payment...");

//     // Get reference to the card number element
//     const cardNumberElement = elements.getElement(CardNumberElement);

//     // Create Payment Method (This generates the ID you need)
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardNumberElement!,
//       billing_details: {
//         name: cardHolder,
//       },
//     });

//     if (error) {
//       toast.error(error.message, { id: toastId });
//       return;
//     }

//     // THE PAYMENT METHOD ID
//     const paymentMethodId = paymentMethod.id;

//     const paymentData = {
//       listingId,
//       startDate,
//       endDate,
//       paymentMethodId,
//       customerName: formData.fullName,
//       customerEmail: formData.email,
//       customerPhone: formData.phone,
//       pickupAddress: formData.pickupAddress,
//       dropoffAddress: formData.dropoffAddress,
//       specialRequests: formData.specialRequests,
//       guests: guests ? Number(guests) : null,
//     };

//     console.log(paymentData, "payment data");

//     try {
//       const res = await reserveAndPay(paymentData).unwrap();

//       console.log(res, "booking res");

//       if (res?.success) {
//         toast.success("Reservation and Payment Successfull.", { id: toastId });
//         router.push(`/booking/success?bookingId=${res?.data?.id}`);
//       } else {
//         toast.error("Something went wrong while booking and payment.", {
//           id: toastId,
//         });
//       }
//     } catch (error) {
//       toast.error(
//         "Payment and Booking failed. Please check your card details.",
//         {
//           id: toastId,
//         },
//       );
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Dynamic Back Button */}
//       <button
//         onClick={handleBack}
//         className="mb-8 hover:bg-gray-100 p-2 rounded-full transition"
//       >
//         <ArrowLeft size={28} />
//       </button>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//         <div className="lg:col-span-8 space-y-6">
//           {/* STEP 1: INFORMATION FORM */}
//           {step === "INFO" && (
//             <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2rem] p-8 animate-in fade-in slide-in-from-left-4 duration-300">
//               <h2 className="text-2xl font-bold text-gray-900 mb-8">
//                 Your information
//               </h2>
//               <form className="grid grid-cols-1 gap-6">
//                 <FormInput
//                   label="Full Name"
//                   name="fullName"
//                   placeholder="Enter your full name"
//                   required
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                 />
//                 <FormInput
//                   label="Email"
//                   name="email"
//                   type="email"
//                   placeholder="your@email.com"
//                   required
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//                 <FormInput
//                   label="Phone Number"
//                   name="phone"
//                   placeholder="+213 XXX XXX XXX"
//                   required
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                 />
//                 {listing?.category === "CAR" && (
//                   <div className="flex flex-col gap-6">
//                     <FormInput
//                       label="Pickup Address"
//                       name="pickupAddress"
//                       placeholder="Enter pickup location"
//                       required
//                       value={formData.pickupAddress}
//                       onChange={handleInputChange}
//                     />
//                     <FormInput
//                       label="Drop-off Address"
//                       name="dropoffAddress"
//                       placeholder="Enter drop-off location"
//                       required
//                       value={formData.dropoffAddress}
//                       onChange={handleInputChange}
//                     />
//                   </div>
//                 )}
//                 <FormInput
//                   label="Special Requests (Optional)"
//                   name="specialRequests"
//                   placeholder="Any special requirements or requests..."
//                   isTextArea
//                   value={formData.specialRequests}
//                   onChange={handleInputChange}
//                 />
//               </form>
//             </div>
//           )}

//           {/* STEP 2: STRIPE PAYMENT FORM */}
//           {step === "PAYMENT" && (
//             <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2rem] p-10 animate-in fade-in slide-in-from-right-4 duration-300">
//               <div className="flex items-center gap-3 mb-10">
//                 <CreditCard className="text-red-500" size={24} />
//                 <h2 className="text-xl font-bold text-gray-900">
//                   Payment details
//                 </h2>
//               </div>

//               {/* <div className="space-y-6">
//                 <div className="flex flex-col gap-2">
//                   <label className="text-sm font-bold text-gray-900">
//                     Card Number *
//                   </label>
//                   <input
//                     onChange={(e) => setCardNumber(e.target.value)}
//                     type="text"
//                     placeholder="1234 5678 9012 3456"
//                     className="w-full bg-[#E5E7EB]/50 border border-transparent focus:border-primary px-4 py-4 rounded-xl outline-none transition-all"
//                   />
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   <label className="text-sm font-bold text-gray-900">
//                     Cardholder Name *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Name on card"
//                     value={cardHolder}
//                     onChange={(e) => setCardHolder(e.target.value)}
//                     className="w-full bg-[#E5E7EB]/50 border border-transparent focus:border-primary px-4 py-4 rounded-xl outline-none transition-all"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="flex flex-col gap-2">
//                     <label className="text-sm font-bold text-gray-900">
//                       Expiry Date *
//                     </label>
//                     <input
//                       onChange={(e) => setExpiryDate(e.target.value)}
//                       type="text"
//                       placeholder="MM/YY"
//                       className="w-full bg-[#E5E7EB]/50 border border-transparent focus:border-primary px-4 py-4 rounded-xl outline-none transition-all"
//                     />
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <label className="text-sm font-bold text-gray-900">
//                       CVV *
//                     </label>
//                     <input
//                       onChange={(e) => setCvv(e.target.value)}
//                       type="text"
//                       placeholder="123"
//                       className="w-full bg-[#E5E7EB]/50 border border-transparent focus:border-primary px-4 py-4 rounded-xl outline-none transition-all"
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-10 bg-[#E5E7EB]/40 p-6 rounded-2xl flex gap-4">
//                   <ShieldCheck className="text-green-600 shrink-0" size={24} />
//                   <div className="space-y-1">
//                     <h4 className="font-bold text-gray-900 text-sm">
//                       Secure Payment
//                     </h4>
//                     <p className="text-xs text-gray-500 leading-relaxed">
//                       Your payment information is encrypted and secure. We
//                       partner with Stripe to ensure the highest level of
//                       security.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="text-center pt-8">
//                   <p className="text-sm text-gray-400 font-medium">
//                     Powered by{" "}
//                     <span className="text-indigo-600 font-bold">Stripe</span>
//                   </p>
//                 </div>
//               </div> */}
//               <div className="space-y-6">
//                 {/* Card Number */}
//                 <div className="flex flex-col gap-2">
//                   <label className="text-sm font-bold text-gray-900">
//                     Card Number *
//                   </label>
//                   <div className="w-full bg-[#E5E7EB]/50 border border-transparent px-4 py-4 rounded-xl">
//                     <CardNumberElement options={elementOptions} />
//                   </div>
//                 </div>

//                 {/* Cardholder Name (Standard Input is OK for Name) */}
//                 <div className="flex flex-col gap-2">
//                   <label className="text-sm font-bold text-gray-900">
//                     Cardholder Name *
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Name on card"
//                     className="w-full bg-[#E5E7EB]/50 border border-transparent focus:border-primary px-4 py-4 rounded-xl outline-none"
//                     onChange={(e) => setCardHolder(e.target.value)}
//                   />
//                 </div>

//                 {/* Expiry & CVV */}
//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="flex flex-col gap-2">
//                     <label className="text-sm font-bold text-gray-900">
//                       Expiry Date *
//                     </label>
//                     <div className="w-full bg-[#E5E7EB]/50 border border-transparent px-4 py-4 rounded-xl">
//                       <CardExpiryElement options={elementOptions} />
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <label className="text-sm font-bold text-gray-900">
//                       CVV *
//                     </label>
//                     <div className="w-full bg-[#E5E7EB]/50 border border-transparent px-4 py-4 rounded-xl">
//                       <CardCvcElement options={elementOptions} />
//                     </div>
//                   </div>
//                 </div>

//                 {/* <button
//                   onClick={handleFinalSubmit}
//                   className="w-full bg-primary py-4 rounded-2xl text-white font-bold"
//                 >
//                   Confirm & Pay
//                 </button> */}

//                 <div className="space-y-10 mt-10">
//                   {/* 1. Secure Payment Alert Box */}
//                   <div className="bg-[#E5E7EB]/40 p-6 rounded-2xl flex items-start gap-4 border border-transparent hover:border-gray-200 transition-all">
//                     {/* Icon - Using a high-contrast green */}
//                     <div className="text-green-600 shrink-0 mt-0.5">
//                       <ShieldCheck size={24} />
//                     </div>

//                     {/* Text Content - Avoiding extra small font */}
//                     <div className="space-y-1">
//                       <h4 className="font-bold text-gray-900 text-sm md:text-base">
//                         Secure Payment
//                       </h4>
//                       <p className="text-sm text-gray-500 leading-relaxed font-medium">
//                         Your payment information is encrypted and secure. We
//                         partner with Stripe to ensure the highest level of
//                         security for all transactions.
//                       </p>
//                     </div>
//                   </div>

//                   {/* 2. Powered by Stripe Text */}
//                   <div className="flex items-center justify-center gap-1.5 text-gray-400">
//                     <span className="text-sm font-medium">Powered by</span>
//                     {/* Using Stripe's official branding color #635BFF */}
//                     <span className="text-base font-black text-[#635BFF] tracking-tight">
//                       Stripe
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Cancellation Policy (Always shown at bottom) */}
//           {/* <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2rem] p-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-2">
//               Cancellation policy
//             </h3>
//             <p className="text-gray-500 leading-relaxed">
//               Free cancellation before May 7, 2026. After that, the booking is
//               non-refundable.
//             </p>
//           </div> */}
//         </div>

//         {/* RIGHT COLUMN: BOOKING SUMMARY (Shared across steps) */}
//         <div className="lg:col-span-4 sticky top-24">
//           <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2rem] p-8">
//             <h2 className="text-xl font-bold text-gray-900 mb-6">
//               Booking summary
//             </h2>

//             <div className="flex gap-4 mb-8">
//               <div
//                 style={{
//                   backgroundImage: `url(${listing?.images[0] || "/placeholder-image.jpg"})`,
//                 }}
//                 className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-300"
//               />
//               <div className="flex flex-col justify-center">
//                 <h4 className="font-bold text-gray-900 leading-tight">
//                   {listing?.title || "Listing Title"}
//                 </h4>
//                 <p className="text-sm text-gray-500">
//                   {listing?.city}, {listing?.country}
//                 </p>
//               </div>
//             </div>

//             <div className="space-y-4 mb-8 text-sm">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-400">
//                   {listing?.category === "APARTMENT" ? "Check-in" : "Pickup"}
//                 </span>
//                 <span className="text-gray-900 font-bold">{displayStart}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-400">
//                   {listing?.category === "APARTMENT" ? "Check-out" : "Drop-off"}
//                 </span>
//                 <span className="text-gray-900 font-bold">{displayEnd}</span>
//               </div>
//             </div>

//             <hr className="border-gray-200 mb-6" />

//             <div className="space-y-4 mb-8 text-sm">
//               <div className="flex justify-between items-center text-gray-500">
//                 <span>
//                   ${listing?.basePrice} × {totalDays} days
//                 </span>
//                 <span className="font-semibold text-gray-700">
//                   ${baseTotal.toFixed(2)}
//                 </span>
//               </div>

//               {listing?.extraCharges?.length > 0 &&
//                 listing?.extraCharges?.map((item: any) => {
//                   return (
//                     <div className="flex justify-between text-sm text-gray-600">
//                       <span>{item?.label}</span>
//                       <span>${item?.amount.toFixed(2)}</span>
//                     </div>
//                   );
//                 })}
//             </div>

//             <div className="flex justify-between items-center mb-8">
//               <span className="text-2xl font-bold text-gray-900">Total</span>
//               <span className="text-2xl font-extrabold text-gray-900">
//                 ${grandTotal.toFixed(2)}
//               </span>
//             </div>

//             {/* DYNAMIC BUTTON ACTION */}
//             {user ? (
//               <button
//                 onClick={step === "INFO" ? handleNextStep : handleFinalSubmit}
//                 className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity mb-4 cursor-pointer"
//               >
//                 {step === "INFO" ? "Confirm & Continue" : "Confirm & Pay"}
//               </button>
//             ) : (
//               <Link href={`/auth/signin`}>
//                 <button className="w-full bg-primary py-5 rounded-[2rem] text-white font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/20 cursor-pointer active:scale-95">
//                   Confirm & Continue
//                 </button>
//               </Link>
//             )}

//             <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
//               <Lock size={14} />
//               <span>Payments secured by Stripe</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationClient;

"use client";

import React, { useMemo, useState } from "react";
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from "lucide-react";
import FormInput from "./FormInput";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useGetSingleListingQuery } from "@/redux/features/listingApis/listingApis";
import { useReserveAndPayBookingMutation } from "@/redux/features/bookingApis/bookingApis";
import { differenceInCalendarDays, format, startOfDay } from "date-fns";
import { enUS, fr, ar } from "date-fns/locale";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

type Step = "INFO" | "PAYMENT";

const ConfirmationClient = ({ listingId }: { listingId: string }) => {
  const t = useTranslations("Confirmation");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const dateLocale = locale === "fr" ? fr : locale === "ar" ? ar : enUS;

  const { data: listingData } = useGetSingleListingQuery(listingId);
  const listing = listingData?.data;
  const router = useRouter();
  const params = useSearchParams();
  const startDate = params.get("startDate") || "";
  const endDate = params.get("endDate") || "";
  const guests = params.get("guests");

  const user: any = useSelector(selectCurrentUser);
  const [reserveAndPay, { isLoading }] = useReserveAndPayBookingMutation();

  const displayStart = startDate
    ? format(new Date(startDate.split("T")[0]), "MMMM d, yyyy", {
        locale: dateLocale,
      })
    : "N/A";

  const displayEnd = endDate
    ? format(new Date(endDate.split("T")[0]), "MMMM d, yyyy", {
        locale: dateLocale,
      })
    : "N/A";

  const { totalDays, baseTotal, grandTotal } = useMemo(() => {
    if (!startDate || !endDate)
      return { totalDays: 0, baseTotal: 0, extraTotal: 0, grandTotal: 0 };

    const start = startOfDay(new Date(startDate));
    const end = startOfDay(new Date(endDate));
    const diff = differenceInCalendarDays(end, start);
    const days = diff + (listing?.category === "CAR" ? 1 : 0);

    const base = (listing?.basePrice || 0) * days;
    const extras =
      listing?.extraCharges?.reduce(
        (sum: number, item: any) => sum + (item.amount || 0),
        0,
      ) || 0;

    return {
      totalDays: days,
      baseTotal: base,
      extraTotal: extras,
      grandTotal: base + extras,
    };
  }, [startDate, endDate, listing]);

  const stripe = useStripe();
  const elements = useElements();
  const [cardHolder, setCardHolder] = useState("");
  const [step, setStep] = useState<Step>("INFO");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    pickupAddress: "",
    dropoffAddress: "",
    specialRequests: "",
  });

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#111827",
        fontFamily: "inherit",
        "::placeholder": { color: "#9CA3AF" },
      },
    },
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    if (step === "PAYMENT") setStep("INFO");
    else router.back();
  };

  const handleNextStep = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      return toast.error(t("toasts.required"));
    }
    setStep("PAYMENT");
  };

  const handleFinalSubmit = async () => {
    if (!stripe || !elements) return;
    const toastId = toast.loading(t("toasts.processing"));
    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement!,
      billing_details: { name: cardHolder },
    });

    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }

    const paymentData = {
      listingId,
      startDate,
      endDate,
      paymentMethodId: paymentMethod.id,
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      pickupAddress: formData.pickupAddress,
      dropoffAddress: formData.dropoffAddress,
      specialRequests: formData.specialRequests,
      guests: guests ? Number(guests) : null,
    };

    try {
      const res = await reserveAndPay(paymentData).unwrap();
      console.log(res, 'final res');
      if (res?.success) {
        toast.success(t("toasts.success"), { id: toastId });
        router.push(`/booking/success?bookingId=${res?.data?.id}`);
      }
    } catch (error) {
      console.log(error, 'final err')
      toast.error(t("toasts.error"), { id: toastId });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" dir={isRtl ? "rtl" : "ltr"}>
      <button
        onClick={handleBack}
        className={`mb-8 hover:bg-gray-100 p-2 rounded-full transition ${isRtl ? "rotate-180" : ""}`}
      >
        <ArrowLeft size={28} />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          {step === "INFO" && (
            <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2rem] p-8 animate-in fade-in slide-in-from-left-4 duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {t("infoTitle")}
              </h2>
              <form className="grid grid-cols-1 gap-6">
                <FormInput
                  label={t("fields.name")}
                  name="fullName"
                  placeholder={t("placeholders.name")}
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                <FormInput
                  label={t("fields.email")}
                  name="email"
                  type="email"
                  placeholder={t("placeholders.email")}
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <FormInput
                  label={t("fields.phone")}
                  name="phone"
                  placeholder={t("placeholders.phone")}
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {listing?.category === "CAR" && (
                  <>
                    <FormInput
                      label={t("fields.pickup")}
                      name="pickupAddress"
                      placeholder={t("placeholders.pickup")}
                      required
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                    />
                    <FormInput
                      label={t("fields.dropoff")}
                      name="dropoffAddress"
                      placeholder={t("placeholders.dropoff")}
                      required
                      value={formData.dropoffAddress}
                      onChange={handleInputChange}
                    />
                  </>
                )}
                <FormInput
                  label={t("fields.requests")}
                  name="specialRequests"
                  placeholder={t("placeholders.requests")}
                  isTextArea
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                />
              </form>
            </div>
          )}

          {step === "PAYMENT" && (
            <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2rem] p-10 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-3 mb-10">
                <CreditCard className="text-red-500" size={24} />
                <h2 className="text-xl font-bold text-gray-900">
                  {t("paymentTitle")}
                </h2>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-900">
                    {t("fields.cardNumber")} *
                  </label>
                  <div className="w-full bg-[#E5E7EB]/50 border border-transparent px-4 py-4 rounded-xl">
                    <CardNumberElement options={elementOptions} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-900">
                    {t("fields.cardName")} *
                  </label>
                  <input
                    type="text"
                    placeholder={t("placeholders.cardName")}
                    className="w-full bg-[#E5E7EB]/50 border border-transparent focus:border-primary px-4 py-4 rounded-xl outline-none"
                    onChange={(e) => setCardHolder(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-900">
                      {t("fields.expiry")} *
                    </label>
                    <div className="w-full bg-[#E5E7EB]/50 border border-transparent px-4 py-4 rounded-xl">
                      <CardExpiryElement options={elementOptions} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-900">
                      {t("fields.cvv")} *
                    </label>
                    <div className="w-full bg-[#E5E7EB]/50 border border-transparent px-4 py-4 rounded-xl">
                      <CardCvcElement options={elementOptions} />
                    </div>
                  </div>
                </div>
                <div className="space-y-10 mt-10">
                  <div className="bg-[#E5E7EB]/40 p-6 rounded-2xl flex items-start gap-4 border border-transparent hover:border-gray-200 transition-all">
                    <div className="text-green-600 shrink-0 mt-0.5">
                      <ShieldCheck size={24} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-900 text-sm md:text-base">
                        {t("labels.secureTitle")}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed font-medium">
                        {t("labels.secureDesc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-gray-400">
                    <span className="text-sm font-medium">Powered by</span>
                    <span className="text-base font-black text-[#635BFF] tracking-tight">
                      Stripe
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2rem] p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {t("summaryTitle")}
            </h2>
            <div className="flex gap-4 mb-8">
              <div
                style={{
                  backgroundImage: `url(${listing?.images[0] || "/placeholder-image.jpg"})`,
                }}
                className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-300 bg-cover bg-center"
              />
              <div className="flex flex-col justify-center">
                <h4 className="font-bold text-gray-900 leading-tight">
                  {listing?.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {listing?.city}, {listing?.country}
                </p>
              </div>
            </div>
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">
                  {listing?.category === "APARTMENT"
                    ? t("labels.checkin")
                    : t("labels.pickup")}
                </span>
                <span className="text-gray-900 font-bold">{displayStart}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">
                  {listing?.category === "APARTMENT"
                    ? t("labels.checkout")
                    : t("labels.dropoff")}
                </span>
                <span className="text-gray-900 font-bold">{displayEnd}</span>
              </div>
            </div>
            <hr className="border-gray-200 mb-6" />
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between items-center text-gray-500">
                <span>
                  ${listing?.basePrice} × {totalDays} {t("labels.days")}
                </span>
                <span className="font-semibold text-gray-700">
                  ${baseTotal.toFixed(2)}
                </span>
              </div>
              {listing?.extraCharges?.map((item: any) => (
                <div
                  key={item.label}
                  className="flex justify-between text-sm text-gray-600"
                >
                  <span>{item?.label}</span>
                  <span>${item?.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold text-gray-900">
                {t("labels.total")}
              </span>
              <span className="text-2xl font-extrabold text-gray-900">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
            {user ? (
              <button
                onClick={step === "INFO" ? handleNextStep : handleFinalSubmit}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity mb-4 cursor-pointer"
              >
                {step === "INFO" ? t("buttons.continue") : t("buttons.pay")}
              </button>
            ) : (
              <Link href="/auth/signin" className="w-full">
                <button className="w-full bg-primary py-5 rounded-[2rem] text-white font-black text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/20 cursor-pointer active:scale-95">
                  {t("buttons.continue")}
                </button>
              </Link>
            )}
            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
              <Lock size={14} />
              <span>{t("labels.stripeSecure")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationClient;
