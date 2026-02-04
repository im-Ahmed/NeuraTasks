'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { TaskHeader } from '../components/taskHeader';
import { TaskBody } from '../components/taskBody';
import type { TaskItem } from '../components/taskBody';
import type { AssignTaskValues } from '../components/assignTask';
import { AssignTaskDialog } from '../components/assignTask';

const boards = [
  { id: 'frontend', name: 'Frontend Board' },
  { id: 'backend', name: 'Backend Board' },
  { id: 'design', name: 'Design Board' },
];

export default function Task() {
  const [selectedBoard, setSelectedBoard] = useState('frontend');
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
    [boardTasks, activeTaskId]
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
      id: 'task-' + Date.now(),
      title: t.title + ' Copy',
    };

    setTasks((prev) => ({
      ...prev,
      [selectedBoard]: [...prev[selectedBoard], copy],
    }));
  };

  const handleUpdateTask = (id: string) => {
    // plug your update dialog here
    alert('Open update dialog for task ' + id);
  };

  const handleCreateTask = (data: AssignTaskValues) => {
    const newTask: TaskItem = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      assignee: data.assignee,
      status: 'To Do',
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
      className="min-h-screen flex flex-col bg-white"
    >
      {/* Header */}
     <TaskHeader
  boards={boards}
  selectedBoard={selectedBoard}
  onBoardChange={setSelectedBoard}
  onAssignClick={() => setOpenDialog(true)}

  selectedTask={activeTask}
  onDeleteTask={handleDeleteTask}
  onDuplicateTask={handleDuplicateTask}
  onUpdateTask={handleUpdateTask}
/>

      {/* Body */}
      <main className="flex-1 p-6 space-y-4">
        {/* ✅ Task Action Menu — uses selected task */}
       

        <TaskBody
          tasks={boardTasks}
          activeTaskId={activeTaskId}
          onTaskSelect={setActiveTaskId}
          onAssignClick={() => setOpenDialog(true)}
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
