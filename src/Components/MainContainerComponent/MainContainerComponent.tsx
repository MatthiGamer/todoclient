import React, { useRef } from "react";
import TitleComponent from "../TitleComponent/TitleComponent";
import DividerComponent from "../DividerComponent/DividerComponent";
import { SECONDARY_COLOR } from "../../Colors";
import EmptyMainContainerComponent from "../EmptyMainContainerComponent/EmptyMainContainerComponent";
import ListItemComponent from "../ListItemComponent/ListItemComponent";
import { ListItemType } from "../../ListItemType";
import EmptyListComponent from "../EmptyListComponent/EmptyListComponent";
import "./MainContainerComponent.css";

interface MainContainerComponentProps{
    listName: string;
    listItems?: ListItemType[];
}

const MainContainerComponent: React.FC<MainContainerComponentProps> = (props) => {

    const inputReference = useRef<HTMLInputElement>(null);

    const AutoFocusAddInput = () => {
        if (!inputReference.current) return;
        inputReference.current.focus();
    }

    const HandleOnEnterKeyPress = (event: { key: string; }) => {
        if (event.key !== "Enter") return;
        // Add new task
      };

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
            </div>
        </>
    )
};

export default MainContainerComponent;