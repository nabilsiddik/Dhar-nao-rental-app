// "use client";

// import {
//   ArrowLeft,
//   Heart,
//   Star,
//   MapPin,
//   Check,
//   Loader2,
//   AlertCircle,
//   LogIn,
// } from "lucide-react";
// import Image from "next/image";
// import ReservationSidebar from "@/components/listing/ReservationSidebar";
// import ReviewCard from "@/components/listing/ReviewCard";
// import { useGetSingleListingQuery } from "@/redux/features/listingApis/listingApis";
// import { toast } from "sonner";
// import {
//   useGetMyWishlistQuery,
//   useToggleWishlistMutation,
// } from "@/redux/features/wishlist/wishlistApi";
// import { useGetBookedDatesQuery } from "@/redux/features/bookingApis/bookingApis";
// import { useSelector } from "react-redux";
// import { selectCurrentUser } from "@/redux/features/auth/authSlice";
// import Modal from "@/components/common/modals/Modal";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// const ListingDetailsClient = ({ id }: { id: string }) => {
//   const myWishlistData = useGetMyWishlistQuery(undefined);
//   const myWishlist = myWishlistData?.data?.data || [];
//   const isInWishlist = myWishlist.some((item: any) => item?.listingId === id);
//   const user = useSelector(selectCurrentUser);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const startDate = searchParams.get("startDate");
//   console.log(startDate, "dmi ");

//   // Fetch real data
//   const { data, isLoading, isError } = useGetSingleListingQuery(id);
//   const listing = data?.data;

//   // Get already booked dates for this listing
//   const { data: bookedDatesData } = useGetBookedDatesQuery(id);
//   const bookedDates = bookedDatesData?.data || [];

//   console.log(id, "my booked dates");

//   const [toggleWishlist] = useToggleWishlistMutation();

//   const handleToggleWishlist = async () => {
//     if (!user) {
//       setIsLoginModalOpen(true);
//       return;
//     }

//     const toastId = toast.loading("Updating your wishlist...");
//     try {
//       const result = await toggleWishlist(id).unwrap();

//       if (result?.success && result?.message) {
//         toast.success(result.message || "Wishlist updated successfully!", {
//           id: toastId,
//         });
//       }
//     } catch (error) {
//       console.error("Error toggling wishlist:", error);
//       toast.error("Failed to update wishlist. Please try again.", {
//         id: toastId,
//       });
//     }
//   };

//   // Loading & Error States
//   if (isLoading) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-primary" size={40} />
//         <p className="text-gray-500 font-medium tracking-tight text-lg">
//           Loading listing details...
//         </p>
//       </div>
//     );
//   }

//   if (isError || !listing) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">
//           Listing not found
//         </h2>
//         <p className="text-gray-500 mb-6">
//           The listing you are looking for doesn't exist or was removed.
//         </p>
//         <button
//           onClick={() => window.history.back()}
//           className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   // 3. Dynamic Logic for Specifications
//   const isCar = listing.category === "CAR";

//   // Combine all specific details for the "Specifications" grid
//   const specifications = isCar
//     ? {
//         Type: listing.carDetails?.cartType,
//         Model: listing.carDetails?.model,
//         Year: listing.carDetails?.year,
//         Transmission: listing.carDetails?.transmission,
//         Fuel: listing.carDetails?.fuelType,
//         Seats: listing.carDetails?.seats,
//         Mileage: listing.carDetails?.mileage,
//       }
//     : {
//         Type: "Apartment",
//         Location: listing.city,
//         Status: "Verified",
//       };

//   // Features or Amenities list
//   const features = isCar
//     ? listing.carDetails?.features
//     : listing.apartmentDetails?.amenities;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Top Navigation */}
//       <button
//         onClick={() => window.history.back()}
//         className="p-2 hover:bg-gray-100 rounded-full transition mb-4 cursor-pointer"
//       >
//         <ArrowLeft size={24} />
//       </button>

