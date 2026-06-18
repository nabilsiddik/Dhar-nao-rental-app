// "use client";

// import React, { useState, useRef } from "react";
// import FormInput from "@/components/booking/FormInput";
// import { Upload, Plus, Trash2, X, Settings2, ImageIcon } from "lucide-react";
// import { toast } from "sonner";

// interface EditListingFormProps {
//   initialData: any;
//   onUpdate: (data: any) => void;
// }

// const EditListingForm = ({ initialData, onUpdate }: EditListingFormProps) => {
//   const isCar = initialData?.category === "Car";

//   // 1. Initialize State with existing data
//   const [formData, setFormData] = useState({
//     title: initialData?.title || "",
//     description: initialData?.description || "",
//     basePrice: initialData?.price?.replace(/[^0-9]/g, "") || "",
//     city: initialData?.location?.split(",")[0] || "",
//     country: initialData?.location?.split(",")[1]?.trim() || "",
//   });

//   const [extraCharges, setExtraCharges] = useState(
//     initialData?.extraCharges || [{ label: "", amount: "" }],
//   );
//   const [files, setFiles] = useState<File[]>([]);

//   // Specific Specs State
//   const [carSpecs, setCarSpecs] = useState(
//     initialData?.carDetails || {
//       cartType: "sedan",
//       model: "",
//       year: "",
//       transmission: "",
//       fuelType: "",
//       seats: "",
//       mileage: "",
//       features: [],
//     },
//   );

//   const [aptSpecs, setAptSpecs] = useState(
//     initialData?.apartmentDetails || {
//       amenities: [],
//       rules: [],
//       currentRule: "",
//     },
//   );

