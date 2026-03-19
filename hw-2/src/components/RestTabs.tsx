import React from "react";
import { RestaurantTabProps } from "../types/types";
import "../styles/RestaurantTabs.css";

const RestaurantTabs: React.FC<RestaurantTabProps> = ({ restaurant, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`restaurant-tab ${isActive ? 'restaurant-tab--active' : ''}`}
        >
            <div className="restaurant-tab__name">
                {restaurant.name}
            </div>

            <div className="restaurant-tab__info">
                <div className="restaurant-tab__info-row">
                    <span>{restaurant.menu?.length || 0} блюд</span>
                </div>
                <div className="restaurant-tab__info-row">
                    <span>{restaurant.reviews?.length || 0} отзывов</span>
                </div>
            </div>

            {isActive && (
                <div className="restaurant-tab__indicator" />
            )}
        </button>
    );
};

export default RestaurantTabs;