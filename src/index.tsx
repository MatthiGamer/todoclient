import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignalRComponent from './Components/SignalRComponent/SignalRComponent';
import MainComponent from './Components/MainComponent/MainComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SignalRComponent/>
    <MainComponent/>
  </React.StrictMode>
);
