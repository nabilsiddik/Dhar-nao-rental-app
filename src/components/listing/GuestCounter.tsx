"use client";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

const GuestCounter = ({ onChange }: { onChange?: (val: number) => void }) => {
  const [count, setCount] = useState(1);

  const update = (val: number) => {
    const newCount = Math.max(1, count + val);
    setCount(newCount);
    onChange?.(newCount);
  };

  return (
    <div className="flex items-center justify-between bg-[#F6F6F6] rounded-full px-4 py-3 border border-transparent focus-within:border-primary transition-all">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => update(-1)}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-gray-200 shadow-sm active:scale-90 transition-all"
        >
          <Minus size={14} />
        </button>
        <span className="text-sm font-black text-gray-900 w-4 text-center">
          {count}
        </span>
        <button
          type="button"
          onClick={() => update(1)}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-gray-200 shadow-sm active:scale-90 transition-all"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};

export default GuestCounter;
