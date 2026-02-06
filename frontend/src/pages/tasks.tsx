"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { TaskHeader } from "../components/taskHeader";
import { TaskBody } from "../components/taskBody";
import type { TaskItem } from "../components/taskBody";
import type { AssignTaskValues } from "../components/assignTask";
import { AssignTaskDialog } from "../components/assignTask";

const boards = [
  { id: "frontend", name: "Frontend Board" },
  { id: "backend", name: "Backend Board" },
  { id: "design", name: "Design Board" },
];

export default function Task() {
  const [selectedBoard, setSelectedBoard] = useState("frontend");
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  // ✅ tasks stored per board
  const [tasks, setTasks] = useState<Record<string, TaskItem[]>>({
    frontend: [],
    backend: [],
    design: [],
  });

  // ✅ always safe array
  const boardTasks = tasks[selectedBoard] ?? [];
  // ✅ safe selected task lookup (fixes undefined.find error class of bugs)
  const activeTask = useMemo(
    () => boardTasks.find((t) => t.id === activeTaskId) ?? null,
    [boardTasks, activeTaskId],
  );

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => ({
      ...prev,
      [selectedBoard]: prev[selectedBoard].filter((t) => t.id !== id),
    }));

    if (activeTaskId === id) setActiveTaskId(null);
  };

  const handleDuplicateTask = (id: string) => {
    const t = boardTasks.find((x) => x.id === id);
    if (!t) return;

    const copy: TaskItem = {
      ...t,
      id: "task-" + Date.now(),
      title: t.title + " Copy",
    };

    setTasks((prev) => ({
      ...prev,
      [selectedBoard]: [...prev[selectedBoard], copy],
    }));
  };

  const handleUpdateTask = (id: string) => {
    // plug your update dialog here
    alert("Open update dialog for task " + id);
  };

  const handleCreateTask = (data: AssignTaskValues) => {
    const newTask: TaskItem = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      assignee: data.assignee,
      status: "To Do",
      dueDate: data.dueDate,
    };

    setTasks((prev) => ({
      ...prev,
      [selectedBoard]: [...prev[selectedBoard], newTask],
    }));

    setActiveTaskId(newTask.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col bg-neutral-900 text-white overflow-hidden"
    >
      {/* Glow background */}
      <div className="absolute inset-0 -z-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-10"
            style={{
              width: `${220 + i * 60}px`,
              height: `${220 + i * 60}px`,
              background:
                "radial-gradient(circle, oklch(0.6 0.24 293.9), transparent 40%)",
              top: `${10 + i * 20}%`,
              left: `${5 + i * 25}%`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -20, 20, 0],
              scale: [1, 1.05, 0.98, 1],
            }}
            transition={{
              duration: 18 + i * 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      {/* Header */}
      <TaskHeader
        boards={boards}
        selectedBoard={selectedBoard}
        onBoardChange={setSelectedBoard}
        onAssignClick={() => setOpenDialog(true)}
      />

      {/* Body */}
      <main className="flex-1 p-6 space-y-4">
        {/* ✅ Task Action Menu — uses selected task */}

        <TaskBody
          tasks={tasks[selectedBoard]}
          activeTaskId={activeTaskId}
          onTaskSelect={setActiveTaskId}
          onAssignClick={() => setOpenDialog(true)}
          onDeleteTask={handleDeleteTask}
          onDuplicateTask={handleDuplicateTask}
          onUpdateTask={handleUpdateTask}
        />
      </main>

      {/* Assign Task Dialog */}
      <AssignTaskDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onCreate={handleCreateTask}
      />
    </motion.div>
  );
}
