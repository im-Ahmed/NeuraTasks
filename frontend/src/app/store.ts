import { boardApi } from "@/features/board/boardSlice";
import { boardFetching } from "@/features/board/realTimeBoardFetching";
import { logApi } from "@/features/log/logSlice";
import { logFetching } from "@/features/log/realTimeLogFetching";
import { configureStore } from "@reduxjs/toolkit";

// Add the reducers to define the dataflows
export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    [boardFetching.reducerPath]: boardFetching.reducer,
    [logApi.reducerPath]: logApi.reducer,
    [logFetching.reducerPath]: logFetching.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boardApi.middleware)
      .concat(boardFetching.middleware)
      .concat(logApi.middleware)
      .concat(logFetching.middleware),
});
