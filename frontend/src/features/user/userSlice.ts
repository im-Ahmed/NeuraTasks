import type { ApiResponse } from "@/types/generalTypes";
import type { User } from "@/types/UserTypes";
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type LoginResponse = ApiResponse<{
  user: Partial<User>;
}>;

type UserProfileResponse = ApiResponse<{
  user: Partial<User>;
}>;
export type AuthState = {
  isAdmin: boolean;
  user: Partial<User> | null;
};

const initialState: AuthState = {
  isAdmin: false,
  user: null,
};
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
  }),
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: { payload: AuthState }) {
      state.isAdmin = action.payload.isAdmin;
      state.user = action.payload.user;
    },
    clearAuth(state) {
      state.isAdmin = false;
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useDeleteUserMutation,
  useGetUserProfileQuery,
} = userApi;
