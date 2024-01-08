import React from "react";
import CustomEmptyComponent from "../EmptyCustomComponent/CustomEmptyComponent";

const EmptyListComponent: React.FC = () => {
    return(
        <CustomEmptyComponent>
            <h1>All done!</h1>
        </CustomEmptyComponent>
    )
}

export default EmptyListComponent;