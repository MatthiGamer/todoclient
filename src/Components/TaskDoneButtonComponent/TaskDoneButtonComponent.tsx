import React, { useState } from "react";
import { TaskManager } from "../../Classes/TaskManager";
import { DONE_COLOR, SECONDARY_COLOR } from "../../Colors";
import "../../Styles/ClickableIcons.css";
import { Task } from "../../Types/TaskType";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

interface TaskDoneButtonComponentProps {
    task: Task;
    color?: string;
    doneColor?: string;
}

const TaskDoneButtonComponent: React.FC<TaskDoneButtonComponentProps> = (props) => {
    const [isDone, setIsDone] = useState<boolean>(props.task.isDone);
    
    const TEXT_COLOR = props.color? props.color : SECONDARY_COLOR;

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