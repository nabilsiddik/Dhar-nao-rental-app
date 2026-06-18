import { baseApi } from "@/redux/api/baseApi";

const commissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/settings",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Settings"], // Auto-refetch GET query
    }),
    getCommissionCalculator: builder.query({
      query: () => {
        return {
          url: "/settings/commission-calculator",
          method: "GET",
        };
      },
      providesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetCommissionCalculatorQuery,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} = commissionApi;
