import React from "react";

// Example Product Data
const products = [
  { id: 1, name: "Product 1", price: "$99.99", imageUrl: "/product1.jpg" },
  { id: 2, name: "Product 2", price: "$89.99", imageUrl: "/product2.jpg" },
  { id: 3, name: "Product 3", price: "$109.99", imageUrl: "/product3.jpg" },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <p className="text-lg text-gray-700">
          Check out our most popular products!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
            <p className="text-lg text-yellow-500">{product.price}</p>
            <a
              href={`/products/${product.id}`}
              className="mt-4 inline-block bg-yellow-400 text-gray-800 py-2 px-4 rounded-lg hover:bg-yellow-300"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
