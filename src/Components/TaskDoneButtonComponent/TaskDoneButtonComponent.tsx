import React from "react";
import { TaskManager } from "../../Classes/TaskManager";
import { DONE_COLOR, SECONDARY_COLOR } from "../../Colors";
import "../../Styles/ClickableIcons.css";
import { Task } from "../../Types/TaskType";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

interface TaskDoneButtonComponentProps {
    task: Task;
    isDone: boolean;
    setIsDone: (isDone: boolean) => void;
    color?: string;
}

const TaskDoneButtonComponent: React.FC<TaskDoneButtonComponentProps> = (props) => {    
    const TEXT_COLOR = props.color? props.color : SECONDARY_COLOR;

    const HandleOnDone = () => {
        const newIsDone: boolean = !props.isDone;
        props.setIsDone(newIsDone);
        TaskManager.GetInstance().UpdateTaskDoneStatus(props.task.taskID, newIsDone);
    }

    return (
        <ButtonComponent
            title="✔"
            class="clickableIcon"
            color={TEXT_COLOR}
            backgroundColor={props.isDone ? DONE_COLOR : undefined}
            OnClick={HandleOnDone}
        />
    )
}

export default TaskDoneButtonComponent;