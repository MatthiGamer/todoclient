import React from "react";
import CustomDialogComponent from "../CustomDialogComponent/CustomDialogComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const AddTaskDialogComponent: React.FC = () => {
    return (
        <CustomDialogComponent header="Where should the task be added?" isVisible={true}>
          <ButtonComponent title={"Add to Todo"} color="black"></ButtonComponent>
          <ButtonComponent title={"Add to Optional"} color="black"></ButtonComponent>
        </CustomDialogComponent>
    )
}

export default AddTaskDialogComponent;