import React, { useState } from "react";
import { PRIMARY_COLOR } from "../../Colors";
import { LIST_NAME_IMPORTANT, LIST_NAME_OPTIONAL, LIST_NAME_TASKS, LIST_NAME_TODAY, LIST_NAME_TODO } from "../../Consts";
import AddListDialogComponent from "../AddListDialogComponent/AddListDialogComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import DividerComponent from "../DividerComponent/DividerComponent";
import ListButtonComponent from "../ListButtonComponent/ListButtonComponent";
import TitleComponent from "../TitleComponent/TitleComponent";
import "./SidebarComponent.css";

interface SidebarComponentProps{
  setListName: (name: string) => void;
}

const SIDEBAR_COMPONENT_COLOR: string = PRIMARY_COLOR;

const primaryLists = [
  {name: LIST_NAME_TODAY},      // All tasks due to today [filled automatically]
  {name: LIST_NAME_IMPORTANT},  // All tasks marked as important [filled automatically]
  {name: LIST_NAME_TASKS},      // All tasks [filled automatically]
  {name: LIST_NAME_TODO},       // All tasks that have to be done today [filled by user]
  {name: LIST_NAME_OPTIONAL},   // All tasks that could be done today [filled by user]
];

const SidebarComponent: React.FC<SidebarComponentProps> = ({ setListName }) => {

  const [userListsList, setUserListsList] = useState<{name: string}[]>([]);
  const [isDialogVisible, setDialogVisibility] = useState<boolean>(false);

  const AddUserList = (listName: string) => {
    setUserListsList([...userListsList, {name: listName}]);
    setDialogVisibility(false);
  }
  
  const HandleOnClick = () => {
    setListName("");
  }

  const HandleOnAdd = () => {
    return setDialogVisibility(true);
  }

  // Styled Components?
  return (
    <div id="sidebar" className="sidebar">
      <TitleComponent title="TO DO APPLICATION" color={SIDEBAR_COMPONENT_COLOR} OnClick={HandleOnClick} id="SideBarTitle"/>

      <DividerComponent color={SIDEBAR_COMPONENT_COLOR}/>
      
      {primaryLists.map((list) => (
        <ListButtonComponent
          key={list.name}
          setListName={setListName}
          title={list.name}
          color={SIDEBAR_COMPONENT_COLOR}
        />
      ))}

      {userListsList.length === 0 ? <></> :
        <>
          <DividerComponent color={SIDEBAR_COMPONENT_COLOR}/>

          {userListsList.map((list) => (
            <ListButtonComponent
              key={list.name}
              setListName={setListName}
              title={list.name}
              color={SIDEBAR_COMPONENT_COLOR}
            />
          ))}
        </>
      }

      <ButtonComponent title={"Add List"} color={SIDEBAR_COMPONENT_COLOR} id="AddListButton" OnClick={HandleOnAdd}/>
      <AddListDialogComponent isVisible={isDialogVisible} createNewList={AddUserList} setDialogVisibility={setDialogVisibility}/>
    </div>
  );
};

export default SidebarComponent;