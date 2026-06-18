// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useState, useRef } from "react";
// import { toast } from "sonner";
// import {
//   Car,
//   Building2,
//   Plus,
//   Upload,
//   Trash2,
//   X,
//   Check,
//   Info,
//   Settings2,
//   Image as ImageIcon,
// } from "lucide-react";
// import FormInput from "@/components/booking/FormInput";
// import { useAddListingMutation } from "@/redux/features/admin/listing.api";

// // ─── Enums ────────────────────────────────────────────────────────────────────

// const CURRENCIES = ["USD", "DZD", "EUR"] as const;
// const CAR_TYPES = [
//   "any_type",
//   "sedan",
//   "suv",
//   "luxury",
//   "van",
//   "economy",
// ] as const;
// const FUEL_TYPES = ["any", "petrol", "diesel", "electric", "hybrid"] as const;
// const TRANSMISSIONS = ["any", "automatic", "manual"] as const;

// type Currency = (typeof CURRENCIES)[number];
// type CartType = (typeof CAR_TYPES)[number];
// type FuelType = (typeof FUEL_TYPES)[number];
// type Transmission = (typeof TRANSMISSIONS)[number];

// // ─── Component ────────────────────────────────────────────────────────────────

// const AddListingForm = () => {
//   const [addListing, { isLoading }] = useAddListingMutation();

//   // ── Core State ──
//   const [category, setCategory] = useState<"CAR" | "APARTMENT">("CAR");
//   const [files, setFiles] = useState<File[]>([]);
//   const [extraCharges, setExtraCharges] = useState([{ label: "", amount: "" }]);

//   // ── Common Fields ──
//   const [basicInfo, setBasicInfo] = useState({
//     title: "",
//     description: "",
//     basePrice: "",
//     currency: "USD" as Currency,
//     country: "",
//     city: "",
//   });

//   // ── Car Specific ──
//   const [carSpecs, setCarSpecs] = useState({
//     cartType: "sedan" as CartType,
//     model: "",
//     year: "",
//     transmission: "automatic" as Transmission,
//     fuelType: "petrol" as FuelType,
//     seats: "",
//     mileage: "",
//     features: [] as string[],
//   });

//   // ── Apartment Specific ──
//   const [aptSpecs, setAptSpecs] = useState({
//     amenities: [] as string[],
//     rules: [] as string[],
//     currentRule: "",
//   });

//   // ── Handlers ──
//   const handleInputChange = (e: any) => {
//     const { name, value } = e.target;
//     setBasicInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const toggleFeature = (feature: string) => {
//     setCarSpecs((prev) => ({
//       ...prev,
//       features: prev.features.includes(feature)
//         ? prev.features.filter((f) => f !== feature)
//         : [...prev.features, feature],
//     }));
//   };

//   const toggleAmenity = (amenity: string) => {
//     setAptSpecs((prev) => ({
//       ...prev,
//       amenities: prev.amenities.includes(amenity)
//         ? prev.amenities.filter((a) => a !== amenity)
//         : [...prev.amenities, amenity],
//     }));
//   };

//   const addRule = () => {
//     if (!aptSpecs.currentRule.trim()) return;
//     setAptSpecs((prev) => ({
//       ...prev,
//       rules: [...prev.rules, prev.currentRule.trim()],
//       currentRule: "",
//     }));
//   };

//   // ── File Upload ──
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(e.target.files || []);
//     if (files.length + selectedFiles.length > 20) {
//       return toast.error("Maximum 20 photos allowed.");
//     }
//     setFiles((prev) => [...prev, ...selectedFiles]);
//     e.target.value = "";
//   };
//   const removeFile = (index: number) =>
//     setFiles((prev) => prev.filter((_, i) => i !== index));

//   // ── Validation ──
//   const validate = () => {
//     if (!basicInfo.title.trim()) {
//       toast.error("Title is required.");
//       return false;
//     }
//     if (!basicInfo.description.trim()) {
//       toast.error("Description is required.");
//       return false;
//     }
//     if (!basicInfo.basePrice) {
//       toast.error("Base price is required.");
//       return false;
//     }
//     if (!basicInfo.country.trim()) {
//       toast.error("Country is required.");
//       return false;
//     }
//     if (!basicInfo.city.trim()) {
//       toast.error("City is required.");
//       return false;
//     }
//     if (category === "CAR") {
//       if (!carSpecs.model.trim()) {
//         toast.error("Car model is required.");
//         return false;
//       }
//       if (!carSpecs.year) {
//         toast.error("Car year is required.");
//         return false;
//       }
//       if (!carSpecs.seats) {
//         toast.error("Number of seats is required.");
//         return false;
//       }
//     }
//     return true;
//   };

