import React, { useState } from "react";
import { TaskManager } from "../../Classes/TaskManager";
import { GetDateTypeFromDate } from "../../Classes/Utils";
import { SECONDARY_COLOR } from "../../Colors";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CustomDialogComponent from "../CustomDialogComponent/CustomDialogComponent";
import DatePickerComponent from "../DatePickerComponent/DatePickerComponent";

interface DueDateDialogComponentProps {
    isVisible: boolean;
    setVisibility?: (visible: boolean) => void;
}

const DUE_DATE_DIALOG_COLOR = SECONDARY_COLOR;

const DueDateDialogComponent: React.FC<DueDateDialogComponentProps> = (props) => {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const HandleOnChange = (date: Date | null) => {
        setSelectedDate(date);
    }

    const HandleOnSet = () => {
        if (!props.setVisibility) return;

        const date: Date | null = selectedDate;
        if (date !== null){
            TaskManager.GetInstance().SetDueDate(GetDateTypeFromDate(date));
        }
        
        props.setVisibility(false);
    }

    return (
        !props.isVisible ? <></> :
        <CustomDialogComponent header={"When is the task due?"} isVisible={true} setDialogVisibility={props.setVisibility} color={DUE_DATE_DIALOG_COLOR}>
            <DatePickerComponent OnChange={HandleOnChange}/>
            <ButtonComponent title={"Set"} OnClick={HandleOnSet} color={DUE_DATE_DIALOG_COLOR}/>
        </CustomDialogComponent>
    )
}

export default DueDateDialogComponent;