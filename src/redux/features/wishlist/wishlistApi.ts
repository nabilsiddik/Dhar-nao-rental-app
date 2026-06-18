import { baseApi } from "@/redux/api/baseApi";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    toggleWishlist: builder.mutation({
      query: (listingId: String) => ({
        url: `/wishlists/toggle/${listingId}`,
        method: "POST",
      }),
      invalidatesTags: ["Listing"],
    }),
    getMyWishlist: builder.query({
      query: () => ({
        url: `/wishlists/my-wishlist`,
        method: "GET",
      }),
      providesTags: ["Wishlist", "Listing"],
    }),
  }),
});

export const { useToggleWishlistMutation, useGetMyWishlistQuery } = wishlistApi;
