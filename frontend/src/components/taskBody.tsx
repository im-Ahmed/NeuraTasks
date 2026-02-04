'use client';

import { motion } from 'framer-motion';
import { ListChecks, MessageSquare, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TaskActionMenu from '../components/taskActionMenu';

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  dueDate?: String;
}

interface Props {
  tasks: TaskItem[];
  activeTaskId: string | null;
  onTaskSelect: (id: string) => void;
  onAssignClick: () => void;

  // ✅ actions for menu
  onDeleteTask: (id: string) => void;
  onDuplicateTask: (id: string) => void;
  onUpdateTask: (id: string) => void;
}


export function TaskBody({
  tasks,
  activeTaskId,
  onTaskSelect,
  onAssignClick,
  onDeleteTask,
  onDuplicateTask,
  onUpdateTask,
}: Props) {
  const activeTask = tasks.find((t) => t.id === activeTaskId);

  if (tasks.length === 0) {
    return (
      <motion.div
        className="flex h-[70vh] flex-col items-center justify-center gap-6 bg-transparent rounded-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ListChecks className="h-16 w-16 text-indigo-200" />
        <p className="text-indigo-600 text-lg font-medium">
          No tasks available
        </p>
        <Button
          onClick={onAssignClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Assign First Task
        </Button>
      </motion.div>
    );
  }

  return (
    <>
      {/* Horizontal Task List */}
      <motion.div
        className="flex flex-wrap gap-3 overflow-x-auto pb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h4 className="font-semibold text-indigo-600 mb-2 flex items-center">
          Task list
        </h4>
        {tasks.map((task) => (
  <motion.div
    key={task.id}
    onClick={() => onTaskSelect(task.id)}
    className={`relative min-w-[200px] cursor-pointer rounded-lg border bg-white p-4 m-2 ${
      task.id === activeTaskId
        ? 'border-indigo-200 ring-1 ring-indigo-200'
        : 'border-gray-200'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {/* Top-right three dots menu */}
    <div className="absolute top-2 right-2">
      <TaskActionMenu
        selectedTask={task} // ✅ pass the current task here
        onDelete={onDeleteTask}
        onDuplicate={onDuplicateTask}
        onUpdate={onUpdateTask}
      />
    </div>

    <h3 className="font-medium text-indigo-600">{task.title}</h3>
    <p className="text-sm text-indigo-400 line-clamp-2 mt-1">
      {task.description}
    </p>
  </motion.div>
))}

      </motion.div>

      {/* Active Task Panels */}
      {activeTask && (
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col gap-6">
            {/* Task Details */}
            <motion.div
              className="border h-[32vh] rounded-lg bg-white p-4 shadow-sm relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
            >
              {/* ✅ three dots menu at top-right */}

              <h4 className="font-semibold text-indigo-600 mb-2">
                Task Details
              </h4>
              <p className="font-medium">{activeTask.title}</p>
              <p className="text-sm text-indigo-400 mt-2">
                {activeTask.description}
              </p>
              {activeTask.dueDate && (
                <p className="mt-2 text-sm text-indigo-500">
                  Due: {activeTask.dueDate}
                </p>
              )}
            </motion.div>

            {/* Status Panel */}
            <motion.div
              className="border h-[25vh] rounded-lg bg-white p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="font-semibold text-indigo-600 mb-2">Status</h4>
              <p className="font-medium text-indigo-700">
                {activeTask.status}
              </p>
              <p className="text-sm mt-2 text-indigo-500">
                Assigned to: {activeTask.assignee}
              </p>
            </motion.div>
          </div>

          {/* Chat Panel */}
          <motion.div
            className="border h-[60vh] rounded-lg flex flex-col bg-white shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="p-3 border-b flex items-center gap-2 text-indigo-600 font-medium">
              <MessageSquare className="h-4 w-4" />
              Board Chat
            </div>
            <div className="flex-1 p-4 text-sm text-indigo-400">
              Start discussion…
            </div>
            <div className="p-3 border-t flex gap-2">
              <Input
                placeholder="Message..."
                className="focus:ring-indigo-500 text-indigo-500"
              />
              <Button
                size="icon"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                →
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
