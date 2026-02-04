// src/components/CreateBoard.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useState } from "react";

// Form validation schema
const createBoardSchema = z.object({
  boardName: z.string().min(1, "Board name is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  owner: z.string().min(1, "Owner is required"),
});

type CreateBoardForm = z.infer<typeof createBoardSchema>;

interface User {
  id: string;
  name: string;
}

interface CreateBoardProps {
  onSuccess: (data: CreateBoardForm & { members: string[] }) => void;
  onCancel: () => void;
  availableUsers: User[];
}

export default function CreateBoard({ onSuccess, onCancel, availableUsers }: CreateBoardProps) {
  // const { toast } = useToast();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const form = useForm<CreateBoardForm>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      boardName: "",
      title: "",
      description: "",
      owner: "",
    },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const onSubmit = (data: CreateBoardForm) => {
    try {
      const boardData = { ...data, members: selectedMembers };
      onSuccess(boardData); //on successful submission it pass data to handleboardcreation function in parent which than make the side component
      toast.success("Board created successfully!");
    } catch (error) {
      toast.error("Failed to create board");
    }
  };

  const toggleMember = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId] //thislines check if user include in list than filter that user if not include add in list 
    );
  };

  return (
   <form
  onSubmit={handleSubmit(onSubmit)}
  className="w-full max-w-4xl mx-auto flex flex-col gap-5 sm:gap-6 lg:gap-8 px-3 sm:px-4 lg:px-6 overflow-x-hidden"
>
  {/* Row 1 */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
    {/* Board Name */}
    <div className="min-w-0">
      <Label htmlFor="boardName" className="text-sm sm:text-base">Board Name</Label>
      <Input
        id="boardName"
        {...register("boardName")}
        className="mt-2 h-10 sm:h-11 w-full"
      />
      {errors.boardName && (
        <p className="text-destructive text-xs sm:text-sm mt-1 break-words">
          {errors.boardName.message}
        </p>
      )}
    </div>

    {/* Title */}
    <div className="min-w-0">
      <Label htmlFor="title" className="text-sm sm:text-base">Title</Label>
      <Input
        id="title"
        {...register("title")}
        className="mt-2 h-10 sm:h-11 w-full"
      />
      {errors.title && (
        <p className="text-destructive text-xs sm:text-sm mt-1 break-words">
          {errors.title.message}
        </p>
      )}
    </div>
  </div>

  {/* Row 2 */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
    {/* Owner */}
    <div className="min-w-0">
      <Label htmlFor="owner" className="text-sm sm:text-base">Owner</Label>
      <Input
        id="owner"
        {...register("owner")}
        className="mt-2 h-10 sm:h-11 w-full"
      />
      {errors.owner && (
        <p className="text-destructive text-xs sm:text-sm mt-1 break-words">
          {errors.owner.message}
        </p>
      )}
    </div>

    {/* Description */}
    <div className="min-w-0">
      <Label htmlFor="description" className="text-sm sm:text-base">Description</Label>
      <Textarea
        id="description"
        {...register("description")}
        className="mt-2 min-h-[100px] sm:min-h-[120px] w-full resize-y"
      />
      {errors.description && (
        <p className="text-destructive text-xs sm:text-sm mt-1 break-words">
          {errors.description.message}
        </p>
      )}
    </div>
  </div>

  {/* Members Selection */}
  <div className="flex flex-col">
    <Label className="text-sm sm:text-base">Members</Label>

    <div className="mt-3 border border-border rounded-md overflow-x-auto max-h-64">
      <Table className="min-w-[640px] text-xs sm:text-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead className="whitespace-nowrap">Name</TableHead>
            <TableHead className="whitespace-nowrap">ID</TableHead>
            <TableHead className="whitespace-nowrap">Identifier</TableHead>
            <TableHead className="whitespace-nowrap">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {availableUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox
                  checked={selectedMembers.includes(user.id)}
                  onCheckedChange={() => toggleMember(user.id)}
                />
              </TableCell>
              <TableCell className="truncate max-w-[140px] sm:max-w-none">
                {user.name}
              </TableCell>
              <TableCell className="truncate">{user.id}</TableCell>
              <TableCell className="truncate">{user.Mail}</TableCell>
              <TableCell className="truncate">{user.Role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {availableUsers.length === 0 && (
      <p className="text-muted-foreground text-xs sm:text-sm mt-2">
        No users available to add.
      </p>
    )}
  </div>

  {/* Actions */}
  <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 pt-2">
    <Button
      type="button"
      variant="outline"
      className="w-full sm:w-auto h-10 sm:h-11 text-black"
      onClick={onCancel}
      disabled={isSubmitting}
    >
      Cancel
    </Button>

    <Button
      type="submit"
      className="w-full sm:w-auto h-10 sm:h-11"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Creating..." : "Create Board"}
    </Button>
  </div>
</form>
  )
}