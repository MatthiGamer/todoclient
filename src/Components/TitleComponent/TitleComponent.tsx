import React from "react";
import "./TitleComponent.css";

interface TitleComponentProps{
    id?: string;
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
        <div className="titleContainer" onClick={HandleOnClick} id={props.id}>
            <h1 style={{color: props.color}}>{props.title}</h1>
        </div>
    )
}

export default TitleComponent;