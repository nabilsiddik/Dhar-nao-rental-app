import { baseApi } from "@/redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reserveAndPayBooking: builder.mutation({
      query: (bookingData: any) => ({
        url: `/bookings/reserve-and-pay`,
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["Booking", "Listing"],
    }),
    getBookedDates: builder.query({
      query: (listingId: string) => ({
        url: `/bookings/booked-dates/${listingId}`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    getMyBookings: builder.query({
      query: () => ({
        url: `/bookings/my-bookings`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    getBookingDetails: builder.query({
      query: (bookingId: string) => ({
        url: `/bookings/${bookingId}`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    downloadBookingReceipt: builder.query({
      query: (bookingId: string) => ({
        url: `/bookings/${bookingId}/receipt`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    cancelBooking: builder.mutation({
      query: (bookingId: string) => ({
        url: `/bookings/cancel/${bookingId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Booking", "User"],
    }),
  }),
});

export const { useReserveAndPayBookingMutation, useGetBookedDatesQuery, useGetMyBookingsQuery, useGetBookingDetailsQuery, useDownloadBookingReceiptQuery, useCancelBookingMutation } = bookingApi;
