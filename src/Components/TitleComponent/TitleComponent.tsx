import React from "react";
import "./TitleComponent.css";

interface TitleComponentProps{
    title: string;
    color?: string;
}

const TitleComponent: React.FC<TitleComponentProps> = (props) => {
    return (
        <div className="titleContainer">
            <h1 style={{color: props.color}}>{props.title}</h1>
        </div>
    )
}

export default TitleComponent;