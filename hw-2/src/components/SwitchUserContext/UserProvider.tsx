import React, { useState } from "react";
import { UserContext } from "./UserContext";
import { UserContextType } from "../../types/types";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string; isAuthenticated: boolean } | null>(null);

  const login = (username: string) => {
    setUser({ name: username, isAuthenticated: true });
  };

  const logout = () => {
    setUser(null);
  };

  const store: UserContextType = {
    user,
    login,
    logout,
    isAuthenticated: user !== null
  };

  return (
    <UserContext.Provider value={store}>
      {children}
    </UserContext.Provider>
  );
};