//   // ── Submit ──
//   const handleSubmit = async () => {
//     if (!validate()) return;

//     // Build the JSON data object
//     const dataPayload: Record<string, any> = {
//       title: basicInfo.title.trim(),
//       description: basicInfo.description.trim(),
//       category,
//       city: basicInfo.city.trim(),
//       country: basicInfo.country.trim(),
//       basePrice: Number(basicInfo.basePrice),
//       currency: basicInfo.currency,
//       extraCharges: extraCharges
//         .filter((c) => c.label.trim() && c.amount)
//         .map((c) => ({ label: c.label.trim(), amount: Number(c.amount) })),
//     };

//     if (category === "CAR") {
//       dataPayload.carDetails = {
//         cartType: carSpecs.cartType,
//         model: carSpecs.model.trim(),
//         year: Number(carSpecs.year),
//         transmission: carSpecs.transmission,
//         fuelType: carSpecs.fuelType,
//         seats: Number(carSpecs.seats),
//         mileage: carSpecs.mileage.trim() || "Unlimited",
//         features: carSpecs.features,
//       };
//     } else {
//       dataPayload.apartmentDetails = {
//         amenities: aptSpecs.amenities,
//         rules: aptSpecs.rules,
//       };
//     }

//     // Build FormData — data as JSON string + listingPhotos as files
//     const formData = new FormData();
//     formData.append("data", JSON.stringify(dataPayload));
//     files.forEach((file) => formData.append("listingPhotos", file));

//     try {
//       const res = await addListing(formData).unwrap();
//       toast.success(res?.message ?? "Listing published successfully!");

//       // Reset form
//       setBasicInfo({
//         title: "",
//         description: "",
//         basePrice: "",
//         currency: "USD",
//         country: "",
//         city: "",
//       });
//       setCarSpecs({
//         cartType: "sedan",
//         model: "",
//         year: "",
//         transmission: "automatic",
//         fuelType: "petrol",
//         seats: "",
//         mileage: "",
//         features: [],
//       });
//       setAptSpecs({ amenities: [], rules: [], currentRule: "" });
//       setExtraCharges([{ label: "", amount: "" }]);
//       setFiles([]);
//       setCategory("CAR");
//     } catch (err: any) {
//       toast.error(err?.data?.message ?? "Something went wrong.");
//     }
//   };

//   // ── Reusable select style ──
//   const selectCls =
//     "w-full bg-[#E5E7EB]/50 border border-transparent focus:border-primary px-4 py-4 rounded-xl outline-none text-gray-700 font-medium h-[58px] cursor-pointer capitalize";

//   return (
//     <div className="space-y-8 pb-20">
//       {/* ── SECTION 1: CATEGORY ── */}
//       <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//         <div className="flex items-center gap-2 mb-6">
//           <Info className="text-primary" size={20} />
//           <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <button
//             onClick={() => setCategory("CAR")}
//             className={`flex flex-col items-center gap-3 p-10 rounded-[2rem] border-2 transition-all ${
//               category === "CAR"
//                 ? "border-primary bg-primary/5 text-primary"
//                 : "border-gray-100 bg-gray-50 text-gray-400"
//             }`}
//           >
//             <Car size={32} />
//             <span className="font-bold text-lg">Car</span>
//           </button>
//           <button
//             onClick={() => setCategory("APARTMENT")}
//             className={`flex flex-col items-center gap-3 p-10 rounded-[2rem] border-2 transition-all ${
//               category === "APARTMENT"
//                 ? "border-primary bg-primary/5 text-primary"
//                 : "border-gray-100 bg-gray-50 text-gray-400"
//             }`}
//           >
//             <Building2 size={32} />
//             <span className="font-bold text-lg">Apartment</span>
//           </button>
//         </div>
//       </div>

