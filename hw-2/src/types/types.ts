import { themes } from "../components/SwitchThemeContext/ThemeContext";

export interface Menu {
  id: string;
  name: string;
  price?: number;
  ingredients?: Array<string>;
  count?: number;
}

export interface ReviewType {
    id: string;
    user: string;
    text: string;
    rating: number;
}

export interface RestaurantType {
  id: string;
  name: string;
  menu?: Array<Menu>;
  reviews?: Array<ReviewType>;
}

export interface RestaurantTabProps {
    restaurant: RestaurantType;
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