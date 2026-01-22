import { useGetBoardsQuery } from "@/features/board/boardSlice";
import type { Board } from "@/types/BoardTypes";
import React from "react";

const TestScreen: React.FC = () => {
  const { data: allBoards,  isLoading } = useGetBoardsQuery();
  {
    console.log();
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <h1>Test Screen</h1>
      {allBoards?.data.boards.map((board: Board) => (
        <pre key={board._id}>{board.description}</pre>
      ))}
    </div>
  );
};

export default TestScreen;
