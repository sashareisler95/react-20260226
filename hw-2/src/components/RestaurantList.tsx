import React from "react";
import Restaurant from "./RestaurantCard";
import { restaurants } from "../mock";

const RestaurantList: React.FC = () => {
        return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
                Рестораны
            </h1>
        
            {restaurants.map(restaurant => (
                <Restaurant 
                    key={restaurant.id} 
                    restaurant={restaurant} 
                />
            ))}

        </div>
    );
}

export default RestaurantList;