import { createContext } from "react";
import { ThemeType } from "../../types/types";

export const themes = {
  light: 'theme-light',
  dark: 'theme-dark',
};


export const ThemeContext = createContext<ThemeType | undefined>(undefined);