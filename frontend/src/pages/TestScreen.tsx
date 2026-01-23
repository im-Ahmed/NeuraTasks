import {
  useAddBoardMutation,
  useDeleteBoardMutation,
  // useGetBoardsQuery,
  useLazyGetBoardsQuery,
} from "@/features/board/boardSlice";
import type { Board } from "@/types/BoardTypes";
import React, { useState } from "react";

const TestScreen: React.FC = () => {
  // const { data: allBoards, isLoading } = useGetBoardsQuery();
  const [addBoard, { isLoading: creatingBoard }] = useAddBoardMutation();
  const [deleteBoard, { isLoading: deleting }] = useDeleteBoardMutation();
  const [fetchBoards, { data: allBoards, isLoading }] = useLazyGetBoardsQuery();
  const [deleteId, setDeleteId] = useState<string | undefined>("");

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    userIds: string[];
  }>({
    title: "",
    description: "",
    userIds: ["692aa46dee9f33f8e71c5e76", "692aa445ee9f33f8e71c5e73"],
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Call the trigger function to fire the API call
      // .unwrap() allows you to catch errors in a try/catch block if you prefer specific logic here
      const response = await addBoard(formData).unwrap();
      // setDeleteId(user.data._id);
      console.log("Registration successful:", response);
      setDeleteId(response.data._id);
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };
  const handleDelete = async (boardId: string) => {
    try {
      const boardDeleteResponcse = await deleteBoard(boardId).unwrap();
      console.log(boardDeleteResponcse);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <h1>Test Screen</h1>
      {allBoards?.data.boards.map((board: Board) => (
        <pre key={board._id}>{board.description}</pre>
      ))}
      <form className=" mt-32" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="border border-blue-300 text-xl"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="description"
          className="border border-blue-300 text-xl"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <button
          type="submit"
          className="m-2 p-4 bg-blue-600 text-white"
          disabled={creatingBoard}
        >
          {creatingBoard ? "creating board..." : "create"}
        </button>
      </form>
      <button
        className="m-2 p-4 bg-red-600 text-white"
        onClick={() => handleDelete(deleteId!)}
      >
        {deleting ? "deleting..." : "delete"}
      </button>
      <button
        className="m-2 p-4 bg-green-600 text-white"
        onClick={() => fetchBoards()}
      >
        {isLoading ? "fetching..." : "fetch"}
      </button>
    </div>
  );
};

export default TestScreen;
