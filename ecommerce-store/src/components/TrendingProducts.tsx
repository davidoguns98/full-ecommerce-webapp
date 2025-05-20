import React from "react";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  // Add any other fields your product might have
}

interface TrendingProductsProps {
  products: Product[];
  loading: boolean;
  selectedCategory: string;
  onAddToCart: (product: Product) => void;
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({
  products = [],
  loading,
  selectedCategory,
  onAddToCart,
}) => {
  const safeProducts = Array.isArray(products) ? products : [];
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Trending Products{" "}
        {selectedCategory !== "All" && ` - ${selectedCategory}`}
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : !safeProducts || safeProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {safeProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-md shadow-sm hover:shadow-md transition p-4 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-40 w-full object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <span className="text-blue-600 font-bold text-md mb-3">
                ${product.price.toFixed(2)}
              </span>

              <button
                onClick={() => onAddToCart(product)}
                className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;
