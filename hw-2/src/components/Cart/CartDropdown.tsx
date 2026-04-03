import React, { useEffect, useRef, useState } from "react";
import Counter from "../utils/Counter";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearCart, setQty } from "../../features/cart/cartSlice";
import {
  selectCartItems,
  selectCartTotal,
  selectCartTotalQty,
} from "../../features/cart/cartSelectors";
import "../../styles/CartDropdown.css";

export const CartDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const totalQty = useAppSelector(selectCartTotalQty);

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // закрытие по клику вне
  useEffect(() => {
    if (!open) return;

    const onClickOutside = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (e.target instanceof Node && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  // закрытие по Esc
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="cart-dd" ref={rootRef}>
      <button
        type="button"
        className="cart-dd__button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="cart-dd__title">Cart</span>
        <span className="cart-dd__meta">
          {totalQty} items · {total}$
        </span>
      </button>

      {open && (
        <div className="cart-dd__panel">
          {items.length === 0 ? (
            <div className="cart-dd__empty">Cart is empty</div>
          ) : (
            <>
              <ul className="cart-dd__list">
                {items.map((i) => (
                  <li key={i.dishId} className="cart-dd__item">
                    <div className="cart-dd__item-main">
                      <div className="cart-dd__item-name">{i.name}</div>
                      <div className="cart-dd__item-sub">
                        {i.price}$ × {i.qty} = {i.subtotal}$
                      </div>
                    </div>

                    <Counter
                      value={i.qty}
                      min={0}
                      max={99}
                      onValueChange={(newQty) =>
                        dispatch(setQty({ dishId: i.dishId, qty: newQty }))
                      }
                    />
                  </li>
                ))}
              </ul>

              <div className="cart-dd__footer">
                <div className="cart-dd__total">Total: {total}$</div>
                <button
                  type="button"
                  className="cart-dd__clear"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};