import React from "react";
import "./TitleComponent.css";

interface TitleComponentProps{
    title: string;
    color?: string;
    OnClick?: () => void;
}

const TitleComponent: React.FC<TitleComponentProps> = (props) => {

    const HandleOnClick = () => {
        if (!props.OnClick) return;
        props.OnClick();
    }

    return (
        <div className="titleContainer" onClick={HandleOnClick}>
            <h1 style={{color: props.color}}>{props.title}</h1>
        </div>
    )
}

export default TitleComponent;