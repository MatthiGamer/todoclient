import React from "react";
import "./TitleComponent.css";

interface TitleProps{
    title: string;
}

const TitleComponent: React.FC<TitleProps> = (props) => {
    return (
        <div className="titleContainer">
            <h1>{props.title}</h1>
        </div>
    )
}

export default TitleComponent;