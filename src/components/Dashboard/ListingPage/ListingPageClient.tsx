// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import {
//   Edit,
//   Archive,
//   Trash2,
//   Plus,
//   ArrowLeft,
//   CheckCircle,
//   RotateCcw,
//   Search,
//   SlidersHorizontal,
//   Loader2,
// } from "lucide-react";
// import AddListingForm from "./AddListingForm";
// import { toast } from "sonner";
// import Modal from "@/components/common/modals/Modal";
// import {
//   useBulkUpdateListingMutation,
//   useDeleteListingMutation,
//   useEditListingMutation,
//   useGetAllListingQuery,
//   useToArchiveMutation,
// } from "@/redux/features/admin/listing.api";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import EditListingForm from "@/components/form/EditListingForm";
// import Pagination from "@/components/common/Pagination";
// import { useDebouncedCallback } from "use-debounce";

// const ListingsClient = () => {
//   // --- PAGINATION & FILTER STATES ---
//   const [archiveListing] = useToArchiveMutation();
//   const [deleteListing, { isLoading: isDeleting }] = useDeleteListingMutation();
//   const [bulkUpdateListing, { isLoading: isUpdatingStatus }] =
//     useBulkUpdateListingMutation();

//   const searchParams = useSearchParams();
//   const params = Object.fromEntries(searchParams.entries());
//   console.log(params, "para");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("");
//   const [status, setStatus] = useState("");
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const router = useRouter();
//   const pathName = usePathname();

//   // Construct query arguments dynamically based on your endpoint array requirements
//   // const queryArgs = [
//   //   ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
//   //   ...(category ? [{ name: "category", value: category }] : []),
//   //   ...(status ? [{ name: "status", value: status }] : []),
//   //   { name: "page", value: String(page) },
//   //   { name: "limit", value: String(limit) },
//   // ];

//   const updateQuery = (key: string, value: string) => {
//     const newParams = new URLSearchParams(searchParams.toString());
//     if (value && value !== "all") {
//       newParams.set(key, value);
//     } else {
//       newParams.delete(key);
//     }
//     newParams.set("page", "1"); // Reset to page 1 on filter change
//     router.push(`${pathName}?${newParams.toString()}`, { scroll: false });
//   };

//   const handleSearch = useDebouncedCallback((term: string) => {
//     setSearchTerm(term);
//     updateQuery("searchTerm", term);
//   }, 500);

//   // --- FETCH REAL DATA VIA RTK QUERY ---
//   const { data: listingData, isLoading } = useGetAllListingQuery(params) as any;
//   const [editListing, { isLoading: isUpdating }] = useEditListingMutation();
//   const listings = listingData?.data || [];
//   const meta = listingData?.meta || { page: 1, limit: 10, total: 0 };
//   const [view, setView] = useState<"LIST" | "ADD">("LIST");
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const addNew = searchParams.get("addNew") || "";

//   useEffect(() => {
//     if (addNew) {
//       setView("ADD");
//     }
//   }, [view]);

//   // --- MODAL STATES ---
//   const [activeListing, setActiveListing] = useState<any>(null);
//   const [modalType, setModalType] = useState<
//     "EDIT" | "DELETE" | "STATUS" | "BULK_DELETE" | null
//   >(null);

//   console.log(activeListing, "active");

//   // --- HANDLERS ---
//   const openActionModal = (
//     item: any,
//     type: "EDIT" | "DELETE" | "STATUS" | "BULK_DELETE",
//   ) => {
//     setActiveListing(item);
//     setModalType(type);
//   };

//   const closeModal = () => {
//     setModalType(null);
//     setActiveListing(null);
//   };

//   const handleSelectRow = (id: string) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedIds.length === listings.length) {
//       setSelectedIds([]);
//     } else {
//       setSelectedIds(listings.map((item: any) => item.id));
//     }
//   };

//   // Helper resetting to page 1 during adjustments
//   const handleFilterChange = (setter: (val: string) => void, value: string) => {
//     setter(value);
//     setPage(1);
//   };

//   // --- CENTRALIZED DELETE HANDLER ---
//   const handleDeleteExecute = async (idsToDelete: string[]) => {
//     try {
//       await deleteListing({ ids: idsToDelete }).unwrap();
//       toast.success(`${idsToDelete.length} listing(s) deleted successfully!`);

//       // Clear selections if deleted records were picked via bulk select
//       setSelectedIds((prev) => prev.filter((id) => !idsToDelete.includes(id)));
//       closeModal();
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to delete listing(s).");
//     }
//   };

