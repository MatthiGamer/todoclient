import React, { useEffect, useRef, useState } from "react";
import { CalendarDateAppointmentTime } from "react-basicons";
import EventManager, { TASK_ADDED_EVENT } from "../../Classes/EventManager";
import { TaskManager } from "../../Classes/TaskManager";
import { SECONDARY_COLOR } from "../../Colors";
import { LIST_NAME_IMPORTANT, LIST_NAME_TASKS, LIST_NAME_TODAY } from "../../Consts";
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

    const [taskList, setTaskList] = useState<Task[] | undefined>(() => {
        switch(props.listName) {
            case LIST_NAME_TASKS:
                return TaskManager.GetInstance().GetAllTasks();
            case LIST_NAME_TODAY:
                return TaskManager.GetInstance().GetTodayTasks();
            case LIST_NAME_IMPORTANT:
                return TaskManager.GetInstance().GetImportantTasks();
            default:
                return TaskManager.GetInstance().GetTasks();
        }
    });

    const [isDateDialogVisible, setDateDialogVisibility] = useState<boolean>(false);

    const inputReference = useRef<HTMLInputElement>(null);

    const ResetInput = () => {
        if (!inputReference.current) return;
        inputReference.current.value = "";
        AutoFocusAddInput();
    }

    const UpdateTasks = async () => {
        await setTaskList(() => {
            switch(props.listName) {
                case LIST_NAME_TASKS:
                    return TaskManager.GetInstance().GetAllTasks();
                case LIST_NAME_TODAY:
                    return TaskManager.GetInstance().GetTodayTasks();
                case LIST_NAME_IMPORTANT:
                    return TaskManager.GetInstance().GetImportantTasks();
                default:
                    return TaskManager.GetInstance().GetTasks();
            }
        });
    }

    const UpdateAll = () => {
        ResetInput();
        UpdateTasks();
    }

    useEffect(() => {
        EventManager.addListener(TASK_ADDED_EVENT, UpdateTasks);
        return () => {
            EventManager.removeListener(TASK_ADDED_EVENT, UpdateTasks);
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
                        {taskList.map( (item: Task) => {
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