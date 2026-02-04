import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Log } from "@/types/LogTypes";
import type { ApiResponse } from "@/types/generalTypes";

type LogResponse = ApiResponse<{
  activity: Log;
}>;
export const logApi = createApi({
  reducerPath: "logApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/activities" }),
  endpoints: (build) => ({
    addLog: build.mutation<LogResponse, Log>({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
    }),
    clearLog: build.mutation<ApiResponse<{}>, void>({
      query: () => ({
        url: "clear",
        method: "DELETE",
      }),
    }),
  }),
});

export const { useAddLogMutation, useClearLogMutation } = logApi;
