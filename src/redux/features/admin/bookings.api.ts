/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (args: any) => {
        const params = new URLSearchParams();

        if (args && args.length > 0) {
          args.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/admin/bookings",
          method: "GET",
          params: params,
        };
      },
    }),
    sendMessageToCustomer: builder.mutation({
      query: ({
        id,
        body,
      }: {
        id: string;
        body: { subject: string; message: string };
      }) => ({
        url: `/admin/${id}/message-customer`,
        method: "POST",
        body,
      }),
    }),

    processRefund: builder.mutation({
      query: (id: string) => ({
        url: `/admin/${id}/process-refund`,
        method: "POST",
      }),
      invalidatesTags: ["Booking"],
    }),

    adminCancelBooking: builder.mutation({
      query: (id: string) => ({
        url: `/admin/${id}/admin-cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Booking"],
    }),

    updateAdminNote: builder.mutation({
      query: ({ id, note }: { id: string; note: string }) => ({
        url: `/admin/bookings/${id}/admin-note`,
        method: "PATCH",
        body: { note },
      }),
      invalidatesTags: ["Booking"],
    }),

    getManualPreview: builder.mutation({
      query: (data) => ({
        url: "/bookings/manual/preview",
        method: "POST",
        body: data,
      }),
    }),
    createManualBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings/manual",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking", "Transaction"],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useSendMessageToCustomerMutation,
  useProcessRefundMutation,
  useAdminCancelBookingMutation,
  useUpdateAdminNoteMutation,
  useGetManualPreviewMutation,
  useCreateManualBookingMutation,
} = bookingApi;
