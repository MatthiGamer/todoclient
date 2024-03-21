import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { useEffect } from "react";
import EventManager, { SEND_ADDED_TASK_EVENT, SEND_CHANGED_TASK_DONE_STATUS_EVENT, SEND_CHANGED_TASK_IMPORTANCE_EVENT, SEND_REMOVED_TASK_EVENT } from "../../Classes/EventManager";
import { Queue } from "../../Classes/Queue";
import { TaskManager } from "../../Classes/TaskManager";
import { TASK_BUFFER_QUEUE_KEY } from "../../Consts";
import { Task } from "../../Types/TaskType";

var connection: HubConnection;

const SignalRComponent = () => {
    
    // ----------------- //
    // Task Buffer Queue //
    // ----------------- //

    const taskBufferQueue: Queue<Task> = new Queue<Task>();
    const taskBufferQueueString: string | null = localStorage.getItem(TASK_BUFFER_QUEUE_KEY);
    const tasks: Task[] = taskBufferQueueString === null ? [] : JSON.parse(taskBufferQueueString) as Task[];
    if(tasks.length > 0) taskBufferQueue.enqueueArray(tasks);
    tasks.forEach(task => TaskManager.GetInstance().SynchronizeAddedTask(task));
    console.log("Tasks locally synchronized.");

    // ----------------------------- //
    // Connection and Server Methods //
    // ----------------------------- //

    useEffect(() => {
        connection = new HubConnectionBuilder()
                        .withUrl("http://localhost:5000/Tasks", { skipNegotiation: true, transport: HttpTransportType.WebSockets })
                        .configureLogging(LogLevel.Information)
                        .withStatefulReconnect()
                        .build();

        console.log("Trying to connect...");

        connection.start()
            .then(() => {
                console.log("Connection started!");
            })
            .then(async () => {
                await SynchronizeTasksOnConnect();
                console.log("Tasks synchronized.");
            })
            .catch((error) => {
                console.error(`Error while establishing connection:\n${error}`);
            });

        connection.on("ReceiveMessage", (user: string, message: string) => {
        console.log(`${user}: ${message}`);
        });

        connection.on("AddTask", (taskString: string) => {
            const task: Task = JSON.parse(taskString) as Task;
            TaskManager.GetInstance().SynchronizeAddedTask(task);
        });

        connection.on("ChangeTaskImportance", (taskID: string, isImportant: boolean) => {
            TaskManager.GetInstance().SynchronizeTaskImportance(taskID, isImportant);
        });
        
        connection.on("ChangeTaskDone", (taskID: string, isDone: boolean) => {
            TaskManager.GetInstance().SynchronizeTaskDoneStatus(taskID, isDone);
        });
        
        connection.on("DeleteTask", (taskID: string) => {
            TaskManager.GetInstance().SynchronizeRemovedTask(taskID);
        });
        
        return () => {
            connection.stop();
        };
    }, []);

    // ----------------- //
    // Component methods //
    // ----------------- //

    useEffect(() => {
        EventManager.addListener(SEND_ADDED_TASK_EVENT, SendTask);
        EventManager.addListener(SEND_REMOVED_TASK_EVENT, SendRemoveTask);
        EventManager.addListener(SEND_CHANGED_TASK_IMPORTANCE_EVENT, SendUpdatedTaskImportance);
        EventManager.addListener(SEND_CHANGED_TASK_DONE_STATUS_EVENT, SendUpdatedTaskDoneStatus);

        return (() => {
            EventManager.removeListener(SEND_ADDED_TASK_EVENT, SendTask);
            EventManager.removeListener(SEND_REMOVED_TASK_EVENT, SendRemoveTask);
            EventManager.removeListener(SEND_CHANGED_TASK_IMPORTANCE_EVENT, SendUpdatedTaskImportance);
            EventManager.removeListener(SEND_CHANGED_TASK_DONE_STATUS_EVENT, SendUpdatedTaskDoneStatus);
        })
    }, []);

    const GetTasks = async (): Promise<Task[] | undefined> => {
        return await connection!.invoke<string>("GetTasks")
            .then((tasksString: string) => {
                const tasks: Task[] = JSON.parse(tasksString) as Task[];
                return tasks.length == 0 ? undefined : tasks;
            })
            .catch(error => {
                console.error("ConnectionError: ", error);
                return undefined;
            });
    }

    const SynchronizeTasksOnConnect = async () => {
        TaskManager.GetInstance().SetTasks(await GetTasks());
        if (taskBufferQueue.isEmpty()) return;
        while (!taskBufferQueue.isEmpty()) {
            const task: Task | undefined = taskBufferQueue.dequeue();
            if (task === undefined) continue;
            TaskManager.GetInstance().SynchronizeAddedTask(task);
            SendTask(task);
        }
    }

    const EnqueueTaskToBufferQueue = (task: Task) => {
        taskBufferQueue.enqueue(task);
        try {
            localStorage.setItem(TASK_BUFFER_QUEUE_KEY, JSON.stringify(taskBufferQueue.toArray()));
            console.log("Task saved locally.");
        } catch (error) {
            console.error(`LocalSavingError: Task couldn't be saved to the queue.\nQuotaExceededError: ${error}`);
        }
    }

    // -------------- //
    // Client Methods //
    // -------------- //

    const SendTask = (task: Task) => {
        if (connection.state !== HubConnectionState.Connected) {
            console.error("ConnectionError: Cannot send data if the connection is not in the 'Connected' State.\nStart the server and refresh this site to connect.");
            EnqueueTaskToBufferQueue(task);
            return;
        }
        
        connection.invoke("SaveTask", task.taskID, task.taskName, task.taskList, JSON.stringify(task.dueDate), task.isImportant, task.isDone)
        .catch(err => console.error("ConnectionError: ", err));
    }
    
    const SendRemoveTask = (taskID: string) => {
        connection.invoke("DeleteTask", taskID)
        .catch(err => console.error("ConnectionError: ", err));
    }

    const SendUpdatedTaskDoneStatus = (taskID: string, isDone: boolean) => {
        connection.invoke("SaveTaskDone", taskID, isDone)
        .catch(err => console.error("ConnectionError: ", err));
    }
    
    const SendUpdatedTaskImportance = (taskID: string, isImportant: boolean) => {
        connection.invoke("SaveTaskImportance", taskID, isImportant)
        .catch(err => console.error("ConnectionError: ", err));
    }
    
    return (
        <>
        </>
    );
};

export default SignalRComponent;