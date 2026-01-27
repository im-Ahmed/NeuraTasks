import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { motion } from 'framer-motion';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
// this is schema for correct data input using zod
const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  assignee: z.string().min(1, 'Assignee is required'),
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
      title: '',
      description: '',
      assignee: '',
      dueDate: '',
    },
  });

  const submit = (data: AssignTaskValues) => {
    onCreate(data);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border-indigo-100 shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold text-indigo-600">
              Assign New Task
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(submit)}
            className="space-y-5"
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="space-y-1"
            >
              <Label className="text-indigo-700">Title</Label>
              <Input
                {...form.register('title')}
                className="focus-visible:ring-indigo-500"
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500">
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
              <Label className="text-indigo-700 ">Description</Label>
              <Textarea
                rows={4}
                {...form.register('description')}
                className="resize-none focus-visible:ring-indigo-500"
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </motion.div>

            <div className='flex gap-5'>
              {/* Assignee */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className=""
            >
              <Label className="text-indigo-700 mb-1">Assignee</Label>
              <Select
                onValueChange={(v) =>
                  form.setValue('assignee', v, { shouldValidate: true })
                }
              >
                <SelectTrigger className="focus:ring-indigo-500">
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ahmad">Ahmad</SelectItem>
                  <SelectItem value="Sara">Sara</SelectItem>
                  <SelectItem value="Ali">Ali</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.assignee && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.assignee.message}
                </p>
              )}
            </motion.div>

            {/* Due Date */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className=""
            >
              <Label className="text-indigo-700 mb-1">Due Date</Label>
              <Input
                type="date"
                {...form.register('dueDate')}
                className="focus-visible:ring-indigo-500"
              />
            </motion.div>

            </div>
            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="flex justify-end gap-3 pt-4"
            >
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700"
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
