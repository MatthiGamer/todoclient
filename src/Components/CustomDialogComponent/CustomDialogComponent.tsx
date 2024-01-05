import React, { PropsWithChildren } from "react";
import "./CustomDialogComponent.css";

interface CustomDialogComponentProps {
    header: string;
    isVisible: boolean;
}

const CustomDialogComponent: React.FC<PropsWithChildren<CustomDialogComponentProps>> = (props) => {
    return (
        !props.isVisible ? <></> :
        <div id="Overlay">
            <div id="Dialog">
                <h2>{props.header}</h2>
                {props.children}
            </div>
        </div>
    )
}

export default CustomDialogComponent;