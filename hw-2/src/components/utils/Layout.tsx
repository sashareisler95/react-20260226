import { PropsWithChildren } from 'react';
import ScrollProgressBar from './ScrollProgressBar';
import ThemeButton from '../SwitchThemeContext/SwitchThemeButton';
import '../../styles/theme.css';
import '../../styles/Layout.css';
import { useTheme } from '../SwitchThemeContext/hooks';
import LoginButton from '../SwitchUserContext/LoginButton';
import LogoutButton from '../SwitchUserContext/LogoutButton';
import { useAuth } from '../SwitchUserContext/hooks';


export const Layout = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  
  return (
    <main className={`layout ${theme}`}>
      <ScrollProgressBar/>
      <header>
        <ThemeButton />
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </header>
      {children}
      <footer>footer</footer>
    </main>
  );
};