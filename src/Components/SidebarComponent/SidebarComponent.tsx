import React from 'react';
import './SidebarComponent.css';
import TitleComponent from '../TitleComponent/TitleComponent';

const SidebarComponent: React.FC = () => {
  return (
    <div id="sidebar">
      <TitleComponent title='TO DO'/>
      {/* Sidebar content goes here */}
    </div>
  );
};

export default SidebarComponent;