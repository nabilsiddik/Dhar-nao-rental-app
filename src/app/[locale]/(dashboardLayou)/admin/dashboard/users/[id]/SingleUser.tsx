// // "use client";
// // import React, { useMemo, useState } from "react";
// // import Link from "next/link";
// // import {
// //   FiArrowLeft,
// //   FiCalendar,
// //   FiMail,
// //   FiMapPin,
// //   FiPhone,
// //   FiStar,
// //   FiMessageSquare,
// //   FiUserMinus,
// //   FiCheckCircle,
// //   FiPlus,
// // } from "react-icons/fi";
// // import { useGetUserDetailsQuery } from "@/redux/features/userApis/userApis";

// // type UserStatus = "Active" | "Inactive" | "Suspended";

// // export default function SingleUser({ id }: { id: string }) {
// //   console.log(id, "dfdffd id");
// //   const { data: userData, isLoading } = useGetUserDetailsQuery(id);
// //   const user = userData?.data;

// //   console.log(userData, "user data");

// //   const [tab, setTab] = useState<"bookings" | "reviews">("bookings");
// //   const [notes, setNotes] = useState(user?.notes);

// //   const actionLabel =
// //     user.status === "Suspended" ? "Cancel Suspension" : "Suspend User";
// //   const actionClass =
// //     user.status === "Suspended"
// //       ? "bg-green-600 hover:bg-green-700 text-white"
// //       : "bg-red-600 hover:bg-red-700 text-white";

// //   return (
// //     <div className="space-y-6">
// //       <Link
// //         href="/admin/dashboard/users"
// //         className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
// //       >
// //         <FiArrowLeft /> Back to Users
// //       </Link>

// //       <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
// //         <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
// //           <div className="flex items-start gap-4">
// //             <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-lg font-semibold text-white">
// //               {user.initials}
// //             </div>
// //             <div>
// //               <div className="flex flex-wrap items-center gap-2">
// //                 <h1 className="text-2xl font-semibold text-gray-900">
// //                   {user.name}
// //                 </h1>
// //                 <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
// //                   Verified
// //                 </span>
// //                 <span
// //                   className={`rounded-full px-3 py-1 text-xs font-semibold ${user.status === "Active" ? "bg-green-50 text-green-600" : user.status === "Suspended" ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-600"}`}
// //                 >
// //                   {user.status}
// //                 </span>
// //               </div>

// //               <div className="mt-3 grid gap-2 text-sm text-gray-500 sm:grid-cols-2">
// //                 <div className="flex items-center gap-2">
// //                   <FiMail /> {user.email}
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <FiPhone /> {user.phone}
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <FiMapPin /> {user.location}
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <FiCalendar /> Joined {user.joined}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex flex-wrap gap-3">
// //             <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
// //               <FiMessageSquare /> Send Message
// //             </button>
// //             <button
// //               className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${actionClass}`}
// //             >
// //               <FiUserMinus /> {actionLabel}
// //             </button>
// //           </div>
// //         </div>

// //         <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6 md:grid-cols-6">
// //           <Stat label="Total Bookings" value={user.bookings} />
// //           <Stat
// //             label="Active"
// //             value={user.active}
// //             valueClass="text-green-600"
// //           />
// //           <Stat
// //             label="Total Spent"
// //             value={user.spent}
// //             valueClass="text-purple-600"
// //           />
// //           <Stat
// //             label="Avg Rating"
// //             value={user.rating || "0.0"}
// //             valueClass="text-amber-600"
// //           />
// //           <Stat label="Reviews Given" value={user.reviews} />
// //           <Stat label="Last Active" value={user.lastActive} />
// //         </div>
// //       </div>

// //       <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
// //         <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
// //           <div className="flex items-center gap-6 border-b border-gray-100 px-6 pt-4 text-sm">
// //             <button
// //               onClick={() => setTab("bookings")}
// //               className={`border-b-2 pb-3 ${tab === "bookings" ? "border-purple-500 text-purple-600" : "border-transparent text-gray-500"}`}
// //             >
// //               Bookings ({user.bookingsTab.length})
// //             </button>
// //             <button
// //               onClick={() => setTab("reviews")}
// //               className={`border-b-2 pb-3 ${tab === "reviews" ? "border-purple-500 text-purple-600" : "border-transparent text-gray-500"}`}
// //             >
// //               Reviews ({user.reviewsTab.length})
// //             </button>
// //           </div>

// //           <div className="space-y-4 p-6">
// //             {tab === "bookings" ? (
// //               <>
// //                 <div className="flex justify-end">
// //                   <button className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
// //                     <FiPlus /> Create Booking for this User
// //                   </button>
// //                 </div>

