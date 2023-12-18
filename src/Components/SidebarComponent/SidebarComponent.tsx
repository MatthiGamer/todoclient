import React from 'react';
import './SidebarComponent.css';
import TitleComponent from '../TitleComponent/TitleComponent';
import DividerComponent from '../DividerComponent/DividerComponent';
import { PRIMARY_COLOR } from '../../Colors';

const SidebarComponent: React.FC = () => {
  return (
    <div id="sidebar" className="sidebar">
      <TitleComponent title='TO DO APPLICATION' color={PRIMARY_COLOR}/>
      <DividerComponent color={PRIMARY_COLOR}/>
    </div>
  );
};

export default SidebarComponent;