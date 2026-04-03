import React from "react";
import Counter from "./utils/Counter";
import type { DishEntity } from "../types/entities";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectDishQty } from "../features/cart/cartSelectors";
import { setQty } from "../features/cart/cartSlice";

export const MenuItem: React.FC<{ dish: DishEntity; showCounter: boolean }> = ({
  dish,
  showCounter,
}) => {
  const dispatch = useAppDispatch();
  const qty = useAppSelector((s) => selectDishQty(s, dish.id));

  return (
    <li className="menu-item">
      <span>
        {dish.name}
        <span className="price"> - {dish.price}$</span>
        <span className="ingredients"> ({dish.ingredients.join(", ")})</span>
      </span>

      {showCounter && (
        <Counter
          value={qty}
          min={0}
          max={5}
          onValueChange={(newQty) => dispatch(setQty({ dishId: dish.id, qty: newQty }))}
        />
      )}
    </li>
  );
};

export default MenuItem;