import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPackage,
  FiBox,
  FiClock,
  FiCheckCircle,
  FiArrowLeft,
} from "react-icons/fi";

export default function Dashboard() {
  const [orderStats, setOrderStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0,
  });
  const [productStats, setProductStats] = useState({ total: 0, lowStock: 0 });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      const { data: orders, error: orderError } = await supabase
        .from("orders")
        .select("status");

      if (!orderError && orders) {
        const total = orders.length;
        const pending = orders.filter((o) => o.status === "pending").length;
        const delivered = orders.filter((o) => o.status === "delivered").length;
        setOrderStats({ total, pending, delivered });
      }

      const { data: products, error: productError } = await supabase
        .from("allproducts")
        .select("stock");

      if (!productError && products) {
        const total = products.length;
        const lowStock = products.filter((p) => p.stock < 5).length;
        setProductStats({ total, lowStock });
      }

      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-600">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <button
        onClick={() => navigate("/")}
        className="text-blue-600 flex items-center mb-4 hover:underline"
      >
        <FiArrowLeft className="mr-1" /> Back
      </button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Orders Summary */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <div className="flex items-center gap-4 mb-4">
            <FiPackage className="text-blue-500 text-3xl" />
            <h2 className="text-xl font-semibold text-gray-800">Orders</h2>
          </div>
          <div className="space-y-1 text-gray-600">
            <p>
              Total:{" "}
              <span className="font-medium text-gray-900">
                {orderStats.total}
              </span>
            </p>
            <p className="flex items-center gap-1">
              <FiClock className="text-yellow-500" /> Pending:{" "}
              {orderStats.pending}
            </p>
            <p className="flex items-center gap-1">
              <FiCheckCircle className="text-green-500" /> Delivered:{" "}
              {orderStats.delivered}
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="inline-block mt-4 text-blue-600 hover:underline font-medium"
          >
            View Orders →
          </Link>
        </div>

        {/* Products Summary */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <div className="flex items-center gap-4 mb-4">
            <FiBox className="text-green-500 text-3xl" />
            <h2 className="text-xl font-semibold text-gray-800">Products</h2>
          </div>
          <div className="space-y-1 text-gray-600">
            <p>
              Total:{" "}
              <span className="font-medium text-gray-900">
                {productStats.total}
              </span>
            </p>
            <p className="text-red-500">Low Stock: {productStats.lowStock}</p>
          </div>
          <Link
            to="/admin/products"
            className="inline-block mt-4 text-blue-600 hover:underline font-medium"
          >
            Manage Products →
          </Link>
        </div>
      </div>
    </div>
  );
}
