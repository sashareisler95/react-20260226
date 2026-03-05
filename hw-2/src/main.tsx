import React from 'react';
import ReactDOM from 'react-dom/client';
import RestaurantList from './components/RestaurantList';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <RestaurantList />
    </React.StrictMode>
);