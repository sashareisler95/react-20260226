import React from "react";

interface Menu {
  id: string;
  name: string;
  price?: number;
  ingredients?: Array<string>;
}

interface Review {
    id: string;
    user: string;
    text: string;
    rating: number;
}

interface RestaurantType {
  id: string;
  name: string;
  menu?: Array<Menu>;
  reviews?: Array<Review>;
}

const Restaurant: React.FC<{ restaurant: RestaurantType }> = ({ restaurant }) => {
    return (
        <div>
          <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>
                {restaurant.name}
          </h2>

          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                Меню: 
          </h3>

            {restaurant.menu && (
                <ul>
                    {restaurant.menu.map(item => (
                        <li key={item.id}>
                            {item.name } {item.price && `- ${item.price}$`}
                            {item.ingredients && (
                              <small> ({item.ingredients.join(', ')})</small>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            {!restaurant.menu && <p>Меню временно отсутствует</p>}

          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                Отзывы: 
          </h3>

            {restaurant.reviews && (
                <ul>
                    {restaurant.reviews.map(item => (
                        <li key={item.id}>
                            {item.user} {item.text && `- ${item.text}`} {item.rating && `${item.rating} 🌟`}
                        </li>
                    ))}
                </ul>
            )}
            {!restaurant.reviews && <p>Отзывы временно отсутствуют</p>}

        </div>
    )
}

export default Restaurant;

