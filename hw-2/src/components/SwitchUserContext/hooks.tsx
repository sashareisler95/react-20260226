import { useContext } from 'react';
import { UserContext } from './UserContext';

export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  
  return context;
};

export const useAuth = () => {
  const { isAuthenticated, user, login, logout } = useUser();
  
  return {
    isAuthenticated,
    user,
    login,
    logout
  };
};