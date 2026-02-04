import type { ApiResponse } from "@/types/generalTypes";
import type { Log } from "@/types/LogTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
type LogResponse = ApiResponse<{
  activity: Log[];
}>;
type WSEvent = { type: "LOG_ADD"; activity: Log } | { type: "LOG_CLEAR" };
export const logFetching = createApi({
  reducerPath: "logFetching",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/activities" }),
  endpoints: (build) => ({
    getLog: build.query<LogResponse, void>({
      query: () => "/",
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        const wsProtocol =
          window.location.protocol === "https:" ? "wss:" : "ws:";
        const ws = new WebSocket(`${wsProtocol}//localhost:8000`);
        try {
          await cacheDataLoaded;
          const listener = (event: MessageEvent) => {
            const payload: WSEvent = JSON.parse(event.data);
            // tiny type guard to avoid random WS garbage
            if (!payload || !("type" in payload)) return;

            updateCachedData((draft) => {
              if (!draft.data) return;
              switch (payload.type) {
                case "LOG_ADD":
                  // Check duplicates to prevent 'double add' on strict mode or bad network
                  if (
                    !draft.data.activity.find(
                      (b) => b._id === payload.activity._id,
                    )
                  ) {
                    draft.data.activity.push(payload.activity);
                  }
                  break;

                case "LOG_CLEAR":
                  draft.data.activity = [];
                  break;
              }
            });
          };
          ws.addEventListener("message", listener);
        } catch (err) {
          console.log("WS ERROR:", err);
        } finally {
          await cacheEntryRemoved;
          ws.close();
        }
      },
    }),
  }),
});

export const { useGetLogQuery } = logFetching;
