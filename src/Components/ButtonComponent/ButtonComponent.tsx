import React from "react";
import "./ButtonComponent.css";

interface ButtonComponentProps{
    title: string;
    color?: string;
    OnClick?: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {

    return (
        <button style={{borderColor: props.color, color: props.color}} onClick={props.OnClick}>{props.title}</button>
    )
}

export default ButtonComponent;