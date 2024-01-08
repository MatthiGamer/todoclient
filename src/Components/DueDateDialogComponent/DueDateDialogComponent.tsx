import React from "react";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CustomDialogComponent from "../CustomDialogComponent/CustomDialogComponent";
import { SECONDARY_COLOR } from "../../Colors";
import DatePickerComponent from "../DatePickerComponent/DatePickerComponent";

interface DueDateDialogComponentProps {
    isVisible: boolean;
    setVisibility?: (visible: boolean) => void;
}

const DUE_DATE_DIALOG_COLOR = SECONDARY_COLOR;

const DueDateDialogComponent: React.FC<DueDateDialogComponentProps> = (props) => {

    const HandleOnSet = () => {
        if (!props.setVisibility) return;
        props.setVisibility(false);
    }

    return (
        !props.isVisible ? <></> :
        <CustomDialogComponent header={"When is the task due?"} isVisible={true} setDialogVisibility={props.setVisibility} color={DUE_DATE_DIALOG_COLOR}>
            <DatePickerComponent/>
            <ButtonComponent title={"Set"} OnClick={HandleOnSet} color={DUE_DATE_DIALOG_COLOR}/>
        </CustomDialogComponent>
    )
}

export default DueDateDialogComponent;