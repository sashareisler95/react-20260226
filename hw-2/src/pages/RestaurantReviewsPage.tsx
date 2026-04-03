import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { makeSelectRestaurantVMById } from "../features/restaurants/restaurantSelectors";
import "../styles/PageShell.css";

const RestaurantReviewsPage: React.FC = () => {
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

        <h1 className="page__title">{restaurant.name} — Reviews</h1>
        <p className="page__subtitle">
          Total: <strong>{restaurant.reviews.length}</strong>
        </p>

        <ul className="page__list">
          {restaurant.reviews.map((r) => (
            <li key={r.id} className="page__row" style={{ alignItems: "flex-start" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{r.user}</div>
                <div className="page__muted" style={{ marginTop: 4 }}>
                  {r.text}
                </div>
              </div>
              <div className="page__muted">⭐ {r.rating}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantReviewsPage;