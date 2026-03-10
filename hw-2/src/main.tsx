import React from 'react';
import ReactDOM from 'react-dom/client';
import RestaurantPage from './components/RestaurantPage';
import './fonts/fonts.css'
import './main.css'

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <RestaurantPage />
    </React.StrictMode>
);