"use client";

import { motion } from "framer-motion";
import { ListChecks, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TaskActionMenu from "../components/taskActionMenu";
import { CommentActionMenu } from "./commentActionMenu";
import type { Task } from "@/types/TaskTypes";
import { useGetCommentQuery } from "@/features/comments/realTimeCommentFetching";
import { useAddCommentMutation } from "@/features/comments/commentSlice";
import {  useMemo, useState } from "react";
import { isValidObjectId } from "@/pages/tasks";
import Loader from "./ui/loader";

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
  const [addComment] = useAddCommentMutation();

  let activeTask = tasks.find((t) => t._id === activeTaskId);
  if (!activeTask) activeTask = tasks[0];
  // get comments for active task
  const { data: allComments, isLoading: commentLoading } = useGetCommentQuery(
    activeTask?._id as string,
    {
      skip: !isValidObjectId(activeTask?._id),
    },
  );

  const [commentInput, setCommentInput] = useState("");

 
  const handleSendComment = async () => {
    if (commentInput.trim()) {
      try {
        await addComment({
          taskId: activeTask?._id,
          message: commentInput,
        }).unwrap();
        setCommentInput("");
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  };

  const activeTaskComments = useMemo(
    () => allComments?.data.comments,
    [allComments],
  );  
  if (tasks.length === 0) {
    return (
      <motion.div
        className="flex h-auto min-h-[70vh] flex-col items-center justify-center gap-6 bg-transparent rounded-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ListChecks className="h-16 w-16 text-white/40" />
        <p className="text-white text-lg font-medium">No tasks on this board</p>
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
                <p className="mt-2 text-sm  text-white/70">
                  Due Date{" "}
                  <span className="text-white">
                    {formatDate(activeTask.dueDate)} at 12:00 PM
                  </span>
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
            className="relative h-[60vh] rounded-2xl flex flex-col 
             bg-linear-to-b from-white/5 to-white/2
             backdrop-blur-xl border border-white/10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3 text-white font-medium tracking-wide">
              <div className="p-2 rounded-lg bg-indigo-500/10">
                <MessageSquare className="h-4 w-4 text-indigo-400" />
              </div>
              Board Chat
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-6 text-sm overflow-y-auto space-y-4">
              {commentLoading ? (
                <Loader />
              ) : !activeTaskComments || activeTaskComments.length === 0 ? (
                <div className="flex items-center justify-center h-full text-white/60">
                  <p className="text-center">Start conversation here</p>
                </div>
              ) : (
                <>
                  {activeTaskComments?.map((msg) => (
                    <div
                      key={msg._id}
                      className={`flex items-end gap-3 ${
                        msg?.commentBY?._id === localStorage.getItem("UserId")
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      {msg?.commentBY?._id ===
                        localStorage.getItem("UserId") && (
                        <img
                          src={msg.commentBY?.avatar}
                          alt="avatar"
                          className="w-9 h-9 rounded-full ring-2 ring-indigo-500/30"
                        />
                      )}

                      <div
                        className={`relative flex items-center gap-1 group ${
                          msg?.commentBY?._id === localStorage.getItem("UserId")
                            ? ""
                            : "flex-row-reverse"
                        }`}
                      >
                        <div
                          className={`max-w-xs md:max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed transition-all duration-200
                                  ${
                                    msg?.commentBY?._id ===
                                    localStorage.getItem("UserId")
                                      ? "bg-linear-to-r cursor-pointer from-indigo-600 to-violet-600 text-white rounded-bl-none shadow-lg "
                                      : "bg-white/10 text-gray-200 rounded-br-none backdrop-blur-md"
                                  }`}
                        >
                          {msg.message}
                        </div>

                        {msg.commentBY?._id ===
                          localStorage.getItem("UserId") && (
                          <span className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <CommentActionMenu commentId={msg._id} />
                          </span>
                        )}
                      </div>

                      {msg.commentBY?._id != localStorage.getItem("UserId") && (
                        <img
                          src={msg.commentBY.avatar}
                          alt="avatar"
                          className="w-9 h-9 rounded-full ring-2 ring-indigo-500/30"
                        />
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-3 bg-white/2 backdrop-blur-md">
              <Input
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
                placeholder="Type a message..."
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400
                 rounded-sm"
              />
              <Button
                onClick={handleSendComment}
                size="icon"
                className="bg-linear-to-r from-indigo-600 to-violet-600
                 hover:scale-105 transition-all duration-200
                 rounded-sm shadow-lg shadow-indigo-500/30"
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