//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
//           <p className="text-gray-500 font-medium mt-1 uppercase tracking-wider text-sm">
//             {listing.category}
//           </p>
//           <div className="flex items-center gap-4 mt-3 text-sm">
//             <div className="flex items-center gap-1">
//               <Star size={16} className="fill-black text-black" />
//               <span className="font-bold text-gray-900">
//                 {listing.avgRating.toFixed(1)}
//               </span>
//               <span className="text-gray-500">
//                 ({listing.totalReviews} reviews)
//               </span>
//             </div>
//             <div className="flex items-center gap-1 text-gray-500 font-medium border-l pl-4 border-gray-200">
//               <MapPin size={16} className="text-primary" />
//               <span>
//                 {listing.city}, {listing.country}
//               </span>
//             </div>
//           </div>
//         </div>
//         <button
//           onClick={handleToggleWishlist}
//           className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-700 cursor-pointer shadow-sm active:scale-95"
//         >
//           <Heart
//             size={18}
//             className={isInWishlist ? "fill-red-500 text-red-500" : ""}
//           />
//           {isInWishlist ? "Saved" : "Save"}
//         </button>

//         {/* 2. LOGIN REQUIRED MODAL */}
//         <Modal
//           isOpen={isLoginModalOpen}
//           onClose={() => setIsLoginModalOpen(false)}
//           title="Sign in required"
//         >
//           <div className="text-center space-y-6">
//             {/* Icon */}
//             <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
//               <AlertCircle size={32} />
//             </div>

//             {/* Text */}
//             <div className="space-y-2">
//               <h3 className="text-xl font-bold text-gray-900 leading-tight">
//                 Save for your next adventure
//               </h3>
//               <p className="text-sm text-gray-500 leading-relaxed font-medium">
//                 Create a personal wishlist and save your favorite cars or
//                 apartments so you can find them easily later.
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col gap-3 pt-4">
//               <button
//                 onClick={() => router.push("/auth/signin")}
//                 className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 cursor-pointer"
//               >
//                 <LogIn size={18} /> Sign In to Continue
//               </button>
//               <button
//                 onClick={() => setIsLoginModalOpen(false)}
//                 className="w-full py-4 rounded-2xl font-bold text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
//               >
//                 Maybe later
//               </button>
//             </div>
//           </div>
//         </Modal>
//       </div>

//       {/* Image Gallery Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[500px] mb-12 rounded-[2.5rem] overflow-hidden">
//         {/* Main Image */}
//         <div className="md:col-span-2 relative h-64 md:h-full bg-gray-100">
//           <Image
//             src={
//               listing.images[0] ||
//               "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
//             }
//             alt="Main photo"
//             fill
//             className="object-cover"
//           />
//         </div>
//         {/* Side Images */}
//         <div className="md:col-span-1 flex flex-col gap-4">
//           <div className="relative flex-1 h-40 bg-gray-100">
//             <Image
//               src={listing.images[1] || listing.images[0]}
//               alt="Side 1"
//               fill
//               className="object-cover"
//             />
//           </div>
//           <div className="relative flex-1 h-40 bg-gray-100">
//             <Image
//               src={listing.images[2] || listing.images[0]}
//               alt="Side 2"
//               fill
//               className="object-cover"
//             />
//           </div>
//         </div>
//         {/* Final Image */}
//         <div className="md:col-span-1 relative h-40 md:h-full bg-gray-100">
//           <Image
//             src={listing.images[3] || listing.images[0]}
//             alt="Side 3"
//             fill
//             className="object-cover"
//           />
//         </div>
//       </div>

