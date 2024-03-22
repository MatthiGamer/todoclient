import React, { useEffect, useState } from "react";
import { TaskManager } from "../../Classes/TaskManager";
import MainContainerComponent from "../MainContainerComponent/MainContainerComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import "./MainComponent.css";

const MainComponent: React.FC = () => {

  useEffect(() => {
    TaskManager.GetInstance().InitializeLocalTasks();
  }, []);

  const [listName, setListName] = useState<string>("");

  return (
    <div id="MainContainer">
      <div>
        <SidebarComponent setListName={setListName}/>
      </div>
      <div id="ListView" style={listName === "" ? {display: "flex"} : {}}>
        <MainContainerComponent listName={listName}/>
      </div>
    </div>
  );
};

export default MainComponent;