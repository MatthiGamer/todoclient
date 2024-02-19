import React, { useEffect, useState } from "react";
import EventManager, { TASK_DONE_CHANGED_EVENT, TASK_IMPORTANCY_CHANGED_EVENT } from "../../Classes/EventManager";
import { TaskManager } from "../../Classes/TaskManager";
import { DONE_COLOR, SECONDARY_COLOR, STAR_COLOR } from "../../Colors";
import { Task } from "../../Types/TaskType";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import StarIconComponent from "../StarComponent/StarIconComponent";
import TaskDialogComponent from "../TaskDialogComponent/TaskDialogComponent";
import "./ListItemComponent.css";

interface ListItemComponentProps{
    key: string;
    id: string;
    task: Task;
    color?: string;
}

const LIST_ITEM_COMPONENT_COLOR = SECONDARY_COLOR;

const ListItemComponent: React.FC<ListItemComponentProps> = (props) => {

    const color = props.color === undefined ? LIST_ITEM_COMPONENT_COLOR : props.color;

    const [isImportant, setIsImportant] = useState<boolean>(props.task.isImportant);
    const [isDone, setIsDone] = useState<boolean>(props.task.isDone);
    const [isDialogVisible, setDialogVisibility] = useState<boolean>(false);

    const UpdateImportancy = () => setIsImportant(props.task.isImportant);
    const UpdateDone = () => setIsDone(props.task.isDone);

    const CheckForImportancy = (taskID: string) => {
        if (props.task.taskID !== taskID) return;
        UpdateImportancy();
    }

    const CheckForDone = (taskID: string) => {
        if (props.task.taskID !== taskID) return;
        UpdateDone();
    }

    useEffect(() => {
        EventManager.addListener(TASK_IMPORTANCY_CHANGED_EVENT, CheckForImportancy);
        EventManager.addListener(TASK_DONE_CHANGED_EVENT, CheckForDone);
    
        return () => {
            EventManager.removeListener(TASK_IMPORTANCY_CHANGED_EVENT, CheckForImportancy);
            EventManager.removeListener(TASK_DONE_CHANGED_EVENT, CheckForDone);
        }
    }, []);

    // Update local state when taskList changes
    useEffect(() => {
        UpdateImportancy();
        UpdateDone();
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
        setDialogVisibility(true);
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

            <TaskDialogComponent isVisible={isDialogVisible} task={props.task} setDialogVisibility={setDialogVisibility}/>
        </div>
    )
}

export default ListItemComponent;