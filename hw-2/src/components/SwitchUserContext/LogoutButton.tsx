import React from "react";
import { useAuth } from "./hooks";
import "../../styles/LogoutButton.css";

const LogoutButton: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="user-info">
      <span className="user-name"> {user?.name}</span>
      <button 
        className="logout-button"
        onClick={logout}
      >
        Sign Out
      </button>
    </div>
  );
};

export default LogoutButton;