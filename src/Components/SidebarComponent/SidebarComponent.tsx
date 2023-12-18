import React from 'react';
import './SidebarComponent.css';
import TitleComponent from '../TitleComponent/TitleComponent';

const SidebarComponent: React.FC = () => {
  return (
    <div id="sidebar">
      {/* Sidebar content goes here */}
      <TitleComponent title='Todo List'/>
      <h1>Todo</h1>
    </div>
  );
};

export default SidebarComponent;