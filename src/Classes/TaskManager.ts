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

    public SetTaskImportance = (taskID: string, isImportant: boolean) => {
        const task = this.GetTaskByID(taskID);
        if (task === undefined) return;
        
        task.isImportant = isImportant;
    }

    public SetTaskDone = (taskID: string, isDone: boolean) => {
        const task = this.GetTaskByID(taskID);
        if (task === undefined) return;
        
        task.isDone = isDone;
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

    public GetAllTasks = (): Task[] | undefined => {
        // Get all tasks
        // return list
        return undefined;
    }

    public GetTodayTasks = (): Task[] | undefined => {
        const allTasks: Task[] | undefined = this.GetAllTasks();
        // filter for dueDate == today
        // return list
        return undefined;
    }

    public GetImportantTasks = (): Task[] | undefined => {
        const allTasks: Task[] | undefined = this.GetAllTasks();
        // filter for isImportant == true
        // return list
        return undefined;
    }

    public CreateTask = (taskName: string) => {
        if (!this.currentList) return;

        const task: Task = {
            taskID: this.GenerateTaskID(),
            taskName: taskName,
            taskList: this.currentList,
            dueDateString: this.currentList === LIST_NAME_TODAY ? this.GetTodayDateString() : this.dueDateString,
            isImportant: this.currentList === LIST_NAME_IMPORTANT,
            isDone: false
        };

        this.AddTask(task);
        SendTask(task); // Comment out for debug
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
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        return date.toISOString();
    }

    private GetTaskByID = (taskID: string): Task | undefined => {
        if (this.tasks === null) return;
        if (this.currentList === null) return;
        if (this.tasks[this.currentList] === undefined) return;

        const tasks: Task[] = this.tasks[this.currentList];
        const foundTask = tasks.find((task: Task) => task.taskID === taskID);

        return foundTask;
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