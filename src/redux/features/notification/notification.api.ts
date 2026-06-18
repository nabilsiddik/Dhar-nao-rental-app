/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allNotifications: builder.query({
      query: () => {
        return {
          url: "/notifications",
          method: "GET",
        };
      },
      providesTags: ["Notification"],
    }),
    deleteNotification: builder.mutation({
      query: (id: string) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
    markAllAsRead: builder.mutation({
      query: () => ({
        url: "/notifications/mark-all-read",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useAllNotificationsQuery,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
} = notificationApi;
