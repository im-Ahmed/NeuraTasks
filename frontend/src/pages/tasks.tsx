"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

import { TaskHeader } from "../components/taskHeader";
import { TaskBody } from "../components/taskBody";
import { AssignTaskDialog } from "../components/assignTask";

import { useGetAllBoardQuery } from "@/features/board/realTimeBoardFetching";
import type { BoardMember } from "@/types/BoardTypes";
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
} from "@/features/task/taskSlice";
import type { Task } from "@/types/TaskTypes";
import { useGetBoardTasksQuery } from "@/features/task/realTimeTaskFetching";

export default function Task() {
  // selectedBoardId is the single source of truth for which board is active. Tasks are stored in a dictionary keyed by boardId for O(1) access and easy updates.
  // Add task
  const [addTask, { isError: taskCreationError }] = useAddTaskMutation();
  // delete task
  const [deleteTask, { isError: taskDeletionError }] = useDeleteTaskMutation();

  const [selectedBoardId, setSelectedBoardId] = useState<string | undefined>(
    undefined,
  );
  // get all the boards for the select dropdown
  const { data: allBoard } = useGetAllBoardQuery();
  // Extract boards safely
  const boards = useMemo(() => {
    return allBoard?.data?.boards ?? [];
  }, [allBoard]);

  // Extract members safely
  const currentBoard = useMemo(() => {
    return boards.find((b) => b._id === selectedBoardId)?.members;
  }, [boards, selectedBoardId]);

  // validate selectedBoardId before fetching tasks to avoid unnecessary API calls and potential errors. This ensures that we only attempt to fetch tasks when we have a valid board ID, which should be a 24-character hexadecimal string (typical for MongoDB ObjectIDs).
  const isValidObjectId = (id?: string): id is string =>
    !!id && /^[0-9a-fA-F]{24}$/.test(id);

  // Fetch tasks for the current board only if selectedBoardId is valid. This prevents the query from running with an invalid ID, which could lead to errors or unnecessary API calls.
  const { data: currentBoardTasks, isLoading: boardTasksLoading } =
    useGetBoardTasksQuery(selectedBoardId as string, {
      skip: !isValidObjectId(selectedBoardId),
    });

  const [openDialog, setOpenDialog] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  //  handleCreateTask

  const handleCreateTask = async (data: Partial<Task>) => {
    if (!selectedBoardId) return;
    data = { ...data, boardId: selectedBoardId };
    try {
      const testResponse = await addTask(data).unwrap();
      setActiveTaskId(testResponse.data._id || null);
    } catch (err) {
      console.log("Error creating task:", taskCreationError || err);
    }
  };

  // handleDeleteTask

  const handleDeleteTask = (taskId: string) => {
    try {
      deleteTask(taskId);
    } catch (err) {
      console.log("Error deleting task:", taskDeletionError || err);
    }
  };

  // handleUpdateTask

  const handleUpdateTask = (taskId: string) => {
    console.log("Open update dialog for:", taskId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col bg-neutral-900 text-white"
    >
      {/* Header */}
      <TaskHeader
        boards={boards}
        selectedBoardId={selectedBoardId}
        onBoardChange={setSelectedBoardId}
        onAssignClick={() => setOpenDialog(true)}
      />
      {/* Body */}
      {}
      {boardTasksLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="loader">loading</div>
        </div>
      ) : (
        <main className="flex-1 p-6 space-y-4">
          <TaskBody
            tasks={currentBoardTasks?.data?.tasks || []}
            activeTaskId={activeTaskId}
            onTaskSelect={setActiveTaskId}
            onAssignClick={() => setOpenDialog(true)}
            onDeleteTask={handleDeleteTask}
            onUpdateTask={handleUpdateTask}
          />
        </main>
      )}

      {/* DIALOG */}
      <AssignTaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onCreate={handleCreateTask}
        currentMembers={currentBoard as BoardMember[]}
      />
    </motion.div>
  );
}
