import { useEffect, useState } from "react";
import { supabase } from "../../../../supabaseClient";
import { FiTrash2, FiCheckCircle, FiClock, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type Order = {
  user_id: string;
  fullname: string;
  email: string;
  total: number;
  status: string;
  created_at: string;
};

export default function ManageOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError("Failed to load orders");
      } else if (data) {
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      setOrders((prev) =>
        prev.map((order) =>
          order.user_id === id ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (!error) {
      setOrders((prev) => prev.filter((order) => order.user_id !== id));
    }
  };

  if (loading) return <p className="p-6">Loading orders...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 flex items-center mb-4 hover:underline"
      >
        <FiArrowLeft className="mr-1" /> Back
      </button>
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>

      <div className="overflow-x-auto">
        <table className="w-full border text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Customer</th>
              <th className="p-2">Email</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/admin/orders/view/${order.user_id}`)}
              >
                <td className="p-2 font-medium">{order.fullname}</td>
                <td className="p-2">{order.email}</td>
                <td className="p-2">${order.total.toFixed(2)}</td>
                <td className="p-2 capitalize flex items-center gap-2">
                  {order.status === "pending" ? (
                    <FiClock className="text-yellow-500" />
                  ) : (
                    <FiCheckCircle className="text-green-500" />
                  )}
                  {order.status}
                </td>
                <td className="p-2">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="p-2 space-x-2">
                  {order.status === "pending" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(order.user_id, "delivered")
                      }
                      className="text-green-600 hover:underline"
                    >
                      Mark Delivered
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(order.user_id)}
                    className="text-red-500 hover:underline"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
