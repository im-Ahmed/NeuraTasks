type CommentUser = {
  _id: string;
  username: string;
  avatar: string;
};
export type Comment = {
  taskId: string;
  message: string;
  commentBY: CommentUser;
  _id: string;
  createdAt: string;
  updatedAt: string;
};
