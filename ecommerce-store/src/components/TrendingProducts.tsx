import React, { useState } from "react";

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

interface TrendingProductsProps {
  products: Product[];
  loading: boolean;
  selectedCategory: string;
  onAddToCart: (product: Product) => void;
}

const ITEMS_PER_PAGE = 12;

const TrendingProducts: React.FC<TrendingProductsProps> = ({
  products = [],
  loading,
  selectedCategory,
  onAddToCart,
}) => {
  const safeProducts = Array.isArray(products) ? products : [];
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(safeProducts.length / ITEMS_PER_PAGE);

  const currentProducts = safeProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleProductClick = (product: Product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const renderStars = (rating: number) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-0.5">
        {Array(fullStars)
          .fill(null)
          .map((_, i) => (
            <span key={`full-${i}`} className="text-yellow-500">
              ★
            </span>
          ))}
        {halfStar && <span className="text-yellow-500">☆</span>}
        {Array(emptyStars)
          .fill(null)
          .map((_, i) => (
            <span key={`empty-${i}`} className="text-gray-300">
              ★
            </span>
          ))}
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Trending Products{" "}
        {selectedCategory !== "All" && ` - ${selectedCategory}`}
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : !safeProducts.length ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="cursor-pointer border rounded-md shadow-sm hover:shadow-md transition p-4 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-cover rounded mb-4"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <span className="text-blue-600 font-bold text-md mb-1">
                  ${product.price.toFixed(2)}
                </span>
                <div className="text-md text-yellow-500 font-medium mb-1">
                  {renderStars(product.rating)}
                </div>
                {!product.stock && (
                  <p className="text-sm text-red-500 font-semibold mb-1">
                    Out of Stock
                  </p>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (product.stock) onAddToCart(product);
                  }}
                  disabled={!product.stock}
                  className={`mt-auto px-4 py-2 rounded transition text-white ${
                    product.stock
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {product.stock ? "Add to Cart" : "Unavailable"}
                </button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="h-48 w-full object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{selectedProduct.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              Category: {selectedProduct.category}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              {selectedProduct.description}
            </p>

            <div className="mb-2">
              {renderStars(selectedProduct.rating)}
              <span className="text-md text-yellow-500 font-medium mb-1">
                ({selectedProduct.rating})
              </span>
            </div>

            {!selectedProduct.stock && (
              <p className="text-red-500 font-semibold mb-2">Out of Stock</p>
            )}
            <p className="text-lg text-blue-600 font-semibold mb-4">
              ${selectedProduct.price.toFixed(2)}
            </p>
            <button
              onClick={() => {
                if (selectedProduct.stock) {
                  onAddToCart(selectedProduct);
                  closeModal();
                }
              }}
              disabled={!selectedProduct.stock}
              className={`w-full px-4 py-2 rounded text-white ${
                selectedProduct.stock
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {selectedProduct.stock ? "Add to Cart" : "Unavailable"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;
