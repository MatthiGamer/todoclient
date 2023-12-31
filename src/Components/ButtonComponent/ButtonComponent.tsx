import React from "react";
import "./ButtonComponent.css";

interface ButtonComponentProps{
    name: string;
    color?: string;
    method?: (name: string) => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {

    const HandleOnClick = () => {
        if (props.method == undefined) return;
        props.method(props.name);
    }

    return (
        <button style={{borderColor: props.color, color: props.color}} onClick={HandleOnClick}>{props.name}</button>
    )
}

export default ButtonComponent;