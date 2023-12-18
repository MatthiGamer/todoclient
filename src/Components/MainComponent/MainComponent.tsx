import React from 'react';
import SidebarComponent from '../SidebarComponent/SidebarComponent';
import './MainComponent.css';
import TitleComponent from '../TitleComponent/TitleComponent';
import DividerComponent from '../DividerComponent/DividerComponent';
import { SECONDARY_COLOR } from '../../Colors';

const MainComponent: React.FC = () => {
  return (
    <div className="main-container">
      <SidebarComponent />
      <div className="main-content">
        {/* Main content goes here */}
        <TitleComponent title='Liste' color={SECONDARY_COLOR}/>
        <DividerComponent color={SECONDARY_COLOR}/>
      </div>
    </div>
  );
};

export default MainComponent;