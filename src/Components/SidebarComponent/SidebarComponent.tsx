import React from 'react';
import './SidebarComponent.css';
import TitleComponent from '../TitleComponent/TitleComponent';
import DividerComponent from '../DividerComponent/DividerComponent';
import { PRIMARY_COLOR } from '../../Colors';
import ListComponent from '../ListComponent/ListComponent';

const SidebarComponent: React.FC = () => {
  // Styled Components?
  return (
    <div id="sidebar" className="sidebar">
      <TitleComponent title='TO DO APPLICATION' color={PRIMARY_COLOR}/>
      <DividerComponent color={PRIMARY_COLOR}/>
      <ListComponent name='Today' color={PRIMARY_COLOR}/>
      <ListComponent name='Important' color={PRIMARY_COLOR}/>
      <ListComponent name='Optional' color={PRIMARY_COLOR}/>
      <DividerComponent color={PRIMARY_COLOR}/>
      <ListComponent name='New List' color={PRIMARY_COLOR}/>
    </div>
  );
};

export default SidebarComponent;