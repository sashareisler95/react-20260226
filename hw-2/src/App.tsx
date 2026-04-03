import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./components/utils/Layout";
import { Provider as ThemeProvider } from "./components/SwitchThemeContext/ThemeProvider";
import { themes } from "./components/SwitchThemeContext/ThemeContext";
import { UserProvider } from "./components/SwitchUserContext/UserProvider";

import type { ThemeType } from "./types/types";

import { useAppDispatch } from "./app/hooks";
import { usersLoaded } from "./features/users/usersSlice";
import { dishesLoaded } from "./features/dishes/dishesSlice";
import { reviewsLoaded } from "./features/reviews/reviewsSlice";
import { restaurantsLoaded } from "./features/restaurants/restaurantsSlice";

import {
  normalizedUsers,
  normalizedDishes,
  normalizedReviews,
  normalizedRestaurants,
} from "./materials/normalized-mock";

// Pages
import HomePage from "./pages/HomePage";
import RestaurantsPage from "./pages/RestaurantsPage";
import RestaurantPage from "./pages/RestaurantPage";
import RestaurantMenuPage from "./pages/RestaurantMenuPage";
import RestaurantReviewsPage from "./pages/RestaurantReviewsPage";
import DishPage from "./pages/DishPage";

const App: React.FC = () => {
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
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/restaurants/:restaurantId" element={<RestaurantPage />} />
            <Route path="/restaurants/:restaurantId/menu" element={<RestaurantMenuPage />} />
            <Route path="/restaurants/:restaurantId/reviews" element={<RestaurantReviewsPage />} />

            <Route path="/dish/:dishId" element={<DishPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;