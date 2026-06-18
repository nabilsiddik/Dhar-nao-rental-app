import Image from "next/image";
import { AlertTriangle, Star } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useCancelBookingMutation } from "@/redux/features/bookingApis/bookingApis";
import { toast } from "sonner";
import { useState } from "react";
import Modal from "../common/modals/Modal";
import { useTranslations, useLocale } from "next-intl";

interface BookingCardProps {
  booking: any;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  const t = useTranslations("Account");
  const { id, status, totalPrice, startDate, endDate, listing, isReviewed } =
    booking;
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  console.log(booking, "my booking");

  const [cancelBooking, { isLoading }] = useCancelBookingMutation();

  // Casing logic for UI
  const isUpcoming = status === "UPCOMING";
  const isCompleted = status === "COMPLETED";

  const handleConfirmCancellation = async () => {
    if (!isUpcoming) {
      toast.error("Only Upcomming Booking Can be canceled.");
    }

    const toastId = toast.loading("Processing cancellation...");

    try {
      const res = await cancelBooking(id).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Booking cancelled successfully", {
          id: toastId,
        });
        setIsCancelModalOpen(false);
      }
    } catch (error: any) {
      const errorMsg =
        error?.data?.message || "Failed to cancel booking. Please try again.";
      toast.error(errorMsg, { id: toastId });
    }
  };

  const dateDisplay =
    startDate && endDate
      ? `${format(new Date(startDate), "MMMM d")} - ${format(new Date(endDate), "MMMM d, yyyy")}`
      : "Dates N/A";

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-5 flex flex-col md:flex-row gap-6 relative group hover:shadow-sm transition-all">
      {/* 1. Status Badge - Absolute Positioned Top Right */}
      <div className="absolute top-5 right-6">
        <span
          className={`text-[11px] font-bold px-3 py-1 rounded-full ${
            isUpcoming
              ? "bg-green-50 text-green-600"
              : "bg-orange-50 text-orange-600"
          }`}
        >
          {status}
        </span>
      </div>

      {/* 2. Listing Thumbnail */}
      <div className="relative w-full md:w-36 h-28 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
        {listing?.images?.[0] ? (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-bold text-[10px] uppercase">
            No Image
          </div>
        )}
      </div>

      {/* 3. Info Section */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {listing?.title || "Unknown Listing"}
          </h3>
          <p className="text-sm text-gray-500 font-medium">
            {listing?.city}, {listing?.country}
          </p>
          <p className="text-sm text-gray-400 font-medium">{dateDisplay}</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center justify-between">
          {/* Total Paid Label */}
          <p className="text-sm text-gray-500 font-medium">
            Total paid:{" "}
            <span className="text-gray-900 font-bold ml-1">${totalPrice}</span>
          </p>

          {/* 4. Actions Section */}
          <div className="flex items-center gap-3">
            {isReviewed && isCompleted ? (
              <button
                disabled={true}
                className="flex items-center gap-2 bg-[#F3F4F6] px-5 py-2 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-200 transition cursor-pointer"
              >
                <Star size={16} className="text-gray-600" />
                Review Submitted
              </button>
            ) : (
              isCompleted && (
                <Link
                  target="_blank"
                  href={`/review/${id}?listingId=${listing?.id}`}
                >
                  <button className="flex items-center gap-2 bg-[#F3F4F6] px-5 py-2 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-200 transition cursor-pointer">
                    <Star size={16} className="text-gray-600" />
                    Give a review
                  </button>
                </Link>
              )
            )}

            <Link href={`/booking/${id}`}>
              <button className="bg-[#F3F4F6] px-5 py-2 rounded-full text-sm font-bold text-gray-700 hover:bg-gray-200 transition cursor-pointer">
                {t("bookings.viewBtn")}
              </button>
            </Link>

            {isUpcoming && (
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="text-red-500 font-bold text-sm hover:underline ml-2 cursor-pointer active:opacity-60 transition-all"
              >
                {t("bookings.cancelBtn")}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. CONFIRMATION MODAL */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Cancel Reservation"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle size={32} />
          </div>
          <p className="text-gray-900 font-bold text-lg">Are you sure?</p>
          <p className="text-gray-500 text-sm leading-relaxed">
            Do you really want to cancel your booking for{" "}
            <span className="font-bold text-gray-900">{listing?.title}</span>?
            If you are within 48 hours of the start date, a refund will be
            processed to your card.
          </p>

          <div className="flex gap-3 pt-6">
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-all cursor-pointer"
            >
              No, Keep it
            </button>
            <button
              onClick={handleConfirmCancellation}
              disabled={isLoading}
              className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 shadow-lg shadow-red-100 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Cancelling..." : "Yes, Cancel"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingCard;
