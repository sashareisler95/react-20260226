import React from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "../components/utils/Carousel";
import RestaurantTab from "../components/RestTabs";
import { useAppSelector } from "../app/hooks";
import { restaurantsSelectors } from "../features/restaurants/restaurantsSlice";
import "../styles/RestaurantList.css";

const RestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const restaurants = useAppSelector(restaurantsSelectors.selectAll);

  return (
    <div className="restaurant-list">
      <h1 className="restaurant-list__title">Restaurant`s</h1>

      <Carousel scrollAmount={300}>
        {restaurants.map((r) => (
          <div key={r.id} className="restaurant-list__tab-wrapper">
            <RestaurantTab
              restaurant={r}
              isActive={false}
              onClick={() => navigate(`/restaurants/${r.id}`)}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default RestaurantsPage;