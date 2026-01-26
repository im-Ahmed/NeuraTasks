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
  avatar: string;
};
export type Task = {
  title: string;
  description: string;
  board: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignedTo: string[] | Member[];
  _id: string;
  createdAt: string;
  updatedAt: string;
};
