import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import TitleComponent from "../TitleComponent/TitleComponent";
import DividerComponent from "../DividerComponent/DividerComponent";
import { SECONDARY_COLOR } from "../../Colors";
import EmptyMainContainerComponent from "../EmptyMainContainerComponent/EmptyMainContainerComponent";
import EmptyListComponent from "../EmptyListComponent/EmptyListComponent";
import "./MainContainerComponent.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {CalendarDateAppointmentTime} from "react-basicons";
import DueDateDialogComponent from "../DueDateDialogComponent/DueDateDialogComponent";
import { TaskManager } from "../../Classes/TaskManager";
import { Task } from "../../Types/TaskType";
import ListItemComponent from "../ListItemComponent/ListItemComponent";

interface MainContainerComponentProps{
    listName: string;
}

const MainContainerComponent: React.FC<MainContainerComponentProps> = (props) => {

    const [taskList, setTaskList] = useState<Task[] | undefined>(TaskManager.GetInstance().GetTasks());

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

    const UpdateAll = () => {
        ResetInput();
        UpdateTasks();
    }

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