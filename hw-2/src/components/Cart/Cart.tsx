import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearCart, setQty } from "../../features/cart/cartSlice";
import { selectCartItems, selectCartTotal, selectCartTotalQty } from "../../features/cart/cartSelectors";
import { Counter } from "../utils/Counter";

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const totalQty = useAppSelector(selectCartTotalQty);

  if (!items.length) return <div></div>;

  return (
    <section>
      <h2>Cart</h2>
      <p>Total items: {totalQty}</p>

      <ul>
        {items.map((i) => (
          <li key={i.dishId}>
            <div>
              {i.name} — {i.price}$ × {i.qty} = {i.subtotal}$
            </div>

            <Counter
              value={i.qty}
              min={0}
              max={5}
              onValueChange={(newQty) => dispatch(setQty({ dishId: i.dishId, qty: newQty }))}
            />
          </li>
        ))}
      </ul>

      <h3>Total: {total}$</h3>
      <button onClick={() => dispatch(clearCart())}>Clear cart</button>
    </section>
  );
};