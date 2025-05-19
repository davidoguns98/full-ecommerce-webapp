import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import TrendingProducts from "../components/TrendingProducts";
import FeedbackCTA from "../components/FeedBackCTA";

const Home = ({ cart, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <div>
      <Navbar cart={cart} />
      <Hero />
      <FeaturedProducts onCategorySelect={setSelectedCategory} />
      <TrendingProducts
        selectedCategory={selectedCategory}
        onAddToCart={onAddToCart}
      />
      <FeedbackCTA />
      <Footer />
    </div>
  );
};

export default Home;
