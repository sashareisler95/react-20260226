import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCartTotal, selectCartTotalQty } from "../../features/cart/cartSelectors";
import "../../styles/CartSummary.css";

export const CartSummary: React.FC = () => {
  const total = useAppSelector(selectCartTotal);
  const qty = useAppSelector(selectCartTotalQty);

  return (
    <div className="cart-summary">
      <span className="cart-summary__title">Cart 🗑</span>
      <span className="cart-summary__meta">
        {qty} items · {total}$
      </span>
    </div>
  );
};