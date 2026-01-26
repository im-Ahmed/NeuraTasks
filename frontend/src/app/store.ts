import { boardApi } from "@/features/board/boardSlice";
import { boardFetching } from "@/features/board/realTimeBoardFetching";
import { commentApi } from "@/features/comments/commentSlice";
import { commentFetching } from "@/features/comments/realTimeCommentFetching";
import { logApi } from "@/features/log/logSlice";
import { logFetching } from "@/features/log/realTimeLogFetching";
import { taskApi } from "@/features/task/taskSlice";
import { configureStore } from "@reduxjs/toolkit";

// Add the reducers to define the dataflows
export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    [boardFetching.reducerPath]: boardFetching.reducer,
    [logApi.reducerPath]: logApi.reducer,
    [logFetching.reducerPath]: logFetching.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [commentFetching.reducerPath]: commentFetching.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boardApi.middleware)
      .concat(boardFetching.middleware)
      .concat(logApi.middleware)
      .concat(logFetching.middleware)
      .concat(taskApi.middleware)
      .concat(commentApi.middleware)
      .concat(commentFetching.middleware),
});
