"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

import { TaskHeader } from "../components/taskHeader";
import { TaskBody } from "../components/taskBody";
import type { TaskItem } from "../components/taskBody";
import type { AssignTaskValues } from "../components/assignTask";
import { AssignTaskDialog } from "../components/assignTask";

import { useGetAllBoardQuery } from "@/features/board/realTimeBoardFetching";

export default function Task() {
  // 🔹 Fetch dynamic boards from backend
  const { data: allBoard } = useGetAllBoardQuery();

  // 🔹 Extract boards safely
  const boards = allBoard?.data?.boards ?? [];

  /**
   * 🔹 selectedBoardId
   * Should always be backend board.id
   */
  const [selectedBoardId, setSelectedBoardId] = useState<string | undefined>(
    undefined,
  );

  /**
   * 🔹 Tasks stored dynamically per boardId
   * Structure:
   * {
   *   "boardId1": TaskItem[],
   *   "boardId2": TaskItem[]
   * }
   */
  const [tasksByBoard, setTasksByBoard] = useState<Record<string, TaskItem[]>>(
    {},
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  /**
   * 🔹 Current board tasks (safe fallback)
   */
  const boardTasks = useMemo(() => {
    if (!selectedBoardId) return [];
    return tasksByBoard[selectedBoardId] ?? [];
  }, [selectedBoardId, tasksByBoard]);

  // ============================================================
  // ======================= HANDLERS ===========================
  // ============================================================

  /**
   * 🔹 handleCreateTask
   * TODO:
   * - Option 1: Call backend mutation to create task
   * - Option 2: Optimistically update UI
   */
  const handleCreateTask = (data: AssignTaskValues) => {
    if (!selectedBoardId) return;

    const newTask: TaskItem = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      assignee: data.assignee,
      status: "To Do",
      dueDate: data.dueDate,
    };

    setTasksByBoard((prev) => ({
      ...prev,
      [selectedBoardId]: [...(prev[selectedBoardId] ?? []), newTask],
    }));

    setActiveTaskId(newTask.id);
  };

  /**
   * 🔹 handleDeleteTask
   * TODO:
   * - Call deleteTask mutation
   * - Remove from backend
   */
  const handleDeleteTask = (taskId: string) => {
    if (!selectedBoardId) return;

    setTasksByBoard((prev) => ({
      ...prev,
      [selectedBoardId]: (prev[selectedBoardId] ?? []).filter(
        (task) => task.id !== taskId,
      ),
    }));

    if (activeTaskId === taskId) {
      setActiveTaskId(null);
    }
  };

  /**
   * 🔹 handleDuplicateTask
   * TODO:
   * - Ideally create duplicate via backend
   */
  const handleDuplicateTask = (taskId: string) => {
    if (!selectedBoardId) return;

    const taskToCopy = boardTasks.find((t) => t.id === taskId);
    if (!taskToCopy) return;

    const copy: TaskItem = {
      ...taskToCopy,
      id: crypto.randomUUID(),
      title: taskToCopy.title + " (Copy)",
    };

    setTasksByBoard((prev) => ({
      ...prev,
      [selectedBoardId]: [...(prev[selectedBoardId] ?? []), copy],
    }));
  };

  /**
   * 🔹 handleUpdateTask
   * TODO:
   * - Open update dialog
   * - Or call updateTask mutation
   */
  const handleUpdateTask = (taskId: string) => {
    console.log("Open update dialog for:", taskId);
  };

  // ============================================================
  // ======================== RENDER ============================
  // ============================================================

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col bg-neutral-900 text-white"
    >
      {/* ================= HEADER ================= */}
      <TaskHeader
        boards={boards}
        selectedBoardId={selectedBoardId}
        onBoardChange={setSelectedBoardId}
        onAssignClick={() => setOpenDialog(true)}
      />

      {/* ================= BODY ================= */}
      <main className="flex-1 p-6 space-y-4">
        <TaskBody
          tasks={boardTasks}
          activeTaskId={activeTaskId}
          onTaskSelect={setActiveTaskId}
          onAssignClick={() => setOpenDialog(true)}
          onDeleteTask={handleDeleteTask}
          onDuplicateTask={handleDuplicateTask}
          onUpdateTask={handleUpdateTask}
        />
      </main>

      {/* ================= DIALOG ================= */}
      <AssignTaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onCreate={handleCreateTask}
      />
    </motion.div>
  );
}
