export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN-PROGRESS",
  DONE = "DONE",
  BLOCKED = "BLOCKED",
}
export enum TaskPriority {
  HIGH = "HIGH",
  LOW = "LOW",
  NORMAL = "NORMAL",
}
export type Member = {
  _id: string;
  username: string;
  name:string;
  avatar: string;
};
export type Task = {
  title: string;
  description: string;
  boardId: string;
  priority: string;
  status: string;
  dueDate: string;
  assignedTo: (Member | string)[];
  _id: string;
  createdAt: string;
  updatedAt: string;
};
