import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { makeSelectRestaurantVMById } from "../features/restaurants/restaurantSelectors";
import "../styles/PageShell.css";

const RestaurantMenuPage: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const selectRestaurant = useMemo(() => makeSelectRestaurantVMById(), []);
  const restaurant = useAppSelector((s) =>
    restaurantId ? selectRestaurant(s, restaurantId) : null
  );

  if (!restaurantId) return <div className="page">Missing restaurantId</div>;
  if (!restaurant) return <div className="page">Restaurant not found</div>;

  return (
    <div className="page">
      <div className="page__card">
        <div className="page__top">
          <Link to={`/restaurants/${restaurantId}`} className="page__back">
            ← Back
          </Link>
        </div>

        <h1 className="page__title">{restaurant.name} — Menu</h1>
        <p className="page__subtitle">Choose a dish to open details</p>

        <ul className="page__list">
          {restaurant.menu.map((dish) => (
            <li key={dish.id} className="page__row">
              <Link to={`/dish/${dish.id}`} className="page__link">
                {dish.name}
              </Link>
              <span className="page__muted">{dish.price}$</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenuPage;