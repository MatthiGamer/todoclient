import React, { useState } from "react";
import { SECONDARY_COLOR } from "../../Colors";
import { Task } from "../../Types/TaskType";
import CustomDialogComponent from "../CustomDialogComponent/CustomDialogComponent";
import TaskDeleteButtonComponent from "../TaskDeleteButtonComponent/TaskDeleteButtonComponent";
import TaskDoneButtonComponent from "../TaskDoneButtonComponent/TaskDoneButtonComponent";
import TaskImportanceButtonComponent from "../TaskImportanceButtonComponent/TaskImportanceButtonComponent";
import "./TaskDialogComponent.css";

interface TaskDialogComponentProps {
    isVisible: boolean;
    task: Task;
    setDialogVisibility: (isVisible: boolean) => void;
}

const TaskDialogComponent: React.FC<TaskDialogComponentProps> = (props) => {

    const [isDone, setIsDone] = useState(props.task.isDone);
    const [isImportant, setIsImportant] = useState(props.task.isImportant);

    const GetNewNumberString = (num: number): string => {
        return num < 10 ? `0${num}` : num.toString();
    }

    const GetDateString = ():string | undefined => {
        if (props.task.dueDate === null || props.task.dueDate === undefined) return undefined;

        const dayString = GetNewNumberString(props.task.dueDate!.day);
        const monthString = GetNewNumberString(props.task.dueDate!.month);
        const yearString = GetNewNumberString(props.task.dueDate!.year);

        return `${monthString}/${dayString}/${yearString}`;
    }

    const dateString: string = GetDateString() === undefined ? "No due date" : GetDateString()!;

    return (
        !props.isVisible ? <></> :
        <CustomDialogComponent
        header={props.task.taskName}
        isVisible={true}
        color={SECONDARY_COLOR}
        setDialogVisibility={props.setDialogVisibility}
        cancelButtonName="Back">
            <label className="TaskDialogLabel TaskDialogHeadingLabel">Task list:</label>
            <label className="TaskDialogLabel TaskDialogSubLabel">{props.task.taskList}</label>
            <br/>

            <label className="TaskDialogLabel TaskDialogHeadingLabel">Due date:</label>
            <label className="TaskDialogLabel TaskDialogSubLabel">{dateString}</label>
            <br/>

            <label className="TaskDialogLabel TaskDialogHeadingLabel">Task Controls:</label>
            <div style={{display: "flex"}}>
                <TaskDoneButtonComponent task={props.task} isDone={isDone} setIsDone={setIsDone}/>
                <TaskImportanceButtonComponent task={props.task} isImportant={isImportant} setIsImportant={setIsImportant}/>
                <TaskDeleteButtonComponent taskID={props.task.taskID}/>
            </div>
            <br/>

            <label className="TaskDialogLabel TaskDialogHeadingLabel">Notes:</label>
            <textarea id="TaskNotesArea"/>
        </CustomDialogComponent>
    )
}

export default TaskDialogComponent;