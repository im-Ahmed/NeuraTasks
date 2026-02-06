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
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
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

export default function CreateBoard({
  onSuccess,
  onCancel,
  availableUsers,
}: CreateBoardProps) {
  // const { toast } = useToast();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const form = useForm<CreateBoardForm>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

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
    setSelectedMembers(
      (prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId)
          : [...prev, userId], //thislines check if user include in list than filter that user if not include add in list
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl mx-auto flex flex-col gap-5 sm:gap-6 lg:gap-8 px-3 sm:px-4 lg:px-6 overflow-x-hidden"
    >
      {/* Row 1 */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {/* Title */}
        <div className="min-w-0">
          <Label htmlFor="title" className="text-sm sm:text-base text-white/90">
            Title
          </Label>
          <Input
            id="title"
            {...register("title")}
            className="mt-2 h-10 sm:h-11 w-full bg-neutral-800/30 border border-white/20 text-white placeholder:text-white/40"
            style={
              {
                "--tw-ring-color": "oklch(0.6 0.24 293.9 / 0.2)",
                "--tw-border-color-focus": "oklch(0.6 0.24 293.9 / 0.5)",
              } as any
            }
          />
          {errors.title && (
            <p className="text-red-400 text-xs sm:text-sm mt-1 break-words">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="min-w-0">
          <Label
            htmlFor="description"
            className="text-sm sm:text-base text-white/90"
          >
            Description
          </Label>
          <Textarea
            id="description"
            {...register("description")}
            className="mt-2 min-h-[100px] sm:min-h-[120px] w-full resize-y bg-neutral-800/30 border border-white/20 text-white placeholder:text-white/40 focus:border-[oklch(0.6_0.24_293.9)]/50 focus:ring-[oklch(0.6_0.24_293.9)]/20"
          />
          {errors.description && (
            <p className="text-red-400 text-xs sm:text-sm mt-1 break-words">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      {/* Members Selection */}
      <div className="flex flex-col">
        <Label className="text-sm sm:text-base text-white/90">Members</Label>

        <div className="mt-3 border border-white/20 rounded-md overflow-x-auto max-h-64 bg-neutral-800/20">
          <Table className="min-w-[640px] text-xs sm:text-sm">
            <TableHeader>
              <TableRow className="border-b border-white/10 hover:bg-transparent">
                <TableHead className="w-12 text-white/70"></TableHead>
                <TableHead className="whitespace-nowrap text-white/70">
                  Name
                </TableHead>
                <TableHead className="whitespace-nowrap text-white/70">
                  ID
                </TableHead>
                <TableHead className="whitespace-nowrap text-white/70">
                  Identifier
                </TableHead>
                <TableHead className="whitespace-nowrap text-white/70">
                  Role
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availableUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedMembers.includes(user.id)}
                      onCheckedChange={() => toggleMember(user.id)}
                      className="border-white/30"
                    />
                  </TableCell>
                  <TableCell className="truncate max-w-[140px] sm:max-w-none text-white/80">
                    {user.name}
                  </TableCell>
                  <TableCell className="truncate text-white/80">
                    {user.id}
                  </TableCell>
                  <TableCell className="truncate text-white/80">
                    {user.name}
                  </TableCell>
                  <TableCell className="truncate text-white/80">
                    {user.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {availableUsers.length === 0 && (
          <p className="text-white/50 text-xs sm:text-sm mt-2">
            No users available to add.
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          className="w-full sm:w-auto h-10 sm:h-11 bg-transparent"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="w-full sm:w-auto h-10 sm:h-11 text-white shadow-lg disabled:opacity-50"
          style={{
            backgroundColor: "oklch(0.6 0.24 293.9)",
            boxShadow: "0 0 20px oklch(0.6 0.24 293.9 / 0.3)",
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Board"}
        </Button>
      </div>
    </form>
  );
}
