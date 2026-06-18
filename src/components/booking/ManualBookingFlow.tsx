// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Search,
//   Check,
//   Calendar,
//   CheckCircle2,
//   Plus,
//   Trash2,
//   Loader2,
//   MapPin,
//   Send,
//   User,
// } from "lucide-react";
// import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";
// import { format } from "date-fns";
// import { toast } from "sonner";

// // RTK Query Imports
// import { useGetAllListingsQuery } from "@/redux/features/listingApis/listingApis";
// import FormInput from "@/components/booking/FormInput";
// import {
//   useCreateManualBookingMutation,
//   useGetManualPreviewMutation,
// } from "@/redux/features/admin/bookings.api";
// import { useGetAllUsersQuery } from "@/redux/features/admin/usersApi";
// import Image from "next/image";
// import Link from "next/link";

// type Step = 1 | 2 | 3 | 4 | 5;

// const ManualBookingFlow = ({ onBack }: { onBack: () => void }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const searchTerm = searchParams.get("searchTerm") || "";

//   // --- 1. STATE MANAGEMENT ---
//   const [createdBooking, setCreatedBooking] = useState<any>();
//   const [currentStep, setCurrentStep] = useState<Step>(1);
//   const [selectedListing, setSelectedListing] = useState<any>(null);
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const [previewData, setPreviewData] = useState<any>(null);
//   const [sendEmail, setSendEmail] = useState(true);

//   const [bookingData, setBookingDetails] = useState({
//     pickupDate: "",
//     returnDate: "",
//     basePrice: 0,
//     amount: 0,
//     commissionRate: 10,
//     paymentStatus: "PAID",
//     paymentMethod: "CASH",
//     source: "phone_call",
//     specialRequests: "",
//   });

//   const [extraCharges, setExtraCharges] = useState<
//     { label: string; amount: number }[]
//   >([]);

//   // --- 2. API HOOKS ---
//   const { data: listingsData, isFetching: isListingLoading } =
//     useGetAllListingsQuery({ searchTerm }, { skip: currentStep !== 1 });
//   const { data: usersData, isFetching: isUserLoading } = useGetAllUsersQuery(
//     { searchTerm },
//     { skip: currentStep !== 2 },
//   );
//   const [getPreview, { isLoading: isPreviewLoading }] =
//     useGetManualPreviewMutation();
//   const [createBooking, { isLoading: isCreating }] =
//     useCreateManualBookingMutation();

//   // --- 3. HANDLERS ---
//   const handleSearch = useDebouncedCallback((term: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (term) params.set("searchTerm", term);
//     else params.delete("searchTerm");
//     router.replace(`${pathname}?${params.toString()}`, { scroll: false });
//   }, 500);

//   const handleNextToPreview = async () => {
//     const toastId = toast.loading("Calculating summary...");
//     try {
//       const payload = {
//         userId: selectedUser?.id,
//         listingId: selectedListing?.id,
//         startDate: new Date(bookingData.pickupDate).toISOString(),
//         endDate: new Date(bookingData.returnDate).toISOString(),
//         basePrice: Number(bookingData.basePrice),
//         extraCharges: extraCharges
//           .filter((c) => c.label)
//           .map((c) => ({ label: c.label, amount: Number(c.amount) })),
//         commissionRate: Number(bookingData.commissionRate),
//       };

//       const res = await getPreview(payload).unwrap();
//       setPreviewData(res.data);
//       setCurrentStep(4);
//       toast.dismiss(toastId);
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Invalid dates or price overrides.", {
//         id: toastId,
//       });
//     }
//   };

//   const handleFinalConfirm = async () => {
//     const toastId = toast.loading("Saving booking to database...");
//     try {
//       const payload = {
//         userId: selectedUser?.id,
//         listingId: selectedListing?.id,
//         startDate: new Date(bookingData.pickupDate).toISOString(),
//         endDate: new Date(bookingData.returnDate).toISOString(),
//         basePrice: Number(bookingData.basePrice),
//         totalPrice: previewData?.financials?.grandTotal,
//         extraCharges: extraCharges
//           .filter((c) => c.label)
//           .map((c) => ({ label: c.label, amount: Number(c.amount) })),
//         paymentStatus: bookingData.paymentStatus,
//         paymentMethod: bookingData.paymentMethod,
//         bookingSource: bookingData.source,
//         specialRequests: bookingData.specialRequests,
//         sendEmail: sendEmail,
//       };

//       const res = await createBooking(payload).unwrap();
//       if (res.success) {
//         toast.success("Manual booking confirmed!", { id: toastId });
//         setCreatedBooking(res?.data);
//         setCurrentStep(5);
//       }
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to create booking", {
//         id: toastId,
//       });
//     }
//   };