//       {/* Main Content Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
//         {/* Left Side: Info */}
//         <div className="lg:col-span-8">
//           {/* Specifications */}
//           <section className="mb-10">
//             <h2 className="text-xl font-bold mb-6 text-gray-900">
//               {isCar ? "Vehicle Specifications" : "Property Details"}
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {Object.entries(specifications).map(([key, value]) => (
//                 <div
//                   key={key}
//                   className="bg-gray-50 p-5 rounded-2xl border border-gray-100/50 shadow-sm transition-all hover:border-primary/20"
//                 >
//                   <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
//                     {key}
//                   </p>
//                   <p className="text-gray-900 font-extrabold text-base capitalize">
//                     {value?.toString() || "N/A"}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           <hr className="border-gray-100 my-10" />

//           {/* About */}
//           <section className="mb-10">
//             <h2 className="text-xl font-bold mb-5 text-gray-900">
//               Description
//             </h2>
//             <p className="text-gray-600 leading-relaxed text-base">
//               {listing.description}
//             </p>
//           </section>

//           <hr className="border-gray-100 my-10" />

//           {/* Features */}
//           <section className="mb-10">
//             <h2 className="text-xl font-bold mb-6 text-gray-900">
//               Features & Amenities
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5">
//               {features?.length > 0 &&
//                 features?.map((feature: string) => (
//                   <div
//                     key={feature}
//                     className="flex items-center gap-3 text-gray-700 font-medium"
//                   >
//                     <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">
//                       <Check size={14} strokeWidth={4} />
//                     </div>
//                     {feature}
//                   </div>
//                 ))}
//             </div>
//           </section>

//           {/* House Rules for Apartment */}
//           {!isCar && listing?.apartmentDetails?.rules?.length > 0 && (
//             <>
//               <hr className="border-gray-100 my-10" />
//               <section className="mb-10">
//                 <h2 className="text-xl font-bold mb-6 text-gray-900">
//                   House Rules
//                 </h2>
//                 <div className="space-y-4">
//                   {listing.apartmentDetails.rules.map(
//                     (rule: string, i: number) => (
//                       <div
//                         key={i}
//                         className="flex items-center gap-3 text-gray-500"
//                       >
//                         <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
//                         <span className="font-medium">{rule}</span>
//                       </div>
//                     ),
//                   )}
//                 </div>
//               </section>
//             </>
//           )}

//           <hr className="border-gray-100 my-10" />

//           {/* Reviews List */}
//           <section className="pb-10">
//             <div className="flex items-center gap-2 mb-8">
//               <Star size={24} className="fill-black" />
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {listing?.avgRating?.toFixed(1)} • {listing?.totalReviews}{" "}
//                 reviews
//               </h2>
//             </div>
//             <div className="grid grid-cols-1 gap-4">
//               {listing?.reviews?.length > 0 ? (
//                 listing?.reviews.map((review: any) => (
//                   <ReviewCard
//                     key={review.id}
//                     name={review.user?.fullName || "Verified User"}
//                     date={new Date(review.createdAt).toLocaleDateString(
//                       "en-US",
//                       { month: "long", year: "numeric" },
//                     )}
//                     rating={review?.rating}
//                     comment={review?.comment}
//                     profileImage={review?.user?.profileImage}
//                   />
//                 ))
//               ) : (
//                 <p className="text-gray-400 font-medium italic py-6">
//                   No reviews yet for this listing.
//                 </p>
//               )}
//             </div>
//           </section>
//         </div>

//         {/* Right Side: Sticky Sidebar */}
//         <div className="lg:col-span-4">
//           <div className="sticky top-28">
//             {/* Pass the real listing object to handle price calculation */}
//             <ReservationSidebar
//               listing={listing}
//               bookedDates={bookedDates}
//               startDate={startDate}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListingDetailsClient;

"use client";

import {
  ArrowLeft,
  Heart,
  Star,
  MapPin,
  Check,
  Loader2,
  AlertCircle,
  LogIn,
} from "lucide-react";
import Image from "next/image";
import ReservationSidebar from "@/components/listing/ReservationSidebar";
import ReviewCard from "@/components/listing/ReviewCard";
import { useGetSingleListingQuery } from "@/redux/features/listingApis/listingApis";
import { toast } from "sonner";
import {
  useGetMyWishlistQuery,
  useToggleWishlistMutation,
} from "@/redux/features/wishlist/wishlistApi";
import { useGetBookedDatesQuery } from "@/redux/features/bookingApis/bookingApis";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import Modal from "@/components/common/modals/Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

const ListingDetailsClient = ({ id }: { id: string }) => {
  const t = useTranslations("Listing");
  const locale = useLocale();
  const isRtl = locale === "ar";

  console.log(id, "listing id");

  const myWishlistData = useGetMyWishlistQuery(undefined);
  const myWishlist = myWishlistData?.data?.data || [];
  const isInWishlist = myWishlist.some((item: any) => item?.listingId === id);
  const user = useSelector(selectCurrentUser);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const startDate = searchParams.get("startDate");

  // Fetch real data
  const { data, isLoading, isError } = useGetSingleListingQuery(id);
  const listing = data?.data;

  // Get already booked dates for this listing
  const { data: bookedDatesData } = useGetBookedDatesQuery(id);
  const bookedDates = bookedDatesData?.data || [];

  const [toggleWishlist] = useToggleWishlistMutation();

  const handleToggleWishlist = async () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    const toastId = toast.loading(t("toasts.updating"));
    try {
      const result = await toggleWishlist(id).unwrap();

      if (result?.success && result?.message) {
        toast.success(t("toasts.success"), { id: toastId });
      }
    } catch (error) {
      toast.error(t("toasts.error"), { id: toastId });
    }
  };

  // Loading & Error States
  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-gray-500 font-medium tracking-tight text-lg">
          {t("loading")}
        </p>
      </div>
    );
  }

  if (isError || !listing) {
    return (
      <div
        className="h-[60vh] flex flex-col items-center justify-center text-center px-4"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {t("notFound")}
        </h2>
        <p className="text-gray-500 mb-6">{t("notFoundDesc")}</p>
        <button
          onClick={() => window.history.back()}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
        >
          {t("goBack")}
        </button>
      </div>
    );
  }

  const isCar = listing.category === "CAR";

  // Specification Mapping with Translated Keys
  const specifications = isCar
    ? [
        { label: t("specs.Type"), value: listing.carDetails?.cartType },
        { label: t("specs.Model"), value: listing.carDetails?.model },
        { label: t("specs.Year"), value: listing.carDetails?.year },
        {
          label: t("specs.Transmission"),
          value: listing.carDetails?.transmission,
        },
        { label: t("specs.Fuel"), value: listing.carDetails?.fuelType },
        { label: t("specs.Seats"), value: listing.carDetails?.seats },
        { label: t("specs.Mileage"), value: listing.carDetails?.mileage },
      ]
    : [
        { label: t("specs.Type"), value: "Apartment" },
        { label: t("specs.Location"), value: listing.city },
        { label: t("specs.Status"), value: "Verified" },
      ];

  const features = isCar
    ? listing.carDetails?.features
    : listing.apartmentDetails?.amenities;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" dir={isRtl ? "rtl" : "ltr"}>
      {/* Top Navigation */}
      <button
        onClick={() => window.history.back()}
        className={`p-2 hover:bg-gray-100 rounded-full transition mb-4 cursor-pointer ${isRtl ? "rotate-180" : ""}`}
      >
        <ArrowLeft size={24} />
      </button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
          <p className="text-gray-500 font-medium mt-1 uppercase tracking-wider text-sm">
            {listing.category}
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-black text-black" />
              <span className="font-bold text-gray-900">
                {listing.avgRating.toFixed(1)}
              </span>
              <span className="text-gray-500">
                ({listing.totalReviews} {t("reviews")})
              </span>
            </div>
            <div
              className={`flex items-center gap-1 text-gray-500 font-medium border-gray-200 ${isRtl ? "border-r pr-4" : "border-l pl-4"}`}
            >
              <MapPin size={16} className="text-primary" />
              <span>
                {listing.city}, {listing.country}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleToggleWishlist}
          className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-700 cursor-pointer shadow-sm active:scale-95"
        >
          <Heart
            size={18}
            className={isInWishlist ? "fill-red-500 text-red-500" : ""}
          />
          {isInWishlist ? t("saved") : t("save")}
        </button>

        <Modal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          title={t("loginModal.title")}
        >
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {t("loginModal.heading")}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                {t("loginModal.desc")}
              </p>
            </div>
            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={() => router.push("/auth/signin")}
                className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 cursor-pointer"
              >
                <LogIn size={18} /> {t("loginModal.signIn")}
              </button>
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="w-full py-4 rounded-2xl font-bold text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {t("loginModal.later")}
              </button>
            </div>
          </div>
        </Modal>
      </div>

      {/* Image Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[500px] mb-12 rounded-[2.5rem] overflow-hidden">
        <div className="md:col-span-2 relative h-64 md:h-full bg-gray-100">
          <Image
            src={
              listing.images[0] ||
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
            }
            alt="Main photo"
            fill
            className="object-cover"
          />
        </div>
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="relative flex-1 h-40 bg-gray-100">
            <Image
              src={listing.images[1] || listing.images[0]}
              alt="Side 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative flex-1 h-40 bg-gray-100">
            <Image
              src={listing.images[2] || listing.images[0]}
              alt="Side 2"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-1 relative h-40 md:h-full bg-gray-100">
          <Image
            src={listing.images[3] || listing.images[0]}
            alt="Side 3"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-6 text-gray-900">
              {isCar ? t("specTitleCar") : t("specTitleApartment")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {specifications.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-gray-50 p-5 rounded-2xl border border-gray-100/50 shadow-sm transition-all hover:border-primary/20"
                >
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">
                    {spec.label}
                  </p>
                  <p className="text-gray-900 font-extrabold text-base capitalize">
                    {spec.value?.toString() || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gray-100 my-10" />

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-5 text-gray-900">
              {t("description")}
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              {listing.description}
            </p>
          </section>

          <hr className="border-gray-100 my-10" />

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-6 text-gray-900">
              {t("features")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5">
              {features?.length > 0 &&
                features.map((feature: string) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-gray-700 font-medium"
                  >
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    {feature}
                  </div>
                ))}
            </div>
          </section>

          {!isCar && listing?.apartmentDetails?.rules?.length > 0 && (
            <>
              <hr className="border-gray-100 my-10" />
              <section className="mb-10">
                <h2 className="text-xl font-bold mb-6 text-gray-900">
                  {t("houseRules")}
                </h2>
                <div className="space-y-4">
                  {listing.apartmentDetails.rules.map(
                    (rule: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-gray-500"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                        <span className="font-medium">{rule}</span>
                      </div>
                    ),
                  )}
                </div>
              </section>
            </>
          )}

          <hr className="border-gray-100 my-10" />

          <section className="pb-10">
            <div className="flex items-center gap-2 mb-8">
              <Star size={24} className="fill-black" />
              <h2 className="text-2xl font-bold text-gray-900">
                {listing?.avgRating?.toFixed(1)} • {listing?.totalReviews}{" "}
                {t("reviews")}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {listing?.reviews?.length > 0 ? (
                listing?.reviews.map((review: any) => (
                  <ReviewCard
                    key={review.id}
                    name={review.user?.fullName || "Verified User"}
                    date={new Date(review.createdAt).toLocaleDateString(
                      locale,
                      { month: "long", year: "numeric" },
                    )}
                    rating={review?.rating}
                    comment={review?.comment}
                    profileImage={review?.user?.profileImage}
                  />
                ))
              ) : (
                <p className="text-gray-400 font-medium italic py-6">
                  {t("noReviews")}
                </p>
              )}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-28">
            <ReservationSidebar
              listing={listing}
              bookedDates={bookedDates}
              startDate={startDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsClient;
