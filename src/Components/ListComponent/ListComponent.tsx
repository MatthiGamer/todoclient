import React from "react";
import "./ListComponent.css";

interface ListComponentProps{
    name: string;
    color?: string;
}

const ListComponent: React.FC<ListComponentProps> = (props) => {
    return (
        <button style={{borderColor: props.color, color: props.color}}>{props.name}</button>
    )
}

export default ListComponent;