//   const handleStatusUpdateExecute = async (
//     idsToUpdate: string[],
//     status: "PUBLISHED" | "ARCHIVED",
//   ) => {
//     const toastId = toast.loading(
//       `Updating status to ${status.toLowerCase()}...`,
//     );

//     try {
//       await bulkUpdateListing({
//         ids: idsToUpdate,
//         status,
//       }).unwrap();
//       toast.success(`Listing(s) ${status.toLowerCase()} successfully!`, {
//         id: toastId,
//       });

//       // Clear selection after bulk action
//       if (idsToUpdate.length > 1) {
//         setSelectedIds([]);
//       }

//       closeModal();
//     } catch (error: any) {
//       const errorMsg = error?.data?.message || "Failed to update status.";
//       toast.error(errorMsg, { id: toastId });
//     }
//   };

//   const handleArchive = async (id: string[]) => {
//     try {
//       const payload = {
//         id,
//         status: "ARCHIVED",
//       };
//       await archiveListing(payload).unwrap();
//       toast.success(`listing archived successfully!`);
//       closeModal();
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to archive listing(s).");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
//         <Loader2 className="animate-spin text-primary" size={40} />
//         <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
//           Loading Listing Data...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header Actions */}
//       <div className="flex flex-col sm:flex-row justify-between gap-5 sm:gap-0">
//         <div>
//           {view === "ADD" && (
//             <button
//               onClick={() => setView("LIST")}
//               className="flex gap-2 text-gray-500 mb-2 hover:text-primary transition-colors cursor-pointer"
//             >
//               <ArrowLeft size={18} /> Back
//             </button>
//           )}
//           <h1 className="text-3xl font-bold text-gray-900">
//             {view === "LIST" ? "All Listings" : "Add New Listing"}
//           </h1>
//           <p className="text-gray-500 font-medium">
//             {view === "LIST"
//               ? "Manage all cars and apartment listings"
//               : "Create a new car or apartment listing"}
//           </p>
//         </div>
//         {view === "LIST" && (
//           <button
//             onClick={() => setView("ADD")}
//             className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer w-full sm:w-auto"
//           >
//             <Plus size={20} /> Add New Listing
//           </button>
//         )}
//       </div>

//       {view === "LIST" ? (
//         <div className="space-y-4">
//           {/* --- NATIVE FILTERS COMPONENT --- */}
//           <div className="bg-white border border-gray-200 p-4 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-center gap-4">
//             {/* Search Input Bar */}
//             <div className="relative w-full md:flex-1">
//               <Search
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                 size={18}
//               />
//               <input
//                 type="text"
//                 placeholder="Search listings by title or location..."
//                 // value={searchTerm}
//                 defaultValue={searchParams.get("searchTerm") || ""}
//                 onChange={(e) => handleSearch(e.target.value)}
//                 className="w-full bg-gray-50/50 border border-gray-100 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors"
//               />
//             </div>

//             {/* Select Menus Section */}
//             <div className="flex gap-3 w-full md:w-auto items-center">
//               <div className="flex items-center gap-2 text-gray-400 px-1 hidden lg:flex">
//                 <SlidersHorizontal size={16} />
//                 <span className="text-xs font-bold uppercase tracking-wider">
//                   Filters:
//                 </span>
//               </div>

//               {/* Category Selector */}
//               <select
//                 value={category}
//                 // onChange={(e) =>
//                 //   handleFilterChange(setCategory, e.target.value)
//                 // }
//                 onChange={(e) => updateQuery("category", e.target.value)}
//                 className="flex-1 md:w-44 bg-gray-50/50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 focus:outline-none cursor-pointer"
//               >
//                 <option value="">All Categories</option>
//                 <option value="CAR">Car</option>
//                 <option value="APARTMENT">Apartment</option>
//               </select>

//               {/* Status Selector */}
//               <select
//                 value={status}
//                 // onChange={(e) => handleFilterChange(setStatus, e.target.value)}
//                 onChange={(e) => updateQuery("status", e.target.value)}
//                 className="flex-1 md:w-44 bg-gray-50/50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 focus:outline-none cursor-pointer"
//               >
//                 <option value="">All Statuses</option>
//                 <option value="PUBLISHED">Published</option>
//                 <option value="ARCHIVED">Archived</option>
//               </select>
//             </div>
//           </div>

