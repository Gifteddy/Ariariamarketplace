import React from 'react';
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";

// Import the ComingSoonCountdown component
import ComingSoonCountdown from "../components/Layout/ComingSoonCountdown"; 

const HomePage = () => {
  // Set a target date for the countdown
  const targetDate = new Date('2024-10-13T15:37:19'); // Example target date
  
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* Add the ComingSoonCountdown component */}
      <ComingSoonCountdown targetDate={targetDate} />
      
      {/* Main homepage content */}
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
}

export default HomePage;
