import React from "react";
import Navbar from "../components/Navbar";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import Footer from "../components/Footer";
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

interface ProductsProps {
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  products: Product[];
  loading: boolean;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  user: User | null;
}

const Products: React.FC<ProductsProps> = ({
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
