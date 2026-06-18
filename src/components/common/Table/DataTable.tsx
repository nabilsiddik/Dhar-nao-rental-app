// "use client";

// import React, { useState } from "react";
// import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

// interface Column {
//   header: string;
//   accessor: string;
//   render?: (value: any, row: any) => React.ReactNode;
// }

// interface DataTableProps {
//   columns: Column[];
//   data: any[];
//   onSelectChange?: (selectedIds: string[]) => void;
// }

// const DataTable = ({ columns, data, onSelectChange }: DataTableProps) => {
//   const [selectedRows, setSelectedRows] = useState<string[]>([]);

//   const toggleAll = () => {
//     if (selectedRows.length === data.length) {
//       setSelectedRows([]);
//       onSelectChange?.([]);
//     } else {
//       const allIds = data.map((d) => d.id);
//       setSelectedRows(allIds);
//       onSelectChange?.(allIds);
//     }
//   };

//   const toggleRow = (id: string) => {
//     const newSelected = selectedRows.includes(id)
//       ? selectedRows.filter((rid) => rid !== id)
//       : [...selectedRows, id];
//     setSelectedRows(newSelected);
//     onSelectChange?.(newSelected);
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-[1.5rem] overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-50 border-b border-gray-200">
//               <th className="p-5 w-10">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 accent-primary"
//                   onChange={toggleAll}
//                   checked={
//                     selectedRows.length === data.length && data.length > 0
//                   }
//                 />
//               </th>
//               {columns.map((col) => (
//                 <th
//                   key={col.header}
//                   className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest"
//                 >
//                   {col.header}
//                 </th>
//               ))}
//               <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {data.map((row) => (
//               <tr
//                 key={row.id}
//                 className="hover:bg-gray-50/50 transition-colors"
//               >
//                 <td className="p-5">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 accent-primary"
//                     checked={selectedRows.includes(row.id)}
//                     onChange={() => toggleRow(row.id)}
//                   />
//                 </td>
//                 {columns.map((col) => (
//                   <td
//                     key={col.header}
//                     className="p-5 text-sm text-gray-700 font-medium"
//                   >
//                     {col.render
//                       ? col.render(row[col.accessor], row)
//                       : row[col.accessor]}
//                   </td>
//                 ))}
//                 <td className="p-5 text-right">
//                   <button className="p-2 text-gray-400 hover:text-primary transition-colors">
//                     <MoreHorizontal size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* REUSABLE PAGINATION UI */}
//       <div className="p-5 border-t border-gray-100 flex items-center justify-between">
//         <p className="text-sm text-gray-500 font-medium">
//           Showing {data.length} of {data.length} entries
//         </p>
//         <div className="flex items-center gap-2">
//           <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-400">
//             <ChevronLeft size={18} />
//           </button>
//           <button className="w-9 h-9 bg-primary text-white rounded-lg text-sm font-bold">
//             1
//           </button>
//           <button className="w-9 h-9 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50">
//             2
//           </button>
//           <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-400">
//             <ChevronRight size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DataTable;

"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";

// 1. Export the Column interface so other files can use it
export interface Column {
  header: string;
  accessor: string;
  className?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

// 2. Explicitly define Props
interface DataTableProps {
  columns: Column[];
  data: any[]; // Data must contain an 'id' field
  selectedIds: string[]; // This was likely missing in your version
  onSelectRow: (id: string) => void;
  onSelectAll: (data: any[]) => void;
  isLoading?: boolean;
}

const DataTable = ({
  columns,
  data,
  selectedIds,
  onSelectRow,
  onSelectAll,
  isLoading,
}: DataTableProps) => {
  const isAllSelected = data.length > 0 && selectedIds.length === data.length;

  return (
    <div className="bg-white border border-gray-200 rounded-[2rem] overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              <th className="p-6 w-10">
                <input
                  type="checkbox"
                  className="accent-primary w-4 h-4 cursor-pointer"
                  checked={isAllSelected}
                  onChange={() => onSelectAll(data)}
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.header}
                  className={`py-6 px-4 ${col.className || ""}`}
                >
                  {col.header}
                </th>
              ))}
              <th className="py-6 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="py-20 text-center text-gray-400"
                >
                  Loading...
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="group hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-6">
                    <input
                      type="checkbox"
                      className="accent-primary w-4 h-4 cursor-pointer"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => onSelectRow(row.id)}
                    />
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.header}
                      className={`py-5 px-4 text-sm font-medium text-gray-700 ${col.className || ""}`}
                    >
                      {col.render
                        ? col.render(row[col.accessor], row)
                        : row[col.accessor]}
                    </td>
                  ))}
                  <td className="py-5 px-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-primary transition-colors cursor-pointer">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
