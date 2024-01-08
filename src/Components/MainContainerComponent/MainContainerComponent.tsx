import React, { useRef, useState } from "react";
import TitleComponent from "../TitleComponent/TitleComponent";
import DividerComponent from "../DividerComponent/DividerComponent";
import { SECONDARY_COLOR } from "../../Colors";
import EmptyMainContainerComponent from "../EmptyMainContainerComponent/EmptyMainContainerComponent";
import ListItemComponent from "../ListItemComponent/ListItemComponent";
import { ListItemType } from "../../ListItemType";
import EmptyListComponent from "../EmptyListComponent/EmptyListComponent";
import "./MainContainerComponent.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import {CalendarDateAppointmentTime} from "react-basicons";
import DueDateDialogComponent from "../DueDateDialogComponent/DueDateDialogComponent";

interface MainContainerComponentProps{
    listName: string;
    listItems?: ListItemType[];
}

const MainContainerComponent: React.FC<MainContainerComponentProps> = (props) => {

    const [isDateDialogVisible, setDateDialogVisibility] = useState<boolean>(false);

    const inputReference = useRef<HTMLInputElement>(null);

    const AutoFocusAddInput = () => {
        if (!inputReference.current) return;
        inputReference.current.focus();
    }

    const HandleOnEnterKeyPress = (event: { key: string; }) => {
        if (event.key !== "Enter") return;
        // Add new task
    };

    const HandleOnDate = () => {
        // Open SetDueDateDialog
        setDateDialogVisibility(true);
    }

    AutoFocusAddInput();

    return (
        props.listName === "" ? <EmptyMainContainerComponent/> : 
        <>
            <TitleComponent title={props.listName} color={SECONDARY_COLOR}/>
            <DividerComponent color={SECONDARY_COLOR}/>

            {props.listItems === undefined ? <EmptyListComponent/> :
                props.listItems?.map( item => {
                    <ListItemComponent title={item.listItemName} isImportant={item.listItemIsImportant}/>
                })
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