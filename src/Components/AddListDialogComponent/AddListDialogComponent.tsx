import React, { useRef } from "react";
import { SECONDARY_COLOR } from "../../Colors";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CustomDialogComponent from "../CustomDialogComponent/CustomDialogComponent";
import "./AddListDialogComponent.css";

interface AddListDialogComponentProps {
    isVisible: boolean;
    setDialogVisibility?: (isVisible: boolean) => void;
    createNewList: (listName: string) => void;
}

const ADD_LIST_DIALOG_COLOR = SECONDARY_COLOR;

const AddListDialogComponent: React.FC<AddListDialogComponentProps> = (props) => {

    const HandleOnEnterKeyPress = (event: { key: string; }) => {
        if (event.key !== "Enter") return;
        HandleOnCreate();
      };

    const inputRef = useRef<HTMLInputElement>(null);
    const HandleOnCreate = () => {
        if (!inputRef.current || inputRef.current.value === "") return;
        props.createNewList(inputRef.current.value);
    }

    return (
        !props.isVisible ? <></> :
        <CustomDialogComponent
        header={"What should the new list be called?"}
        isVisible={true}
        color={ADD_LIST_DIALOG_COLOR}
        setDialogVisibility={props.setDialogVisibility}>

            <input
            id="ListNameInput"
            type="text"
            style={{color: ADD_LIST_DIALOG_COLOR}}
            placeholder="Name"
            onKeyDown={HandleOnEnterKeyPress}
            ref={inputRef}/>

            <ButtonComponent title={"Create new List"} color={ADD_LIST_DIALOG_COLOR} OnClick={HandleOnCreate}/>
        </CustomDialogComponent>
    )
}

export default AddListDialogComponent;