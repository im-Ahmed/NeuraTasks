// what is happening in this file on first time when use enter the board page a simple page is show with one card here is used temporary data and function which is clicked when user want to create board and create a new board that return outside 
// src/components/Board.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent
} from "@/components/ui/card"; // shadcn/ui
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // shadcn/ui Dialog
import { cn } from "@/lib/utils";
import CreateBoard from "../components/createBoard";
import ActionMenuRecommended from "../components/actionBtn"

// Define Board Item Type
interface BoardItem {
  id: string;
  boardName: string;
  title: string;
  description: string;
  icon: string;
  owner: string;
  members: string[];
  content: React.ReactNode;
}

// Mock available users (replace with real data from props/context/API)
const availableUsers = [
  { id: "user1", name: "Alice Johnson" , Mail : "hello@gmai.com" ,Role : "employer" },
  { id: "user2", name: "Bob Smith", Mail : "hello@gmai.com" ,Role : "employer" },
  { id: "user3", name: "Charlie Davis", Mail : "hello@gmai.com" ,Role : "employer" },
  { id: "user4", name: "Dana Lee", Mail : "hello@gmai.com" ,Role : "employer" },
];

const initialSidebarItems: BoardItem[] = [];

// Generate content for each board
const getItemContent = (item: Omit<BoardItem, "content">): React.ReactNode => (
  <>
    <h3 className="text-2xl font-bold mb-4">{item.title} Details</h3>
    <p className="text-muted-foreground mb-6">{item.description}</p>
    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-2">Board Info</h4>
      <p><strong>Board Name:</strong> {item.boardName}</p>
      <p><strong>Owner:</strong> {item.owner}</p>
      <p><strong>Members:</strong> {item.members.join(", ") || "None"}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-[#1a1f2e] border-none">
        <CardHeader>
          <CardTitle>Sample Stat</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">1,234</p>
          <p className="text-sm text-muted-foreground">+12% this month</p>
        </CardContent>
      </Card>
    </div>
  </>
);

export default function Board() {
  const [sidebarItems, setSidebarItems] = useState<BoardItem[]>(initialSidebarItems);
  const [selectedItem, setSelectedItem] = useState<BoardItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const isEmpty = sidebarItems.length === 0;
// this is the function that pass as an argument to createbaord
  const handleBoardCreated = (newBoardData: Omit<BoardItem, "id" | "content" | "icon">) => {
    const newBoard: BoardItem = {
      ...newBoardData,
      id: `board-${Date.now()}`,
      icon: "📋",
      content: getItemContent({ ...newBoardData, id: `board-${Date.now()}`, icon: "📋" }),
    };

    setSidebarItems((prev) => [...prev, newBoard]);
    setSelectedItem(newBoard);
    setIsCreateModalOpen(false);
  };
  const handleDeleteBoard = (id: string) => {
  setSidebarItems(prev => prev.filter(b => b.id !== id));
  if (selectedItem?.id === id) setSelectedItem(null);
};
const handleUpdateBoard = (id: string) => {
  const board = sidebarItems.find(b => b.id === id);
  alert("Update board: " + board?.title);
  // open edit dialog later
};
const handleDuplicateBoard = (id: string) => {
  const board = sidebarItems.find(b => b.id === id);
  if (!board) return;

  const copy = {
    ...board,
    id: "board-" + Date.now(),
    title: board.title + " Copy",
  };

  setSidebarItems(prev => [...prev, copy]);
};



  return (
    <div className="min-h-screen bg-[#0a0f1a] grid grid-rows-[auto_1fr_auto] text-white">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Boards</h1>
          <div className="flex items-center gap-3">
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg font-medium transition-colors">
                  Create Board
                </Button>
              </DialogTrigger>
            <ActionMenuRecommended
  selectedBoard={selectedItem}
  onDelete={handleDeleteBoard}
  onDuplicate={handleDuplicateBoard}
  onUpdate={handleUpdateBoard}
/>

          <button className="p-2 rounded-lg bg-[#1a1f2e] hover:bg-[#2a3349] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
              <DialogContent className="sm:max-w-[1200px] bg-[#1a1f2e] border-none text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Create New Board</DialogTitle>
                </DialogHeader>
                <CreateBoard
                  onSuccess={handleBoardCreated}
                  onCancel={() => setIsCreateModalOpen(false)}
                  availableUsers={availableUsers}
                />
              </DialogContent>
            </Dialog>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Card className="w-full max-w-lg bg-[#1a1f2e] border-none rounded-xl shadow-sm p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">No Boards Yet</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Get started by creating your first board!
                </p>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Create Board
                </Button>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="standard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full"
            >
              {/* Sidebar */}
              <div className="flex flex-col gap-4 lg:col-span-1">
                {sidebarItems.map((item) => (
                  <Card
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={cn(
                      "cursor-pointer transition-all duration-200 bg-[#1a1f2e] border-none hover:bg-[#2a3349]",
                      selectedItem?.id === item.id &&
                        "bg-[#2a3349] ring-2 ring-primary ring-offset-2 ring-offset-background"
                    )}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription className="text-[#dce0ebe0]">
                            {item.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="justify-end">
                      <span className="text-sm text-muted-foreground">
                        {selectedItem?.id === item.id ? "Selected" : "Select →"}
                      </span>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Content Area */}
              <div className="lg:col-span-2 bg-[#1a1f2e] border-none rounded-xl shadow-sm overflow-hidden h-full">
                <ScrollArea className="h-full px-8 py-10">
                  <div className="pr-6">
                    {selectedItem ? (
                      selectedItem.content
                    ) : (
                      <div className="text-center py-20">
                        <h2 className="text-3xl font-bold mb-4">Select a board</h2>
                        <p className="text-lg text-muted-foreground">
                          Click any card on the left to view its content
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}