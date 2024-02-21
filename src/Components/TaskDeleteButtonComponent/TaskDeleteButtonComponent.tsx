import React from "react";
import { SECONDARY_COLOR } from "../../Colors";
import "../../Styles/ClickableIcons.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { SendTaskDelete } from "../SignalRComponent/SignalRComponent";

interface TaskDeleteButtonComponentProps {
    taskID: string;
}

const TaskDeleteButtonComponent: React.FC<TaskDeleteButtonComponentProps> = (props) => {

    const HandleOnDelete = () => {
        SendTaskDelete(props.taskID);
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