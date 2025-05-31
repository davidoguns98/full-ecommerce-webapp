import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { User } from "@supabase/supabase-js";
import toast from "react-hot-toast";

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

interface OrderPageProps {
  cart: CartItem[];
  user: User | null;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const OrderPage: React.FC<OrderPageProps> = ({ cart, setCart, user }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    phone: "",
    email: "",
    payment: "Credit Card",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please log in to place an order.");
      navigate("/order"); // 👈 redirect to your login route
    }
  }, [user, navigate]);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!formData.fullname || !formData.address || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setLoading(false);
      toast.error("User not authenticated. Please log in.");
      return;
    }

    const { error } = await supabase.from("orders").insert([
      {
        ...formData,
        total: totalPrice,
        items: cart,
        user_id: user.id,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Error saving order:", error);
      toast.error(error.message || "An error has occurred");
    } else {
      toast.success("Order placed successfully!");
      setCart([]); // clear cart
      navigate("/"); // redirect
    }
  };

  return (
    <>
      <Navbar user={user} cart={cart} />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="text-right mt-4 text-lg font-bold">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Shipping Info</h3>
          <input
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleInputChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full mb-3 p-2 border rounded"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
          <select
            name="payment"
            value={formData.payment}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;
