import { SHA256 } from "crypto-js";
import { SaveTaskDone, SaveTaskImportance, SendTask } from "../Components/SignalRComponent/SignalRComponent";
import { LIST_NAME_IMPORTANT, LIST_NAME_TASKS, LIST_NAME_TODAY } from "../Consts";
import { DateType } from "../Types/DateType";
import { Task } from "../Types/TaskType";
import EventManager, { TASK_ADDED_EVENT, TASK_DONE_CHANGED_EVENT, TASK_IMPORTANCY_CHANGED_EVENT } from "./EventManager";
import { GetDateTypeFromDate, IsSameDate } from "./Utils";

export class TaskManager {
    private static instance: TaskManager | null = null;

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

    public SetTasks = (tasks: Task[] | undefined) => {
        if (tasks === undefined) {
            this.tasks = [];
            return;
        }

        tasks.forEach(task => this.AddTask(task));
    }

    public UpdateTaskImportance = (taskID: string, isImportant: boolean) => {
        const task = this.GetTaskByID(taskID);
        if (task === undefined) return;
        if (task.isImportant === isImportant) return;
        
        task.isImportant = isImportant;
        EventManager.emit(TASK_IMPORTANCY_CHANGED_EVENT, taskID);
    }

    public SetTaskImportance = (taskID: string, isImportant: boolean) => {
        this.UpdateTaskImportance(taskID, isImportant);
        SaveTaskImportance(taskID, isImportant);
    }

    public UpdateTaskDone = (taskID: string, isDone: boolean) => {
        const task = this.GetTaskByID(taskID);
        if (task === undefined) return;
        if (task.isDone === isDone) return;
        
        task.isDone = isDone;
        EventManager.emit(TASK_DONE_CHANGED_EVENT, taskID);
    }

    public SetTaskDone = (taskID: string, isDone: boolean) => {
        this.UpdateTaskDone(taskID, isDone);
        SaveTaskDone(taskID, isDone);
    }

    public SetCurrentList = (listName: string | null) => {
        this.currentList = listName;
        this.SetDueDate(undefined);
    }

    public SetDueDate = (dueDate: DateType | undefined) => {
        this.dueDate = dueDate;
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
        return this.tasks === null ? undefined : this.tasks;
    }

    public GetTodayTasks = (): Task[] | undefined => {
        const allTasks: Task[] | undefined = this.GetAllTasks();
        if (!allTasks) return undefined;

        const today: DateType = this.GetTodayDate();
        const todayTasks: Task[] = allTasks.filter(task => IsSameDate(task.dueDate, today));
        return todayTasks.length === 0 ? undefined : todayTasks;
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
            taskList:
                this.currentList === LIST_NAME_TODAY ? LIST_NAME_TASKS :
                this.currentList === LIST_NAME_IMPORTANT ? LIST_NAME_TASKS :
                this.currentList,
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
        if (this.tasks === null) return;
        const foundTask = this.tasks.find((task: Task) => task.taskID === taskID);

        return foundTask;
    }

    public AddTaskFromServer(task: Task | undefined) {
        if (task === undefined) return;
        if (this.GetTaskByID(task.taskID) !== undefined) {
            console.log("Task exists.");
            return;
        }
        this.AddTask(task);
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

        EventManager.emit(TASK_ADDED_EVENT);
    }
}