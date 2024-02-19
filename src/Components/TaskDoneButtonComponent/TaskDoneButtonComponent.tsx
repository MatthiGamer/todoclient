import React, { useEffect, useState } from "react";
import EventManager, { TASK_DONE_CHANGED_EVENT } from "../../Classes/EventManager";
import { TaskManager } from "../../Classes/TaskManager";
import { DONE_COLOR, SECONDARY_COLOR } from "../../Colors";
import "../../Styles/ClickableIcons.css";
import { Task } from "../../Types/TaskType";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

interface TaskDoneButtonComponentProps {
    task: Task;
    color?: string;
}

const TaskDoneButtonComponent: React.FC<TaskDoneButtonComponentProps> = (props) => {
    const [isDone, setIsDone] = useState<boolean>(props.task.isDone);
    
    const TEXT_COLOR = props.color? props.color : SECONDARY_COLOR;

    // Used for client synchronisation
    useEffect(() => {
        EventManager.addListener(TASK_DONE_CHANGED_EVENT, UpdateDone);
        return () => {
            EventManager.removeListener(TASK_DONE_CHANGED_EVENT, UpdateDone);
        }
    }, []);

    // Used for client synchronisation
    const UpdateDone = (taskID: string) => {
        if (props.task.taskID !== taskID) return;
        setIsDone(props.task.isDone);
    }

    const HandleOnDone = () => {
        const newIsDone: boolean = !isDone;
        setIsDone(newIsDone);
        TaskManager.GetInstance().SetTaskDone(props.task.taskID, newIsDone);
    }

    return (
        <ButtonComponent
            title="✔"
            class="clickableIcon"
            color={TEXT_COLOR}
            backgroundColor={isDone ? DONE_COLOR : undefined}
            OnClick={HandleOnDone}
        />
    )
}

export default TaskDoneButtonComponent;