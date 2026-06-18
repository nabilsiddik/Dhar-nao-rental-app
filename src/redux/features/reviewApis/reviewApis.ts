import { baseApi } from "@/redux/api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getUserProfile: builder.query({
    //   query: () => ({
    //     url: "/auth/profile",
    //     method: "GET",
    //   }),
    //   providesTags: ["User"],
    // }),
    submitReview: builder.mutation({
      query: ({
        payload,
        bookingId,
      }: {
        payload: {
          rating: number;
          comment: string;
          listingId: string;
        };
        bookingId: string;
      }) => ({
        url: `/reviews/${bookingId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const { useSubmitReviewMutation } = reviewApi;
