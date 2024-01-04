import React from "react";
import "./EmptyListComponent.css"
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { SECONDARY_COLOR } from "../../Colors";
import CustomEmptyComponent from "../EmptyCustomComponent/CustomEmptyComponent";

const EmptyListComponent: React.FC = () => {
    return(
        <CustomEmptyComponent>
            <h1>It's empty here...</h1>
            <ButtonComponent title="Click here to add a task" color={SECONDARY_COLOR} id="AddButton"/>
            <p>or add one as usual down there ↓.</p>
        </CustomEmptyComponent>
    )
}

export default EmptyListComponent;