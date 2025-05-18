import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import TrendingProducts from "../components/TrendingProducts";
import FeedbackCTA from "../components/FeedBackCTA";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturedProducts onCategorySelect={setSelectedCategory} />
      <TrendingProducts selectedCategory={selectedCategory} />
      <FeedbackCTA />
      <Footer />
    </div>
  );
};

export default Home;