//           {/* BULK ACTIONS BAR */}
//           {selectedIds.length > 0 && (
//             <div className="bg-[#EBF2F7] border border-blue-100 p-4 rounded-2xl flex flex-col sm:flex-row gap-5 sm:gap-0 items-center justify-between animate-in fade-in slide-in-from-top-2">
//               <span className="text-blue-900 font-bold text-sm flex-1">
//                 {selectedIds.length} listing(s) selected
//               </span>
//               <div className="flex gap-3 flex-col justify-end sm:flex-row flex-3 w-full">
//                 {selectedIds.length > 0 && (
//                   <div className="bg-[#EBF2F7] border border-blue-100 p-4 rounded-2xl flex items-center justify-between">
//                     <span className="text-blue-900 font-bold text-sm">
//                       {selectedIds.length} listing(s) selected
//                     </span>
//                     <div className="flex gap-3">
//                       <button
//                         onClick={() =>
//                           handleStatusUpdateExecute(selectedIds, "PUBLISHED")
//                         }
//                         className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
//                       >
//                         Publish Selected
//                       </button>
//                       <button
//                         onClick={() =>
//                           handleStatusUpdateExecute(selectedIds, "ARCHIVED")
//                         }
//                         className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
//                       >
//                         Archive Selected
//                       </button>
//                       {/* Existing Delete button */}
//                     </div>
//                   </div>
//                 )}
//                 <button
//                   onClick={() => openActionModal(null, "BULK_DELETE")}
//                   className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-600 cursor-pointer"
//                 >
//                   Delete Selected
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* TABLE CONTAINER */}
//           <div className="bg-white border border-gray-200 rounded-[2rem] overflow-hidden shadow-sm">
//             <div className="overflow-x-auto">
//               <table className="w-full text-left min-w-[1100px] border-collapse">
//                 <thead className="bg-gray-50/50 border-b border-gray-100">
//                   <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
//                     <th className="p-6 w-10">
//                       <input
//                         type="checkbox"
//                         className="accent-primary w-4 h-4 cursor-pointer"
//                         onChange={handleSelectAll}
//                         checked={
//                           listings.length > 0 &&
//                           selectedIds.length === listings.length
//                         }
//                       />
//                     </th>
//                     <th className="py-6">Thumbnail</th>
//                     <th className="py-6">Title</th>
//                     <th className="py-6">Category</th>
//                     <th className="py-6">Location</th>
//                     <th className="py-6">Price</th>
//                     <th className="py-6">Status</th>
//                     <th className="py-6">Bookings</th>
//                     <th className="py-6">Rating</th>
//                     <th className="py-6">Created</th>
//                     <th className="py-6 text-right px-6">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-50">
//                   {listings.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan={11}
//                         className="p-12 text-center text-gray-400 font-medium"
//                       >
//                         No listings match your selection criteria.
//                       </td>
//                     </tr>
//                   ) : (
//                     listings.map((item: any) => (
//                       <tr
//                         key={item.id}
//                         className="group hover:bg-gray-50/50 transition-colors"
//                       >
//                         <td className="p-6">
//                           <input
//                             type="checkbox"
//                             className="accent-primary w-4 h-4 cursor-pointer"
//                             checked={selectedIds.includes(item.id)}
//                             onChange={() => handleSelectRow(item.id)}
//                           />
//                         </td>
//                         <td className="py-5">
//                           <div className="w-16 h-12 rounded-lg bg-gray-100 relative overflow-hidden">
//                             {item.thumbnail && (
//                               // eslint-disable-next-line @next/next/no-img-element
//                               <img
//                                 src={item.thumbnail}
//                                 alt={item.title}
//                                 className="w-full h-full object-cover"
//                               />
//                             )}
//                           </div>
//                         </td>
//                         <td className="py-5">
//                           <p className="text-sm font-bold text-gray-900">
//                             {item.title}
//                           </p>
//                           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
//                             {item.listingId}
//                           </p>
//                         </td>
//                         <td className="py-5">
//                           <span
//                             className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
//                               item.category === "CAR"
//                                 ? "bg-purple-50 text-purple-600"
//                                 : "bg-blue-50 text-blue-600"
//                             }`}
//                           >
//                             {item.category}
//                           </span>
//                         </td>
//                         <td className="py-5 text-sm text-gray-500 font-medium">
//                           {item.location}
//                         </td>
//                         <td className="py-5 text-sm font-bold text-gray-900">
//                           {item.price}
//                         </td>
//                         <td className="py-5">
//                           <span
//                             className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
//                               item.status === "PUBLISHED"
//                                 ? "bg-green-50 text-green-600"
//                                 : "bg-orange-50 text-orange-600"
//                             }`}
//                           >
//                             {item.status}
//                           </span>
//                         </td>
//                         <td className="py-5 text-sm font-medium text-gray-700">
//                           {item.bookings || 0}
//                         </td>
//                         <td className="py-5 text-sm font-bold text-gray-900">
//                           ⭐ {item.rating || "0.0"}
//                         </td>
//                         <td className="py-5 text-sm text-gray-400 font-medium">
//                           {item.created}
//                         </td>
//                         <td className="py-5 text-right px-6">
//                           <div className="flex justify-end gap-2">
//                             <button
//                               onClick={() => openActionModal(item, "EDIT")}
//                               className="p-2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
//                             >
//                               <Edit size={18} />
//                             </button>
//                             <button
//                               onClick={() => openActionModal(item, "STATUS")}
//                               className="p-2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
//                             >
//                               {item.status === "PUBLISHED" ? (
//                                 <Archive size={18} />
//                               ) : (
//                                 <RotateCcw size={18} />
//                               )}
//                             </button>
//                             <button
//                               onClick={() => openActionModal(item, "DELETE")}
//                               className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
//                             >
//                               <Trash2 size={18} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             <Modal
//               isOpen={modalType === "STATUS"}
//               onClose={closeModal}
//               title={
//                 activeListing?.status === "PUBLISHED"
//                   ? "Archive Listing"
//                   : "Publish Listing"
//               }
//             >
//               <div className="text-center space-y-6">
//                 {/* Dynamic Icon Color */}
//                 <div
//                   className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
//                     activeListing?.status === "PUBLISHED"
//                       ? "bg-orange-50 text-orange-500"
//                       : "bg-green-50 text-green-500"
//                   }`}
//                 >
//                   {activeListing?.status === "PUBLISHED" ? (
//                     <Archive size={32} />
//                   ) : (
//                     <RotateCcw size={32} />
//                   )}
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">
//                     Confirm Action
//                   </h3>
//                   <p className="text-sm text-gray-500 leading-relaxed font-medium">
//                     Do you want to change the status of{" "}
//                     <span className="text-gray-900 font-bold">
//                       {activeListing?.title}
//                     </span>{" "}
//                     to
//                     <span className="font-black uppercase">
//                       {" "}
//                       {activeListing?.status === "PUBLISHED"
//                         ? "ARCHIVED"
//                         : "PUBLISHED"}
//                     </span>
//                     ?
//                   </p>
//                 </div>

