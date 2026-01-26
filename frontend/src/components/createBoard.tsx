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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 flex flex-col gap-6">
      {/* Board Name */}
      <div className="grid grid-cols-2 gap-4">
      <div >
        <Label htmlFor="boardName">Board Name</Label>
        <Input id="boardName" {...register("boardName")} className="mt-1" />
        {errors.boardName && (
          <p className="text-destructive text-sm mt-1">{errors.boardName.message}</p>
        )}
      </div>

      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} className="mt-1" />
        {errors.title && (
          <p className="text-destructive text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      </div>

      
      <div className="grid grid-cols-2 gap-4">

        {/* Owner */}
      <div>
        <Label htmlFor="owner">Owner</Label>
        <Input id="owner" {...register("owner")} className="mt-1" />
        {errors.owner && (
          <p className="text-destructive text-sm mt-1">{errors.owner.message}</p>
        )}
      </div>
      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} className="mt-1" />
        {errors.description && (
          <p className="text-destructive text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      
    </div>
      {/* Members Selection */}
      <div className="flex flex-col justify-center">
        <Label>Members</Label>
        <div className="mt-2 border border-border rounded-md overflow-hidden max-h-60 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>id</TableHead>
                <TableHead>Identifier</TableHead>
                <TableHead>Role</TableHead>
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
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.Mail}</TableCell>
                  <TableCell>{user.Role}</TableCell>
                  

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {availableUsers.length === 0 && (
          <p className="text-muted-foreground text-sm mt-2">No users available to add.</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" className="text-black" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Board"}
        </Button>
      </div>
    </form>
  );
}