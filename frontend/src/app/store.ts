import { boardApi } from "@/features/board/boardSlice";
import { configureStore } from "@reduxjs/toolkit";

// Add the reducers to define the dataflows
export const store = configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardApi.middleware),
});
