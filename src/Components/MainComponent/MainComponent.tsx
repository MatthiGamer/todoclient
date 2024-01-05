import React, { useState } from 'react';
import SidebarComponent from '../SidebarComponent/SidebarComponent';
import './MainComponent.css';
import MainContainerComponent from '../MainContainerComponent/MainContainerComponent';
import CustomDialogComponent from '../CustomDialogComponent/CustomDialogComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const MainComponent: React.FC = () => {

  const [listName, setListName] = useState<string>("");

  return (
    <div id="MainContainer">
      <div>
        <SidebarComponent setListName={setListName}/>
        <CustomDialogComponent header='Where should the task be added?' isVisible={true}>
          <ButtonComponent title={'Add to Todo'} color='black'></ButtonComponent>
          <ButtonComponent title={'Add to Optional'} color='black'></ButtonComponent>
        </CustomDialogComponent>
      </div>
      <div id="ListView" style={listName === "" ? {display: "flex"} : {}}>
        <MainContainerComponent listName={listName}/>
      </div>
    </div>
  );
};

export default MainComponent;