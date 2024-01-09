import { Task } from "../Types/TaskType";

export class TaskClass {

    private task: Task;

    public constructor(taskName: string, taskList: string, dueDateString?: string | null){
        this.task = {
            taskName,
            taskList,
            dueDateString: dueDateString,
        };
    }

    public GetTask(){
        return this.task;
    }
}