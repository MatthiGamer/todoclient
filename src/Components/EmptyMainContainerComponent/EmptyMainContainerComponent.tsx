import React from "react";
import "./EmptyMainContainerComponent.css"

const EmptyMainContainerComponent: React.FC = () => {
    return(
        <div id="EmptyMainContent">
            <>
                <h1>It's empty here...</h1>
                <p>Click on a list on the left</p>
                <p>to see your tasks.</p>
            </>
        </div>
    )
}

export default EmptyMainContainerComponent;