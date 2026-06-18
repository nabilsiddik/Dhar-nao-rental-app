// "use client";
// import {
//   useGetCommissionCalculatorQuery,
//   useGetSettingsQuery,
//   useUpdateSettingsMutation,
// } from "@/redux/features/admin/commission.api";
// import { Loader2, Save } from "lucide-react";
// import { useEffect, useState } from "react";
// import { FiSave } from "react-icons/fi";
// import { toast } from "sonner";

// const Commission = () => {
//   const { data: commissionData, isLoading } =
//     useGetCommissionCalculatorQuery(undefined);
//   const { data: settingsData, isLoading: isFetching } =
//     useGetSettingsQuery(undefined);

//   const commission = commissionData?.data || null;
//   const settings = settingsData?.data;
//   const [updateSettings, { isLoading: isUpdating }] =
//     useUpdateSettingsMutation();

//   const [globalRate, setGlobalRate] = useState("10");
//   const [useGlobalRate, setUseGlobalRate] = useState(true);
//   const [carRate, setCarRate] = useState("10");
//   const [apartmentRate, setApartmentRate] = useState("10");

//   useEffect(() => {
//     if (settings) {
//       setGlobalRate(settings.globalRate);
//       setUseGlobalRate(settings.useGlobalForAll);
//       setCarRate(settings.carRate);
//       setApartmentRate(settings.apartmentRate);
//     }
//   }, [settings]);

//   console.log({
//     globalRate,
//     useGlobalRate,
//     carRate,
//     apartmentRate,
//   });

//   const handleSave = async () => {
//     const toastId = toast.loading("Updating commission settings...");

//     const payload = {
//       globalRate: Number(globalRate),
//       useGlobalForAll: useGlobalRate,
//       carRate: Number(carRate),
//       apartmentRate: Number(apartmentRate),
//     };

//     try {
//       const res = await updateSettings(payload).unwrap();
//       if (res?.success) {
//         toast.success(res?.message || "Settings updated successfully!", {
//           id: toastId,
//         });
//       }
//     } catch (error: any) {
//       const errorMsg = error?.data?.message || "Failed to update settings.";
//       toast.error(errorMsg, { id: toastId });
//     }
//   };

//   if (isFetching) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-primary" size={40} />
//         <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
//           Fetching Settings...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900">
//             Commission Settings
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Configure commission rates for bookings
//           </p>
//         </div>

//         <button
//           onClick={handleSave}
//           disabled={isUpdating}
//           className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700"
//         >
//           {isUpdating ? (
//             <Loader2 className="animate-spin" size={18} />
//           ) : (
//             <Save size={18} />
//           )}
//           Save Changes
//         </button>
//       </div>

//       <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
//         <div className="space-y-5">
//           <div>
//             <h2 className="text-lg font-semibold text-gray-900">
//               Global Commission Rate
//             </h2>
//           </div>

//           <div className="flex items-start gap-4">
//             <div className="w-full max-w-35">
//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 Default Commission Rate (%)
//               </label>
//               <input
//                 value={globalRate}
//                 onChange={(e) => setGlobalRate(e.target.value)}
//                 type="number"
//                 className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-purple-400"
//               />
//             </div>
//             <p className="pt-9 text-sm text-gray-500">
//               Applied to all bookings unless category-specific rates are set
//             </p>
//           </div>

//           <label className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
//             <input
//               checked={useGlobalRate}
//               onChange={(e) => setUseGlobalRate(e.target.checked)}
//               type="checkbox"
//               className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//             />
//             <span>
//               <span className="block text-sm font-medium text-gray-900">
//                 Use global rate for all categories
//               </span>
//               <span className="block text-sm text-gray-500">
//                 Override category-specific commission rates
//               </span>
//             </span>
//           </label>
//         </div>
//       </div>

//       <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
//         <div className="space-y-5">
//           <h2 className="text-lg font-semibold text-gray-900">
//             Category-Specific Rates
//           </h2>

//           <div className="grid gap-5 md:grid-cols-2">
//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 Car Rentals Commission (%)
//               </label>
//               <div className="flex items-center gap-4">
//                 <input
//                   value={carRate}
//                   onChange={(e) => setCarRate(e.target.value)}
//                   type="number"
//                   className="w-full max-w-30 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-purple-400"
//                 />
//                 <span className="text-sm text-gray-500">
//                   Commission rate for all car rental bookings
//                 </span>
//               </div>
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 Apartment Rentals Commission (%)
//               </label>
//               <div className="flex items-center gap-4">
//                 <input
//                   value={apartmentRate}
//                   onChange={(e) => setApartmentRate(e.target.value)}
//                   type="number"
//                   className="w-full max-w-30 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-purple-400"
//                 />
//                 <span className="text-sm text-gray-500">
//                   Commission rate for all apartment rental bookings
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
//         <h2 className="text-lg font-semibold text-gray-900">
//           Commission Calculator
//         </h2>

//         <div className="mt-4 grid gap-4 md:grid-cols-3">
//           <div className="rounded-2xl bg-gray-50 p-4">
//             <p className="text-sm text-gray-500">Booking Amount</p>
//             <p className="mt-2 text-2xl font-semibold text-purple-600">
//               {commission?.bookingAmount}
//             </p>
//           </div>

//           <div className="rounded-2xl bg-purple-50 p-4">
//             <p className="text-sm text-gray-500">
//               {commission?.commissionRateLabel}
//             </p>
//             <p className="mt-2 text-2xl font-semibold text-purple-600">
//               {commission?.commissionAmount}
//             </p>
//           </div>

