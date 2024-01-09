import { SendTask } from "../Components/SignalRComponent/SignalRComponent";
import { TaskClass } from "./TaskClass";

export class TaskManager {
    private static instance: TaskManager | null = null;

    private currentList: string | null = null;
    private dueDateString: string | null = null;
    
    private constructor() {}

    public static getInstance(): TaskManager {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }
        return TaskManager.instance;
    }

    public SetCurrentList = (listName: string | null) => {
        this.currentList = listName;
        this.SetDueDate(null);
    }

    public SetDueDate = (dueDateString: string | null) => {
        this.dueDateString = dueDateString;
    }

    public CreateTask = (taskName: string) => {
        if (!this.currentList) return;
        const task: TaskClass = new TaskClass(taskName, this.currentList, this.dueDateString);
        SendTask(task.GetTask());
    }
}