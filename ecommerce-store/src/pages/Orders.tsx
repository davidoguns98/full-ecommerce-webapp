import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import type { User } from "@supabase/supabase-js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface CartItem {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  stock: boolean;
  quantity: number;
}

interface OrderItem {
  title: string;
  quantity: number;
}

interface Order {
  id: number;
  total: number;
  created_at: string;
  status: string;
  items: OrderItem[]; // stringified JSON
}
interface OrdersPageProps {
  user: User | null;
  cart: CartItem[];
}

const OrdersPage: React.FC<OrdersPageProps> = ({ user, cart }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch orders:", error);
      } else {
        setOrders(data as Order[]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <>
      <Navbar user={user} cart={cart ?? []} />
      <div className="max-w-4xl mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        {orders.map((order) => {
          const items: OrderItem[] = order.items ?? [];
          return (
            <div key={order.id} className="border p-4 mb-4 rounded shadow">
              <p className="font-semibold">Order ID: {order.id}</p>
              <p>Date: {new Date(order.created_at).toLocaleString()}</p>
              <p>Status: {order.status || "Processing"}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <div className="mt-2">
                <h4 className="font-medium">Items:</h4>
                <ul className="list-disc list-inside">
                  {items.map((item, idx) => (
                    <li key={idx}>
                      {item.title} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
