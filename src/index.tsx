import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignalRComponent from './SignalRComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SignalRComponent/>
  </React.StrictMode>
);
