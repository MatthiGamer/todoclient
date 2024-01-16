import React from "react";
import { Task } from "../../Types/TaskType";

interface TaskButtonComponentProps {
    task: Task;
}

const TaskButtonComponent: React.FC<TaskButtonComponentProps> = (props) => {

    const HandleOnClick = () => {
        // Open Sidebar
    }

    return (
        <div onClick={HandleOnClick}>
            <p>{props.task.taskName}</p>
        </div>
    )
}

export default TaskButtonComponent;