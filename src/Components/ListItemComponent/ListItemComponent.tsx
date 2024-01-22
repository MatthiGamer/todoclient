import React, { useEffect, useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./ListItemComponent.css";
import { Task } from "../../Types/TaskType";
import { TaskManager } from "../../Classes/TaskManager";

interface ListItemComponentProps{
    key: string;
    id: string;
    task: Task;
    color?: string;
    //method?: () => void; // =>  Open Info Panel
}

const ListItemComponent: React.FC<ListItemComponentProps> = (props) => {

    const [isImportant, setIsImportant] = useState<boolean>(props.task.isImportant);
    const [isDone, setIsDone] = useState<boolean>(props.task.isDone);

    // Update local state when taskList changes
    useEffect(() => {
        setIsImportant(props.task.isImportant);
        setIsDone(props.task.isDone);
    }, [props.id]);

    const HandleOnImportant = () => {
        const newIsImportant: boolean = !isImportant;
        setIsImportant(newIsImportant);
        TaskManager.GetInstance().SetTaskImportance(props.task.taskID, newIsImportant);
    }

    const HandleOnDone = () => {
        const newIsDone: boolean = !isDone;
        setIsDone(newIsDone);
        TaskManager.GetInstance().SetTaskImportance(props.task.taskID, newIsDone);
    }

    const HandleOnClick = () => {
        // Open Info Panel
    }

    return(
        <div id="ListItemContainer">
            <ButtonComponent
                title={isDone ? "✔" : ""}
                class="clickableIcon"
                color={props.color}
                OnClick={HandleOnDone}
            />

            <ButtonComponent
                title={isDone ? <s>{props.task.taskName}</s> : <b>{props.task.taskName}</b>}
                color={props.color}
                OnClick={HandleOnClick}
            />

            <ButtonComponent
                title={isImportant ? "⭐" : ""}
                class="clickableIcon"
                color={props.color}
                OnClick={HandleOnImportant}
            />
        </div>
    )
}

export default ListItemComponent;