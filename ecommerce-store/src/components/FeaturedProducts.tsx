import React from "react";

interface FeaturedProductsProps {
  setSelectedCategory: (category: string) => void;
}

const categories = [
  {
    title: "Electronics",
    image: "https://via.placeholder.com/300x200?text=Electronics",
  },
  {
    title: "Fitness",
    image: "https://via.placeholder.com/300x200?text=Fashion",
  },
  {
    title: "Office",
    image: "https://via.placeholder.com/300x200?text=Home+%26+Office",
  },
  {
    title: "Phones and Gadgets",
    image: "https://via.placeholder.com/300x200?text=Phones+%26+Gadgets",
  },
  {
    title: "Outdoors",
    image: "https://via.placeholder.com/300x200?text=Health+%26+Beauty",
  },
  {
    title: "Home ",
    image: "https://via.placeholder.com/300x200?text=Home+Appliances",
  },
];

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  setSelectedCategory,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.title}
            className="relative group rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedCategory(cat.title)}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300"
            />
            <div className="absolute bottom-3 rounded-lg left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
              <span className="text-sm font-semibold">{cat.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
