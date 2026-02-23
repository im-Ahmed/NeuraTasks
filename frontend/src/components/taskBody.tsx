"use client";

import { motion } from "framer-motion";
import { ListChecks, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TaskActionMenu from "../components/taskActionMenu";
import type { Task } from "@/types/TaskTypes";

const formatDate = (iso: string) => {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

interface Props {
  tasks: Task[];
  activeTaskId: string | null;
  onTaskSelect: (id: string) => void;
  onAssignClick: () => void;

  // ✅ actions for menu
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string) => void;


}

export function TaskBody({
  tasks,
  activeTaskId,
  onTaskSelect,
  onAssignClick,
  onDeleteTask,
  onUpdateTask,
}: Props) {
  // console.log("Active Task ID:", activeTaskId);
  const activeTask = tasks.find((t) => t._id === activeTaskId);
  // console.log("Active Task Details:", activeTask);

  if (tasks.length === 0) {
    return (
      <motion.div
        className="flex h-auto min-h-[70vh] flex-col items-center justify-center gap-6 bg-transparent rounded-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ListChecks className="h-16 w-16 text-white/40" />
        <p className="text-white text-lg font-medium">No tasks available</p>
        <Button
          onClick={onAssignClick}
          className="text-white"
          style={{
            backgroundColor: "oklch(0.6 0.24 293.9)",
            boxShadow: "0 8px 24px oklch(0.6 0.24 293.9 / 0.25)",
          }}
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
        <h4 className="font-semibold text-white mb-2 flex items-center">
          Task list
        </h4>
        {tasks.map((task) => (
          <motion.div
            key={task._id}
            onClick={() => onTaskSelect(task._id)}
            className={`relative w-fit min-w-60 max-w-full  cursor-pointer rounded-lg border bg-white/5 p-3 m-2 ${
              task._id === activeTaskId
                ? "border-white/30 ring-1 ring-[oklch(0.6_0.24_293.9)]/30"
                : "border-white/10"
            }`}
            whileTap={{ scale: 0.98 }}
          >
            {/* Top-right three dots menu */}
            <div className="absolute top-2 right-2">
              <TaskActionMenu
                selectedTask={task} // ✅ pass the current task here
                onDelete={onDeleteTask}
                onUpdate={onUpdateTask}
              />
            </div>

            <h3 className="font-medium text-white capitalize">{task.title}</h3>
            <p className="text-sm text-white/60 line-clamp-2 mt-1">
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
              className="border border-white/10 h-[32vh] rounded-lg bg-white/5 p-4 shadow-sm relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
            >
              {/* ✅ three dots menu at top-right */}

              <h4 className="font-semibold text-white mb-2">Task Details</h4>
              <p className="font-medium text-white capitalize">
                {activeTask.title}
              </p>
              <p className="text-sm text-white/60 mt-2">
                {activeTask.description}
              </p>
              {activeTask.dueDate && (
                <p className="mt-2 text-sm text-white/70">
                  Due Date : {formatDate(activeTask.dueDate)}
                </p>
              )}
            </motion.div>

            {/* Status Panel */}
            <motion.div
              className="border border-white/10 h-[25vh] rounded-lg bg-white/5 p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex flex-col justify-between items-start h-full p-2">
                <div className="flex">
                  Status :{" "}
                  <p className="font-medium text-white"> {activeTask.status}</p>
                </div>
                <div className="flex">
                  Priority :{" "}
                  <p className="font-medium text-white">
                    {activeTask.priority}
                  </p>
                </div>
                <div className=" flex items-end gap-2">
                  <h4 className="text-lg font-semibold mb-2">Assigned To :</h4>

                  <div className="flex flex-wrap gap-3">
                    {Array.isArray(activeTask.assignedTo) &&
                    activeTask.assignedTo.length > 0 ? (
                      activeTask.assignedTo.map((assignee) =>
                        typeof assignee === "string" ? (
                          assignee
                        ) : (
                          <span
                            key={assignee._id}
                            className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full"
                          >
                            <img
                              src={assignee.avatar}
                              alt={assignee.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-sm">{assignee.name}</span>
                          </span>
                        ),
                      )
                    ) : (
                      <p className="text-sm mb-2.5 text-white/60">
                        No assignees
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chat Panel */}
          <motion.div
            className="border border-white/10 h-[60vh] rounded-lg flex flex-col bg-white/5 p-4 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="p-3 border-b flex items-center gap-2 text-white font-medium">
              <MessageSquare className="h-4 w-4" />
              Board Chat
            </div>
            <div className="flex-1 p-4 text-sm text-white">
              Start discussion…
            </div>
            <div className="p-3 border-t flex gap-2">
              <Input
                placeholder="Message..."
                className="focus:ring-white text-white"
              />
              <Button size="icon" variant="outline" className="bg-transparent">
                →
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
