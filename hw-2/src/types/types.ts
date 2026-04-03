import { themes } from "../components/SwitchThemeContext/ThemeContext";
import type { RestaurantEntity } from "./entities";

export interface RestaurantTabProps {
  restaurant: RestaurantEntity;
  isActive: boolean;
  onClick: () => void;
}

export type ThemeType = {
  theme: typeof themes.light;
  buttonTheme: () => void;
};

export type UserType = {
  name: string;
  isAuthenticated: boolean;
};

export type UserContextType = {
  user: UserType | null;
  login: (username: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};