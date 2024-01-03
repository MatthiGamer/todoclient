import React, { useState } from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./ListItemComponent.css";

interface ListItemComponentProps{
    title: string;
    isImportant: boolean;
    color?: string;
    //method?: () => void; // =>  Open Info Panel
}

const ListItemComponent: React.FC<ListItemComponentProps> = (props) => {

    const [isImportant, setIsImportant] = useState<boolean>(props.isImportant);

    const HandleOnClickStar = () => {
        setIsImportant(!isImportant);
    }

    const HandleOnClick = () => {
        // Open Info Panel
    }

    return(
        <div id="ListItemContainer">
            <ButtonComponent title={props.title} color={props.color} OnClick={HandleOnClick}/>
            <button
                id="favStar"
                style={{borderColor: props.color, color: props.color}}
                onClick={HandleOnClickStar}>{isImportant ? "⭐" : ""}
            </button>
        </div>
    )
}

export default ListItemComponent;