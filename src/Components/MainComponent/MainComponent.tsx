import React from 'react';
import SidebarComponent from '../SidebarComponent/SidebarComponent';
import './MainComponent.css';

const MainComponent: React.FC = () => {
  return (
    <div className="main-container">
      <SidebarComponent />
      <div className="main-content">
        {/* Main content goes here */}
      </div>
    </div>
  );
};

export default MainComponent;