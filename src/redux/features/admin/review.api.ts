import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (params) => ({
        url: "/admin/reviews",
        method: "GET",
        params,
      }),
      providesTags: ["Review"],
    }),
    updateReviewStatus: builder.mutation({
      query: ({
        id,
        status,
      }: {
        id: string;
        status: "APPROVED" | "REJECTED";
      }) => ({
        url: `/admin/reviews/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const { useGetAllReviewsQuery, useUpdateReviewStatusMutation } =
  reviewApi;
