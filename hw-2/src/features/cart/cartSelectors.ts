import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { Id } from "../../types/entities";
import { dishesSelectors } from "../dishes/dishesSlice";

export const selectCartQuantities = (state: RootState) => state.cart.quantities;

export const selectDishQty = (state: RootState, dishId: Id) =>
  state.cart.quantities[dishId] ?? 0;

export const selectCartDishIds = createSelector(
  [selectCartQuantities],
  (quantities) => Object.keys(quantities) as Id[]
);

export type CartItemVM = {
  dishId: Id;
  name: string;
  price: number;
  qty: number;
  subtotal: number;
};

export const selectCartItems = createSelector(
  [(state: RootState) => state, selectCartQuantities, selectCartDishIds],
  (state, quantities, dishIds): CartItemVM[] => {
    return dishIds
      .map((dishId) => {
        const dish = dishesSelectors.selectById(state, dishId);
        if (!dish) return null;

        const qty = quantities[dishId] ?? 0;
        const price = dish.price ?? 0;

        return {
          dishId,
          name: dish.name,
          price,
          qty,
          subtotal: price * qty,
        };
      })
      .filter((x): x is CartItemVM => x !== null);
  }
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.subtotal, 0)
);

export const selectCartTotalQty = createSelector([selectCartQuantities], (q) =>
  Object.values(q).reduce((sum, n) => sum + n, 0)
);