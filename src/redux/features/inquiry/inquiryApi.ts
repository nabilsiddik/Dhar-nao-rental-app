import baseApi from "@/redux/api/baseApi";
import { url } from "inspector";

const inquiryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendInquiry: builder.mutation({
      query: (data) => ({
        url: "/inquiries/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Inquiry"],
    }),

    getInquiryById: builder.query({
      query: (id: string) => ({
        url: `/inquiries/${id}`,
        method: "GET",
      }),
      providesTags: ["Inquiry"],
    }),

    replyToInquiry: builder.mutation({
      query: ({ id, body }) => ({
        url: `/inquiries/${id}/reply`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Inquiry"],
    }),

    updateInquiry: builder.mutation({
      query: ({ id, body }) => ({
        url: `/inquiries/${id}/update`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Inquiry"],
    }),
  }),
});

export const {
  useGetInquiryByIdQuery,
  useSendInquiryMutation,
  useReplyToInquiryMutation,
  useUpdateInquiryMutation,
} = inquiryApi;
