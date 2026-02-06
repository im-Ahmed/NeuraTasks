"use client";

import { motion } from "framer-motion";
import { Plus, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="top-0 border-none bg-transparent w-full overflow-x-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-3 sm:px-6 py-4 sm:h-20">
        {/* left */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 font-semibold text-white"
        >
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold">
            Tasks
          </span>
        </motion.div>

        {/* right */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto"
        >
          {/* Board Select */}
          <Select value={selectedBoard} onValueChange={onBoardChange}>
            <SelectTrigger className="w-full sm:w-44 lg:w-48 h-10 sm:h-11 px-3 sm:px-4 rounded-lg font-medium border-white/10 bg-white/5 text-white/90 focus-visible:ring-[oklch(0.6_0.24_293.9)]">
              <SelectValue placeholder="Select Board" />
            </SelectTrigger>
            <SelectContent className="border-indigo-100">
              {boards.map((board) => (
                <SelectItem
                  key={board.id}
                  value={board.id}
                  className="focus:bg-white/5 focus:text-white"
                >
                  {board.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Assign + Search + Settings — same line on mobile */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Assign Task — 50% width mobile */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-1/2 sm:w-auto"
            >
              <Button
                onClick={onAssignClick}
                className="w-full sm:w-auto justify-center gap-2 px-3 sm:px-4 h-10 sm:h-11 rounded-lg font-medium text-white shadow-sm"
                style={{
                  backgroundColor: "oklch(0.6 0.24 293.9)",
                  boxShadow: "0 8px 24px oklch(0.6 0.24 293.9 / 0.25)",
                }}
              >
                <Plus className="h-4 w-4" />
                <span className=" sm:inline">Assign Task</span>
              </Button>
            </motion.div>

            {/* Search */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 sm:flex-none"
            >
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-full sm:w-10  hover:bg-indigo-50"
              >
                <Search className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* Settings */}
            <div className="flex-1 justify-end">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.2 }}
                className="flex-1 sm:flex-none"
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-full sm:w-10 hover:bg-indigo-50"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
