import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { makeSelectRestaurantVMById } from "../features/restaurants/restaurantSelectors";
import "../styles/PageShell.css";

const RestaurantPage: React.FC = () => {
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
          <Link to="/restaurants" className="page__back">
            ← Restaurants
          </Link>
        </div>

        <h1 className="page__title">{restaurant.name}</h1>
        <p className="page__subtitle">
          Menu items: <strong>{restaurant.menu.length}</strong> · Reviews:{" "}
          <strong>{restaurant.reviews.length}</strong>
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
          <Link className="page__back" to={`/restaurants/${restaurantId}/menu`}>
            Menu →
          </Link>
          <Link className="page__back" to={`/restaurants/${restaurantId}/reviews`}>
            Reviews →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;