import { PropsWithChildren } from "react";
import ScrollProgressBar from "./ScrollProgressBar";
import ThemeButton from "../SwitchThemeContext/SwitchThemeButton";
import "../../styles/theme.css";
import "../../styles/Layout.css";
import { useTheme } from "../SwitchThemeContext/hooks";
import LoginButton from "../SwitchUserContext/LoginButton";
import LogoutButton from "../SwitchUserContext/LogoutButton";
import { useAuth } from "../SwitchUserContext/hooks";
import { CartDropdown } from "../Cart/CartDropdown";

export const Layout = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <main className={`layout ${theme}`}>
      <ScrollProgressBar />
      <header className="layout-header">
        <div className="layout-header__left">
          <CartDropdown />
          <ThemeButton />
        </div>

        <div className="layout-header__right">
          
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </header>

      {children}
      <footer>footer</footer>
    </main>
  );
};