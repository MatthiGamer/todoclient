import { useEffect } from "react";
import { HubConnectionBuilder, LogLevel, HttpTransportType, HubConnection, HubConnectionState } from "@microsoft/signalr";
import { Task } from "../../Types/TaskType";

var connection: HubConnection;

export const SendTask = (task: Task) => {
    if (connection.state !== HubConnectionState.Connected) {
        console.error("ConnectionError: Cannot send data if the connection is not in the 'Connected' State.\nStart the server and refresh this site to connect.");
        return; // Add Buffer Queue
    }

    connection.invoke("ReceiveTask", task.taskID, task.taskName, task.taskList, task.dueDateString, task.isImportant, task.isDone)
    .catch(err => console.error("ConnectionError: ", err));
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
            .catch(err => console.error("Error while establishing connection:", err));

        connection.on("ReceiveMessage", (user: string, message: string) => {
            console.log(`${user}: ${message}`);
        });

        connection.on("ReceiveInitialResponse", (responseMessage: string) => {
            console.log(`Initial response from ASP.NET: ${responseMessage}`);
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