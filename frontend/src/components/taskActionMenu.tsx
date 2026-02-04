'use client';

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
import { motion } from 'framer-motion';

import { Button } from "@/components/ui/button";
import {Settings , Trash2, Pencil, Copy } from "lucide-react";

interface TaskLite {
  id: string;
  title: string;
}

interface Props {
  selectedTask: TaskLite | null;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export default function TaskActionMenu({
  selectedTask,
  onDelete,
  onUpdate,
  onDuplicate,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const disabled = !selectedTask;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.1 }}
              className="flex-1 sm:flex-none"
            >
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-full sm:w-10 text-indigo-600 hover:bg-indigo-50"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </motion.div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={disabled}
            onClick={() => selectedTask && onUpdate(selectedTask.id)}
            className="gap-2"
          >
            <Pencil className="h-4 w-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={disabled}
            onClick={() => selectedTask && onDuplicate(selectedTask.id)}
            className="gap-2"
          >
            <Copy className="h-4 w-4" />
            Duplicate
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
              {" "}{selectedTask?.title}
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
                if (selectedTask) onDelete(selectedTask.id);
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
