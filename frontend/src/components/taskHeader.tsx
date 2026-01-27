'use client';

import { motion } from 'framer-motion';
import { LayoutGrid, Plus, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Board {
  id: string;
  name: string;
}

interface Props {
  boards: Board[];
  selectedBoard: string;
  onBoardChange: (id: string) => void;
  onAssignClick: () => void;
}

export function TaskHeader({
  boards,
  selectedBoard,
  onBoardChange,
  onAssignClick,
}: Props) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className=" top-0  border-none bg-white"
    >
      <div className="flex h-20 items-center justify-between p-6">
        {/* left */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 font-semibold text-indigo-600"
        >
          <span className="text-3xl font-bold">Tasks</span>
        </motion.div>

        {/* right */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mr-1"
        >
          {/* Board Select */}
          <Select value={selectedBoard} onValueChange={onBoardChange}>
            <SelectTrigger className="w-40  px-4 py-2 rounded-lg font-medium transition-colors border-indigo-200 bg-white text-indigo-700 focus:ring-indigo-500">
              <SelectValue placeholder="Select Board" />
            </SelectTrigger>
            <SelectContent className="border-indigo-100">
              {boards.map((board) => (
                <SelectItem
                  key={board.id}
                  value={board.id}
                  className="focus:bg-indigo-50 focus:text-indigo-700"
                >
                  {board.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Assign Task */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={onAssignClick}
              className="gap-1.5 px-4 py-2 rounded-lg font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Assign Task
            </Button>
          </motion.div>

          {/* Search */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="icon"
              variant="ghost"
              className=" text-indigo-600 hover:bg-indigo-50"
            >
              <Search className="h-5 w-5" />
            </Button>
          </motion.div>

          {/* Settings */}
          <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
            <Button
              size="icon"
              variant="ghost"
              className="text-indigo-600 hover:bg-indigo-50"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}
