import React from "react";
import "./ListComponent.css";

interface ListComponentProps{
    name: string;
    color?: string;
    setListName: (name: string) => void;
}

const ListComponent: React.FC<ListComponentProps> = (props) => {

    const HandleOnClick = () => {
        props.setListName(props.name);
    }

    return (
        <button style={{borderColor: props.color, color: props.color}} onClick={HandleOnClick}>{props.name}</button>
    )
}

export default ListComponent;