import React, { useEffect, useState } from "react";
import EventManager, { TASK_IMPORTANCY_CHANGED_EVENT } from "../../Classes/EventManager";
import { TaskManager } from "../../Classes/TaskManager";
import { SECONDARY_COLOR, STAR_COLOR } from "../../Colors";
import "../../Styles/ClickableIcons.css";
import { Task } from "../../Types/TaskType";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import StarIconComponent from "../StarComponent/StarIconComponent";
import "./TaskImportanceButtonComponent.css";

interface TaskImportanceButtonComponentProps {
    task: Task;
    color?: string;
}

const TaskImportanceButtonComponent: React.FC<TaskImportanceButtonComponentProps> = (props) => {
    const [isImportant, setIsImportant] = useState<boolean>(props.task.isImportant);
    
    const TEXT_COLOR = props.color? props.color : SECONDARY_COLOR;

    // Used for client synchronisation
    useEffect(() => {
        EventManager.addListener(TASK_IMPORTANCY_CHANGED_EVENT, UpdateImportance);
        return () => {
            EventManager.removeListener(TASK_IMPORTANCY_CHANGED_EVENT, UpdateImportance);
        }
    }, []);

    // Used for client synchronisation
    const UpdateImportance = (taskID: string) => {
        if (props.task.taskID !== taskID) return;
        setIsImportant(props.task.isImportant);
    }

    const HandleOnImportant = () => {
        const newIsImportant: boolean = !isImportant;
        setIsImportant(newIsImportant);
        TaskManager.GetInstance().SetTaskImportance(props.task.taskID, newIsImportant);
    }

    return (
        <ButtonComponent
                title={
                    <div id="StarContainer">
                        <StarIconComponent color={TEXT_COLOR} fillColor={isImportant ? STAR_COLOR : "none"} weight={2}/>
                    </div>}
                class="clickableIcon"
                color={TEXT_COLOR}
                OnClick={HandleOnImportant}
            />
    )
}

export default TaskImportanceButtonComponent;