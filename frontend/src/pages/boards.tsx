// what is happening in this file on first time when use enter the board page a simple page is show with one card here is used temporary data and function which is clicked when user want to create board and create a new board that return outside
// src/components/Board.tsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
import ActionMenuRecommended from "../components/actionBtn";
import { useGetAllUserQuery } from "@/features/user/userSlice";
import { useGetAllBoardQuery } from "@/features/board/realTimeBoardFetching";
import type { Board, CreateBoardType } from "@/types/BoardTypes";
import CreateBoard from "@/components/createBoard";
import {
  useAddBoardMutation,
  useDeleteBoardMutation,
} from "@/features/board/boardSlice";

// Animated Glow Background (from hero page)
const GlowBackground = () => {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-10"
          style={{
            width: `${300 + i * 40}px`,
            height: `${300 + i * 40}px`,
            background:
              "radial-gradient(circle, oklch(0.6 0.24 293.9), transparent 40%)",
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          }}
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 noise-overlay" />
    </>
  );
};

// Generate content for each board
const renderBoardContent = (board: Board) => (
  <>
    <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
      {board.title} Details
    </h3>

    <p className="text-white/60 mb-6">{board.description}</p>

    <div className="mb-6">
      <h4 className="text-lg font-semibold mb-2">Members</h4>

      <div className="flex flex-wrap gap-3">
        {board.members.map((member) => {
          if (typeof member === "string") {
            return null; // or render fallback
          }

          return (
            <div
              key={member._id}
              className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full"
            >
              <img
                src={member.avatar}
                alt={member.username}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm">{member.username}</span>
            </div>
          );
        })}
      </div>
    </div>
  </>
);

export default function Board() {
  const { data: allUsers } = useGetAllUserQuery();
  const { data: allBoards, isLoading: boardLoading } = useGetAllBoardQuery();
  const [addBoard, { isError: boardError }] = useAddBoardMutation();
  const [deleteBoard, { isError: boardDeleteError }] = useDeleteBoardMutation();
  const [selectedItem, setSelectedItem] = useState<Board | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const boardsContainerRef = useRef<HTMLDivElement>(null);

  const boards = allBoards?.data?.boards ?? [];

  const isEmpty = boards.length === 0 && !boardLoading;

  useEffect(() => {
    const checkIfScrollable = () => {
      if (boardsContainerRef.current) {
        const isScroll =
          boardsContainerRef.current.scrollHeight >
          boardsContainerRef.current.clientHeight;
        setIsScrollable(isScroll);
      }
    };

    checkIfScrollable();
    window.addEventListener("resize", checkIfScrollable);
    return () => window.removeEventListener("resize", checkIfScrollable);
  }, [boards]);

  // this is the function that pass as an argument to createbaord
  const handleBoardCreated = async (newBoardData: CreateBoardType) => {
    try {
      const boardCreationResponse = await addBoard(newBoardData).unwrap();
      const newBoard = boardCreationResponse.data;
      setSelectedItem(newBoard);
    } catch (err) {
      console.log(`${boardError || err}`);
    } finally {
      setIsCreateModalOpen(false);
    }
  };

  const handleDeleteBoard = (id: string) => {
    try {
      deleteBoard(id);
    } catch (err) {
      console.log(`${boardDeleteError || err}`);
    }
  };
  const handleUpdateBoard = (id: string) => {
    console.log("Update id", id);
    // const board = sidebarItems.find((b) => b.id === id);
    // alert("Update board: " + board?.title);
    // open edit dialog later
  };

  return (
    <div className="relative min-h-screen bg-neutral-900 text-white overflow-hidden">
      {/* Animated Glow Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <GlowBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 grid grid-rows-[auto_1fr_auto] min-h-screen">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-linear-to-r from-white/5 to-white/0">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
              Boards
            </h1>
            <div className="flex items-center gap-3">
              <Dialog
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="px-4 py-2 rounded-lg font-medium transition-colors shadow-lg"
                    style={{
                      backgroundColor: "oklch(0.6 0.24 293.9)",
                      boxShadow: "0 0 20px oklch(0.6 0.24 293.9 / 0.3)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.9")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Create Board
                  </Button>
                </DialogTrigger>
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <DialogContent className="sm:max-w-300 bg-neutral-800/50 backdrop-blur-xl border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                      Create New Board
                    </DialogTitle>
                  </DialogHeader>
                  <CreateBoard
                    onSuccess={handleBoardCreated}
                    onCancel={() => setIsCreateModalOpen(false)}
                    availableUsers={allUsers?.data.users}
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
                <Card className="w-full max-w-80 lg:max-w-lg bg-neutral-800/30 border border-white/10 rounded-xl shadow-lg backdrop-blur-xl p-8 text-center">
                  <h2 className="text-3xl font-bold mb-4 bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
                    No Boards Yet
                  </h2>
                  <p className="text-sm lg:text-lg text-white/60 mb-6">
                    Get started by creating your first board!
                  </p>
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="text-white shadow-lg"
                    style={{
                      backgroundColor: "oklch(0.6 0.24 293.9)",
                      boxShadow: "0 0 20px oklch(0.6 0.24 293.9 / 0.3)",
                    }}
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
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full max-h-[calc(100vh-180px)]"
              >
                {/* Sidebar */}
                <div
                  ref={boardsContainerRef}
                  className="relative flex flex-col gap-4 lg:col-span-1 overflow-y-auto h-full scroll-smooth [&::-webkit-scrollbar]:hidden"
                >
                  <div className="flex flex-col gap-4">
                    {boards.map((board: Board) => (
                      <Card
                        key={board._id}
                        onClick={() => setSelectedItem(board)}
                        className={cn(
                          "cursor-pointer transition-all duration-200 bg-neutral-800/20 backdrop-blur border border-white/10 hover:bg-neutral-800/40 hover:border-white/20",
                          selectedItem?._id === board._id &&
                            "bg-white/10 border-white/30 ring-2 ring-[oklch(0.6_0.24_293.9)]/30",
                        )}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 flex flex-col">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg md:text-xl text-white">
                                  {board.title}
                                </CardTitle>

                                {
                                  // Menu buttons (three dots)
                                  selectedItem?._id === board._id && (
                                    <ActionMenuRecommended
                                      selectedBoard={selectedItem}
                                      onDelete={handleDeleteBoard}
                                      onUpdate={handleUpdateBoard}
                                    />
                                  )
                                }
                              </div>
                              <CardDescription className="text-[#dce0ebe0] mt-1">
                                {board.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>

                        <CardFooter className="justify-end">
                          <span className="text-sm text-muted-foreground">
                            {selectedItem?._id === board._id
                              ? "Selected"
                              : "Select →"}
                          </span>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  {boards.length > 0 && isScrollable && (
                    <div className="sticky bottom-0 flex items-center justify-center py-4 text-white/40 bg-linear-to-t from-neutral-900 to-transparent">
                      <svg
                        className="w-5 h-5 animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl backdrop-blur overflow-hidden h-full flex flex-col">
                  <ScrollArea className="h-full px-8 py-10">
                    <div className="pr-6">
                      {selectedItem ? (
                        renderBoardContent(selectedItem)
                      ) : (
                        <div className="text-center py-20">
                          <h2 className="text-3xl font-bold mb-4 bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
                            Select a board
                          </h2>
                          <p className="text-lg text-white/60">
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
    </div>
  );
}
