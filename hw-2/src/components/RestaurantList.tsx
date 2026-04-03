import React from "react";
import Restaurant from "./RestaurantCard";
import RestaurantTab from "./RestTabs";
import { Carousel } from "./utils/Carousel";
import "../styles/RestaurantList.css";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { restaurantSelected, selectSelectedRestaurantId } from "../features/restaurants/restaurantsSlice";
import { selectRestaurantsForTabs, selectSelectedRestaurantVM } from "../features/selectors";

const RestaurantList: React.FC = () => {
  const dispatch = useAppDispatch();

  const restaurants = useAppSelector(selectRestaurantsForTabs);
  const selectedId = useAppSelector(selectSelectedRestaurantId);
  const selectedRestaurant = useAppSelector(selectSelectedRestaurantVM);

  if (!restaurants.length || !selectedRestaurant) return null;

  return (
    <div className="restaurant-list">
      <h1 className="restaurant-list__title">Restaurant`s</h1>

      <Carousel scrollAmount={300}>
        {restaurants.map((r) => (
          <div key={r.id} className="restaurant-list__tab-wrapper">
            <RestaurantTab
              restaurant={r}
              isActive={selectedId === r.id}
              onClick={() => dispatch(restaurantSelected(r.id))}
            />
          </div>
        ))}
      </Carousel>

      <div className="restaurant-list__card-container">
        <Restaurant restaurant={selectedRestaurant} />
      </div>
    </div>
  );
};

export default RestaurantList;