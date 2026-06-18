// "use client";

// import React, { useState } from "react";
// import { UserCheck, Calendar } from "lucide-react";
// import { toast } from "sonner";
// import BookingCard from "@/components/booking/BookingCard";
// import FormInput from "@/components/booking/FormInput";
// import ImageUploader from "@/components/common/ImageUploader";
// import Image from "next/image";
// import {
//   useGetUserProfileQuery,
//   useUpdateProfileMutation,
// } from "@/redux/features/userApis/userApis";
// import { useGetMyBookingsQuery } from "@/redux/features/bookingApis/bookingApis";

// const AccountClient = () => {
//   const [activeTab, setActiveTab] = useState<"bookings" | "info">("bookings");
//   const [updateProfile, { isLoading }] = useUpdateProfileMutation();
//   const { data: userData } = useGetUserProfileQuery(undefined);
//   const profile = userData?.data;

//   const { data: myBookingData } = useGetMyBookingsQuery(undefined);
//   const myBookings = myBookingData?.data || [];

//   // Personal Info State
//   const [profileData, setProfileData] = useState({
//     fullName: profile?.fullName,
//     email: profile?.email,
//     phone: profile?.phoneNumber,
//   });

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   console.log(myBookings, "file");

//   const handleUpdateProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const toastId = toast.loading("Updating Profile...");

//     try {
//       const formData = new FormData();

//       if (selectedFile) {
//         formData.append("file", selectedFile);
//       }

//       formData.append(
//         "data",
//         JSON.stringify({
//           fullName: profileData.fullName,
//           phoneNumber: profileData.phone,
//         }),
//       );

//       const res = await updateProfile(formData).unwrap();

//       toast.success(res?.message || "Profile updated successfully!", {
//         id: toastId,
//       });
//     } catch (error: any) {
//       toast.error(
//         error?.data?.message || error?.message || "Failed to update profile",
//         { id: toastId },
//       );
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       <div className="mb-10">
//         <h1 className="text-3xl font-extrabold text-gray-900">My Account</h1>
//         <p className="text-gray-500 font-medium">
//           Manage your bookings and personal information
//         </p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//         {/* SIDEBAR */}
//         <div className="lg:col-span-3">
//           <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-8 flex flex-col items-center text-center">
//             <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 bg-gray-300">
//               <Image
//                 src={
//                   profile?.profileImage ||
//                   "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80"
//                 }
//                 fill
//                 alt="profile"
//                 className="object-cover"
//               />
//             </div>
//             <h2 className="text-xl font-bold text-gray-900">
//               {profile?.fullName}
//             </h2>
//             <p className="text-xs text-gray-400 font-medium mb-6">
//               Member since {new Date(profile?.createdAt).getFullYear()}
//             </p>

//             <div className="w-full space-y-3 text-sm font-medium">
//               <div className="flex items-center gap-2 text-gray-500">
//                 <UserCheck size={16} className="text-gray-400" />
//                 <span>Verified profile</span>
//               </div>
//               <div className="flex items-center gap-2 text-gray-500">
//                 <Calendar size={16} className="text-gray-400" />
//                 <span>{profile?.bookings?.length || 0} bookings</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MAIN CONTENT */}
//         <div className="lg:col-span-9 space-y-6">
//           {/* TAB SWITCHER */}
//           <div className="bg-[#E5E7EB]/50 p-1.5 rounded-2xl flex max-w-md">
//             <button
//               onClick={() => setActiveTab("bookings")}
//               className={`flex-1 py-3 text-sm font-bold rounded-xl transition ${activeTab === "bookings" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
//             >
//               My Bookings
//             </button>
//             <button
//               onClick={() => setActiveTab("info")}
//               className={`flex-1 py-3 text-sm font-bold rounded-xl transition ${activeTab === "info" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
//             >
//               Personal Info
//             </button>
//           </div>

//           {/* VIEW: MY BOOKINGS */}
//           {activeTab === "bookings" && (
//             <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-6 md:p-8 space-y-4">
//               {myBookings?.length === 0 ? (
//                 <h3 className="text-center">No Booking Found</h3>
//               ) : (
//                 myBookings?.map((booking: any, index: number) => {
//                   return <BookingCard key={booking.id} booking={booking} />;
//                 })
//               )}
//             </div>
//           )}

//           {/* VIEW: PERSONAL INFO */}
//           {activeTab === "info" && (
//             <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-8 md:p-10">
//               <form
//                 onSubmit={handleUpdateProfile}
//                 className="space-y-8 max-w-2xl"
//               >
//                 <div>
//                   <label className="text-sm font-bold text-gray-900 mb-4 block">
//                     Profile Photo
//                   </label>
//                   {/* Reusable Image Uploader */}
//                   <ImageUploader
//                     initialImage={
//                       profile?.profileImage ||
//                       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80"
//                     }
//                     onFileSelect={(file) => setSelectedFile(file)}
//                   />
//                 </div>

