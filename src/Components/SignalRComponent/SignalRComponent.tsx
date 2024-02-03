import { useEffect } from "react";
import { HubConnectionBuilder, LogLevel, HttpTransportType, HubConnection, HubConnectionState } from "@microsoft/signalr";
import { Task } from "../../Types/TaskType";
import { TaskManager } from "../../Classes/TaskManager";
import EventManager, { TASK_ADDED_EVENT } from "../../Classes/EventManager";

var connection: HubConnection;

export const SendTask = (task: Task) => {
    if (connection.state !== HubConnectionState.Connected) {
        console.error("ConnectionError: Cannot send data if the connection is not in the 'Connected' State.\nStart the server and refresh this site to connect.");
        return; // Add Buffer Queue
    }

    connection.invoke("SaveTask", task.taskID, task.taskName, task.taskList, task.dueDate, task.isImportant, task.isDone)
    .catch(err => console.error("ConnectionError: ", err));
}

export const SaveTaskImportance = (taskID: string, isImportant: boolean) => {
    connection.invoke("SaveTaskImportance", taskID, isImportant)
    .catch(err => console.error("ConnectionError: ", err));
}

export const SaveTaskDone = (taskID: string, isDone: boolean) => {
    connection.invoke("SaveTaskDone", taskID, isDone)
    .catch(err => console.error("ConnectionError: ", err));
}

const GetTasks = async (): Promise<Task[] | undefined> => {
    return await connection.invoke<string>("GetTasks")
        .then((tasksString: string) => {
            const tasks: Task[] = JSON.parse(tasksString) as Task[];
            return tasks.length == 0 ? undefined : tasks;
        })
        .catch(error => {
            console.error("ConnectionError: ", error);
            return undefined;
        });
}

export const SignalRComponent = () => {

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
                TaskManager.GetInstance().SetTasks(await GetTasks());
                console.log("Tasks synchronized");
            })
            .catch(err => console.error("Error while establishing connection:", err));

        connection.on("ReceiveMessage", (user: string, message: string) => {
            console.log(`${user}: ${message}`);
        });

        connection.on("ReceiveInitialResponse", (responseMessage: string) => {
            console.log(`Initial response from ASP.NET: ${responseMessage}`);
        });

        connection.on("AddTask", (taskString: string) => {
            const task: Task = JSON.parse(taskString) as Task;
            TaskManager.GetInstance().AddTaskFromServer(task);
        });

        connection.on("ChangeTaskImportance", (taskID: string, isImportant: boolean) => {
            TaskManager.GetInstance().UpdateTaskImportance(taskID, isImportant);
        });
        
        connection.on("ChangeTaskDone", (taskID: string, isDone: boolean) => {
            TaskManager.GetInstance().UpdateTaskDone(taskID, isDone);
        });
        
        return () => {
            connection.stop();
        };
    }, []);

    return (
        <>
        </>
    );
};

export default SignalRComponent;