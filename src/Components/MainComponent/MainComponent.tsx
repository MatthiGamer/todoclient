import React, { useState } from 'react';
import SidebarComponent from '../SidebarComponent/SidebarComponent';
import './MainComponent.css';
import MainContainerComponent from '../MainContainerComponent/MainContainerComponent';

const MainComponent: React.FC = () => {

  const [listName, setListName] = useState<string>("")

  return (
    <div className="main-container">
      <SidebarComponent setListName={setListName}/>
      <div className="main-content">
        <MainContainerComponent listName={listName}/>
      </div>
    </div>
  );
};

export default MainComponent;