//                 <div className="flex gap-4 pt-2">
//                   <button
//                     onClick={closeModal}
//                     className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-all cursor-pointer"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     disabled={isUpdatingStatus}
//                     onClick={() =>
//                       handleStatusUpdateExecute(
//                         [activeListing?.id],
//                         activeListing?.status === "PUBLISHED"
//                           ? "ARCHIVED"
//                           : "PUBLISHED",
//                       )
//                     }
//                     className={`flex-1 py-4 text-white rounded-2xl font-black shadow-lg transition-all active:scale-95 disabled:opacity-50 ${
//                       activeListing?.status === "PUBLISHED"
//                         ? "bg-orange-500 shadow-orange-100"
//                         : "bg-green-500 shadow-green-100"
//                     }`}
//                   >
//                     {isUpdatingStatus ? "Updating..." : "Yes, Confirm"}
//                   </button>
//                 </div>
//               </div>
//             </Modal>

//             {/* PAGINATION */}
//             <div className="px-8 border-t border-gray-50">
//               <Pagination
//                 total={meta?.total || 0}
//                 limit={meta?.limit || 10}
//                 page={meta?.page || 1}
//               />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <AddListingForm />
//       )}

//       {/* --- MODALS IMPLEMENTATION --- */}

//       {/* 1. EDIT MODAL */}
//       <Modal
//         isOpen={modalType === "EDIT"}
//         onClose={closeModal}
//         title={`Edit: ${activeListing?.listingId}`}
//         width="max-w-2xl"
//       >
//         {activeListing && (
//           <EditListingForm
//             initialData={activeListing}
//             onUpdate={async ({
//               payload,
//               files,
//             }: {
//               payload: any;
//               files: any;
//             }) => {
//               const toastId = toast.loading("Updating listing...");
//               try {
//                 await editListing({ id: activeListing.id, payload }).unwrap();

//                 toast.success("Listing updated successfully!", { id: toastId });
//                 closeModal();
//               } catch (error: any) {
//                 toast.error(error?.data?.message || "Update failed", {
//                   id: toastId,
//                 });
//               }
//             }}
//           />
//         )}
//       </Modal>

