import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import TrendingProducts from "../components/TrendingProducts";
import FeedbackCTA from "../components/FeedBackCTA";
import type { User } from "@supabase/supabase-js";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  stock: boolean;
  // Add any other fields your product might have
}
interface CartItem extends Product {
  quantity: number;
}
interface HomeProps {
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  products: Product[];
  loading: boolean;
  user: User | null;
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
      <FeaturedProducts setSelectedCategory={setSelectedCategory} />
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
