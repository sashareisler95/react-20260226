import React from "react";
import { Counter } from "./Counter";
import { RestaurantType }  from "../types/types"



const Restaurant: React.FC<{ restaurant: RestaurantType }> = ({ restaurant }) => {
    return (
        <section>
          <h2 style={{
                margin: '0 0 10px 0',
                color: '#333',
                padding: '0 20px 0 0',
                textAlign: 'center'
                }}>
                {restaurant.name}
          </h2>

          <h3 style={{
                margin: '10px 0 0 10px',
                color: '#333',
                padding: '10px 0 0 0'
            }}>
                Menu : 
          </h3>

            {restaurant.menu ? (
                <ul style={{
                    margin: '0 0 0 10px',
                    color: '#333',
                    padding: '0 0 0 10px'
                }}>
                    {restaurant.menu.map(item => (
                        <li key={item.id}>
                            {item.name } {item.price && `- ${item.price}$`}
                            {item.ingredients && (
                              <small> ({item.ingredients.join(', ')})</small>
                            )}
                            <Counter />
                        </li>
                    ))}
                </ul>
            ):(
                <p>Menu is temporarily unavailable</p>
            )}


          <h3 style={{
                margin: '10px 0 0 10px',
                color: '#333',
                padding: '10px 0 0 0'
            }}>
                Review`s : 
          </h3>

            {restaurant.reviews? (
                <ul style={{
                    margin: '0 0 0 10px',
                    color: '#333',
                    padding: '10px'
                }}>
                    {restaurant.reviews.map(item => (
                        <li key={item.id}>
                            {item.user} {item.text && `- ${item.text}`} {item.rating && `${item.rating} ⭐`}
                        </li>
                    ))}
                </ul>
            ):(
                <p>Reviews are temporarily unavailable</p>
            )}
        </section>
    )
}

export default Restaurant;

