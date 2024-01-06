import React from "react";
import "./SidebarComponent.css";
import TitleComponent from "../TitleComponent/TitleComponent";
import DividerComponent from "../DividerComponent/DividerComponent";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../Colors";
import ListButtonComponent from "../ListButtonComponent/ListButtonComponent";
import { LIST_NAME_IMPORTANT, LIST_NAME_OPTIONAL, LIST_NAME_TASKS, LIST_NAME_TODAY, LIST_NAME_TODO } from "../../Consts";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

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

const userLists = [
  {name: "New List"},
];

const SidebarComponent: React.FC<SidebarComponentProps> = ({ setListName }) => {

  const HandleOnClick = () => {
    setListName("");
  }

  // Styled Components?
  return (
    <div id="sidebar" className="sidebar">
      <button onClick={HandleOnClick} id="MainButton">
        <TitleComponent title="TO DO APPLICATION" color={SIDEBAR_COMPONENT_COLOR}/>
      </button>

      <DividerComponent color={SIDEBAR_COMPONENT_COLOR}/>
      
      {primaryLists.map((list) => (
        <ListButtonComponent
          key={list.name}
          setListName={setListName}
          title={list.name}
          color={SIDEBAR_COMPONENT_COLOR}
        />
      ))}

      <DividerComponent color={SIDEBAR_COMPONENT_COLOR}/>

      {userLists.map((list) => (
        <ListButtonComponent
          key={list.name}
          setListName={setListName}
          title={list.name}
          color={SIDEBAR_COMPONENT_COLOR}
        />
      ))}

      <ButtonComponent title={"Add List"} color={SIDEBAR_COMPONENT_COLOR} id="AddListButton"/>
    </div>
  );
};

export default SidebarComponent;