// //                 {user.bookingsTab.length > 0 ? (
// //                   user.bookingsTab.map((booking: any) => (
// //                     <article
// //                       key={booking.id}
// //                       className="rounded-2xl border border-gray-100 p-4 shadow-sm"
// //                     >
// //                       <div className="flex items-start justify-between gap-4">
// //                         <div>
// //                           <div className="flex items-center gap-2 text-xs text-gray-500">
// //                             <span className="font-semibold text-gray-700">
// //                               #{booking.id}
// //                             </span>
// //                             <span className="rounded-full bg-purple-50 px-2 py-0.5 text-purple-600">
// //                               {booking.type}
// //                             </span>
// //                           </div>
// //                           <h3 className="mt-1 text-lg font-medium text-gray-900">
// //                             {booking.title}
// //                           </h3>
// //                           <p className="mt-1 text-sm text-gray-500">
// //                             {booking.dates}
// //                           </p>
// //                           <button className="mt-3 text-sm font-medium text-purple-600 hover:text-purple-700">
// //                             View Details
// //                           </button>
// //                         </div>
// //                         <div className="flex flex-col items-end gap-3">
// //                           <span
// //                             className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.state === "Active" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-600"}`}
// //                           >
// //                             {booking.state}
// //                           </span>
// //                           <p className="text-sm font-semibold text-gray-900">
// //                             {booking.amount}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </article>
// //                   ))
// //                 ) : (
// //                   <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-500">
// //                     No bookings found for this user.
// //                   </div>
// //                 )}
// //               </>
// //             ) : (
// //               <>
// //                 {user.reviewsTab.length > 0 ? (
// //                   user.reviewsTab.map((review: any) => (
// //                     <article
// //                       key={review.id}
// //                       className="rounded-2xl border border-gray-100 p-4 shadow-sm"
// //                     >
// //                       <div className="flex items-start justify-between gap-4">
// //                         <div>
// //                           <h3 className="text-lg font-medium text-gray-900">
// //                             {review.title}
// //                           </h3>
// //                           <div className="mt-1 flex items-center gap-2 text-amber-500">
// //                             {Array.from({ length: 5 }).map((_, index) => (
// //                               <FiStar
// //                                 key={index}
// //                                 className={
// //                                   index < review.rating
// //                                     ? "fill-current"
// //                                     : "text-gray-300"
// //                                 }
// //                               />
// //                             ))}
// //                             <span className="text-sm font-medium text-gray-700">
// //                               {review.rating.toFixed(1)}
// //                             </span>
// //                           </div>
// //                           <p className="mt-3 text-sm text-gray-600">
// //                             {review.text}
// //                           </p>
// //                         </div>
// //                         <p className="text-sm text-gray-400">{review.date}</p>
// //                       </div>
// //                     </article>
// //                   ))
// //                 ) : (
// //                   <div className="rounded-2xl border border-dashed border-gray-200 p-10 text-center text-sm text-gray-500">
// //                     No reviews found for this user.
// //                   </div>
// //                 )}
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         <aside className="space-y-6">
// //           <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
// //             <h2 className="text-lg font-semibold text-gray-900">Admin Notes</h2>
// //             <textarea
// //               value={notes}
// //               onChange={(e) => setNotes(e.target.value)}
// //               placeholder="Add internal notes about this user..."
// //               className="mt-4 min-h-[140px] w-full rounded-xl border border-gray-200 p-4 text-sm outline-none placeholder:text-gray-400 focus:border-purple-400"
// //             />
// //             <div className="mt-4 flex justify-end">
// //               <button className="rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
// //                 Save Notes
// //               </button>
// //             </div>
// //           </div>

// //           <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
// //             <div className="flex items-center gap-2 text-sm text-gray-500">
// //               <FiCheckCircle className="text-green-500" /> Account Status
// //             </div>
// //             <p className="mt-3 text-sm text-gray-600">
// //               {user.status === "Suspended"
// //                 ? "This account is currently suspended and hidden from some actions."
// //                 : "This account is active and ready for bookings and messaging."}
// //             </p>
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }

// // function Stat({
// //   label,
// //   value,
// //   valueClass = "text-gray-900",
// // }: {
// //   label: string;
// //   value: React.ReactNode;
// //   valueClass?: string;
// // }) {
// //   return (
// //     <div>
// //       <p className="text-sm text-gray-500">{label}</p>
// //       <p className={`mt-2 text-2xl font-semibold ${valueClass}`}>{value}</p>
// //     </div>
// //   );
// // }

// // "use client";

// // import React, { useState, useEffect } from "react";
// // import Link from "next/link";
// // import {
// //   FiArrowLeft,
// //   FiCalendar,
// //   FiMail,
// //   FiMapPin,
// //   FiPhone,
// //   FiStar,
// //   FiMessageSquare,
// //   FiUserMinus,
// //   FiCheckCircle,
// //   FiPlus,
// // } from "react-icons/fi";
// // import { useGetUserDetailsQuery } from "@/redux/features/userApis/userApis";
// // import { Loader2, User as UserIcon } from "lucide-react";
// // import Image from "next/image";

// // export default function SingleUser({ id }: { id: string }) {
// //   // 1. Fetch Data
// //   const { data: userDataResponse, isLoading } = useGetUserDetailsQuery(id);
// //   const user = userDataResponse?.data;

// //   // 2. Tab and Local States
// //   const [tab, setTab] = useState<"bookings" | "reviews">("bookings");
// //   const [notes, setNotes] = useState("");

// //   // Sync notes when data arrives
// //   useEffect(() => {
// //     if (user?.adminNotes) {
// //       setNotes(user.adminNotes);
// //     }
// //   }, [user]);

// //   // 3. Loading State
// //   if (isLoading) {
// //     return (
// //       <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
// //         <Loader2 className="animate-spin text-primary" size={40} />
// //         <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
// //           Loading Profile Details...
// //         </p>
// //       </div>
// //     );
// //   }

// //   if (!user)
// //     return (
// //       <div className="py-20 text-center text-gray-500">User not found.</div>
// //     );

// //   // 4. Action Button Logic
// //   const isSuspended = user?.header?.status === "SUSPENDED";
// //   const actionLabel = isSuspended ? "Cancel Suspension" : "Suspend User";
// //   const actionClass = isSuspended
// //     ? "bg-green-600 hover:bg-green-700 text-white"
// //     : "bg-red-600 hover:bg-red-700 text-white";

// //   // Helper for Initials
// //   const initials = user?.header?.name
// //     ?.split(" ")
// //     .map((n: string) => n[0])
// //     .slice(0, 2)
// //     .join("")
// //     .toUpperCase();

// //   return (
// //     <div className="space-y-6 pb-10">
// //       <Link
// //         href="/admin/dashboard/users"
// //         className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors"
// //       >
// //         <FiArrowLeft /> Back to Users
// //       </Link>

// //       {/* HEADER CARD */}
// //       <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
// //         <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
// //           <div className="flex items-start gap-6">
// //             <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-black text-primary overflow-hidden border-2 border-white shadow-sm">
// //               {user?.header?.image ? (
// //                 <Image
// //                   src={user.header.image}
// //                   alt="Profile"
// //                   fill
// //                   className="object-cover"
// //                 />
// //               ) : (
// //                 initials
// //               )}
// //             </div>
// //             <div>
// //               <div className="flex flex-wrap items-center gap-3">
// //                 <h1 className="text-3xl font-black text-gray-900 tracking-tight">
// //                   {user?.header?.name}
// //                 </h1>
// //                 <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600">
// //                   {user?.header?.isVerified ? "Verified" : "Unverified"}
// //                 </span>
// //                 <span
// //                   className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
// //                     user?.header?.status === "ACTIVE"
// //                       ? "bg-green-50 text-green-600"
// //                       : "bg-red-50 text-red-600"
// //                   }`}
// //                 >
// //                   {user?.header?.status}
// //                 </span>
// //               </div>

