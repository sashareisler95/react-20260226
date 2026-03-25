import React, { useContext } from "react";
import { ThemeContext, themes } from "./ThemeContext";
import  "../../styles/ThemeButton.css";

const ThemeButton: React.FC = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error("ThemeButton must be used within ThemeProvider");
  }
  
  const { theme, buttonTheme } = context;
  
  return (
    <button
      onClick={buttonTheme}
      className= "theme-button"
    >
      {theme === themes.light ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeButton;