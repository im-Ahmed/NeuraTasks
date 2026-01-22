import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "@/types/generalTypes";
import type { Board } from "@/types/BoardTypes";

type BoardResponse = ApiResponse<{ boards: Board[] }>;

export const boardApi = createApi({
  reducerPath: "boardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/boards",
    credentials: "include",
    // prepareHeaders: (headers) => {
    //   const token = localStorage.getItem("accessToken"); // or from Redux store
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (build) => ({
    getBoards: build.query<BoardResponse, void>({
      query: () => "/",
    }),
  }),
});
export const { useGetBoardsQuery } = boardApi;
