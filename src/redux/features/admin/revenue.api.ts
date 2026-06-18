import { baseApi } from "@/redux/api/baseApi";

const revenueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevenueOverview: builder.query({
      query: () => {
        return {
          url: "/admin/revenue-overview",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetRevenueOverviewQuery } = revenueApi;
