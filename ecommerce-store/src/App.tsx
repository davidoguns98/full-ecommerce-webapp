import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { useEffect, useState } from "react";
import CartPage from "./components/CartPage";
import Order from "./pages/Order";
import { supabase } from "./supabaseClient";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Get initial session
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Listen for changes (sign in / out)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener?.subscription?.unsubscribe();
  }, []);

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
        console.log(data);
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleAddToCart = (product) => {
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

  const handleQuantityChange = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id) => {
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
          />
        }
      />
      <Route path="/order" element={<Order cart={cart} />} />
    </Routes>
  );
}

export default App;
