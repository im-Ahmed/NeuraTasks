export type BoardMember = {
  _id: string;
  username: string;
  role: "member" | "admin"; // extend if more roles exist
  avatar: string;
};

export type Board = {
  _id: string;
  title: string;
  description: string;
  allMembers: BoardMember[];
};