// //               <div className="mt-4 grid gap-x-8 gap-y-2 text-sm font-medium text-gray-500 sm:grid-cols-2">
// //                 <div className="flex items-center gap-2">
// //                   <FiMail className="text-primary" /> {user?.header?.email}
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <FiPhone className="text-primary" />{" "}
// //                   {user?.header?.phone || "N/A"}
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <FiMapPin className="text-primary" />{" "}
// //                   {user?.header?.location || "Not Set"}
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <FiCalendar className="text-primary" />{" "}
// //                   {user?.header?.joinedDate}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex flex-wrap gap-3">
// //             <button className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all active:scale-95 cursor-pointer">
// //               <FiMessageSquare /> Send Message
// //             </button>
// //             <button
// //               className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold shadow-lg transition-all active:scale-95 cursor-pointer ${actionClass}`}
// //             >
// //               <FiUserMinus /> {actionLabel}
// //             </button>
// //           </div>
// //         </div>

// //         {/* TOP STATS BAR */}
// //         <div className="mt-8 grid gap-4 border-t border-gray-50 pt-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
// //           <Stat label="Total Bookings" value={user?.stats?.totalBookings} />
// //           <Stat
// //             label="Active"
// //             value={user?.stats?.activeBookings}
// //             valueClass="text-green-600"
// //           />
// //           <Stat
// //             label="Total Spent"
// //             value={user?.stats?.totalSpent}
// //             valueClass="text-primary"
// //           />
// //           <Stat
// //             label="Avg Rating"
// //             value={user?.stats?.avgRating}
// //             valueClass="text-amber-500"
// //           />
// //           <Stat label="Reviews Given" value={user?.stats?.reviewsGiven} />
// //           <Stat label="Last Active" value={user?.stats?.lastActive} />
// //         </div>
// //       </div>

// //       <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
// //         {/* TABS SECTION */}
// //         <div className="rounded-[2.5rem] border border-gray-100 bg-white shadow-sm overflow-hidden h-fit">
// //           <div className="flex items-center gap-8 border-b border-gray-50 px-8 pt-6">
// //             <button
// //               onClick={() => setTab("bookings")}
// //               className={`text-sm font-black uppercase tracking-widest pb-4 transition-all border-b-4 ${
// //                 tab === "bookings"
// //                   ? "border-primary text-primary"
// //                   : "border-transparent text-gray-400"
// //               }`}
// //             >
// //               Bookings ({user?.bookings?.length || 0})
// //             </button>
// //             <button
// //               onClick={() => setTab("reviews")}
// //               className={`text-sm font-black uppercase tracking-widest pb-4 transition-all border-b-4 ${
// //                 tab === "reviews"
// //                   ? "border-primary text-primary"
// //                   : "border-transparent text-gray-400"
// //               }`}
// //             >
// //               Reviews ({user?.reviews?.length || 0})
// //             </button>
// //           </div>

// //           <div className="space-y-4 p-8">
// //             {tab === "bookings" ? (
// //               <>
// //                 {/* <div className="flex justify-end mb-4">
// //                   <button className="inline-flex items-center gap-2 rounded-xl bg-primary/10 text-primary px-5 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
// //                     <FiPlus size={16} /> Create Booking
// //                   </button>
// //                 </div> */}

// //                 {user?.bookings?.length > 0 ? (
// //                   user.bookings.map((booking: any) => (
// //                     <article
// //                       key={booking.id}
// //                       className="rounded-[1.5rem] border border-gray-50 bg-[#F9FAFB]/50 p-6 transition-all hover:border-primary/20"
// //                     >
// //                       <div className="flex items-start justify-between gap-4">
// //                         <div className="space-y-1">
// //                           <div className="flex items-center gap-3">
// //                             <span className="text-xs font-black text-primary uppercase tracking-tighter">
// //                               {booking.bookingRef}
// //                             </span>
// //                             <span className="rounded px-2 py-0.5 text-[10px] font-black uppercase bg-white border border-gray-100 text-gray-400">
// //                               {booking.category}
// //                             </span>
// //                           </div>
// //                           <h3 className="text-lg font-bold text-gray-900 leading-tight">
// //                             {booking.title}
// //                           </h3>
// //                           <p className="text-sm font-medium text-gray-500">
// //                             {booking.dates}
// //                           </p>
// //                           <Link
// //                             href={`/admin/dashboard/bookings/${booking.id}`}
// //                             className="inline-block mt-3 text-sm font-bold text-primary hover:underline uppercase tracking-tighter"
// //                           >
// //                             View Details →
// //                           </Link>
// //                         </div>
// //                         <div className="flex flex-col items-end gap-3">
// //                           <span
// //                             className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
// //                               booking.status === "COMPLETED"
// //                                 ? "bg-gray-100 text-gray-500"
// //                                 : "bg-green-50 text-green-600"
// //                             }`}
// //                           >
// //                             {booking.status}
// //                           </span>
// //                           <p className="text-lg font-black text-gray-900">
// //                             {booking.amount}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </article>
// //                   ))
// //                 ) : (
// //                   <div className="py-20 text-center text-sm font-bold text-gray-300 uppercase tracking-widest border-2 border-dashed rounded-[2rem]">
// //                     No historical bookings
// //                   </div>
// //                 )}
// //               </>
// //             ) : (
// //               <>
// //                 {user?.reviews?.length > 0 ? (
// //                   user.reviews.map((review: any) => (
// //                     <article
// //                       key={review.id}
// //                       className="rounded-[1.5rem] border border-gray-50 bg-[#F9FAFB]/50 p-6"
// //                     >
// //                       <div className="flex items-start justify-between gap-4">
// //                         <div className="flex-1">
// //                           <h3 className="text-lg font-bold text-gray-900 leading-tight">
// //                             {review.listingTitle}
// //                           </h3>
// //                           <div className="mt-2 flex items-center gap-2 text-yellow-500">
// //                             {Array.from({ length: 5 }).map((_, index) => (
// //                               <FiStar
// //                                 key={index}
// //                                 size={14}
// //                                 className={
// //                                   index < Math.floor(Number(review.rating))
// //                                     ? "fill-current"
// //                                     : "text-gray-200"
// //                                 }
// //                               />
// //                             ))}
// //                             <span className="text-sm font-black text-gray-900 ml-1">
// //                               {review.rating}
// //                             </span>
// //                           </div>
// //                           <p className="mt-4 text-sm font-medium text-gray-600 leading-relaxed italic">
// //                             "{review.comment}"
// //                           </p>
// //                         </div>
// //                         <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
// //                           {review.date}
// //                         </p>
// //                       </div>
// //                     </article>
// //                   ))
// //                 ) : (
// //                   <div className="py-20 text-center text-sm font-bold text-gray-300 uppercase tracking-widest border-2 border-dashed rounded-[2rem]">
// //                     No reviews provided
// //                   </div>
// //                 )}
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* ASIDE BAR */}
// //         <aside className="space-y-6">
// //           <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
// //             <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">
// //               Admin Notes
// //             </h2>
// //             <textarea
// //               value={notes}
// //               onChange={(e) => setNotes(e.target.value)}
// //               placeholder="Add internal notes about this user..."
// //               className="mt-6 min-h-[160px] w-full rounded-2xl border border-gray-100 bg-gray-50 p-5 text-sm font-medium outline-none transition focus:border-primary focus:bg-white resize-none"
// //             />
// //             <div className="mt-4 flex justify-end">
// //               <button className="rounded-2xl bg-primary px-8 py-4 text-sm font-black text-white hover:opacity-90 shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer">
// //                 Save Notes
// //               </button>
// //             </div>
// //           </div>

