import { SendTask } from "../Components/SignalRComponent/SignalRComponent";
import { LIST_NAME_IMPORTANT, LIST_NAME_TODAY } from "../Consts";
import { DateType } from "../Types/DateType";
import { Task } from "../Types/TaskType";
import { SHA256 } from "crypto-js";
import { GetDateTypeFromDate } from "./Utils";

export class TaskManager {
    private static instance: TaskManager | null = null;

    public OnUpdate?: () => void;

    private currentList: string | null = null;
    private dueDate: DateType | null | undefined = undefined;

    private tasksDictionary: { [key: string]: Task[] } | null = null;
    private tasks: Task[] | null = null;
    
    private constructor() {}

    public static GetInstance(): TaskManager {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }

        return TaskManager.instance;
    }

    private InvokeOnUpdate = () => {
        if (!this.OnUpdate) return;
        this.OnUpdate();
    }

    public SetTasks = (tasks: Task[] | undefined) => {
        if (tasks === undefined) {
            this.tasks = [];
            return;
        }

        tasks.forEach(task => this.AddTask(task));
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
        this.SetDueDate(undefined);
    }

    public SetDueDate = (dueDate: DateType | undefined) => {
        this.dueDate = dueDate;
    }

    public AddTaskFromServer(task: Task | undefined) {
        if (task === undefined) return;
        if (this.GetTaskByID(task.taskID) !== undefined) return;
        this.AddTask(task);
    }

    public GetTasks = (): Task[] | undefined => {
        if (this.tasksDictionary === null ||
            this.currentList === null ||
            this.tasksDictionary[this.currentList] === undefined) {
            return undefined;
        }

        return this.tasksDictionary[this.currentList];
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
            dueDate: this.currentList === LIST_NAME_TODAY ? this.GetTodayDate() : this.dueDate === undefined ? null : this.dueDate,
            isImportant: this.currentList === LIST_NAME_IMPORTANT,
            isDone: false
        };

        this.AddTask(task);
        SendTask(task);
    }

    private GenerateTaskID = (): string => {
        const date = new Date();
        const uniqueString = date.toUTCString() + " " + date.getUTCMilliseconds();
        const hash = SHA256(uniqueString);
        return hash.toString();
    }

    private GetTodayDate = (): DateType => {
        const date: Date = new Date();
        return GetDateTypeFromDate(date);
    }

    private GetTaskByID = (taskID: string): Task | undefined => {
        if (this.tasksDictionary === null) return;
        if (this.currentList === null) return;
        if (this.tasksDictionary[this.currentList] === undefined) return;

        const tasks: Task[] = this.tasksDictionary[this.currentList];
        const foundTask = tasks.find((task: Task) => task.taskID === taskID);

        return foundTask;
    }

    private AddTask = (task: Task) => {
        if (this.tasksDictionary === null) {
            this.tasksDictionary = {};
        }

        if (this.tasks === null) {
            this.tasks = [];
        }

        if (this.tasksDictionary[task.taskList] === undefined){
            this.tasksDictionary[task.taskList] = [];
        }

        this.tasks = [...this.tasks, task];
        this.tasksDictionary[task.taskList] = [...this.tasksDictionary[task.taskList], task];
        this.InvokeOnUpdate();
    }
}