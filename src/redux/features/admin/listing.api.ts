/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllListing: builder.query({
    //   query: (args: any) => {
    //     const params = new URLSearchParams();
    //     if (args && args.length > 0) {
    //       args.forEach((item: any) => {
    //         params.append(item.name, item.value as string);
    //       });
    //     }
    //     return {
    //       url: "/admin/listings",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   providesTags: ["Listing"],
    // }),

    getAllListing: builder.query({
      query: (params) => {
        return {
          url: "/admin/listings",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Listing"],
    }),

    deleteListing: builder.mutation({
      query: (data) => ({
        url: "/admin/listings/bulk-delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Listing"],
    }),

    addListing: builder.mutation({
      query: (data) => ({
        url: "/listings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Listing"],
    }),

    toArchive: builder.mutation({
      query: (data) => ({
        url: `/admin/listings/${data.id}`,
        method: "PATCH",
        body: data.status,
      }),
      invalidatesTags: ["Listing"],
    }),

    editListing: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/admin/listings/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Listing"],
    }),

    bulkUpdateListing: builder.mutation({
      query: (data: { ids: string[]; status: "PUBLISHED" | "ARCHIVED" }) => ({
        url: `/admin/listings/bulk-status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Listing"],
    }),
  }),
});

export const {
  useGetAllListingQuery,
  useDeleteListingMutation,
  useAddListingMutation,
  useToArchiveMutation,
  useBulkUpdateListingMutation,
  useEditListingMutation,
} = statsApi;