//   // 2. Handlers
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const finalData = {
//       ...formData,
//       category: initialData.category,
//       extraCharges: extraCharges.filter((c: any) => c.label),
//       details: isCar ? carSpecs : aptSpecs,
//       newPhotos: files,
//     };
//     onUpdate(finalData); // Logs full updated object
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-8 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar"
//     >
//       {/* BASIC INFO */}
//       <div className="space-y-6">
//         <h4 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
//           <ImageIcon size={16} /> Basic Information
//         </h4>
//         <FormInput
//           label="Title"
//           name="title"
//           defaultValue={formData.title}
//           placeholder="Title"
//         />
//         <FormInput
//           label="Description"
//           name="description"
//           isTextArea
//           defaultValue={formData.description}
//           placeholder="Description"
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <FormInput
//             label="Base Price"
//             name="basePrice"
//             defaultValue={formData.basePrice}
//             placeholder="100"
//           />
//           <FormInput
//             label="City"
//             name="city"
//             defaultValue={formData.city}
//             placeholder="Algiers"
//           />
//         </div>
//       </div>

//       <hr className="border-gray-100" />

//       {/* CATEGORY SPECIFIC SPECS */}
//       <div className="space-y-6">
//         <h4 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
//           <Settings2 size={16} />{" "}
//           {isCar ? "Car Specifications" : "Apartment Details"}
//         </h4>

//         {isCar ? (
//           <div className="grid grid-cols-2 gap-4">
//             <FormInput
//               label="Model"
//               name="model"
//               defaultValue={carSpecs.model}
//               placeholder="e.g. C-Class"
//             />
//             <FormInput
//               label="Year"
//               name="year"
//               defaultValue={carSpecs.year}
//               placeholder="2024"
//             />
//             {/* ... other car inputs ... */}
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <p className="text-sm font-bold text-gray-900">Amenities</p>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//               {["WiFi", "Kitchen", "Pool", "Gym", "Parking"].map((item) => (
//                 <label
//                   key={item}
//                   className="flex items-center gap-2 text-sm text-gray-600 font-medium"
//                 >
//                   <input type="checkbox" className="accent-primary" /> {item}
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <hr className="border-gray-100" />

//       {/* EXTRA CHARGES */}
//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <p className="text-sm font-bold text-gray-900 uppercase">
//             Extra Charges
//           </p>
//           <button
//             type="button"
//             onClick={() =>
//               setExtraCharges([...extraCharges, { label: "", amount: "" }])
//             }
//             className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
//           >
//             <Plus size={14} /> Add Charge
//           </button>
//         </div>
//         {extraCharges.map((c: any, i: number) => (
//           <div key={i} className="flex gap-3 items-end">
//             <FormInput
//               label="Label"
//               name="chargeLabel"
//               defaultValue={c.label}
//               placeholder="Tax"
//             />
//             <FormInput
//               label="Amount"
//               name="chargeAmount"
//               defaultValue={c.amount}
//               placeholder="10"
//             />
//             <button
//               type="button"
//               onClick={() =>
//                 setExtraCharges(
//                   extraCharges.filter((_: any, idx: number) => idx !== i),
//                 )
//               }
//               className="p-4 bg-red-50 text-red-500 rounded-xl mb-0.5"
//             >
//               <Trash2 size={18} />
//             </button>
//           </div>
//         ))}
//       </div>

//       <hr className="border-gray-100" />

//       {/* PHOTO UPLOAD */}
//       <div className="space-y-4 pb-4">
//         <p className="text-sm font-bold text-gray-900 uppercase">Photos</p>
//         <div
//           onClick={() => fileInputRef.current?.click()}
//           className="border-2 border-dashed border-gray-200 rounded-2xl py-10 flex flex-col items-center justify-center text-gray-400 group hover:border-primary cursor-pointer transition-all"
//         >
//           <input
//             type="file"
//             multiple
//             ref={fileInputRef}
//             className="hidden"
//             onChange={(e) => setFiles(Array.from(e.target.files || []))}
//           />
//           <Upload size={24} className="mb-2 group-hover:text-primary" />
//           <p className="text-sm font-bold text-gray-700">Upload new photos</p>
//           <p className="text-xs">Selected: {files.length} new files</p>
//         </div>
//       </div>

//       {/* SUBMIT */}
//       <div className="sticky bottom-0 bg-white pt-4 pb-2">
//         <button
//           type="submit"
//           className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
//         >
//           Save All Changes
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditListingForm;

// "use client";

// import React, { useState, useRef } from "react";
// import FormInput from "@/components/booking/FormInput";
// import { Upload, Plus, Trash2, Settings2, ImageIcon } from "lucide-react";

// interface EditListingFormProps {
//   initialData: any;
//   onUpdate: (data: any) => void;
// }

// export const EditListingForm = ({
//   initialData,
//   onUpdate,
// }: EditListingFormProps) => {
//   const isCar = initialData?.category === "CAR";

//   // 1. Core Info State
//   const [basicInfo, setBasicInfo] = useState({
//     title: initialData?.title || "",
//     description: initialData?.description || "",
//     basePrice: initialData?.basePrice || 0,
//     city: initialData?.city || "",
//     country: initialData?.country || "",
//   });

//   const [extraCharges, setExtraCharges] = useState(
//     initialData?.extraCharges || [],
//   );

//   const [files, setFiles] = useState<File[]>([]);

//   // 2. Specific Specs State
//   const [carSpecs, setCarSpecs] = useState(initialData?.carDetails || {});
//   const [aptSpecs, setAptSpecs] = useState(
//     initialData?.apartmentDetails || { amenities: [], rules: [] },
//   );

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // CONSTRUCT PAYLOAD TO MATCH BACKEND ZOD SCHEMA
//     const payload: any = {
//       title: basicInfo.title,
//       description: basicInfo.description,
//       basePrice: Number(basicInfo.basePrice),
//       city: basicInfo.city,
//       country: basicInfo.country,
//       extraCharges: extraCharges.map((c: any) => ({
//         label: c.label,
//         amount: Number(c.amount),
//       })),
//     };

//     // Attach polymorphic details using the exact keys the backend expects
//     if (isCar) {
//       payload.carDetails = carSpecs;
//     } else {
//       payload.apartmentDetails = aptSpecs;
//     }

//     // Pass the payload and the files up to the parent
//     onUpdate({ payload, files });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-8 max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar"
//     >
//       <div className="space-y-6">
//         <h4 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
//           <ImageIcon size={16} /> Basic Information
//         </h4>
//         <FormInput
//           label="Title"
//           name="title"
//           value={basicInfo.title}
//           onChange={(e) =>
//             setBasicInfo({ ...basicInfo, title: e.target.value })
//           }
//           placeholder="Title"
//         />
//         <FormInput
//           label="Description"
//           name="description"
//           isTextArea
//           value={basicInfo.description}
//           onChange={(e) =>
//             setBasicInfo({ ...basicInfo, description: e.target.value })
//           }
//           placeholder="Description"
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <FormInput
//             label="Base Price"
//             name="basePrice"
//             type="number"
//             value={basicInfo.basePrice}
//             onChange={(e) =>
//               setBasicInfo({ ...basicInfo, basePrice: e.target.value })
//             }
//             placeholder="100"
//           />
//           <FormInput
//             label="City"
//             name="city"
//             value={basicInfo.city}
//             onChange={(e) =>
//               setBasicInfo({ ...basicInfo, city: e.target.value })
//             }
//             placeholder="Algiers"
//           />
//         </div>
//       </div>

//       <hr className="border-gray-100" />

//       {/* CATEGORY SPECIFIC SPECS */}
//       <div className="space-y-6">
//         <h4 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
//           <Settings2 size={16} />{" "}
//           {isCar ? "Car Specifications" : "Apartment Details"}
//         </h4>

//         {isCar ? (
//           <div className="grid grid-cols-2 gap-4">
//             <FormInput
//               label="Model"
//               name="model"
//               value={carSpecs.model}
//               onChange={(e) =>
//                 setCarSpecs({ ...carSpecs, model: e.target.value })
//               }
//             />
//             <FormInput
//               label="Mileage"
//               name="mileage"
//               value={carSpecs.mileage}
//               onChange={(e) =>
//                 setCarSpecs({ ...carSpecs, mileage: e.target.value })
//               }
//             />
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {/* Handle Amenities/Rules checkboxes/inputs here similarly */}
//           </div>
//         )}
//       </div>

//       {/* ... (Keep your Extra Charges and Photo Upload UI) ... */}

//       <div className="sticky bottom-0 bg-white pt-4 pb-2">
//         <button
//           type="submit"
//           className="w-full bg-primary text-white py-4 rounded-2xl font-bold"
//         >
//           Save All Changes
//         </button>
//       </div>
//     </form>
//   );
// };

"use client";

import React, { useState } from "react";
import FormInput from "@/components/booking/FormInput";
import {
  Plus,
  Trash2,
  X,
  Settings2,
  Info,
  DollarSign,
  CheckCircle2,
} from "lucide-react";

interface EditListingFormProps {
  initialData: any;
  onUpdate: (payload: any) => void;
}

export const EditListingForm = ({
  initialData,
  onUpdate,
}: EditListingFormProps) => {
  const isCar = initialData?.category === "CAR";

  // 1. Basic Info State
  const [basicInfo, setBasicInfo] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    basePrice: initialData?.basePrice || 0,
    city: initialData?.city || "",
    country: initialData?.country || "",
  });

  // 2. Extra Charges State
  const [extraCharges, setExtraCharges] = useState(
    initialData?.extraCharges || [],
  );

  // 3. Polymorphic Details State
  const [carSpecs, setCarSpecs] = useState(
    initialData?.carDetails || {
      model: "",
      year: "",
      transmission: "",
      fuelType: "",
      seats: "",
      mileage: "",
      features: [],
    },
  );

  const [aptSpecs, setAptSpecs] = useState({
    amenities: initialData?.apartmentDetails?.amenities || [],
    rules: initialData?.apartmentDetails?.rules || [],
    newRule: "",
  });

  // --- Handlers ---
  const handleBasicChange = (e: any) => {
    const { name, value } = e.target;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));
  };

  const toggleArrayItem = (list: string[], item: string) =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  // const handleSubmit = (e: React.FormEvent) => {
  //   console.log("submit");
  //   e.preventDefault();

  //   // Construct the payload exactly as required by Backend Zod Schema
  //   const payload: any = {
  //     ...basicInfo,
  //     basePrice: Number(basicInfo.basePrice),
  //     extraCharges: extraCharges.map((c: any) => ({
  //       label: c.label,
  //       amount: Number(c.amount),
  //     })),
  //   };

  //   if (isCar) {
  //     payload.carDetails = {
  //       ...carSpecs,
  //       year: Number(carSpecs.year),
  //       seats: Number(carSpecs.seats),
  //     };
  //   } else {
  //     payload.apartmentDetails = {
  //       amenities: aptSpecs.amenities,
  //       rules: aptSpecs.rules,
  //     };
  //   }

  //   console.log(payload, "form pay");

  //   onUpdate(payload);
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      title: basicInfo.title,
      description: basicInfo.description,
      basePrice: Number(basicInfo.basePrice),
      city: basicInfo.city,
      country: basicInfo.country,
      extraCharges: extraCharges.map((c: any) => ({
        label: c.label,
        amount: Number(c.amount),
      })),
    };

    if (isCar) {
      payload.carDetails = {
        ...carSpecs,
        year: Number(carSpecs.year),
        seats: Number(carSpecs.seats),
      };
    } else {
      payload.apartmentDetails = {
        amenities: aptSpecs.amenities,
        rules: aptSpecs.rules,
      };
    }

    onUpdate({ payload, files: [] });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-h-[75vh] overflow-y-auto pr-4 custom-scrollbar"
    >
      {/* SECTION 1: BASIC INFO */}
      <div className="space-y-6">
        <h4 className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-2">
          <Info size={18} /> Basic Info
        </h4>
        <FormInput
          label="Title"
          name="title"
          value={basicInfo.title}
          onChange={handleBasicChange}
          placeholder="Enter title"
        />
        <FormInput
          label="Description"
          name="description"
          isTextArea
          value={basicInfo.description}
          onChange={handleBasicChange}
          placeholder="Enter description"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Base Price"
            name="basePrice"
            type="number"
            value={basicInfo.basePrice}
            onChange={handleBasicChange}
            placeholder="60"
          />
          <FormInput
            label="City"
            name="city"
            value={basicInfo.city}
            onChange={handleBasicChange}
            placeholder="City name"
          />
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* SECTION 2: CATEGORY SPECIFIC */}
      <div className="space-y-6">
        <h4 className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-2">
          <Settings2 size={18} />{" "}
          {isCar ? "Car Specifications" : "Apartment Details"}
        </h4>

        {isCar ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Model"
                value={carSpecs.model}
                onChange={(e) =>
                  setCarSpecs({ ...carSpecs, model: e.target.value })
                }
                placeholder="C-Class"
                name="model"
              />
              <FormInput
                label="Year"
                type="number"
                value={carSpecs.year}
                onChange={(e) =>
                  setCarSpecs({ ...carSpecs, year: e.target.value })
                }
                placeholder="2024"
                name="year"
              />
              <FormInput
                label="Seats"
                type="number"
                value={carSpecs.seats}
                onChange={(e) =>
                  setCarSpecs({ ...carSpecs, seats: e.target.value })
                }
                placeholder="5"
                name="seats"
              />
              <FormInput
                label="Mileage"
                value={carSpecs.mileage}
                onChange={(e) =>
                  setCarSpecs({ ...carSpecs, mileage: e.target.value })
                }
                placeholder="Unlimited"
                name="mileage"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-700 mb-3">
                Car Features
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Bluetooth", "GPS", "Sunroof", "Leather Seats", "AC"].map(
                  (f) => (
                    <label
                      key={f}
                      className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-600"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-primary"
                        checked={carSpecs.features.includes(f)}
                        onChange={() =>
                          setCarSpecs({
                            ...carSpecs,
                            features: toggleArrayItem(carSpecs.features, f),
                          })
                        }
                      />{" "}
                      {f}
                    </label>
                  ),
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold text-gray-700 mb-3">Amenities</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["WiFi", "Pool", "Gym", "Kitchen", "Workspace", "Parking"].map(
                  (a) => (
                    <label
                      key={a}
                      className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-600"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-primary"
                        checked={aptSpecs.amenities.includes(a)}
                        onChange={() =>
                          setAptSpecs({
                            ...aptSpecs,
                            amenities: toggleArrayItem(aptSpecs.amenities, a),
                          })
                        }
                      />{" "}
                      {a}
                    </label>
                  ),
                )}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-700">House Rules</p>
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-gray-50 border border-gray-100 p-3 rounded-xl outline-none text-sm"
                  placeholder="e.g. No smoking"
                  value={aptSpecs.newRule}
                  onChange={(e) =>
                    setAptSpecs({ ...aptSpecs, newRule: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    aptSpecs.newRule &&
                    setAptSpecs({
                      ...aptSpecs,
                      rules: [...aptSpecs.rules, aptSpecs.newRule],
                      newRule: "",
                    })
                  }
                  className="bg-primary text-white px-4 rounded-xl text-sm font-bold"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {aptSpecs.rules.map((rule: string, i: number) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2"
                  >
                    {rule}{" "}
                    <X
                      size={14}
                      className="cursor-pointer hover:text-red-500"
                      onClick={() =>
                        setAptSpecs({
                          ...aptSpecs,
                          rules: aptSpecs.rules.filter(
                            (_: any, idx: number) => idx !== i,
                          ),
                        })
                      }
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <hr className="border-gray-100" />

      {/* SECTION 3: EXTRA CHARGES */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-2">
            <DollarSign size={18} /> Extra Charges
          </h4>
          <button
            type="button"
            onClick={() =>
              setExtraCharges([...extraCharges, { label: "", amount: 0 }])
            }
            className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
          >
            <Plus size={14} /> Add More
          </button>
        </div>
        {extraCharges.map((c: any, i: number) => (
          <div
            key={i}
            className="flex gap-3 items-end animate-in slide-in-from-left-2"
          >
            <div className="flex-[2]">
              <FormInput
                label="Label"
                value={c.label}
                onChange={(e) => {
                  const newArr = [...extraCharges];
                  newArr[i].label = e.target.value;
                  setExtraCharges(newArr);
                }}
                placeholder="Tax"
                name={`label-${i}`}
              />
            </div>
            <div className="flex-1">
              <FormInput
                label="Amount"
                type="number"
                value={c.amount}
                onChange={(e) => {
                  const newArr = [...extraCharges];
                  newArr[i].amount = e.target.value;
                  setExtraCharges(newArr);
                }}
                placeholder="10"
                name={`amount-${i}`}
              />
            </div>
            <button
              type="button"
              onClick={() =>
                setExtraCharges(
                  extraCharges.filter((_: any, idx: number) => idx !== i),
                )
              }
              className="p-4 bg-red-50 text-red-500 rounded-xl mb-1"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <div className="sticky bottom-0 bg-white pt-6 pb-2 border-t border-gray-50">
        <button
          type="submit"
          className="w-full bg-primary text-white py-5 rounded-[2rem] font-black text-base shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={20} /> Save All Updates
        </button>
      </div>
    </form>
  );
};

export default EditListingForm;
