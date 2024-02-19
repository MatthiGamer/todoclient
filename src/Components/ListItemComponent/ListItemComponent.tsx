import React, { useEffect, useState } from "react";
import EventManager, { TASK_DONE_CHANGED_EVENT } from "../../Classes/EventManager";
import { SECONDARY_COLOR } from "../../Colors";
import "../../Styles/ClickableIcons.css";
import { Task } from "../../Types/TaskType";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import TaskDialogComponent from "../TaskDialogComponent/TaskDialogComponent";
import TaskDoneButtonComponent from "../TaskDoneButtonComponent/TaskDoneButtonComponent";
import TaskImportanceButtonComponent from "../TaskImportanceButtonComponent/TaskImportanceButtonComponent";
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

    const [isDone, setIsDone] = useState<boolean>(props.task.isDone);
    const [isDialogVisible, setDialogVisibility] = useState<boolean>(false);

    const CheckForDone = (taskID: string) => {
        if (props.task.taskID !== taskID) return;
        setIsDone(props.task.isDone);
    }

    useEffect(() => {
        EventManager.addListener(TASK_DONE_CHANGED_EVENT, CheckForDone);
    
        return () => {
            EventManager.removeListener(TASK_DONE_CHANGED_EVENT, CheckForDone);
        }
    }, []);

    const HandleOnClick = () => {
        setDialogVisibility(true);
    }

    return(
        <div id="ListItemContainer">
            <TaskDoneButtonComponent task={props.task}/>

            <ButtonComponent
                title={isDone ? <s>{props.task.taskName}</s> : <b>{props.task.taskName}</b>}
                color={color}
                OnClick={HandleOnClick}
            />

            <TaskImportanceButtonComponent task={props.task}/>

            <TaskDialogComponent isVisible={isDialogVisible} task={props.task} setDialogVisibility={setDialogVisibility}/>
        </div>
    )
}

export default ListItemComponent;