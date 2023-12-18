import React from 'react';
import SidebarComponent from '../SidebarComponent/SidebarComponent';
import './MainComponent.css';
import TitleComponent from '../TitleComponent/TitleComponent';

const MainComponent: React.FC = () => {
  return (
    <div className="main-container">
      <SidebarComponent />
      <div className="main-content">
        {/* Main content goes here */}
        <TitleComponent title='Liste'/>
      </div>
    </div>
  );
};

export default MainComponent;