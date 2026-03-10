import React, { useState, useRef } from "react";
import Restaurant from "./RestaurantCard";
import { restaurants } from "../mock";
import RestaurantTab from "./RestTabs";
import { RestaurantType } from "../types/types";

const RestaurantList: React.FC = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantType>(restaurants[0]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = scrollContainerRef.current.scrollLeft + 
                (direction === 'left' ? -scrollAmount : scrollAmount);
            
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };
        return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
                Restaurant`s
            </h1>
            <div style={{
                position: 'relative',
                marginBottom: '30px',
                padding: '0 30px'
            }}>
                <button onClick={() => scroll('left')}
                        style={{
                                position: 'absolute',
                                left: '0',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                border: '1px solid #ddd',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                cursor: 'pointer',
                                zIndex: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                transition: 'all 0.2s'
                            }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                   ← 
                </button>
                <div
                    ref={scrollContainerRef}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '15px',
                        overflowX: 'auto',
                        padding: '10px 5px 20px 5px',
                        scrollBehavior: 'smooth',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#007bff #f0f0f0'
                    }}
                    className="tabs-scroll-container"
                >
                    {restaurants.map(restaurant => (
                        <div key={restaurant.id} style={{ flexShrink: 0 }}>
                            <RestaurantTab
                                restaurant={restaurant}
                                isActive={selectedRestaurant.id === restaurant.id}
                                onClick={() => setSelectedRestaurant(restaurant)}
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => scroll('right')}
                    style={{
                        position: 'absolute',
                        right: '0',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        border: '1px solid #ddd',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        cursor: 'pointer',
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                    →
                </button>
            </div>
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
    );
}

export default RestaurantList;