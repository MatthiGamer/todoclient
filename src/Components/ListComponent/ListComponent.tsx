import React from "react";
import "./ListComponent.css";

interface ListComponentProps{
    color?: string;
}

const ListComponent: React.FC<ListComponentProps> = (props) => {
    return (
        <button style={{borderColor: props.color, color: props.color}}>Test</button>
    )
}

export default ListComponent;