//   // --- 4. STEPPER UI ---
//   const Stepper = () => (
//     <div className="bg-white border border-gray-100 rounded-[2rem] p-8 flex items-center justify-between mb-10 shadow-sm">
//       {[
//         "Select Listing",
//         "Select User",
//         "Booking Details",
//         "Review & Confirm",
//       ].map((label, index) => {
//         const num = index + 1;
//         const active = currentStep === num;
//         const done = currentStep > num;
//         return (
//           <React.Fragment key={label}>
//             <div
//               onClick={() => done && setCurrentStep(num as Step)}
//               className={`flex flex-col items-center gap-2 ${done ? "cursor-pointer" : ""}`}
//             >
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${active ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" : done ? "bg-primary text-white" : "bg-gray-100 text-gray-400"}`}
//               >
//                 {done ? <Check size={18} strokeWidth={3} /> : num}
//               </div>
//               <span
//                 className={`text-[10px] font-black uppercase tracking-widest ${active ? "text-primary" : "text-gray-400"}`}
//               >
//                 {label}
//               </span>
//             </div>
//             {index !== 3 && <div className="flex-1 h-px bg-gray-100 mx-4" />}
//           </React.Fragment>
//         );
//       })}
//     </div>
//   );

//   return (
//     <div className="py-4 px-2">
//       {currentStep < 5 && (
//         <>
//           <button
//             onClick={onBack}
//             className="flex items-center gap-2 text-gray-400 font-bold mb-4 hover:text-primary transition-all cursor-pointer"
//           >
//             <ArrowLeft size={18} /> Back to Dashboard
//           </button>
//           <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-3">
//             Manual Booking
//           </h1>
//           <Stepper />
//         </>
//       )}

//       {/* STEP 1: SELECT LISTING */}
//       {currentStep === 1 && (
//         <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4">
//           <div className="relative">
//             <Search
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               size={20}
//             />
//             <input
//               onChange={(e) => handleSearch(e.target.value)}
//               className="w-full bg-gray-50 border-none px-12 py-5 rounded-2xl outline-none font-bold text-gray-700 focus:ring-2 ring-primary/20"
//               placeholder="Search listing by name, location or ID..."
//             />
//           </div>
//           <div className="grid grid-cols-1 gap-3">
//             {isListingLoading ? (
//               <div className="py-20 flex justify-center">
//                 <Loader2 className="animate-spin text-primary" />
//               </div>
//             ) : (
//               listingsData?.data?.slice(0, 5).map((item: any) => (
//                 <div
//                   key={item.id}
//                   onClick={() => {
//                     setSelectedListing(item);
//                     setBookingDetails({
//                       ...bookingData,
//                       basePrice: item.basePrice,
//                     });
//                   }}
//                   className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${selectedListing?.id === item.id ? "border-primary bg-primary/5" : "border-transparent bg-gray-50 hover:border-primary/20"}`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={item?.images[0]}
//                       className="w-16 h-12 rounded-xl object-cover"
//                       alt=""
//                     />
//                     <div>
//                       <p className="font-bold text-gray-900">{item.title}</p>
//                       <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
//                         {item.category} · {item.location}
//                       </p>
//                     </div>
//                   </div>
//                   {selectedListing?.id === item.id && (
//                     <CheckCircle2 className="text-primary" />
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//           <div className="flex justify-end">
//             <button
//               disabled={!selectedListing}
//               onClick={() => setCurrentStep(2)}
//               className="bg-primary text-white px-12 py-4 rounded-2xl font-black shadow-lg shadow-primary/20 disabled:opacity-30 cursor-pointer"
//             >
//               Next: Select User
//             </button>
//           </div>
//         </div>
//       )}

//       {/* STEP 2: SELECT USER */}
//       {currentStep === 2 && (
//         <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4">
//           <div className="relative">
//             <Search
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               size={20}
//             />
//             <input
//               onChange={(e) => handleSearch(e.target.value)}
//               className="w-full bg-gray-50 border-none px-12 py-5 rounded-2xl outline-none font-bold text-gray-700 focus:ring-2 ring-primary/20"
//               placeholder="Search user by name or email..."
//             />
//           </div>
//           <div className="grid grid-cols-1 gap-3">
//             {isUserLoading ? (
//               <div className="py-20 flex justify-center">
//                 <Loader2 className="animate-spin text-primary" />
//               </div>
//             ) : (
//               usersData?.data?.slice(0, 5).map((user: any) => (
//                 <div
//                   key={user.id}
//                   onClick={() => setSelectedUser(user)}
//                   className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${selectedUser?.id === user.id ? "border-primary bg-primary/5" : "border-transparent bg-gray-50 hover:border-primary/20"}`}
//                 >
//                   <div className="flex items-center gap-4">
//                     {user?.image ? (
//                       <Image
//                         className="rounded-full w-14 h-14"
//                         src={user?.image}
//                         width={100}
//                         height={100}
//                         alt="User Profile"
//                       />
//                     ) : (
//                       <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold">
//                         <User />
//                       </div>
//                     )}
//                     <div>
//                       <p className="font-bold text-gray-900">{user.name}</p>
//                       <p className="text-[10px] text-gray-400 font-bold uppercase">
//                         {user.email}
//                       </p>
//                     </div>
//                   </div>
//                   {selectedUser?.id === user.id && (
//                     <CheckCircle2 className="text-primary" />
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//           <div className="flex justify-between">
//             <button
//               onClick={() => setCurrentStep(1)}
//               className="px-10 py-4 bg-gray-100 rounded-2xl font-bold text-gray-500"
//             >
//               Back
//             </button>
//             <button
//               disabled={!selectedUser}
//               onClick={() => setCurrentStep(3)}
//               className="bg-primary text-white px-12 py-4 rounded-2xl font-black shadow-lg shadow-primary/20 disabled:opacity-30 cursor-pointer"
//             >
//               Next: Booking Details
//             </button>
//           </div>
//         </div>
//       )}

//       {/* STEP 3: BOOKING DETAILS */}
//       {currentStep === 3 && (
//         <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm space-y-10 animate-in fade-in slide-in-from-right-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="space-y-4">
//               <h3 className="font-black text-gray-900 uppercase tracking-widest text-[11px]">
//                 Dates & Duration
//               </h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <FormInput
//                   label="Start Date"
//                   type="date"
//                   value={bookingData.pickupDate}
//                   onChange={(e) =>
//                     setBookingDetails({
//                       ...bookingData,
//                       pickupDate: e.target.value,
//                     })
//                   }
//                   name="start"
//                   placeholder=""
//                 />
//                 <FormInput
//                   label="End Date"
//                   type="date"
//                   value={bookingData.returnDate}
//                   onChange={(e) =>
//                     setBookingDetails({
//                       ...bookingData,
//                       returnDate: e.target.value,
//                     })
//                   }
//                   name="end"
//                   placeholder=""
//                 />
//               </div>
//             </div>
//             <div className="space-y-4">
//               <h3 className="font-black text-gray-900 uppercase tracking-widest text-[11px]">
//                 Pricing Overrides
//               </h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <FormInput
//                   label="Base Price"
//                   type="number"
//                   value={bookingData.basePrice.toString()}
//                   onChange={(e) =>
//                     setBookingDetails({
//                       ...bookingData,
//                       basePrice: Number(e.target.value),
//                     })
//                   }
//                   name="price"
//                   placeholder="100"
//                 />
//                 <FormInput
//                   label="Commission %"
//                   type="number"
//                   value={bookingData.commissionRate.toString()}
//                   onChange={(e) =>
//                     setBookingDetails({
//                       ...bookingData,
//                       commissionRate: Number(e.target.value),
//                     })
//                   }
//                   name="comm"
//                   placeholder="10"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4 border-t border-gray-50 pt-8">
//             <div className="flex justify-between items-center">
//               <h3 className="font-black text-gray-900 uppercase tracking-widest text-[11px]">
//                 Additional Fees
//               </h3>
//               <button
//                 onClick={() =>
//                   setExtraCharges([...extraCharges, { label: "", amount: 0 }])
//                 }
//                 className="text-primary font-black text-xs flex items-center gap-1 hover:underline"
//               >
//                 <Plus size={14} /> Add Fee
//               </button>
//             </div>
//             {extraCharges.map((fee, i) => (
//               <div
//                 key={i}
//                 className="flex gap-4 items-end animate-in slide-in-from-left-2"
//               >
//                 <div className="flex-[2]">
//                   <FormInput
//                     label="Label"
//                     value={fee.label}
//                     onChange={(e) => {
//                       const n = [...extraCharges];
//                       n[i].label = e.target.value;
//                       setExtraCharges(n);
//                     }}
//                     placeholder="Cleaning"
//                     name="l"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <FormInput
//                     label="Amount"
//                     type="number"
//                     value={fee.amount.toString()}
//                     onChange={(e) => {
//                       const n = [...extraCharges];
//                       n[i].amount = Number(e.target.value);
//                       setExtraCharges(n);
//                     }}
//                     placeholder="20"
//                     name="a"
//                   />
//                 </div>
//                 <button
//                   onClick={() =>
//                     setExtraCharges(extraCharges.filter((_, idx) => idx !== i))
//                   }
//                   className="p-4 bg-red-50 text-red-500 rounded-xl mb-1 hover:bg-red-100 transition-colors"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-50 pt-8">
//             <div className="flex flex-col gap-2">
//               <label className="text-[11px] font-black text-gray-400 uppercase">
//                 Payment Status
//               </label>
//               <select
//                 value={bookingData.paymentStatus}
//                 onChange={(e) =>
//                   setBookingDetails({
//                     ...bookingData,
//                     paymentStatus: e.target.value,
//                   })
//                 }
//                 className="w-full bg-gray-50 border-none p-4 rounded-xl font-bold text-gray-700 h-[58px] outline-none focus:ring-2 ring-primary/20"
//               >
//                 <option value="PAID">PAID</option>
//                 <option value="PENDING">PENDING</option>
//               </select>
//             </div>
//             <div className="flex flex-col gap-2">
//               <label className="text-[11px] font-black text-gray-400 uppercase">
//                 Payment Method
//               </label>
//               <select
//                 value={bookingData.paymentMethod}
//                 onChange={(e) =>
//                   setBookingDetails({
//                     ...bookingData,
//                     paymentMethod: e.target.value,
//                   })
//                 }
//                 className="w-full bg-gray-50 border-none p-4 rounded-xl font-bold text-gray-700 h-[58px] outline-none"
//               >
//                 <option value="CASH">CASH</option>
//                 <option value="CARD">CARD</option>
//               </select>
//             </div>
//             <div className="flex flex-col gap-2">
//               <label className="text-[11px] font-black text-gray-400 uppercase">
//                 Booking Source
//               </label>
//               <select
//                 value={bookingData.source}
//                 onChange={(e) =>
//                   setBookingDetails({ ...bookingData, source: e.target.value })
//                 }
//                 className="w-full bg-gray-50 border-none p-4 rounded-xl font-bold text-gray-700 h-[58px] outline-none"
//               >
//                 <option value="phone_call">Phone Call</option>
//                 <option value="whatsapp">WhatsApp</option>
//                 <option value="walk_in">Walk-in</option>
//                 <option value="travel_agency">Travel Agency</option>
//                 <option value="email">Email</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex flex-col gap-2">
//             <label className="text-[11px] font-black text-gray-400 uppercase">
//               Special Requests / Notes
//             </label>
//             <textarea
//               value={bookingData.specialRequests}
//               onChange={(e) =>
//                 setBookingDetails({
//                   ...bookingData,
//                   specialRequests: e.target.value,
//                 })
//               }
//               placeholder="Customer requested specific car color or early pickup..."
//               className="w-full bg-gray-50 rounded-2xl p-5 border-none outline-none focus:ring-2 ring-primary/20 min-h-[120px] font-medium"
//             />
//           </div>

//           <div className="flex justify-between pt-4">
//             <button
//               onClick={() => setCurrentStep(2)}
//               className="px-10 py-4 bg-gray-100 rounded-2xl font-bold text-gray-500"
//             >
//               Back
//             </button>
//             <button
//               disabled={!bookingData.pickupDate || !bookingData.returnDate}
//               onClick={handleNextToPreview}
//               className="bg-primary text-white px-12 py-4 rounded-2xl font-black shadow-lg shadow-primary/20 disabled:opacity-30 cursor-pointer"
//             >
//               Preview Summary
//             </button>
//           </div>
//         </div>
//       )}

//       {/* STEP 4: REVIEW & CONFIRM */}
//       {currentStep === 4 && (
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in zoom-in-95">
//           <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm space-y-8">
//             <h2 className="text-2xl font-black text-gray-900">
//               Final Confirmation
//             </h2>
//             <div className="border border-gray-50 rounded-[2rem] p-6 flex gap-6 bg-gray-50/30">
//               <img
//                 src={previewData?.listing?.image}
//                 className="w-40 h-28 bg-gray-200 rounded-2xl object-cover shadow-sm"
//                 alt=""
//               />
//               <div className="flex flex-col justify-center">
//                 <h3 className="text-xl font-black text-gray-900 leading-tight">
//                   {previewData?.listing?.title}
//                 </h3>
//                 <p className="text-sm text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
//                   <MapPin size={14} /> {previewData?.listing?.city}
//                 </p>
//                 <div className="flex items-center gap-2 mt-4 text-sm font-black text-primary bg-white border border-primary/10 w-fit px-4 py-1.5 rounded-xl shadow-sm">
//                   <Calendar size={16} />{" "}
//                   {format(new Date(bookingData.pickupDate), "MMM dd")} →{" "}
//                   {format(new Date(bookingData.returnDate), "MMM dd, yyyy")}
//                   <span className="ml-3 border-l border-primary/20 pl-3">
//                     {previewData?.financials?.totalDays} days
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <SummaryMiniCard
//                 label="Payment"
//                 val={bookingData.paymentMethod}
//               />
//               <SummaryMiniCard
//                 label="Status"
//                 val={bookingData.paymentStatus}
//                 color={
//                   bookingData.paymentStatus === "PAID"
//                     ? "text-green-600"
//                     : "text-orange-500"
//                 }
//               />
//               <SummaryMiniCard
//                 label="Source"
//                 val={bookingData.source.replace("_", " ")}
//               />
//               <SummaryMiniCard label="User" val={previewData?.user?.fullName} />
//             </div>

//             <label className="flex items-center gap-4 p-6 bg-primary/5 rounded-[2rem] border border-primary/10 cursor-pointer hover:bg-primary/10 transition-all">
//               <input
//                 type="checkbox"
//                 className="w-6 h-6 accent-primary rounded-lg"
//                 checked={sendEmail}
//                 onChange={(e) => setSendEmail(e.target.checked)}
//               />
//               <div>
//                 <p className="text-sm font-black text-gray-900">
//                   Send automated confirmation email
//                 </p>
//                 <p className="text-xs text-gray-500 font-medium">
//                   A formal receipt and booking summary will be sent to{" "}
//                   {selectedUser?.email}
//                 </p>
//               </div>
//             </label>

//             <button
//               onClick={handleFinalConfirm}
//               disabled={isCreating}
//               className="w-full bg-primary text-white py-6 rounded-[2rem] font-black text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
//             >
//               {isCreating ? (
//                 <Loader2 className="animate-spin" />
//               ) : (
//                 <Send size={22} />
//               )}{" "}
//               {isCreating
//                 ? "Creating Booking..."
//                 : "Confirm & Finalize Booking"}
//             </button>
//             <button
//               onClick={() => setCurrentStep(3)}
//               className="w-full text-gray-400 font-bold text-sm hover:underline"
//             >
//               Edit Details
//             </button>
//           </div>

//           <div className="lg:col-span-4 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm h-fit space-y-6">
//             <h3 className="font-black text-gray-900 uppercase text-[10px] tracking-[0.2em] opacity-50">
//               Financial Summary
//             </h3>
//             <div className="space-y-4">
//               <div className="flex justify-between text-sm font-bold text-gray-500">
//                 <span>
//                   Base Price (${previewData?.financials?.basePrice} ×{" "}
//                   {previewData?.financials?.totalDays})
//                 </span>
//                 <span className="text-gray-900">
//                   ${previewData?.financials?.baseTotal?.toFixed(2)}
//                 </span>
//               </div>
//               {extraCharges.map((fee, i) => (
//                 <div
//                   key={i}
//                   className="flex justify-between text-sm font-bold text-gray-500"
//                 >
//                   <span>{fee.label}:</span>
//                   <span className="text-gray-900">
//                     ${Number(fee.amount).toFixed(2)}
//                   </span>
//                 </div>
//               ))}
//               <div className="flex justify-between text-lg pt-4 border-t border-gray-50">
//                 <span className="font-black text-gray-900">Grand Total:</span>
//                 <span className="font-black text-primary text-2xl">
//                   ${previewData?.financials?.grandTotal?.toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest pt-2">
//                 <span>
//                   Admin Comm. ({previewData?.financials?.commissionRate}%):
//                 </span>
//                 <span>
//                   -${previewData?.financials?.commissionAmount?.toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm font-black text-green-600 bg-green-50/50 p-4 rounded-2xl border border-green-100/50">
//                 <span>Owner Payout:</span>
//                 <span>${previewData?.financials?.ownerPayout?.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* STEP 5: SUCCESS */}
//       {currentStep === 5 && (
//         <div className="flex flex-col items-center justify-center py-24 animate-in zoom-in-50 duration-500">
//           <div className="w-32 h-32 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-inner">
//             <CheckCircle2 size={80} />
//           </div>
//           <h2 className="text-3xl font-black text-gray-900 mb-2">Success!</h2>
//           <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-6">
//             Booking reference generated
//           </p>
//           <h3 className="text-5xl font-black text-primary mb-12 tracking-tighter shadow-sm">
//             #RNT-68401
//           </h3>
//           <div className="flex gap-4">
//             <Link href={`/admin/dashboard/bookings/${createdBooking?.id}`}>
//               <button className="px-10 py-5 bg-primary text-white rounded-[2rem] font-black shadow-xl shadow-primary/20 cursor-pointer">
//                 View Details
//               </button>
//             </Link>
//             <button
//               onClick={() => {
//                 setCurrentStep(1);
//                 setExtraCharges([]);
//                 setBookingDetails({
//                   ...bookingData,
//                   pickupDate: "",
//                   returnDate: "",
//                 });
//               }}
//               className="px-10 py-5 bg-gray-100 text-gray-700 rounded-[2rem] font-black cursor-pointer"
//             >
//               Create Another
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Mini card helper for Review screen
// const SummaryMiniCard = ({ label, val, color }: any) => (
//   <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
//     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
//       {label}
//     </p>
//     <p className={`text-sm font-bold truncate ${color || "text-gray-900"}`}>
//       {val}
//     </p>
//   </div>
// );

// export default ManualBookingFlow;

"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  Check,
  Calendar,
  CheckCircle2,
  Plus,
  Trash2,
  Loader2,
  MapPin,
  Send,
  User,
} from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { format } from "date-fns";
import { enUS, fr, ar } from "date-fns/locale";
import { toast } from "sonner";
import { useGetAllListingsQuery } from "@/redux/features/listingApis/listingApis";
import FormInput from "@/components/booking/FormInput";
import {
  useCreateManualBookingMutation,
  useGetManualPreviewMutation,
} from "@/redux/features/admin/bookings.api";
import { useGetAllUsersQuery } from "@/redux/features/admin/usersApi";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