//                 <FormInput
//                   label="Full Name"
//                   name="fullName"
//                   placeholder="Name"
//                   value={profileData.fullName}
//                   defaultValue={profile?.fullName}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, fullName: e.target.value })
//                   }
//                 />
//                 <FormInput
//                   disabled={true}
//                   label="Email"
//                   name="email"
//                   type="email"
//                   defaultValue={profile?.email}
//                   placeholder="Email"
//                   value={profileData.email}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, email: e.target.value })
//                   }
//                 />
//                 <FormInput
//                   label="Phone Number"
//                   name="phone"
//                   defaultValue={profile?.phoneNumber}
//                   placeholder="Phone"
//                   value={profileData.phone}
//                   onChange={(e) =>
//                     setProfileData({ ...profileData, phone: e.target.value })
//                   }
//                 />

//                 <button
//                   type="submit"
//                   className="bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity cursor-pointer"
//                 >
//                   Save Changes
//                 </button>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountClient;

"use client";

import React, { useState } from "react";
import { UserCheck, Calendar } from "lucide-react";
import { toast } from "sonner";
import BookingCard from "@/components/booking/BookingCard";
import FormInput from "@/components/booking/FormInput";
import ImageUploader from "@/components/common/ImageUploader";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl"; // Added
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/userApis/userApis";
import { useGetMyBookingsQuery } from "@/redux/features/bookingApis/bookingApis";

const AccountClient = () => {
  const t = useTranslations("Account"); // Added
  const locale = useLocale(); // Added
  const isRtl = locale === "ar"; // Added

  const [activeTab, setActiveTab] = useState<"bookings" | "info">("bookings");
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: userData } = useGetUserProfileQuery(undefined);
  const profile = userData?.data;

  const { data: myBookingData } = useGetMyBookingsQuery(undefined);
  const myBookings = myBookingData?.data || [];

  const [profileData, setProfileData] = useState({
    fullName: profile?.fullName,
    email: profile?.email,
    phone: profile?.phoneNumber,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading(t("messages.updating")); // Dynamic

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      formData.append(
        "data",
        JSON.stringify({
          fullName: profileData.fullName,
          phoneNumber: profileData.phone,
        }),
      );

      const res = await updateProfile(formData).unwrap();
      toast.success(res?.message || t("messages.success"), { id: toastId }); // Dynamic
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || t("messages.failed"), // Dynamic
        { id: toastId },
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">{t("title")}</h1>
        <p className="text-gray-500 font-medium">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR */}
        <div className="lg:col-span-3">
          <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-8 flex flex-col items-center text-center">
            <div className="relative w-28 h-28 rounded-full overflow-hidden mb-4 bg-gray-300">
              <Image
                src={
                  profile?.profileImage ||
                  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80"
                }
                fill
                alt="profile"
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {profile?.fullName}
            </h2>
            <p className="text-xs text-gray-400 font-medium mb-6">
              {t("sidebar.memberSince")}{" "}
              {profile?.createdAt
                ? new Date(profile.createdAt).getFullYear()
                : ""}
            </p>

            <div className="w-full space-y-3 text-sm font-medium">
              <div className="flex items-center gap-2 text-gray-500">
                <UserCheck size={16} className="text-gray-400" />
                <span>{t("sidebar.verified")}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar size={16} className="text-gray-400" />
                <span>
                  {profile?.bookings?.length || 0} {t("sidebar.bookings")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB SWITCHER */}
          <div className="bg-[#E5E7EB]/50 p-1.5 rounded-2xl flex max-w-md">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition ${activeTab === "bookings" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {t("tabs.bookings")}
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition ${activeTab === "info" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {t("tabs.info")}
            </button>
          </div>

          {/* VIEW: MY BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-6 md:p-8 space-y-4">
              {myBookings?.length === 0 ? (
                <h3 className="text-center">{t("bookings.empty")}</h3>
              ) : (
                myBookings?.map((booking: any) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              )}
            </div>
          )}

          {/* VIEW: PERSONAL INFO */}
          {activeTab === "info" && (
            <div className="bg-[#F3F4F6]/50 border border-gray-200 rounded-[2.5rem] p-8 md:p-10">
              <form
                onSubmit={handleUpdateProfile}
                className="space-y-8 max-w-2xl"
              >
                <div>
                  <label className="text-sm font-bold text-gray-900 mb-4 block">
                    {t("info.photoLabel")}
                  </label>
                  <ImageUploader
                    initialImage={
                      profile?.profileImage ||
                      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80"
                    }
                    onFileSelect={(file) => setSelectedFile(file)}
                  />
                </div>

                <FormInput
                  label={t("info.nameLabel")}
                  name="fullName"
                  placeholder={t("info.namePlaceholder")}
                  value={profileData.fullName}
                  defaultValue={profile?.fullName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, fullName: e.target.value })
                  }
                />
                <FormInput
                  disabled={true}
                  label={t("info.emailLabel")}
                  name="email"
                  type="email"
                  defaultValue={profile?.email}
                  placeholder={t("info.emailPlaceholder")}
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                />
                <FormInput
                  label={t("info.phoneLabel")}
                  name="phone"
                  defaultValue={profile?.phoneNumber}
                  placeholder={t("info.phonePlaceholder")}
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                />

                <button
                  type="submit"
                  className="bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {t("info.saveBtn")}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountClient;
