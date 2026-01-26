import type { ApiResponse } from "@/types/generalTypes";
import type { Task } from "@/types/TaskTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/tasks" }),
  endpoints: (build) => ({
    addTask: build.mutation<ApiResponse<Task>, Partial<Task>>({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
    }),
    deleteTask: build.mutation<ApiResponse<{}>, string>({
      query: (taskId) => ({
        url: `/d/${taskId}`,
        method: "DELETE",
      }),
    }),
    updateTask: build.mutation<ApiResponse<Task>, Partial<Task>>({
      query: (data) => {
        const { _id: taskId, ...body } = data;
        return {
          url: `/u/${taskId}`,
          method: "PATCH",
          body,
        };
      },
    }),
  }),
});

export const {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskApi;
