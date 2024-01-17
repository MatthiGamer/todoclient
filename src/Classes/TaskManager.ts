import { SendTask } from "../Components/SignalRComponent/SignalRComponent";
import { LIST_NAME_IMPORTANT } from "../Consts";
import { Task } from "../Types/TaskType";

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
        const task: Task = {taskName: taskName, taskList: this.currentList, dueDateString: this.dueDateString, isImportant: this.currentList === LIST_NAME_IMPORTANT};
        this.AddTask(task);
        // SendTask(task); // Comment out for debug
        console.log("Task added.");
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