import { boardApi } from "@/features/board/boardSlice";
import { BoardFetching } from "@/features/board/realTimeBoardFetching";
import { configureStore } from "@reduxjs/toolkit";

// Add the reducers to define the dataflows
export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    [BoardFetching.reducerPath]: BoardFetching.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boardApi.middleware)
      .concat(BoardFetching.middleware),
});
