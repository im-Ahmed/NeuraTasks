import type { Board } from "@/types/BoardTypes";
import type { ApiResponse } from "@/types/generalTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type BoardResponse = ApiResponse<{ boards: Board[] }>;

// Define the shape of your WS messages for type safety
type WSEvent =
  | { type: "BOARD_CREATED"; board: Board }
  | { type: "BOARD_UPDATED"; board: Board }
  | { type: "BOARD_DELETED"; boardId: string };

export const boardFetching = createApi({
  reducerPath: "BoardFetching", // Good practice to name the reducer path
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/boards",
    credentials: "include",
  }),

  tagTypes: ["Boards"], // Optional: Useful if you want to force-refetch manually later

  endpoints: (build) => ({
    getAllBoard: build.query<BoardResponse, void>({
      query: () => `/`, // This triggers the HTTP GET. Make sure backend returns JSON here!

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
                case "BOARD_CREATED":
                  // Check duplicates to prevent 'double add' on strict mode or bad network
                  if (
                    !draft.data.boards.find((b) => b._id === payload.board._id)
                  ) {
                    draft.data.boards.push(payload.board);
                  }
                  break;

                case "BOARD_UPDATED":
                  const index = draft.data.boards.findIndex(
                    (b) => b._id === payload.board._id,
                  );
                  if (index !== -1) {
                    draft.data.boards[index] = payload.board;
                  }
                  break;

                case "BOARD_DELETED":
                  draft.data.boards = draft.data.boards.filter(
                    (b) => b._id !== payload.boardId,
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

export const { useGetAllBoardQuery } = boardFetching;
