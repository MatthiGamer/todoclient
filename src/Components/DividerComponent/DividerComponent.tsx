import React from "react";
import "./DividerComponent.css";

interface DividerComponentProps{
    color?: string;
}

const DividerComponent: React.FC<DividerComponentProps> = (props) => {
    return <hr style={{backgroundColor: props.color}}/>
}

export default DividerComponent;