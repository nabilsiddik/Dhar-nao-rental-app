"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";

interface DatePickerProps {
  className?: string;
  placeholder?: string;
  onDateChange?: (range: DateRange | undefined) => void;
  initialValue?: DateRange;
  onClear?: () => void;
}

export function DatePickerWithRange({
  placeholder = "Select Dates",
  className,
  onDateChange,
  initialValue,
  onClear,
}: DatePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(initialValue);

  console.log(initialValue, "selected date in date picker");

  useEffect(() => {
    if (initialValue) setDate(initialValue);
  }, [initialValue]);

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (onDateChange) onDateChange(range);
  };

  return (
    <div
      className={cn(
        "grid gap-2 bg-[#F6F6F6] rounded-full py-2 px-2 relative",
        className,
      )}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"ghost"}
            className={cn(
              "w-full justify-start text-left font-bold text-sm h-10 px-1 hover:bg-transparent",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className="text-gray-400 font-medium">{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 rounded-3xl" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            // Use 'as any' here to bypass the Shadcn wrapper type mismatch
            onSelect={handleSelect as any}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {date?.from && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();

            setDate(undefined);

            onDateChange?.(undefined);

            onClear?.();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors z-20"
        >
          <X className="w-4 h-4 text-primary" />
        </button>
      )}
    </div>
  );
}
