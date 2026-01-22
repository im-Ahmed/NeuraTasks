// what is happening in this file on first time when use enter the board page a simple page is show with one card here is used temporary data and function which is clicked when user want to create board and create a new board that return outside 
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define the shape of each board item
interface BoardItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: React.ReactNode;
}

// Initial empty state (you can later fetch from API/localStorage)
const initialSidebarItems: BoardItem[] = [];

const getItemContent = (item: BoardItem): React.ReactNode => (
  <>
    <h3 className="text-2xl font-bold mb-4">{item.title} Details</h3>
    <p className="text-muted-foreground mb-6">{item.description}</p>
    {/* Add more dynamic content here as needed */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-[#868ea5] border-none">
        <CardHeader>
          <CardTitle>Sample Stat</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">1,234</p>
          <p className="text-sm text-muted-foreground">+12% this month</p>
        </CardContent>
      </Card>
      {/* Add more cards, charts, etc. */}
    </div>
  </>
);

export default function Board() {
  const [sidebarItems, setSidebarItems] = useState<BoardItem[]>(initialSidebarItems);
  const [selectedItem, setSelectedItem] = useState<BoardItem | null>(null);

  const isEmpty = sidebarItems.length === 0;

  // Handler to create a new board (can be replaced with real API call)
  const handleCreateBoard = () => {
    const newBoard: BoardItem = {
      id: `board-${Date.now()}`,
      title: `New Board ${sidebarItems.length + 1}`,
      description: "Freshly created board — customize me!",
      icon: "📋",
      content: getItemContent({
        id: `board-${Date.now()}`,
        title: `New Board ${sidebarItems.length + 1}`,
        description: "Freshly created board — customize me!",
        icon: "📋",
        content: null, // will be replaced
      }),
    };

    setSidebarItems((prev) => [...prev, newBoard]);
    setSelectedItem(newBoard); // Auto-select the newly created board
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] grid grid-rows-[auto_1fr_auto] text-white">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Boards</h1>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleCreateBoard}
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Create Board
            </Button>
            {/* ... other header buttons ... */}
            
          <button className="p-2 rounded-lg bg-[#1a1f2e] hover:bg-[#2a3349] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button className="p-2 rounded-lg bg-[#1a1f2e] hover:bg-[#2a3349] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {isEmpty ? (
            // Empty State - Centered
            <motion.div
              key="empty-state"
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
                  onClick={handleCreateBoard}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Create Board
                </Button>
              </Card>
            </motion.div>
          ) : (
            // Standard Layout: Sidebar + Content
            <motion.div
              key="standard-layout"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full"
            >
              {/* Sidebar / Master */}
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

              {/* Detail / Content Area */}
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