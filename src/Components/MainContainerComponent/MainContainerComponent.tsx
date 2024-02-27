import React, { useEffect, useReducer, useRef, useState } from "react";
import { CalendarDateAppointmentTime } from "react-basicons";
import EventManager, { SYNCHRONIZE_ADDED_TASK_EVENT, SYNCHRONIZE_CHANGED_TASK_DONE_STATUS_EVENT, SYNCHRONIZE_CHANGED_TASK_IMPORTANCE_EVENT, SYNCHRONIZE_REMOVED_TASK_EVENT } from "../../Classes/EventManager";
import { TaskManager } from "../../Classes/TaskManager";
import { SECONDARY_COLOR } from "../../Colors";
import { Task } from "../../Types/TaskType";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import DividerComponent from "../DividerComponent/DividerComponent";
import DueDateDialogComponent from "../DueDateDialogComponent/DueDateDialogComponent";
import EmptyListComponent from "../EmptyListComponent/EmptyListComponent";
import EmptyMainContainerComponent from "../EmptyMainContainerComponent/EmptyMainContainerComponent";
import ListItemComponent from "../ListItemComponent/ListItemComponent";
import TitleComponent from "../TitleComponent/TitleComponent";
import "./MainContainerComponent.css";

interface MainContainerComponentProps{
    listName: string;
}

const MainContainerComponent: React.FC<MainContainerComponentProps> = (props) => {

    const [taskList, setTaskList] = useState<Task[] | undefined>(TaskManager.GetInstance().GetTasks());
    const [_, forceUpdate] = useReducer(x => x + 1, 0);

    const [isDateDialogVisible, setDateDialogVisibility] = useState<boolean>(false);

    const inputReference = useRef<HTMLInputElement>(null);

    const ResetInput = () => {
        if (!inputReference.current) return;
        inputReference.current.value = "";
        AutoFocusAddInput();
    }

    const UpdateTasks = () => {
        setTaskList(TaskManager.GetInstance().GetTasks());
    }

    const UpdateTaskListSort = () => {
        if (taskList === undefined) return;
        forceUpdate(); // Exception: Used for task sorting
    }

    const UpdateAll = () => {
        ResetInput();
        UpdateTasks();
    }

    useEffect(() => {
        EventManager.addListener(SYNCHRONIZE_ADDED_TASK_EVENT, UpdateTasks);
        EventManager.addListener(SYNCHRONIZE_REMOVED_TASK_EVENT, UpdateTasks);
        EventManager.addListener(SYNCHRONIZE_CHANGED_TASK_DONE_STATUS_EVENT, UpdateTaskListSort);
        EventManager.addListener(SYNCHRONIZE_CHANGED_TASK_IMPORTANCE_EVENT, UpdateTaskListSort);
        return () => {
            EventManager.removeListener(SYNCHRONIZE_ADDED_TASK_EVENT, UpdateTasks);
            EventManager.removeListener(SYNCHRONIZE_REMOVED_TASK_EVENT, UpdateTasks);
            EventManager.removeListener(SYNCHRONIZE_CHANGED_TASK_DONE_STATUS_EVENT, UpdateTaskListSort);
            EventManager.removeListener(SYNCHRONIZE_CHANGED_TASK_IMPORTANCE_EVENT, UpdateTaskListSort);
        }
    }, []);

    useEffect(() => {
        UpdateAll();
    }, [props.listName]);

    const AutoFocusAddInput = () => {
        if (!inputReference.current) return;
        inputReference.current.focus();
    }

    const HandleOnEnterKeyPress = (event: { key: string; }) => {
        if (event.key !== "Enter") return;
        if (!inputReference.current) return;
        TaskManager.GetInstance().CreateTask(inputReference.current.value);
        TaskManager.GetInstance().SetDueDate(undefined);
        UpdateAll();
    };

    const HandleOnDate = () => {
        setDateDialogVisibility(true);
    }

    AutoFocusAddInput();

    return (
        props.listName === "" ? <EmptyMainContainerComponent/> : 
        <>
            <TitleComponent title={props.listName} color={SECONDARY_COLOR}/>
            <DividerComponent color={SECONDARY_COLOR}/>

                {taskList === undefined ? <EmptyListComponent/> :
                    <div>
                        {taskList
                            .sort((a, b) => (b.isImportant ? 1 : 0) - (a.isImportant ? 1 : 0))
                            .sort((a, b) => (a.isDone ? 1 : 0) - (b.isDone ? 1 : 0))
                            .map( (item: Task) => {
                                return <ListItemComponent task={item} key={item.taskID} id={item.taskID}/>
                        })}
                    </div>
                }

            <div id="InputBorder">
                <input type="text" placeholder="New Task" id="NewTaskInput" onKeyDown={HandleOnEnterKeyPress} ref={inputReference}/>
                <ButtonComponent title={<CalendarDateAppointmentTime size={30} color={SECONDARY_COLOR}/>} id="SetDueDateButton" OnClick={HandleOnDate}/>
            </div>

            <DueDateDialogComponent isVisible={isDateDialogVisible} setVisibility={setDateDialogVisibility}/>
        </>
    )
};

export default MainContainerComponent;