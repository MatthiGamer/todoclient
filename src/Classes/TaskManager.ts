import { SHA256 } from "crypto-js";
import { LIST_NAME_IMPORTANT, LIST_NAME_TASKS, LIST_NAME_TODAY } from "../Consts";
import { DateType } from "../Types/DateType";
import { Task } from "../Types/TaskType";
import EventManager, { SEND_ADDED_TASK_EVENT, SEND_CHANGED_TASK_DONE_STATUS_EVENT, SEND_CHANGED_TASK_IMPORTANCE_EVENT, SEND_REMOVED_TASK_EVENT, SYNCHRONIZE_ADDED_TASK_EVENT, SYNCHRONIZE_CHANGED_TASK_DONE_STATUS_EVENT, SYNCHRONIZE_CHANGED_TASK_IMPORTANCE_EVENT, SYNCHRONIZE_REMOVED_TASK_EVENT } from "./EventManager";
import { GetDateTypeFromDate, IsSameDate } from "./Utils";

export class TaskManager {
    // Singleton instance
    private static instance: TaskManager | null = null;

    private currentList: string | null = null;
    private dueDate: DateType | null | undefined = undefined;

    // TODO: save tasks in local storage
    private tasksDictionary: { [key: string]: Task[] } | null = null;
    private tasks: Task[] | null = null;
    
    // Hide default constructor
    private constructor() {}

    public static GetInstance(): TaskManager {
        if (!TaskManager.instance) {
            TaskManager.instance = new TaskManager();
        }

        return TaskManager.instance;
    }

    // ---------------- //
    // Property Methods //
    // ---------------- //

    public SetTasks = (tasks: Task[] | undefined) => {
        if (tasks === undefined) {
            this.tasks = [];
            return;
        }

        tasks.forEach(task => this.SynchronizeAddedTask(task));
    }

    public SetCurrentList = (listName: string | null) => {
        this.currentList = listName;
        this.SetDueDate(undefined);
    }

    public SetDueDate = (dueDate: DateType | undefined) => {
        this.dueDate = dueDate;
    }

    private GetTasksForCurrentList = (): Task[] | undefined => {
        if (this.tasksDictionary === null ||
            this.currentList === null ||
            this.tasksDictionary[this.currentList] === undefined) {
            return undefined;
        }

        return this.tasksDictionary[this.currentList];
    }

    public GetTasks = (): Task[] | undefined => {
        switch(this.currentList) {
            case LIST_NAME_TASKS:
                return this.GetAllTasks();
            case LIST_NAME_TODAY:
                return this.GetTodayTasks();
            case LIST_NAME_IMPORTANT:
                return this.GetImportantTasks();
            default:
                return this.GetTasksForCurrentList();
        }
    }

    private GetAllTasks = (): Task[] | undefined => {
        return (this.tasks === null || this.tasks.length == 0) ? undefined : this.tasks;
    }

    private GetTodayTasks = (): Task[] | undefined => {
        const allTasks: Task[] | undefined = this.GetAllTasks();
        if (!allTasks) return undefined;

        const today: DateType = this.GetTodayDate();
        const todayTasks: Task[] = allTasks.filter(task => IsSameDate(task.dueDate, today));
        return todayTasks.length === 0 ? undefined : todayTasks;
    }

    private GetImportantTasks = (): Task[] | undefined => {
        const allTasks: Task[] | undefined = this.GetAllTasks();
        if (!allTasks) return undefined;

        const importantTasks: Task[] = allTasks.filter(task => task.isImportant);
        return importantTasks.length === 0 ? undefined : importantTasks;
    }

    private GenerateTaskID = (): string => {
        const date = new Date();
        const uniqueString = date.toUTCString() + " " + date.getUTCMilliseconds();
        const hash = SHA256(uniqueString);
        const hashString = hash.toString();
        return this.GetTaskByID(hashString) === undefined ? hashString : this.GenerateTaskID();
    }

    private GetTodayDate = (): DateType => {
        const date: Date = new Date();
        return GetDateTypeFromDate(date);
    }

    private GetTaskByID = (taskID: string): Task | undefined => {
        if (this.tasks === null) return undefined;
        const foundTask = this.tasks.find((task: Task) => task.taskID === taskID);

        return foundTask;
    }

    // ------------------------------ //
    // Client Synchronisation Methods //
    // ------------------------------ //

    public SynchronizeAddedTask = (task: Task | undefined) => {
        if (task === undefined) return;
        if (this.GetTaskByID(task.taskID) !== undefined) return;

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

        EventManager.emit(SYNCHRONIZE_ADDED_TASK_EVENT, task);
    }

    public SynchronizeRemovedTask = (taskID: string) => {
        const task: Task | undefined = this.GetTaskByID(taskID);
        if (task === undefined) return;

        this.tasks = this.tasks!.filter((t) => t.taskID !== task.taskID);
        this.tasksDictionary![task.taskList] = this.tasksDictionary![task.taskList].filter((t) => t.taskID !== task.taskID);

        EventManager.emit(SYNCHRONIZE_REMOVED_TASK_EVENT, taskID);
    }

    public SynchronizeTaskDoneStatus = (taskID: string, isDone: boolean) => {
        const task = this.GetTaskByID(taskID);
        if (task === undefined) return;
        if (task.isDone === isDone) return;
        
        task.isDone = isDone;
        EventManager.emit(SYNCHRONIZE_CHANGED_TASK_DONE_STATUS_EVENT, taskID, isDone);
    }
    
    public SynchronizeTaskImportance = (taskID: string, isImportant: boolean) => {
        const task = this.GetTaskByID(taskID);
        if (task === undefined) return;
        if (task.isImportant === isImportant) return;
        
        task.isImportant = isImportant;
        EventManager.emit(SYNCHRONIZE_CHANGED_TASK_IMPORTANCE_EVENT, taskID, isImportant);

        // Changing importance adds or removes tasks from the "Important" list
        if (this.currentList === LIST_NAME_IMPORTANT) {
            EventManager.emit(isImportant ? SYNCHRONIZE_ADDED_TASK_EVENT : SYNCHRONIZE_REMOVED_TASK_EVENT);
        }
    }

    // --------------------- //
    // Origin Client Methods //
    // --------------------- //

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

        this.SynchronizeAddedTask(task);
        EventManager.emit(SEND_ADDED_TASK_EVENT, task);
    }
    
    public RemoveTask = (taskID: string) => {
        this.SynchronizeRemovedTask(taskID);
        EventManager.emit(SEND_REMOVED_TASK_EVENT, taskID);
    }

    public UpdateTaskImportance = (taskID: string, isImportant: boolean) => {
        this.SynchronizeTaskImportance(taskID, isImportant);
        EventManager.emit(SEND_CHANGED_TASK_IMPORTANCE_EVENT, taskID, isImportant);
    }

    public UpdateTaskDoneStatus = (taskID: string, isDone: boolean) => {
        this.SynchronizeTaskDoneStatus(taskID, isDone);
        EventManager.emit(SEND_CHANGED_TASK_DONE_STATUS_EVENT, taskID, isDone);
    }
}