type Step = 1 | 2 | 3 | 4 | 5;

const ManualBookingFlow = ({ onBack }: { onBack: () => void }) => {
  const t = useTranslations("AdminManualBooking");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const dateLocale = locale === "fr" ? fr : locale === "ar" ? ar : enUS;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";

  const [createdBooking, setCreatedBooking] = useState<any>();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [previewData, setPreviewData] = useState<any>(null);
  const [sendEmail, setSendEmail] = useState(true);

  const [bookingData, setBookingDetails] = useState({
    pickupDate: "",
    returnDate: "",
    basePrice: 0,
    amount: 0,
    commissionRate: 10,
    paymentStatus: "PAID",
    paymentMethod: "CASH",
    source: "phone_call",
    specialRequests: "",
  });

  const [extraCharges, setExtraCharges] = useState<
    { label: string; amount: number }[]
  >([]);

  const { data: listingsData, isFetching: isListingLoading } =
    useGetAllListingsQuery({ searchTerm }, { skip: currentStep !== 1 });
  const { data: usersData, isFetching: isUserLoading } = useGetAllUsersQuery(
    { searchTerm },
    { skip: currentStep !== 2 },
  );
  const [getPreview] = useGetManualPreviewMutation();
  const [createBooking, { isLoading: isCreating }] =
    useCreateManualBookingMutation();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) params.set("searchTerm", term);
    else params.delete("searchTerm");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 500);

  const handleNextToPreview = async () => {
    const toastId = toast.loading(t("toasts.calculating"));
    try {
      const payload = {
        userId: selectedUser?.id,
        listingId: selectedListing?.id,
        startDate: new Date(bookingData.pickupDate).toISOString(),
        endDate: new Date(bookingData.returnDate).toISOString(),
        basePrice: Number(bookingData.basePrice),
        extraCharges: extraCharges
          .filter((c) => c.label)
          .map((c) => ({ label: c.label, amount: Number(c.amount) })),
        commissionRate: Number(bookingData.commissionRate),
      };
      const res = await getPreview(payload).unwrap();
      setPreviewData(res.data);
      setCurrentStep(4);
      toast.dismiss(toastId);
    } catch (err: any) {
      toast.error(err?.data?.message || t("toasts.invalid"), { id: toastId });
    }
  };

  const handleFinalConfirm = async () => {
    const toastId = toast.loading(t("toasts.saving"));
    try {
      const payload = {
        userId: selectedUser?.id,
        listingId: selectedListing?.id,
        startDate: new Date(bookingData.pickupDate).toISOString(),
        endDate: new Date(bookingData.returnDate).toISOString(),
        basePrice: Number(bookingData.basePrice),
        totalPrice: previewData?.financials?.grandTotal,
        extraCharges: extraCharges
          .filter((c) => c.label)
          .map((c) => ({ label: c.label, amount: Number(c.amount) })),
        paymentStatus: bookingData.paymentStatus,
        paymentMethod: bookingData.paymentMethod,
        bookingSource: bookingData.source,
        specialRequests: bookingData.specialRequests,
        sendEmail: sendEmail,
      };
      const res = await createBooking(payload).unwrap();
      if (res.success) {
        toast.success(t("toasts.confirmed"), { id: toastId });
        setCreatedBooking(res?.data);
        setCurrentStep(5);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || t("toasts.failed"), { id: toastId });
    }
  };

  const Stepper = () => (
    <div className="bg-white border border-gray-100 rounded-[2rem] p-8 flex items-center justify-between mb-10 shadow-sm">
      {[
        t("stepper.step1"),
        t("stepper.step2"),
        t("stepper.step3"),
        t("stepper.step4"),
      ].map((label, index) => {
        const num = index + 1;
        const active = currentStep === num;
        const done = currentStep > num;
        return (
          <React.Fragment key={label}>
            <div
              onClick={() => done && setCurrentStep(num as Step)}
              className={`flex flex-col items-center gap-2 ${done ? "cursor-pointer" : ""}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${active ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" : done ? "bg-primary text-white" : "bg-gray-100 text-gray-400"}`}
              >
                {done ? <Check size={18} strokeWidth={3} /> : num}
              </div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${active ? "text-primary" : "text-gray-400"}`}
              >
                {label}
              </span>
            </div>
            {index !== 3 && <div className="flex-1 h-px bg-gray-100 mx-4" />}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div className="py-4 px-2" dir={isRtl ? "rtl" : "ltr"}>
      {currentStep < 5 && (
        <>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 font-bold mb-4 hover:text-primary transition-all cursor-pointer"
          >
            <ArrowLeft size={18} className={isRtl ? "rotate-180" : ""} />{" "}
            {t("header.back")}
          </button>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-3">
            {t("header.title")}
          </h1>
          <Stepper />
        </>
      )}

      {currentStep === 1 && (
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="relative">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRtl ? "right-4" : "left-4"}`}
              size={20}
            />
            <input
              onChange={(e) => handleSearch(e.target.value)}
              className={`w-full bg-gray-50 border-none py-5 rounded-2xl outline-none font-bold text-gray-700 focus:ring-2 ring-primary/20 ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"}`}
              placeholder={t("step1.placeholder")}
            />
          </div>
          <div className="grid grid-cols-1 gap-3">
            {isListingLoading ? (
              <div className="py-20 flex justify-center">
                <Loader2 className="animate-spin text-primary" />
              </div>
            ) : (
              listingsData?.data?.slice(0, 5).map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedListing(item);
                    setBookingDetails({
                      ...bookingData,
                      basePrice: item.basePrice,
                    });
                  }}
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${selectedListing?.id === item.id ? "border-primary bg-primary/5" : "border-transparent bg-gray-50 hover:border-primary/20"}`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item?.images[0]}
                      className="w-16 h-12 rounded-xl object-cover"
                      alt=""
                    />
                    <div className={isRtl ? "text-right" : "text-left"}>
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                        {item.category} · {item.location}
                      </p>
                    </div>
                  </div>
                  {selectedListing?.id === item.id && (
                    <CheckCircle2 className="text-primary" />
                  )}
                </div>
              ))
            )}
          </div>
          <div className={`flex ${isRtl ? "justify-start" : "justify-end"}`}>
            <button
              disabled={!selectedListing}
              onClick={() => setCurrentStep(2)}
              className="bg-primary text-white px-12 py-4 rounded-2xl font-black shadow-lg disabled:opacity-30 cursor-pointer"
            >
              {t("step1.next")}
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm space-y-8 animate-in fade-in slide-in-from-right-4">
          <div className="relative">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRtl ? "right-4" : "left-4"}`}
              size={20}
            />
            <input
              onChange={(e) => handleSearch(e.target.value)}
              className={`w-full bg-gray-50 border-none py-5 rounded-2xl outline-none font-bold text-gray-700 focus:ring-2 ring-primary/20 ${isRtl ? "pr-12 pl-4" : "pl-12 pr-4"}`}
              placeholder={t("step2.placeholder")}
            />
          </div>
          <div className="grid grid-cols-1 gap-3">
            {isUserLoading ? (
              <div className="py-20 flex justify-center">
                <Loader2 className="animate-spin text-primary" />
              </div>
            ) : (
              usersData?.data?.slice(0, 5).map((user: any) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${selectedUser?.id === user.id ? "border-primary bg-primary/5" : "border-transparent bg-gray-50 hover:border-primary/20"}`}
                >
                  <div className="flex items-center gap-4">
                    {user?.image ? (
                      <Image
                        className="rounded-full w-14 h-14"
                        src={user?.image}
                        width={100}
                        height={100}
                        alt=""
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        <User />
                      </div>
                    )}
                    <div className={isRtl ? "text-right" : "text-left"}>
                      <p className="font-bold text-gray-900">{user.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  {selectedUser?.id === user.id && (
                    <CheckCircle2 className="text-primary" />
                  )}
                </div>
              ))
            )}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-10 py-4 bg-gray-100 rounded-2xl font-bold text-gray-500 cursor-pointer"
            >
              {t("step2.back")}
            </button>
            <button
              disabled={!selectedUser}
              onClick={() => setCurrentStep(3)}
              className="bg-primary text-white px-12 py-4 rounded-2xl font-black shadow-lg disabled:opacity-30 cursor-pointer"
            >
              {t("step2.next")}
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm space-y-10 animate-in fade-in slide-in-from-right-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-black text-gray-900 uppercase tracking-widest text-[11px] text-start">
                {t("step3.sections.dates")}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label={t("step3.fields.start")}
                  type="date"
                  value={bookingData.pickupDate}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingData,
                      pickupDate: e.target.value,
                    })
                  }
                  name="start"
                  placeholder=""
                />
                <FormInput
                  label={t("step3.fields.end")}
                  type="date"
                  value={bookingData.returnDate}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingData,
                      returnDate: e.target.value,
                    })
                  }
                  name="end"
                  placeholder=""
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-black text-gray-900 uppercase tracking-widest text-[11px] text-start">
                {t("step3.sections.pricing")}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label={t("step3.fields.base")}
                  type="number"
                  value={bookingData.basePrice.toString()}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingData,
                      basePrice: Number(e.target.value),
                    })
                  }
                  name="price"
                  placeholder="100"
                />
                <FormInput
                  label={t("step3.fields.comm")}
                  type="number"
                  value={bookingData.commissionRate.toString()}
                  onChange={(e) =>
                    setBookingDetails({
                      ...bookingData,
                      commissionRate: Number(e.target.value),
                    })
                  }
                  name="comm"
                  placeholder="10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-50 pt-8">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-gray-900 uppercase tracking-widest text-[11px]">
                {t("step3.sections.fees")}
              </h3>
              <button
                onClick={() =>
                  setExtraCharges([...extraCharges, { label: "", amount: 0 }])
                }
                className="text-primary font-black text-xs flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Plus size={14} /> {t("step3.buttons.addFee")}
              </button>
            </div>
            {extraCharges.map((fee, i) => (
              <div
                key={i}
                className="flex gap-4 items-end animate-in slide-in-from-left-2"
              >
                <div className="flex-[2]">
                  <FormInput
                    label={t("step3.fields.label")}
                    value={fee.label}
                    onChange={(e) => {
                      const n = [...extraCharges];
                      n[i].label = e.target.value;
                      setExtraCharges(n);
                    }}
                    placeholder="Cleaning"
                    name="l"
                  />
                </div>
                <div className="flex-1">
                  <FormInput
                    label={t("step3.fields.amount")}
                    type="number"
                    value={fee.amount.toString()}
                    onChange={(e) => {
                      const n = [...extraCharges];
                      n[i].amount = Number(e.target.value);
                      setExtraCharges(n);
                    }}
                    placeholder="20"
                    name="a"
                  />
                </div>
                <button
                  onClick={() =>
                    setExtraCharges(extraCharges.filter((_, idx) => idx !== i))
                  }
                  className="p-4 bg-red-50 text-red-500 rounded-xl mb-1 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-50 pt-8">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-gray-400 uppercase text-start">
                {t("step3.fields.status")}
              </label>
              <select
                value={bookingData.paymentStatus}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingData,
                    paymentStatus: e.target.value,
                  })
                }
                className="w-full bg-gray-50 border-none p-4 rounded-xl font-bold text-gray-700 h-[58px] outline-none focus:ring-2 ring-primary/20 cursor-pointer"
              >
                <option value="PAID">PAID</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-gray-400 uppercase text-start">
                {t("step3.fields.method")}
              </label>
              <select
                value={bookingData.paymentMethod}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingData,
                    paymentMethod: e.target.value,
                  })
                }
                className="w-full bg-gray-50 border-none p-4 rounded-xl font-bold text-gray-700 h-[58px] outline-none cursor-pointer"
              >
                <option value="CASH">CASH</option>
                <option value="CARD">CARD</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-black text-gray-400 uppercase text-start">
                {t("step3.fields.source")}
              </label>
              <select
                value={bookingData.source}
                onChange={(e) =>
                  setBookingDetails({ ...bookingData, source: e.target.value })
                }
                className="w-full bg-gray-50 border-none p-4 rounded-xl font-bold text-gray-700 h-[58px] outline-none cursor-pointer"
              >
                <option value="phone_call">Phone Call</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="walk_in">Walk-in</option>
                <option value="travel_agency">Travel Agency</option>
                <option value="email">Email</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-black text-gray-400 uppercase text-start">
              {t("step3.sections.requests")}
            </label>
            <textarea
              value={bookingData.specialRequests}
              onChange={(e) =>
                setBookingDetails({
                  ...bookingData,
                  specialRequests: e.target.value,
                })
              }
              placeholder={t("step3.fields.requestsPlaceholder")}
              className={`w-full bg-gray-50 rounded-2xl p-5 border-none outline-none focus:ring-2 ring-primary/20 min-h-[120px] font-medium ${isRtl ? "text-right" : "text-left"}`}
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-10 py-4 bg-gray-100 rounded-2xl font-bold text-gray-500 cursor-pointer"
            >
              {t("step3.buttons.back")}
            </button>
            <button
              disabled={!bookingData.pickupDate || !bookingData.returnDate}
              onClick={handleNextToPreview}
              className="bg-primary text-white px-12 py-4 rounded-2xl font-black shadow-lg disabled:opacity-30 cursor-pointer"
            >
              {t("step3.buttons.preview")}
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in zoom-in-95">
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm space-y-8">
            <h2
              className={`text-2xl font-black text-gray-900 ${isRtl ? "text-right" : "text-left"}`}
            >
              {t("step4.title")}
            </h2>
            <div
              className={`border border-gray-50 rounded-[2rem] p-6 flex gap-6 bg-gray-50/30 flex-col sm:flex-row ${isRtl ? "flex-row-reverse" : ""}`}
            >
              <img
                src={previewData?.listing?.image}
                className="w-40 h-28 bg-gray-200 rounded-2xl object-cover shadow-sm mx-auto sm:mx-0"
                alt=""
              />
              <div
                className={`flex flex-col justify-center ${isRtl ? "text-right" : "text-left"}`}
              >
                <h3 className="text-xl font-black text-gray-900 leading-tight">
                  {previewData?.listing?.title}
                </h3>
                <p
                  className={`text-sm text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-1 ${isRtl ? "justify-end" : ""}`}
                >
                  <MapPin size={14} /> {previewData?.listing?.city}
                </p>
                <div
                  className={`flex items-center gap-2 mt-4 text-sm font-black text-primary bg-white border border-primary/10 w-fit px-4 py-1.5 rounded-xl shadow-sm ${isRtl ? "flex-row-reverse self-end" : ""}`}
                >
                  <Calendar size={16} />{" "}
                  {format(new Date(bookingData.pickupDate), "MMM dd", {
                    locale: dateLocale,
                  })}{" "}
                  →{" "}
                  {format(new Date(bookingData.returnDate), "MMM dd, yyyy", {
                    locale: dateLocale,
                  })}
                  <span
                    className={`${isRtl ? "mr-3 border-r pr-3" : "ml-3 border-l pl-3"} border-primary/20`}
                  >
                    {previewData?.financials?.totalDays} {t("step4.days")}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SummaryMiniCard
                label={t("step4.summaryLabels.payment")}
                val={bookingData.paymentMethod}
                isRtl={isRtl}
              />
              <SummaryMiniCard
                label={t("step4.summaryLabels.status")}
                val={bookingData.paymentStatus}
                isRtl={isRtl}
                color={
                  bookingData.paymentStatus === "PAID"
                    ? "text-green-600"
                    : "text-orange-500"
                }
              />
              <SummaryMiniCard
                label={t("step4.summaryLabels.source")}
                val={bookingData.source.replace("_", " ")}
                isRtl={isRtl}
              />
              <SummaryMiniCard
                label={t("step4.summaryLabels.user")}
                val={previewData?.user?.fullName}
                isRtl={isRtl}
              />
            </div>

            <label
              className={`flex items-center gap-4 p-6 bg-primary/5 rounded-[2rem] border border-primary/10 cursor-pointer hover:bg-primary/10 transition-all ${isRtl ? "flex-row-reverse text-right" : ""}`}
            >
              <input
                type="checkbox"
                className="w-6 h-6 accent-primary rounded-lg"
                checked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
              />
              <div>
                <p className="text-sm font-black text-gray-900">
                  {t("step4.email.title")}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  {t("step4.email.desc", { email: selectedUser?.email })}
                </p>
              </div>
            </label>

            <button
              onClick={handleFinalConfirm}
              disabled={isCreating}
              className="w-full bg-primary text-white py-6 rounded-[2rem] font-black text-lg shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isCreating ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send size={22} className={isRtl ? "rotate-180" : ""} />
              )}{" "}
              {isCreating ? t("step4.loading") : t("step4.finalizeBtn")}
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="w-full text-gray-400 font-bold text-sm hover:underline cursor-pointer"
            >
              {t("step4.edit")}
            </button>
          </div>

          <div className="lg:col-span-4 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm h-fit space-y-6">
            <h3
              className={`font-black text-gray-900 uppercase text-[10px] tracking-[0.2em] opacity-50 ${isRtl ? "text-right" : "text-left"}`}
            >
              {t("step4.financials.title")}
            </h3>
            <div className="space-y-4">
              <div
                className={`flex justify-between text-sm font-bold text-gray-500 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                <span>
                  {t("step4.financials.base")} ($
                  {previewData?.financials?.basePrice} ×{" "}
                  {previewData?.financials?.totalDays})
                </span>
                <span className="text-gray-900">
                  ${previewData?.financials?.baseTotal?.toFixed(2)}
                </span>
              </div>
              {extraCharges.map((fee, i) => (
                <div
                  key={i}
                  className={`flex justify-between text-sm font-bold text-gray-500 ${isRtl ? "flex-row-reverse" : ""}`}
                >
                  <span>{fee.label}:</span>
                  <span className="text-gray-900">
                    ${Number(fee.amount).toFixed(2)}
                  </span>
                </div>
              ))}
              <div
                className={`flex justify-between text-lg pt-4 border-t border-gray-50 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                <span className="font-black text-gray-900">Grand Total:</span>
                <span className="font-black text-primary text-2xl">
                  ${previewData?.financials?.grandTotal?.toFixed(2)}
                </span>
              </div>
              <div
                className={`flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest pt-2 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                <span>
                  {t("step4.financials.adminComm")} (
                  {previewData?.financials?.commissionRate}%):
                </span>
                <span>
                  -${previewData?.financials?.commissionAmount?.toFixed(2)}
                </span>
              </div>
              <div
                className={`flex justify-between text-sm font-black text-green-600 bg-green-50/50 p-4 rounded-2xl border border-green-100/50 ${isRtl ? "flex-row-reverse" : ""}`}
              >
                <span>{t("step4.financials.payout")}:</span>
                <span>${previewData?.financials?.ownerPayout?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 5 && (
        <div className="flex flex-col items-center justify-center py-24 animate-in zoom-in-50 duration-500">
          <div className="w-32 h-32 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-inner">
            <CheckCircle2 size={80} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            {t("step5.success")}
          </h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-6">
            {t("step5.refLabel")}
          </p>
          <h3 className="text-5xl font-black text-primary mb-12 tracking-tighter">
            #{createdBooking?.bookingRef}
          </h3>
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link href={`/admin/dashboard/bookings/${createdBooking?.id}`}>
              <button className="px-10 py-5 bg-primary text-white rounded-[2rem] font-black shadow-xl shadow-primary/20 cursor-pointer">
                {t("step5.viewDetails")}
              </button>
            </Link>
            <button
              onClick={() => {
                setCurrentStep(1);
                setExtraCharges([]);
                setBookingDetails({
                  ...bookingData,
                  pickupDate: "",
                  returnDate: "",
                });
              }}
              className="px-10 py-5 bg-gray-100 text-gray-700 rounded-[2rem] font-black cursor-pointer"
            >
              {t("step5.createAnother")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SummaryMiniCard = ({ label, val, color, isRtl }: any) => (
  <div
    className={`bg-gray-50/50 p-4 rounded-2xl border border-gray-100 ${isRtl ? "text-right" : "text-left"}`}
  >
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className={`text-sm font-bold truncate ${color || "text-gray-900"}`}>
      {val}
    </p>
  </div>
);

export default ManualBookingFlow;
