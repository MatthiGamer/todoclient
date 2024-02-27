import React from "react";
import { TaskManager } from "../../Classes/TaskManager";
import { SECONDARY_COLOR } from "../../Colors";
import "../../Styles/ClickableIcons.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

interface TaskDeleteButtonComponentProps {
    taskID: string;
}

const TaskDeleteButtonComponent: React.FC<TaskDeleteButtonComponentProps> = (props) => {

    const HandleOnDelete = () => {
        TaskManager.GetInstance().RemoveTask(props.taskID);
    }

    return (
        <ButtonComponent
            title="🗑"
            class="clickableIcon"
            color={SECONDARY_COLOR}
            backgroundColor={undefined}
            OnClick={HandleOnDelete}
        />
    )
}

export default TaskDeleteButtonComponent;