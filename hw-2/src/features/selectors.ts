import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { restaurantsSelectors, selectSelectedRestaurantId } from "./restaurants/restaurantsSlice";
import { dishesSelectors } from "./dishes/dishesSlice";
import { reviewsSelectors } from "./reviews/reviewsSlice";
import { usersSelectors } from "./users/usersSlice";
import type { RestaurantVM } from "../types/viewModels";

const isDefined = <T>(x: T | undefined | null): x is T => x != null;

export const selectRestaurantsForTabs = (state: RootState) =>
  restaurantsSelectors.selectAll(state);

export const selectSelectedRestaurantVM = createSelector(
  [(s: RootState) => s, selectSelectedRestaurantId],
  (state, selectedId): RestaurantVM | null => {
    if (!selectedId) return null;

    const restaurant = restaurantsSelectors.selectById(state, selectedId);
    if (!restaurant) return null;

    const menu = restaurant.menu
      .map((dishId) => dishesSelectors.selectById(state, dishId))
      .filter(isDefined);

    const reviews = restaurant.reviews
      .map((reviewId) => reviewsSelectors.selectById(state, reviewId))
      .filter(isDefined)
      .map((rev) => ({
        ...rev,
        user: usersSelectors.selectById(state, rev.userId)?.name ?? "Unknown",
      }));

    return { ...restaurant, menu, reviews };
  }
);