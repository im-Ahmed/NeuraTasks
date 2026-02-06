import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  assignee: z.string().min(1, "Assignee is required"),
  dueDate: z.string().optional(),
});

export type AssignTaskValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (data: AssignTaskValues) => void;
}

export function AssignTaskDialog({ open, onClose, onCreate }: Props) {
  const form = useForm<AssignTaskValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
    },
  });

  const submit = (data: AssignTaskValues) => {
    onCreate(data);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-800/50 backdrop-blur-xl border-white/10 text-white w-[95vw] sm:w-full max-w-lg rounded-xl p-4 sm:p-6 overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <DialogHeader className="mb-3 sm:mb-4">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-white">
              Assign New Task
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(submit)}
            className="space-y-4 sm:space-y-5"
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="space-y-1"
            >
              <Label className="text-white/80 text-sm sm:text-base">
                Title
              </Label>
              <Input
                {...form.register("title")}
                className="h-10 sm:h-11 focus-visible:ring-[oklch(0.6_0.24_293.9)]"
              />
              {form.formState.errors.title && (
                <p className="text-xs sm:text-sm text-red-500 break-words">
                  {form.formState.errors.title.message}
                </p>
              )}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-1"
            >
              <Label className="text-white/80 text-sm sm:text-base">
                Description
              </Label>
              <Textarea
                rows={4}
                {...form.register("description")}
                className="min-h-[110px] sm:min-h-[130px] resize-y focus-visible:ring-[oklch(0.6_0.24_293.9)]"
              />
              {form.formState.errors.description && (
                <p className="text-xs sm:text-sm text-red-500 break-words">
                  {form.formState.errors.description.message}
                </p>
              )}
            </motion.div>

            {/* Assignee + Due Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Assignee */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="space-y-1"
              >
                <Label className="text-white/80 text-sm sm:text-base">
                  Assignee
                </Label>
                <Select
                  onValueChange={(v) =>
                    form.setValue("assignee", v, { shouldValidate: true })
                  }
                >
                  <SelectTrigger className="h-10 sm:h-11 bg-white/5 text-white focus-visible:ring-[oklch(0.6_0.24_293.9)]">
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ahmad">Ahmad</SelectItem>
                    <SelectItem value="Sara">Sara</SelectItem>
                    <SelectItem value="Ali">Ali</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.assignee && (
                  <p className="text-xs sm:text-sm text-red-500 break-words">
                    {form.formState.errors.assignee.message}
                  </p>
                )}
              </motion.div>

              {/* Due Date */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-1"
              >
                <Label className="text-white/80 text-sm sm:text-base">
                  Due Date
                </Label>
                <Input
                  type="date"
                  {...form.register("dueDate")}
                  className="h-10 sm:h-11 focus-visible:ring-[oklch(0.6_0.24_293.9)] bg-white/5 text-white"
                />
              </motion.div>
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-3 sm:pt-4"
            >
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto border-white/10 text-white hover:bg-white/5 h-10 sm:h-11"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-auto text-white h-10 sm:h-11"
                style={{
                  backgroundColor: "oklch(0.6 0.24 293.9)",
                  boxShadow: "0 8px 24px oklch(0.6 0.24 293.9 / 0.25)",
                }}
              >
                Create Task
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
