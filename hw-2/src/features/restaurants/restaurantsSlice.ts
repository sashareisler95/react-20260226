import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { Id, RestaurantEntity } from "../../types/entities";

const restaurantsAdapter = createEntityAdapter<RestaurantEntity>();

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: restaurantsAdapter.getInitialState({
    selectedRestaurantId: null as Id | null,
  }),
  reducers: {
    restaurantsLoaded: (state, action: PayloadAction<RestaurantEntity[]>) => {
      restaurantsAdapter.setAll(state, action.payload);
      if (!state.selectedRestaurantId && action.payload.length) {
        state.selectedRestaurantId = action.payload[0].id;
      }
    },
    restaurantSelected: (state, action: PayloadAction<Id>) => {
      state.selectedRestaurantId = action.payload;
    },
    restaurantReviewAdded: (state, action: PayloadAction<{ restaurantId: Id; reviewId: Id }>) => {
      const r = state.entities[action.payload.restaurantId];
      if (r) r.reviews.push(action.payload.reviewId);
    },
  },
});

export const { restaurantsLoaded, restaurantSelected, restaurantReviewAdded } =
  restaurantsSlice.actions;
export default restaurantsSlice.reducer;

export const restaurantsSelectors = restaurantsAdapter.getSelectors<RootState>(
  (state) => state.restaurants
);

export const selectSelectedRestaurantId = (state: RootState) =>
  state.restaurants.selectedRestaurantId;