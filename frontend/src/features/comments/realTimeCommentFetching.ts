import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Comment } from "@/types/CommentTypes";
import type { ApiResponse } from "@/types/generalTypes";

type CommentResponse = ApiResponse<{
  comments: Comment[];
}>;
type WSEvent =
  | { type: "COMMENT_ADDED"; comment: Comment }
  | { type: "COMMENT_DELETED"; commentId: string }
  | { type: "COMMENT_EDITED"; comment: Comment };
export const commentFetching = createApi({
  reducerPath: "commentFetching",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/comments" }),
  tagTypes: ["Comments"],
  endpoints: (build) => ({
    getComment: build.query<CommentResponse, string>({
      query: (taskId) => ({
        url: `/t/${taskId}`,
        method: "GET",
      }),

      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        // 1. Establish WS connection
        // Best Practice: Use an environment variable or derive from window.location
        const wsProtocol =
          window.location.protocol === "https:" ? "wss:" : "ws:";
        // Note: Ensure this port matches your backend WS port, not the Vite port
        const ws = new WebSocket(`${wsProtocol}//localhost:8000`);

        try {
          // 2. Wait for the initial HTTP data to arrive
          await cacheDataLoaded;

          const listener = (event: MessageEvent) => {
            const payload: WSEvent = JSON.parse(event.data);

            // tiny type guard to avoid random WS garbage
            if (!payload || !("type" in payload)) return;

            // 3. Optimistic Updates using Immer (RTK Query standard)
            updateCachedData((draft) => {
              if (!draft.data) return;

              switch (payload.type) {
                case "COMMENT_ADDED":
                  // Check duplicates to prevent 'double add' on strict mode or bad network
                  if (
                    !draft.data.comments.find(
                      (c) => c._id === payload.comment._id,
                    )
                  ) {
                    draft.data.comments.push(payload.comment);
                  }
                  break;

                case "COMMENT_EDITED":
                  const index = draft.data.comments.findIndex(
                    (c) => c._id === payload.comment._id,
                  );
                  if (index !== -1) {
                    draft.data.comments[index] = payload.comment;
                  }
                  break;

                case "COMMENT_DELETED":
                  draft.data.comments = draft.data.comments.filter(
                    (c) => c._id !== payload.commentId,
                  );
                  break;
              }
            });
          };

          ws.addEventListener("message", listener);
        } catch {
          // Verify if HTTP request failed
        } finally {
          // 4. Cleanup when the component unmounts
          await cacheEntryRemoved;
          ws.close();
        }
      },
    }),
  }),
});

export const { useGetCommentQuery } = commentFetching;
