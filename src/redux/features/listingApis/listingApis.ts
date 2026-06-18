import { baseApi } from "@/redux/api/baseApi";

const listingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllListings: builder.query({
      query: (params) => ({
        url: "/listings/browse",
        method: "GET",
        params,
      }),
      providesTags: ["Listing"],
    }),
    getSingleListing: builder.query({
      query: (id: string) => ({
        url: `/listings/${id}`,
        method: "GET",
      }),
      providesTags: ["Listing"],
    }),
    getUniqueCities: builder.query({
      query: () => ({
        url: `/listings/cities`,
        method: "GET",
      }),
      providesTags: ["Listing"],
    }),
  }),
});

export const { useGetAllListingsQuery, useGetSingleListingQuery, useGetUniqueCitiesQuery } = listingApi;
