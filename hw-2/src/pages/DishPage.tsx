import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { dishesSelectors } from "../features/dishes/dishesSlice";
import { selectDishQty } from "../features/cart/cartSelectors";
import { setQty } from "../features/cart/cartSlice";
import Counter from "../components/utils/Counter";
import "../styles/PageShell.css";
import { useAuth } from "../components/SwitchUserContext/hooks";

const DishPage: React.FC = () => {
  const { dishId } = useParams<{ dishId: string }>();
  const dispatch = useAppDispatch();

  const dish = useAppSelector((s) =>
    dishId ? dishesSelectors.selectById(s, dishId) : null
  );
  const qty = useAppSelector((s) => (dishId ? selectDishQty(s, dishId) : 0));

  const { isAuthenticated } = useAuth();

  if (!dishId) return <div className="page">Missing dishId</div>;
  if (!dish) return <div className="page">Dish not found</div>;

  return (
    <div className="page">
      <div className="page__card">
        <div className="page__top">
          <Link to="/restaurants" className="page__back">
            ← Restaurants
          </Link>
        </div>

        <h1 className="page__title">{dish.name}</h1>
        <p className="page__subtitle">
          Price: <strong>{dish.price}$</strong>
        </p>

        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
          <div className="page__muted">In cart:</div>
          {isAuthenticated ? (
                <Counter
                value={qty}
                min={0}
                max={5}
                onValueChange={(newQty) => dispatch(setQty({ dishId: dish.id, qty: newQty }))}
                />
            ) : (
                <div className="page__muted">{qty}</div>
            )}
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="page__muted">Ingredients</div>
          <div style={{ marginTop: 6 }}>{dish.ingredients.join(", ")}</div>
        </div>
      </div>
    </div>
  );
};

export default DishPage;