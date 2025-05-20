import React from "react";

interface FeaturedProductsProps {
  setSelectedCategory: (category: string) => void;
}

const categories = [
  {
    title: "Electronics",
    image:
      "https://plus.unsplash.com/premium_photo-1673709635732-c83149ac689d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWxlY3Ryb25pY3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Fitness",
    image:
      "https://images.unsplash.com/photo-1627483298606-cf54c61779a9?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8Zml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Office",
    image:
      "https://images.unsplash.com/photo-1579487785973-74d2ca7abdd5?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b2ZmaWNlfGVufDB8fDB8fHww",
  },
  {
    title: "Phones and Gadgets",
    image:
      "https://images.unsplash.com/photo-1513611771808-7e8ab7f1dec6?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmVzfGVufDB8fDB8fHww",
  },
  {
    title: "Outdoors",
    image:
      "https://images.unsplash.com/photo-1542309174-d33b34ce6ea7?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3V0ZG9vcnN8ZW58MHx8MHx8fDA%3D",
  },
  {
    title: "Home ",
    image:
      "https://media.istockphoto.com/id/461773913/photo/group-of-household-appliances.webp?a=1&b=1&s=612x612&w=0&k=20&c=QE6ZCqKYq0qLcvAkAoQZgNrHre_EFqwbxiV9mYxC7mA=",
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