// //           <div className="rounded-[2.5rem] border border-gray-100 bg-[#F9FAFB] p-8">
// //             <div className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
// //               <FiCheckCircle className="text-green-500" size={16} /> Account
// //               Status
// //             </div>
// //             {/* <p className="mt-4 text-sm font-medium text-gray-500 leading-relaxed">
// //               {user?.header?.status === "SUSPENDED"
// //                 ? "This account is currently suspended. The user cannot access protected features or complete payments."
// //                 : "This account is fully active. All platform features are available for this user."}
// //             </p> */}
// //           </div>
// //         </aside>
// //       </div>
// //     </div>
// //   );
// // }

// // function Stat({
// //   label,
// //   value,
// //   valueClass = "text-gray-900",
// // }: {
// //   label: string;
// //   value: React.ReactNode;
// //   valueClass?: string;
// // }) {
// //   return (
// //     <div className="flex flex-col">
// //       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
// //         {label}
// //       </p>
// //       <p className={`text-xl font-black ${valueClass}`}>{value || "0"}</p>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import {
//   FiArrowLeft,
//   FiCalendar,
//   FiMail,
//   FiMapPin,
//   FiPhone,
//   FiStar,
//   FiMessageSquare,
//   FiUserMinus,
//   FiCheckCircle,
//   FiPlus,
//   FiAlertTriangle,
//   FiUserCheck,
// } from "react-icons/fi";
// import { useGetUserDetailsQuery } from "@/redux/features/userApis/userApis";
// import { useSendMessageToUserMutation } from "@/redux/features/admin/inquiry.api";
// import { Loader2, Send } from "lucide-react";
// import Image from "next/image";
// import { toast } from "sonner";
// import {
//   useSaveUserNoteMutation,
//   useSuspendUserMutation,
// } from "@/redux/features/admin/usersApi";
// import Modal from "@/components/common/modals/Modal";
// import ContactUserForm from "@/components/form/ContactUserForm";

// export default function SingleUser({ id }: { id: string }) {
//   // --- 1. API HOOKS ---
//   const { data: userDataResponse, isLoading } = useGetUserDetailsQuery(id);
//   const [saveNote, { isLoading: isSavingNote }] = useSaveUserNoteMutation();
//   const [suspendUser, { isLoading: isSuspending }] = useSuspendUserMutation();
//   const [sendMessage, { isLoading: isSendingEmail }] =
//     useSendMessageToUserMutation();

//   const user = userDataResponse?.data;

//   // --- 2. LOCAL STATE ---
//   const [tab, setTab] = useState<"bookings" | "reviews">("bookings");
//   const [note, setNote] = useState("");
//   const [modalType, setModalType] = useState<"SUSPEND" | "CONTACT" | null>(
//     null,
//   );

//   useEffect(() => {
//     if (user?.adminNotes) setNote(user.adminNotes);
//   }, [user]);

//   // --- 3. ACTION HANDLERS ---

//   const handleSaveNotes = async () => {
//     const toastId = toast.loading("Saving admin notes...");
//     try {
//       await saveNote({ id, note }).unwrap();
//       toast.success("Notes updated successfully", { id: toastId });
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to save notes", {
//         id: toastId,
//       });
//     }
//   };

//   const handleSuspendConfirm = async () => {
//     const toastId = toast.loading("Updating account status...");
//     try {
//       await suspendUser(id).unwrap();
//       toast.success(
//         `User successfully ${user?.header?.status === "SUSPENDED" ? "activated" : "suspended"}`,
//         { id: toastId },
//       );
//       setModalType(null);
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Action failed", { id: toastId });
//     }
//   };

//   const handleContactSubmit = async (formData: {
//     subject: string;
//     message: string;
//   }) => {
//     const toastId = toast.loading("Sending email to user...");
//     try {
//       await sendMessage({ id: user?.header?.id, body: formData }).unwrap();
//       toast.success("Email sent successfully!", { id: toastId });
//       setModalType(null);
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to send email", {
//         id: toastId,
//       });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-primary" size={40} />
//         <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
//           Loading Profile...
//         </p>
//       </div>
//     );
//   }

//   const isSuspended = user?.header?.status === "SUSPENDED";
//   const initials = user?.header?.name
//     ?.split(" ")
//     .map((n: string) => n[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

//   return (
//     <div className="space-y-6 pb-10">
//       <Link
//         href="/admin/dashboard/users"
//         className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors"
//       >
//         <FiArrowLeft /> Back to Users
//       </Link>

//       {/* HEADER CARD */}
//       <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
//         <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
//           <div className="flex items-start gap-6">
//             <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-black text-primary overflow-hidden border-2 border-white shadow-sm">
//               {user?.header?.image ? (
//                 <Image
//                   src={user.header.image}
//                   alt="Profile"
//                   fill
//                   className="object-cover"
//                 />
//               ) : (
//                 initials
//               )}
//             </div>
//             <div>
//               <div className="flex flex-wrap items-center gap-3">
//                 <h1 className="text-3xl font-black text-gray-900 tracking-tight">
//                   {user?.header?.name}
//                 </h1>
//                 <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600">
//                   {user?.header?.isVerified}
//                 </span>
//                 <span
//                   className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${!isSuspended ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
//                 >
//                   {user?.header?.status}
//                 </span>
//               </div>
//               <div className="mt-4 grid gap-x-8 gap-y-2 text-sm font-medium text-gray-500 sm:grid-cols-2">
//                 <div className="flex items-center gap-2">
//                   <FiMail className="text-primary" /> {user?.header?.email}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FiPhone className="text-primary" />{" "}
//                   {user?.header?.phone || "N/A"}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FiMapPin className="text-primary" />{" "}
//                   {user?.header?.location || "Not Set"}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <FiCalendar className="text-primary" />{" "}
//                   {user?.header?.joinedDate}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => setModalType("CONTACT")}
//               className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer active:scale-95"
//             >
//               <FiMessageSquare /> Send Message
//             </button>
//             <button
//               disabled={isSuspended}
//               onClick={() => setModalType("SUSPEND")}
//               className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold shadow-lg transition-all active:scale-95 cursor-pointer bg-red-600 text-white`}
//             >
//               <FiUserMinus />
//               {isSuspended ? "Suspended" : "Suspend User"}
//             </button>
//           </div>
//         </div>

