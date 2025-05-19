import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { useState } from "react";
import CartPage from "./components/CartPage";

function App() {
  const [cart, setCart] = useState([]);

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
        element={<Home cart={cart} onAddToCart={handleAddToCart} />}
      />
      <Route
        path="/products"
        element={<Products cart={cart} onAddToCart={handleAddToCart} />}
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
    </Routes>
  );
}

export default App;
