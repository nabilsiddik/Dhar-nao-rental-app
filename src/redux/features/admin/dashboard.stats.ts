import { baseApi } from "@/redux/api/baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => ({
        url: "/admin/stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;
