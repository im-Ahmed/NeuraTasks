import type { Comment } from "@/types/CommentTypes";
import type { ApiResponse } from "@/types/generalTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type CommentResponse = ApiResponse<{
  comment: Comment;
}>;
export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/comments" }),
  endpoints: (build) => ({
    addComment: build.mutation<CommentResponse, Partial<Comment>>({
      query: (body) => ({
        url: "/add",
        method: "POST",
        body,
      }),
    }),
    deleteComment: build.mutation<ApiResponse<{}>, string>({
      query: (commentId) => ({
        url: `/c/${commentId}`,
        method: "DELETE",
      }),
    }),
    editComment: build.mutation<CommentResponse, Partial<Comment>>({
      query: (data) => {
        const { _id: commentId, ...body } = data;
        return {
          url: `/c/${commentId}`,
          method: "PATCH",
          body,
        };
      },
    }),
  }),
});

export const {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} = commentApi;
