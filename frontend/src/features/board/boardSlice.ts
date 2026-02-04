import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ApiResponse } from "@/types/generalTypes";
import type { Board, CreateBoard } from "@/types/BoardTypes";

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
    // create new boards
    addBoard: build.mutation<ApiResponse<Board>, CreateBoard>({
      query: (formData) => ({
        url: "create",
        method: "POST",
        body: formData,
      }),
    }),
    // detele board endpoint
    deleteBoard: build.mutation<ApiResponse<{}>, string>({
      query: (boardId) => ({
        url: `/b/${boardId}`,
        method: "DELETE",
      }),
    }),
    //
    updateBoard: build.mutation<ApiResponse<Board>, Partial<CreateBoard>>({
      query: (updateBoard) => {
        const { _id: boardId, ...body } = updateBoard;
        return {
          url: `/b/${boardId}`,
          method: "PATCH",
          body,
        };
      },
    }),
  }),
});
export const {
  useDeleteBoardMutation,
  useAddBoardMutation,
  useUpdateBoardMutation,
} = boardApi;
