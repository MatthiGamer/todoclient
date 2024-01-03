import React from "react";
import TitleComponent from "../TitleComponent/TitleComponent";
import DividerComponent from "../DividerComponent/DividerComponent";
import { SECONDARY_COLOR } from "../../Colors";
import EmptyMainContainerComponent from "../EmptyMainContainerComponent/EmptyMainContainerComponent";
import ListItemComponent from "../ListItemComponent/ListItemComponent";

interface MainContainerComponentProps{
    listName: string;
    listItems?: {itemName: string}[];
}

const MainContainerComponent: React.FC<MainContainerComponentProps> = (props) => {
    return (
        props.listName === "" ? <EmptyMainContainerComponent/> : 
        <>
            <TitleComponent title={props.listName} color={SECONDARY_COLOR}/>
            <DividerComponent color={SECONDARY_COLOR}/>
            {props.listItems?.map( item => {
                <ListItemComponent title={item.itemName}/>
            })}
        </>
    )
};

export default MainContainerComponent;