import { SendTask } from "../Components/SignalRComponent/SignalRComponent";
import { Task } from "../Types/TaskType";

export class TaskManager {
    private static instance: TaskManager | null = null;

    private currentList: string | null = null;
    private dueDateString: string | null = null;

    private tasks: { [key: string]: Task[] } | null = null;
    
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
        const task: Task = {taskName: taskName, taskList: this.currentList, dueDateString: this.dueDateString};
        this.AddTask(task);
        //SendTask(task);
    }

    private AddTask = (task: Task) => {
        if (this.tasks === null) {
            this.tasks = {};
        }

        if (this.tasks[task.taskList] === undefined){
            this.tasks[task.taskList] = [];
        }

        this.tasks[task.taskList] = [...this.tasks[task.taskList], task];
        console.log("Task added.");
        console.log(this.tasks[task.taskList]);
    }
}