import React from 'react';
import './SidebarComponent.css';
import TitleComponent from '../TitleComponent/TitleComponent';
import DividerComponent from '../DividerComponent/DividerComponent';
import { PRIMARY_COLOR } from '../../Colors';
import ListComponent from '../ListComponent/ListComponent';

interface SidebarComponentProps{
  setListName: (name: string) => void;
}

const SIDEBAR_COMPONENT_COLOR: string = PRIMARY_COLOR;

const primaryLists = [
  {name: 'Today'},
  {name: 'Important'},
  {name: 'Optional'},
];

const userLists = [
  {name: 'New List'},
];

const SidebarComponent: React.FC<SidebarComponentProps> = ({ setListName }) => {

  // Styled Components?
  return (
    <div id="sidebar" className="sidebar">
      <TitleComponent title='TO DO APPLICATION' color={SIDEBAR_COMPONENT_COLOR}/>

      <DividerComponent color={SIDEBAR_COMPONENT_COLOR}/>
      
      {primaryLists.map((list) => (
        <ListComponent
          key={list.name}
          setListName={setListName}
          name={list.name}
          color={SIDEBAR_COMPONENT_COLOR}
        />
      ))}

      <DividerComponent color={SIDEBAR_COMPONENT_COLOR}/>

      {userLists.map((list) => (
        <ListComponent
          key={list.name}
          setListName={setListName}
          name={list.name}
          color={SIDEBAR_COMPONENT_COLOR}
        />
      ))}
    </div>
  );
};

export default SidebarComponent;