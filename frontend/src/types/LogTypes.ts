export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN-PROGRESS",
  DONE = "DONE",
  BLOCKED = "BLOCKED",
}

export type Log = {
  board: string;
  task: string;
  user?: string;
  action: string;
  details: {
    oldStatus: TaskStatus;
    newStatus: TaskStatus;
    _id?: string;
  };
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
};
