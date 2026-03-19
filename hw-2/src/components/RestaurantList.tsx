import React, { useState } from "react";
import Restaurant from "./RestaurantCard";
import { restaurants } from "../mock";
import RestaurantTab from "./RestTabs";
import { RestaurantType, ReviewType } from "../types/types";
import { Carousel } from "./utils/Carousel";
import "../styles/RestaurantList.css";

const RestaurantList: React.FC = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantType>(restaurants[0]);

    const [allReviews, setAllReviews] = useState<Map<string, ReviewType[]>>(
        new Map(restaurants.map(r => [r.id, r.reviews || []]))
    );

    const handleAddReview = (newReview: Omit<ReviewType, 'id'>) => {
        const reviewWithId: ReviewType = {
            ...newReview,
            id: Date.now().toString()
        };

        setAllReviews(prev => {
            const next = new Map(prev);
            const currentReviews = next.get(selectedRestaurant.id) || [];
            next.set(selectedRestaurant.id, [...currentReviews, reviewWithId]);
            return next;
        });
    };
    
    const currentReviews = allReviews.get(selectedRestaurant.id) || [];


    return (
        <div className="restaurant-list">
            <h1 className="restaurant-list__title">
                Restaurant`s
            </h1>
            
            <Carousel scrollAmount={300}>
                {restaurants.map(restaurant => (
                    <div key={restaurant.id} className="restaurant-list__tab-wrapper">
                        <RestaurantTab
                            restaurant={restaurant}
                            isActive={selectedRestaurant.id === restaurant.id}
                            onClick={() => setSelectedRestaurant(restaurant)}
                        />
                    </div>
                ))}
            </Carousel>
            
            <div className="restaurant-list__card-container">
                <Restaurant 
                    restaurant={{ ...selectedRestaurant, reviews: currentReviews }} 
                    onAddReview={handleAddReview}
                />
            </div>
        </div>
    );
};

export default RestaurantList;