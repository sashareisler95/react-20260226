import React, { useState } from "react";
import { Counter } from "./utils/Counter";
import ReviewForm from "./ReviewForm";
import { useAuth } from "./SwitchUserContext/hooks";
import "../styles/Restaurant.css";

import { useAppDispatch } from "../app/hooks";
import { addReview } from "../features/reviews/addReviewThunk";
import type { Id } from "../types/entities";
import type { RestaurantVM, DishVM, ReviewVM } from "../types/viewModels";

const Restaurant: React.FC<{ restaurant: RestaurantVM }> = ({ restaurant }) => {
  const [quantities, setQuantities] = useState<Map<string, number>>(new Map());
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();

  const handleAddReview = (data: { userId: Id; text: string; rating: number }) => {
    dispatch(
      addReview({
        restaurantId: restaurant.id,
        userId: data.userId,
        text: data.text,
        rating: data.rating,
      })
    );
  };

  return (
    <section className="restaurant-section">
      <h2 className="restaurant-name">{restaurant.name}</h2>

      <h3 className="section-title">Menu:</h3>
      <ul className="menu-list">
        {restaurant.menu.map((item: DishVM) => (
          <li key={item.id} className="menu-item">
            <span>
              {item.name}
              <span className="price"> - {item.price}$</span>
              <span className="ingredients"> ({item.ingredients.join(", ")})</span>
            </span>

            {isAuthenticated && (
              <Counter
                value={quantities.get(item.id) ?? 5}
                min={1}
                max={5}
                onValueChange={(newQty) =>
                  setQuantities((prev) => {
                    const next = new Map(prev);
                    next.set(item.id, newQty);
                    return next;
                  })
                }
              />
            )}
          </li>
        ))}
      </ul>

      <h3 className="section-title">Reviews:</h3>
      <ul className="reviews-list">
        {restaurant.reviews.map((r: ReviewVM) => (
          <li key={r.id} className="review-item">
            <strong>{r.user}</strong> - {r.text} {r.rating} ⭐
          </li>
        ))}
      </ul>

      <ReviewForm onAddReview={handleAddReview} />
    </section>
  );
};

export default Restaurant;