//         <div className="mt-8 grid gap-4 border-t border-gray-50 pt-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
//           <Stat label="Total Bookings" value={user?.stats?.totalBookings} />
//           <Stat
//             label="Active"
//             value={user?.stats?.activeBookings}
//             valueClass="text-green-600"
//           />
//           <Stat
//             label="Total Spent"
//             value={user?.stats?.totalSpent}
//             valueClass="text-primary"
//           />
//           <Stat
//             label="Avg Rating"
//             value={user?.stats?.avgRating}
//             valueClass="text-amber-500"
//           />
//           <Stat label="Reviews Given" value={user?.stats?.reviewsGiven} />
//           <Stat label="Last Active" value={user?.stats?.lastActive} />
//         </div>
//       </div>

//       <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
//         {/* TABS (Bookings & Reviews) - Logic same as previous snippet ... */}

//         <div className="rounded-[2.5rem] border border-gray-100 bg-white shadow-sm overflow-hidden h-fit">
//           {/* 1. TAB NAVIGATION */}
//           <div className="flex items-center gap-8 border-b border-gray-50 px-8 pt-6">
//             <button
//               onClick={() => setTab("bookings")}
//               className={`text-sm font-black uppercase tracking-widest pb-4 transition-all border-b-4 ${
//                 tab === "bookings"
//                   ? "border-primary text-primary"
//                   : "border-transparent text-gray-400 hover:text-gray-600"
//               } cursor-pointer`}
//             >
//               Bookings ({user?.bookings?.length || 0})
//             </button>
//             <button
//               onClick={() => setTab("reviews")}
//               className={`text-sm font-black uppercase tracking-widest pb-4 transition-all border-b-4 ${
//                 tab === "reviews"
//                   ? "border-primary text-primary"
//                   : "border-transparent text-gray-400 hover:text-gray-600"
//               } cursor-pointer`}
//             >
//               Reviews ({user?.reviews?.length || 0})
//             </button>
//           </div>

//           <div className="p-8">
//             {/* 2. BOOKINGS VIEW */}
//             {tab === "bookings" && (
//               <div className="space-y-4">
//                 {/* Quick Action inside Tab */}
//                 {/* <div className="flex justify-end mb-4">
//                   <Link href="/admin/dashboard/bookings/create">
//                     <button className="inline-flex items-center gap-2 rounded-xl bg-primary/10 text-primary px-5 py-2.5 text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all cursor-pointer">
//                       <FiPlus size={16} /> Create Booking
//                     </button>
//                   </Link>
//                 </div> */}

//                 {user?.bookings?.length > 0 ? (
//                   user.bookings.map((booking: any) => (
//                     <article
//                       key={booking.id}
//                       className="rounded-[1.5rem] border border-gray-50 bg-[#F9FAFB]/50 p-6 transition-all hover:border-primary/20 hover:bg-white group"
//                     >
//                       <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
//                         <div className="space-y-2">
//                           <div className="flex items-center gap-3">
//                             <span className="text-xs font-black text-primary uppercase tracking-tighter">
//                               {booking.bookingRef}
//                             </span>
//                             <span className="rounded px-2 py-0.5 text-[10px] font-black uppercase bg-white border border-gray-100 text-gray-400">
//                               {booking.category}
//                             </span>
//                           </div>
//                           <h3 className="text-lg font-bold text-gray-900 leading-tight">
//                             {booking.title}
//                           </h3>
//                           <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
//                             <FiCalendar size={14} className="text-gray-300" />
//                             {booking.dates}
//                           </div>
//                           <Link
//                             href={`/admin/dashboard/bookings/${booking.id}`}
//                             className="inline-block mt-3 text-sm font-bold text-primary hover:underline uppercase tracking-tighter"
//                           >
//                             View Details →
//                           </Link>
//                         </div>

//                         <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3">
//                           <span
//                             className={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${
//                               booking.status === "COMPLETED"
//                                 ? "bg-gray-100 text-gray-500"
//                                 : booking.status === "CANCELLED"
//                                   ? "bg-red-50 text-red-600"
//                                   : "bg-green-50 text-green-600"
//                             }`}
//                           >
//                             {booking.status}
//                           </span>
//                           <p className="text-xl font-black text-gray-900">
//                             {booking.amount}
//                           </p>
//                         </div>
//                       </div>
//                     </article>
//                   ))
//                 ) : (
//                   <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
//                     <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
//                       No historical bookings found
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* 3. REVIEWS VIEW */}
//             {tab === "reviews" && (
//               <div className="space-y-4">
//                 {user?.reviews?.length > 0 ? (
//                   user.reviews.map((review: any) => (
//                     <article
//                       key={review.id}
//                       className="rounded-[1.5rem] border border-gray-50 bg-[#F9FAFB]/50 p-6"
//                     >
//                       <div className="flex flex-col md:flex-row items-start justify-between gap-4">
//                         <div className="flex-1">
//                           <h3 className="text-lg font-bold text-gray-900 leading-tight">
//                             {review.listingTitle}
//                           </h3>
//                           <div className="mt-2 flex items-center gap-2 text-yellow-500">
//                             {Array.from({ length: 5 }).map((_, index) => (
//                               <FiStar
//                                 key={index}
//                                 size={14}
//                                 className={
//                                   index < Math.floor(Number(review.rating))
//                                     ? "fill-current"
//                                     : "text-gray-300"
//                                 }
//                               />
//                             ))}
//                             <span className="text-sm font-black text-gray-900 ml-1">
//                               {review.rating}
//                             </span>
//                           </div>
//                           <p className="mt-5 text-sm font-medium text-gray-600 leading-relaxed italic border-l-4 border-primary/10 pl-4">
//                             "{review.comment}"
//                           </p>
//                         </div>
//                         <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest shrink-0">
//                           {review.date}
//                         </p>
//                       </div>
//                     </article>
//                   ))
//                 ) : (
//                   <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
//                     <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
//                       User has not provided any reviews
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ASIDE - ADMIN NOTES */}
//         <aside className="space-y-6">
//           <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
//             <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">
//               Admin Notes
//             </h2>
//             <textarea
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               placeholder="Add internal notes about this user..."
//               className="mt-6 min-h-[160px] w-full rounded-2xl border border-gray-100 bg-gray-50 p-5 text-sm font-medium outline-none transition focus:border-primary focus:bg-white resize-none"
//             />
//             <div className="mt-4 flex justify-end">
//               <button
//                 onClick={handleSaveNotes}
//                 disabled={isSavingNote}
//                 className="rounded-2xl bg-primary px-8 py-4 text-sm font-black text-white hover:opacity-90 shadow-lg shadow-primary/20 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
//               >
//                 {isSavingNote ? "Saving..." : "Save Notes"}
//               </button>
//             </div>
//           </div>

