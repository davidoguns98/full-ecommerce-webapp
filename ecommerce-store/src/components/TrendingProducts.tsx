import React from "react";

// Sample products
const allProducts = [
  // Electronics
  {
    id: 1,
    title: "Smart LED TV",
    category: "Electronics",
    image: "https://via.placeholder.com/300x200?text=Smart+LED+TV",
    price: 399.99,
  },
  {
    id: 2,
    title: "Wireless Headphones",
    category: "Electronics",
    image: "https://via.placeholder.com/300x200?text=Wireless+Headphones",
    price: 89.99,
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    category: "Electronics",
    image: "https://via.placeholder.com/300x200?text=Bluetooth+Speaker",
    price: 49.99,
  },
  {
    id: 4,
    title: "Gaming Console",
    category: "Electronics",
    image: "https://via.placeholder.com/300x200?text=Gaming+Console",
    price: 299.99,
  },
  {
    id: 5,
    title: "Smart Watch",
    category: "Electronics",
    image: "https://via.placeholder.com/300x200?text=Smart+Watch",
    price: 159.99,
  },

  // Fashion
  {
    id: 6,
    title: "Men's T-Shirt",
    category: "Fashion",
    image: "https://via.placeholder.com/300x200?text=Men%27s+T-Shirt",
    price: 19.99,
  },
  {
    id: 7,
    title: "Women's Dress",
    category: "Fashion",
    image: "https://via.placeholder.com/300x200?text=Women%27s+Dress",
    price: 34.99,
  },
  {
    id: 8,
    title: "Sneakers",
    category: "Fashion",
    image: "https://via.placeholder.com/300x200?text=Sneakers",
    price: 74.99,
  },
  {
    id: 9,
    title: "Jeans",
    category: "Fashion",
    image: "https://via.placeholder.com/300x200?text=Jeans",
    price: 44.99,
  },
  {
    id: 10,
    title: "Leather Jacket",
    category: "Fashion",
    image: "https://via.placeholder.com/300x200?text=Leather+Jacket",
    price: 99.99,
  },

  // Home and Office
  {
    id: 11,
    title: "Office Chair",
    category: "Home and Office",
    image: "https://via.placeholder.com/300x200?text=Office+Chair",
    price: 129.99,
  },
  {
    id: 12,
    title: "Desk Lamp",
    category: "Home and Office",
    image: "https://via.placeholder.com/300x200?text=Desk+Lamp",
    price: 24.99,
  },
  {
    id: 13,
    title: "Bookshelf",
    category: "Home and Office",
    image: "https://via.placeholder.com/300x200?text=Bookshelf",
    price: 59.99,
  },
  {
    id: 14,
    title: "Laptop Stand",
    category: "Home and Office",
    image: "https://via.placeholder.com/300x200?text=Laptop+Stand",
    price: 39.99,
  },
  {
    id: 15,
    title: "Ergonomic Desk",
    category: "Home and Office",
    image: "https://via.placeholder.com/300x200?text=Ergonomic+Desk",
    price: 189.99,
  },

  // Phones and Gadgets
  {
    id: 16,
    title: "Smartphone X",
    category: "Phones and Gadgets",
    image: "https://via.placeholder.com/300x200?text=Smartphone+X",
    price: 699.99,
  },
  {
    id: 17,
    title: "Power Bank",
    category: "Phones and Gadgets",
    image: "https://via.placeholder.com/300x200?text=Power+Bank",
    price: 29.99,
  },
  {
    id: 18,
    title: "Phone Tripod",
    category: "Phones and Gadgets",
    image: "https://via.placeholder.com/300x200?text=Phone+Tripod",
    price: 15.99,
  },
  {
    id: 19,
    title: "Wireless Charger",
    category: "Phones and Gadgets",
    image: "https://via.placeholder.com/300x200?text=Wireless+Charger",
    price: 22.99,
  },
  {
    id: 20,
    title: "Smart Ring",
    category: "Phones and Gadgets",
    image: "https://via.placeholder.com/300x200?text=Smart+Ring",
    price: 45.99,
  },

  // Health and Beauty
  {
    id: 21,
    title: "Vitamin C Serum",
    category: "Health and Beauty",
    image: "https://via.placeholder.com/300x200?text=Vitamin+C+Serum",
    price: 18.99,
  },
  {
    id: 22,
    title: "Hair Dryer",
    category: "Health and Beauty",
    image: "https://via.placeholder.com/300x200?text=Hair+Dryer",
    price: 49.99,
  },
  {
    id: 23,
    title: "Massage Gun",
    category: "Health and Beauty",
    image: "https://via.placeholder.com/300x200?text=Massage+Gun",
    price: 79.99,
  },
  {
    id: 24,
    title: "Facial Cleanser",
    category: "Health and Beauty",
    image: "https://via.placeholder.com/300x200?text=Facial+Cleanser",
    price: 14.99,
  },
  {
    id: 25,
    title: "Essential Oil Set",
    category: "Health and Beauty",
    image: "https://via.placeholder.com/300x200?text=Essential+Oil+Set",
    price: 27.99,
  },

  // Home Appliances
  {
    id: 26,
    title: "Microwave Oven",
    category: "Home Appliances",
    image: "https://via.placeholder.com/300x200?text=Microwave+Oven",
    price: 129.99,
  },
  {
    id: 27,
    title: "Air Conditioner",
    category: "Home Appliances",
    image: "https://via.placeholder.com/300x200?text=Air+Conditioner",
    price: 349.99,
  },
  {
    id: 28,
    title: "Washing Machine",
    category: "Home Appliances",
    image: "https://via.placeholder.com/300x200?text=Washing+Machine",
    price: 499.99,
  },
  {
    id: 29,
    title: "Refrigerator",
    category: "Home Appliances",
    image: "https://via.placeholder.com/300x200?text=Refrigerator",
    price: 699.99,
  },
  {
    id: 30,
    title: "Vacuum Cleaner",
    category: "Home Appliances",
    image: "https://via.placeholder.com/300x200?text=Vacuum+Cleaner",
    price: 89.99,
  },
];

const TrendingProducts = ({ selectedCategory, onAddToCart }) => {
  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Trending Products{" "}
        {selectedCategory !== "All" && ` - ${selectedCategory}`}
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
