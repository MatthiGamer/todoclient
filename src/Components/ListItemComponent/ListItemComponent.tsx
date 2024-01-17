import React, { useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./ListItemComponent.css";
import { Task } from "../../Types/TaskType";

interface ListItemComponentProps{
    task: Task;
    color?: string;
    //method?: () => void; // =>  Open Info Panel
}

const ListItemComponent: React.FC<ListItemComponentProps> = (props) => {

    const [isImportant, setIsImportant] = useState<boolean>(props.task.isImportant);

    const HandleOnClickStar = () => {
        setIsImportant(!isImportant);
    }

    const HandleOnClick = () => {
        // Open Info Panel
    }

    return(
        <div id="ListItemContainer">
            <ButtonComponent title={props.task.taskName} color={props.color} OnClick={HandleOnClick}/>
            <button
                id="favStar"
                style={{borderColor: props.color, color: props.color}}
                onClick={HandleOnClickStar}>{isImportant ? "⭐" : ""}
            </button>
        </div>
    )
}

export default ListItemComponent;