import React from "react";
import ReactDOM from "react-dom/client";
import MainComponent from "./Components/MainComponent/MainComponent";
import SignalRComponent from "./Components/SignalRComponent/SignalRComponent";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainComponent/>
    <SignalRComponent/>
  </React.StrictMode>
);
