import { baseApi } from "@/redux/api/baseApi";

const inquiryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInquiries: builder.query({
      query: (params: any) => {
        return {
          url: "/inquiries",
          method: "GET",
          params,
        };
      },
      providesTags: ["Inquiry"],
    }),
    deleteInquiry: builder.mutation({
      query: (id: string) => ({
        url: `/inquiries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inquiry"],
    }),
    sendMessageToUser: builder.mutation({
      query: ({
        id,
        body,
      }: {
        id: string;
        body: { subject: string; message: string };
      }) => ({
        url: `/admin/users/${id}/message`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllInquiriesQuery,
  useDeleteInquiryMutation,
  useSendMessageToUserMutation,
} = inquiryApi;
