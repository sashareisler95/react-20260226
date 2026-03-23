import React, { useState } from "react";
import RestaurantList from "./RestaurantList";
import { Layout } from "./utils/Layout";
import { Provider } from "./SwitchThemeContext/ThemeProvider";
import { themes } from "./SwitchThemeContext/ThemeContext";
import { ThemeType } from "../types/types";
import { UserProvider } from "./SwitchUserContext/UserProvider";

const RestaurantPage: React.FC = () => {
  const [theme, setTheme] = useState(themes.light);
  
  const store: ThemeType = {
    theme,
    buttonTheme: () => {
      setTheme(theme === themes.light ? themes.dark : themes.light);
    }
  };
  
  return (
    <Provider store={store}>
        <UserProvider>
            <Layout>
                <RestaurantList />
            </Layout>
        </UserProvider>
    </Provider>
  );
};

export default RestaurantPage;