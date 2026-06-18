/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/admin/users",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),
    softDeleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/admin/admin/users/soft-delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    suspendUser: builder.mutation({
      query: (id: string) => ({
        url: `/admin/users/suspend/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    saveUserNote: builder.mutation({
      query: ({ id, note }: { id: string; note: string }) => ({
        url: `/admin/user/${id}/notes`,
        method: "PATCH",
        body: { note },
      }),
      invalidatesTags: ["User"],
    }),
    updateUserStatus: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/admin/users/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useSoftDeleteUserMutation,
  useSuspendUserMutation,
  useSaveUserNoteMutation,
  useUpdateUserStatusMutation,
} = usersApi;
