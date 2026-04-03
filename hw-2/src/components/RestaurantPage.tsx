import React, { useEffect, useState } from "react";
import RestaurantList from "./RestaurantList";
import { Layout } from "./utils/Layout";
import { Provider as ThemeProvider } from "./SwitchThemeContext/ThemeProvider";
import { themes } from "./SwitchThemeContext/ThemeContext";
import { ThemeType } from "../types/types";
import { UserProvider } from "./SwitchUserContext/UserProvider";

import { useAppDispatch } from "../app/hooks";
import { usersLoaded } from "../features/users/usersSlice";
import { dishesLoaded } from "../features/dishes/dishesSlice";
import { reviewsLoaded } from "../features/reviews/reviewsSlice";
import { restaurantsLoaded } from "../features/restaurants/restaurantsSlice";

import {
  normalizedUsers,
  normalizedDishes,
  normalizedReviews,
  normalizedRestaurants,
} from "../materials/normalized-mock"

const RestaurantPage: React.FC = () => {
  const [theme, setTheme] = useState(themes.light);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersLoaded(normalizedUsers));
    dispatch(dishesLoaded(normalizedDishes));
    dispatch(reviewsLoaded(normalizedReviews));
    dispatch(restaurantsLoaded(normalizedRestaurants));
  }, [dispatch]);

  const themeStore: ThemeType = {
    theme,
    buttonTheme: () => setTheme(theme === themes.light ? themes.dark : themes.light),
  };

  return (
    <ThemeProvider store={themeStore}>
      <UserProvider>
        <Layout>
          <RestaurantList />
        </Layout>
      </UserProvider>
    </ThemeProvider>
  );
};

export default RestaurantPage;