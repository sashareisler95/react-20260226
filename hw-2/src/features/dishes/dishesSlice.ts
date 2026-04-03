import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { DishEntity } from "../../types/entities";

const dishesAdapter = createEntityAdapter<DishEntity>();

const dishesSlice = createSlice({
  name: "dishes",
  initialState: dishesAdapter.getInitialState(),
  reducers: {
    dishesLoaded: dishesAdapter.setAll,
  },
});

export const { dishesLoaded } = dishesSlice.actions;
export default dishesSlice.reducer;

export const dishesSelectors = dishesAdapter.getSelectors<RootState>(
  (state) => state.dishes
);