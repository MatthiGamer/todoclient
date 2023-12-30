import React, { useState } from 'react';
import SidebarComponent from '../SidebarComponent/SidebarComponent';
import './MainComponent.css';
import TitleComponent from '../TitleComponent/TitleComponent';
import DividerComponent from '../DividerComponent/DividerComponent';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../Colors';

const MainComponent: React.FC = () => {

  const [listName, setListName] = useState<string>("")

  return (
    <div className="main-container">
      <SidebarComponent setListName={setListName}/>
      <div className="main-content">
        {/* Main content goes here */}
        <TitleComponent title={listName} color={SECONDARY_COLOR}/>
        <DividerComponent color={listName == "" ? PRIMARY_COLOR : SECONDARY_COLOR}/>
      </div>
    </div>
  );
};

export default MainComponent;