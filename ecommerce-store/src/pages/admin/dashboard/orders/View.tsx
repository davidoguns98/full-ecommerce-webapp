import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";
import { FiArrowLeft, FiCheckCircle, FiClock } from "react-icons/fi";

type Order = {
  user_id: string;
  fullname: string;
  email: string;
  total: number;
  status: string;
  created_at: string;
  items: { title: string; quantity: number; price: number }[];
};

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id);

      if (error) {
        console.error("Failed to fetch order:", error);
      } else {
        setOrder(data[0]);
      }

      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async (newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("user_id", id);

    if (!error && order) {
      setOrder({ ...order, status: newStatus });
    }
  };

  if (loading) return <p className="p-6">Loading order...</p>;
  if (!order) return <p className="p-6 text-red-500">Order not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 flex items-center mb-4 hover:underline"
      >
        <FiArrowLeft className="mr-1" /> Back
      </button>

      <h1 className="text-2xl font-bold mb-2">Order #{order.user_id}</h1>
      <p className="text-gray-600 mb-2">Customer: {order.fullname}</p>
      <p className="text-gray-600 mb-2">Email: {order.email}</p>
      <p className="text-gray-600 mb-2">
        Date: {new Date(order.created_at).toLocaleString()}
      </p>
      <p className="text-gray-600 mb-4 flex items-center gap-2">
        Status:
        {order.status === "pending" ? (
          <FiClock className="text-yellow-500" />
        ) : (
          <FiCheckCircle className="text-green-500" />
        )}
        <span className="capitalize">{order.status}</span>
      </p>

      <div className="bg-white border rounded-xl p-4 mb-6">
        <h2 className="font-semibold mb-2">Items</h2>
        {order.items?.length > 0 ? (
          <ul className="text-sm space-y-1">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.title} × {item.quantity} — ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No items found.</p>
        )}
        <p className="mt-4 font-medium">
          Total: $
          {typeof order.total === "number" ? order.total.toFixed(2) : "0.00"}
        </p>
      </div>

      {order.status === "pending" && (
        <button
          onClick={() => handleStatusUpdate("delivered")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Mark as Delivered
        </button>
      )}
    </div>
  );
}