//       {/* ── SECTION 2: COMMON FIELDS ── */}
//       <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm space-y-6">
//         <FormInput
//           label="Listing Title"
//           name="title"
//           placeholder={
//             category === "CAR"
//               ? "e.g. Mercedes-Benz C-Class 2024"
//               : "e.g. Modern Studio Near Beach"
//           }
//           required
//           value={basicInfo.title}
//           onChange={handleInputChange}
//         />
//         <FormInput
//           label="Description"
//           name="description"
//           placeholder="Describe the listing in detail..."
//           isTextArea
//           required
//           value={basicInfo.description}
//           onChange={handleInputChange}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormInput
//             label="Base Price per day"
//             name="basePrice"
//             type="number"
//             placeholder="100"
//             required
//             value={basicInfo.basePrice}
//             onChange={handleInputChange}
//           />
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-bold text-gray-900">Currency</label>
//             <select
//               value={basicInfo.currency}
//               onChange={(e) =>
//                 setBasicInfo((prev) => ({
//                   ...prev,
//                   currency: e.target.value as Currency,
//                 }))
//               }
//               className={selectCls}
//             >
//               {CURRENCIES.map((c) => (
//                 <option key={c} value={c}>
//                   {c}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* ── Extra Charges ── */}
//         <div className="space-y-4 pt-4 border-t border-gray-50">
//           <div className="flex justify-between items-center">
//             <label className="text-sm font-bold text-gray-900 uppercase tracking-tight">
//               Extra Charges
//             </label>
//             <button
//               type="button"
//               onClick={() =>
//                 setExtraCharges([...extraCharges, { label: "", amount: "" }])
//               }
//               className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
//             >
//               <Plus size={16} /> Add More
//             </button>
//           </div>
//           {extraCharges.map((charge, i) => (
//             <div
//               key={i}
//               className="flex flex-col md:flex-row gap-4 items-end animate-in fade-in slide-in-from-left-2"
//             >
//               <div className="flex-1 w-full">
//                 <FormInput
//                   label="Charge Label"
//                   name="label"
//                   placeholder="e.g. Cleaning Fee"
//                   value={charge.label}
//                   onChange={(e) => {
//                     const updated = [...extraCharges];
//                     updated[i].label = e.target.value;
//                     setExtraCharges(updated);
//                   }}
//                 />
//               </div>
//               <div className="flex-1 w-full">
//                 <FormInput
//                   label="Amount"
//                   type="number"
//                   name="amount"
//                   placeholder="15"
//                   value={charge.amount}
//                   onChange={(e) => {
//                     const updated = [...extraCharges];
//                     updated[i].amount = e.target.value;
//                     setExtraCharges(updated);
//                   }}
//                 />
//               </div>
//               {extraCharges.length > 1 && (
//                 <button
//                   onClick={() =>
//                     setExtraCharges(extraCharges.filter((_, idx) => idx !== i))
//                   }
//                   className="p-4 bg-red-50 text-red-500 rounded-xl mb-0.5 hover:bg-red-100 transition-colors"
//                 >
//                   <Trash2 size={20} />
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
//           <FormInput
//             label="Country"
//             name="country"
//             placeholder="e.g. Algeria"
//             value={basicInfo.country}
//             onChange={handleInputChange}
//           />
//           <FormInput
//             label="City"
//             name="city"
//             placeholder="e.g. Algiers"
//             value={basicInfo.city}
//             onChange={handleInputChange}
//           />
//         </div>
//       </div>

//       {/* ── SECTION 3: POLYMORPHIC SPECS ── */}
//       <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//         <div className="flex items-center gap-2 mb-8">
//           <Settings2 className="text-primary" size={20} />
//           <h3 className="text-lg font-bold text-gray-900">
//             {category === "CAR" ? "Car Specifications" : "Apartment Details"}
//           </h3>
//         </div>

//         {category === "CAR" ? (
//           <div className="space-y-8">
//             {/* Row 1: Car Type + Model */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex flex-col gap-2">
//                 <label className="text-sm font-bold text-gray-900">
//                   Car Type
//                 </label>
//                 <select
//                   value={carSpecs.cartType}
//                   onChange={(e) =>
//                     setCarSpecs({
//                       ...carSpecs,
//                       cartType: e.target.value as CartType,
//                     })
//                   }
//                   className={selectCls}
//                 >
//                   {CAR_TYPES.map((t) => (
//                     <option key={t} value={t}>
//                       {t === "any_type"
//                         ? "Any Type"
//                         : t.charAt(0).toUpperCase() + t.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <FormInput
//                 label="Model"
//                 name="model"
//                 placeholder="e.g. C-Class"
//                 required
//                 value={carSpecs.model}
//                 onChange={(e) =>
//                   setCarSpecs({ ...carSpecs, model: e.target.value })
//                 }
//               />
//             </div>

