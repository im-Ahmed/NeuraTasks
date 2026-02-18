import type { ApiResponse } from "@/types/generalTypes";
import type { User } from "@/types/UserTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type LoginResponse = ApiResponse<{
  user: Partial<User>;
}>;

type UserProfileResponse = ApiResponse<{
  user: Partial<User>;
}>;
export type AllUserResponse = ApiResponse<{
  users: Array<Partial<User>>;
}>;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/users" }),
  endpoints: (build) => ({
    registerUser: build.mutation<ApiResponse<User>, Partial<User>>({
      query: (body) => ({
        url: "register",
        method: "POST",
        body,
      }),
    }),
    loginUser: build.mutation<LoginResponse, Pick<User, "email" | "password">>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
    getUserProfile: build.query<UserProfileResponse, void>({
      query: () => ({
        url: "profile",
        method: "GET",
        credentials: "include",
      }),
    }),
    logoutUser: build.mutation<ApiResponse<{}>, void>({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    deleteUser: build.mutation<ApiResponse<{}>, void>({
      query: () => ({
        url: "delete",
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getAllUser: build.query<AllUserResponse, void>({
      query: () => ({
        url: "all",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useDeleteUserMutation,
  useGetUserProfileQuery,
  useGetAllUserQuery,
} = userApi;
