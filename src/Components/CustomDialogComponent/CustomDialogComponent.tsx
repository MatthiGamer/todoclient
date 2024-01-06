import React, { PropsWithChildren, useState } from "react";
import "./CustomDialogComponent.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

interface CustomDialogComponentProps {
    header: string;
    isVisible: boolean;
    color?: string;
    setDialogVisibility?: (isVisible: boolean) => void;
}

const CustomDialogComponent: React.FC<PropsWithChildren<CustomDialogComponentProps>> = (props) => {
    const [dialogIsVisible, setDialogVisibility] = useState<boolean>(props.isVisible);
    const HandleOnCancel = () => {
        setDialogVisibility(false);
        if (props.setDialogVisibility === undefined) return;
        props.setDialogVisibility(false);
    }

    const CUSTOM_DIALOG_COLOR = props.color === undefined ? "black" : props.color;
    
    return (
        !dialogIsVisible ? <></> :
        <div id="Overlay">
            <div id="Dialog">
                <h2 id="DialogHeading" style={{color: CUSTOM_DIALOG_COLOR}}>{props.header}</h2>
                {props.children}
                <ButtonComponent title={"Cancel"} color={CUSTOM_DIALOG_COLOR} OnClick={HandleOnCancel}></ButtonComponent>
            </div>
        </div>
    )
}

export default CustomDialogComponent;