//             {/* Row 2: Year + Transmission + Fuel */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <FormInput
//                 label="Year"
//                 name="year"
//                 type="number"
//                 placeholder="2024"
//                 required
//                 value={carSpecs.year}
//                 onChange={(e) =>
//                   setCarSpecs({ ...carSpecs, year: e.target.value })
//                 }
//               />
//               <div className="flex flex-col gap-2">
//                 <label className="text-sm font-bold text-gray-900">
//                   Transmission
//                 </label>
//                 <select
//                   value={carSpecs.transmission}
//                   onChange={(e) =>
//                     setCarSpecs({
//                       ...carSpecs,
//                       transmission: e.target.value as Transmission,
//                     })
//                   }
//                   className={selectCls}
//                 >
//                   {TRANSMISSIONS.map((t) => (
//                     <option key={t} value={t}>
//                       {t === "any"
//                         ? "Any"
//                         : t.charAt(0).toUpperCase() + t.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex flex-col gap-2">
//                 <label className="text-sm font-bold text-gray-900">
//                   Fuel Type
//                 </label>
//                 <select
//                   value={carSpecs.fuelType}
//                   onChange={(e) =>
//                     setCarSpecs({
//                       ...carSpecs,
//                       fuelType: e.target.value as FuelType,
//                     })
//                   }
//                   className={selectCls}
//                 >
//                   {FUEL_TYPES.map((f) => (
//                     <option key={f} value={f}>
//                       {f === "any"
//                         ? "Any"
//                         : f.charAt(0).toUpperCase() + f.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Row 3: Seats + Mileage */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormInput
//                 label="Seats"
//                 name="seats"
//                 type="number"
//                 placeholder="5"
//                 required
//                 value={carSpecs.seats}
//                 onChange={(e) =>
//                   setCarSpecs({ ...carSpecs, seats: e.target.value })
//                 }
//               />
//               <FormInput
//                 label="Mileage"
//                 name="mileage"
//                 placeholder="Unlimited or 100km/day"
//                 value={carSpecs.mileage}
//                 onChange={(e) =>
//                   setCarSpecs({ ...carSpecs, mileage: e.target.value })
//                 }
//               />
//             </div>

//             {/* Features */}
//             <div>
//               <p className="text-sm font-bold text-gray-900 mb-4">Features</p>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {[
//                   "Air Conditioning",
//                   "GPS Navigation",
//                   "Bluetooth",
//                   "Sunroof",
//                   "Child Seat",
//                   "Backup Camera",
//                 ].map((feat) => (
//                   <label
//                     key={feat}
//                     className="flex items-center gap-3 cursor-pointer group"
//                   >
//                     <input
//                       type="checkbox"
//                       className="w-5 h-5 accent-primary rounded-lg"
//                       checked={carSpecs.features.includes(feat)}
//                       onChange={() => toggleFeature(feat)}
//                     />
//                     <span className="text-sm text-gray-600 font-medium group-hover:text-primary transition-colors">
//                       {feat}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-8">
//             {/* Amenities */}
//             <div>
//               <p className="text-sm font-bold text-gray-900 mb-4">Amenities</p>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {[
//                   "WiFi",
//                   "Free parking",
//                   "Kitchen",
//                   "Pool",
//                   "Gym",
//                   "Workspace",
//                   "Balcony",
//                 ].map((item) => (
//                   <label
//                     key={item}
//                     className="flex items-center gap-3 cursor-pointer group"
//                   >
//                     <input
//                       type="checkbox"
//                       className="w-5 h-5 accent-primary"
//                       checked={aptSpecs.amenities.includes(item)}
//                       onChange={() => toggleAmenity(item)}
//                     />
//                     <span className="text-sm text-gray-600 font-medium group-hover:text-primary transition-colors">
//                       {item}
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* House Rules */}
//             <div className="space-y-4">
//               <p className="text-sm font-bold text-gray-900">House Rules</p>
//               <div className="flex gap-4">
//                 <input
//                   type="text"
//                   placeholder="e.g. No smoking"
//                   value={aptSpecs.currentRule}
//                   onChange={(e) =>
//                     setAptSpecs({ ...aptSpecs, currentRule: e.target.value })
//                   }
//                   onKeyDown={(e) => e.key === "Enter" && addRule()}
//                   className="flex-1 bg-[#E5E7EB]/50 px-4 py-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
//                 />
//                 <button
//                   onClick={addRule}
//                   className="bg-primary text-white px-6 rounded-xl font-bold hover:opacity-90 transition-opacity"
//                 >
//                   Add Rule
//                 </button>
//               </div>
//               {aptSpecs.rules.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {aptSpecs.rules.map((rule, i) => (
//                     <div
//                       key={i}
//                       className="bg-gray-100 px-4 py-2 rounded-full text-sm font-bold text-gray-600 flex items-center gap-2"
//                     >
//                       {rule}
//                       <X
//                         size={14}
//                         className="cursor-pointer hover:text-red-500 transition-colors"
//                         onClick={() =>
//                           setAptSpecs((prev) => ({
//                             ...prev,
//                             rules: prev.rules.filter((_, idx) => idx !== i),
//                           }))
//                         }
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ── SECTION 4: PHOTOS ── */}
//       <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
//         <div className="flex items-center gap-2 mb-6">
//           <ImageIcon className="text-primary" size={20} />
//           <h3 className="text-lg font-bold text-gray-900">Photos</h3>
//         </div>

