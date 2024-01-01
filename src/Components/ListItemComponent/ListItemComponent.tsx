import React from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import "./ListItemComponent.css";

interface ListItemComponentProps{
    title: string;
    color?: string;
    method?: () => void;
}

const ListItemComponent: React.FC<ListItemComponentProps> = (props) => {

    const HandleOnClick = () => {
        // Open Info Panel
    }

    return(
        <div id="ListItemContainer">
            <ButtonComponent title={props.title} color={props.color} OnClick={HandleOnClick}/>
            <button id="favStar" style={{borderColor: props.color, color: props.color}}>⭐</button>
        </div>
    )
}

export default ListItemComponent;