import React from "react";
import RestaurantList from "./RestaurantList";
import { Layout } from "./Layout";

const RestaurantPage: React.FC = () => {
    return (
        <Layout>
            <RestaurantList />
        </Layout>
    )
}

export default RestaurantPage;