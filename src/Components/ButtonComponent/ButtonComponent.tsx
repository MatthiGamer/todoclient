import React, { ReactNode } from "react";
import "./ButtonComponent.css";

interface ButtonComponentProps{
    title: ReactNode | string;
    id?: string;
    class?: string;
    color?: string;
    backgroundColor?: string;
    OnClick?: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {

    return (
        <button
            id={props.id}
            className={props.class}
            style={{
                color: props.color,
                borderColor: props.color,
                backgroundColor: props.backgroundColor ? props.backgroundColor : undefined
            }}
            onClick={props.OnClick}>
                {props.title}
        </button>
    )
}

export default ButtonComponent;