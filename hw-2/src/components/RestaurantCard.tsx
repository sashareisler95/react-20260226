import React, { useState } from "react";
import { Counter } from "./utils/Counter";
import { RestaurantType, ReviewType } from "../types/types";
import ReviewForm from "./ReviewForm";
import "../styles/Restaurant.css";

const Restaurant: React.FC<{ 
    restaurant: RestaurantType;
    onAddReview: (review: Omit<ReviewType, 'id'>) => void;
    }> = ({ restaurant, onAddReview }) => {

    const [quantities, setQuantities] = useState<Map<string, number>>(new Map());

    const handleQuantityChange = (itemId: string, newQty: number) => {
        setQuantities(prev => {
            const next = new Map(prev);
            next.set(itemId, newQty);
            return next;
        });
    };

    const reviews = restaurant.reviews || [];

    return (
        <section className="restaurant-section">
            <h2 className="restaurant-name">
                {restaurant.name}
            </h2>

            <h3 className="section-title">
                Menu:
            </h3>

            {restaurant.menu ? (
                <ul className="menu-list">
                    {restaurant.menu.map(item => (
                        <li key={item.id} className="menu-item">
                            <span>
                                {item.name} 
                                {item.price && <span className="price"> - {item.price}$</span>}
                                {item.ingredients && (
                                    <span className="ingredients"> ({item.ingredients.join(', ')})</span>
                                )}
                            </span>
                            <Counter
                                value={quantities.get(item.id) ?? 5}
                                min={1}
                                max={5}
                                onValueChange={(newQty) => handleQuantityChange(item.id, newQty)}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="menu-unavailable">Menu is temporarily unavailable</p>
            )}

            <h3 className="section-title">
                Reviews:
            </h3>

            {reviews.length > 0 ? (
                <ul className="reviews-list">
                    {reviews.map(item => (
                        <li key={item.id} className="review-item">
                            <strong>{item.user}</strong> 
                            {item.text && <span> - {item.text}</span>} 
                            {item.rating && <span> {item.rating} ⭐</span>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-reviews">No reviews yet</p>
            )}

            <ReviewForm onAddReview={onAddReview} />
        </section>
    );
};

export default Restaurant;