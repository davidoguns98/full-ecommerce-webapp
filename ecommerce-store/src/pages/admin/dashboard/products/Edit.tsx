import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";
import { FiArrowLeft } from "react-icons/fi";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    stock: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("allproducts")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Product not found.");
      } else {
        setFormData({
          title: data.title || "",
          price: data.price?.toString() || "",
          stock: data.stock?.toString() || "",
          image: data.image || "",
          category: data.category || "",
        });
      }

      setLoading(false);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { title, price, stock, image, category } = formData;

    const { error } = await supabase
      .from("allproducts")
      .update({
        title,
        price: parseFloat(price),
        stock: parseInt(stock),
        image,
        category,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate("/admin/products");
    }
  };

  if (loading) return <p className="p-6">Loading product...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 flex items-center mb-4 hover:underline"
      >
        <FiArrowLeft className="mr-1" /> Back
      </button>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

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
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="stock"
          placeholder="Stock"
          className="w-full p-2 border rounded"
          value={formData.stock}
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
          type="url"
          name="image"
          placeholder="Image URL"
          className="w-full p-2 border rounded"
          value={formData.image}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
