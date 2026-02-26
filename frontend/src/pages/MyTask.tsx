import { TaskBody } from "@/components/taskBody";
import { TaskHeader } from "@/components/taskHeader";
import Loader from "@/components/ui/loader";
import { motion } from "framer-motion";
import { useGetUserTasksQuery } from "@/features/task/realTimeTaskFetching";
import { useMemo, useState } from "react";
import type { Task } from "@/types/TaskTypes";

const MyTask = () => {
  const { data: allTasks, isLoading: taskLoading } = useGetUserTasksQuery();
  const tasks = useMemo(() => allTasks?.data.tasks as Task[], [allTasks]);

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const handleUpdateTask = (id: string) => {
    console.log("update task", id);
    // TODO: open edit dialog or navigate to edit page
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col bg-neutral-900 text-white"
    >
      {/* Header */}
      <TaskHeader />

      {/* Body */}
      {taskLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <main className="flex-1 p-6 space-y-4">
          <TaskBody
            tasks={tasks || []}
            activeTaskId={activeTaskId}
            onTaskSelect={setActiveTaskId}
            onAssignClick={() => {}}
            onUpdateTask={handleUpdateTask}
            allowDelete={false}
          />
        </main>
      )}
    </motion.div>
  );
};

export default MyTask;
