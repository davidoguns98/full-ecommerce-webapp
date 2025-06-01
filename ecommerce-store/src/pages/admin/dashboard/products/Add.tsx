import { useState } from "react";
import { supabase } from "../../../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { title, price, stock, image, category } = formData;

    if (!title || !price || !stock || !category) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const newProduct = {
      // id: uuidv4(), // ✅ Manually generate UUID
      title,
      price: parseFloat(price),
      stock: parseInt(stock),
      image: image || null,
      category,
    };

    const { error } = await supabase.from("allproducts").insert([newProduct]);

    if (error) {
      setError(error.message);
    } else {
      navigate("/admin/products");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 flex items-center mb-4 hover:underline"
      >
        <FiArrowLeft className="mr-1" /> Back
      </button>
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price (e.g., 19.99)"
          className="w-full p-2 border rounded"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          className="w-full p-2 border rounded"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="electronics">Electronics</option>
          <option value="fitness">Fitness</option>
          <option value="office">Office</option>
          <option value="phones and gadgets">Phones and Gadgets</option>
          <option value="outdoors">Outdoors</option>
          <option value="home">Home</option>
        </select>

        <input
          type="text"
          name="stock"
          placeholder="Stock quantity"
          className="w-full p-2 border rounded"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="image"
          placeholder="Image URL (optional)"
          className="w-full p-2 border rounded"
          value={formData.image}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
