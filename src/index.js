import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./components/App";
import { StateProvider } from "./components/StateProvider";
import Reducer, { initialState } from "./components/reducer/Reducer";

ReactDOM.render(
  <React.StrictMode>
    {/* wrap our component so every component can get access to data layer*/}
    <StateProvider
      //  intial inital look of data
      initialState={initialState}
      // reducer is how we manipulate data
      reducer={Reducer}
    >
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
