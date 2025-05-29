import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
import Order from "./pages/Order";
import { supabase } from "./supabaseClient";
import type { User } from "@supabase/supabase-js";
import OrdersPage from "./pages/Orders";
interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  stock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null); // You can replace `any` with Supabase `User` type if preferred
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Handle user session from Supabase
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch products based on category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      let query = supabase.from("allproducts").select("*");

      if (selectedCategory !== "All") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error.message);
        setProducts([]);
      } else {
        setProducts(data as Product[]);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            cart={cart}
            onAddToCart={handleAddToCart}
            user={user}
            loading={loading}
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        }
      />
      <Route
        path="/products"
        element={
          <Products
            cart={cart}
            user={user}
            onAddToCart={handleAddToCart}
            products={products}
            loading={loading}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        }
      />
      <Route
        path="/cart"
        element={
          <CartPage
            cart={cart}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
            user={user}
          />
        }
      />
      <Route
        path="/order"
        element={<Order cart={cart} user={user} setCart={setCart} />}
      />
      <Route path="/orders" element={<OrdersPage user={user} />} />
    </Routes>
  );
}

export default App;
