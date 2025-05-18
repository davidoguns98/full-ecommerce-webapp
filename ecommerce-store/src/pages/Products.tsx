import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import Footer from "../components/Footer";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <div>
      <Navbar />
      <FeaturedProducts onCategorySelect={setSelectedCategory} />
      <TrendingProducts selectedCategory={selectedCategory} />
      <Footer />
    </div>
  );
};

export default Products;
