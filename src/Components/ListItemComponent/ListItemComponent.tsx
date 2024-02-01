import React, { useEffect, useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./ListItemComponent.css";
import { Task } from "../../Types/TaskType";
import { TaskManager } from "../../Classes/TaskManager";
import { DONE_COLOR, SECONDARY_COLOR, STAR_COLOR } from "../../Colors";
import StarIconComponent from "../StarComponent/StarIconComponent";

interface ListItemComponentProps{
    key: string;
    id: string;
    task: Task;
    color?: string;
    //method?: () => void; // =>  Open Info Panel
}

const LIST_ITEM_COMPONENT_COLOR = SECONDARY_COLOR;

const ListItemComponent: React.FC<ListItemComponentProps> = (props) => {

    const color = props.color === undefined ? LIST_ITEM_COMPONENT_COLOR : props.color;
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
        TaskManager.GetInstance().SetTaskDone(props.task.taskID, newIsDone);
    }

    const HandleOnClick = () => {
        // Open Info Panel
    }

    return(
        <div id="ListItemContainer">
            <ButtonComponent
                title="✔"
                class="clickableIcon"
                color={color}
                backgroundColor={isDone ? DONE_COLOR : undefined}
                OnClick={HandleOnDone}
            />

            <ButtonComponent
                title={isDone ? <s>{props.task.taskName}</s> : <b>{props.task.taskName}</b>}
                color={color}
                OnClick={HandleOnClick}
            />

            <ButtonComponent
                title={
                    <div id="StarContainer">
                        <StarIconComponent color={color} fillColor={isImportant ? STAR_COLOR : "none"} weight={2}/>
                    </div>}
                class="clickableIcon"
                color={color}
                OnClick={HandleOnImportant}
            />
        </div>
    )
}

export default ListItemComponent;