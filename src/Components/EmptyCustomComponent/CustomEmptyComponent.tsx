import React, { PropsWithChildren } from "react";
import "./CustomEmptyComponent.css";

const CustomEmptyComponent: React.FC<PropsWithChildren> = (props: PropsWithChildren) => {
    return(
        <div id="EmptyMainContent">
            {props.children}
        </div>
    )
}

export default CustomEmptyComponent;