//           <div className="rounded-[2.5rem] border border-gray-100 bg-[#F9FAFB] p-8">
//             <div className="flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
//               <FiCheckCircle className="text-green-500" size={16} /> Account
//               Status
//             </div>
//             <p className="mt-4 text-sm font-medium text-gray-500 leading-relaxed">
//               {isSuspended
//                 ? "This account is currently suspended. Access is restricted."
//                 : "This account is fully active and ready for platform usage."}
//             </p>
//           </div>
//         </aside>
//       </div>

//       {/* --- MODALS --- */}

//       {/* 1. SUSPEND CONFIRMATION */}
//       <Modal
//         isOpen={modalType === "SUSPEND"}
//         onClose={() => setModalType(null)}
//         title={isSuspended ? "Activate Account" : "Suspend Account"}
//       >
//         <div className="text-center space-y-6">
//           <div
//             className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm ${isSuspended ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
//           >
//             {isSuspended ? (
//               <FiUserCheck size={32} />
//             ) : (
//               <FiAlertTriangle size={32} />
//             )}
//           </div>
//           <p className="text-gray-500 text-sm leading-relaxed font-medium">
//             Are you sure you want to {isSuspended ? "reactivate" : "suspend"}{" "}
//             <span className="text-gray-900 font-bold">
//               {user?.header?.name}
//             </span>
//             ?
//             {isSuspended
//               ? " The user will regain full access."
//               : " The user will be barred from logins and bookings."}
//           </p>
//           <div className="flex gap-4 pt-2">
//             <button
//               onClick={() => setModalType(null)}
//               className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSuspendConfirm}
//               disabled={isSuspending}
//               className={`flex-1 py-4 text-white rounded-2xl font-black shadow-lg ${isSuspended ? "bg-green-600 shadow-green-100" : "bg-red-600 shadow-red-100"}`}
//             >
//               {isSuspending ? "Processing..." : "Confirm"}
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* 2. CONTACT MODAL */}
//       <Modal
//         isOpen={modalType === "CONTACT"}
//         onClose={() => setModalType(null)}
//         title="Contact User"
//       >
//         <ContactUserForm
//           emailTo={user?.header?.email || ""}
//           onSubmit={handleContactSubmit}
//           isLoading={isSendingEmail}
//         />
//       </Modal>
//     </div>
//   );
// }

// // Reusable Stat Sub-component
// function Stat({
//   label,
//   value,
//   valueClass = "text-gray-900",
// }: {
//   label: string;
//   value: any;
//   valueClass?: string;
// }) {
//   return (
//     <div className="flex flex-col">
//       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
//         {label}
//       </p>
//       <p className={`text-xl font-black ${valueClass}`}>{value || "0"}</p>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCalendar,
  FiMail,
  FiMapPin,
  FiPhone,
  FiStar,
  FiMessageSquare,
  FiUserMinus,
  FiCheckCircle,
  FiAlertTriangle,
  FiUserCheck,
} from "react-icons/fi";
import { useGetUserDetailsQuery } from "@/redux/features/userApis/userApis";
import { useSendMessageToUserMutation } from "@/redux/features/admin/inquiry.api";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import {
  useSaveUserNoteMutation,
  useSuspendUserMutation,
  useUpdateUserStatusMutation,
} from "@/redux/features/admin/usersApi";
import Modal from "@/components/common/modals/Modal";
import ContactUserForm from "@/components/form/ContactUserForm";
import { useTranslations, useLocale } from "next-intl";

