import { baseApi } from "@/redux/api/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (params: any) => {
        return {
          url: "/admin/transactions",
          method: "GET",
          params,
        };
      },
    }),
  }),
});

export const { useGetTransactionsQuery } = transactionApi;
