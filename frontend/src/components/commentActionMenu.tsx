"use client";

import { MoreVertical, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteCommentMutation } from "@/features/comments/commentSlice";

type CommentActionMenuProps = {
  commentId: string;
  commentCurrntVal: string;
  setCommentInput: (value: string) => void;
  setEditingCommentId: (id: string | null) => void;
};

export function CommentActionMenu({
  commentId,
  commentCurrntVal,
  setCommentInput,
  setEditingCommentId,
}: CommentActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [deleteComment, { isError: deletingError }] =
    useDeleteCommentMutation();

  const handleDelete = async () => {
    try {
      await deleteComment(commentId);
    } catch (err) {
      console.log("Error in delete comment", deletingError || err);
    } finally {
      setOpen(false);
    }
  };

  const handleEdit = () => {
    setCommentInput(commentCurrntVal);
    setEditingCommentId(commentId);
    setOpen(false);
  };

  return (
    <DropdownMenu  open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="p-1 hover:bg-white/10  rounded transition-colors duration-200">
          <MoreVertical className="h-4 w-4 text-white/70 hover:text-white" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/90 border-white/20">
        <DropdownMenuItem
          onClick={handleEdit}
          className="text-white hover:bg-white/20 cursor-pointer flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          className="text-red-400 hover:bg-red-500/20 cursor-pointer w-full flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
