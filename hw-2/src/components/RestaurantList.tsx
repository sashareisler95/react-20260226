import React, { useState } from "react";
import Restaurant from "./RestaurantCard";
import { restaurants } from "../mock";
import RestaurantTab from "./RestTabs";
import { RestaurantType } from "../types/types";
import { Carousel } from "./Carousel";

const RestaurantList: React.FC = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantType>(restaurants[0]);
    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
                Restaurant`s
            </h1>
            <Carousel scrollAmount={300}>
                {restaurants.map(restaurant => (
                    <div key={restaurant.id} style={{ flexShrink: 0 }}>
                        <RestaurantTab
                            restaurant={restaurant}
                            isActive={selectedRestaurant.id === restaurant.id}
                            onClick={() => setSelectedRestaurant(restaurant)}
                        />
                    </div>
                ))}
            </Carousel>
            <div style={{
                border: '1px solid #ddd',
                borderRadius: '12px',
                padding: '25px',
                backgroundColor: '#f9f9f9',
                marginTop: '20px'
            }}>
                <Restaurant restaurant={selectedRestaurant} />
            </div>
        </div>
    )

}

export default RestaurantList;