//       {/* 2. SINGLE DELETE MODAL */}
//       <Modal
//         isOpen={modalType === "DELETE"}
//         onClose={closeModal}
//         title="Confirm Delete"
//       >
//         <div className="text-center space-y-4">
//           <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
//             <Trash2 size={32} />
//           </div>
//           <p className="text-gray-500">
//             Are you sure you want to delete{" "}
//             <span className="font-bold text-gray-900">
//               {activeListing?.title}
//             </span>
//             ? This cannot be undone.
//           </p>
//           <div className="flex gap-3 pt-4">
//             <button
//               disabled={isDeleting}
//               onClick={closeModal}
//               className="flex-1 py-3 bg-gray-100 rounded-xl font-bold cursor-pointer disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               disabled={isDeleting}
//               onClick={() => handleDeleteExecute([activeListing?.id])}
//               className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold cursor-pointer hover:bg-red-600 disabled:opacity-50"
//             >
//               {isDeleting ? "Deleting..." : "Delete Now"}
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* 3. BULK DELETE MODAL */}
//       <Modal
//         isOpen={modalType === "BULK_DELETE"}
//         onClose={closeModal}
//         title="Confirm Bulk Delete"
//       >
//         <div className="text-center space-y-4">
//           <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
//             <Trash2 size={32} />
//           </div>
//           <p className="text-gray-500">
//             Are you sure you want to delete{" "}
//             <span className="font-bold text-red-600">
//               {selectedIds.length} selected listing(s)
//             </span>
//             ? This action is permanent and cannot be undone.
//           </p>
//           <div className="flex gap-3 pt-4">
//             <button
//               disabled={isDeleting}
//               onClick={closeModal}
//               className="flex-1 py-3 bg-gray-100 rounded-xl font-bold cursor-pointer disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               disabled={isDeleting}
//               onClick={() => handleDeleteExecute(selectedIds)}
//               className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold cursor-pointer hover:bg-red-600 disabled:opacity-50"
//             >
//               {isDeleting
//                 ? "Deleting..."
//                 : `Delete ${selectedIds.length} Items`}
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* 4. STATUS TOGGLE MODAL */}
//       <Modal
//         isOpen={modalType === "STATUS"}
//         onClose={closeModal}
//         title="Update Status"
//       >
//         <div className="text-center space-y-4">
//           <div
//             className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
//               activeListing?.status === "PUBLISHED"
//                 ? "bg-orange-50 primary"
//                 : "bg-green-50 text-green-500"
//             }`}
//           >
//             {activeListing?.status === "PUBLISHED" ? (
//               <Archive size={32} />
//             ) : (
//               <CheckCircle size={32} />
//             )}
//           </div>
//           <p className="text-gray-500">
//             Change status of{" "}
//             <span className="font-bold text-gray-900">
//               {activeListing?.title}
//             </span>{" "}
//             to{" "}
//             <span className="font-bold">
//               {activeListing?.status === "PUBLISHED" ? "ARCHIVED" : "PUBLISHED"}
//             </span>
//             ?
//           </p>
//           <div className="flex gap-3 pt-4">
//             <button
//               onClick={closeModal}
//               className="flex-1 py-3 bg-gray-100 rounded-xl font-bold cursor-pointer"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 handleStatusUpdateExecute(
//                   [activeListing?.id],
//                   activeListing?.status === "PUBLISHED"
//                     ? "ARCHIVED"
//                     : "PUBLISHED",
//                 );
//                 closeModal();
//               }}
//               className={`flex-1 py-3 text-white rounded-xl font-bold cursor-pointer ${
//                 activeListing?.status === "PUBLISHED"
//                   ? "bg-primary"
//                   : "bg-green-500"
//               }`}
//             >
//               Confirm
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default ListingsClient;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  Edit,
  Archive,
  Trash2,
  Plus,
  ArrowLeft,
  CheckCircle,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Loader2,
} from "lucide-react";
import AddListingForm from "./AddListingForm";
import { toast } from "sonner";
import Modal from "@/components/common/modals/Modal";
import {
  useBulkUpdateListingMutation,
  useDeleteListingMutation,
  useEditListingMutation,
  useGetAllListingQuery,
  useToArchiveMutation,
} from "@/redux/features/admin/listing.api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EditListingForm from "@/components/form/EditListingForm";
import Pagination from "@/components/common/Pagination";
import { useDebouncedCallback } from "use-debounce";
import { useTranslations, useLocale } from "next-intl";

