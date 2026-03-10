import React from "react";
import { RestaurantTabProps } from "../types/types";

const RestaurantTabs: React.FC<RestaurantTabProps> = ({ restaurant, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                minWidth: '200px',
                height: '120px',
                padding: '20px',
                backgroundColor: isActive ? 'black' : '#f8f9fa',
                color: isActive ? 'white' : '#333',
                border: isActive ? '2px solid gray' : '1px solid #ddd',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: isActive 
                    ? '0 4px 10px rgba(40, 43, 46, 0.23)' 
                    : '0 2px 5px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left',
                fontFamily: 'inherit'
            }}
        >
            <div style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '10px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                {restaurant.name}
            </div>

            <div style={{
                fontSize: '14px',
                color: isActive ? '#e0e0e0' : '#666',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>{restaurant.menu?.length || 0} блюд</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>{restaurant.reviews?.length || 0} отзывов</span>
                </div>
            </div>

            {isActive && (
                <div style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#ffc107',
                    borderRadius: '50%',
                    border: '2px solid white'
                }} />
            )}
        </button>
    );
};

export default RestaurantTabs;