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

import { useState } from "react";
import { EllipsisVertical, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Board } from "@/types/BoardTypes";

interface Props {
  selectedBoard: Board | null;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

export default function ActionMenuRecommended({
  selectedBoard,
  onDelete,
  onUpdate,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const disabled = !selectedBoard;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            // whileHover={{ rotate: 90 }}
            // transition={{ duration: 0.2 }}
            className="bg-none hover:bg-none"
          >
            <Button
              size="icon"
              variant={null}
              className="h-10 w-full sm:w-10 text-white bg-gray"
            >
              <EllipsisVertical className="bg-none hover:bg-none" />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={disabled}
            onClick={() =>
              selectedBoard && onUpdate(selectedBoard._id as string)
            }
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
            <DialogTitle>Delete Board</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-red-500">
              {selectedBoard?.title}
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
                if (selectedBoard) onDelete(selectedBoard._id as string);
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
