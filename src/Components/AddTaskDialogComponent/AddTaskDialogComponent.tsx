import React from "react";
import CustomDialogComponent from "../CustomDialogComponent/CustomDialogComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { SECONDARY_COLOR } from "../../Colors";

const ADD_TASK_DIALOG_COLOR: string = SECONDARY_COLOR;

const AddTaskDialogComponent: React.FC = () => {
    return (
        <CustomDialogComponent header="Where should the task be added?" isVisible={true}>
          <ButtonComponent title={"Add to Todo"} color={ADD_TASK_DIALOG_COLOR}></ButtonComponent>
          <ButtonComponent title={"Add to Optional"} color={ADD_TASK_DIALOG_COLOR}></ButtonComponent>
        </CustomDialogComponent>
    )
}

export default AddTaskDialogComponent;