import React, { ReactNode } from "react";
import "./ButtonComponent.css";

interface ButtonComponentProps{
    title: ReactNode | string;
    id?: string;
    color?: string;
    OnClick?: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {

    return (
        <button id={props.id} style={{borderColor: props.color, color: props.color}} onClick={props.OnClick}>{props.title}</button>
    )
}

export default ButtonComponent;