import { SendTask } from "../Components/SignalRComponent/SignalRComponent";
import { LIST_NAME_IMPORTANT, LIST_NAME_TODAY } from "../Consts";
import { Task } from "../Types/TaskType";
import { SHA256 } from "crypto-js";

export class TaskManager {
    private static instance: TaskManager | null = null;

    private currentList: string | null = null;
    private dueDateString: string | null = null;

    private tasks: { [key: string]: Task[] } | null = null;
    
    private constructor() {}

    public static GetInstance(): TaskManager {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }
        return TaskManager.instance;
    }

    public SetTaskImportance = (task: Task, isImportant: boolean) => {

    }

    public SetCurrentList = (listName: string | null) => {
        this.currentList = listName;
        this.SetDueDate(null);
    }

    public SetDueDate = (dueDateString: string | null) => {
        this.dueDateString = dueDateString;
    }

    public GetTasks = (): Task[] | undefined => {
        if (this.tasks === null ||
            this.currentList === null ||
            this.tasks[this.currentList] === undefined) {
            return undefined;
        }

        return this.tasks[this.currentList];
    }

    public CreateTask = (taskName: string) => {
        if (!this.currentList) return;
        const task: Task = {
            taskID: this.GenerateTaskID(),
            taskName: taskName,
            taskList: this.currentList,
            dueDateString: this.currentList === LIST_NAME_TODAY ? this.GetTodayDateString() : this.dueDateString,
            isImportant: this.currentList === LIST_NAME_IMPORTANT};
        this.AddTask(task);
        // SendTask(task); // Comment out for debug
        console.log("Task added.");
    }

    private GenerateTaskID = (): string => {
        const date = new Date();
        const uniqueString = date.toUTCString() + " " + date.getUTCMilliseconds();
        const hash = SHA256(uniqueString);
        return hash.toString();
    }

    private GetTodayDateString = (): string => {
        const date: Date = new Date();
        return date.toISOString();
    }

    private AddTask = (task: Task) => {
        if (this.tasks === null) {
            this.tasks = {};
        }

        if (this.tasks[task.taskList] === undefined){
            this.tasks[task.taskList] = [];
        }

        this.tasks[task.taskList] = [...this.tasks[task.taskList], task];
    }
}