//           <div className="rounded-2xl bg-green-50 p-4">
//             <p className="text-sm text-gray-500">Host Payout</p>
//             <p className="mt-2 text-2xl font-semibold text-green-600">
//               {commission?.hostPayout}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Commission;

"use client";
import {
  useGetCommissionCalculatorQuery,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@/redux/features/admin/commission.api";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";

const Commission = () => {
  const t = useTranslations("AdminCommission");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const { data: commissionData } = useGetCommissionCalculatorQuery(undefined);
  const { data: settingsData, isLoading: isFetching } =
    useGetSettingsQuery(undefined);

  const commission = commissionData?.data || null;
  const settings = settingsData?.data;
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  const [globalRate, setGlobalRate] = useState("10");
  const [useGlobalRate, setUseGlobalRate] = useState(true);
  const [carRate, setCarRate] = useState("10");
  const [apartmentRate, setApartmentRate] = useState("10");

  useEffect(() => {
    if (settings) {
      setGlobalRate(settings.globalRate);
      setUseGlobalRate(settings.useGlobalForAll);
      setCarRate(settings.carRate);
      setApartmentRate(settings.apartmentRate);
    }
  }, [settings]);

  const handleSave = async () => {
    const toastId = toast.loading(t("toasts.updating"));

    const payload = {
      globalRate: Number(globalRate),
      useGlobalForAll: useGlobalRate,
      carRate: Number(carRate),
      apartmentRate: Number(apartmentRate),
    };

    try {
      const res = await updateSettings(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message || t("toasts.success"), {
          id: toastId,
        });
      }
    } catch (error: any) {
      const errorMsg = error?.data?.message || t("toasts.error");
      toast.error(errorMsg, { id: toastId });
    }
  };

  if (isFetching) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
          {t("fetching")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex items-start justify-between gap-4">
        <div className={isRtl ? "text-right" : "text-left"}>
          <h1 className="text-2xl font-semibold text-gray-900">{t("title")}</h1>
          <p className="mt-1 text-sm text-gray-500">{t("subtitle")}</p>
        </div>

        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 cursor-pointer disabled:opacity-70"
        >
          {isUpdating ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          {t("saveBtn")}
        </button>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <div className={isRtl ? "text-right" : "text-left"}>
            <h2 className="text-lg font-semibold text-gray-900">
              {t("global.title")}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="w-full max-w-xs">
              <label
                className={`mb-2 block text-sm font-medium text-gray-700 ${isRtl ? "text-right" : "text-left"}`}
              >
                {t("global.rateLabel")}
              </label>
              <input
                value={globalRate}
                onChange={(e) => setGlobalRate(e.target.value)}
                type="number"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-purple-400"
              />
            </div>
            <p
              className={`md:pt-9 text-sm text-gray-500 ${isRtl ? "text-right" : "text-left"}`}
            >
              {t("global.rateHint")}
            </p>
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 cursor-pointer">
            <input
              checked={useGlobalRate}
              onChange={(e) => setUseGlobalRate(e.target.checked)}
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 accent-purple-600"
            />
            <span className={isRtl ? "text-right" : "text-left"}>
              <span className="block text-sm font-medium text-gray-900">
                {t("global.checkboxTitle")}
              </span>
              <span className="block text-sm text-gray-500">
                {t("global.checkboxHint")}
              </span>
            </span>
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <h2
            className={`text-lg font-semibold text-gray-900 ${isRtl ? "text-right" : "text-left"}`}
          >
            {t("category.title")}
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                className={`mb-2 block text-sm font-medium text-gray-700 ${isRtl ? "text-right" : "text-left"}`}
              >
                {t("category.carLabel")}
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <input
                  value={carRate}
                  onChange={(e) => setCarRate(e.target.value)}
                  type="number"
                  className="w-full max-w-xs rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-purple-400"
                />
                <span
                  className={`text-sm text-gray-500 ${isRtl ? "text-right" : "text-left"}`}
                >
                  {t("category.carHint")}
                </span>
              </div>
            </div>

            <div>
              <label
                className={`mb-2 block text-sm font-medium text-gray-700 ${isRtl ? "text-right" : "text-left"}`}
              >
                {t("category.aptLabel")}
              </label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <input
                  value={apartmentRate}
                  onChange={(e) => setApartmentRate(e.target.value)}
                  type="number"
                  className="w-full max-w-xs rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-purple-400"
                />
                <span
                  className={`text-sm text-gray-500 ${isRtl ? "text-right" : "text-left"}`}
                >
                  {t("category.aptHint")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2
          className={`text-lg font-semibold text-gray-900 ${isRtl ? "text-right" : "text-left"}`}
        >
          {t("calculator.title")}
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              {t("calculator.bookingAmount")}
            </p>
            <p className="mt-2 text-2xl font-semibold text-purple-600">
              {commission?.bookingAmount}
            </p>
          </div>

          <div className="rounded-2xl bg-purple-50 p-4">
            <p className="text-sm text-gray-500">
              {commission?.commissionRateLabel}
            </p>
            <p className="mt-2 text-2xl font-semibold text-purple-600">
              {commission?.commissionAmount}
            </p>
          </div>

          <div className="rounded-2xl bg-green-50 p-4">
            <p className="text-sm text-gray-500">
              {t("calculator.hostPayout")}
            </p>
            <p className="mt-2 text-2xl font-semibold text-green-600">
              {commission?.hostPayout}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commission;
