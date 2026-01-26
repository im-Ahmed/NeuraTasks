import type { ApiResponse } from "@/types/generalTypes";
import type { Task } from "@/types/TaskTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type TaskResponse = ApiResponse<{
  tasks: Task[];
}>;
type WSEvent =
  | { type: "TASK_CREATED"; task: Task }
  | { type: "TASK_UPDATED"; updatedTask: Task }
  | { type: "TASK_DELETED"; taskId: string };
export const taskFetching = createApi({
  reducerPath: "taskFetching",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/tasks" }),
  tagTypes: ["Tasks"], // Optional: Useful if you want to force-refetch manually later
  endpoints: (build) => ({
    getUserTasks: build.query<TaskResponse, void>({
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
                case "TASK_CREATED":
                  // Check duplicates to prevent 'double add' on strict mode or bad network
                  if (
                    !draft.data.tasks.find((t) => t._id === payload.task._id)
                  ) {
                    draft.data.tasks.push(payload.task);
                  }
                  break;

                case "TASK_UPDATED":
                  const index = draft.data.tasks.findIndex(
                    (t) => t._id === payload.updatedTask._id,
                  );
                  if (index !== -1) {
                    draft.data.tasks[index] = payload.updatedTask;
                  }
                  break;

                case "TASK_DELETED":
                  draft.data.tasks = draft.data.tasks.filter(
                    (t) => t._id !== payload.taskId,
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
    getBoardTasks: build.query<ApiResponse<{ tasks: Task[] }>, string>({
      query: (boardId) => ({
        url: `/b/${boardId}`,
        method: "GET",
      }), // This triggers the HTTP GET. Make sure backend returns JSON here!

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
                case "TASK_CREATED":
                  // Check duplicates to prevent 'double add' on strict mode or bad network
                  if (
                    !draft.data.tasks.find((t) => t._id === payload.task._id)
                  ) {
                    draft.data.tasks.push(payload.task);
                  }
                  break;

                case "TASK_UPDATED":
                  const index = draft.data.tasks.findIndex(
                    (t) => t._id === payload.updatedTask._id,
                  );
                  if (index !== -1) {
                    draft.data.tasks[index] = payload.updatedTask;
                  }
                  break;

                case "TASK_DELETED":
                  draft.data.tasks = draft.data.tasks.filter(
                    (t) => t._id !== payload.taskId,
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

export const { useGetUserTasksQuery, useGetBoardTasksQuery } = taskFetching;