//         <div
//           onClick={() => fileInputRef.current?.click()}
//           className="border-2 border-dashed border-gray-200 rounded-[2rem] py-16 flex flex-col items-center justify-center text-gray-400 group hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
//         >
//           <input
//             type="file"
//             multiple
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             className="hidden"
//             accept="image/*"
//           />
//           <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:text-primary transition-colors">
//             <Upload size={32} />
//           </div>
//           <p className="font-bold text-gray-900">
//             Drag and drop photos or click to browse
//           </p>
//           <p className="text-sm mt-1">
//             Up to 20 photos.{" "}
//             {files.length > 0 && (
//               <span className="text-primary font-bold">
//                 {files.length} selected
//               </span>
//             )}
//           </p>
//         </div>

//         {files.length > 0 && (
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
//             {files.map((file, i) => (
//               <div
//                 key={i}
//                 className="relative aspect-square rounded-2xl overflow-hidden group"
//               >
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt={`preview-${i}`}
//                   className="w-full h-full object-cover"
//                 />
//                 {i === 0 && (
//                   <span className="absolute bottom-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
//                     Cover
//                   </span>
//                 )}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     removeFile(i);
//                   }}
//                   className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* ── PUBLISH BUTTON ── */}
//       <div className="flex justify-end pt-4">
//         <button
//           onClick={handleSubmit}
//           disabled={isLoading}
//           className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-base hover:opacity-90 transition-all flex items-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
//         >
//           <Check size={20} strokeWidth={3} />
//           {isLoading ? "Publishing..." : "Publish Listing"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddListingForm;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import { toast } from "sonner";
import {
  Car,
  Building2,
  Plus,
  Upload,
  Trash2,
  X,
  Check,
  Info,
  Settings2,
  Image as ImageIcon,
} from "lucide-react";
import FormInput from "@/components/booking/FormInput";
import { useAddListingMutation } from "@/redux/features/admin/listing.api";
import { useTranslations, useLocale } from "next-intl";

// Enums (Keys remain same for API logic)
const CURRENCIES = ["USD", "DZD", "EUR"] as const;
const CAR_TYPES = [
  "any_type",
  "sedan",
  "suv",
  "luxury",
  "van",
  "economy",
] as const;
const FUEL_TYPES = ["any", "petrol", "diesel", "electric", "hybrid"] as const;
const TRANSMISSIONS = ["any", "automatic", "manual"] as const;

type Currency = (typeof CURRENCIES)[number];
type CartType = (typeof CAR_TYPES)[number];
type FuelType = (typeof FUEL_TYPES)[number];
type Transmission = (typeof TRANSMISSIONS)[number];

