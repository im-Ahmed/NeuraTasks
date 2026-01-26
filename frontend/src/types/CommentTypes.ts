type CommentUser = {
  _id: string;
  username: string;
  avatar: string;
};
export type Comment = {
  task: string;
  message: string;
  commentBY: string | CommentUser;
  _id: string;
  createdAt: string;
  updatedAt: string;
};
