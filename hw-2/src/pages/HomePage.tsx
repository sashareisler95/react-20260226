import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home">
      <div className="home__card">
        <h1 className="home__title">Home</h1>
        <p className="home__subtitle">Choose a restaurant and add dishes to cart.</p>

        <Link to="/restaurants" className="home__cta">
          <span>Go to restaurants</span>
          <span className="home__arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;