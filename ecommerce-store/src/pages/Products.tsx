import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import Footer from "../components/Footer";

const Products = ({ cart, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div>
      <Navbar cart={cart} />
      <FeaturedProducts onCategorySelect={setSelectedCategory} />
      <TrendingProducts
        selectedCategory={selectedCategory}
        onAddToCart={onAddToCart}
      />
      <Footer />
    </div>
  );
};

export default Products;
