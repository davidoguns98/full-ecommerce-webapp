import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import TrendingProducts from "../components/TrendingProducts";
import FeedbackCTA from "../components/FeedBackCTA";
import { Products } from "./Products";
interface HomeProps {
  cart: [];
  onAddToCart: (product: Products) => void;
  products: Products[];
  loading: boolean;
  user: any;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const Home: React.FC<HomeProps> = ({
  cart,
  onAddToCart,
  products,
  loading,
  user,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div>
      <Navbar user={user} cart={cart} />
      <Hero />
      <FeaturedProducts
        setSelectedCategory={setSelectedCategory}
        seletedCategory={selectedCategory}
      />
      <TrendingProducts
        selectedCategory={selectedCategory}
        onAddToCart={onAddToCart}
        products={products}
        loading={loading}
      />
      <FeedbackCTA />
      <Footer />
    </div>
  );
};

export default Home;
