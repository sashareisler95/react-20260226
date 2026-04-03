import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { Id } from "../../types/entities";
import { restaurantsSelectors } from "../restaurants/restaurantsSlice";
import { dishesSelectors } from "../dishes/dishesSlice";
import { reviewsSelectors } from "../reviews/reviewsSlice";
import { usersSelectors } from "../users/usersSlice";
import type { RestaurantVM } from "../../types/viewModels";

const isDefined = <T,>(x: T | null | undefined): x is T => x != null;

export const makeSelectRestaurantVMById = () =>
  createSelector(
    [(s: RootState) => s, (_: RootState, restaurantId: Id) => restaurantId],
    (state, restaurantId): RestaurantVM | null => {
      const r = restaurantsSelectors.selectById(state, restaurantId);
      if (!r) return null;

      const menu = r.menu
        .map((dishId) => dishesSelectors.selectById(state, dishId))
        .filter(isDefined);

      const reviews = r.reviews
        .map((reviewId) => reviewsSelectors.selectById(state, reviewId))
        .filter(isDefined)
        .map((rev) => ({
          ...rev,
          user: usersSelectors.selectById(state, rev.userId)?.name ?? "Unknown",
        }));

      return { id: r.id, name: r.name, menu, reviews };
    }
  );