export default function SingleUser({ id }: { id: string }) {
  const t = useTranslations("AdminSingleUser");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const { data: userDataResponse, isLoading } = useGetUserDetailsQuery(id);
  const [saveNote, { isLoading: isSavingNote }] = useSaveUserNoteMutation();
  const [suspendUser, { isLoading: isSuspending }] = useSuspendUserMutation();
  const [activeUser, { isLoading: isActivating }] =
    useUpdateUserStatusMutation();
  const [sendMessage, { isLoading: isSendingEmail }] =
    useSendMessageToUserMutation();

  const isProcessing = isSuspending || isActivating;

  const user = userDataResponse?.data;
  const [tab, setTab] = useState<"bookings" | "reviews">("bookings");
  const [note, setNote] = useState("");
  const [modalType, setModalType] = useState<"SUSPEND" | "CONTACT" | null>(
    null,
  );

  useEffect(() => {
    if (user?.adminNotes) setNote(user.adminNotes);
  }, [user]);

  const handleSaveNotes = async () => {
    const toastId = toast.loading(t("toasts.savingNotes"));
    try {
      await saveNote({ id, note }).unwrap();
      toast.success(t("toasts.notesSuccess"), { id: toastId });
    } catch (err: any) {
      toast.error(err?.data?.message || t("toasts.notesError"), {
        id: toastId,
      });
    }
  };

  // const handleSuspendConfirm = async () => {
  //   const toastId = toast.loading(t("toasts.updatingStatus"));
  //   try {
  //     await suspendUser(id).unwrap();
  //     const actionKey =
  //       user?.header?.status === "SUSPENDED"
  //         ? "toasts.actionActivated"
  //         : "toasts.actionSuspended";
  //     toast.success(
  //       t("toasts.statusSuccess", { action: t(actionKey as any) }),
  //       { id: toastId },
  //     );
  //     setModalType(null);
  //   } catch (err: any) {
  //     toast.error(err?.data?.message || t("toasts.statusError"), {
  //       id: toastId,
  //     });
  //   }
  // };

  const handleSuspendConfirm = async () => {
    const toastId = toast.loading(t("toasts.updatingStatus"));
    try {
      if (isSuspended) {
        // 1. Logic for ACTIVATION
        await activeUser({ id, status: "ACTIVE" }).unwrap();
      } else {
        // 2. Logic for SUSPENSION
        await suspendUser(id).unwrap();
      }

      // Determine the translation key for the success message
      const actionKey = isSuspended
        ? "toasts.actionActivated"
        : "toasts.actionSuspended";

      toast.success(
        t("toasts.statusSuccess", { action: t(actionKey as any) }),
        { id: toastId },
      );

      setModalType(null);
    } catch (err: any) {
      toast.error(err?.data?.message || t("toasts.statusError"), {
        id: toastId,
      });
    }
  };

  const handleContactSubmit = async (formData: {
    subject: string;
    message: string;
  }) => {
    const toastId = toast.loading(t("toasts.sendingEmail"));
    try {
      await sendMessage({ id: user?.header?.id, body: formData }).unwrap();
      toast.success(t("toasts.emailSuccess"), { id: toastId });
      setModalType(null);
    } catch (err: any) {
      toast.error(err?.data?.message || t("toasts.emailError"), {
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

  const isSuspended = user?.header?.status === "SUSPENDED";
  const initials = user?.header?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6 pb-10" dir={isRtl ? "rtl" : "ltr"}>
      <Link
        href="/admin/dashboard/users"
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors"
      >
        <FiArrowLeft className={isRtl ? "rotate-180" : ""} /> {t("back")}
      </Link>

      {/* HEADER CARD */}
      <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-6">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-black text-primary overflow-hidden border-2 border-white shadow-sm">
              {user?.header?.image ? (
                <Image
                  src={user.header.image}
                  alt=""
                  fill
                  className="object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div className={isRtl ? "text-right" : "text-left"}>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                  {user?.header?.name}
                </h1>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600">
                  {user?.header?.isVerified}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${!isSuspended ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                >
                  {user?.header?.status}
                </span>
              </div>
              <div className="mt-4 grid gap-x-8 gap-y-2 text-sm font-medium text-gray-500 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <FiMail className="text-primary" /> {user?.header?.email}
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone className="text-primary" />{" "}
                  {user?.header?.phone || t("header.noPhone")}
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-primary" />{" "}
                  {user?.header?.location || t("header.notSet")}
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-primary" />{" "}
                  {user?.header?.joinedDate}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setModalType("CONTACT")}
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer active:scale-95"
            >
              <FiMessageSquare /> {t("header.sendMessage")}
            </button>
            <button
              onClick={() => setModalType("SUSPEND")}
              className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold shadow-lg transition-all active:scale-95 cursor-pointer ${isSuspended ? "bg-green-600" : "bg-red-600"} text-white`}
            >
              {isSuspended ? <FiUserCheck /> : <FiUserMinus />}
              {isSuspended ? t("header.suspended") : t("header.suspendUser")}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 border-t border-gray-50 pt-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Stat
            label={t("stats.totalBookings")}
            value={user?.stats?.totalBookings}
            isRtl={isRtl}
          />
          <Stat
            label={t("stats.active")}
            value={user?.stats?.activeBookings}
            valueClass="text-green-600"
            isRtl={isRtl}
          />
          <Stat
            label={t("stats.totalSpent")}
            value={user?.stats?.totalSpent}
            valueClass="text-primary"
            isRtl={isRtl}
          />
          <Stat
            label={t("stats.avgRating")}
            value={user?.stats?.avgRating}
            valueClass="text-amber-500"
            isRtl={isRtl}
          />
          <Stat
            label={t("stats.reviewsGiven")}
            value={user?.stats?.reviewsGiven}
            isRtl={isRtl}
          />
          <Stat
            label={t("stats.lastActive")}
            value={user?.stats?.lastActive}
            isRtl={isRtl}
          />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
        <div className="rounded-[2.5rem] border border-gray-100 bg-white shadow-sm overflow-hidden h-fit">
          <div
            className={`flex items-center gap-8 border-b border-gray-50 px-8 pt-6 ${isRtl ? "flex-row-reverse" : ""}`}
          >
            <button
              onClick={() => setTab("bookings")}
              className={`text-sm font-black uppercase tracking-widest pb-4 transition-all border-b-4 ${tab === "bookings" ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-600"} cursor-pointer`}
            >
              {t("tabs.bookings", { count: user?.bookings?.length || 0 })}
            </button>
            <button
              onClick={() => setTab("reviews")}
              className={`text-sm font-black uppercase tracking-widest pb-4 transition-all border-b-4 ${tab === "reviews" ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-600"} cursor-pointer`}
            >
              {t("tabs.reviews", { count: user?.reviews?.length || 0 })}
            </button>
          </div>

          <div className="p-8">
            {tab === "bookings" && (
              <div className="space-y-4">
                {user?.bookings?.length > 0 ? (
                  user.bookings.map((booking: any) => (
                    <article
                      key={booking.id}
                      className="rounded-[1.5rem] border border-gray-50 bg-[#F9FAFB]/50 p-6 transition-all hover:border-primary/20 hover:bg-white group"
                    >
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div
                          className={`space-y-2 ${isRtl ? "text-right" : "text-left"}`}
                        >
                          <div
                            className={`flex items-center gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
                          >
                            <span className="text-xs font-black text-primary uppercase tracking-tighter">
                              {booking.bookingRef}
                            </span>
                            <span className="rounded px-2 py-0.5 text-[10px] font-black uppercase bg-white border border-gray-100 text-gray-400">
                              {booking.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">
                            {booking.title}
                          </h3>
                          <div
                            className={`flex items-center gap-2 text-sm font-medium text-gray-500 ${isRtl ? "flex-row-reverse" : ""}`}
                          >
                            <FiCalendar size={14} className="text-gray-300" />{" "}
                            {booking.dates}
                          </div>
                          <Link
                            href={`/admin/dashboard/bookings/${booking.id}`}
                            className="inline-block mt-3 text-sm font-bold text-primary hover:underline uppercase tracking-tighter"
                          >
                            {t("tabs.viewDetails")}
                          </Link>
                        </div>
                        <div
                          className={`flex md:flex-col items-center md:items-end justify-between md:justify-start gap-3 ${isRtl ? "flex-row-reverse" : ""}`}
                        >
                          <span
                            className={`rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${booking.status === "COMPLETED" ? "bg-gray-100 text-gray-500" : booking.status === "CANCELLED" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}
                          >
                            {booking.status}
                          </span>
                          <p className="text-xl font-black text-gray-900">
                            {booking.amount}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                      {t("tabs.noBookings")}
                    </p>
                  </div>
                )}
              </div>
            )}

            {tab === "reviews" && (
              <div className="space-y-4">
                {user?.reviews?.length > 0 ? (
                  user.reviews.map((review: any) => (
                    <article
                      key={review.id}
                      className="rounded-[1.5rem] border border-gray-50 bg-[#F9FAFB]/50 p-6"
                    >
                      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div
                          className={`flex-1 ${isRtl ? "text-right" : "text-left"}`}
                        >
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">
                            {review.listingTitle}
                          </h3>
                          <div
                            className={`mt-2 flex items-center gap-2 text-yellow-500 ${isRtl ? "flex-row-reverse" : ""}`}
                          >
                            {Array.from({ length: 5 }).map((_, index) => (
                              <FiStar
                                key={index}
                                size={14}
                                className={
                                  index < Math.floor(Number(review.rating))
                                    ? "fill-current"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                            <span
                              className={`text-sm font-black text-gray-900 ${isRtl ? "mr-1" : "ml-1"}`}
                            >
                              {review.rating}
                            </span>
                          </div>
                          <p
                            className={`mt-5 text-sm font-medium text-gray-600 leading-relaxed italic ${isRtl ? "pr-4 border-r-4" : "pl-4 border-l-4"} border-primary/10`}
                          >
                            "{review.comment}"
                          </p>
                        </div>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest shrink-0">
                          {review.date}
                        </p>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[2rem]">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                      {t("tabs.noReviews")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
          <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight text-start">
              {t("notes.title")}
            </h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t("notes.placeholder")}
              className={`mt-6 min-h-[160px] w-full rounded-2xl border border-gray-100 bg-gray-50 p-5 text-sm font-medium outline-none transition focus:border-primary focus:bg-white resize-none ${isRtl ? "text-right" : "text-left"}`}
            />
            <div
              className={`mt-4 flex ${isRtl ? "justify-start" : "justify-end"}`}
            >
              <button
                onClick={handleSaveNotes}
                disabled={isSavingNote}
                className="rounded-2xl bg-primary px-8 py-4 text-sm font-black text-white hover:opacity-90 shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isSavingNote ? t("notes.saving") : t("notes.saveBtn")}
              </button>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-gray-100 bg-[#F9FAFB] p-8">
            <div
              className={`flex items-center gap-3 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ${isRtl ? "flex-row-reverse" : ""}`}
            >
              <FiCheckCircle className="text-green-500" size={16} />{" "}
              {t("accountStatus.title")}
            </div>
            <p
              className={`mt-4 text-sm font-medium text-gray-500 leading-relaxed ${isRtl ? "text-right" : "text-left"}`}
            >
              {isSuspended
                ? t("accountStatus.suspendedDesc")
                : t("accountStatus.activeDesc")}
            </p>
          </div>
        </aside>
      </div>

      {/* <Modal
        isOpen={modalType === "SUSPEND"}
        onClose={() => setModalType(null)}
        title={
          isSuspended ? t("modals.activateTitle") : t("modals.suspendTitle")
        }
      >
        <div className="text-center space-y-6">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm ${isSuspended ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
          >
            {isSuspended ? (
              <FiUserCheck size={32} />
            ) : (
              <FiAlertTriangle size={32} />
            )}
          </div>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">
            {t.rich(
              isSuspended ? "modals.activateDesc" : "modals.suspendDesc",
              {
                name: () => (
                  <span className="text-gray-900 font-bold">
                    {user?.header?.name}
                  </span>
                ),
              },
            )}
          </p>
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => setModalType(null)}
              className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 cursor-pointer"
            >
              {t("modals.cancel")}
            </button>
            <button
              onClick={handleSuspendConfirm}
              disabled={isSuspending}
              className={`flex-1 py-4 text-white rounded-2xl font-black shadow-lg ${isSuspended ? "bg-green-600" : "bg-red-600"}`}
            >
              {isSuspending ? t("modals.processing") : t("modals.confirmBtn")}
            </button>
          </div>
        </div>
      </Modal> */}

      <Modal
        isOpen={modalType === "SUSPEND"}
        onClose={() => setModalType(null)}
        title={
          isSuspended ? t("modals.activateTitle") : t("modals.suspendTitle")
        }
      >
        <div className="text-center space-y-6">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm ${
              isSuspended
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {isSuspended ? (
              <FiUserCheck size={32} />
            ) : (
              <FiAlertTriangle size={32} />
            )}
          </div>
          <p className="text-gray-500 text-sm leading-relaxed font-medium">
            {t.rich(
              isSuspended ? "modals.activateDesc" : "modals.suspendDesc",
              {
                name: () => (
                  <span className="text-gray-900 font-bold">
                    {user?.header?.name}
                  </span>
                ),
              },
            )}
          </p>
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => setModalType(null)}
              className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 cursor-pointer"
            >
              {t("modals.cancel")}
            </button>
            <button
              onClick={handleSuspendConfirm}
              disabled={isProcessing} // Combined loading state
              className={`flex-1 py-4 text-white rounded-2xl font-black shadow-lg transition-all active:scale-95 disabled:opacity-50 ${
                isSuspended
                  ? "bg-green-600 shadow-green-100"
                  : "bg-red-600 shadow-red-100"
              }`}
            >
              {isProcessing ? t("modals.processing") : t("modals.confirmBtn")}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalType === "CONTACT"}
        onClose={() => setModalType(null)}
        title={t("modals.contactTitle")}
      >
        <ContactUserForm
          emailTo={user?.header?.email || ""}
          onSubmit={handleContactSubmit}
          isLoading={isSendingEmail}
        />
      </Modal>
    </div>
  );
}

function Stat({ label, value, valueClass = "text-gray-900", isRtl }: any) {
  return (
    <div
      className={`flex flex-col ${isRtl ? "items-end text-right" : "items-start text-left"}`}
    >
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className={`text-xl font-black ${valueClass}`}>{value || "0"}</p>
    </div>
  );
}
