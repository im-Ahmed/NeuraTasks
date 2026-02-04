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

import { useState } from "react";
import { Trash2, Pencil, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  selectedBoard: { id: string; title: string } | null;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onUpdate: (id: string) => void;
}

export default function ActionMenuRecommended({
  selectedBoard,
  onDelete,
  onDuplicate,
  onUpdate,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const disabled = !selectedBoard;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-lg bg-[#1a1f2e] hover:bg-[#2a3349] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={disabled}
            onClick={() => selectedBoard && onUpdate(selectedBoard.id)}
            className="gap-2"
          >
            <Pencil className="h-4 w-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={disabled}
            onClick={() => selectedBoard && onDuplicate(selectedBoard.id)}
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

          <DropdownMenuSeparator />
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
                if (selectedBoard) onDelete(selectedBoard.id);
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