const AddListingForm = () => {
  const t = useTranslations("AdminAddListing");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [addListing, { isLoading }] = useAddListingMutation();

  const [category, setCategory] = useState<"CAR" | "APARTMENT">("CAR");
  const [files, setFiles] = useState<File[]>([]);
  const [extraCharges, setExtraCharges] = useState([{ label: "", amount: "" }]);

  const [basicInfo, setBasicInfo] = useState({
    title: "",
    description: "",
    basePrice: "",
    currency: "USD" as Currency,
    country: "",
    city: "",
  });

  const [carSpecs, setCarSpecs] = useState({
    cartType: "sedan" as CartType,
    model: "",
    year: "",
    transmission: "automatic" as Transmission,
    fuelType: "petrol" as FuelType,
    seats: "",
    mileage: "",
    features: [] as string[],
  });

  const [aptSpecs, setAptSpecs] = useState({
    amenities: [] as string[],
    rules: [] as string[],
    currentRule: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (feature: string) => {
    setCarSpecs((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setAptSpecs((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const addRule = () => {
    if (!aptSpecs.currentRule.trim()) return;
    setAptSpecs((prev) => ({
      ...prev,
      rules: [...prev.rules, prev.currentRule.trim()],
      currentRule: "",
    }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (files.length + selectedFiles.length > 20) {
      return toast.error(t("toasts.photoLimit"));
    }
    setFiles((prev) => [...prev, ...selectedFiles]);
    e.target.value = "";
  };
  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  const validate = () => {
    if (!basicInfo.title.trim())
      return (toast.error(t("toasts.valTitle")), false);
    if (!basicInfo.description.trim())
      return (toast.error(t("toasts.valDesc")), false);
    if (!basicInfo.basePrice) return (toast.error(t("toasts.valPrice")), false);
    if (!basicInfo.country.trim())
      return (toast.error(t("toasts.valCountry")), false);
    if (!basicInfo.city.trim())
      return (toast.error(t("toasts.valCity")), false);
    if (category === "CAR") {
      if (!carSpecs.model.trim())
        return (toast.error(t("toasts.valModel")), false);
      if (!carSpecs.year) return (toast.error(t("toasts.valYear")), false);
      if (!carSpecs.seats) return (toast.error(t("toasts.valSeats")), false);
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const dataPayload: Record<string, any> = {
      title: basicInfo.title.trim(),
      description: basicInfo.description.trim(),
      category,
      city: basicInfo.city.trim(),
      country: basicInfo.country.trim(),
      basePrice: Number(basicInfo.basePrice),
      currency: basicInfo.currency,
      extraCharges: extraCharges
        .filter((c) => c.label.trim() && c.amount)
        .map((c) => ({ label: c.label.trim(), amount: Number(c.amount) })),
    };

    if (category === "CAR") {
      dataPayload.carDetails = {
        ...carSpecs,
        model: carSpecs.model.trim(),
        year: Number(carSpecs.year),
        seats: Number(carSpecs.seats),
        mileage: carSpecs.mileage.trim() || "Unlimited",
      };
    } else {
      dataPayload.apartmentDetails = {
        amenities: aptSpecs.amenities,
        rules: aptSpecs.rules,
      };
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(dataPayload));
    files.forEach((file) => formData.append("listingPhotos", file));

    try {
      const res = await addListing(formData).unwrap();
      toast.success(res?.message ?? t("toasts.success"));
      // Reset logic preserved
      setFiles([]);
      setCategory("CAR");
    } catch (err: any) {
      toast.error(err?.data?.message ?? t("toasts.error"));
    }
  };

  const selectCls =
    "w-full bg-[#E5E7EB]/50 border border-transparent focus:border-primary px-4 py-4 rounded-xl outline-none text-gray-700 font-medium h-[58px] cursor-pointer capitalize";

  return (
    <div className="space-y-8 pb-20" dir={isRtl ? "rtl" : "ltr"}>
      {/* SECTION 1: CATEGORY */}
      <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Info className="text-primary" size={20} />
          <h3 className="text-lg font-bold text-gray-900">
            {t("sections.basic")}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setCategory("CAR")}
            className={`flex flex-col items-center gap-3 p-10 rounded-[2rem] border-2 transition-all ${category === "CAR" ? "border-primary bg-primary/5 text-primary" : "border-gray-100 bg-gray-50 text-gray-400"}`}
          >
            <Car size={32} />
            <span className="font-bold text-lg">{t("category.car")}</span>
          </button>
          <button
            onClick={() => setCategory("APARTMENT")}
            className={`flex flex-col items-center gap-3 p-10 rounded-[2rem] border-2 transition-all ${category === "APARTMENT" ? "border-primary bg-primary/5 text-primary" : "border-gray-100 bg-gray-50 text-gray-400"}`}
          >
            <Building2 size={32} />
            <span className="font-bold text-lg">{t("category.apartment")}</span>
          </button>
        </div>
      </div>

      {/* SECTION 2: COMMON FIELDS */}
      <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm space-y-6">
        <FormInput
          label={t("fields.title")}
          name="title"
          placeholder={
            category === "CAR"
              ? t("placeholders.titleCar")
              : t("placeholders.titleApt")
          }
          required
          value={basicInfo.title}
          onChange={handleInputChange}
        />
        <FormInput
          label={t("fields.description")}
          name="description"
          placeholder={t("placeholders.desc")}
          isTextArea
          required
          value={basicInfo.description}
          onChange={handleInputChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label={t("fields.price")}
            name="basePrice"
            type="number"
            placeholder="100"
            required
            value={basicInfo.basePrice}
            onChange={handleInputChange}
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-900">
              {t("fields.currency")}
            </label>
            <select
              value={basicInfo.currency}
              onChange={(e) =>
                setBasicInfo((prev) => ({
                  ...prev,
                  currency: e.target.value as Currency,
                }))
              }
              className={selectCls}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Extra Charges */}
        <div className="space-y-4 pt-4 border-t border-gray-50">
          <div className="flex justify-between items-center">
            <label className="text-sm font-bold text-gray-900 uppercase tracking-tight">
              {t("fields.extraCharges")}
            </label>
            <button
              type="button"
              onClick={() =>
                setExtraCharges([...extraCharges, { label: "", amount: "" }])
              }
              className="text-primary font-bold text-sm flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Plus size={16} /> {t("buttons.addMore")}
            </button>
          </div>
          {extraCharges.map((charge, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <FormInput
                  label={t("fields.chargeLabel")}
                  name="label"
                  placeholder={t("placeholders.chargeLabel")}
                  value={charge.label}
                  onChange={(e) => {
                    const updated = [...extraCharges];
                    updated[i].label = e.target.value;
                    setExtraCharges(updated);
                  }}
                />
              </div>
              <div className="flex-1 w-full">
                <FormInput
                  label={t("fields.amount")}
                  type="number"
                  name="amount"
                  placeholder="15"
                  value={charge.amount}
                  onChange={(e) => {
                    const updated = [...extraCharges];
                    updated[i].amount = e.target.value;
                    setExtraCharges(updated);
                  }}
                />
              </div>
              {extraCharges.length > 1 && (
                <button
                  onClick={() =>
                    setExtraCharges(extraCharges.filter((_, idx) => idx !== i))
                  }
                  className="p-4 bg-red-50 text-red-500 rounded-xl mb-0.5 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <FormInput
            label={t("fields.country")}
            name="country"
            placeholder={t("placeholders.country")}
            value={basicInfo.country}
            onChange={handleInputChange}
          />
          <FormInput
            label={t("fields.city")}
            name="city"
            placeholder={t("placeholders.city")}
            value={basicInfo.city}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* SECTION 3: POLYMORPHIC SPECS */}
      <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <Settings2 className="text-primary" size={20} />
          <h3 className="text-lg font-bold text-gray-900">
            {category === "CAR"
              ? t("sections.specsCar")
              : t("sections.specsApt")}
          </h3>
        </div>

        {category === "CAR" ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-900">
                  {t("fields.carType")}
                </label>
                <select
                  value={carSpecs.cartType}
                  onChange={(e) =>
                    setCarSpecs({
                      ...carSpecs,
                      cartType: e.target.value as CartType,
                    })
                  }
                  className={selectCls}
                >
                  {CAR_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {t(`enums.${type}` as any)}
                    </option>
                  ))}
                </select>
              </div>
              <FormInput
                label={t("fields.model")}
                name="model"
                placeholder={t("placeholders.model")}
                required
                value={carSpecs.model}
                onChange={(e) =>
                  setCarSpecs({ ...carSpecs, model: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                label={t("fields.year")}
                name="year"
                type="number"
                placeholder="2024"
                required
                value={carSpecs.year}
                onChange={(e) =>
                  setCarSpecs({ ...carSpecs, year: e.target.value })
                }
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-900">
                  {t("fields.transmission")}
                </label>
                <select
                  value={carSpecs.transmission}
                  onChange={(e) =>
                    setCarSpecs({
                      ...carSpecs,
                      transmission: e.target.value as Transmission,
                    })
                  }
                  className={selectCls}
                >
                  {TRANSMISSIONS.map((v) => (
                    <option key={v} value={v}>
                      {t(`enums.${v}` as any)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-900">
                  {t("fields.fuel")}
                </label>
                <select
                  value={carSpecs.fuelType}
                  onChange={(e) =>
                    setCarSpecs({
                      ...carSpecs,
                      fuelType: e.target.value as FuelType,
                    })
                  }
                  className={selectCls}
                >
                  {FUEL_TYPES.map((v) => (
                    <option key={v} value={v}>
                      {t(`enums.${v}` as any)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label={t("fields.seats")}
                name="seats"
                type="number"
                placeholder="5"
                required
                value={carSpecs.seats}
                onChange={(e) =>
                  setCarSpecs({ ...carSpecs, seats: e.target.value })
                }
              />
              <FormInput
                label={t("fields.mileage")}
                name="mileage"
                placeholder={t("placeholders.mileage")}
                value={carSpecs.mileage}
                onChange={(e) =>
                  setCarSpecs({ ...carSpecs, mileage: e.target.value })
                }
              />
            </div>

            <div>
              <p className="text-sm font-bold text-gray-900 mb-4">
                {t("fields.features")}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Air Conditioning",
                  "GPS Navigation",
                  "Bluetooth",
                  "Sunroof",
                  "Child Seat",
                  "Backup Camera",
                ].map((feat) => (
                  <label
                    key={feat}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-primary rounded-lg"
                      checked={carSpecs.features.includes(feat)}
                      onChange={() => toggleFeature(feat)}
                    />
                    <span className="text-sm text-gray-600 font-medium group-hover:text-primary transition-colors">
                      {feat}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <p className="text-sm font-bold text-gray-900 mb-4">
                {t("fields.amenities")}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "WiFi",
                  "Free parking",
                  "Kitchen",
                  "Pool",
                  "Gym",
                  "Workspace",
                  "Balcony",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-primary"
                      checked={aptSpecs.amenities.includes(item)}
                      onChange={() => toggleAmenity(item)}
                    />
                    <span className="text-sm text-gray-600 font-medium group-hover:text-primary transition-colors">
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-900">
                {t("fields.houseRules")}
              </p>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder={t("placeholders.rules")}
                  value={aptSpecs.currentRule}
                  onChange={(e) =>
                    setAptSpecs({ ...aptSpecs, currentRule: e.target.value })
                  }
                  onKeyDown={(e) => e.key === "Enter" && addRule()}
                  className="flex-1 bg-[#E5E7EB]/50 px-4 py-4 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={addRule}
                  className="bg-primary text-white px-6 rounded-xl font-bold hover:opacity-90 cursor-pointer"
                >
                  {t("buttons.addRule")}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {aptSpecs.rules.map((rule, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 px-4 py-2 rounded-full text-sm font-bold text-gray-600 flex items-center gap-2"
                  >
                    {rule}{" "}
                    <X
                      size={14}
                      className="cursor-pointer hover:text-red-500 transition-colors"
                      onClick={() =>
                        setAptSpecs((prev) => ({
                          ...prev,
                          rules: prev.rules.filter((_, idx) => idx !== i),
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: PHOTOS */}
      <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <ImageIcon className="text-primary" size={20} />
          <h3 className="text-lg font-bold text-gray-900">
            {t("sections.photos")}
          </h3>
        </div>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-[2rem] py-16 flex flex-col items-center justify-center text-gray-400 group hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
        >
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:text-primary transition-colors">
            <Upload size={32} />
          </div>
          <p className="font-bold text-gray-900">{t("buttons.browse")}</p>
          <p className="text-sm mt-1">
            {t("buttons.photoLimit")}{" "}
            {files.length > 0 && (
              <span className="text-primary font-bold">
                {t("buttons.selected", { count: files.length })}
              </span>
            )}
          </p>
        </div>
        {files.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            {files.map((file, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-2xl overflow-hidden group"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                {i === 0 && (
                  <span className="absolute bottom-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {t("buttons.cover")}
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`flex ${isRtl ? "justify-start" : "justify-end"} pt-4`}>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-base hover:opacity-90 transition-all flex items-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-60 cursor-pointer"
        >
          <Check size={20} strokeWidth={3} />{" "}
          {isLoading ? t("buttons.publishing") : t("buttons.publish")}
        </button>
      </div>
    </div>
  );
};

export default AddListingForm;
