import React, { useEffect } from 'react';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';

const SignalRComponent = () => {
    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl("http://localhost:5000/Tasks", { skipNegotiation: true, transport: HttpTransportType.WebSockets })
            .configureLogging(LogLevel.Information)
            .withStatefulReconnect()
            .build();

        console.log("Trying to connect...");

        connection.start()
            .then(() => {
                console.log('Connection started!');
                
                // Call the SendInitialMessage method on the server
                connection.invoke("SendInitialMessage", "Hello from React!");
            })
            .catch(err => console.error('Error while establishing connection:', err));

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