const ListingsClient = () => {
  const t = useTranslations("AdminListings");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [archiveListing] = useToArchiveMutation();
  const [deleteListing, { isLoading: isDeleting }] = useDeleteListingMutation();
  const [bulkUpdateListing, { isLoading: isUpdatingStatus }] =
    useBulkUpdateListingMutation();

  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();
  const pathName = usePathname();

  const updateQuery = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set("page", "1");
    router.push(`${pathName}?${newParams.toString()}`, { scroll: false });
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term);
    updateQuery("searchTerm", term);
  }, 500);

  const { data: listingData, isLoading } = useGetAllListingQuery(params) as any;
  const [editListing, { isLoading: isUpdating }] = useEditListingMutation();
  const listings = listingData?.data || [];
  const meta = listingData?.meta || { page: 1, limit: 10, total: 0 };
  const [view, setView] = useState<"LIST" | "ADD">("LIST");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const addNew = searchParams.get("addNew") || "";

  useEffect(() => {
    if (addNew) setView("ADD");
  }, [addNew]);

  const [activeListing, setActiveListing] = useState<any>(null);
  const [modalType, setModalType] = useState<
    "EDIT" | "DELETE" | "STATUS" | "BULK_DELETE" | null
  >(null);

  const openActionModal = (
    item: any,
    type: "EDIT" | "DELETE" | "STATUS" | "BULK_DELETE",
  ) => {
    setActiveListing(item);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setActiveListing(null);
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === listings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(listings.map((item: any) => item.id));
    }
  };

  const handleDeleteExecute = async (idsToDelete: string[]) => {
    try {
      await deleteListing({ ids: idsToDelete }).unwrap();
      toast.success(t("toasts.deleted", { count: idsToDelete.length }));
      setSelectedIds((prev) => prev.filter((id) => !idsToDelete.includes(id)));
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message || t("toasts.errorDelete"));
    }
  };

  const handleStatusUpdateExecute = async (
    idsToUpdate: string[],
    status: "PUBLISHED" | "ARCHIVED",
  ) => {
    const toastId = toast.loading(
      t("toasts.updatingStatus", { status: status.toLowerCase() }),
    );
    try {
      await bulkUpdateListing({ ids: idsToUpdate, status }).unwrap();
      toast.success(
        t("toasts.statusSuccess", { status: status.toLowerCase() }),
        { id: toastId },
      );
      if (idsToUpdate.length > 1) setSelectedIds([]);
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message || t("toasts.errorStatus"), {
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

  return (
    <div className="space-y-6" dir={isRtl ? "rtl" : "ltr"}>
      <div className="flex flex-col sm:flex-row justify-between gap-5 sm:gap-0">
        <div className={isRtl ? "text-right" : "text-left"}>
          {view === "ADD" && (
            <button
              onClick={() => setView("LIST")}
              className="flex items-center gap-2 text-gray-500 mb-2 hover:text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} className={isRtl ? "rotate-180" : ""} />{" "}
              {t("header.backBtn")}
            </button>
          )}
          <h1 className="text-3xl font-bold text-gray-900">
            {view === "LIST" ? t("header.titleList") : t("header.titleAdd")}
          </h1>
          <p className="text-gray-500 font-medium">
            {view === "LIST"
              ? t("header.subtitleList")
              : t("header.subtitleAdd")}
          </p>
        </div>
        {view === "LIST" && (
          <button
            onClick={() => setView("ADD")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer w-full sm:w-auto"
          >
            <Plus size={20} /> {t("header.addBtn")}
          </button>
        )}
      </div>

      {view === "LIST" ? (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 p-4 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:flex-1">
              <Search
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${isRtl ? "right-4" : "left-4"}`}
                size={18}
              />
              <input
                type="text"
                placeholder={t("filters.searchPlaceholder")}
                defaultValue={searchParams.get("searchTerm") || ""}
                onChange={(e) => handleSearch(e.target.value)}
                className={`w-full bg-gray-50/50 border border-gray-100 py-3 rounded-xl text-sm focus:outline-none focus:border-primary/50 transition-colors ${isRtl ? "pr-11 pl-4" : "pl-11 pr-4"}`}
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto items-center">
              <div className="flex items-center gap-2 text-gray-400 px-1 hidden lg:flex">
                <SlidersHorizontal size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {t("filters.filterLabel")}
                </span>
              </div>

              <select
                value={category}
                onChange={(e) => updateQuery("category", e.target.value)}
                className="flex-1 md:w-44 bg-gray-50/50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 focus:outline-none cursor-pointer"
              >
                <option value="">{t("filters.allCategories")}</option>
                <option value="CAR">{t("filters.car")}</option>
                <option value="APARTMENT">{t("filters.apartment")}</option>
              </select>

              <select
                value={status}
                onChange={(e) => updateQuery("status", e.target.value)}
                className="flex-1 md:w-44 bg-gray-50/50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 focus:outline-none cursor-pointer"
              >
                <option value="">{t("filters.allStatuses")}</option>
                <option value="PUBLISHED">{t("filters.published")}</option>
                <option value="ARCHIVED">{t("filters.archived")}</option>
              </select>
            </div>
          </div>

          {selectedIds.length > 0 && (
            <div className="bg-[#EBF2F7] border border-blue-100 p-4 rounded-2xl flex flex-col sm:flex-row gap-5 items-center justify-between animate-in fade-in slide-in-from-top-2">
              <span className="text-blue-900 font-bold text-sm">
                {t("bulk.selected", { count: selectedIds.length })}
              </span>
              <div className="flex gap-3 flex-col sm:flex-row">
                <button
                  onClick={() =>
                    handleStatusUpdateExecute(selectedIds, "PUBLISHED")
                  }
                  className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  {t("bulk.publishBtn")}
                </button>
                <button
                  onClick={() =>
                    handleStatusUpdateExecute(selectedIds, "ARCHIVED")
                  }
                  className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  {t("bulk.archiveBtn")}
                </button>
                <button
                  onClick={() => openActionModal(null, "BULK_DELETE")}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-600 cursor-pointer"
                >
                  {t("bulk.deleteBtn")}
                </button>
              </div>
            </div>
          )}

          <div className="bg-white border border-gray-200 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table
                className={`w-full ${isRtl ? "text-right" : "text-left"} min-w-[1100px] border-collapse`}
              >
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    <th className="p-6 w-10">
                      <input
                        type="checkbox"
                        className="accent-primary w-4 h-4 cursor-pointer"
                        onChange={handleSelectAll}
                        checked={
                          listings.length > 0 &&
                          selectedIds.length === listings.length
                        }
                      />
                    </th>
                    <th className="py-6">{t("table.thumbnail")}</th>
                    <th className="py-6">{t("table.title")}</th>
                    <th className="py-6">{t("table.category")}</th>
                    <th className="py-6">{t("table.location")}</th>
                    <th className="py-6">{t("table.price")}</th>
                    <th className="py-6">{t("table.status")}</th>
                    <th className="py-6">{t("table.bookings")}</th>
                    <th className="py-6">{t("table.rating")}</th>
                    <th className="py-6">{t("table.created")}</th>
                    <th
                      className={`py-6 px-6 ${isRtl ? "text-left" : "text-right"}`}
                    >
                      {t("table.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {listings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={11}
                        className="p-12 text-center text-gray-400 font-medium"
                      >
                        {t("table.empty")}
                      </td>
                    </tr>
                  ) : (
                    listings.map((item: any) => (
                      <tr
                        key={item.id}
                        className="group hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="p-6">
                          <input
                            type="checkbox"
                            className="accent-primary w-4 h-4 cursor-pointer"
                            checked={selectedIds.includes(item.id)}
                            onChange={() => handleSelectRow(item.id)}
                          />
                        </td>
                        <td className="py-5">
                          <div className="w-16 h-12 rounded-lg bg-gray-100 relative overflow-hidden">
                            {item.thumbnail && (
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        </td>
                        <td className="py-5">
                          <p className="text-sm font-bold text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                            {item.listingId}
                          </p>
                        </td>
                        <td className="py-5">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${item.category === "CAR" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}
                          >
                            {item.category}
                          </span>
                        </td>
                        <td className="py-5 text-sm text-gray-500 font-medium">
                          {item.location}
                        </td>
                        <td className="py-5 text-sm font-bold text-gray-900">
                          {item.price}
                        </td>
                        <td className="py-5">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${item.status === "PUBLISHED" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-5 text-sm font-medium text-gray-700">
                          {item.bookings || 0}
                        </td>
                        <td className="py-5 text-sm font-bold text-gray-900">
                          ⭐ {item.rating || "0.0"}
                        </td>
                        <td className="py-5 text-sm text-gray-400 font-medium">
                          {item.created}
                        </td>
                        <td
                          className={`py-5 px-6 ${isRtl ? "text-left" : "text-right"}`}
                        >
                          <div
                            className={`flex gap-2 ${isRtl ? "justify-start" : "justify-end"}`}
                          >
                            <button
                              onClick={() => openActionModal(item, "EDIT")}
                              className="p-2 text-gray-400 hover:text-primary cursor-pointer"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => openActionModal(item, "STATUS")}
                              className="p-2 text-gray-400 hover:text-primary cursor-pointer"
                            >
                              {item.status === "PUBLISHED" ? (
                                <Archive size={18} />
                              ) : (
                                <RotateCcw size={18} />
                              )}
                            </button>
                            <button
                              onClick={() => openActionModal(item, "DELETE")}
                              className="p-2 text-gray-400 hover:text-red-500 cursor-pointer"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-8 border-t border-gray-50">
              <Pagination
                total={meta?.total || 0}
                limit={meta?.limit || 10}
                page={meta?.page || 1}
              />
            </div>
          </div>
        </div>
      ) : (
        <AddListingForm />
      )}

      {/* MODALS */}
      <Modal
        isOpen={modalType === "EDIT"}
        onClose={closeModal}
        title={`${t("modals.confirm")} : ${activeListing?.listingId}`}
        width="max-w-2xl"
      >
        {activeListing && (
          <EditListingForm
            initialData={activeListing}
            onUpdate={async ({ payload }: any) => {
              const toastId = toast.loading(
                t("toasts.updatingStatus", { status: "" }),
              );
              try {
                await editListing({ id: activeListing.id, payload }).unwrap();
                toast.success(t("toasts.updateSuccess"), { id: toastId });
                closeModal();
              } catch (error: any) {
                toast.error(error?.data?.message || t("toasts.errorUpdate"), {
                  id: toastId,
                });
              }
            }}
          />
        )}
      </Modal>

      <Modal
        isOpen={modalType === "DELETE"}
        onClose={closeModal}
        title={t("modals.deleteTitle")}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <Trash2 size={32} />
          </div>
          <p className="text-gray-500">
            {t.rich("modals.areYouSure", {
              title: () => (
                <span className="font-bold text-gray-900">
                  {activeListing?.title}
                </span>
              ),
            })}
          </p>
          <div className="flex gap-3 pt-4">
            <button
              disabled={isDeleting}
              onClick={closeModal}
              className="flex-1 py-3 bg-gray-100 rounded-xl font-bold cursor-pointer"
            >
              {t("modals.cancel")}
            </button>
            <button
              disabled={isDeleting}
              onClick={() => handleDeleteExecute([activeListing?.id])}
              className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold cursor-pointer"
            >
              {isDeleting ? t("modals.deleting") : t("modals.deleteNow")}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalType === "BULK_DELETE"}
        onClose={closeModal}
        title={t("modals.bulkDeleteTitle")}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <Trash2 size={32} />
          </div>
          <p className="text-gray-500">
            {t.rich("modals.bulkAreYouSure", {
              count: () => (
                <span className="font-bold text-red-600">
                  {selectedIds.length}
                </span>
              ),
            })}
          </p>
          <div className="flex gap-3 pt-4">
            <button
              disabled={isDeleting}
              onClick={closeModal}
              className="flex-1 py-3 bg-gray-100 rounded-xl font-bold cursor-pointer"
            >
              {t("modals.cancel")}
            </button>
            <button
              disabled={isDeleting}
              onClick={() => handleDeleteExecute(selectedIds)}
              className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold cursor-pointer"
            >
              {isDeleting
                ? t("modals.deleting")
                : t("modals.bulkDeleteBtn", { count: selectedIds.length })}
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalType === "STATUS"}
        onClose={closeModal}
        title={
          activeListing?.status === "PUBLISHED"
            ? t("modals.archiveTitle")
            : t("modals.publishTitle")
        }
      >
        <div className="text-center space-y-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${activeListing?.status === "PUBLISHED" ? "bg-orange-50 text-orange-500" : "bg-green-50 text-green-500"}`}
          >
            {activeListing?.status === "PUBLISHED" ? (
              <Archive size={32} />
            ) : (
              <CheckCircle size={32} />
            )}
          </div>
          <p className="text-gray-500">
            {t.rich("modals.statusQuestion", {
              title: () => (
                <span className="font-bold text-gray-900">
                  {activeListing?.title}
                </span>
              ),
              status: () => (
                <span className="font-bold">
                  {activeListing?.status === "PUBLISHED"
                    ? t("filters.archived")
                    : t("filters.published")}
                </span>
              ),
            })}
          </p>
          <div className="flex gap-3 pt-4">
            <button
              onClick={closeModal}
              className="flex-1 py-3 bg-gray-100 rounded-xl font-bold cursor-pointer"
            >
              {t("modals.cancel")}
            </button>
            <button
              disabled={isUpdatingStatus}
              onClick={() =>
                handleStatusUpdateExecute(
                  [activeListing?.id],
                  activeListing?.status === "PUBLISHED"
                    ? "ARCHIVED"
                    : "PUBLISHED",
                )
              }
              className={`flex-1 py-3 text-white rounded-xl font-bold cursor-pointer ${activeListing?.status === "PUBLISHED" ? "bg-orange-500" : "bg-green-500"}`}
            >
              {isUpdatingStatus ? t("modals.updating") : t("modals.confirm")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ListingsClient;
