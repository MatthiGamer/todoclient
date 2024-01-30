import { DateType } from "./DateType";

export type Task = {
    taskID: string;
    taskName: string;
    taskList: string;
    dueDate?: DateType | null;
    isImportant: boolean;
    isDone: boolean;
};