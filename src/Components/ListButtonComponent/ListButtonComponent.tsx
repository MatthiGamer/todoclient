import React from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { TaskManager } from "../../Classes/TaskManager";

interface ListButtonComponentProps{
    title: string;
    color?: string;
    setListName?: (title: string) => void;
}

const ListButtonComponent: React.FC<ListButtonComponentProps> = (props) => {

    const HandleOnClick = () => {
        if (props.setListName == undefined) return;
        props.setListName(props.title);
        TaskManager.GetInstance().SetCurrentList(props.title);
    }

    return(
        <ButtonComponent title={props.title} color={props.color} OnClick={HandleOnClick}/>
    )
}

export default ListButtonComponent;