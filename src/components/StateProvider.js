import React, { createContext, useContext, useReducer } from "react";
import { initialState } from "./reducer/Reducer";

// Prepares the data layer
export const stateContext = createContext();

// Wrap our app and provide data layer to every component of our app
export const StateProvider = ({ reducer, initialState, children }) => (
  <stateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </stateContext.Provider>
);

// pull information from data layer
export const useStateValue = () => useContext(stateContext);
