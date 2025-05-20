import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import Footer from "../components/Footer";

const Products = ({
  cart,
  onAddToCart,
  products,
  loading,
  selectedCategory,
  setSelectedCategory,
  user,
}) => {
  return (
    <div>
      <Navbar user={user} cart={cart} />
      <FeaturedProducts setSelectedCategory={setSelectedCategory} />
      <TrendingProducts
        selectedCategory={selectedCategory}
        onAddToCart={onAddToCart}
        products={products}
        loading={loading}
      />
      <Footer />
    </div>
  );
};

export default Products;
