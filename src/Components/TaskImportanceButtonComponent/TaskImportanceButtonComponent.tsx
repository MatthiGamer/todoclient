import React from "react";
import { TaskManager } from "../../Classes/TaskManager";
import { SECONDARY_COLOR, STAR_COLOR } from "../../Colors";
import "../../Styles/ClickableIcons.css";
import { Task } from "../../Types/TaskType";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import StarIconComponent from "../StarComponent/StarIconComponent";
import "./TaskImportanceButtonComponent.css";

interface TaskImportanceButtonComponentProps {
    task: Task;
    isImportant: boolean;
    setIsImportant: (isImportant: boolean) => void;
    color?: string;
}

const TaskImportanceButtonComponent: React.FC<TaskImportanceButtonComponentProps> = (props) => {
    
    const TEXT_COLOR = props.color? props.color : SECONDARY_COLOR;

    const HandleOnImportant = () => {
        const newIsImportant: boolean = !props.isImportant;
        props.setIsImportant(newIsImportant);
        TaskManager.GetInstance().SetTaskImportance(props.task.taskID, newIsImportant);
    }

    return (
        <ButtonComponent
                title={
                    <div id="StarContainer">
                        <StarIconComponent color={TEXT_COLOR} fillColor={props.isImportant ? STAR_COLOR : "none"} weight={2}/>
                    </div>}
                class="clickableIcon"
                color={TEXT_COLOR}
                OnClick={HandleOnImportant}
            />
    )
}

export default TaskImportanceButtonComponent;