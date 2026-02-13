export type BoardMember = {
  _id: string;
  username: string;
  role: "member" | "admin"; // extend if more roles exist
  avatar: string;
};

export type Board = {
  _id?: string;
  title: string;
  description: string;
  members: (BoardMember | string)[];
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateBoardType = {
  _id?: string;
  title: string;
  description: string;
  userIds: string[];
};
