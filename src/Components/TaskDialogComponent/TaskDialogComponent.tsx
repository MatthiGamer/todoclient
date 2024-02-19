import React from "react";
import { SECONDARY_COLOR } from "../../Colors";
import { Task } from "../../Types/TaskType";
import CustomDialogComponent from "../CustomDialogComponent/CustomDialogComponent";

interface TaskDialogComponentProps {
    isVisible: boolean;
    task: Task;
    setDialogVisibility: (isVisible: boolean) => void;
}

const TaskDialogComponent: React.FC<TaskDialogComponentProps> = (props) => {
    return (
        !props.isVisible ? <></> :
        <CustomDialogComponent
        header={props.task.taskName}
        isVisible={true}
        color={SECONDARY_COLOR}
        setDialogVisibility={props.setDialogVisibility}>
            <></>
        </CustomDialogComponent>
    )
}

export default TaskDialogComponent;