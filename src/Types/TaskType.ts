export type Task = {
    taskID: string;
    taskName: string;
    taskList: string;
    dueDateString?: string | null;
    isImportant: boolean;
};