import React from "react";
import { TaskManager } from "../../Classes/TaskManager";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

interface ListButtonComponentProps{
    title: string;
    color?: string;
    setListName: (title: string) => void;
}

const ListButtonComponent: React.FC<ListButtonComponentProps> = (props) => {

    const HandleOnClick = () => {
        props.setListName(props.title);
        TaskManager.GetInstance().SetCurrentList(props.title);
    }

    return(
        <ButtonComponent title={props.title} color={props.color} OnClick={HandleOnClick}/>
    )
}

export default ListButtonComponent;