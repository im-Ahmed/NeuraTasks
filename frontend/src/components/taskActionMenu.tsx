"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash2, Pencil } from "lucide-react";
import type { Task } from "@/types/TaskTypes";

interface Props {
  selectedTask: Task | null;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

export default function TaskActionMenu({
  selectedTask,
  onDelete,
  onUpdate,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const disabled = !selectedTask;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
          // whileHover={{ rotate: 90 }}
          // transition={{ duration: 0.2 }}
          // className="flex-1 sm:flex-none"
          >
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-full sm:w-10 text-indigo-600 hover:bg-indigo-50"
            >
              <EllipsisVertical />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={disabled}
            onClick={() => selectedTask && onUpdate(selectedTask._id)}
            className="gap-2"
          >
            <Pencil className="h-4 w-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={disabled}
            onClick={() => setConfirmOpen(true)}
            className="gap-2 text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ✅ Delete Confirm Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete
            <span className="font-semibold text-red-500">
              {" "}
              {selectedTask?.title}
            </span>
            ?
          </p>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={() => {
                if (selectedTask) onDelete(selectedTask._id);
                setConfirmOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
