import React, { PropsWithChildren, useState } from "react";
import "./CustomDialogComponent.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

interface CustomDialogComponentProps {
    header: string;
    isVisible: boolean;
}

const CustomDialogComponent: React.FC<PropsWithChildren<CustomDialogComponentProps>> = (props) => {
    const [dialogIsVisible, setDialogVisibility] = useState<boolean>(props.isVisible);
    const HandleOnCancel = () => setDialogVisibility(false);
    
    return (
        !dialogIsVisible ? <></> :
        <div id="Overlay">
            <div id="Dialog">
                <h2>{props.header}</h2>
                {props.children}
                <ButtonComponent title={"Cancel"} color="black" OnClick={HandleOnCancel}></ButtonComponent>
            </div>
        </div>
    )
}

export default CustomDialogComponent;