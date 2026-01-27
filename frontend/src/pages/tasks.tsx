'use client';

import { useState } from 'react';
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

  const [tasks, setTasks] = useState<Record<string, TaskItem[]>>({
    frontend: [],
    backend: [],
    design: [],
  });

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

    setActiveTaskId(newTask.id); // auto-select new task
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
      />

      {/* Body */}
      <main className="flex-1 p-6">
        <TaskBody
          tasks={tasks[selectedBoard]}
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
