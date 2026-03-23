import React from "react";
import { ThemeContext } from "./ThemeContext";
import { ThemeType } from "../../types/types";

export const Provider = ({ children, store }: { 
  children: React.ReactNode; 
  store: ThemeType;
}) => {
  return <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>;
};