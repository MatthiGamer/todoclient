import React, { useEffect, useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./ListItemComponent.css";
import { Task } from "../../Types/TaskType";
import { TaskManager } from "../../Classes/TaskManager";

interface ListItemComponentProps{
    key: string;
    id: string;
    task: Task;
    color?: string;
    //method?: () => void; // =>  Open Info Panel
}

const ListItemComponent: React.FC<ListItemComponentProps> = (props) => {

    const [isImportant, setIsImportant] = useState<boolean>(props.task.isImportant);

    // Update local state when taskList changes
    useEffect(() => {
        setIsImportant(props.task.isImportant);
    }, [props.id]);

    const HandleOnClickStar = () => {
        const newIsImportant: boolean = !isImportant;
        setIsImportant(newIsImportant);
        TaskManager.GetInstance().SetTaskImportance(props.task.taskID, newIsImportant);
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