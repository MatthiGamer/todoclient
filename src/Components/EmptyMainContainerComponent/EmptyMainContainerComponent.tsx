import React from "react";
import "./EmptyMainContainerComponent.css"
import CustomEmptyComponent from "../EmptyCustomComponent/CustomEmptyComponent";

const EmptyMainContainerComponent: React.FC = () => {
    return(
        <CustomEmptyComponent>
            <h1>It's empty here...</h1>
            <p>Click on a list on the left</p>
            <p>to see your tasks.</p>
        </CustomEmptyComponent>
    )
}

export default EmptyMainContainerComponent;