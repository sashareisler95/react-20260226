import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Id } from "../../types/entities";

type CartState = {
  // dishId -> qty
  quantities: Record<Id, number>;
};

const initialState: CartState = {
  quantities: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setQty: (state, action: PayloadAction<{ dishId: Id; qty: number }>) => {
      const { dishId, qty } = action.payload;
      if (qty <= 0) {
        delete state.quantities[dishId];
      } else {
        state.quantities[dishId] = qty;
      }
    },
    increment: (state, action: PayloadAction<{ dishId: Id }>) => {
      const id = action.payload.dishId;
      state.quantities[id] = (state.quantities[id] ?? 0) + 1;
    },
    decrement: (state, action: PayloadAction<{ dishId: Id }>) => {
      const id = action.payload.dishId;
      const next = (state.quantities[id] ?? 0) - 1;
      if (next <= 0) delete state.quantities[id];
      else state.quantities[id] = next;
    },
    clearCart: (state) => {
      state.quantities = {};
    },
  },
});

export const { setQty, increment, decrement, clearCart } = cartSlice.actions;
export default cartSlice.reducer;