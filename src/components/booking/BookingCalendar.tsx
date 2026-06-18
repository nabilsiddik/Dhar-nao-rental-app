"use client";

import "react-day-picker/dist/style.css";
import { isWithinInterval, eachDayOfInterval, isSameDay } from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import { toast } from "sonner";
import "react-day-picker/dist/style.css";

const BookingCalendar = ({
  dateRange,
  setDateRange,
  bookedDates,
}: {
  dateRange: any;
  setDateRange: any;
  bookedDates: any[];
}) => {
  // Function to check if a day is booked
  // const isBooked = (day: Date) => {
  //   return bookedDates.some((interval) =>
  //     isWithinInterval(day, { start: interval.from, end: interval.to }),
  //   );
  // };

  const isBooked = (day: Date) => {
    const checkDay = new Date(day.getFullYear(), day.getMonth(), day.getDate());

    return bookedDates.some((interval: any) => {
      const start = new Date(interval.from.split("T")[0]);
      const end = new Date(interval.to.split("T")[0]);

      // Ensure the hours are set to 0 to match the 'day' provided by DayPicker
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      return checkDay >= start && checkDay <= end;
    });
  };

  console.log(bookedDates, "booked kk");

  // 2. THE FIX: Validate the entire selected range
  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      const allDaysInRange = eachDayOfInterval({
        start: range.from,
        end: range.to,
      });

      // Check if ANY of those days are in the booked list
      const hasConflict = allDaysInRange.some((day) => isBooked(day));

      if (hasConflict) {
        toast.error(
          "Selected range includes already booked dates. Please choose another range.",
        );
        // Reset to just the first date clicked, or undefined
        setDateRange({ from: range.from, to: undefined });
        return;
      }
    }

    // If no conflict, update the state normally
    setDateRange(range);
  };

  return (
    <div className="p-4 rounded-3xl border  w-full max-w-md">
      <style>{`
        /* Overriding react-day-picker styles to match your UI */
        .rdp {
          --rdp-cell-size: 45px;
          --rdp-accent-color: #1A1A1A; /* Black for selected start/end */
          --rdp-background-alpha: 0.1;
          margin: 0;
        }
        /* Style for the day cells */
        .rdp-day {
          border-radius: 12px;
          font-weight: 500;
          color: #4B5563;
        }
        /* Style for start and end selection (Black) */
        .rdp-day_selected:not(.rdp-day_range_middle) {
          background-color: #1A1A1A !important;
          color: white !important;
          border-radius: 12px !important;
        }
        /* Style for the range in between (Light Gray) */
        .rdp-day_range_middle {
          background-color: #E5E7EB !important;
          color: #1A1A1A !important;
          border-radius: 0 !important;
        }
        /* Style for Booked Dates (Orange) */
        .booked-day {
          background-color: #F19C4A !important;
          color: white !important;
          border-radius: 12px !important;
        }
        .rdp-nav_button {
            background: white;
            border-radius: 8px;
            border: 1px solid #E5E7EB;
        }
        .rdp-head_cell {
            color: #9CA3AF;
            font-weight: 400;
            text-transform: none;
            font-size: 14px;
        }
        .rdp-caption_label {
            font-weight: 600;
            font-size: 16px;
        }
      `}</style>

      <DayPicker
        mode="range"
        selected={dateRange}
        onSelect={handleSelect}
        disabled={isBooked}
        modifiers={{ booked: isBooked }}
        modifiersClassNames={{ booked: "booked-day" }}
        // defaultMonth={new Date(2026, 5)}
        defaultMonth={dateRange?.from || new Date()}
        showOutsideDays
      />

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#F19C4A]" />
        <span className="text-xs font-medium text-[#F19C4A]">Booked</span>
      </div>
    </div>
  );
};

export default BookingCalendar;
